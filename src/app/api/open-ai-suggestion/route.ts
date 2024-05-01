import { NextRequest, NextResponse } from 'next/server';

import { Database } from '@/lib/schema';

import { createClient } from '@supabase/supabase-js';

import OpenAI from 'openai';
import { TSuggestion } from '@/types/database.types';

interface OpenAiSuggestionRequest {
  wishlistId: number;
  userId: string;
  suggestion?: TSuggestion;
  locale?: string;
}

interface ISuggestion {
  suggestedGiftName: string;
  suggestedGiftDescription: string;
  confidenceScore: number;
}

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
);

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY!;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { wishlistId, userId, suggestion, locale } = (await req.json()) as OpenAiSuggestionRequest;

  if (!wishlistId || !userId) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { data: wishlist, error } = await supabase
    .from('wishlists')
    .select(
      `
          *,
          items (id, name),
          profiles (id, full_name, date_of_birth)
      `,
    )
    .eq('id', wishlistId)
    .single();

  if (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }

  const { data: suggestions, error: suggestionsError } = await supabase
    .from('suggestions')
    .select('name')
    .eq('wishlist_id', wishlistId)
    .eq('created_by', userId);

  const itemNames =
    wishlist.items && wishlist.items.map((item, index) => index < 3 && item.name).join(', ');
  const suggestionNames = suggestions?.map((item) => item.name).join(', ');
  const age = new Date().getFullYear() - new Date(wishlist.profiles!.date_of_birth).getFullYear();

  const aiCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `Generate a JSON response with gift suggestions based on a user's wishlist, 
        age, and current trends. The JSON should be one object with fields for 'suggestedGiftName', 
        'suggestedGiftDescription (no more than 150 characters)', and 'confidenceScore' (0-1). Suggestion should be for real, 
        purchasable product that is popular in ${new Date().getFullYear()}. Avoid abstract ideas and ensure 
        the gift is suitable and appealing to someone who is ${age} years old. The response should be 
        in ${locale === 'uk' ? 'Ukrainian' : 'English'}. Do not suggest: ${suggestionNames} or similar items.`,
      },
      {
        role: 'user',
        content: `I'm looking for gift ideas for my friend who is ${age} years old. Their wishlist includes ${itemNames}. I want something that's in demand right now and would be really appreciated.`,
      },
    ],
  });

  if (!aiCompletion.choices[0].message.content) {
    return NextResponse.json({ error: 'Error generating suggestion' }, { status: 500 });
  }

  const aiSuggestion = JSON.parse(aiCompletion.choices[0].message.content) as ISuggestion;

  console.log(aiCompletion);

  const { data: fetchedSuggestion, error: suggestionError } = suggestion
    ? await supabase
        .from('suggestions')
        .update({
          confidence_score: aiSuggestion.confidenceScore,
          reason: '',
          description: aiSuggestion.suggestedGiftDescription,
          name: aiSuggestion.suggestedGiftName,
          wishlist_id: wishlistId,
          created_by: userId,
        })
        .eq('id', suggestion.id)
        .select('*')
        .single()
    : await supabase
        .from('suggestions')
        .insert({
          confidence_score: aiSuggestion.confidenceScore,
          reason: '',
          description: aiSuggestion.suggestedGiftDescription,
          name: aiSuggestion.suggestedGiftName,
          wishlist_id: wishlistId,
          created_by: userId,
        })
        .select('*')
        .single();

  return NextResponse.json({ suggestion: fetchedSuggestion });
}

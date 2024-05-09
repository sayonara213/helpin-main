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
  description?: string;
  title?: string;
}

interface ISuggestion {
  suggestedName: string;
  suggestedDescription: string;
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
  const { wishlistId, userId, suggestion, description, title } =
    (await req.json()) as OpenAiSuggestionRequest;

  if (!wishlistId || !userId) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { data: suggestions, error: suggestionsError } = await supabase
    .from('suggestions')
    .select('name')
    .eq('wishlist_id', wishlistId)
    .eq('created_by', userId);

  const aiCompletion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `Generate a JSON response with supporting items for suggestions based on a existing volunteering list of needs, 
        , and current situation in the world. The JSON should be one object with fields for 'suggestedName', 
        'suggestedDescription (no more than 150 characters)', and 'confidenceScore' (0-1). Suggestion should be for real, 
        purchasable product that is acually needed regarding to the description: ${description}; and title: ${title} in ${new Date().getFullYear()}. Avoid abstract ideas and ensure 
        the item is needed, and will most likely help. ${suggestions?.length ? 'Here are the existing suggestions: ' + suggestions.map((s) => s.name).join(', ') : ''}`,
      },
      {
        role: 'user',
        content: `I'm looking for volunteer items ideas for list. Suggestion should be for real, 
        purchasable product that is acually needed regarding to the description.`,
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
          description: aiSuggestion.suggestedDescription,
          name: aiSuggestion.suggestedName,
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
          description: aiSuggestion.suggestedDescription,
          name: aiSuggestion.suggestedName,
          wishlist_id: wishlistId,
          created_by: userId,
        })
        .select('*')
        .single();

  return NextResponse.json({ suggestion: fetchedSuggestion });
}

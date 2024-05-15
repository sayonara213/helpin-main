import { NextRequest, NextResponse } from 'next/server';

import { Database } from '@/lib/schema';

import { createClient } from '@supabase/supabase-js';

import OpenAI from 'openai';
import { TShare, TSuggestion } from '@/types/database.types';

interface OpenAiShareRequest {
  wishlistId: number;
  userId: string;
  share?: TShare;
  locale?: string;
  description?: string;
  title?: string;
  location?: string;
  social?: string;
}

interface IShare {
  id: number;
  title: string;
  description: string;
  confidenceScore: number;
  imageUrl: string;
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
  const { wishlistId, userId, share, description, title, location, social } =
    (await req.json()) as OpenAiShareRequest;

  if (!wishlistId || !userId) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { data: shares, error: sharesError } = await supabase
    .from('shares')
    .select('title')
    .eq('wishlist_id', wishlistId)
    .eq('created_by', userId);

  const aiCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `Generate a JSON response with supporting items for share post that may be used in ${social}
          based on a existing volunteering list of needs, and current situation in the world. The JSON should be one object with fields for 'title', 
        'description (no more than 150 characters)', and 'confidenceScore' (0-1). Post should be for real and usable for ${social} post. ${shares?.length ? 'Here are the existing shares: ' + shares.map((s) => s.title).join(', ') : ''},
        The post should be regarding to the description: ${description}, title: ${title} and location: ${location} in ${new Date().getFullYear()}. Avoid abstract ideas, keep the response language the same as description.`,
      },
      {
        role: 'user',
        content: `I'm looking to create post about volunteer initiative. Post should be for real and may be used in ${social} or any other social media`,
      },
    ],
  });

  const imageResponse = await openai.images.generate({
    model: 'dall-e-3',
    prompt: `Abscract uber-minimalistic illustration without text for ${social} post for volunteer initiative with call to help in greenish-mint colors in ${location} for ${title} based on description in peaceful manner: ${description} without text`,
    n: 1,
    size: '1024x1024',
  });
  const image_url = imageResponse.data[0].url;

  if (!aiCompletion.choices[0].message.content) {
    return NextResponse.json({ error: 'Error generating suggestion' }, { status: 500 });
  }

  const aiShare = JSON.parse(aiCompletion.choices[0].message.content) as IShare;

  const { data: fetchedShare, error: shareError } =
    shares && share
      ? await supabase
          .from('shares')
          .update({
            confidence_score: aiShare.confidenceScore,
            description: aiShare.description,
            title: aiShare.title,
            wishlist_id: wishlistId,
            created_by: userId,
            image_url: image_url,
            social: social,
          })
          .eq('id', share.id)
          .select('*')
          .single()
      : await supabase
          .from('shares')
          .insert({
            confidence_score: aiShare.confidenceScore,
            description: aiShare.description,
            title: aiShare.title,
            wishlist_id: wishlistId,
            created_by: userId,
            image_url: image_url,
            social: social,
          })
          .select('*')
          .single();

  return NextResponse.json({ share: fetchedShare });
}

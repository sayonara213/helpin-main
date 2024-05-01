import { NextRequest, NextResponse } from 'next/server';

import { API_URL } from '@/constants/api';
import { Database } from '@/lib/schema';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
);

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const requestBody = {
    userId: formData.get('userId') as string,
    wishlistId: parseInt(formData.get('wishlistId') as string),
    url: formData.get('url') as string,
  };

  let fileToUpload: File | Blob = formData.get('file') as File;

  const fileName = `image${Date.now()}`;
  const uploadedUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${API_URL.itemImages}/${requestBody.userId}/${requestBody.wishlistId}/${fileName}`;

  try {
    if (requestBody.url) {
      const data = await fetch(requestBody.url);

      fileToUpload = await data.blob();
    }

    const { error } = await supabase.storage
      .from('wishlists')
      .upload(`${requestBody.userId}/${requestBody.wishlistId}/${fileName}`, fileToUpload, {
        cacheControl: '3600',
      });

    if (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }

    return NextResponse.json({ imageUrl: uploadedUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

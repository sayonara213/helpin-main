import { NextRequest, NextResponse } from 'next/server';

import ogs from 'open-graph-scraper';

export async function POST(req: NextRequest, res: NextResponse) {
  const { url } = await req.json();
  console.log(url);

  if (!url) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
  }

  try {
    const { result } = await ogs({ url });
    const imageUrl = result.ogImage;

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image found' }, { status: 404 });
    }

    return NextResponse.json({ imageUrl: imageUrl[0].url }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

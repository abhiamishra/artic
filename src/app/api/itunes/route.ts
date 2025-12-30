import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const term = searchParams.get('term');

    if (!term) {
      return NextResponse.json({ error: 'Search term required' }, { status: 400 });
    }

    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=album&limit=1`
    );

    if (!response.ok) {
      throw new Error('iTunes API request failed');
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('iTunes API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from iTunes' },
      { status: 500 }
    );
  }
}
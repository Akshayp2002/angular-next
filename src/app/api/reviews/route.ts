import { NextResponse } from 'next/server';
import { submitReview, getApprovedReviews } from '@/lib/supabase/reviews';

export async function GET() {
  try {
    const reviews = await getApprovedReviews();
    return NextResponse.json(reviews);
  } catch (error: unknown) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, position, company, review, rating } = body;

    if (!name || !review) {
      return NextResponse.json({ error: 'Name and review are required' }, { status: 400 });
    }

    // Default to UI Avatars for everyone as S3 is removed
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

    try {
      const data = await submitReview({
        name,
        position: position || "",
        company: company || "",
        review,
        rating: Number(rating) || 5,
        avatar: avatarUrl,
        is_approved: false
      });
      return NextResponse.json({ success: true, data });
    } catch (supabaseError: any) {
      console.error('Supabase Save Failed:', supabaseError);
      return NextResponse.json({ 
        error: 'Failed to save review to database.',
        details: supabaseError.message || JSON.stringify(supabaseError)
      }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error('General API Error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Internal Server Error',
      details: error instanceof Error ? error.stack : undefined 
    }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email, source: source || 'blog' }]);

    // Ignore unique constraint errors (if they are already subscribed, just return success)
    if (error && error.code !== '23505') {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}

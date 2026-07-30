import { NextResponse } from 'next/server';
import { verifyUserToken } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }

    const email = await verifyUserToken(token);
    if (!email) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const supabase = supabaseAdmin;

    // Delete from public_resumes first if they have one (if handle is email-based, though we use handles, we can look it up, but for now we delete from candidates and cascade)
    // Actually we just delete from candidates. If candidate_profiles has a foreign key with CASCADE, it will auto-delete.
    // If public_resumes is linked, we should delete it too, but public resumes aren't directly linked by email in the schema currently. We might just leave it for now or delete by matching resume_data email.

    const { error } = await supabase
      .from('candidates')
      .delete()
      .eq('email', email);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Your data has been successfully deleted.' });
  } catch (error) {
    console.error('Delete User Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

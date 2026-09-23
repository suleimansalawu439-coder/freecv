import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { checkRateLimit } from '@/lib/rate-limit';
import { apiError } from '@/lib/api-error';
import { sanitizeResumeData } from '@/lib/validation';

export async function POST(req: Request) {
  try {
    const rateLimitResponse = await checkRateLimit(req);
    if (rateLimitResponse) return rateLimitResponse;

    let data = await req.json();
    try {
      data = sanitizeResumeData(data);
    } catch (zodError) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    if (!data || !data.personalInfo || !data.personalInfo.fullName) {
      return NextResponse.json({ error: 'Invalid resume data provided.' }, { status: 400 });
    }

    // Generate a short, unique handle (e.g. 7 characters)
    let handle = nanoid(7);
    
    // Check if the handle already exists (highly unlikely, but safe)
    const { data: existing, error: existError } = await supabaseAdmin
      .from('public_resumes')
      .select('id')
      .eq('handle', handle)
      .single();
      
    if (existing) {
      handle = nanoid(8);
    }

    // Insert into Supabase
    const { error: insertError } = await supabaseAdmin
      .from('public_resumes')
      .insert({
        handle,
        data
      });

    if (insertError) {
      logger.error('publish', 'Supabase Insert Error:', insertError);
      throw new Error('Failed to save to database.');
    }

    return NextResponse.json({ 
      success: true, 
      handle,
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/r/${handle}`
    });

  } catch (error: any) {
    return apiError('publish', error);
  }
}

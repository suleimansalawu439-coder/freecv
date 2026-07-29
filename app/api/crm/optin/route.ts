import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sanitizeResumeData } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const resumeData = await request.json();
    const email = resumeData?.personalInfo?.email;
    const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const device_type = userAgent.includes('Mobi') ? 'mobile' : userAgent.includes('Tablet') ? 'tablet' : 'desktop';

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const { error } = await supabase
      .from('candidates')
      .insert([{ 
        email, 
        name: resumeData.personalInfo.fullName || '',
        job_title: resumeData.personalInfo.jobTitle || '',
        location: resumeData.personalInfo.location || '',
        country,
        device_type,
        resume_data: resumeData
      }]);

    // Ignore unique constraint errors (if they are already in the CRM, we can either update or ignore)
    // Supabase will throw error code 23505 for unique violations
    if (error && error.code !== '23505') {
      console.error("CRM Opt-in Error:", error);
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("CRM API Error:", error);
    return NextResponse.json({ error: 'Failed to opt in to CRM' }, { status: 500 });
  }
}

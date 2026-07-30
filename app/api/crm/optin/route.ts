import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function calculateCompleteness(data: any): number {
  let score = 0;
  if (data?.personalInfo?.fullName) score += 5;
  if (data?.personalInfo?.jobTitle) score += 10;
  if (data?.skills?.length > 0) score += 20;
  if (data?.experience?.length > 0) score += 20;
  if (data?.education?.length > 0) score += 10;
  if (data?.personalInfo?.email || data?.personalInfo?.phone) score += 15;
  if (data?.personalInfo?.location) score += 10;
  if (data?.summary) score += 10;
  return Math.min(100, score);
}

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

    const supabase = supabaseAdmin;

    // 1. Structured Extraction using Gemini
    let extracted = {
      title_category: '',
      industry: '',
      experience_years: 0,
      employment_status: 'Open to work',
      preferred_work: 'Any',
      highest_education: '',
      skills: [] as string[],
      skill_categories: [] as string[],
      salary_expectation: ''
    };

    try {
      const prompt = `
Extract structured data from the following candidate JSON.
Return ONLY valid JSON matching this schema:
{
  "title_category": "string (e.g. Engineering, Design, Marketing, Sales, Healthcare, etc.)",
  "industry": "string",
  "experience_years": number (compute total years of experience from dates),
  "employment_status": "string (Employed, Open to work, Freelance, Student)",
  "preferred_work": "string (Remote, Hybrid, On-site, Any)",
  "highest_education": "string (High School, Bachelor's, Master's, PhD, Bootcamp, None)",
  "skills": ["string (canonical tech/skill names)"],
  "skill_categories": ["string (e.g. Frontend, Backend, DevOps, Management)"],
  "salary_expectation": "string (extract if present, otherwise empty string)"
}

Candidate JSON:
${JSON.stringify({
  personalInfo: resumeData.personalInfo,
  experience: resumeData.experience,
  education: resumeData.education,
  skills: resumeData.skills
})}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash-8b',
        contents: prompt,
        config: { 
          temperature: 0.1, 
          responseMimeType: 'application/json' 
        }
      });

      let rawJson = response.text || '{}';
      rawJson = rawJson.replace(/```json\n?|\n?```/g, '').trim();
      extracted = JSON.parse(rawJson);
    } catch (e) {
      console.error('Gemini extraction failed, using defaults', e);
      // fallback to manual extraction if Gemini fails
      extracted.skills = (resumeData.skills || []).map((s: any) => s.name);
      extracted.experience_years = resumeData.experience?.length * 2 || 0; // naive fallback
    }

    // 2. Insert or update candidate (Canonical Data + Normalized Fields)
    const { data: candidate, error: candidateError } = await supabase
      .from('candidates')
      .upsert({ 
        email, 
        name: resumeData.personalInfo?.fullName || '',
        job_title: resumeData.personalInfo?.jobTitle || '',
        location: resumeData.personalInfo?.location || '',
        country,
        device_type,
        resume_data: resumeData,
        opted_in_at: new Date().toISOString(),
        // Normalized fields
        city: resumeData.personalInfo?.location?.split(',')[0] || '',
        industry: extracted.industry || 'Other',
        current_title: resumeData.personalInfo?.jobTitle || '',
        experience_years: extracted.experience_years || 0,
        highest_education: extracted.highest_education || 'Unknown',
        salary_expectation: extracted.salary_expectation || '',
        employment_status: extracted.employment_status || 'Open to work',
        preferred_work: extracted.preferred_work || 'Any',
        skills: extracted.skills || [],
        languages: [], // we don't extract this currently
        degree: resumeData.education?.[0]?.degree || '',
        university: resumeData.education?.[0]?.school || '',
        github: resumeData.personalInfo?.website?.includes('github') ? resumeData.personalInfo.website : '',
        linkedin: resumeData.personalInfo?.website?.includes('linkedin') ? resumeData.personalInfo.website : '',
        portfolio: !resumeData.personalInfo?.website?.includes('linkedin') && !resumeData.personalInfo?.website?.includes('github') ? resumeData.personalInfo.website : '',
        updated_at: new Date().toISOString()
      }, { onConflict: 'email' })
      .select('id')
      .single();

    if (candidateError) {
      console.error("CRM Opt-in Error (candidates):", candidateError);
      throw candidateError;
    }

    // Insert consent log
    const consents = resumeData.consents || { recruiterShare: false, emailJobs: false, analytics: true };
    await supabase.from('consent_logs').insert({
      session_id: request.headers.get('x-forwarded-for') || 'unknown',
      email: email,
      consent_marketing: consents.recruiterShare || consents.emailJobs,
      consent_ai: true, // They opted in to use AI when agreeing to terms initially, or we'd check it
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
      user_agent: userAgent
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("CRM API Error:", error);
    return NextResponse.json({ error: 'Failed to opt in to CRM' }, { status: 500 });
  }
}

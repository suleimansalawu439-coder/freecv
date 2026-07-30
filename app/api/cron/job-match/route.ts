import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { GoogleGenAI } from '@google/genai';

export const runtime = 'edge';

// Secret required to trigger cron
export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get('secret') !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 1. Fetch active job postings
    const { data: jobs } = await supabaseAdmin
      .from('job_postings')
      .select('*, recruiters(company_name)')
      .eq('is_active', true)
      .limit(10); // batch size

    if (!jobs || jobs.length === 0) {
      return NextResponse.json({ message: 'No active jobs' });
    }

    const ai = new GoogleGenAI({});
    let matchesFound = 0;

    for (const job of jobs) {
      // 2. Fetch recent candidates who opted in for emails
      const { data: candidates } = await supabaseAdmin
        .from('candidates')
        .select('id, name, email, resume_data')
        .not('resume_data', 'is', null)
        .limit(50); // simplified batch

      if (!candidates) continue;

      for (const candidate of candidates) {
        if (!candidate.resume_data) continue;

        // Use AI Grader to determine match score
        const prompt = \`
          Job Description: \${job.title} at \${job.recruiters.company_name}
          \${job.description}

          Candidate Resume:
          \${JSON.stringify(candidate.resume_data)}

          Score this candidate's match for this job from 0 to 100.
          Return ONLY a JSON object: {"score": number}
        \`;

        try {
          const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: prompt,
            config: { temperature: 0.1 }
          });
          
          let text = response.text || '';
          text = text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
          const matchResult = JSON.parse(text);

          if (matchResult.score >= 80) {
            matchesFound++;
            // Send Email to candidate via Brevo
            await fetch('https://api.brevo.com/v3/smtp/email', {
              method: 'POST',
              headers: {
                'api-key': process.env.BREVO_API_KEY as string,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                sender: { name: 'Cvyon Jobs', email: 'noreply@cvyon.com' },
                to: [{ email: candidate.email }],
                subject: `New High-Match Job: ${job.title} at ${job.recruiters.company_name}`,
                htmlContent: `
                  <h2>We found a great match for your profile!</h2>
                  <p><strong>${job.recruiters.company_name}</strong> is looking for a <strong>${job.title}</strong>.</p>
                  <p>Based on your Cvyon resume, you have an <strong>${matchResult.score}% match</strong> for this role!</p>
                  <hr/>
                  <p>Log in to Cvyon to view more details and connect with the recruiter.</p>
                `
              })
            });
          }
        } catch (e) {
          // Ignore individual AI failures
          console.warn('AI Match failed for candidate', candidate.id);
        }
      }
    }

    return NextResponse.json({ success: true, matches_found: matchesFound });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

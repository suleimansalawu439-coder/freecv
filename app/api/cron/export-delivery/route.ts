import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'edge';

// Format array of objects to CSV string
function jsonToCSV(items: any[]) {
  if (!items || !items.length) return '';
  const header = Object.keys(items[0]).join(',');
  const rows = items.map(item => 
    Object.values(item)
      .map(val => {
        if (val === null || val === undefined) return '""';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      })
      .join(',')
  );
  return [header, ...rows].join('\n');
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Fetch Candidates (Opted in past 7 days)
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const { data: candidates, error } = await supabaseAdmin
      .from('candidate_profiles')
      .select('full_name, current_title, industry, experience_years, country, skills, linkedin_url, consent_email_jobs, created_at')
      .gte('created_at', lastWeek.toISOString());

    if (error) throw error;

    if (!candidates || candidates.length === 0) {
      return NextResponse.json({ success: true, message: 'No new candidates this week' });
    }

    // 2. Generate CSV
    const csvContent = jsonToCSV(candidates);
    const csvBase64 = Buffer.from(csvContent).toString('base64');

    // 3. Send via Brevo API
    const brevoApiKey = process.env.BREVO_API_KEY;
    const recipientEmails = process.env.RECRUITER_EMAILS ? process.env.RECRUITER_EMAILS.split(',') : ['test@cvyon.com'];

    if (brevoApiKey) {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': brevoApiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: 'Cvyon Talent Pool', email: 'talent@cvyon.com' },
          to: recipientEmails.map(email => ({ email: email.trim() })),
          subject: 'Weekly Cvyon Talent Pool Update',
          htmlContent: `<p>Hello,</p><p>Attached is the weekly export of new candidates who have opted into the Cvyon Talent Pool.</p><p>Total new candidates: ${candidates.length}</p>`,
          attachment: [
            {
              name: `cvyon-talent-pool-${new Date().toISOString().split('T')[0]}.csv`,
              content: csvBase64
            }
          ]
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(`Brevo API Error: ${JSON.stringify(errData)}`);
      }
    } else {
      console.warn('No BREVO_API_KEY found, skipping actual email send. Generated CSV for', candidates.length, 'candidates.');
    }

    return NextResponse.json({ success: true, candidatesSent: candidates.length });
  } catch (error: any) {
    console.error('Export Delivery Cron Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

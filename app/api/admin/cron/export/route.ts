import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = supabaseAdmin;

    // Fetch all candidates from the last 7 days (Weekly export)
    // Or just all candidates. Let's do all candidates opted in the last 7 days for a weekly report.
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: candidates, error } = await supabase
      .from('candidates')
      .select('name, email, job_title, location, country, opted_in_at')
      .gte('opted_in_at', sevenDaysAgo.toISOString())
      .order('opted_in_at', { ascending: false });

    if (error) {
      throw error;
    }

    if (!candidates || candidates.length === 0) {
      return NextResponse.json({ message: 'No new candidates this week. Skipping email.' });
    }

    // Generate CSV
    const headers = ['Name', 'Email', 'Job Title', 'Location', 'Country', 'Opt-in Date'];
    const csvRows = [headers.join(',')];

    candidates.forEach((c: any) => {
      const values = [
        `"${(c.name || '').replace(/"/g, '""')}"`,
        `"${(c.email || '').replace(/"/g, '""')}"`,
        `"${(c.job_title || '').replace(/"/g, '""')}"`,
        `"${(c.location || '').replace(/"/g, '""')}"`,
        `"${(c.country || '').replace(/"/g, '""')}"`,
        `"${new Date(c.opted_in_at).toLocaleDateString()}"`
      ];
      csvRows.push(values.join(','));
    });

    const csvContent = csvRows.join('\n');
    
    // Convert CSV to Base64
    const encoder = new TextEncoder();
    const csvBytes = encoder.encode(csvContent);
    let binary = '';
    for (let i = 0; i < csvBytes.byteLength; i++) {
      binary += String.fromCharCode(csvBytes[i]);
    }
    const base64Csv = btoa(binary);

    // Send via Brevo API
    const brevoApiKey = process.env.BREVO_API_KEY;
    
    if (!brevoApiKey) {
      logger.warn('export', "BREVO_API_KEY is not set. Cannot send email.");
      return NextResponse.json({ error: 'BREVO_API_KEY not configured' }, { status: 500 });
    }

    const emailPayload = {
      sender: { name: "Cvyon Admin System", email: "admin@cvyon.dev" },
      to: [{ email: process.env.ADMIN_EMAIL || "admin@cvyon.dev", name: "Admin Team" }],
      subject: `Weekly Talent Pool Export (${candidates.length} new candidates)`,
      htmlContent: `<p>Hello Admin,</p><p>Attached is the weekly export of the new candidates who opted into the Cvyon Talent Pool in the last 7 days.</p><p>Total new candidates: <strong>${candidates.length}</strong></p><p>Best,<br/>Cvyon System</p>`,
      attachment: [
        {
          name: `cvyon_talent_pool_${new Date().toISOString().split('T')[0]}.csv`,
          content: base64Csv
        }
      ]
    };

    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify(emailPayload)
    });

    if (!brevoResponse.ok) {
      const errData = await brevoResponse.text();
      logger.error('export', "Brevo Error:", errData);
      throw new Error('Failed to send email via Brevo');
    }

    return NextResponse.json({ success: true, message: `Email sent with ${candidates.length} candidates.` });
  } catch (error: any) {
    logger.error('export', "Cron Export Error:", error);
    return NextResponse.json({ error: 'Failed to run export cron' }, { status: 500 });
  }
}

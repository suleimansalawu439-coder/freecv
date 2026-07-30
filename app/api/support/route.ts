import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_email, subject, message } = body;

    if (!user_email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Insert into database
    const { data: ticket, error: dbError } = await supabaseAdmin
      .from('support_tickets')
      .insert([
        { user_email, subject, message, status: 'open' }
      ])
      .select()
      .single();

    if (dbError) throw dbError;

    // 2. Send email to support@cvyon.com via Brevo (if configured)
    if (process.env.BREVO_API_KEY) {
      try {
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': process.env.BREVO_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sender: { name: 'Cvyon Support System', email: 'noreply@cvyon.com' },
            to: [{ email: 'support@cvyon.com' }],
            replyTo: { email: user_email },
            subject: `[Support Ticket #${ticket.id.split('-')[0]}] ${subject}`,
            htmlContent: `
              <h2>New Support Ticket</h2>
              <p><strong>From:</strong> ${user_email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <hr/>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
              <br/>
              <p>View this ticket in the <a href="https://cvyon.com/admin">Admin Dashboard</a>.</p>
            `
          })
        });
      } catch (emailError) {
        console.error('Failed to dispatch support email:', emailError);
        // We don't fail the request if the email fails, as the ticket is safely in the DB
      }
    }

    return NextResponse.json({ success: true, ticket });
  } catch (error: any) {
    console.error('Support ticket error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

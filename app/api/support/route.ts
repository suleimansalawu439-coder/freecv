import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { checkRateLimit } from '@/lib/rate-limit';
import { SupportTicketSchema } from '@/lib/validation';
import { apiError } from '@/lib/api-error';

export async function POST(request: Request) {
  try {
    const rateLimitResponse = await checkRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const rawBody = await request.json();
    // Validate via the shared schema; the form posts `user_email` (legacy field
    // name) so map it onto the schema's `email`. `name` is optional client-side.
    const validation = SupportTicketSchema.safeParse({
      name: rawBody.name ?? 'Anonymous',
      email: rawBody.user_email ?? rawBody.email,
      subject: rawBody.subject,
      message: rawBody.message,
    });
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues?.[0]?.message || 'Invalid ticket data' },
        { status: 400 }
      );
    }
    const { email: user_email, subject, message } = validation.data;

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
        logger.error('support', 'Failed to dispatch support email:', emailError);
        // We don't fail the request if the email fails, as the ticket is safely in the DB
      }
    }

    return NextResponse.json({ success: true, ticket });
  } catch (error: any) {
    return apiError('support', error);
  }
}

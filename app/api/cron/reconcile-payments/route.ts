import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { processPaystackEvent } from '@/app/api/paystack/webhook/route';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
// Revalidate set to 0 ensures it doesn't get cached
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    // 1. Verify cron secret to prevent unauthorized execution
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Fetch pending events that are due for retry
    const { data: events, error } = await supabaseAdmin
      .from('webhook_event_queue')
      .select('*')
      .eq('status', 'pending')
      .lte('next_retry_at', new Date().toISOString())
      .limit(100);

    if (error) {
      logger.error('reconcile-payments', 'Failed to fetch pending events', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (!events || events.length === 0) {
      return NextResponse.json({ message: 'No pending events to process' }, { status: 200 });
    }

    logger.info('reconcile-payments', `Found ${events.length} pending events to retry.`);

    // 3. Process events
    let successCount = 0;
    let failCount = 0;

    for (const evt of events) {
      try {
        const success = await processPaystackEvent(evt.payload);
        if (success) {
          await supabaseAdmin
            .from('webhook_event_queue')
            .update({ status: 'success' })
            .eq('id', evt.id);
          successCount++;
        } else {
          throw new Error('Event processor returned false');
        }
      } catch (err: any) {
        failCount++;
        const nextRetry = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // retry in 1 hr
        await supabaseAdmin
          .from('webhook_event_queue')
          .update({ 
            status: 'failed', 
            last_error: err?.message || 'Retry failed',
            next_retry_at: nextRetry 
          })
          .eq('id', evt.id);
        logger.error('reconcile-payments', `Failed to retry event ${evt.id}`, err);
      }
    }

    return NextResponse.json({
      message: `Processed ${events.length} events`,
      success: successCount,
      failed: failCount
    }, { status: 200 });

  } catch (err: any) {
    logger.error('reconcile-payments', 'Reconciliation cron failed', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

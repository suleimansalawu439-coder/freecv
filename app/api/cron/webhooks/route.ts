import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { processPaystackEvent } from '@/app/api/paystack/webhook/route';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Webhook Retry Queue Worker.
 * Can be triggered via Cron (e.g. Vercel Cron or external ping every 5 minutes).
 */
export async function GET(req: Request) {
  try {
    // 1. Fetch pending or failed retry events due for processing
    const now = new Date().toISOString();
    const { data: pendingEvents, error } = await supabaseAdmin
      .from('webhook_event_queue')
      .select('*')
      .in('status', ['pending', 'failed'])
      .lte('next_retry_at', now)
      .lt('retry_count', 5)
      .order('created_at', { ascending: true })
      .limit(20);

    if (error) {
      logger.error('webhooks', '[cron/webhooks] Fetch queue error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    if (!pendingEvents || pendingEvents.length === 0) {
      return NextResponse.json({ success: true, processed: 0, message: 'Queue is empty' });
    }

    const results = [];

    for (const item of pendingEvents) {
      try {
        // Mark as processing
        await supabaseAdmin
          .from('webhook_event_queue')
          .update({ status: 'processing', updated_at: new Date().toISOString() })
          .eq('id', item.id);

        let success = false;
        if (item.provider === 'paystack') {
          success = await processPaystackEvent(item.payload);
        }

        if (success) {
          await supabaseAdmin
            .from('webhook_event_queue')
            .update({
              status: 'processed',
              updated_at: new Date().toISOString(),
            })
            .eq('id', item.id);
          results.push({ id: item.id, status: 'processed' });
        } else {
          throw new Error('Event processing returned false');
        }
      } catch (err: any) {
        const nextRetryCount = (item.retry_count || 0) + 1;
        // Exponential backoff: 2min, 5min, 15min, 30min, 60min
        const backoffMinutes = Math.min(60, Math.pow(2, nextRetryCount) * 2);
        const nextRetryDate = new Date(Date.now() + backoffMinutes * 60 * 1000).toISOString();

        await supabaseAdmin
          .from('webhook_event_queue')
          .update({
            status: nextRetryCount >= item.max_retries ? 'failed' : 'pending',
            retry_count: nextRetryCount,
            last_error: err?.message || 'Unknown processing error',
            next_retry_at: nextRetryDate,
            updated_at: new Date().toISOString(),
          })
          .eq('id', item.id);

        results.push({ id: item.id, status: 'retry_scheduled', next_retry: nextRetryDate, error: err?.message });
      }
    }

    return NextResponse.json({ success: true, processed: results.length, results });
  } catch (error: any) {
    logger.error('webhooks', '[cron/webhooks] Worker unhandled error:', error);
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Vercel Cron endpoints should use the Edge Runtime for speed
export const runtime = 'edge';

// We could use an API key in the headers for security
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Calculate budget for the current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data: logs, error } = await supabaseAdmin
      .from('ai_usage_logs')
      .select('cost_estimate')
      .gte('created_at', startOfMonth.toISOString());

    if (error) {
      throw error;
    }

    const totalCost = (logs || []).reduce((acc: number, log: any) => acc + (Number(log.cost_estimate) || 0), 0);
    const budgetLimit = Number(process.env.AI_BUDGET_LIMIT || '10.00');

    let circuitBreakerTripped = false;

    if (totalCost >= budgetLimit) {
      circuitBreakerTripped = true;
      // Disable the AI features
      await supabaseAdmin
        .from('feature_flags')
        .update({ is_enabled: false })
        .eq('key', 'ai_circuit_breaker');
        
      console.warn(`[CRITICAL] AI Budget Exceeded. Total Cost: $${totalCost.toFixed(4)}. Limit: $${budgetLimit}. AI features have been disabled.`);
    } else {
      // Re-enable if under budget (e.g. at the start of a new month)
      await supabaseAdmin
        .from('feature_flags')
        .update({ is_enabled: true })
        .eq('key', 'ai_circuit_breaker');
    }

    return NextResponse.json({
      success: true,
      totalCost,
      budgetLimit,
      circuitBreakerTripped
    });
  } catch (error: any) {
    console.error('Budget Check Cron Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

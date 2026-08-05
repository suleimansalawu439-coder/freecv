import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rate-limit";

// Estimated CPC in USD cents by candidate country. Reconcile against your
// CareerJet publisher reports for actuals; structure stays identical.
const CPC_CENTS: Record<string, number> = {
  US: 65, GB: 55, CA: 50, AU: 50, IE: 48, NL: 45, DE: 45, SG: 45, FR: 40, AE: 40,
  ZA: 12, IN: 10, EG: 9, NG: 8, KE: 8, GH: 7, RW: 6, TZ: 6, UG: 6, CM: 6,
};
const DEFAULT_CPC = 12;

export async function POST(req: NextRequest) {
  const rateLimitResponse = await checkRateLimit(req, { limit: 60, windowMs: 60_000 });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const body = await req.json().catch(() => ({}));
    const ref_code = String(body?.ref_code || body?.ref || '').trim();
    const job_url = String(body?.job_url || '').trim();

    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "";
    const rawCountry = req.headers.get("x-vercel-ip-country") || body?.country || "";
    const country = String(rawCountry).toUpperCase().trim().slice(0, 2) || "US";

    // 1. Handle Affiliate Referral Tracking (?ref=CODE)
    if (ref_code) {
      let targetRef = ref_code;
      // Check if affiliate exists
      const { data: existingAffiliate } = await supabaseAdmin
        .from('affiliates')
        .select('ref_code, name')
        .ilike('ref_code', ref_code)
        .limit(1)
        .maybeSingle();

      if (existingAffiliate?.ref_code) {
        targetRef = existingAffiliate.ref_code;
      } else {
        // Auto-provision affiliate partner record to guarantee referential integrity
        const { data: newAffiliate, error: createAffErr } = await supabaseAdmin
          .from('affiliates')
          .insert({
            name: ref_code,
            ref_code: ref_code,
            commission_rate: 20.00,
          })
          .select('ref_code')
          .maybeSingle();

        if (!createAffErr && newAffiliate?.ref_code) {
          targetRef = newAffiliate.ref_code;
        }
      }

      const sessionId = body?.session_id || `${ip}_${Date.now()}`;
      const { error: clickErr } = await supabaseAdmin
        .from('affiliate_clicks')
        .insert({
          ref_code: targetRef,
          session_id: sessionId,
          ip_address: ip,
        });

      if (clickErr) {
        console.error("affiliate_clicks insert error:", clickErr);
        return NextResponse.json({ error: "Failed to record affiliate click", details: clickErr.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        type: 'affiliate_referral',
        ref_code: targetRef,
      });
    }

    // 2. Handle Outbound Job Click Tracking (CPC)
    if (job_url) {
      const cpcCents = CPC_CENTS[country] ?? DEFAULT_CPC;
      const cpc_value = typeof body.cpc_value === 'number' && body.cpc_value > 0
        ? body.cpc_value
        : cpcCents / 100;

      const { error: jobErr } = await supabaseAdmin
        .from('job_clicks')
        .insert({
          job_url,
          job_title: body.job_title || '',
          company: body.company || '',
          cpc_value,
          country,
          location: body.location || country,
          user_ip: ip,
          user_agent: userAgent,
        });

      if (jobErr) {
        console.error("job_clicks insert error:", jobErr);
        return NextResponse.json({ error: "Failed to record job click" }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        type: 'job_cpc',
        country,
        cpc_value,
      });
    }

    return NextResponse.json({ error: "Either ref_code or job_url is required" }, { status: 400 });
  } catch (err: any) {
    console.error("Affiliate tracking error:", err);
    return NextResponse.json({ error: err.message || "Server Error" }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rate-limit";
import { JobClickTrackSchema, validatePayload } from "@/lib/validation";

const CPC_CENTS: Record<string, number> = {
  US: 65, GB: 55, CA: 50, AU: 50, IE: 48, NL: 45, DE: 45, SG: 45, FR: 40, AE: 40,
  ZA: 12, IN: 10, EG: 9, NG: 8, KE: 8, GH: 7, RW: 6, TZ: 6, UG: 6, CM: 6,
};
const DEFAULT_CPC = 12;

export async function POST(req: NextRequest) {
  const rateLimitResponse = await checkRateLimit(req, { limit: 60, windowMs: 60_000 });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const rawBody = await req.json().catch(() => ({}));
    const validation = validatePayload(JobClickTrackSchema, rawBody);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const body = validation.data;
    const { job_url, job_title, company, location, user_agent } = body;

    if (!job_url) {
      return NextResponse.json({ error: "Missing job_url" }, { status: 400 });
    }

    // Extract IP
    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";

    // Extract 2-letter country code from geo header or body fallback
    const rawCountry = req.headers.get("x-vercel-ip-country") || body.country || "";
    const country = String(rawCountry).toUpperCase().trim().slice(0, 2) || "US";

    // Determine CPC in USD dollars
    const cpcCents = CPC_CENTS[country] ?? DEFAULT_CPC;
    const cpc_value = typeof body.cpc_value === 'number' && body.cpc_value > 0
      ? body.cpc_value
      : cpcCents / 100;

    const { error } = await supabaseAdmin
      .from('job_clicks')
      .insert({
        job_url,
        job_title: job_title || '',
        company: company || '',
        cpc_value,
        country,
        location: location || country,
        user_ip: ip,
        user_agent: user_agent || req.headers.get("user-agent") || "unknown"
      });

    if (error) {
      console.error("Supabase job_clicks insert error:", error);
      return NextResponse.json({ error: "Failed to record click" }, { status: 500 });
    }

    return NextResponse.json({ success: true, country, cpc_value });
  } catch (err: any) {
    console.error("Job tracking error:", err);
    return NextResponse.json({ error: err.message || "Server Error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rate-limit";
import { JobClickTrackSchema, validatePayload } from "@/lib/validation";

const CPC_CENTS: Record<string, number> = {
  US: 20, GB: 18, CA: 16, AU: 16, IE: 15, NL: 14, DE: 14, SG: 14, FR: 12, AE: 12,
  ZA: 10, IN: 8, EG: 8, NG: 7, KE: 7, GH: 7, RW: 7, TZ: 7, UG: 7, CM: 7,
};
const DEFAULT_CPC = 8; // $0.08 default CPC

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
    const { job_url, job_title, company, location, user_agent, user_name, user_email } = body;

    if (!job_url) {
      return NextResponse.json({ error: "Missing job_url" }, { status: 400 });
    }

    // Extract IP
    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";

    // Extract device type
    const ua = user_agent || req.headers.get("user-agent") || "";
    const device_type = body.device_type || (/mobi|iphone|ipod|android.*mobile/i.test(ua) ? "mobile" : /ipad|tablet/i.test(ua) ? "tablet" : "desktop");

    // Extract 2-letter country code from geo headers or body fallback
    let rawCountry = req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry") || req.headers.get("x-country-code") || body.country || "";
    let city = body.city || "";
    let country = String(rawCountry).toUpperCase().trim().slice(0, 2);

    if (location && (!city || !country || country === "UN")) {
      const parts = location.split(",").map((p: string) => p.trim()).filter(Boolean);
      if (parts.length >= 2) {
        if (!city) city = parts[0];
        if (!country || country === "UN") country = parts[parts.length - 1].slice(0, 2).toUpperCase();
      } else if (parts.length === 1 && !city) {
        city = parts[0];
      }
    }
    if (!country || country === "UN") country = "US";

    // Determine CPC in USD dollars
    const cpcCents = CPC_CENTS[country] ?? DEFAULT_CPC;
    const cpc_value = typeof body.cpc_value === 'number' && body.cpc_value > 0
      ? body.cpc_value
      : cpcCents / 100;

    const fullPayload = {
      job_url,
      job_title: job_title || '',
      company: company || '',
      user_name: user_name || 'Candidate',
      user_email: user_email || '',
      device_type,
      country,
      city: city || location || country,
      location: location || city || country,
      cpc_value,
      user_ip: ip,
      user_agent: ua || "unknown",
      created_at: new Date().toISOString(),
    };

    let { error } = await supabaseAdmin
      .from('job_clicks')
      .insert(fullPayload);

    if (error) {
      // Fallback: in case table doesn't have newer columns yet, insert standard columns
      console.warn("Supabase full job_clicks insert error, trying fallback:", error.message);
      const fallbackPayload = {
        job_url,
        job_title: job_title || '',
        company: company || '',
        cpc_value,
        country,
        location: location || country,
        user_ip: ip,
        user_agent: ua || "unknown"
      };
      const { error: fallbackError } = await supabaseAdmin.from('job_clicks').insert(fallbackPayload);
      if (fallbackError) {
        console.error("Supabase job_clicks fallback error:", fallbackError);
        return NextResponse.json({ error: "Failed to record click" }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, country, cpc_value, device_type });
  } catch (err: any) {
    console.error("Job tracking error:", err);
    return NextResponse.json({ error: err.message || "Server Error" }, { status: 500 });
  }
}

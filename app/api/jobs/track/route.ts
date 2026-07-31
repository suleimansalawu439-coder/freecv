import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { job_url, cpc_value, user_agent, location } = body;

    if (!job_url) {
      return NextResponse.json({ error: "Missing job_url" }, { status: 400 });
    }

    // Extract IP for tracking
    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";
    
    // Extract country/location if not provided by client
    const geoLoc = location || req.headers.get("x-vercel-ip-country") || "Unknown";

    const { error } = await supabaseAdmin
      .from('job_clicks')
      .insert({
        job_url,
        cpc_value: cpc_value || 0,
        user_ip: ip,
        location: geoLoc,
        user_agent: user_agent || req.headers.get("user-agent") || "unknown"
      });

    if (error) {
      console.error("Supabase job_clicks insert error:", error);
      return NextResponse.json({ error: "Failed to record click" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Job tracking error:", err);
    return NextResponse.json({ error: err.message || "Server Error" }, { status: 500 });
  }
}

import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/auth";   // pair of signAdminToken — adjust name if yours differs
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // server-side guard so /admin is never public
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  let authorized = false;
  if (token) {
    try { authorized = !!(await verifyAdminToken(token)); } catch { authorized = false; }
  }
  if (!authorized) redirect("/admin/login");

  const [cand, an, ai, rec] = await Promise.all([
    supabaseAdmin.from("candidate_profiles").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("analytics_events").select("*").order("created_at", { ascending: false }).limit(5000),
    supabaseAdmin.from("ai_usage_logs").select("*").order("created_at", { ascending: false }).limit(3000),
    supabaseAdmin.from("recruiters").select("*, subscriptions(*)").order("created_at", { ascending: false }),
  ]);

  return (
    <AdminDashboard
      candidates={cand.data || []}
      analytics={an.data || []}
      aiLogs={ai.data || []}
      recruiters={rec.data || []}
    />
  );
}
# Cvyon Operations Runbook

## Deployment
Cvyon is deployed via Vercel. Pushing to the `main` branch automatically triggers a production deployment.

1. `git add .`
2. `git commit -m "feat: your feature"`
3. `git push origin main`

## Environment Variables
If you add a new environment variable:
1. Update `.env.example`
2. Add the variable to Vercel (Project Settings > Environment Variables).
3. If it affects the build process, trigger a redeploy in Vercel.

## Rollback Procedure
If a production deployment introduces a critical bug:
1. Open the Vercel Dashboard.
2. Go to the **Deployments** tab.
3. Find the last known good deployment.
4. Click the three dots (...) next to it and select **Promote to Production** (or **Assign Custom Domains**).
5. Address the bug in your local environment, commit the fix, and push to deploy normally.

## Incident Response: Missing Supabase Admin Key
**Symptom**: `CRITICAL: Supabase service role key is missing in production` error in logs. Database writes (like candidate opt-ins) are failing silently or throwing 500s.
**Resolution**:
1. Check Vercel Environment Variables.
2. Ensure `SUPABASE_SERVICE_ROLE_KEY` is set correctly and does NOT have a `NEXT_PUBLIC_` prefix.
3. Trigger a redeploy.

## Incident Response: Paystack Webhook Failures
**Symptom**: Invoices are not sending, or subscriptions are not activating.
**Resolution**:
1. Check Vercel logs for `[webhook] Paystack webhook processing failed`.
2. Verify `PAYSTACK_SECRET_KEY` in Vercel.
3. If QStash is configured, check the Upstash Dashboard for queued/failed events and replay them.
4. Check Supabase `webhook_event_queue` (if implemented) for unprocessed events.

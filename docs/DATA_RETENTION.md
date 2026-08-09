# Data Retention Policy

## Scope
This policy outlines the retention periods and deletion procedures for data stored within the Cvyon database (Supabase).

## Retention Periods

### 1. Candidate Profiles (Opt-ins)
- **Active Users**: Kept indefinitely until account deletion is requested.
- **Inactive Guest Users**: Guest profiles that have not interacted with the platform (e.g., updated their resume) for **365 days** should be scrubbed of personally identifiable information (PII).
- **Soft Deletes**: When a user requests deletion, their `candidate_profiles` record is marked with a `deleted_at` timestamp. 
  - *Retention*: Soft-deleted records are retained for **30 days** for recovery purposes, after which they are permanently deleted via an automated job.

### 2. Audit Logs
- **System Admin Logs**: Retained for **1 year** for security compliance and auditing purposes.

### 3. Analytics Events
- **Aggregated Data**: Kept indefinitely.
- **Raw Event Data** (e.g., `analytics_events` table): Retained for **90 days**.

## Proposed Implementation (SQL Cron)
To enforce this policy automatically, the following SQL function and pg_cron job should be configured in Supabase:

```sql
-- Function to hard delete soft-deleted profiles after 30 days
CREATE OR REPLACE FUNCTION hard_delete_expired_profiles()
RETURNS void AS $$
BEGIN
  DELETE FROM candidate_profiles 
  WHERE deleted_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Requires pg_cron extension
-- SELECT cron.schedule('0 0 * * *', $$SELECT hard_delete_expired_profiles()$$);
```

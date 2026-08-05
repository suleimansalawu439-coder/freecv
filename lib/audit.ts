import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { logger } from '@/lib/logger';

export interface AuditLogEntry {
  actor_email?: string;
  actor_role?: string;
  action: string;
  target_table?: string;
  target_id?: string | number;
  metadata?: Record<string, unknown>;
  ip_address?: string;
}

/**
 * Dispatches an audit trail log entry to Supabase audit table and application logger.
 */
export async function logAdminAction(entry: AuditLogEntry): Promise<void> {
  const timestamp = new Date().toISOString();
  logger.info('ADMIN_AUDIT', `${entry.actor_email || 'admin'} performed ${entry.action}`, {
    target: `${entry.target_table || 'unknown'}:${entry.target_id || 'n/a'}`,
    metadata: entry.metadata,
  });

  if (!isSupabaseConfigured) return;

  try {
    // Attempt insert into audit_logs table if configured
    await supabaseAdmin.from('audit_logs').insert({
      actor_email: entry.actor_email || 'admin',
      actor_role: entry.actor_role || 'admin',
      action: entry.action,
      target_table: entry.target_table,
      target_id: entry.target_id?.toString(),
      metadata: entry.metadata,
      ip_address: entry.ip_address,
      created_at: timestamp,
    });
  } catch (err) {
    // Audit table may not exist in all environments; fail safe
    logger.warn('ADMIN_AUDIT', 'Could not record audit log to database', { error: err });
  }
}

/**
 * Performs a safe soft-delete by setting deleted_at timestamp instead of hard deleting.
 */
export async function softDeleteRecord(
  tableName: string,
  id: string | number,
  actorEmail?: string
) {
  if (!isSupabaseConfigured) return { success: false, error: 'Database unconfigured' };

  const { data, error } = await supabaseAdmin
    .from(tableName)
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
    .select();

  if (!error) {
    await logAdminAction({
      actor_email: actorEmail,
      action: `SOFT_DELETE_${tableName.toUpperCase()}`,
      target_table: tableName,
      target_id: id,
    });
  }

  return { success: !error, data, error };
}

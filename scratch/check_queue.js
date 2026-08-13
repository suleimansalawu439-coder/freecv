import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkAndCreate() {
  const { error } = await supabaseAdmin.from('webhook_event_queue').select('id').limit(1);
  if (error && error.code === '42P01') { // table does not exist
    console.log("Creating webhook_event_queue table...");
    // we cannot create table via REST, we need postgres connection or we can use rpc
    // actually, let's just output this.
    console.log("Error:", error);
  } else {
    console.log("Table exists or other error:", error);
  }
}
checkAndCreate();

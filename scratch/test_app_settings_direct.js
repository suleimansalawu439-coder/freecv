const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables manually
const envPath = path.join(__dirname, '../.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Service Role Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAppSettings() {
  const key = "billing_config";
  const value = { "currency": "USD", "test": true };
  const now = new Date().toISOString();

  console.log("Upserting app_settings:", { key, value });
  
  const { data, error } = await supabase
    .from('app_settings')
    .upsert({ key, value, updated_at: now }, { onConflict: 'key' })
    .select();

  if (error) {
    console.error("Upsert failed:", error);
  } else {
    console.log("Upsert succeeded, returned data:", data);
  }

  // Fetch it back
  const { data: fetchRes, error: fetchErr } = await supabase
    .from('app_settings')
    .select('*')
    .eq('key', key)
    .single();

  if (fetchErr) {
    console.error("Fetch failed:", fetchErr);
  } else {
    console.log("Fetch succeeded, returned data:", fetchRes);
  }
}

testAppSettings().catch(console.error);

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

async function testSupabase() {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  console.log('Env content length:', envContent.length);

  // Let's check environment keys
  console.log('Process env NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('Process env SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Present' : 'Missing');
}

testSupabase();

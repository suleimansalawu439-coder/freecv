import { supabaseAdmin } from '../lib/supabase';

async function test() {
  const { data, error } = await supabaseAdmin.from('app_settings').select('*');
  console.log('Settings:', data, error);
}
test();

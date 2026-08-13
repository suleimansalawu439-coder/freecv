import { supabaseAdmin } from './lib/supabase.ts';
async function test() {
  const { data } = await supabaseAdmin.from('app_settings').select('*');
  console.log(data);
}
test();

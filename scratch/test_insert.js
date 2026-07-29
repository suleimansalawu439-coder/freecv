const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://fmvhwqtizyjqzmqwhapa.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_n5_xr1pnA6T49dX4MApi3A_xMsh3KNe';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function seedData() {
  console.log('Testing connection...');
  
  const { data: candData, error: candErr } = await supabase
    .from('candidates')
    .insert([{
      name: 'John Doe',
      email: 'john@example.com',
      job_title: 'Software Engineer',
      location: 'New York, US',
      country: 'United States',
      device_type: 'desktop',
      resume_data: { personalInfo: { fullName: 'John Doe', email: 'john@example.com' } }
    }])
    .select();
    
  if (candErr) console.error('Candidate Insert Error:', candErr);
  else console.log('Candidate Inserted:', candData);
}

seedData();

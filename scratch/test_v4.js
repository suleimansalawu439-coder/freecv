async function run() {
  const affid = 'db55c553cc5b620a5a1f001cd48a96dc';
  
  const params = new URLSearchParams({
    keywords: 'software engineer',
    location: 'United States',
    locale_code: 'en_US',
    user_ip: '8.8.8.8',
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    page: '1',
    page_size: '5'
  });

  const url = 'https://search.api.careerjet.net/v4/query?' + params.toString();
  console.log('Testing CareerJet v4 URL:', url);

  const authHeader = 'Basic ' + Buffer.from(affid + ':').toString('base64');

  const res = await fetch(url, {
    headers: {
      'Authorization': authHeader,
      'Accept': 'application/json',
      'Referer': 'https://cvyon.com'
    }
  });

  console.log('Status:', res.status);
  const text = await res.text();
  console.log('Body:', text.slice(0, 500));
}

run();

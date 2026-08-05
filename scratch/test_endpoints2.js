async function run() {
  const params = new URLSearchParams({
    affid: 'db55c553cc5b620a5a1f001cd48a96dc',
    keywords: 'software developer',
    location: 'United States',
    locale_code: 'en_US',
    user_ip: '8.8.8.8',
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    page: '1',
    pagesize: '5'
  });

  const url = 'http://public.api.careerjet.net/search?' + params.toString();
  console.log('Testing URL:', url);

  const res = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Referer': 'https://cvyon.com'
    }
  });

  console.log('Status:', res.status);
  const text = await res.text();
  console.log('Response length:', text.length);
  try {
    const json = JSON.parse(text);
    console.log('Response JSON:', JSON.stringify(json, null, 2).slice(0, 1000));
  } catch (e) {
    console.log('Raw response:', text);
  }
}

run();

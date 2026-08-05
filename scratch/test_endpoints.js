async function testEndpoint(url, headers = {}) {
  try {
    const start = Date.now();
    const res = await fetch(url, { headers });
    const took = Date.now() - start;
    const body = await res.text();
    console.log(`[${res.status}] ${took}ms -> ${url}`);
    console.log(`  Body preview: ${body.slice(0, 150)}`);
  } catch (err) {
    console.log(`[ERR] ${url} -> ${err.message}`);
  }
}

async function run() {
  console.log('Testing CareerJet endpoints directly:');
  await testEndpoint('http://public.api.careerjet.net/search?affid=db55c553cc5b620a5a1f001cd48a96dc&keywords=software&user_ip=8.8.8.8&user_agent=Mozilla/5.0');
  await testEndpoint('https://public.api.careerjet.net/search?affid=db55c553cc5b620a5a1f001cd48a96dc&keywords=software&user_ip=8.8.8.8&user_agent=Mozilla/5.0');
  await testEndpoint('https://search.api.careerjet.net/v4/query?keywords=software&user_ip=8.8.8.8', {
    'Authorization': 'Basic ' + Buffer.from('db55c553cc5b620a5a1f001cd48a96dc:').toString('base64')
  });
  await testEndpoint('http://search.api.careerjet.net/v4/query?keywords=software&user_ip=8.8.8.8', {
    'Authorization': 'Basic ' + Buffer.from('db55c553cc5b620a5a1f001cd48a96dc:').toString('base64')
  });
  await testEndpoint('https://api.careerjet.net/search?affid=db55c553cc5b620a5a1f001cd48a96dc&keywords=software&user_ip=8.8.8.8&user_agent=Mozilla/5.0');
}

run();

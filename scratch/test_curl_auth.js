async function testAuth(desc, headers) {
  const url = 'https://search.api.careerjet.net/v4/query?keywords=software&location=United+States&locale_code=en_US&user_ip=8.8.8.8&user_agent=Mozilla/5.0';
  try {
    const res = await fetch(url, { headers });
    const text = await res.text();
    console.log(`[${desc}] Status: ${res.status}`);
    console.log(`  Body: ${text.slice(0, 200)}`);
  } catch (err) {
    console.log(`[${desc}] Error: ${err.message}`);
  }
}

async function run() {
  const key = 'db55c553cc5b620a5a1f001cd48a96dc';
  
  await testAuth('Explicit Header Basic (key:)', {
    'Authorization': 'Basic ' + Buffer.from(key + ':').toString('base64'),
    'Referer': 'https://cvyon.com',
    'Accept': 'application/json'
  });

  await testAuth('Explicit Header Basic (key:empty)', {
    'Authorization': 'Basic ' + Buffer.from(key + ':""').toString('base64'),
    'Referer': 'https://cvyon.com',
    'Accept': 'application/json'
  });

  await testAuth('Bearer Header', {
    'Authorization': 'Bearer ' + key,
    'Referer': 'https://cvyon.com',
    'Accept': 'application/json'
  });
}

run();

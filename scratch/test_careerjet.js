const https = require('https');

async function testFetch() {
  try {
    const payload = JSON.stringify({
      keywords: 'engineer',
      locale_code: 'en_US',
      user_ip: '8.8.8.8',
      user_agent: 'Mozilla/5.0'
    });

    console.log('Testing https://proxy.ojnfoundation.org/careerjet.php ...');
    const res = await fetch('https://proxy.ojnfoundation.org/careerjet.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Proxy-Secret': 'CVYON_SECURE_PROXY_2026'
      },
      body: payload
    });

    console.log('HTTP Status:', res.status);
    const body = await res.text();
    console.log('Response body:', body);
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

testFetch();

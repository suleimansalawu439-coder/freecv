async function testLiveProxy() {
  try {
    const res = await fetch('https://proxy.ojnfoundation.org/careerjet.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Proxy-Secret': 'CVYON_SECURE_PROXY_2026'
      },
      body: JSON.stringify({
        keywords: 'software developer',
        location: 'United States',
        locale_code: 'en_US',
        user_ip: '8.8.8.8',
        user_agent: 'Mozilla/5.0',
        page: 1,
        page_size: 3
      })
    });

    console.log('HTTP Status:', res.status);
    const body = await res.text();
    console.log('Response body:', body);
  } catch (e) {
    console.error('Error:', e);
  }
}

testLiveProxy();

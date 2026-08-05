async function testLiveProxy() {
  try {
    const res = await fetch('https://proxy.ojnfoundation.org/careerjet.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Proxy-Secret': 'CVYON_SECURE_PROXY_2026'
      },
      body: JSON.stringify({
        keywords: 'software engineer',
        location: 'United States',
        locale_code: 'en_US',
        user_ip: '102.89.23.45',
        referer: 'https://www.cvyon.com',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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

async function testKey(affid, referer) {
  try {
    const res = await fetch('https://proxy.ojnfoundation.org/careerjet.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Proxy-Secret': 'CVYON_SECURE_PROXY_2026'
      },
      body: JSON.stringify({
        affid,
        referer,
        keywords: 'developer',
        location: 'United States',
        locale_code: 'en_US',
        user_ip: '8.8.8.8',
        user_agent: 'Mozilla/5.0',
        page: 1,
        page_size: 3
      })
    });

    const body = await res.text();
    console.log(`[affid: ${affid || 'default'}] Status: ${res.status} -> ${body.slice(0, 180)}`);
  } catch (e) {
    console.error('Error:', e.message);
  }
}

async function run() {
  await testKey('', 'https://cvyon.com');
  await testKey('db55c553cc5b620a5a1f001cd48a96dc', 'https://cvyon.com');
}

run();

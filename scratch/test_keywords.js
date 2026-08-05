async function testQuery(kw) {
  const params = new URLSearchParams({
    affid: 'db55c553cc5b620a5a1f001cd48a96dc',
    keywords: kw,
    location: 'Nigeria',
    locale_code: 'en_NG',
    user_ip: '8.8.8.8',
    user_agent: 'Mozilla/5.0',
    page: '1',
    pagesize: '5'
  });

  const url = 'http://public.api.careerjet.net/search?' + params.toString();
  const res = await fetch(url, { headers: { Accept: 'application/json', Referer: 'https://cvyon.com' } });
  const data = await res.json().catch(() => null);
  console.log(`Keywords "${kw}" -> ${data?.jobs?.length || 0} jobs (type: ${data?.type})`);
}

async function run() {
  await testQuery('Frontend Developer');
  await testQuery('Frontend Developer React');
  await testQuery('Frontend Developer React TypeScript Tailwind CSS Git Node Docker');
}

run();

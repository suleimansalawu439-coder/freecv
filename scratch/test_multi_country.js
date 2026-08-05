async function testCountry(country, locale, keywords) {
  const params = new URLSearchParams({
    affid: 'db55c553cc5b620a5a1f001cd48a96dc',
    keywords,
    location: country,
    locale_code: locale,
    user_ip: '8.8.8.8',
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    page: '1',
    pagesize: '3'
  });

  const url = 'http://public.api.careerjet.net/search?' + params.toString();
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Referer': 'https://cvyon.com'
    }
  });

  const data = await res.json().catch(() => null);
  console.log(`\n=== [${country} (${locale})] keywords: "${keywords}" ===`);
  console.log(`Status: ${res.status}, Type: ${data?.type}, Total jobs: ${data?.jobs?.length || 0}`);
  if (data?.jobs?.length) {
    data.jobs.slice(0, 2).forEach((j, i) => {
      console.log(`  ${i + 1}. ${j.title} @ ${j.company || 'Unknown'} (${j.locations})`);
    });
  } else {
    console.log('  Response:', JSON.stringify(data));
  }
}

async function run() {
  await testCountry('Nigeria', 'en_NG', 'Accountant');
  await testCountry('Nigeria', 'en_NG', 'Software');
  await testCountry('United Kingdom', 'en_GB', 'Developer');
  await testCountry('Canada', 'en_CA', 'Nurse');
  await testCountry('United States', 'en_US', 'Product Manager');
  await testCountry('Germany', 'de_DE', 'Ingenieur');
}

run();

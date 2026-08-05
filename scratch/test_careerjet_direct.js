async function test() {
  const apiKey = "db55c553cc5b620a5a1f001cd48a96dc";
  
  // Test 1: Basic auth v4
  try {
    const res1 = await fetch('https://search.api.careerjet.net/v4/query?locale_code=en_US&keywords=nurse&user_ip=8.8.8.8&user_agent=Mozilla%2F5.0', {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(apiKey + ':').toString('base64'),
        'Accept': 'application/json'
      }
    });
    console.log('Test 1 (Basic auth):', res1.status, await res1.text());
  } catch (e) { console.error('T1 err', e); }

  // Test 2: Bearer auth v4
  try {
    const res2 = await fetch('https://search.api.careerjet.net/v4/query?locale_code=en_US&keywords=nurse&user_ip=8.8.8.8&user_agent=Mozilla%2F5.0', {
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Accept': 'application/json'
      }
    });
    console.log('Test 2 (Bearer auth):', res2.status, await res2.text());
  } catch (e) { console.error('T2 err', e); }

  // Test 3: Query param api_key v4
  try {
    const res3 = await fetch(`https://search.api.careerjet.net/v4/query?api_key=${apiKey}&locale_code=en_US&keywords=nurse&user_ip=8.8.8.8&user_agent=Mozilla%2F5.0`, {
      headers: { 'Accept': 'application/json' }
    });
    console.log('Test 3 (Query api_key):', res3.status, await res3.text());
  } catch (e) { console.error('T3 err', e); }

  // Test 4: Classic public.api.careerjet.net/search with affid
  try {
    const res4 = await fetch(`http://public.api.careerjet.net/search?affid=${apiKey}&locale_code=en_US&keywords=nurse&user_ip=8.8.8.8&user_agent=Mozilla%2F5.0`, {
      headers: { 'Accept': 'application/json' }
    });
    console.log('Test 4 (Classic public API affid):', res4.status, await res4.text());
  } catch (e) { console.error('T4 err', e); }

  // Test 5: Classic search with https
  try {
    const res5 = await fetch(`https://public.api.careerjet.net/search?affid=${apiKey}&locale_code=en_US&keywords=nurse&user_ip=8.8.8.8&user_agent=Mozilla%2F5.0`, {
      headers: { 'Accept': 'application/json' }
    });
    console.log('Test 5 (Classic https affid):', res5.status, await res5.text());
  } catch (e) { console.error('T5 err', e); }
}

test();

const mockClient = {
  then: (resolve) => resolve({ data: [1], error: null }),
  catch: (resolve) => resolve(null)
};

async function test() {
  console.log("awaiting mock...");
  const res = await mockClient;
  console.log("result", res);
}

test().catch(console.error);

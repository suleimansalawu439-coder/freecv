const dns = require('dns');

dns.lookup('proxy.ojnfoundation.org', (err, address, family) => {
  console.log('proxy.ojnfoundation.org IP:', address);
});

# ADR 0002: CareerJet Affiliate IP Proxy

## Status
Accepted

## Context
The platform integrates with the CareerJet affiliate API to fetch job listings. The CareerJet API requires a static `user_ip` parameter for authentication and tracking. However, Cvyon is hosted on Vercel, a serverless environment where outbound IP addresses are dynamic and change constantly.

## Decision
We implemented a PHP proxy script (`careerjet.php`) hosted on a traditional shared hosting environment (Namecheap) at `proxy.ojnfoundation.org`. 
When the Next.js API route (`/api/affiliate/jobs`) needs to query CareerJet, it securely forwards the request to the PHP proxy. The proxy, having a static IP address, makes the final request to CareerJet and returns the results to Vercel.

## Consequences
- **Pros**: Circumvents the strict static IP requirement of the affiliate network without requiring us to migrate the entire Next.js application off Vercel.
- **Cons**: Introduces a single point of failure (the Namecheap proxy) and adds network latency to the job fetching process. To mitigate this, a fallback mechanism has been implemented in the Vercel route to return generic jobs if the proxy is unreachable.

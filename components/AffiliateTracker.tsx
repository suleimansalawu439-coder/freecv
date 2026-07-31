'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function AffiliateTracker() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const ref = searchParams?.get('ref');
    if (ref) {
      const isTracked = document.cookie.includes('affiliate_ref=');
      if (!isTracked) {
        document.cookie = `affiliate_ref=${ref}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
        
        fetch('/api/affiliate/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ref_code: ref })
        }).catch(console.error);
      }
    }
  }, [searchParams]);

  return null;
}

'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function AffiliateTracker() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const ref = searchParams?.get('ref');
    if (ref) {
      const storedRef = localStorage.getItem('cvyon_ref');
      const isTracked = document.cookie.includes(`affiliate_ref=${ref}`);
      
      if (!isTracked || storedRef !== ref) {
        document.cookie = `affiliate_ref=${encodeURIComponent(ref)}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
        try { localStorage.setItem('cvyon_ref', ref); } catch {}

        fetch('/api/affiliate/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ref_code: ref,
            session_id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : undefined
          })
        }).catch(console.error);
      }
    }
  }, [searchParams]);

  return null;
}

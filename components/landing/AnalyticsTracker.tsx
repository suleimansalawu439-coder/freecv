"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

function Tracker() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    trackEvent('landing_started', undefined, { source: searchParams.get('source') || 'direct' });
  }, [searchParams]);

  return null;
}

export function AnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}

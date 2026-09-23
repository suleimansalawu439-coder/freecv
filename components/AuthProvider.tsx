"use client";

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useResumeStore } from '@/store/useResumeStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const syncToCloud = useResumeStore((state) => state.syncToCloud);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        if (session) {
          syncToCloud();
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [syncToCloud]);

  return <>{children}</>;
}

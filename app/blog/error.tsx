'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Blog article failed to load:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200 shadow-xl p-10 text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
          Article unavailable
        </p>
        <h1 className="text-2xl font-black uppercase tracking-tight mb-3">
          Couldn&apos;t load this article
        </h1>
        <p className="text-gray-600 mb-8">
          Something went wrong on our end. Please try again in a moment.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-black text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-gray-800 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/blog"
            className="px-6 py-3 border-2 border-black text-sm font-bold uppercase tracking-widest rounded-full hover:bg-black hover:text-white transition-colors"
          >
            All articles
          </Link>
        </div>
      </div>
    </div>
  );
}

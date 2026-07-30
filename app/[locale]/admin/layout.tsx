import React from 'react';

export const metadata = {
  title: 'Cvyon Admin',
  robots: 'noindex, nofollow'
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-black selection:text-white">
      {children}
    </div>
  );
}

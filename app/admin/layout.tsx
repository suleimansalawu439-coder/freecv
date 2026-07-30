import React from 'react';

export const metadata = {
  title: 'Cvyon Admin',
  robots: 'noindex, nofollow'
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-white selection:text-black">
      {children}
    </div>
  );
}

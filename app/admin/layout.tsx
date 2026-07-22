import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Settings, FileText, Database, Activity, Shield, Cpu, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'FreeCV Admin',
  robots: 'noindex, nofollow'
};

const navItems = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
  { label: 'Analytics', href: '/admin/analytics', icon: Activity },
  { label: 'AI Usage', href: '/admin/ai', icon: Cpu },
  { label: 'Export Logs', href: '/admin/exports', icon: FileText },
  { label: 'Blog CMS', href: '/admin/blog', icon: FileText },
  { label: 'SEO Pages', href: '/admin/seo', icon: Database },
  { label: 'Health', href: '/admin/health', icon: Activity },
  { label: 'Security', href: '/admin/security', icon: Shield },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans selection:bg-black selection:text-white">
      <aside className="w-64 bg-black text-white p-6 flex flex-col shrink-0 overflow-y-auto">
        <div className="mb-12">
          <h1 className="text-2xl font-black tracking-tight mb-2">FreeCV Admin</h1>
          <a href="/" target="_blank" className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
            View Live Site <ExternalLink size={10} />
          </a>
        </div>
        <nav className="space-y-2 flex-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
              <item.icon size={18} /> {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-12 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

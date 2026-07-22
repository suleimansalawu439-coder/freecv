import React from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import { Settings2, Key, Database, Globe } from 'lucide-react';

export default async function AdminSettingsPage() {
  const { data: settings } = await supabaseAdmin.from('site_settings').select('*').single();
  const { data: flags } = await supabaseAdmin.from('feature_flags').select('*').order('key');

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-2">Platform Settings</h1>
        <p className="text-gray-500">Manage environment variables, site metadata, and global feature flags.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Global Feature Flags */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Settings2 size={24} /></div>
            <div>
              <h2 className="text-xl font-bold">Feature Flags</h2>
              <p className="text-sm text-gray-500">Toggle platform capabilities in real-time.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {flags?.map((flag: any) => (
              <div key={flag.key} className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm">{flag.key}</h3>
                  <p className="text-xs text-gray-500">{flag.description}</p>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${flag.is_enabled ? 'bg-black' : 'bg-gray-200'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${flag.is_enabled ? 'translate-x-7' : 'translate-x-1'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Site Metadata */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Globe size={24} /></div>
            <div>
              <h2 className="text-xl font-bold">Site Metadata</h2>
              <p className="text-sm text-gray-500">Configure global platform settings.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Site Name</label>
              <input type="text" defaultValue={settings?.site_name} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-black focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Maintenance Mode</label>
              <select defaultValue={settings?.maintenance_mode ? 'yes' : 'no'} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-black focus:outline-none">
                <option value="no">Disabled (Live)</option>
                <option value="yes">Enabled (Down for Maintenance)</option>
              </select>
            </div>
            <button className="w-full bg-black text-white py-3 rounded-xl font-bold text-sm mt-4 hover:bg-gray-800 transition-colors">
              Save Settings
            </button>
          </div>
        </div>

        {/* Environment Variables (Mocked for safety) */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Key size={24} /></div>
            <div>
              <h2 className="text-xl font-bold">API Keys & Services</h2>
              <p className="text-sm text-gray-500">Environment variables loaded from Vercel.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Gemini API Key</label>
              <div className="flex bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono text-gray-500">
                AIzaSyB**************************
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Supabase URL</label>
              <div className="flex bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono text-gray-500">
                https://xxxx.supabase.co
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

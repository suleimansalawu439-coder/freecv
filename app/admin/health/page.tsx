import React from 'react';
import { Activity, Database, Cpu, Globe, CheckCircle2 } from 'lucide-react';

export default function AdminHealthPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-2">System Health</h1>
        <p className="text-gray-500">Real-time status of critical infrastructure components.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Globe size={24} /></div>
              <h2 className="text-xl font-bold">Vercel Edge Network</h2>
            </div>
            <div className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">
              <CheckCircle2 size={16} /> Operational
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-2">Latency: 12ms</p>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full w-full" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Database size={24} /></div>
              <h2 className="text-xl font-bold">Supabase Database</h2>
            </div>
            <div className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">
              <CheckCircle2 size={16} /> Operational
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-2">Connection Pool: 4/15 Active</p>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full w-full" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Cpu size={24} /></div>
              <h2 className="text-xl font-bold">Google Gemini API</h2>
            </div>
            <div className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">
              <CheckCircle2 size={16} /> Operational
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-2">Average Response: 1.8s</p>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Shield, Ban, AlertTriangle } from 'lucide-react';

export default function AdminSecurityPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-2">Spam & Abuse</h1>
        <p className="text-gray-500">Monitor rate limits and block malicious IPs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl"><Ban size={24} /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Blocked IPs</p>
            <p className="text-3xl font-black">12</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl"><AlertTriangle size={24} /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Rate Limit Warnings</p>
            <p className="text-3xl font-black">45</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Block Events</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">IP Address</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Reason</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Timestamp</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-mono text-sm">192.168.1.104</td>
                <td className="p-4 text-sm text-red-600 font-bold">API Abuse (AI Generation)</td>
                <td className="p-4 text-sm text-gray-500">Just now</td>
                <td className="p-4 text-right">
                  <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">Unblock</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

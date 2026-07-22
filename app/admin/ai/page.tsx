import React from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import { Cpu, Zap, Search, Activity } from 'lucide-react';

export default async function AdminAIPage() {
  const { data: logs } = await supabaseAdmin.from('ai_usage_logs').select('*').order('created_at', { ascending: false });

  const totalPrompts = logs?.reduce((acc: number, log: any) => acc + (log.prompt_tokens || 0), 0) || 0;
  const totalCompletions = logs?.reduce((acc: number, log: any) => acc + (log.completion_tokens || 0), 0) || 0;
  const totalTokens = totalPrompts + totalCompletions;

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-2">AI Operations</h1>
        <p className="text-gray-500">Monitor Gemini AI token usage, API latency, and feature adoption.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl"><Cpu size={24} /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Total Tokens</p>
            <p className="text-3xl font-black">{totalTokens.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Zap size={24} /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Prompt Tokens</p>
            <p className="text-3xl font-black">{totalPrompts.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-green-50 text-green-600 rounded-2xl"><Activity size={24} /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Output Tokens</p>
            <p className="text-3xl font-black">{totalCompletions.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold">API Request Log</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search logs..." className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Feature</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Prompt Tokens</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Completion Tokens</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs?.map((log: any) => (
                <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-sm uppercase tracking-wider">{log.feature}</td>
                  <td className="p-4 text-sm">{log.prompt_tokens?.toLocaleString() || 0}</td>
                  <td className="p-4 text-sm">{log.completion_tokens?.toLocaleString() || 0}</td>
                  <td className="p-4 text-sm text-gray-500">{new Date(log.created_at).toLocaleString()}</td>
                </tr>
              ))}
              {(!logs || logs.length === 0) && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500 text-sm">No AI logs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

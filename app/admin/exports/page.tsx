import React from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import { FileText, Download, Clock } from 'lucide-react';

export default async function AdminExportsPage() {
  const { data: logs } = await supabaseAdmin.from('export_logs').select('*').order('created_at', { ascending: false });

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-2">Export Logs</h1>
        <p className="text-gray-500">Real-time log of all PDF and DOCX document generations.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><FileText size={24} /></div>
            <div>
              <h2 className="text-xl font-bold">Recent Exports</h2>
              <p className="text-sm text-gray-500">Tracking all document formats.</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
            <Download size={16} /> Export CSV
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">ID</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Format</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Template</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs?.map((log: any) => (
                <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-mono text-sm text-gray-500">#{log.id.slice(0, 8) || log.id}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${log.format === 'pdf' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                      {log.format}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-sm">{log.template_id || 'Unknown'}</td>
                  <td className="p-4 text-sm text-gray-500 flex items-center gap-2">
                    <Clock size={14} />
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
              {(!logs || logs.length === 0) && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500 text-sm">No export logs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { Shield, Trash2, Download, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Manage Your Data | FreeCV',
  description: 'Manage your privacy, download your data, or request deletion.'
};

export default function ManageDataPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 selection:bg-black selection:text-white">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-12">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-50 p-4 rounded-full text-blue-600">
            <Shield size={48} />
          </div>
        </div>
        
        <h1 className="text-3xl font-black tracking-tight text-center mb-4">Your Privacy Matters</h1>
        <p className="text-gray-500 text-center mb-10 text-sm font-medium">
          FreeCV is committed to radical transparency. You have complete control over your data. If you opted into our Talent CRM, you can download everything we have on you or delete it permanently.
        </p>

        <div className="space-y-6">
          {/* Download Data */}
          <div className="border border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-3 rounded-xl shrink-0 mt-1">
                <Download size={24} className="text-gray-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Download My Data</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">
                  Request a JSON export of all data associated with your email address in our Talent CRM, including your full parsed resume data, location, and metadata.
                </p>
                <form className="flex gap-3">
                  <input type="email" placeholder="Your email address" required className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-black outline-none" />
                  <button type="submit" className="bg-black text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors">Request Export</button>
                </form>
              </div>
            </div>
          </div>

          {/* Delete Data */}
          <div className="border border-red-100 bg-red-50/30 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-xl shrink-0 mt-1">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-950">Delete My Data</h3>
                <p className="text-sm text-red-800/70 mt-1 mb-4">
                  Permanently erase your profile, resume data, and all traces of your email from our Talent CRM. This action cannot be undone.
                </p>
                <form className="flex gap-3">
                  <input type="email" placeholder="Your email address" required className="flex-1 bg-white border border-red-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none text-red-900" />
                  <button type="submit" className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-red-700 transition-colors flex items-center gap-2">
                    <AlertTriangle size={14} /> Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="text-sm font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest">
            ← Return to Builder
          </Link>
        </div>
      </div>
    </div>
  );
}

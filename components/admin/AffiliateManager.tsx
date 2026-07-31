"use client";

import React, { useState } from 'react';
import { Plus, Link as LinkIcon, Copy, Trash2, TrendingUp, Users, DollarSign } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils'; // Assuming this exists or I'll just write it in

export default function AffiliateManager({ affiliates: initialAffiliates, affiliateClicks, affiliateConversions, isDarkMode }: any) {
  const [affiliates, setAffiliates] = useState(initialAffiliates || []);
  const [isCreating, setIsCreating] = useState(false);
  const [newAffiliateName, setNewAffiliateName] = useState('');
  const [newAffiliateRate, setNewAffiliateRate] = useState(20);
  
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAffiliateName) return;
    
    const refCode = newAffiliateName.toLowerCase().replace(/[^a-z0-9]/g, '') + Math.floor(Math.random() * 1000);
    
    try {
      const { data, error } = await supabase
        .from('affiliates')
        .insert([{ name: newAffiliateName, ref_code: refCode, commission_rate: newAffiliateRate }])
        .select()
        .single();
        
      if (error) throw error;
      
      setAffiliates([data, ...affiliates]);
      setNewAffiliateName('');
      setIsCreating(false);
      toast.success('Affiliate created successfully');
    } catch (err: any) {
      toast.error('Failed to create affiliate: ' + err.message);
    }
  };
  
  const copyLink = (refCode: string) => {
    const url = `${window.location.origin}/?ref=${refCode}`;
    navigator.clipboard.writeText(url);
    toast.success('Affiliate link copied to clipboard');
  };

  const getAffiliateStats = (refCode: string) => {
    const clicks = affiliateClicks?.filter((c: any) => c.ref_code === refCode) || [];
    const conversions = affiliateConversions?.filter((c: any) => c.ref_code === refCode) || [];
    const totalRevenue = conversions.reduce((sum: number, c: any) => sum + Number(c.amount), 0);
    return { clicks: clicks.length, conversions: conversions.length, revenue: totalRevenue };
  };

  const totalClicks = affiliateClicks?.length || 0;
  const totalConversions = affiliateConversions?.length || 0;
  const totalCommission = affiliates.reduce((sum: number, a: any) => {
    const stats = getAffiliateStats(a.ref_code);
    return sum + (stats.revenue * (a.commission_rate / 100));
  }, 0);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={cn("rounded-xl p-6 shadow-sm border", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><TrendingUp size={20} /></div>
            <h3 className={cn("font-medium", isDarkMode ? "text-gray-400" : "text-gray-600")}>Total Clicks</h3>
          </div>
          <p className="text-3xl font-bold">{totalClicks}</p>
        </div>
        <div className={cn("rounded-xl p-6 shadow-sm border", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><Users size={20} /></div>
            <h3 className={cn("font-medium", isDarkMode ? "text-gray-400" : "text-gray-600")}>Total Conversions</h3>
          </div>
          <p className="text-3xl font-bold">{totalConversions}</p>
        </div>
        <div className={cn("rounded-xl p-6 shadow-sm border", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><DollarSign size={20} /></div>
            <h3 className={cn("font-medium", isDarkMode ? "text-gray-400" : "text-gray-600")}>Est. Commission</h3>
          </div>
          <p className="text-3xl font-bold">${totalCommission.toFixed(2)}</p>
        </div>
      </div>

      {/* Main Panel */}
      <div className={cn("rounded-xl shadow-sm border overflow-hidden", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
        <div className={cn("p-6 border-b flex justify-between items-center", isDarkMode ? "border-gray-800" : "border-gray-200")}>
          <h2 className="text-lg font-bold">Affiliate Partners</h2>
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} /> New Affiliate
          </button>
        </div>

        {isCreating && (
          <div className={cn("p-6 border-b", isDarkMode ? "bg-gray-900/50 border-gray-800" : "bg-gray-50 border-gray-200")}>
            <form onSubmit={handleCreate} className="flex items-end gap-4 max-w-2xl">
              <div className="flex-1">
                <label className={cn("block text-xs font-medium mb-1", isDarkMode ? "text-gray-400" : "text-gray-600")}>Partner Name</label>
                <input 
                  type="text" 
                  value={newAffiliateName}
                  onChange={(e) => setNewAffiliateName(e.target.value)}
                  className={cn("w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500", isDarkMode ? "bg-black border-gray-700 text-white" : "bg-white border-gray-300")}
                  placeholder="e.g. John Doe / TechBlog"
                  required
                />
              </div>
              <div className="w-32">
                <label className={cn("block text-xs font-medium mb-1", isDarkMode ? "text-gray-400" : "text-gray-600")}>Commission (%)</label>
                <input 
                  type="number" 
                  value={newAffiliateRate}
                  onChange={(e) => setNewAffiliateRate(Number(e.target.value))}
                  className={cn("w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500", isDarkMode ? "bg-black border-gray-700 text-white" : "bg-white border-gray-300")}
                  min="0" max="100"
                  required
                />
              </div>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium h-[38px]">
                Save
              </button>
              <button type="button" onClick={() => setIsCreating(false)} className={cn("px-4 py-2 rounded-lg text-sm font-medium border h-[38px]", isDarkMode ? "border-gray-700 hover:bg-gray-800 text-gray-300" : "border-gray-300 hover:bg-gray-100")}>
                Cancel
              </button>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className={cn("text-xs uppercase", isDarkMode ? "bg-gray-900/50 text-gray-400" : "bg-gray-50 text-gray-600")}>
              <tr>
                <th className="px-6 py-4 font-medium">Partner Name</th>
                <th className="px-6 py-4 font-medium">Ref Code</th>
                <th className="px-6 py-4 font-medium">Rate</th>
                <th className="px-6 py-4 font-medium">Clicks</th>
                <th className="px-6 py-4 font-medium">Convs</th>
                <th className="px-6 py-4 font-medium">Commission</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {affiliates.map((affiliate: any) => {
                const stats = getAffiliateStats(affiliate.ref_code);
                const commission = stats.revenue * (affiliate.commission_rate / 100);
                return (
                  <tr key={affiliate.id} className={cn("hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors")}>
                    <td className="px-6 py-4 font-medium">{affiliate.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={cn("px-2 py-1 rounded text-xs font-mono", isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700")}>
                          {affiliate.ref_code}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{affiliate.commission_rate}%</td>
                    <td className="px-6 py-4">{stats.clicks}</td>
                    <td className="px-6 py-4">{stats.conversions}</td>
                    <td className="px-6 py-4">${commission.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => copyLink(affiliate.ref_code)}
                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400"
                        title="Copy tracking link"
                      >
                        <Copy size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {affiliates.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No affiliates found. Click "New Affiliate" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

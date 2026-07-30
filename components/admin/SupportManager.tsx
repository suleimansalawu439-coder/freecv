"use client";

import React, { useState } from 'react';
import { Mail, CheckCircle2, Circle, Clock, MessageSquare, ShieldAlert } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import toast from 'react-hot-toast';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SupportManager({ tickets, isDarkMode }: { tickets: any[], isDarkMode: boolean }) {
  const [ticketList, setTicketList] = useState<any[]>(tickets || []);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  const openTickets = ticketList.filter(t => t.status === 'open').length;
  const pendingTickets = ticketList.filter(t => t.status === 'pending').length;
  const closedTickets = ticketList.filter(t => t.status === 'closed').length;

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/support/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!res.ok) throw new Error('Failed to update status');
      
      setTicketList(ticketList.map(t => t.id === id ? { ...t, status: newStatus } : t));
      if (selectedTicket?.id === id) {
        setSelectedTicket({ ...selectedTicket, status: newStatus });
      }
      toast.success(`Ticket marked as ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message || 'Error updating ticket');
    }
  };

  return (
    <div className="animate-in fade-in duration-500 flex flex-col h-[calc(100vh-100px)]">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h2 className="text-2xl font-bold">Support Helpdesk</h2>
          <p className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>Manage user inquiries and support tickets.</p>
        </div>
        
        <div className="flex gap-4">
          <div className={cn("px-4 py-2 rounded-lg border shadow-sm flex items-center gap-3", isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200")}>
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-sm font-medium">{openTickets} Open</span>
          </div>
          <div className={cn("px-4 py-2 rounded-lg border shadow-sm flex items-center gap-3", isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200")}>
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <span className="text-sm font-medium">{pendingTickets} Pending</span>
          </div>
          <div className={cn("px-4 py-2 rounded-lg border shadow-sm flex items-center gap-3", isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200")}>
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-sm font-medium">{closedTickets} Closed</span>
          </div>
        </div>
      </div>

      <div className={cn("flex-1 rounded-xl border shadow-sm overflow-hidden flex transition-colors min-h-0", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
        {/* Left pane: Ticket List */}
        <div className={cn("w-1/3 border-r flex flex-col", isDarkMode ? "border-gray-800" : "border-gray-200")}>
          <div className={cn("p-4 border-b font-semibold", isDarkMode ? "bg-gray-900/50 border-gray-800" : "bg-gray-50 border-gray-200")}>
            Recent Tickets
          </div>
          <div className="flex-1 overflow-y-auto">
            {ticketList.map((ticket) => (
              <button 
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={cn(
                  "w-full text-left p-4 border-b transition-colors focus:outline-none", 
                  isDarkMode ? "border-gray-800 hover:bg-gray-900/50" : "border-gray-100 hover:bg-gray-50",
                  selectedTicket?.id === ticket.id ? (isDarkMode ? "bg-blue-900/20 border-l-4 border-l-blue-500" : "bg-blue-50 border-l-4 border-l-blue-600") : "border-l-4 border-l-transparent"
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold truncate pr-4">{ticket.subject}</span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className={cn("text-xs mb-2", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                  {ticket.user_email}
                </div>
                <div className="flex items-center gap-2">
                  {ticket.status === 'open' && <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full"><Circle size={10} /> Open</span>}
                  {ticket.status === 'pending' && <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full"><Clock size={10} /> Pending</span>}
                  {ticket.status === 'closed' && <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full"><CheckCircle2 size={10} /> Closed</span>}
                </div>
              </button>
            ))}
            {ticketList.length === 0 && (
              <div className="p-8 text-center text-gray-500 text-sm">
                No tickets found.
              </div>
            )}
          </div>
        </div>

        {/* Right pane: Ticket Detail */}
        <div className="w-2/3 flex flex-col bg-gray-50/30 dark:bg-gray-900/20">
          {selectedTicket ? (
            <>
              <div className={cn("p-6 border-b", isDarkMode ? "border-gray-800" : "border-gray-200")}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{selectedTicket.subject}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Mail size={14} /> {selectedTicket.user_email}</span>
                      <span>ID: #{selectedTicket.id.split('-')[0]}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {selectedTicket.status !== 'open' && (
                      <button onClick={() => updateStatus(selectedTicket.id, 'open')} className="px-3 py-1.5 text-xs font-semibold bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">Mark Open</button>
                    )}
                    {selectedTicket.status !== 'pending' && (
                      <button onClick={() => updateStatus(selectedTicket.id, 'pending')} className="px-3 py-1.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors">Mark Pending</button>
                    )}
                    {selectedTicket.status !== 'closed' && (
                      <button onClick={() => updateStatus(selectedTicket.id, 'closed')} className="px-3 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors">Close Ticket</button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                <div className={cn("p-6 rounded-xl border shadow-sm", isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200")}>
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      {selectedTicket.user_email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{selectedTicket.user_email}</div>
                      <div className="text-xs text-gray-500">{new Date(selectedTicket.created_at).toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {selectedTicket.message}
                  </div>
                </div>
                
                <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                  <ShieldAlert className="text-blue-500 shrink-0" size={20} />
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong> To reply to this user, simply reply to the email notification that was sent to <code>support@cvyon.com</code>. The reply-to header is automatically set to the user's email address.
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <MessageSquare size={48} className="mb-4 opacity-20" />
              <p>Select a ticket to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

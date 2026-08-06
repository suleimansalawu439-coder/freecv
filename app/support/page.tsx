"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Send, MessageSquare, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';

const FAQS = [
  {
    q: "Is FreeCV really free?",
    a: "Yes! Creating your resume, downloading it as PDF/DOCX, and using the ATS grader are 100% free forever for job seekers."
  },
  {
    q: "How does the ATS Grader work?",
    a: "Our AI analyzes your resume against a specific job description and scores it based on keyword matching, formatting, and relevance, providing actionable feedback to improve your chances."
  },
  {
    q: "Can recruiters see my resume?",
    a: "Only if you explicitly opt-in! When building your resume, you can toggle the 'Share with Recruiters' option. If disabled, your data is completely private."
  },
  {
    q: "I'm a recruiter. How do I access the talent pool?",
    a: "You can sign up for a Recruiter account, subscribe via Paystack, and instantly gain access to search our talent pool or use our B2B API."
  }
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [tickets, setTickets] = useState<any[]>([]);
  
  // Load saved ticket IDs from local storage (poor man's auth for public users)
  useEffect(() => {
    const savedIds = JSON.parse(localStorage.getItem('my_support_tickets') || '[]');
    if (savedIds.length > 0) {
      fetchTickets(savedIds);
    }
    
    // Subscribe to realtime updates for these tickets
    const channel = supabase
      .channel('public:support_tickets')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'support_tickets' 
      }, (payload: any) => {
        // If it's one of our tickets, update the state
        if (savedIds.includes(payload.new.id)) {
          setTickets(prev => prev.map(t => t.id === payload.new.id ? payload.new : t));
          if (payload.new.admin_reply && payload.old.admin_reply !== payload.new.admin_reply) {
             toast.success('An admin replied to your ticket!');
          }
        }
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTickets = async (ids: string[]) => {
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .in('id', ids)
      .order('created_at', { ascending: false });
      
    if (data) setTickets(data);
  };

  const [formData, setFormData] = useState({
    user_email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Failed to submit ticket');
      
      const responseData = await res.json();
      
      // Save ID
      if (responseData.ticket?.id) {
        const savedIds = JSON.parse(localStorage.getItem('my_support_tickets') || '[]');
        savedIds.push(responseData.ticket.id);
        localStorage.setItem('my_support_tickets', JSON.stringify(savedIds));
        fetchTickets(savedIds);
      }

      
      toast.success('Support ticket submitted successfully! We will email you back shortly.');
      setFormData({ user_email: '', subject: '', message: '' });
    } catch (err: any) {
      toast.error(err.message || 'Error submitting ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-light-no-background.png"
              alt="Cvyon"
              width={200}
              height={60}
              priority
              className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-all"
            />
            <span className="text-gray-800 text-sm font-bold bg-gray-100 px-2 py-0.5 rounded">Support</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <Link href="/developers" className="hover:text-blue-600 transition-colors">API Docs</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column: FAQ */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-4">How can we help?</h1>
            <p className="text-lg text-gray-600">
              Browse our frequently asked questions or send us a message if you need further assistance.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <HelpCircle className="text-blue-600" />
              Frequently Asked Questions
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {FAQS.map((faq, idx) => (
                <div key={idx} className={`border-b border-gray-100 last:border-0`}>
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900">{faq.q}</span>
                    {openFaq === idx ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-4 text-gray-600 animate-in slide-in-from-top-2 duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Ticket Form */}
        <div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl">
                <MessageSquare className="text-blue-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Contact Support</h2>
                <p className="text-sm text-gray-500">We typically reply within 24 hours.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.user_email}
                  onChange={(e) => setFormData({...formData, user_email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="What do you need help with?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                  placeholder="Please describe your issue in detail..."
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold transition-all flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="animate-spin text-xl leading-none">⟳</span>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {/* My Tickets */}
            {tickets.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-bold text-lg mb-4 text-gray-900">My Recent Tickets</h3>
                <div className="space-y-4">
                  {tickets.map(ticket => (
                    <div key={ticket.id} className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">{ticket.subject}</h4>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${ticket.status === 'open' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {ticket.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">{ticket.message}</p>
                      {ticket.admin_reply && (
                        <div className="bg-white border-l-4 border-blue-500 p-3 text-sm text-gray-700 rounded-r-lg shadow-sm">
                          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-1">Admin Reply</span>
                          {ticket.admin_reply}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

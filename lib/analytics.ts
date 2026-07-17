import { supabase } from './supabase';

// Simple session ID stored in memory or localStorage
const getSessionId = () => {
  if (typeof window === 'undefined') return 'server';
  let sid = localStorage.getItem('freecv_session_id');
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem('freecv_session_id', sid);
  }
  return sid;
};

export const trackEvent = async (eventType: string, templateId?: string) => {
  try {
    await supabase.from('analytics_events').insert([{
      event_type: eventType,
      session_id: getSessionId(),
      template_id: templateId || null
    }]);
  } catch (error) {
    console.error('Analytics tracking failed', error);
  }
};

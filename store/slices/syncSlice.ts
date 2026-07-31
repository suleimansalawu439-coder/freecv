import { StateCreator } from 'zustand';
import { StoreState, SyncSlice } from '../types';

export const createSyncSlice: StateCreator<StoreState, [], [], SyncSlice> = (set, get) => ({
  syncToCloud: async () => {
    const state = get();
    try {
      // Check if user is logged in
      const { supabase } = await import('@/lib/supabase');
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const payload = {
        user_id: session.user.id,
        resume_title: state.data.resumeTitle || 'Untitled Resume',
        template_id: state.data.templateId,
        theme_color: state.data.theme.color,
        personal_info: state.data.personalInfo,
        summary: state.data.summary,
        experience: state.data.experience,
        education: state.data.education,
        skills: state.data.skills,
        projects: state.data.projects,
        certifications: state.data.certifications,
        references: state.data.references,
        custom_sections: state.data.customSections,
        visibility: 'private'
      };

      if (state.data.currentResumeId) {
        await supabase.from('user_resumes').update(payload).eq('id', state.data.currentResumeId);
      } else {
        const { data: inserted, error } = await supabase.from('user_resumes').insert([payload]).select().single();
        if (inserted && !error) {
          set({ data: { ...state.data, currentResumeId: inserted.id } });
        }
      }
    } catch (e) {
      console.error('Failed to sync to cloud', e);
    }
  },
});

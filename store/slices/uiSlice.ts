import { StateCreator } from 'zustand';
import { StoreState, UISlice } from '../types';

export const createUISlice: StateCreator<StoreState, [], [], UISlice> = (set) => ({
  setCurrentResumeId: (id) => set((state) => ({ data: { ...state.data, currentResumeId: id } })),
  setResumeTitle: (title) => set((state) => ({ data: { ...state.data, resumeTitle: title } })),
  setTemplateId: (id) => set((state) => ({ data: { ...state.data, templateId: id } })),
  setThemeColor: (color) => set((state) => ({ data: { ...state.data, theme: { color } } })),
  toggleProjects: () => set((state) => ({ data: { ...state.data, showProjects: !state.data.showProjects, projects: state.data.projects || [] } })),
  toggleCertifications: () => set((state) => ({ data: { ...state.data, showCertifications: !state.data.showCertifications, certifications: state.data.certifications || [] } })),
  toggleReferences: () => set((state) => ({ data: { ...state.data, showReferences: !state.data.showReferences, references: state.data.references || [] } })),
  setAtsRecommendations: (recs) => set((state) => ({ data: { ...state.data, atsRecommendations: recs } })),
});

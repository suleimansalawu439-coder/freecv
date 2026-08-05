import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { temporal } from 'zundo';
import { StoreState } from './types';
import { createResumeSlice, initialData } from './slices/resumeSlice';
import { createUISlice } from './slices/uiSlice';
import { createSyncSlice } from './slices/syncSlice';

export * from './types';
export { initialData } from './slices/resumeSlice';

export const useResumeStore = create<StoreState>()(
  temporal(
    persist(
      (...a) => ({
        ...createResumeSlice(...a),
        ...createUISlice(...a),
        ...createSyncSlice(...a),
      }),
      {
        name: 'cvyon-storage',
        version: 2,
        migrate: (persistedState: any, version: number) => {
          if (!persistedState || typeof persistedState !== 'object') {
            return persistedState;
          }
          // Gracefully migrate legacy local storage structures
          if (version < 2) {
            const data = persistedState.data || {};
            if (!data.consents) {
              data.consents = { recruiterShare: false, emailJobs: false, analytics: true };
            }
            if (!Array.isArray(data.experience)) data.experience = [];
            if (!Array.isArray(data.education)) data.education = [];
            if (!Array.isArray(data.skills)) data.skills = [];
            if (!Array.isArray(data.customSections)) data.customSections = [];
            if (!Array.isArray(data.references)) data.references = [];
            return {
              ...persistedState,
              data: {
                ...initialData,
                ...data,
                personalInfo: { ...initialData.personalInfo, ...(data.personalInfo || {}) },
                theme: { ...initialData.theme, ...(data.theme || {}) },
              },
            };
          }
          return persistedState;
        },
      }
    ),
    { limit: 50 }
  )
);

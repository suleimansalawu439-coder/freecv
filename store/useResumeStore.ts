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
      { name: 'cvyon-storage' }
    ),
    { limit: 50 }
  )
);

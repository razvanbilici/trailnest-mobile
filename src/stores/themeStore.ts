import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { persistStorage } from './storage';
import type { ThemeMode } from '../theme/theme';

export type ThemePreference = 'system' | ThemeMode;

interface ThemeState {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      preference: 'system',
      setPreference: (preference) => set({ preference }),
    }),
    {
      name: 'trailnest-theme',
      storage: persistStorage,
      partialize: (state) => ({ preference: state.preference }),
    },
  ),
);

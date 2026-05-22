import { create } from 'zustand';
import type { Difficulty } from '../types';

export const DIFFICULTY_OPTIONS: Difficulty[] = ['easy', 'moderate', 'hard', 'expert'];

interface FilterState {
  search: string;
  difficulty: Difficulty[];
  setSearch: (value: string) => void;
  toggleDifficulty: (value: Difficulty) => void;
  clearDifficulty: () => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  search: '',
  difficulty: [],
  setSearch: (search) => set({ search }),
  toggleDifficulty: (value) =>
    set((state) => ({
      difficulty: state.difficulty.includes(value)
        ? state.difficulty.filter((d) => d !== value)
        : [...state.difficulty, value],
    })),
  clearDifficulty: () => set({ difficulty: [] }),
  reset: () => set({ search: '', difficulty: [] }),
}));

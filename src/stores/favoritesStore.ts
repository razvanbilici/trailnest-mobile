import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { persistStorage } from './storage';

interface FavoritesState {
  trails: string[];
  glamping: string[];
  toggleTrail: (id: string) => void;
  toggleGlamping: (id: string) => void;
  isTrailFavorite: (id: string) => boolean;
  isGlampingFavorite: (id: string) => boolean;
  clear: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      trails: ['trail-1', 'trail-4'],
      glamping: ['glamp-3'],
      toggleTrail: (id) =>
        set((state) => ({
          trails: state.trails.includes(id)
            ? state.trails.filter((t) => t !== id)
            : [...state.trails, id],
        })),
      toggleGlamping: (id) =>
        set((state) => ({
          glamping: state.glamping.includes(id)
            ? state.glamping.filter((g) => g !== id)
            : [...state.glamping, id],
        })),
      isTrailFavorite: (id) => get().trails.includes(id),
      isGlampingFavorite: (id) => get().glamping.includes(id),
      clear: () => set({ trails: [], glamping: [] }),
    }),
    {
      name: 'trailnest-favorites',
      storage: persistStorage,
      partialize: (state) => ({
        trails: state.trails,
        glamping: state.glamping,
      }),
    },
  ),
);

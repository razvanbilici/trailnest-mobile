import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { persistStorage } from './storage';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (input: { email: string; password: string }) => Promise<void>;
  register: (input: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (patch: Partial<AuthUser>) => void;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function buildUser(name: string, email: string): AuthUser {
  const slug = email.split('@')[0] || 'user';
  return {
    id: `user-${slug}`,
    name: name || slug,
    email: email.trim().toLowerCase(),
    avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(email)}`,
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async ({ email, password }) => {
        if (!isValidEmail(email)) {
          throw new Error('Adresă de email invalidă.');
        }
        if (!password || password.length < 6) {
          throw new Error('Parola trebuie să aibă cel puțin 6 caractere.');
        }
        await new Promise((resolve) => setTimeout(resolve, 400));
        const inferredName = email.split('@')[0]?.replace(/[._-]+/g, ' ') ?? 'Drumeț';
        const user = buildUser(
          inferredName.charAt(0).toUpperCase() + inferredName.slice(1),
          email,
        );
        set({ user, isAuthenticated: true });
      },
      register: async ({ name, email, password }) => {
        if (!name || name.trim().length < 2) {
          throw new Error('Introdu un nume valid (minim 2 caractere).');
        }
        if (!isValidEmail(email)) {
          throw new Error('Adresă de email invalidă.');
        }
        if (!password || password.length < 6) {
          throw new Error('Parola trebuie să aibă cel puțin 6 caractere.');
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
        const user = buildUser(name.trim(), email);
        set({ user, isAuthenticated: true });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (patch) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...patch } : state.user,
        })),
    }),
    {
      name: 'trailnest-auth',
      storage: persistStorage,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

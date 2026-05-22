import { useEffect, useState } from 'react';
import { useAuthStore } from './authStore';
import { useThemeStore } from './themeStore';
import { useFavoritesStore } from './favoritesStore';

/**
 * Returns true once *all* persisted stores have rehydrated from AsyncStorage.
 * Used by App.tsx to gate the navigation tree so we don't briefly render
 * the unauthenticated state before the session is restored.
 */
export function useHydration(): boolean {
  const [hydrated, setHydrated] = useState<boolean>(() =>
    Boolean(
      useAuthStore.persist?.hasHydrated() &&
        useThemeStore.persist?.hasHydrated() &&
        useFavoritesStore.persist?.hasHydrated(),
    ),
  );

  useEffect(() => {
    if (hydrated) return;

    const stores = [useAuthStore, useThemeStore, useFavoritesStore];
    const subs = stores.map((s) =>
      s.persist.onFinishHydration(() => {
        if (stores.every((store) => store.persist.hasHydrated())) {
          setHydrated(true);
        }
      }),
    );

    if (stores.every((s) => s.persist.hasHydrated())) {
      setHydrated(true);
    }

    return () => {
      subs.forEach((unsub) => unsub?.());
    };
  }, [hydrated]);

  return hydrated;
}

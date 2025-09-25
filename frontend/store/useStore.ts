import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (access: string | null, refresh: string | null) => void;
  clearAuth: () => void;
};

type MyPersist = PersistOptions<AuthState, AuthState>;

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (access, refresh) =>
        set({ accessToken: access, refreshToken: refresh }),
      clearAuth: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: 'auth-storage',
    } as MyPersist
  )
);

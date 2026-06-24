import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useFetch } from '../hooks/useFetch';
import { getProfile } from '../services/api';
import type { Profile } from '../types';

interface ProfileContextValue {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { data: profile, loading, error, refetch } = useFetch(getProfile);

  return (
    <ProfileContext.Provider value={{ profile, loading, error, refetch }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}

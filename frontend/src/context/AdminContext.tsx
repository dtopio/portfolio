import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

const STORAGE_KEY = 'portfolio_admin_token';

interface AdminContextValue {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEY)
  );

  function setToken(value: string | null) {
    if (value) {
      localStorage.setItem(STORAGE_KEY, value);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setTokenState(value);
  }

  return <AdminContext.Provider value={{ token, setToken }}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}

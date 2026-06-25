import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

const STORAGE_KEY = 'portfolio_admin_token';

interface AdminContextValue {
  /** Effective token — null whenever previewMode is on, even if actually unlocked. */
  token: string | null;
  /** The real unlocked token, unaffected by previewMode. */
  realToken: string | null;
  setToken: (token: string | null) => void;
  previewMode: boolean;
  setPreviewMode: (value: boolean) => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [realToken, setTokenState] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEY)
  );
  const [previewMode, setPreviewMode] = useState(false);

  function setToken(value: string | null) {
    if (value) {
      localStorage.setItem(STORAGE_KEY, value);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      setPreviewMode(false);
    }
    setTokenState(value);
  }

  const token = previewMode ? null : realToken;

  return (
    <AdminContext.Provider value={{ token, realToken, setToken, previewMode, setPreviewMode }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}

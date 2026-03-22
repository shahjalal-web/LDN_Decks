'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from '@/lib/firebase';

/* ── Types ─────────────────────────────────────────────────────────── */

export interface DbUser {
  _id: string;
  name: string;
  email: string;
  firebaseUid: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface AuthContextValue {
  user: User | null;
  dbUser: DbUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ── Helpers ───────────────────────────────────────────────────────── */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchDbUser(firebaseUser: User): Promise<DbUser | null> {
  try {
    const token = await firebaseUser.getIdToken();
    const res = await fetch(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return (await res.json()) as DbUser;
  } catch {
    return null;
  }
}

/* ── Provider ──────────────────────────────────────────────────────── */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);

  /* Listen for Firebase auth state changes */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const profile = await fetchDbUser(firebaseUser);
        setDbUser(profile);
      } else {
        setDbUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  /* Login */
  const login = useCallback(async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const profile = await fetchDbUser(credential.user);
    setUser(credential.user);
    setDbUser(profile);
  }, []);

  /* Signup */
  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const token = await credential.user.getIdToken();

      /* Create user record in backend */
      await fetch(`${API_URL}/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
          firebaseUid: credential.user.uid,
        }),
      });

      const profile = await fetchDbUser(credential.user);
      setUser(credential.user);
      setDbUser(profile);
    },
    [],
  );

  /* Logout */
  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    setDbUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, dbUser, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/* ── Hook ──────────────────────────────────────────────────────────── */

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}

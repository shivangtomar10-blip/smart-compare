import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api.js';
const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null), [ready, setReady] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('sc_token')) { setReady(true); return; }
    api.me().then(d => setUser(d.user)).catch(() => localStorage.removeItem('sc_token')).finally(() => setReady(true));
  }, []);
  const authenticate = async (mode, body) => { const d = await api.auth(mode, body); localStorage.setItem('sc_token', d.token); setUser(d.user); };
  const logout = () => { localStorage.removeItem('sc_token'); setUser(null); };
  return <Ctx.Provider value={{ user, setUser, ready, authenticate, logout }}>{children}</Ctx.Provider>;
}

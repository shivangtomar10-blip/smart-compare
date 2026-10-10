import { createContext, useContext, useState } from 'react';
const Ctx = createContext(null);
export const useCompare = () => useContext(Ctx);
export function CompareProvider({ children }) {
  const [ids, setIds] = useState(() => { try { return JSON.parse(sessionStorage.getItem('sc_compare')) || []; } catch { return []; } });
  const save = next => { setIds(next); sessionStorage.setItem('sc_compare', JSON.stringify(next)); };
  const toggle = id => save(ids.includes(id) ? ids.filter(x => x !== id) : ids.length >= 4 ? ids : [...ids, id]);
  return <Ctx.Provider value={{ ids, toggle, has: id => ids.includes(id), full: ids.length >= 4, clear: () => save([]), replace: save }}>{children}</Ctx.Provider>;
}

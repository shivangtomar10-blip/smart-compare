import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
export default function Login({ mode = 'login' }) {
  const reg = mode === 'register', { authenticate } = useAuth(), nav = useNavigate();
  const [f, setF] = useState({ name: '', email: '', password: '' }), [err, setErr] = useState(''), [busy, setBusy] = useState(false);
  const on = k => e => setF({ ...f, [k]: e.target.value });
  async function submit(e) {
    e.preventDefault(); setErr(''); setBusy(true);
    try { await authenticate(mode, reg ? f : { email: f.email, password: f.password }); nav('/dashboard'); }
    catch (x) { setErr(x.message); } finally { setBusy(false); }
  }
  return (
    <div className="wrap narrow"><form className="card form" onSubmit={submit}>
      <h2>{reg ? 'Create your account' : 'Welcome back'}</h2>
      {reg && <label>Name<input required minLength="2" value={f.name} onChange={on('name')} autoComplete="name" /></label>}
      <label>Email<input type="email" required value={f.email} onChange={on('email')} autoComplete="email" /></label>
      <label>Password<input type="password" required minLength={reg ? 8 : 1} value={f.password} onChange={on('password')} autoComplete={reg ? 'new-password' : 'current-password'} /></label>
      {reg && <small>At least 8 characters, with a letter and a number.</small>}
      {err && <div className="alert" role="alert">{err}</div>}
      <button className="more" disabled={busy}>{busy ? 'Please wait…' : reg ? 'Register' : 'Log in'}</button>
      <p>{reg ? <>Have an account? <Link to="/login">Log in</Link></> : <>New here? <Link to="/register">Register</Link></>}</p>
    </form></div>
  );
}

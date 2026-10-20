import React, { useState } from 'react';
import { User, Key, X, ArrowRight, AlertCircle, Lock } from 'lucide-react';
import { LogoMark } from './Logo';
import { API_BASE } from '../config/api';

const OFFICIAL_PROFILES = [
  {
    id: 1,
    nom: 'Administrador KernelCore',
    email: 'admin-kernelcore@kernelcore.com',
    password: 'admin1234',
    rol: 'Administrador',
    departament: 'Direcció DFactory'
  },
  {
    id: 2,
    nom: 'Hans Lao Moncusi',
    email: 'hans@kernelcore.cat',
    password: 'HansKernel2026!',
    rol: 'Direcció Tècnica (Hans)',
    departament: 'Sistemes & Seguretat'
  },
  {
    id: 3,
    nom: 'Joel Pérez Armenteros',
    email: 'joel@kernelcore.cat',
    password: 'JoelKernel2026!',
    rol: 'Direcció General (Joel)',
    departament: 'Infraestructura de Xarxes'
  }
];

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const performLogin = async (userEmail, userPassword) => {
    setError('');
    setIsLoading(true);

    try {
      // 1. Petició d'autenticació al Backend (connectat amb BBDD / LiveStore)
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password: userPassword })
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json();
        setIsLoading(false);
        onLoginSuccess(data.user);
        return;
      }

      // Si el backend respon amb error (ex: 401)
      if (res && !res.ok) {
        const errData = await res.json().catch(() => ({}));
        setIsLoading(false);
        setError(errData.error || 'Credencials d\'accés incorrectes.');
        return;
      }

      // 2. Fallback de contingència local si el backend no està accessible
      const cleanEmail = userEmail.trim().toLowerCase();
      const matched = OFFICIAL_PROFILES.find(
        u => u.email.toLowerCase() === cleanEmail && u.password === userPassword
      );
      if (matched) {
        setIsLoading(false);
        onLoginSuccess({
          id: matched.id,
          nom: matched.nom,
          email: matched.email,
          rol: matched.rol,
          departament: matched.departament
        });
        return;
      }

      setIsLoading(false);
      setError('Credencials no vàlides. Revisa l\'usuari i la contrasenya.');

    } catch (err) {
      console.error('Error d\'autenticació:', err);
      setIsLoading(false);
      setError('Error connectant amb el servei d\'autenticació.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Si us plau, omple tant l\'usuari com la contrasenya.');
      return;
    }
    performLogin(email, password);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900/95 border border-slate-800 rounded-3xl shadow-2xl p-7 text-slate-100">
        
        {/* Botó Tancar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Tancar finestra"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Capçalera amb Logo Vectorial KernelCore */}
        <div className="flex items-center gap-4 mb-6">
          <LogoMark size={44} className="drop-shadow-[0_0_16px_rgba(6,182,212,0.5)] shrink-0" />
          <div>
            <h2 className="text-xl font-heading font-black text-white tracking-tight">
              Accés Oficial al Panell
            </h2>
            <p className="text-xs text-slate-400 font-medium">DFactory Barcelona &middot; Zona Franca</p>
          </div>
        </div>

        {/* Missatge d'error */}
        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-sm text-red-300 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulari d'Accés */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Correu Corporatiu:
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuari@kernelcore.cat"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-100 font-medium outline-none focus:border-cyan-500 transition-colors"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Contrasenya d'Accés:
            </label>
            <div className="relative">
              <Key className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-100 font-medium outline-none focus:border-cyan-500 transition-colors"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {/* Botó Principal d'Entrada */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-heading font-black text-sm uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span>Autenticant...</span>
            ) : (
              <>
                <span>Entrar al Panell de Control</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Nota informativa clara */}
        <div className="mt-5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-cyan-400/90 font-medium">
            <Lock className="w-3.5 h-3.5" />
            Accés restringit RBAC
          </span>
          <span className="text-slate-500 shrink-0">KernelCore Security</span>
        </div>

      </div>
    </div>
  );
}

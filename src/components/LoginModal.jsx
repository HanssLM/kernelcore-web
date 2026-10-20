import React, { useState } from 'react';
import { User, Key, X, ArrowRight, AlertCircle, Shield, Server, Network, CheckCircle2 } from 'lucide-react';
import { LogoMark } from './Logo';
import { API_BASE } from '../config/api';

const OFFICIAL_PROFILES = [
  {
    id: 1,
    shortLabel: 'Admin General',
    nom: 'Administrador KernelCore',
    email: 'admin-kernelcore@kernelcore.com',
    password: 'admin1234',
    rol: 'Administrador',
    departament: 'Direcció DFactory',
    icon: Shield
  },
  {
    id: 2,
    shortLabel: 'Hans Lao Moncusi',
    nom: 'Hans Lao Moncusi',
    email: 'hans@kernelcore.cat',
    password: 'HansKernel2026!',
    rol: 'Direcció Tècnica (Hans)',
    departament: 'Sistemes & Seguretat',
    icon: Server
  },
  {
    id: 3,
    shortLabel: 'Joel Pérez Armenteros',
    nom: 'Joel Pérez Armenteros',
    email: 'joel@kernelcore.cat',
    password: 'JoelKernel2026!',
    rol: 'Direcció General (Joel)',
    departament: 'Infraestructura de Xarxes',
    icon: Network
  }
];

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('admin-kernelcore@kernelcore.com');
  const [password, setPassword] = useState('admin1234');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSelectProfile = (profile) => {
    setEmail(profile.email);
    setPassword(profile.password);
    setError('');
  };

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

  const normalizedInputEmail = email.trim().toLowerCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900/95 border border-slate-800 rounded-3xl shadow-2xl p-7 text-slate-100">
        
        {/* Botó Tancar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Tancar finestra"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Capçalera amb Logo Vectorial KernelCore */}
        <div className="flex items-center gap-4 mb-5">
          <LogoMark size={48} className="drop-shadow-[0_0_16px_rgba(6,182,212,0.5)]" />
          <div>
            <h2 className="text-xl font-heading font-black text-white tracking-tight">
              Accés Oficial al Panell Tècnic
            </h2>
            <p className="text-sm text-slate-400 font-medium">DFactory Barcelona &middot; Control d'Infraestructura IT</p>
          </div>
        </div>

        {/* Selector Visual de Perfils Oficials DFactory */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Perfils Oficials DFactory (Selecció Ràpida de Rol)
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              1 clic per autocompletar
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {OFFICIAL_PROFILES.map((profile) => {
              const IconComponent = profile.icon;
              const isSelected = normalizedInputEmail === profile.email.toLowerCase();
              return (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => handleSelectProfile(profile)}
                  className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-500/70 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-900 text-slate-400'}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    )}
                  </div>
                  <div>
                    <div className={`text-xs font-bold leading-snug ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {profile.shortLabel}
                    </div>
                    <div className="text-[11px] text-cyan-400/90 font-medium truncate mt-0.5">
                      {profile.rol}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">
                      {profile.departament}
                    </div>
                  </div>
                </button>
              );
            })}
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
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin-kernelcore@kernelcore.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-100 font-medium outline-none focus:border-cyan-500 transition-colors"
                autoComplete="username"
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
        <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-400 flex items-center justify-between">
          <span className="font-mono text-cyan-400/90 font-semibold truncate">{email}</span>
          <span className="text-slate-500 shrink-0 ml-2">DFactory Barcelona</span>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Cookie, Settings } from 'lucide-react';

export default function CookieBanner({ onOpenLegal }) {
  const [showBanner, setShowBanner] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !localStorage.getItem('kernel_cookies_consent');
  });
  const [showConfig, setShowConfig] = useState(false);
  const [preferences, setPreferences] = useState({
    tecniques: true, // Sempre obligatòries
    analitiques: false,
    funcionalitat: true,
  });

  const handleAcceptAll = () => {
    const consent = { tecniques: true, analitiques: true, funcionalitat: true, data: new Date().toISOString() };
    localStorage.setItem('kernel_cookies_consent', JSON.stringify(consent));
    setShowBanner(false);
    setShowConfig(false);
  };

  const handleAcceptEssential = () => {
    const consent = { tecniques: true, analitiques: false, funcionalitat: false, data: new Date().toISOString() };
    localStorage.setItem('kernel_cookies_consent', JSON.stringify(consent));
    setShowBanner(false);
    setShowConfig(false);
  };

  const handleSavePreferences = () => {
    const consent = { ...preferences, tecniques: true, data: new Date().toISOString() };
    localStorage.setItem('kernel_cookies_consent', JSON.stringify(consent));
    setShowBanner(false);
    setShowConfig(false);
  };

  if (!showBanner) return null;

  return (
    <aside 
      aria-label="Gestió de consentiment de cookies" 
      className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 md:p-6 bg-slate-950/95 border-t border-slate-800 backdrop-blur-lg shadow-2xl transition-all animate-fade-in-up"
    >
      <div className="w-full max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Text explicatiu */}
        <div className="flex items-start gap-3.5 max-w-4xl">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
              Gestió de Cookies & Privacitat Transparent
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Utilitzem cookies tècniques estrictament necessàries per al funcionament d'aquest portal i la gestió segura de sol·licituds. No venem ni cedim les teves dades a xarxes publicitàries de tercers. Pots acceptar-les totes, rebutjar les no essencials o configurar-les segons les teves preferències segons la normativa LSSI-CE i RGPD. Consulta la nostra{' '}
              <button
                type="button"
                onClick={() => onOpenLegal('cookies')}
                className="text-cyan-400 font-semibold underline underline-offset-2 hover:text-cyan-300 transition-colors"
              >
                Política de Cookies
              </button>.
            </p>
          </div>
        </div>

        {/* Botons d'acció */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full lg:w-auto shrink-0 pt-2 lg:pt-0">
          <button
            type="button"
            onClick={() => setShowConfig(!showConfig)}
            className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 transition-colors flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-cyan-500"
          >
            <Settings className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Configurar</span>
          </button>

          <button
            type="button"
            onClick={handleAcceptEssential}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors focus:ring-2 focus:ring-cyan-500"
          >
            Només Essencials
          </button>

          <button
            type="button"
            onClick={handleAcceptAll}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wide shadow-md shadow-cyan-500/20 transition-all focus:ring-2 focus:ring-cyan-400"
          >
            Acceptar Tot
          </button>
        </div>

      </div>

      {/* Subpanell de configuració granular */}
      {showConfig && (
        <div className="mt-4 pt-4 border-t border-slate-800/80 w-full max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-4">
            
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start justify-between gap-3">
              <div>
                <label htmlFor="cookie-tecniques" className="font-semibold text-white block">Cookies Tècniques (Obligatòries)</label>
                <p className="text-[11px] text-slate-400 mt-0.5">Necessàries per navegar, mantenir seguretat i desar formularis.</p>
              </div>
              <input
                id="cookie-tecniques"
                type="checkbox"
                checked
                disabled
                aria-label="Cookies Tècniques (Obligatòries)"
                className="mt-1 h-4 w-4 rounded accent-cyan-500 cursor-not-allowed opacity-75"
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start justify-between gap-3">
              <div>
                <label htmlFor="cookie-funcionalitat" className="font-semibold text-white block cursor-pointer">Preferències & Funcionalitat</label>
                <p className="text-[11px] text-slate-400 mt-0.5">Recordar l'estat dels mòduls i preferències de vista.</p>
              </div>
              <input 
                id="cookie-funcionalitat"
                type="checkbox" 
                checked={preferences.funcionalitat}
                onChange={e => setPreferences(p => ({ ...p, funcionalitat: e.target.checked }))}
                aria-label="Cookies de Preferències i Funcionalitat"
                className="mt-1 h-4 w-4 rounded accent-cyan-500 cursor-pointer" 
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start justify-between gap-3">
              <div>
                <label htmlFor="cookie-analitiques" className="font-semibold text-white block cursor-pointer">Mètriques Agregades Anònimes</label>
                <p className="text-[11px] text-slate-400 mt-0.5">Estadístiques anònimes de rendiment de càrrega sense IP.</p>
              </div>
              <input 
                id="cookie-analitiques"
                type="checkbox" 
                checked={preferences.analitiques}
                onChange={e => setPreferences(p => ({ ...p, analitiques: e.target.checked }))}
                aria-label="Cookies de Mètriques Agregades Anònimes"
                className="mt-1 h-4 w-4 rounded accent-cyan-500 cursor-pointer" 
              />
            </div>

          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleSavePreferences}
              className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-colors"
            >
              Desar les Meves Preferències
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}

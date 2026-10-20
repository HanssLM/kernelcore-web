import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, UserLock, UserCheck, Phone } from 'lucide-react';
import { LogoMark } from './Logo';

export default function Navbar({ onOpenLogin, onOpenDashboard, user }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#inici', label: 'Inici' },
    { href: '#serveis', label: 'Serveis' },
    { href: '#metodologia', label: 'Metodologia' },
    { href: '#equip', label: 'Equip' },
    { href: '#contacte', label: 'Contacte' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/92 backdrop-blur-2xl border-b border-cyan-500/20 py-2.5 shadow-[0_10px_35px_-10px_rgba(6,182,212,0.2)]' 
          : 'bg-slate-950/75 backdrop-blur-xl border-b border-slate-800/60 py-3.5 shadow-2xl'
      }`}
    >
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        
        {/* Brand Logo & Nom Corporatiu KernelCore */}
        <a href="#inici" className="flex items-center gap-3.5 group shrink-0">
          <LogoMark 
            size={48} 
            className="group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_16px_rgba(6,182,212,0.55)] group-hover:drop-shadow-[0_0_24px_rgba(6,182,212,0.85)]" 
          />
          <div className="flex flex-col justify-center">
            <div className="text-2xl font-heading font-black tracking-tight text-white leading-none">
              <span>KERNEL<span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">CORE</span></span>
            </div>
            <span className="block text-[11px] uppercase tracking-widest text-slate-400 font-semibold mt-1">
              Serveis &amp; Sistemes Informàtics
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links nets i equilibrats */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-all duration-200 hover:bg-slate-900/60 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
            </a>
          ))}
        </nav>

        {/* Right Action Buttons: Mateixa alçada exacta (h-11), sense salts de línia i amb efectes glow */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          
          {/* Telèfon Directe 24/7 */}
          <a
            href="tel:938100200"
            className="h-11 px-4 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-emerald-500/50 hover:bg-slate-850 text-slate-200 hover:text-white transition-all duration-200 shadow-md flex items-center gap-2.5 shrink-0 whitespace-nowrap group hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            title="Trucada directa a atenció tècnica"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <Phone className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform shrink-0" />
            <span className="font-mono font-bold text-sm text-slate-100 group-hover:text-emerald-300 transition-colors">
              938 100 200
            </span>
          </a>

          {/* Botó discret d'Accés d'Administrador / Panell */}
          {user ? (
            <button
              onClick={onOpenDashboard}
              className="h-11 w-11 rounded-xl bg-slate-900/80 border border-cyan-500/40 hover:border-cyan-400 text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200 shadow-sm flex items-center justify-center shrink-0 group hover:shadow-[0_0_15px_rgba(6,182,212,0.25)]"
              title="Panell d'administració (Sessió iniciada)"
              aria-label="Panell d'administració"
            >
              <UserCheck className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="h-11 w-11 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 text-slate-400 hover:text-cyan-400 transition-all duration-200 shadow-sm flex items-center justify-center shrink-0 group hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              title="Accés intern d'administrador"
              aria-label="Accés intern al panell"
            >
              <UserLock className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all" />
            </button>
          )}

          {/* CTA Principal Únic: Demanar Pressupost */}
          <a 
            href="#pressupostador"
            className="h-11 px-5 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-heading font-black text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 shrink-0 whitespace-nowrap group"
          >
            <span>Demanar Pressupost</span>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform shrink-0" />
          </a>

        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center gap-2 shrink-0">
          {user ? (
            <button
              onClick={onOpenDashboard}
              className="h-10 w-10 rounded-xl bg-slate-900/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center"
              title="Panell d'administració"
              aria-label="Panell d'administració"
            >
              <UserCheck className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="h-10 w-10 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-colors"
              title="Accés intern al panell"
              aria-label="Accés intern al panell"
            >
              <UserLock className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
            aria-label={mobileMenuOpen ? "Tancar menú principal" : "Obrir menú principal"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown amb estètica d'alta fidelitat */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 space-y-3 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-xl text-base font-semibold text-slate-200 hover:text-cyan-400 hover:bg-slate-900/60 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 border-t border-slate-800 space-y-2.5">
            <a
              href="tel:938100200"
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono font-bold text-sm"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>938 100 200</span>
            </a>

            <a 
              href="#pressupostador"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-heading font-black text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25"
            >
              <span>Demanar Pressupost</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Methodology from './components/Methodology';
import QuoteRequestForm from './components/QuoteRequestForm';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import Dashboard from './components/Dashboard';
import LegalModal from './components/LegalModal';
import CookieBanner from './components/CookieBanner';

export default function App() {
  const [view, setView] = useState('site'); // 'site' o 'dashboard'
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalSection, setLegalSection] = useState('privacitat');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('kernel_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('kernel_user', JSON.stringify(userData));
    setIsLoginOpen(false);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('kernel_user');
    setView('site');
  };

  // Si estem en mode panell de control
  if (view === 'dashboard') {
    return (
      <>
        <Dashboard 
          user={user} 
          onLogout={handleLogout} 
          onBackToSite={() => setView('site')} 
        />
        <Analytics />
      </>
    );
  }

  const openLegal = (sec = 'privacitat') => {
    setLegalSection(sec);
    setLegalModalOpen(true);
  };

  // Vista del lloc web públic corporatiu
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar 
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenDashboard={() => setView('dashboard')}
        user={user}
      />
      <main>
        <Hero />
        <Services />
        <Methodology />
        <QuoteRequestForm onOpenLegal={openLegal} />
        <Team />
        <Contact onOpenLegal={openLegal} />
      </main>
      <Footer onOpenLegal={openLegal} />

      {/* Modal d'Accés per als Tècnics */}
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Modal Legal Integral (LSSI, RGPD, Cookies, Termes, Reemborsament) */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        activeSection={legalSection}
      />

      {/* Banner de Consentiment Granular de Cookies */}
      <CookieBanner onOpenLegal={openLegal} />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}

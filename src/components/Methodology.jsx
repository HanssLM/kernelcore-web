import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Search, Compass, Wrench, ShieldCheck } from 'lucide-react';

export default function Methodology() {
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll('.methodology-card');
      animate(cards, {
        opacity: [0, 1],
        translateY: [24, 0],
        delay: stagger(150),
        duration: 800,
        ease: 'outCubic'
      });
    }
  }, []);
  const steps = [
    {
      number: '01',
      title: 'Auditoria Inicial & Requisits',
      desc: 'Inspecció de l\'espai físic, amidaments de canaleta, requeriments de càrrega elèctrica i anàlisi de trànsit de dades.',
      icon: Search
    },
    {
      number: '02',
      title: 'Disseny 2D/3D & Simulació GNS3',
      desc: 'Plànol de distribució del rack, canalitzacions i rosetes RJ45. Simulació de subxarxes i configuració d\'enrutament i VLANs.',
      icon: Compass
    },
    {
      number: '03',
      title: 'Muntatge Físic & Desplegament',
      desc: 'Instal·lació de cablejat Cat6, connexió a Patch Panel, enrackat de servidors, switch i SAI, i posada a punt de punts TPV.',
      icon: Wrench
    },
    {
      number: '04',
      title: 'Certificació, Seguretat & Suport',
      desc: 'Test de continuïtat del cablejat, proves d\'autonomia del SAI, sincronització de backups GFS 3-2-1 i posada en marxa.',
      icon: ShieldCheck
    }
  ];

  return (
    <section id="metodologia" className="py-24 bg-slate-900/60 relative border-t border-slate-900">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/40">
            Estàndard d'Enginyeria SMX
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Metodologia de Treball Rigorosa
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Apliquem protocols tècnics contrastats per garantir que cada infraestructura sigui escalable, segura i d'alt rendiment des del primer dia.
          </p>
        </div>

        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="methodology-card p-6 rounded-2xl bg-slate-950/90 border border-slate-800/80 card-hover-effect shadow-xl relative group overflow-hidden"
              >
                {/* Llum ambiental subtil en fer hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.06] via-transparent to-blue-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <span className="text-2xl font-mono font-black text-slate-700 group-hover:text-cyan-400/60 transition-colors duration-500 ease-out">
                    {step.number}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-cyan-400 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all duration-500 ease-out">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-base font-heading font-bold text-white group-hover:text-cyan-300 transition-colors duration-500 ease-out mb-2 relative z-10">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-500 ease-out leading-relaxed relative z-10">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

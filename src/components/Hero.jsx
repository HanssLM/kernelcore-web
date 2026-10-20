import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { ArrowRight, ShieldCheck, Server, Zap, CheckCircle2, Phone, MapPin, Clock, Activity, Wifi } from 'lucide-react';

export default function Hero() {
  const pill1Ref = useRef(null);
  const pill2Ref = useRef(null);
  const pill3Ref = useRef(null);
  const rackCardRef = useRef(null);
  const throughputCounterRef = useRef(null);
  const uptimeCounterRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Telemetria animada amb animejs (comptador fluid)
    const telemetryObj = { mbps: 0, uptime: 95.0 };
    
    const countAnim = prefersReducedMotion ? null : animate(telemetryObj, {
      mbps: 9840,
      uptime: 99.98,
      duration: 2200,
      ease: 'outExpo',
      onUpdate: () => {
        if (throughputCounterRef.current) {
          throughputCounterRef.current.textContent = `${Math.round(telemetryObj.mbps)} Mbps`;
        }
        if (uptimeCounterRef.current) {
          uptimeCounterRef.current.textContent = `${telemetryObj.uptime.toFixed(2)}%`;
        }
      }
    });

    // 2. Moviment d'objectes físics flotants 100% CONTINU i FLUID (física trigonomètrica sense salts ni reinicis de frame)
    let animationFrameId;
    let startTime = null;

    const renderPhysics = (time) => {
      if (prefersReducedMotion) return;
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000; // temps en segons

      // Fitxa central del Rack: oscil·lació gravitatòria subtil i contínua
      if (rackCardRef.current) {
        const yRack = Math.sin(elapsed * 0.8) * 8;
        rackCardRef.current.style.transform = `translate3d(0, ${yRack.toFixed(2)}px, 0)`;
      }

      // Pill 1 (Trànsit Cat6A): moviment continu orbital harmònic (funció sinusoidal ininterrompuda)
      if (pill1Ref.current) {
        const y1 = Math.sin(elapsed * 1.2) * 9;
        const x1 = Math.cos(elapsed * 0.9) * 6;
        const r1 = Math.sin(elapsed * 0.7) * 1.5;
        pill1Ref.current.style.transform = `translate3d(${x1.toFixed(2)}px, ${y1.toFixed(2)}px, 0) rotate(${r1.toFixed(2)}deg)`;
      }

      // Pill 2 (Disponibilitat SAI): moviment continu amb desfasament de fase (anti-fase natural)
      if (pill2Ref.current) {
        const y2 = Math.sin(elapsed * 1.1 + Math.PI) * 8;
        const x2 = Math.cos(elapsed * 0.8 + 1.2) * 5;
        const r2 = Math.sin(elapsed * 0.6 + 2) * -1.5;
        pill2Ref.current.style.transform = `translate3d(${x2.toFixed(2)}px, ${y2.toFixed(2)}px, 0) rotate(${r2.toFixed(2)}deg)`;
      }

      // Pill 3 (Ping < 2ms): flotació contínua suau
      if (pill3Ref.current) {
        const y3 = Math.sin(elapsed * 1.5 + 2.5) * 6;
        const x3 = Math.cos(elapsed * 1.1 + 0.5) * 4;
        pill3Ref.current.style.transform = `translate3d(${x3.toFixed(2)}px, calc(-50% + ${y3.toFixed(2)}px), 0)`;
      }

      animationFrameId = requestAnimationFrame(renderPhysics);
    };

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(renderPhysics);
    }

    return () => {
      countAnim?.pause?.();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
    <section id="inici" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#030712] border-b border-slate-900">
      
      {/* ─── ELEMENTS DECORATIUS EN MOVIMENT CONTINU (ORBITES I PARTICULES SUBTILS) ─── */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full border border-cyan-500/10 animate-orbit pointer-events-none" />
      <div className="absolute top-1/3 -right-28 w-96 h-96 rounded-full border border-blue-500/10 animate-orbit pointer-events-none" style={{ animationDuration: '36s' }} />

      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Columna Esquerra: Proposta de valor clara i directa */}
          <div className="lg:col-span-7 space-y-6 animate-fade-in-up">
            
            {/* Badge dinàmic amb micro-desplaçament suau */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900 border border-slate-700 text-sm font-semibold text-slate-200 animate-badge-drift shadow-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Enginyeria de Sistemes & Xarxes · DFactory Barcelona · Zona Franca</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-[1.15]">
              Instal·lació de xarxes, servidors i manteniment informàtic per a empreses.
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 max-w-2xl leading-relaxed">
              A <strong>KernelCore</strong> dissenyem i instal·lem la infraestructura tecnològica del teu negoci: cablejat de xarxa estructurat Cat6/Cat6A, armaris rack, servidors locals o núvol, protecció elèctrica amb SAI i sistemes de cobrament TPV. Treballem presencialment amb temps de resposta garantit.
            </p>

            {/* Accions i Contacte Directe amb feedback interactiu */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#pressupostador"
                className="group flex items-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-heading font-black text-base uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-1 active:translate-y-0"
              >
                <span>Demanar Pressupost Sense Compromís</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="tel:938100200"
                className="flex items-center gap-2.5 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 font-heading font-bold text-base tracking-wider transition-all hover:-translate-y-0.5 hover:border-slate-600 shadow-md"
              >
                <Phone className="w-5 h-5 text-cyan-400" />
                <span>938 100 200</span>
              </a>
            </div>

            {/* Garanties reals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2.5 text-sm font-medium text-slate-200 transition-transform hover:translate-x-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Certificació Cat6/Cat6A</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-slate-200 transition-transform hover:translate-x-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Auditoria in-situ prèvia</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-slate-200 transition-transform hover:translate-x-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>DFactory Barcelona · Zona Franca</span>
              </div>
            </div>
          </div>

          {/* Columna Dreta: Fitxa Tècnica Real amb elements físics en moviment flotant */}
          <div className="lg:col-span-5 relative">
            
            {/* Pill flotant 1 (Superior dreta en moviment físic continu gestionat per Anime.js) */}
            <div 
              ref={pill1Ref}
              className="absolute -top-6 -right-3 sm:-right-6 z-20 hidden sm:flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-900/95 border border-cyan-500/50 shadow-2xl backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Wifi className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Trànsit Actiu Cat6A</p>
                <p ref={throughputCounterRef} className="text-xs font-mono font-bold text-cyan-300">
                  9,840 Mbps
                </p>
              </div>
            </div>

            {/* Pill flotant 2 (Inferior esquerra en moviment contrari Anime.js) */}
            <div 
              ref={pill2Ref}
              className="absolute -bottom-6 -left-3 sm:-left-6 z-20 hidden sm:flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-900/95 border border-emerald-500/50 shadow-2xl backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Disponibilitat SAI</p>
                <p ref={uptimeCounterRef} className="text-xs font-mono font-bold text-emerald-300">
                  99.98%
                </p>
              </div>
            </div>

            {/* Pill flotant 3 (Lateral dret central) */}
            <div
              ref={pill3Ref}
              className="absolute top-1/2 -right-4 sm:-right-8 -translate-y-1/2 z-20 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 shadow-xl backdrop-blur-md"
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono text-slate-300">Ping &lt; 2ms LAN</span>
            </div>

            {/* Fitxa principal amb oscil·lació natural contínua controlada matemàticament */}
            <div ref={rackCardRef} className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden will-change-transform">
              
              {/* Capçalera de la fitxa amb línia de pols de dades */}
              <div className="relative px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-data-pulse" />
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="font-heading font-extrabold text-sm uppercase tracking-wider text-white">
                    Estàndard d'Instal·lació Professional
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold text-cyan-300 bg-cyan-950/90 border border-cyan-700/60">
                  SMX · 2026/27
                </span>
              </div>

              {/* Cos de la fitxa: Especificacions reals amb tipografia gran */}
              <div className="p-6 space-y-4 text-sm text-slate-200">
                
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="font-semibold text-white">Abast del projecte típic:</span>
                    <span className="text-cyan-400 font-mono font-bold">PIME &amp; Comerç</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                    Projectes 'claus en mà': canalització, rosetes RJ45, armari rack 19", switch gestionable PoE+, servidor i sistema de còpies automatitzat.
                  </p>
                </div>

                {/* Checklist tècnic interactiu amb desplaçament en hover */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 transition-all hover:translate-x-1.5 hover:border-slate-700">
                    <Server className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white text-sm">Armaris Rack 19" (12U a 24U)</p>
                      <p className="text-slate-300 text-xs sm:text-sm mt-0.5">Patch panel etiquetat, guies de cable i alimentació PDU protegida.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 transition-all hover:translate-x-1.5 hover:border-slate-700">
                    <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white text-sm">Resiliència Elèctrica amb SAI</p>
                      <p className="text-slate-300 text-xs sm:text-sm mt-0.5">Càlcul matemàtic de càrrega elèctrica amb +20% d'autonomia per talls de corrent.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 transition-all hover:translate-x-1.5 hover:border-slate-700">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white text-sm">Estratègia de Backups 3-2-1</p>
                      <p className="text-slate-300 text-xs sm:text-sm mt-0.5">Còpia local diària + còpia encriptada fora de la seu contra ransomware.</p>
                    </div>
                  </div>
                </div>

                {/* Peu de la targeta */}
                <div className="pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs sm:text-sm text-slate-300 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Resposta tècnica &lt; 2h
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    DFactory Barcelona
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

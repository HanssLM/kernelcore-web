import React, { useState, useEffect, useRef } from 'react';
import { servicesData } from '../data/servicesData';
import { 
  Network, 
  Server, 
  ShieldAlert, 
  MonitorSmartphone, 
  Database, 
  Lock, 
  Check, 
  ChevronRight,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';

const iconMap = {
  Network: Network,
  Server: Server,
  ShieldAlert: ShieldAlert,
  MonitorSmartphone: MonitorSmartphone,
  Database: Database,
  Lock: Lock
};

export default function Services() {
  const [selectedService, setSelectedService] = useState(servicesData[0].id);
  // Estat per a mòbils: quins acordions estan desplegats
  const [mobileExpanded, setMobileExpanded] = useState({ [servicesData[0].id]: true });
  
  // Referències dels elements mòbil per a l'observador d'scroll
  const mobileCardsRef = useRef([]);

  const currentService = servicesData.find(s => s.id === selectedService) || servicesData[0];
  const IconComponent = iconMap[currentService.icon] || Server;

  // En mòbils: anar desplegant els menús a mesura que l'usuari fa scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const setupObserver = () => {
      if (window.innerWidth >= 1024) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const serviceId = entry.target.getAttribute('data-service-id');
              if (serviceId) {
                setMobileExpanded((prev) => {
                  if (prev[serviceId]) return prev;
                  return { ...prev, [serviceId]: true };
                });
              }
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -10% 0px', // Es desplega de forma fluida així que entra a la part visible
          threshold: 0.1
        }
      );

      mobileCardsRef.current.forEach((el) => {
        if (el) observer.observe(el);
      });

      return observer;
    };

    let observerInstance = setupObserver();

    const handleResize = () => {
      if (observerInstance) observerInstance.disconnect();
      observerInstance = setupObserver();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observerInstance) observerInstance.disconnect();
    };
  }, []);

  const toggleMobileItem = (id) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="serveis" className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Àrees d'Especialització Tècnica</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Serveis Informàtics & Instal·lacions de Xarxa
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Acompanyem empreses i comerços locals en totes les etapes: instal·lació física de cablejat, posada en marxa de servidors, punts de venda TPV i suport tècnic continuat.
          </p>
          <div className="hidden lg:flex items-center justify-center gap-2 text-xs font-mono text-cyan-400/80 pt-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Passa el ratolí per sobre dels serveis per explorar el detall</span>
          </div>
        </div>

        {/* ─── VISTA D'ESCRIPTORI (>= lg): Canvi immediat en fer HOVER sobre cada servei ─── */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
          
          {/* Columna Esquerra: Selector amb esdeveniment onMouseEnter (hover) i onClick */}
          <div className="col-span-5 space-y-3">
            {servicesData.map((service) => {
              const ItemIcon = iconMap[service.icon] || Server;
              const isSelected = service.id === selectedService;

              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  onMouseEnter={() => setSelectedService(service.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between border cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/70 shadow-lg shadow-cyan-500/15 translate-x-2'
                      : 'bg-slate-950/60 hover:bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-lg transition-colors ${
                      isSelected 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' 
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}>
                      <ItemIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono text-cyan-400/80 mb-0.5">{service.category}</span>
                      <h3 className={`text-sm font-heading font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1.5' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Columna Dreta: Targeta detallada viva del servei actiu */}
          <div className="col-span-7">
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 shadow-2xl relative overflow-hidden transition-all duration-300">
              
              {/* Línia superior d'activitat de xarxa */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent"></div>

              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
                    {currentService.category}
                  </span>
                  <h3 className="text-2xl font-heading font-extrabold text-white mb-2">
                    {currentService.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {currentService.description}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 shrink-0">
                  <IconComponent className="w-8 h-8" />
                </div>
              </div>

              {/* Especificacions tècniques */}
              <div className="pt-6 border-t border-slate-800/80">
                <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-4">
                  Especificacions & Implementació Tècnica
                </h4>
                <div className="grid grid-cols-2 gap-3.5">
                  {currentService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="p-1 rounded bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SLA & Acció */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{currentService.sla}</span>
                </div>
                <a
                  href="#pressupostador"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-cyan-500/20"
                >
                  <span>Incloure al Pressupost</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* ─── VISTA MÒBIL (< lg): Desplegament progressiu en fer SCROLL (amb acordió tàctil) ─── */}
        <div className="lg:hidden space-y-4">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="text-[11px] font-mono text-cyan-400/90 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Desplegament automàtic en fer scroll
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Toca per obrir o tancar
            </span>
          </div>

          {servicesData.map((service, index) => {
            const ItemIcon = iconMap[service.icon] || Server;
            const isExpanded = !!mobileExpanded[service.id];

            return (
              <div
                key={service.id}
                ref={(el) => (mobileCardsRef.current[index] = el)}
                data-service-id={service.id}
                className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
                  isExpanded
                    ? 'bg-slate-900 border-cyan-500/70 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                    : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Capçalera tàctil de cada servei */}
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => toggleMobileItem(service.id)}
                  className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors ${
                      isExpanded 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' 
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}>
                      <ItemIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-mono text-cyan-400/90">{service.category}</span>
                      <h3 className={`text-sm font-heading font-bold ${isExpanded ? 'text-white' : 'text-slate-300'}`}>
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 text-cyan-400 shrink-0 ml-2 ${
                    isExpanded ? 'rotate-180 text-cyan-300' : 'text-slate-500'
                  }`} />
                </button>

                {/* Cos desplegable (es mostra en fer scroll o clic) */}
                <div
                  className={`transition-all duration-500 ease-in-out px-4 overflow-hidden ${
                    isExpanded ? 'max-h-[800px] pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'
                  }`}
                >
                  <div className="pt-2 border-t border-slate-800/80 space-y-4">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="text-[11px] uppercase font-mono tracking-wider text-cyan-400/80">
                        Especificacions Tècniques
                      </h4>
                      <div className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-[11px]">{service.sla}</span>
                      </div>
                      <a
                        href="#pressupostador"
                        className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-heading font-bold text-[11px] uppercase"
                      >
                        Pressupost
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { Users, Shield, CheckCircle2 } from 'lucide-react';

export default function Team() {
  const founders = [
    {
      name: 'Hans Lao Moncusi',
      role: 'Direcció Tècnica, Sistemes & Desenvolupament Web',
      specialty: 'Sistemes Operatius & Desenvolupament de la Plataforma Web',
      photo: '/Hans.svg',
      desc: 'Creador i desenvolupador íntegre de la plataforma web KernelCore, API REST i base de dades. Gestió de Windows Server 2025 i Linux, polítiques Active Directory, virtualització Proxmox VE i contenidors Docker.',
      skills: ['Desenvolupament Web & Docker', 'Windows Server / AD DS', 'Linux & Bash Scripting', 'Virtualització Proxmox', 'Resiliència & Backups GFS']
    },
    {
      name: 'Joel Pérez Armenteros',
      role: 'Direcció General & Infraestructura de Xarxes',
      specialty: 'Enginyeria de Xarxes & Maquinari',
      photo: '/Joel.svg',
      desc: 'Soci cofundador. Disseny físic i lògic de xarxes corporatives, canalització i cablejat Cat6/Cat6A certificat, configuració de switches L2/L3 PoE+, armaris rack 19" i punts TPV.',
      skills: ['Cablejat Cat6/Cat6A Fluke', 'Switches gestionables L2/L3', 'VLANs & Enrutament', 'Armaris Rack 19" & TPVs']
    }
  ];

  return (
    <section id="equip" className="py-20 sm:py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400">
            <Users className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Equip Fundador &amp; Responsabilitat Tècnica</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Qui som darrere de KernelCore
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Projecte impulsat per tècnics en Sistemes Microinformàtics i Xarxes (SMX). Sense intermediaris ni subcontractes: treballem directament a la teva seu.
          </p>
        </div>

        {/* Targetes dels dos socis fundadors: ample màxim real 50%/50%, mínim marge lateral i disseny integrat d'alta gamma */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
          {founders.map((member, idx) => (
            <div 
              key={idx}
              className="rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/50 card-hover-effect shadow-2xl overflow-hidden group flex flex-col sm:flex-row"
            >
              {/* Foto ampla que ocupa tot el lateral esquerre de la targeta (sense marges buits) */}
              <div className="relative w-full sm:w-2/5 min-h-[320px] sm:min-h-[380px] bg-slate-950 overflow-hidden shrink-0">
                <img 
                  src={member.photo} 
                  alt={`Fotografia professional de ${member.name}`}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    member.name.includes('Hans') 
                      ? 'scale-[1.05] object-[center_35%] group-hover:scale-[1.12]' 
                      : 'scale-[1.12] object-[center_28%] group-hover:scale-[1.20]'
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent via-transparent to-slate-900/80 pointer-events-none" />
                
                {/* Badge d'especialitat integrat */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-lg border border-cyan-500/40 shadow-lg">
                    {member.specialty}
                  </span>
                </div>
              </div>

              {/* Panell de dades tècniques (lateral dret de la targeta) */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <div className="border-b border-slate-800/80 pb-4 mb-4">
                    <h3 className="text-2xl sm:text-3xl font-heading font-black text-white group-hover:text-cyan-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm font-mono font-bold text-cyan-400 mt-1.5">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {member.desc}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                    Especialitats &amp; Eines:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium text-slate-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" aria-hidden="true" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Avís de transparència legal (Omnibus Directive): Destacat, ampli i amb tipografia gran */}
        <div className="mt-14 w-full rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-5 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-lg shadow-cyan-950/50">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-800/40 text-xs sm:text-sm font-mono font-bold text-cyan-300">
                <span>Directiva Europea 2019/2161/UE (Llei Òmnibus)</span>
              </div>
              <h4 className="text-lg sm:text-xl font-heading font-black text-white">
                Compromís Ètic de Transparència Professional
              </h4>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-5xl">
                A <strong>KernelCore</strong> no publiquem testimonis ni ressenyes d'estoc anònimes. Tota referència professional i cas d'èxit correspon a instal·lacions reals verificables prèvia autorització expressa del client.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

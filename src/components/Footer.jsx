import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { LogoMark } from './Logo';

export default function Footer({ onOpenLegal = () => {} }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-xs text-slate-500">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <LogoMark size={32} />
              <span className="text-base font-heading font-extrabold text-white">
                KERNEL<span className="text-cyan-400">CORE</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Enginyeria d'infraestructures, sistemes corporatius i xarxes d'alta disponibilitat per a empreses exigents.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certificació & Estàndards SMX</span>
            </div>
          </div>

          {/* Serveis Links */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Solucions</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#serveis" className="hover:text-cyan-400 transition-colors">Cablejat Cat6 & Racks 19"</a></li>
              <li><a href="#serveis" className="hover:text-cyan-400 transition-colors">Windows Server & Linux AD</a></li>
              <li><a href="#serveis" className="hover:text-cyan-400 transition-colors">SAI / UPS & Resiliència Elèctrica</a></li>
              <li><a href="#serveis" className="hover:text-cyan-400 transition-colors">Pla de Backups GFS 3-2-1</a></li>
              <li><a href="#serveis" className="hover:text-cyan-400 transition-colors">Terminals de Cobrament TPV</a></li>
            </ul>
          </div>

          {/* Links Eines */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Eines & Documentació</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#pressupostador" className="hover:text-cyan-400 transition-colors">Sol·licitud de Pressupost</a></li>
              <li><a href="#metodologia" className="hover:text-cyan-400 transition-colors">Metodologia de Desplegament</a></li>
              <li><a href="#equip" className="hover:text-cyan-400 transition-colors">Organigrama Tècnic</a></li>
              <li><a href="#contacte" className="hover:text-cyan-400 transition-colors">Auditoria Inicial Gratuïta</a></li>
            </ul>
          </div>

          {/* Marc Acadèmic & Dades Titular */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Identitat & Marc Legal</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              KernelCore · Titulars: Hans Lao Moncusi &amp; Joel Pérez Armenteros. Seu Central: DFactory Barcelona (Zona Franca, 08040 Barcelona). Projecte Mòdul de Síntesi (SMX).
            </p>
            <div className="pt-1 text-[11px] text-slate-500 font-mono">
              Tel: <a href="tel:+34938100200" className="hover:text-emerald-400 transition-colors">+34 938 100 200</a> · <a href="mailto:legal@kernelcore.cat" className="hover:text-cyan-400 underline underline-offset-2 transition-colors">legal@kernelcore.cat</a>
            </div>
          </div>

        </div>

        {/* Bottom Bar amb Enllaços Legals Oficials */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400">&copy; {new Date().getFullYear()} KernelCore. Tots els drets reservats.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-slate-400 text-[11px]">
            <button type="button" onClick={() => onOpenLegal('avis-legal')} className="hover:text-cyan-400 transition-colors focus:outline-none focus:underline">
              Avís Legal
            </button>
            <button type="button" onClick={() => onOpenLegal('privacitat')} className="hover:text-cyan-400 transition-colors focus:outline-none focus:underline">
              Privacitat (RGPD)
            </button>
            <button type="button" onClick={() => onOpenLegal('cookies')} className="hover:text-cyan-400 transition-colors focus:outline-none focus:underline">
              Cookies
            </button>
            <button type="button" onClick={() => onOpenLegal('termes')} className="hover:text-cyan-400 transition-colors focus:outline-none focus:underline">
              Termes de Servei
            </button>
            <button type="button" onClick={() => onOpenLegal('reemborsament')} className="hover:text-cyan-400 transition-colors focus:outline-none focus:underline">
              Reemborsament & Desistiment
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

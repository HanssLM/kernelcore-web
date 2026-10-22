import React, { useEffect } from 'react';
import { X, Shield } from 'lucide-react';

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        {/* Capçalera del modal */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 id="privacy-modal-title" className="text-lg font-heading font-bold text-white">
                Política de Protecció de Dades
              </h2>
              <span className="text-xs text-cyan-400 font-mono">Conformitat RGPD (UE 2016/679) & LOPD-GDD 3/2018</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Tancar finestra"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contingut legal detallat */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs">
            <strong>Resum ràpid:</strong> A KernelCore tractem les teves dades exclusivament per atendre la teva petició de pressupost o projecte tecnològic. No venem ni cedim les teves dades a tercers amb finalitats publicitàries.
          </div>

          <section className="space-y-2">
            <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-mono text-xs flex items-center justify-center">1</span>
              Responsable del Tractament
            </h3>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
              <li><strong>Identitat:</strong> KernelCore (Projecte Tècnic SMX - Mòdul Síntesi)</li>
              <li><strong>Socis de l'Empresa:</strong> Hans Lao Moncusi &amp; Joel Pérez Armenteros</li>
              <li><strong>Desenvolupament Web &amp; Gestió Digital:</strong> Hans Lao Moncusi</li>
              <li><strong>Correu de contacte:</strong> <a href="mailto:dpo@kernelcore.cat" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-mono transition-colors">dpo@kernelcore.cat</a> / <a href="mailto:privacitat@kernelcore.cat" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-mono transition-colors">privacitat@kernelcore.cat</a></li>
              <li><strong>Ubicació:</strong> DFactory Barcelona, Carrer 27 del BZ, 10-16 (Zona Franca), 08040 Barcelona</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-mono text-xs flex items-center justify-center">2</span>
              Finalitat del Tractament de Dades
            </h3>
            <p className="text-slate-400">
              Les dades facilitades a través del formulari de pressupost (nom, empresa, correu, telèfon, especificacions d'infraestructura de xarxa i entorn de treball) s'utilitzen amb els següents propòsits:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
              <li>Elaborar la proposta tècnica i econòmica sol·licitada.</li>
              <li>Dimensionar els requeriments d'infraestructura (cables Cat6, servidors, SAI, equips TPV, llicències).</li>
              <li>Contactar amb el client per via telemàtica (correu o telèfon) per aclarir dubtes del projecte.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-mono text-xs flex items-center justify-center">3</span>
              Legitimació del Tractament
            </h3>
            <p className="text-slate-400">
              La base legal per al tractament és el <strong>consentiment explícit de l'interessat</strong> expressat mitjançant la marcació de la casella de verificació prèvia a l'enviament de la sol·licitud (Article 6.1.a RGPD).
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-mono text-xs flex items-center justify-center">4</span>
              Conservació i Seguretat de les Dades
            </h3>
            <p className="text-slate-400">
              Les dades es conservaran durant el temps estrictament necessari per respondre a la petició i mentre puguin derivar-se responsabilitats legals de la prestació de serveis. Aplicem mesures tècniques com xifratge TLS, restriccions d'accés per rols tècnics i servidors protegits sota estàndards d'auditoria.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-mono text-xs flex items-center justify-center">5</span>
              Drets de l'Usuari (Drets ARCO+ / RGPD)
            </h3>
            <p className="text-slate-400">
              Pots exercir en qualsevol moment els teus drets d'<strong>accés, rectificació, supressió (dret a l'oblit), limitació del tractament, portabilitat i oposició</strong> adreçant un correu a <a href="mailto:privacitat@kernelcore.cat" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-mono transition-colors">privacitat@kernelcore.cat</a> adjuntant còpia del document d'identitat o acreditació empresarial.
            </p>
          </section>

        </div>

        {/* Peu del modal */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 hidden sm:inline">Última revisió: Octubre 2026</span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
          >
            Entès i D'acord
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { X, Shield, FileText, Scale, RefreshCw, Cookie, Building2 } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, activeSection = 'privacitat' }) {
  const [userSection, setUserSection] = React.useState(null);
  const section = userSection ?? activeSection;
  const setSection = (sec) => setUserSection(sec);

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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-200">
        
        {/* Capçalera del Modal amb Pestanyes Legals */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-950/80 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h2 id="legal-modal-title" className="text-lg font-heading font-bold text-white">
                  Marc Legal & Protecció de Drets
                </h2>
                <span className="text-xs text-cyan-400 font-mono">KernelCore · LSSI-CE, RGPD, LOPD-GDD & TRLGDCU</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              aria-label="Tancar document legal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menú de Documents Legals */}
          <div role="tablist" className="flex flex-wrap items-center gap-2 text-xs font-medium no-scrollbar">
            {[
              { id: 'avis-legal', label: 'Avís Legal', sub: 'LSSI-CE', icon: Building2 },
              { id: 'privacitat', label: 'Privacitat', sub: 'RGPD', icon: Shield },
              { id: 'cookies', label: 'Cookies', icon: Cookie },
              { id: 'termes', label: 'Termes & Condicions', icon: FileText },
              { id: 'reemborsament', label: 'Reemborsament & Desistiment', icon: RefreshCw },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = section === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSection(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-cyan-400 ${
                    isActive 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm' 
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                  {tab.sub && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive ? 'bg-cyan-500/25 text-cyan-200' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {tab.sub}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cos de Lectura Legal Detallat */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          {/* ========================================================
              1. AVÍS LEGAL (LSSI-CE 34/2002)
          ======================================================== */}
          {section === 'avis-legal' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <p className="font-semibold text-white mb-1">Informació General segons Article 10 de la Llei 34/2002 (LSSI-CE):</p>
                <p>En compliment de la Llei 34/2002, d'11 de juliol, de serveis de la societat de la informació i de comerç electrònic (LSSI-CE), s'informa de les dades identificatives del titular del lloc web:</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">1. Dades del Titular i Responsable</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
                  <li><strong>Denominació Comercial:</strong> KernelCore</li>
                  <li><strong>Socis Fundadors:</strong> Hans Lao Moncusi &amp; Joel Pérez Armenteros</li>
                  <li><strong>Creació i Desenvolupament Web:</strong> Hans Lao Moncusi (autor i desenvolupador íntegre de la plataforma)</li>
                  <li><strong>Activitat:</strong> Projecte Tècnic d'Enginyeria de Sistemes Microinformàtics i Xarxes (Cicle Formatiu SMX - Mòdul de Síntesi). Serveis d'instal·lació de xarxes, servidors i manteniment informàtic.</li>
                  <li><strong>Domicili Social / Seu Central:</strong> DFactory Barcelona, Carrer 27 del BZ, 10-16, Zona Franca, 08040 Barcelona, Espanya.</li>
                  <li><strong>Correu electrònic de contacte:</strong> <a href="mailto:legal@kernelcore.cat" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-mono transition-colors">legal@kernelcore.cat</a> / <a href="mailto:suport@kernelcore.cat" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-mono transition-colors">suport@kernelcore.cat</a></li>
                  <li><strong>Telèfon d'atenció directa:</strong> <a href="tel:+34938100200" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-mono transition-colors">+34 938 100 200</a></li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">2. Propietat Intel·lectual i Industrial</h3>
                <p className="text-slate-400">
                  El codi font, arquitectura de programari, dissenys gràfics, logotips, combinacions cromàtiques, base de dades i motor d'enginyeria d'aquesta plataforma web han estat creats íntegrament per Hans Lao Moncusi per a KernelCore (ambdós socis: Hans Lao Moncusi &amp; Joel Pérez Armenteros). Queda prohibida la reproducció o explotació total o parcial sense consentiment exprés previ.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">3. Exempció de Responsabilitat per Enllaços Externs</h3>
                <p className="text-slate-400">
                  Aquest lloc web no allotja anuncis de tercers ni programari maliciós. KernelCore no es fa responsable de danys derivats d'un ús il·lícit del servei ni de la caiguda temporal del subministrament elèctric o de telecomunicacions aliè al servidor.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================
              2. POLÍTICA DE PRIVACITAT (RGPD & LOPD-GDD 3/2018)
          ======================================================== */}
          {section === 'privacitat' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300">
                <strong>Principi de Minimització (Art. 5.1.c RGPD):</strong> Només recollim les dades estrictament necessàries per elaborar el pressupost d'instal·lació sol·licitat per la teva empresa. No fem perfilat automatitzat ni venem dades a intermediaris.
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">1. Responsable del Tractament</h3>
                <p className="text-slate-400">
                  KernelCore · Titulars: Hans Lao Moncusi &amp; Joel Pérez Armenteros. Seu Central: DFactory Barcelona (Zona Franca, 08040 Barcelona). Delegat de Protecció de Dades (DPO / Contacte): <a href="mailto:privacitat@kernelcore.cat" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-mono transition-colors">privacitat@kernelcore.cat</a>.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">2. Finalitat del Tractament</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
                  <li>Respondre consultes tècniques i sol·licituds de pressupost in-situ.</li>
                  <li>Dimensionar el cablejat (Cat6/Cat6A), armaris rack 19", autonomia de SAI i servidors sol·licitats.</li>
                  <li>Gestió administrativa, operativa i facturació en cas de contractació del projecte.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">3. Base Jurídica (Legitimació)</h3>
                <p className="text-slate-400">
                  El consentiment exprés i inequívoc de l'usuari mitjançant la marcació activa de la casella de verificació corresponent abans d'enviar la sol·licitud (Art. 6.1.a RGPD) o bé l'aplicació de mesures precontractuals a petició de l'interessat (Art. 6.1.b RGPD).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">4. Conservació de les Dades</h3>
                <p className="text-slate-400">
                  Les dades de contacte relatives a pressupostos es mantindran durant un període màxim de 12 mesos per a seguiment comercial o durant els terminis legals d'obligació tributària i mercantil aplicables (5 anys).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">5. Drets de l'Interessat (ARCO-POL)</h3>
                <p className="text-slate-400">
                  Pots exercir els teus drets d'Accés, Rectificació, Supressió (Dret a l'oblit), Limitació del tractament, Portabilitat i Oposició enviant un correu a <a href="mailto:privacitat@kernelcore.cat" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-mono transition-colors">privacitat@kernelcore.cat</a> indicant el teu nom i el dret sol·licitat. Tens dret a presentar reclamació davant l'Agència Espanyola de Protecció de Dades (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">AEPD</a>).
                </p>
              </div>
            </div>
          )}

          {/* ========================================================
              3. POLÍTICA DE COOKIES (Art. 22.2 LSSI-CE)
          ======================================================== */}
          {section === 'cookies' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <p className="font-semibold text-white mb-1">Transparència Absoluta sobre Cookies:</p>
                <p>Aquest lloc web <strong>no utilitza cookies publicitàries de seguiment invasiu ni xarxes de tercers de revenda de dades</strong>. Únicament utilitzem emmagatzematge tècnic imprescindible per al funcionament del portal i l'anàlisi de sessions locals.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">1. Què és una cookie?</h3>
                <p className="text-slate-400">
                  Un fitxer de dades mínim que s'emmagatzema al teu dispositiu per recordar l'estat de la navegació, mantenir la sessió tècnica o desar preferències com l'acceptació del consentiment de privacitat.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">2. Tipologia de Cookies Utilitzades</h3>
                <div className="overflow-x-auto border border-slate-800 rounded-lg">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">Nom</th>
                        <th className="p-2.5">Finalitat</th>
                        <th className="p-2.5">Tipus</th>
                        <th className="p-2.5">Durada</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-[11px]">
                      <tr>
                        <td className="p-2.5 text-cyan-400">kernel_cookies_consent</td>
                        <td className="p-2.5 font-sans">Guarda l'estat del consentiment de cookies seleccionat</td>
                        <td className="p-2.5">Tècnica / Pròpia</td>
                        <td className="p-2.5">12 mesos</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-cyan-400">kernel_user</td>
                        <td className="p-2.5 font-sans">Sessió del tècnic autenticat al Portal de Gestió</td>
                        <td className="p-2.5">Tècnica / Pròpia</td>
                        <td className="p-2.5">Sessió</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-cyan-400">kernel_quote_requests</td>
                        <td className="p-2.5 font-sans">Emmagatzematge temporal de sol·licituds pendents</td>
                        <td className="p-2.5">Funcional local</td>
                        <td className="p-2.5">Fins a buidatge</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">3. Com revocar o configurar el consentiment?</h3>
                <p className="text-slate-400">
                  Pots canviar les teves preferències en qualsevol moment mitjançant el banner de configuració de cookies o configurant les opcions del teu navegador web (Chrome, Firefox, Safari, Edge) per bloquejar l'emmagatzematge de cookies.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================
              4. TERMES I CONDICIONS GENERALS DE SERVEI
          ======================================================== */}
          {section === 'termes' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">1. Objecte del Servei</h3>
                <p className="text-slate-400">
                  KernelCore proporciona serveis d'auditoria, dimensionament, instal·lació física de cablejat Cat6/Cat6A, enrackat de maquinari, configuració de servidors (Windows/Linux/Proxmox) i manteniment informàtic per a empreses i organitzacions.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">2. Pressupostos i Validesa de les Propostes</h3>
                <p className="text-slate-400">
                  Els pressupostos emesos a través del nostre portal tenen una validesa oficial de <strong>30 dies naturals</strong> a partir de la data d'emissió, subjectes a la disponibilitat física d'estoc de maquinari i confirmació mitjançant auditoria in-situ de l'espai de treball del client.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">3. Garantia de les Instal·lacions</h3>
                <p className="text-slate-400">
                  Tota instal·lació de cablejat de xarxa gaudeix de certificació Fluke individualitzada i una garantia d'instal·lació de <strong>2 anys</strong> (ampliable a 5 anys en contractes de manteniment continuat). El maquinari subministrat (switches, servidors, SAIs) disposa de la garantia oficial del fabricant segons el Reial Decret Legislatiu 1/2007 (3 anys per a equips adquirits).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">4. Acord de Nivell de Servei (SLA)</h3>
                <p className="text-slate-400">
                  Els clients amb contracte de manteniment actiu disposen d'un temps de resposta in-situ garantit inferior a <strong>2 hores</strong> per a incidències de caràcter crític (aturada total de negoci o caiguda de servidor principal).
                </p>
              </div>
            </div>
          )}

          {/* ========================================================
              5. POLÍTICA DE REEMBORSAMENT I DRET DE DESISTIMENT
          ======================================================== */}
          {section === 'reemborsament' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <p className="font-semibold text-white mb-1">Normativa de Desistiment (TRLGDCU Reial Decret Legislatiu 1/2007):</p>
                <p>Condicions de cancel·lació, desistiment i reemborsament aplicables a la prestació de serveis i subministrament d'equips informàtics per a KernelCore.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">1. Dret de Desistiment Legal (14 dies)</h3>
                <p className="text-slate-400">
                  Si ets consumidor o usuari que contracta a distància, disposes de <strong>14 dies naturals</strong> des de la contractació per desistir del contracte sense necessitat de justificació ni penalització, sempre que el servei no hagi estat executat completament.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">2. Excepcions al Desistiment (Art. 103 TRLGDCU)</h3>
                <p className="text-slate-400">
                  El dret de desistiment no serà aplicable en els següents casos previstos per la llei:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
                  <li>Serveis de tirada de cablejat o instal·lació física ja executats amb consentiment exprés previ del client.</li>
                  <li>Bé personalitzat o confeccionat a mida (ex: cablejat tallat a mides específiques de canaleta, llicències de programari vinculades al domini del client que han estat activades).</li>
                  <li>Subministrament de components desprecintats que no puguin reutilitzar-se per motius de seguretat o configuració irreversible.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-heading font-bold text-white">3. Procediment de Reemborsament</h3>
                <p className="text-slate-400">
                  En cas de resolució justificada o cancel·lació d'una comanda abans de l'inici del muntatge físic, el reemborsament de qualsevol paga i senyal s'efectuarà en un termini màxim de <strong>14 dies naturals</strong> mitjançant el mateix mètode de pagament emprat en la transferència inicial.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Peu del Modal */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] text-slate-500">
            Documentació oficial actualitzada · Octubre 2026
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          >
            Entès i Tancar
          </button>
        </div>

      </div>
    </div>
  );
}

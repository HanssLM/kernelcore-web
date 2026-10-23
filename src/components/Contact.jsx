import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { API_BASE } from '../config/api';
import { supabase } from '../lib/supabaseClient';

export default function Contact({ onOpenLegal = () => { } }) {
  const [sent, setSent] = useState(false);
  const [nom, setNom] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [tipusServei, setTipusServei] = useState('Cablejat Estructurat & Armaris Rack');
  const [missatge, setMissatge] = useState('');
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE}/contacte`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom,
          empresa,
          email,
          telefon,
          tipus_servei: tipusServei,
          missatge,
          consentiment_rgpd: accepted,
        }),
      });
    } catch {
      // Fallback silenciós si el backend no està encès
    }

    // Inserció directa a Supabase Cloud Database si està disponible
    if (supabase) {
      try {
        await supabase.from('contactes_web').insert([{
          nom,
          email,
          telefon,
          tipus_servei: tipusServei,
          missatge,
          consentiment_rgpd: accepted,
          estat: 'Nou'
        }]);
      } catch {
        // Fallback silenciós
      }
    }

    try {
      const existing = JSON.parse(localStorage.getItem('kernel_quote_requests') || '[]');
      const newContactLead = {
        id: `SOL-WEB-${String(existing.length + 1).padStart(3, '0')}`,
        nom,
        empresa: empresa || nom,
        email,
        telefon: telefon || '',
        entorn: 'Oficina PIME / Formulari Web',
        treballadors: '5-20',
        urgencia: 'normal',
        pressupostAprox: 'A convenir',
        serveiLabels: [tipusServei || 'Contacte General'],
        descripcio: missatge || 'Consulta rebuda des del formulari de contacte web.',
        status: 'Nova sol·licitud',
        createdAt: new Date().toISOString(),
        pressupostGenerat: null,
        emailEnviat: false
      };
      localStorage.setItem('kernel_quote_requests', JSON.stringify([newContactLead, ...existing]));
      window.dispatchEvent(new Event('storage'));
    } catch {
      // Fallback si localStorage no està disponible
    }

    setSent(true);
    setNom('');
    setEmpresa('');
    setEmail('');
    setTelefon('');
    setTipusServei('Cablejat Estructurat & Armaris Rack');
    setMissatge('');
    setAccepted(false);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contacte" className="py-24 bg-slate-900/40 relative border-t border-slate-900">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              Atenció Personalitzada
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Parlem de la teva instal·lació o negoci
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sense intermediaris ni centraletes automàtiques. El nostre equip tècnic t'assessora directament, visita el teu local o oficina i prepara una proposta ajustada a les teves necessitats.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block uppercase font-mono">Seu Central</span>
                  <span className="text-sm font-medium text-slate-200">DFactory Barcelona · Carrer 27 del BZ, 10-16 (Zona Franca), 08040 Barcelona</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block uppercase font-mono">Correu Tècnic</span>
                  <a
                    href="mailto:suport@kernelcore.cat"
                    className="text-sm font-medium text-slate-200 hover:text-cyan-400 underline underline-offset-2 transition-colors"
                  >
                    suport@kernelcore.cat
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block uppercase font-mono">Telèfon d'Urgències IT</span>
                  <a
                    href="tel:+34938100200"
                    className="text-sm font-medium text-slate-200 hover:text-emerald-400 transition-colors"
                  >
                    +34 938 100 200 (Guardia 24/7)
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block uppercase font-mono">Horari d'Oficina</span>
                  <span className="text-sm font-medium text-slate-200">Dilluns a Divendres: 08:00h - 19:00h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl relative">
              <h3 className="text-xl font-heading font-extrabold text-white mb-2">
                Sol·licita una Consultoria Tècnica Inicial
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Omple aquest formulari i un tècnic especialitzat es posarà en contacte amb tu en menys de 24 hores.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-nom" className="block text-xs text-slate-300 mb-1.5 font-medium">Nom i Cognoms:</label>
                    <input
                      id="contact-nom"
                      type="text"
                      required
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Marc Rovira"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-empresa" className="block text-xs text-slate-300 mb-1.5 font-medium">Empresa:</label>
                    <input
                      id="contact-empresa"
                      type="text"
                      required
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      placeholder="Empresa o Negoci S.L."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs text-slate-300 mb-1.5 font-medium">Correu Electrònic:</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contacte@empresa.cat"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-telefon" className="block text-xs text-slate-300 mb-1.5 font-medium">Telèfon de Contacte:</label>
                    <input
                      id="contact-telefon"
                      type="tel"
                      required
                      value={telefon}
                      onChange={(e) => setTelefon(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-tipus-servei" className="block text-xs text-slate-300 mb-1.5 font-medium">Tipus de Servei Requerit:</label>
                  <select
                    id="contact-tipus-servei"
                    value={tipusServei}
                    onChange={(e) => setTipusServei(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 outline-none focus:border-cyan-500"
                  >
                    <option value="Cablejat Estructurat & Armaris Rack">Cablejat Estructurat & Armaris Rack</option>
                    <option value="Implantació de Servidors (Windows/Linux/Proxmox)">Implantació de Servidors (Windows/Linux/Proxmox)</option>
                    <option value="Seguretat Passiva (SAI & Backups 3-2-1)">Seguretat Passiva (SAI & Backups 3-2-1)</option>
                    <option value="Solució Completa de Punts de Venda (TPVs)">Solució Completa de Punts de Venda (TPVs)</option>
                    <option value="Manteniment Informàtic & Ciberseguretat">Manteniment Informàtic & Ciberseguretat</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-missatge" className="block text-xs text-slate-300 mb-1.5 font-medium">Missatge o Detalls del Projecte:</label>
                  <textarea
                    id="contact-missatge"
                    rows={4}
                    required
                    value={missatge}
                    onChange={(e) => setMissatge(e.target.value)}
                    placeholder="Explica'ns breument quantes estacions de treball tens, metres del local o necessitats específiques..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 outline-none focus:border-cyan-500 resize-none"
                  ></textarea>
                </div>

                {/* Consentiment exprés RGPD / LOPD-GDD */}
                <div className="pt-1">
                  <div className="flex items-center gap-3">
                    <input
                      id="contact-privacy-checkbox"
                      type="checkbox"
                      required
                      aria-required="true"
                      checked={accepted}
                      onChange={(e) => setAccepted(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-2 focus:ring-cyan-500/30 cursor-pointer accent-cyan-500 shrink-0"
                    />
                    <label htmlFor="contact-privacy-checkbox" className="text-xs text-slate-400 select-none leading-normal cursor-pointer">
                      Accepto el tractament de les meves dades per respondre a aquesta consulta tècnica segons la{' '}
                      <button
                        type="button"
                        onClick={() => onOpenLegal('privacitat')}
                        className="text-cyan-400 underline hover:text-cyan-300 font-medium inline transition-colors focus:outline-none"
                      >
                        Política de Privacitat
                      </button>{' '}
                      de KernelCore. *
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all focus:ring-2 focus:ring-cyan-400"
                >
                  {sent ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                      <span>Missatge Enviat amb Èxit</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>Enviar Sol·licitud de Consultoria</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

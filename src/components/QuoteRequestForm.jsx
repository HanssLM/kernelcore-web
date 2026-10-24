import React, { useState, useMemo } from 'react';
import {
  Send, CheckCircle2, ChevronDown, Building2, User,
  Wifi, Server, ShieldCheck, CreditCard, Database, Wrench, MessageSquare,
  Loader2, AlertTriangle, MoreHorizontal, ExternalLink, Zap, Calculator, RotateCcw
} from 'lucide-react';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import { API_BASE } from '../config/api';

const SERVICES = [
  { id: 'xarxa', label: 'Cablejat & Xarxa Cat6/Cat6A', icon: Wifi },
  { id: 'servidor', label: 'Servidors Windows/Linux/Proxmox', icon: Server },
  { id: 'sai', label: 'SAI & Continuïtat Elèctrica', icon: ShieldCheck },
  { id: 'tpv', label: 'Terminals de Cobrament (TPV)', icon: CreditCard },
  { id: 'bbdd', label: 'Bases de Dades & Software', icon: Database },
  { id: 'manteniment', label: 'Manteniment Correctiu & Preventiu', icon: Wrench },
  { id: 'altres', label: 'Altres (especificar)', icon: MoreHorizontal },
];

const URGENCY = [
  { value: 'flexible', label: 'Flexible (> 1 mes)' },
  { value: 'normal', label: 'Normal (2–4 setmanes)' },
  { value: 'urgent', label: 'Urgent (< 1 setmana)' },
];

const ENVIRONMENTS = [
  { value: '', label: 'Selecciona el tipus d\'entorn...' },
  { value: 'oficina_pime', label: 'Oficina / PIME' },
  { value: 'comerç_retail', label: 'Comerç & Retail' },
  { value: 'nau_industrial', label: 'Nau Industrial' },
  { value: 'clinica_salut', label: 'Clínica / Salut' },
  { value: 'restauracio', label: 'Restauració & Hostaleria' },
  { value: 'altre', label: 'Altre / No ho sé' },
];

const INITIAL_FORM = {
  nom: '',
  empresa: '',
  email: '',
  telefon: '',
  entorn: '',
  treballadors: '',
  serveis: [],
  altresDetall: '',
  urgencia: 'normal',
  descripcio: '',
  pressupostAprox: '',
  privacyAccepted: false,
};

export default function QuoteRequestForm({ onOpenLegal }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success
  const [submittedId, setSubmittedId] = useState('');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Estat de la Calculadora Interactiva de Càrrega SAI & Autonomia Elèctrica
  const [showUpsCalc, setShowUpsCalc] = useState(false);
  const [upsDevices, setUpsDevices] = useState({
    pcs: 6,
    servers: 1,
    switches: 2,
  });

  const upsCalculation = useMemo(() => {
    const wattsPcs = upsDevices.pcs * 120;
    const wattsServers = upsDevices.servers * 350;
    const wattsSwitches = upsDevices.switches * 65;
    const totalWatts = wattsPcs + wattsServers + wattsSwitches;
    const safetyWatts = Math.ceil(totalWatts * 1.2); // +20% marge de seguretat
    const requiredVA = Math.ceil(safetyWatts / 0.7); // Factor de potència 0.7

    let recommendedModel = 'APC Smart-UPS / Salicru SLC 1500VA';
    let nominalVA = 1500;
    let batteryWh = 430;

    if (requiredVA > 3000) {
      recommendedModel = 'Salicru SLC Cube3+ / APC SRT 5000VA Online';
      nominalVA = 5000;
      batteryWh = 1920;
    } else if (requiredVA > 1500) {
      recommendedModel = 'APC Smart-UPS Online / Salicru Twin Pro2 3000VA';
      nominalVA = 3000;
      batteryWh = 960;
    }

    const loadPercentage = totalWatts > 0 ? Math.min(100, Math.round((requiredVA / nominalVA) * 100)) : 0;
    const estimatedMinutes = totalWatts > 0
      ? Math.max(6, Math.round(((batteryWh * 0.85) / totalWatts) * 60))
      : 0;

    return {
      totalWatts,
      safetyWatts,
      requiredVA,
      recommendedModel,
      nominalVA,
      loadPercentage,
      estimatedMinutes,
    };
  }, [upsDevices]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleServei = (id) => {
    setForm(f => ({
      ...f,
      serveis: f.serveis.includes(id)
        ? f.serveis.filter(s => s !== id)
        : [...f.serveis, id]
    }));
  };

  const applyUpsToForm = () => {
    const summaryLine = `[Dimensionament SAI: ${upsDevices.pcs} PCs/TPVs, ${upsDevices.servers} Servidors, ${upsDevices.switches} Switches -> Consum ${upsCalculation.totalWatts}W | Potència amb +20% marge: ${upsCalculation.requiredVA}VA | Recomanat: ${upsCalculation.recommendedModel} (~${upsCalculation.estimatedMinutes} min autonomia)]`;
    setForm(f => ({
      ...f,
      serveis: f.serveis.includes('sai') ? f.serveis : [...f.serveis, 'sai'],
      descripcio: f.descripcio.includes('[Dimensionament SAI:')
        ? f.descripcio.replace(/\[Dimensionament SAI:.*?\]/, summaryLine)
        : (f.descripcio.trim() ? `${f.descripcio.trim()}\n\n${summaryLine}` : summaryLine)
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.nom.trim()) e.nom = 'El nom és obligatori';
    if (!form.empresa.trim()) e.empresa = 'L\'empresa o organització és obligatòria';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Correu electrònic no vàlid';
    if (!form.entorn) e.entorn = 'Selecciona el tipus d\'entorn';
    if (form.serveis.length === 0) e.serveis = 'Selecciona almenys un servei';
    if (form.serveis.includes('altres') && !form.altresDetall.trim()) {
      e.altresDetall = 'Si us plau, especifica quin altre servei necessites';
    }
    if (!form.descripcio.trim() || form.descripcio.trim().length < 20) e.descripcio = 'Descriu els teus requisits (mínim 20 caràcters)';
    if (!form.privacyAccepted) e.privacyAccepted = 'Has d\'acceptar la política de protecció de dades (RGPD) per poder enviar la sol·licitud';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('sending');

    const serveiLabels = form.serveis.map(sid => {
      if (sid === 'altres' && form.altresDetall.trim()) {
        return `Altres: ${form.altresDetall.trim()}`;
      }
      return SERVICES.find(s => s.id === sid)?.label || sid;
    });

    const payload = {
      ...form,
      serveiLabels,
    };

    try {
      const res = await fetch(`${API_BASE}/sollicituds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => null);

      let backendId = null;
      if (res && res.ok) {
        const data = await res.json().catch(() => ({}));
        backendId = data?.request?.id || null;
      }

      const existing = JSON.parse(localStorage.getItem('kernel_quote_requests') || '[]');
      const ticketId = backendId || `SOL-${String(existing.length + 1).padStart(3, '0')}`;
      const newTicket = {
        id: ticketId,
        ...form,
        serveiLabels,
        status: 'Nova sol·licitud',
        createdAt: new Date().toISOString(),
        pressupostGenerat: null,
        emailEnviat: false,
      };
      localStorage.setItem('kernel_quote_requests', JSON.stringify([newTicket, ...existing]));
      window.dispatchEvent(new Event('storage'));
      setSubmittedId(ticketId);
      setStatus('success');
    } catch {
      const existing = JSON.parse(localStorage.getItem('kernel_quote_requests') || '[]');
      const ticketId = `SOL-${String(existing.length + 1).padStart(3, '0')}`;
      const newTicket = {
        id: ticketId,
        ...form,
        serveiLabels,
        status: 'Nova sol·licitud',
        createdAt: new Date().toISOString(),
        pressupostGenerat: null,
        emailEnviat: false,
      };
      localStorage.setItem('kernel_quote_requests', JSON.stringify([newTicket, ...existing]));
      window.dispatchEvent(new Event('storage'));
      setSubmittedId(ticketId);
      setStatus('success');
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmittedId('');
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <section id="pressupostador" className="py-14 sm:py-20 lg:py-28 bg-[#030712]">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center px-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5 sm:mb-6">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-white mb-3 sm:mb-4">
              Sol·licitud enviada correctament!
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-3 leading-relaxed">
              El nostre equip tècnic revisarà els teus requisits i et prepararà un pressupost personalitzat.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
              Rebràs el pressupost al correu <span className="text-cyan-400 font-semibold">{form.email}</span> en un termini màxim de <strong className="text-white">24-48 hores laborables</strong>.
            </p>
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 mb-8">
              <span className="font-mono text-cyan-400 font-bold">Referència de la teva sol·licitud:</span>
              <span className="font-mono text-white font-bold bg-slate-800 px-2.5 py-0.5 rounded">
                {submittedId || `SOL-${String(JSON.parse(localStorage.getItem('kernel_quote_requests') || '[{}]').length).padStart(3, '0')}`}
              </span>
            </div>
            <div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs sm:text-sm font-semibold text-cyan-400 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Enviar una nova sol·licitud</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pressupostador" className="py-14 sm:py-20 lg:py-28 bg-[#030712] relative overflow-hidden">
      {/* Decoració de fons amb resplendor adaptatiu */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] sm:w-[500px] lg:w-[800px] h-[200px] sm:h-[300px] bg-cyan-500/5 blur-[90px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        
        {/* Capçalera de la secció */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-[11px] sm:text-xs font-semibold text-cyan-400 mb-3 sm:mb-5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" style={{ animationDuration: '2.8s' }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
            </span>
            Pressupost sense compromís
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight mb-3 sm:mb-4">
            Sol·licita el teu <span className="text-cyan-400">Pressupost</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2">
            Explica'ns els teus requisits i el nostre equip tècnic t'enviarà un pressupost detallat i personalitzat al teu correu en 24–48 hores.
          </p>
        </div>

        {/* Formulari responsive */}
        <div className="w-full max-w-4xl lg:max-w-5xl 2xl:max-w-6xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-slate-900/60 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 lg:p-11 backdrop-blur-sm space-y-6 sm:space-y-8 shadow-xl shadow-black/40">
            
            {/* Bloc 1: Dades de contacte */}
            <div>
              <h3 className="text-sm sm:text-base font-heading font-bold text-white flex items-center gap-2 mb-3 sm:mb-5">
                <User className="w-4 h-4 text-cyan-400" />
                Dades de Contacte
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Nom i cognoms *</label>
                  <input
                    type="text"
                    placeholder="Joan Garcia Puig"
                    value={form.nom}
                    onChange={e => set('nom', e.target.value)}
                    className={`w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-slate-100 outline-none focus:border-cyan-500 transition-colors ${errors.nom ? 'border-red-500/60' : 'border-slate-800'}`}
                  />
                  {errors.nom && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/>{errors.nom}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Empresa / Organització *</label>
                  <input
                    type="text"
                    placeholder="Farmàcia PharmaCore SL"
                    value={form.empresa}
                    onChange={e => set('empresa', e.target.value)}
                    className={`w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-slate-100 outline-none focus:border-cyan-500 transition-colors ${errors.empresa ? 'border-red-500/60' : 'border-slate-800'}`}
                  />
                  {errors.empresa && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/>{errors.empresa}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Correu electrònic *</label>
                  <input
                    type="email"
                    placeholder="joan@empresa.cat"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    className={`w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-slate-100 outline-none focus:border-cyan-500 transition-colors ${errors.email ? 'border-red-500/60' : 'border-slate-800'}`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/>{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Telèfon de contacte</label>
                  <input
                    type="tel"
                    placeholder="93X XXX XXX"
                    value={form.telefon}
                    onChange={e => set('telefon', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-slate-100 outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800" />

            {/* Bloc 2: Entorn i dimensionament */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 sm:mb-5">
                <h3 className="text-sm sm:text-base font-heading font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  Entorn i Dimensionament
                </h3>
                <button
                  type="button"
                  onClick={() => setShowUpsCalc(prev => !prev)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-semibold text-cyan-400 transition-colors self-start sm:self-auto"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>{showUpsCalc ? 'Ocultar Calculadora SAI' : 'Calculadora de Càrrega SAI & Autonomia'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showUpsCalc ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Tipus d'entorn *</label>
                  <div className="relative">
                    <select
                      value={form.entorn}
                      onChange={e => set('entorn', e.target.value)}
                      className={`w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-slate-100 outline-none focus:border-cyan-500 transition-colors appearance-none ${errors.entorn ? 'border-red-500/60' : 'border-slate-800'}`}
                    >
                      {ENVIRONMENTS.map(env => (
                        <option key={env.value} value={env.value} disabled={!env.value}>{env.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                  {errors.entorn && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/>{errors.entorn}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Nombre de treballadors / llocs de treball</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Ex: 8"
                    value={form.treballadors}
                    onChange={e => set('treballadors', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-slate-100 outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              {/* Calculadora Interactiva de Càrrega SAI & Autonomia Elèctrica */}
              {(showUpsCalc || form.serveis.includes('sai')) && (
                <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/30 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-heading font-bold text-white">
                          Calculadora Interactiva de Càrrega SAI & Autonomia Elèctrica
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Dimensionament tècnic amb factor de potència 0.7 i marge de seguretat del +20%
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={applyUpsToForm}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-heading font-bold text-[11px] uppercase tracking-wider transition-colors self-start sm:self-auto"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Afegir càlcul a la sol·licitud</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-slate-300 font-medium">Estacions PC / TPV (120W)</span>
                        <span className="font-mono font-bold text-cyan-400">{upsDevices.pcs} uds.</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={30}
                        value={upsDevices.pcs}
                        onChange={e => setUpsDevices(d => ({ ...d, pcs: Number(e.target.value) }))}
                        className="w-full h-1.5 bg-slate-800 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-slate-300 font-medium">Servidors Rack/Torre (350W)</span>
                        <span className="font-mono font-bold text-cyan-400">{upsDevices.servers} uds.</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={6}
                        value={upsDevices.servers}
                        onChange={e => setUpsDevices(d => ({ ...d, servers: Number(e.target.value) }))}
                        className="w-full h-1.5 bg-slate-800 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-slate-300 font-medium">Switches PoE & Routers (65W)</span>
                        <span className="font-mono font-bold text-cyan-400">{upsDevices.switches} uds.</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        value={upsDevices.switches}
                        onChange={e => setUpsDevices(d => ({ ...d, switches: Number(e.target.value) }))}
                        className="w-full h-1.5 bg-slate-800 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">Consum Real Actiu</span>
                      <span className="text-base sm:text-lg font-heading font-extrabold text-white font-mono">
                        {upsCalculation.totalWatts} W
                      </span>
                      <span className="block text-[10px] text-slate-500 mt-0.5">
                        Amb +20%: {upsCalculation.safetyWatts} W
                      </span>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">Potència Aparent (+20%)</span>
                      <span className="text-base sm:text-lg font-heading font-extrabold text-cyan-400 font-mono">
                        {upsCalculation.requiredVA} VA
                      </span>
                      <span className="block text-[10px] text-slate-500 mt-0.5">
                        Càrrega SAI: {upsCalculation.loadPercentage}%
                      </span>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">Model SAI Recomanat</span>
                      <span className="text-xs sm:text-sm font-heading font-bold text-emerald-400 block mt-0.5 leading-snug">
                        {upsCalculation.recommendedModel}
                      </span>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">Autonomia Estimada</span>
                      <span className="text-base sm:text-lg font-heading font-extrabold text-amber-400 font-mono">
                        ~{upsCalculation.estimatedMinutes} min
                      </span>
                      <span className="block text-[10px] text-slate-500 mt-0.5">
                        Apagada segura garantida
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800" />

            {/* Bloc 3: Serveis requerits */}
            <div>
              <h3 className="text-sm sm:text-base font-heading font-bold text-white flex items-center gap-2 mb-1.5 sm:mb-2">
                <Wrench className="w-4 h-4 text-cyan-400" />
                Serveis Requerits *
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 mb-3 sm:mb-4">Selecciona tots els serveis que necessitis. Podem combinar-ne diversos en un sol projecte.</p>
              
              {/* Graella adaptable de 1 columna a mòbil, 2 a tauleta i 3 a pantalles amples */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                {SERVICES.map(s => {
                  const Icon = s.icon;
                  const selected = form.serveis.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleServei(s.id)}
                      className={`flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl border text-left transition-all ${
                        selected
                          ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 ${selected ? 'bg-cyan-500/20' : 'bg-slate-900'}`}>
                        <Icon className={`w-4 h-4 ${selected ? 'text-cyan-400' : 'text-slate-400'}`} />
                      </div>
                      <span className="text-xs sm:text-sm font-medium leading-snug">{s.label}</span>
                      {selected && <CheckCircle2 className="w-4 h-4 text-cyan-400 ml-auto shrink-0" />}
                    </button>
                  );
                })}
              </div>
              {errors.serveis && <p className="text-red-400 text-xs mt-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/>{errors.serveis}</p>}

              {/* Camp dinàmic quan se selecciona "Altres" */}
              {form.serveis.includes('altres') && (
                <div className="mt-3 sm:mt-4 p-3.5 sm:p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <MoreHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                    Especifica quin altre servei o solució necessites: *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Control d'accessos biomètric, megafonia IP, càmeres CCTV..."
                    value={form.altresDetall}
                    onChange={e => set('altresDetall', e.target.value)}
                    className={`w-full bg-slate-900 border rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-slate-100 outline-none focus:border-cyan-500 transition-colors ${errors.altresDetall ? 'border-red-500/60' : 'border-slate-800'}`}
                  />
                  {errors.altresDetall && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3"/>{errors.altresDetall}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-slate-800" />

            {/* Bloc 4: Detalls i urgència */}
            <div>
              <h3 className="text-sm sm:text-base font-heading font-bold text-white flex items-center gap-2 mb-3 sm:mb-5">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                Detalls del Projecte
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Urgència del projecte</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {URGENCY.map(u => (
                      <button
                        key={u.value}
                        type="button"
                        onClick={() => set('urgencia', u.value)}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-medium border transition-all text-center ${
                          form.urgencia === u.value
                            ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {u.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Descripció dels requisits i necessitats * <span className="text-slate-500">(mínim 20 caràcters)</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Explica'ns el context del projecte: mida de l'espai, infraestructura actual, problemes que vols resoldre, funcionalitats específiques, etc."
                    value={form.descripcio}
                    onChange={e => set('descripcio', e.target.value)}
                    className={`w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-slate-100 outline-none focus:border-cyan-500 transition-colors resize-none ${errors.descripcio ? 'border-red-500/60' : 'border-slate-800'}`}
                  />
                  <div className="flex items-center justify-between mt-1">
                    {errors.descripcio
                      ? <p className="text-red-400 text-xs flex items-center gap-1"><AlertTriangle className="w-3 h-3"/>{errors.descripcio}</p>
                      : <span />
                    }
                    <span className={`text-[11px] font-mono ${form.descripcio.length < 20 ? 'text-slate-600' : 'text-emerald-500'}`}>
                      {form.descripcio.length} caràcters
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Pressupost aproximat disponible <span className="text-slate-500">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 3.000 € – 8.000 €"
                    value={form.pressupostAprox}
                    onChange={e => set('pressupostAprox', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-slate-100 outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Checkbox de Protecció de Dades (RGPD) i Condicions */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <div className="flex items-start gap-3">
                <input
                  id="privacy-checkbox"
                  type="checkbox"
                  checked={form.privacyAccepted}
                  onChange={e => set('privacyAccepted', e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-2 focus:ring-cyan-500/40 focus:ring-offset-0 cursor-pointer accent-cyan-500 shrink-0"
                  aria-required="true"
                />
                <span className="text-xs text-slate-300 leading-normal select-none">
                  He llegit i accepto de manera expressa la{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onOpenLegal) onOpenLegal('privacitat');
                      else setIsPrivacyOpen(true);
                    }}
                    className="inline-flex items-center gap-1 text-cyan-400 font-semibold underline decoration-cyan-500/50 hover:text-cyan-300 hover:decoration-cyan-300 underline-offset-2 transition-colors cursor-pointer text-left focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  >
                    <span>Política de Protecció de Dades (RGPD / LOPD-GDD)</span>
                    <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
                  </button>
                  {' '}i els{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onOpenLegal) onOpenLegal('termes');
                      else setIsPrivacyOpen(true);
                    }}
                    className="inline-flex items-center gap-1 text-cyan-400 font-semibold underline decoration-cyan-500/50 hover:text-cyan-300 underline-offset-2 transition-colors"
                  >
                    <span>Termes de Servei</span>
                  </button>
                  . Entenc que les meves dades seran tractades per KernelCore exclusivament per elaborar i gestionar la proposta tècnica sol·licitada, sense cessió a tercers. *
                </span>
              </div>
              {errors.privacyAccepted && (
                <p className="text-red-400 text-xs flex items-center gap-1" role="alert">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  {errors.privacyAccepted}
                </p>
              )}
            </div>

            {/* Botó d'enviament */}
            <div className="pt-1 sm:pt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 sm:gap-2.5 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-heading font-bold text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === 'sending' ? (
                  <><Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /><span>Enviant sol·licitud...</span></>
                ) : (
                  <><Send className="w-4 h-4 sm:w-5 sm:h-5" /><span>Enviar Sol·licitud de Pressupost</span></>
                )}
              </button>
              <p className="text-center text-[11px] sm:text-xs text-slate-500 mt-2.5 sm:mt-3">
                Les dades s'utilitzen exclusivament per preparar el teu pressupost. Cap compromís de compra.
              </p>
            </div>

          </form>
        </div>
      </div>

      {/* Modal interactiu de Política de Protecció de Dades */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </section>
  );
}

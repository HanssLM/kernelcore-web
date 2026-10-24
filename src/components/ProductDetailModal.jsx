import React, { useState } from 'react';
import { 
  X, Copy, Check, ShieldCheck, 
  MapPin, Truck, Building2, UserCheck, 
  Plus, Minus, ArrowUpRight, Barcode, QrCode
} from 'lucide-react';
import { getProductImage, getWarehouseLocation, getOfficialSupplier, getAssignedTechLead } from '../data/productImages';

export default function ProductDetailModal({ item, isOpen, onClose, onUpdateStock, onAddToQuote }) {
  const [copiedSku, setCopiedSku] = useState(false);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'logistics', 'pricing'

  if (!isOpen || !item) return null;

  const imageUrl = getProductImage(item);
  const location = getWarehouseLocation(item);
  const supplier = getOfficialSupplier(item);
  const techLead = getAssignedTechLead(item);

  const priceCost = Number(item.price) || 0;
  const ivaAmount = priceCost * 0.21;
  const costWithIva = priceCost + ivaAmount;
  const pvpSuggested = priceCost * 1.35; // 35% marge comercial
  const lotValuation = (item.stock || 0) * priceCost;
  const isLow = (item.stock || 0) <= (item.min || 0);

  const tierColor = (item.tier || '').includes('Bàsic')
    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
    : (item.tier || '').includes('Mitjà')
      ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
      : 'bg-purple-500/15 text-purple-300 border-purple-500/30';

  const handleCopySku = () => {
    if (item.sku) {
      navigator.clipboard.writeText(item.sku);
      setCopiedSku(true);
      setTimeout(() => setCopiedSku(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Capçalera del Modal */}
        <div className="px-6 py-4.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-800/80 flex items-center gap-1.5">
              <span>{item.sku || `SKU-${item.id}`}</span>
              <button 
                onClick={handleCopySku} 
                className="hover:text-white transition-colors" 
                title="Copiar referència MPN"
              >
                {copiedSku ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </span>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-white font-bold border border-slate-700">
              {item.brand || 'KernelCore'}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-lg font-bold border ${tierColor}`}>
              {item.tier || 'Standard'}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/60 text-slate-400 border border-slate-700/60">
              {item.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Tancar fitxa d'article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cos amb Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Bloc Superior: Imatge HD + Dades Primàries */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Imatge de l'article amb estil corporatiu */}
            <div className="md:col-span-5 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative group">
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950/50 flex items-center justify-center p-3">
                <img 
                  src={imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Distintiu d'Estat d'Estoc sobre la imatge */}
              <div className="absolute top-3 left-3">
                {item.stock > 0 ? (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-emerald-500/90 text-slate-950 shadow-md backdrop-blur-sm">
                    {item.stock} uds. en estoc
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-cyan-500/90 text-slate-950 shadow-md backdrop-blur-sm">
                    Sota comanda 24h
                  </span>
                )}
              </div>

              {/* Codi de barres representatiu al peu de la imatge */}
              <div className="p-3 bg-slate-950/90 border-t border-slate-850 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <Barcode className="w-4 h-4 text-cyan-400" />
                  EAN-13: 84370{String(item.id).padStart(7, '0')}
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <QrCode className="w-3.5 h-3.5" />
                  DFactory BCN
                </span>
              </div>
            </div>

            {/* Dades clau del producte */}
            <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-white leading-tight mb-2">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Referència industrial certificada pel fabricant oficial per a entorns de missió crítica, xarxes empresarials d'alt rendiment i centres de dades corporatius a DFactory Barcelona.
                </p>
              </div>

              {/* Targeta d'Estoc Físic i Reposició */}
              <div className={`p-4 rounded-2xl border ${
                isLow ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-950/70 border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Estat de Magatzem:</span>
                    <span className="text-lg font-black font-mono text-white flex items-center gap-2">
                      {item.stock} <span className="text-sm font-normal text-slate-400">uds.</span>
                      {isLow && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                          Estoc sota mínims
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-medium">Ubicació DFactory:</span>
                    <span className="text-xs font-mono font-bold text-cyan-400 flex items-center justify-end gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {location}
                    </span>
                  </div>
                </div>

                {/* Botons d'ajust d'estoc en directe */}
                {onUpdateStock && (
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-400 font-medium">Ajustar inventari:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onUpdateStock(item.id, -1)}
                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-sm border border-slate-700"
                        title="Restar 1 unitat"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onUpdateStock(item.id, 1)}
                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-sm border border-slate-700"
                        title="Afegir 1 unitat"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onUpdateStock(item.id, 5)}
                        className="px-2.5 h-8 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs border border-cyan-500/40"
                        title="Afegir 5 unitats"
                      >
                        +5 uds.
                      </button>
                      <button
                        onClick={() => onUpdateStock(item.id, 10)}
                        className="px-2.5 h-8 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs border border-emerald-500/40"
                        title="Afegir 10 unitats"
                      >
                        +10 uds.
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Responsable tècnic oficial assignat */}
              <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-300">
                  <UserCheck className="w-4 h-4 text-cyan-400" />
                  <span>Especialista assignat: <strong className="text-white">{techLead.name}</strong></span>
                </span>
                <span className="text-slate-400 font-mono text-[11px]">{techLead.email}</span>
              </div>
            </div>
          </div>

          {/* Selector de Pestanyes de Detall */}
          <div className="border-b border-slate-800 flex gap-2">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 ${
                activeTab === 'specs'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Especificacions Tècniques
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 ${
                activeTab === 'pricing'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Economia & Màrgens
            </button>
            <button
              onClick={() => setActiveTab('logistics')}
              className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 ${
                activeTab === 'logistics'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Cadena de Subministrament
            </button>
          </div>

          {/* PESTANYA 1: ESPECIFICACIONS TÈCNIQUES */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-500 block text-[11px] font-medium mb-1">Codi Fabricant (MPN):</span>
                <span className="font-mono font-bold text-white text-sm">{item.sku}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-500 block text-[11px] font-medium mb-1">Normativa i Estàndard:</span>
                <span className="font-bold text-slate-200 text-sm">ISO/IEC 11801 · TIA-568-C</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-500 block text-[11px] font-medium mb-1">Garantia del Fabricant:</span>
                <span className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  2 anys de substitució anticipada
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-500 block text-[11px] font-medium mb-1">Format / Factor de Forma:</span>
                <span className="font-bold text-slate-200 text-sm">Estàndard Rack 19" / Modular</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-500 block text-[11px] font-medium mb-1">Certificació de Laboratori:</span>
                <span className="font-bold text-cyan-400 text-sm">Calibrat Fluke Networks</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-500 block text-[11px] font-medium mb-1">Compatibilitat KernelCore:</span>
                <span className="font-bold text-white text-sm">100% Homologat DFactory</span>
              </div>
            </div>
          )}

          {/* PESTANYA 2: ECONOMIA & MÀRGENS */}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400 block text-[11px] font-medium mb-1">Cost Majorista (Sense IVA):</span>
                  <span className="font-mono font-bold text-slate-200 text-base">{priceCost.toLocaleString('ca-ES')} €</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400 block text-[11px] font-medium mb-1">IVA (21%) / Total amb IVA:</span>
                  <span className="font-mono font-bold text-slate-300 text-base">{ivaAmount.toFixed(2)} € <span className="text-xs text-slate-500 font-normal">({costWithIva.toFixed(2)} €)</span></span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 bg-cyan-950/20">
                  <span className="text-cyan-300 block text-[11px] font-bold mb-1">PVP Recomanat (+35% Marge):</span>
                  <span className="font-mono font-black text-cyan-400 text-base">{pvpSuggested.toFixed(2)} €</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 bg-emerald-950/20">
                  <span className="text-emerald-300 block text-[11px] font-bold mb-1">Valor Lot Físic ({item.stock} uds.):</span>
                  <span className="font-mono font-black text-emerald-400 text-base">{lotValuation.toLocaleString('ca-ES')} €</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/50 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Rendibilitat bruta estimada per unitat instal·lada:</span>
                <span className="font-mono font-bold text-emerald-400">+{(pvpSuggested - priceCost).toFixed(2)} € / unitat (+35%)</span>
              </div>
            </div>
          )}

          {/* PESTANYA 3: CADENA DE SUBMINISTRAMENT */}
          {activeTab === 'logistics' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
                  <Building2 className="w-4 h-4" />
                  <span>Majorista Oficial Homologat</span>
                </div>
                <div className="text-white font-bold text-sm">{supplier.name}</div>
                <div className="text-slate-400">NIF / CIF: <span className="font-mono text-slate-200">{supplier.cif}</span></div>
                <div className="text-slate-400">Condicions de pagament: <span className="text-slate-200">{supplier.terms}</span></div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                  <Truck className="w-4 h-4" />
                  <span>Terminis i Logística de Lliurament</span>
                </div>
                <div className="text-white font-bold text-sm">Entrega Urgent 24-48h a DFactory</div>
                <div className="text-slate-400">Canal: Distribució oficial B2B autoritzada</div>
                <div className="text-slate-400">Traçabilitat: Número de sèrie i part de garantia vinculat</div>
              </div>
            </div>
          )}
        </div>

        {/* Peu del Modal amb Accions Ràpides */}
        <div className="px-6 py-4 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-mono">
            ID Inventari: #{item.id} &middot; DFactory Barcelona Zona Franca
          </div>

          <div className="flex items-center gap-2">
            {onAddToQuote && (
              <button
                onClick={() => {
                  onAddToQuote(item);
                  onClose();
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <span>Afegir a Pressupost IT</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
            >
              Tancar Fitxa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

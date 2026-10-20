import React, { useState, useMemo, useEffect } from 'react';
import {
  Server, Wifi, ShieldCheck, HardDrive, Check, Copy,
  Download, Send, X, FileText, Mail, Building2, ShoppingBag, Factory,
  Zap, Printer, Eye, UserCheck, ExternalLink, Paperclip,
  Search, Plus, Trash2, Layers, Package, CheckCircle2, Lock
} from 'lucide-react';
import { initialInventory } from '../data/dashboardMockData';
import { API_BASE } from '../config/api';

const SENDER_PROFILES = [
  {
    id: 'hans',
    label: 'Hans Lao Moncusi — Direcció Tècnica (Sistemes & Seguretat)',
    senderName: 'Hans Lao Moncusi',
    senderRole: 'Direcció Tècnica (Sistemes & Seguretat)',
  },
  {
    id: 'joel',
    label: 'Joel Pérez Armenteros — Direcció General (Infraestructura de Xarxes)',
    senderName: 'Joel Pérez Armenteros',
    senderRole: 'Direcció General (Infraestructura de Xarxes)',
  },
  {
    id: 'exec',
    label: 'Hans Lao & Joel Pérez — Direcció Executiva KernelCore',
    senderName: 'Hans Lao Moncusi & Joel Pérez Armenteros',
    senderRole: 'Direcció Executiva KernelCore',
  },
];

const buildTemplateContent = (templateId, recipientName, company) => {
  const targetName = recipientName?.trim() || 'equip directiu';
  const targetCompany = company?.trim() || 'la vostra organització';

  if (templateId === 'urgent_sla') {
    return {
      subject: `Proposta d'Intervenció Tècnica Prioritària i Cobertura SLA — ${targetCompany}`,
      message: `Benvolgut/da ${targetName},\n\nAdjuntem el pressupost tècnic d'intervenció prioritària per a ${targetCompany}, dissenyat per restablir i blindar l'operativa crítica amb resposta immediata sota acord de nivell de servei (SLA).\n\nEl document PDF adjunt inclou l'arquitectura de contingència, el dimensionament elèctric SAI amb +20% de marge de seguretat i el desglossament econòmic complet. Restem a disposició per activar el desplegament tan aviat com ens confirmeu l'acceptació.`,
    };
  }

  if (templateId === 'audit_rgpd') {
    return {
      subject: `Proposta d'Auditoria IT, Seguretat Perimetral i Compliment RGPD — ${targetCompany}`,
      message: `Benvolgut/da ${targetName},\n\nUs fem arribar la proposta tècnica d'enduriment d'infraestructura, protecció elèctrica i còpies de seguretat immutables per a ${targetCompany}, alineada amb les exigències del RGPD (UE) 2016/679 i l'Esquema Nacional de Seguretat.\n\nAl fitxer PDF oficial adjunt hi trobareu el detall dels equips certificats, l'autonomia del sistema SAI i les condicions d'implementació des de la nostra seu al DFactory Barcelona.`,
    };
  }

  return {
    subject: `Pressupost Tècnic Oficial d'Infraestructura IT — ${targetCompany} · KernelCore`,
    message: `Benvolgut/da ${targetName},\n\nDesprés d'analitzar els requeriments tècnics de ${targetCompany}, adjuntem en format PDF el pressupost oficial elaborat per l'equip d'enginyeria de KernelCore.\n\nLa proposta contempla el desplegament d'infraestructura de xarxa certificada, protecció elèctrica SAI amb +20% de marge de seguretat i pla de continuïtat de negoci. Quedem a la vostra disposició per resoldre qualsevol consulta o planificar l'auditoria in-situ.`,
  };
};

const Slider = ({ label, value, min, max, step = 1, onChange, suffix = '' }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs">
      <span className="text-slate-400">{label}</span>
      <span className="text-cyan-400 font-bold font-mono">{value}{suffix}</span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      step={step} 
      value={value} 
      onChange={e => onChange(Number(e.target.value))}
      className="w-full h-1.5 bg-slate-800 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500 cursor-pointer" 
    />
    <div className="flex justify-between text-[10px] text-slate-600 font-mono">
      <span>{min}{suffix}</span><span>{max}{suffix}</span>
    </div>
  </div>
);

const RadioGroup = ({ label, options, value, onChange }) => (
  <div className="space-y-1.5">
    {label && <p className="text-xs text-slate-400 font-medium">{label}</p>}
    {options.map(opt => (
      <button 
        key={opt.value} 
        type="button" 
        onClick={() => onChange(opt.value)}
        className={`w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl border text-left text-xs transition-all ${
          value === opt.value ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300 shadow-sm' : 'border-slate-900 bg-slate-950/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
        }`}
      >
        <div className={`mt-0.5 w-3.5 h-3.5 rounded-full border-2 shrink-0 flex items-center justify-center ${value === opt.value ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'}`}>
          {value === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
        </div>
        <div className="min-w-0 flex-1">
          <span className="font-semibold block truncate">{opt.label}</span>
          {opt.desc && <span className="text-[11px] text-slate-500 font-normal block leading-tight mt-0.5">{opt.desc}</span>}
        </div>
        {opt.price !== undefined && opt.price !== null && (
          <span className="ml-2 text-cyan-400 font-mono font-bold shrink-0 text-xs">
            +{opt.price}€{opt.priceSuffix || ''}
          </span>
        )}
      </button>
    ))}
  </div>
);

// QuotationHub és exclusiu per al Portal Tècnic (Dashboard)
// Rep opcionalment dades preomplertes d'una sol·licitud de client i el catàleg d'inventari
export default function QuotationHub({ prefillData = null, inventoryCatalog = null, onPressupostGenerat = null, onClose = null }) {
  const combinedContext = useMemo(() => {
    return [
      ...(Array.isArray(prefillData?.serveiLabels) ? prefillData.serveiLabels : []),
      ...(Array.isArray(prefillData?.serveis) ? prefillData.serveis : []),
      prefillData?.descripcio || '',
      prefillData?.entorn || ''
    ].join(' ').toLowerCase();
  }, [prefillData]);

  // ─── 1. DETECCIÓ INTEL·LIGENT DE CATEGORIES TÈCNIQUES REQUERIDES ──────────
  const detectedCategories = useMemo(() => {
    const isXarxa = combinedContext.includes('xarxa') || combinedContext.includes('cablatge') || combinedContext.includes('cablejat') || combinedContext.includes('rack') || combinedContext.includes('switch') || combinedContext.includes('fibra') || combinedContext.includes('rj45');
    const isServidors = combinedContext.includes('servidor') || combinedContext.includes('windows server') || combinedContext.includes('active directory') || combinedContext.includes('proxmox') || combinedContext.includes('linux') || combinedContext.includes('cluster') || combinedContext.includes('ad ds');
    const isSai = combinedContext.includes('sai') || combinedContext.includes('ups') || combinedContext.includes('alimentacio') || combinedContext.includes('watts') || combinedContext.includes('autonomia') || combinedContext.includes('ininterrompuda');
    const isWifi = combinedContext.includes('wifi') || combinedContext.includes('wi-fi') || combinedContext.includes('sense fils') || combinedContext.includes('ap') || combinedContext.includes('cobertura');
    const isSeguretat = combinedContext.includes('seguretat') || combinedContext.includes('firewall') || combinedContext.includes('tallafocs') || combinedContext.includes('vpn') || combinedContext.includes('ngfw') || combinedContext.includes('perimetral');
    const isBackup = combinedContext.includes('backup') || combinedContext.includes('copia') || combinedContext.includes('3-2-1') || combinedContext.includes('nas') || combinedContext.includes('synology') || combinedContext.includes('qnap') || combinedContext.includes('veeam');
    const isRetail = combinedContext.includes('retail') || combinedContext.includes('tpv') || combinedContext.includes('comerç') || combinedContext.includes('tenda') || combinedContext.includes('posiflex') || combinedContext.includes('cobrament');

    return {
      xarxa: isXarxa || (!isServidors && !isRetail), // per defecte si no hi ha res
      servidors: isServidors,
      sai: isSai,
      wifi: isWifi,
      seguretat: isSeguretat,
      backup: isBackup,
      retail: isRetail
    };
  }, [combinedContext]);

  // Pestanya activa de configuració tècnica
  const [activeCategoryTab, setActiveCategoryTab] = useState(() => {
    if (detectedCategories.servidors && !detectedCategories.xarxa) return 'servidors';
    if (detectedCategories.retail) return 'retail';
    return 'xarxa';
  });

  // ─── 2. TIPUS DE NEGOCI & PARÀMETRES BASE ──────────────────────────────────
  const [businessType, setBusinessType] = useState(() => {
    const ent = (prefillData?.entorn || '').toLowerCase();
    if (ent.includes('retail') || ent.includes('comerç') || ent.includes('restauracio')) return 'retail';
    if (ent.includes('industrial') || ent.includes('nau')) return 'industrial';
    return 'office';
  });

  const parsedWorkers = parseInt(prefillData?.treballadors, 10);
  const initialPoints = !Number.isNaN(parsedWorkers) && parsedWorkers > 0 ? Math.max(4, parsedWorkers * 2) : 12;

  // ─── 3. SUBMENÚS I OPCIONS D'ENGINYERIA PER CATEGORIES ────────────────────

  // A. Xarxa & Cablejat Estructurat (Joel Pérez - Cap de Xarxes)
  const [networkPoints, setNetworkPoints] = useState(initialPoints);
  const [rackType, setRackType] = useState(() => (initialPoints > 24 ? 'floor_42u' : initialPoints > 14 ? 'floor_24u' : 'wall_12u'));
  const [switchType, setSwitchType] = useState(() => (initialPoints > 24 ? 'cisco_cat_48' : 'ubnt_promax_24'));
  const [fiberUplink, setFiberUplink] = useState('none');
  const [includePatchPanels, setIncludePatchPanels] = useState(true);

  // B. Servidors & Sistemes Operatius (Hans Lao - Cap de Sistemes)
  const [serverModel, setServerModel] = useState(() => {
    if (combinedContext.includes('cluster') || combinedContext.includes('clúster') || combinedContext.includes('proxmox')) return 'proxmox_ha';
    if (combinedContext.includes('hpe') || combinedContext.includes('dl380') || initialPoints > 28) return 'hpe_dl380';
    if (combinedContext.includes('dell') || combinedContext.includes('r450') || initialPoints > 14) return 'dell_r450';
    if (detectedCategories.servidors) return 'dell_t150';
    return 'none';
  });
  const [serverRaid, setServerRaid] = useState('raid1_nvme');
  const [serverOS, setServerOS] = useState(() => {
    if (combinedContext.includes('linux') || combinedContext.includes('ubuntu') || combinedContext.includes('debian')) return 'ubuntu_ent';
    if (combinedContext.includes('proxmox')) return 'proxmox_sub';
    return 'win_std_2025';
  });
  const [includeActiveDirectory, setIncludeActiveDirectory] = useState(() => detectedCategories.servidors);

  // C. Wi-Fi 6 Professional
  const [wifiAPs, setWifiAPs] = useState(() => Math.max(1, Math.ceil(initialPoints / 12)));
  const [wifiModel, setWifiModel] = useState('ubnt_u6_pro');
  const [wifiCloudController, setWifiCloudController] = useState(true);
  const [wifiGuestPortal, setWifiGuestPortal] = useState(true);

  // D. Seguretat Perimetral NGFW
  const [firewallModel, setFirewallModel] = useState(() => {
    if (combinedContext.includes('fortinet') || combinedContext.includes('fortigate') || detectedCategories.seguretat) return 'fortigate_60f';
    if (combinedContext.includes('sonicwall')) return 'sonicwall_tz370';
    return 'mikrotik_hex';
  });
  const [includeUtmLicense, setIncludeUtmLicense] = useState(() => detectedCategories.seguretat);
  const [includeVpnTeletreball, setIncludeVpnTeletreball] = useState(() => detectedCategories.seguretat);

  // E. Protecció Elèctrica SAI & Càrrega Crítica
  const [upsOption, setUpsOption] = useState(() => {
    if (combinedContext.includes('5000va') || initialPoints > 36) return 'ups_online_5000';
    if (combinedContext.includes('3000va') || combinedContext.includes('online') || initialPoints > 18) return 'ups_online_3000';
    if (combinedContext.includes('1500va') || detectedCategories.sai) return 'ups_rack_1500';
    if (initialPoints <= 8 && !detectedCategories.servidors) return 'ups_line_1000';
    return 'ups_rack_1500';
  });
  const [includeSnmpCard, setIncludeSnmpCard] = useState(() => detectedCategories.sai);

  // F. Còpies de Seguretat 3-2-1 & Emmagatzematge
  const [backupOption, setBackupOption] = useState(() => {
    if (combinedContext.includes('3-2-1') || combinedContext.includes('gfs') || combinedContext.includes('cloud') || detectedCategories.backup) return 'gfs_321';
    if (combinedContext.includes('nas') || combinedContext.includes('local')) return 'nas_local_4b';
    return 'gfs_321';
  });
  const [backupSoftware, setBackupSoftware] = useState('synology_abb');

  // G. Comerç & Retail TPV
  const [posTerminals, setPosTerminals] = useState(() => (detectedCategories.retail ? 3 : 2));
  const [includeThermalPrinters, setIncludeThermalPrinters] = useState(true);
  const [includeBarcodeScanners, setIncludeBarcodeScanners] = useState(true);

  // H. Acord de Nivell de Servei (SLA) & Manteniment
  const [slaOption, setSlaOption] = useState(() => {
    if (combinedContext.includes('24/7') || combinedContext.includes('crític') || combinedContext.includes('urgent') || initialPoints > 24) {
      return 'support_247';
    }
    return 'support_8x5';
  });

  // ─── 4. BUSCADOR EN VIU ENLLAÇAT AMB LA BBDD D'ARTICLES (100 SKUs) ──────────
  const [dbCatalog, setDbCatalog] = useState(() => (Array.isArray(inventoryCatalog) && inventoryCatalog.length > 0 ? inventoryCatalog : initialInventory));
  const [articleSearchQuery, setArticleSearchQuery] = useState('');
  const [articleCategoryFilter, setArticleCategoryFilter] = useState('all');
  const [customArticles, setCustomArticles] = useState([]); // articles afegits directament des de la BBDD

  // Carregar estoc fresc de la base de dades si no s'ha passat com a prop
  useEffect(() => {
    if (inventoryCatalog && Array.isArray(inventoryCatalog) && inventoryCatalog.length > 0) {
      return;
    }
    let isSubscribed = true;
    fetch(`${API_BASE}/inventari`)
      .then(res => res.json())
      .then(data => {
        if (isSubscribed && Array.isArray(data) && data.length > 0) setDbCatalog(data);
      })
      .catch(() => {
        if (isSubscribed) setDbCatalog(initialInventory);
      });
    return () => { isSubscribed = false; };
  }, [inventoryCatalog]);

  const filteredDbArticles = useMemo(() => {
    return dbCatalog.filter(art => {
      if (articleCategoryFilter !== 'all' && art.category !== articleCategoryFilter) {
        return false;
      }
      if (!articleSearchQuery.trim()) return true;
      const q = articleSearchQuery.toLowerCase();
      const matchName = (art.name || '').toLowerCase().includes(q);
      const matchSku = (art.sku || '').toLowerCase().includes(q);
      const matchBrand = (art.brand || '').toLowerCase().includes(q);
      const matchCat = (art.category || '').toLowerCase().includes(q);
      return matchName || matchSku || matchBrand || matchCat;
    });
  }, [dbCatalog, articleSearchQuery, articleCategoryFilter]);

  const handleAddCustomArticle = (article) => {
    setCustomArticles(prev => {
      const existing = prev.find(item => item.id === article.id);
      if (existing) {
        return prev.map(item => item.id === article.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [
        ...prev,
        {
          id: article.id,
          sku: article.sku,
          name: article.name,
          brand: article.brand,
          category: article.category,
          price: article.price || 0,
          quantity: 1,
          tier: article.tier || 'Mitjà Empresarial'
        }
      ];
    });
  };

  const handleRemoveCustomArticle = (id) => {
    setCustomArticles(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateCustomArticleQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveCustomArticle(id);
      return;
    }
    setCustomArticles(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  // ─── 5. MOTOR ECONÒMIC DE CÀLCUL DEL PRESSUPOST ────────────────────────────
  const [clientName, setClientName] = useState(() => prefillData?.nom || prefillData?.persona_contacte || '');
  const [companyName, setCompanyName] = useState(() => prefillData?.empresa || prefillData?.nom_empresa || prefillData?.nom || '');
  const [clientEmail, setClientEmail] = useState(() => prefillData?.email || '');
  const [senderProfile, setSenderProfile] = useState('exec');
  const [activeTemplate, setActiveTemplate] = useState('standard');

  const initialTemplate = useMemo(
    () => buildTemplateContent('standard', prefillData?.nom || '', prefillData?.empresa || prefillData?.nom || ''),
    [prefillData]
  );
  const [emailSubject, setEmailSubject] = useState(initialTemplate.subject);
  const [customMessage, setCustomMessage] = useState(initialTemplate.message);

  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [previewingPdf, setPreviewingPdf] = useState(false);
  const [sentResult, setSentResult] = useState(null);

  const selectedSender = useMemo(
    () => SENDER_PROFILES.find(p => p.id === senderProfile) || SENDER_PROFILES[2],
    [senderProfile]
  );

  const handleApplyTemplate = (templateId) => {
    setActiveTemplate(templateId);
    const tpl = buildTemplateContent(templateId, clientName, companyName);
    setEmailSubject(tpl.subject);
    setCustomMessage(tpl.message);
  };

  const quote = useMemo(() => {
    let hw = 0;
    let sw = 0;
    let labor = 0;
    let monthly = 0;

    // 1. Xarxa & Cablejat
    hw += networkPoints * 45;
    labor += networkPoints * 35;

    if (rackType === 'wall_12u') { hw += 220; labor += 90; }
    else if (rackType === 'floor_24u') { hw += 580; labor += 180; }
    else if (rackType === 'floor_42u') { hw += 1150; labor += 300; }

    if (includePatchPanels) {
      const panelsCount = Math.max(1, Math.ceil(networkPoints / 24));
      hw += panelsCount * 85;
      labor += panelsCount * 30;
    }

    if (switchType === 'basic_unmanaged') { hw += 180; labor += 40; }
    else if (switchType === 'ubnt_promax_24') { hw += 540; labor += 110; }
    else if (switchType === 'cisco_cat_48') { hw += 920; labor += 180; }
    else if (switchType === 'core_10g') { hw += 850; labor += 160; }

    if (fiberUplink === 'fiber_10g_om4') { hw += 320; labor += 140; }

    // 2. Wi-Fi 6
    if (wifiAPs > 0) {
      const apUnitCost = wifiModel === 'tplink_eap653' ? 110 : wifiModel === 'hpe_aruba_ap22' ? 195 : 165;
      hw += wifiAPs * apUnitCost;
      labor += wifiAPs * 40;
      if (wifiCloudController) { hw += 180; labor += 60; }
      if (wifiGuestPortal) { labor += 120; }
    }

    // 3. Servidors & Sistemes
    if (serverModel === 'dell_t150') { hw += 890; labor += 280; }
    else if (serverModel === 'dell_r450') { hw += 1850; labor += 450; }
    else if (serverModel === 'hpe_dl380') { hw += 2950; labor += 600; }
    else if (serverModel === 'proxmox_ha') { hw += 3800; labor += 900; }

    if (serverModel !== 'none') {
      if (serverRaid === 'raid1_nvme') { hw += 240; }
      else if (serverRaid === 'raid5_enterprise') { hw += 780; labor += 60; }

      if (serverOS === 'win_std_2025') { sw += 780; monthly += 55; }
      else if (serverOS === 'win_dc_2025') { sw += 2400; monthly += 85; }
      else if (serverOS === 'ubuntu_ent') { sw += 0; monthly += 40; }
      else if (serverOS === 'proxmox_sub') { sw += 320; monthly += 45; }

      if (includeActiveDirectory) { labor += 350; }
    }

    // 4. Seguretat Perimetral NGFW
    if (firewallModel === 'mikrotik_hex') { hw += 160; labor += 80; }
    else if (firewallModel === 'fortigate_60f') { hw += 590; labor += 160; }
    else if (firewallModel === 'sonicwall_tz370') { hw += 680; labor += 180; }

    if (includeUtmLicense && firewallModel !== 'none') { sw += 340; }
    if (includeVpnTeletreball && firewallModel !== 'none') { labor += 250; }

    // 5. SAI & Càrrega Crítica
    if (upsOption === 'ups_line_1000') { hw += 195; labor += 40; }
    else if (upsOption === 'ups_rack_1500') { hw += 460; labor += 65; }
    else if (upsOption === 'ups_online_3000') { hw += 980; labor += 120; }
    else if (upsOption === 'ups_online_5000') { hw += 1850; labor += 180; }

    if (includeSnmpCard && upsOption !== 'none') { hw += 190; labor += 45; }

    // 6. Còpies de Seguretat & Emmagatzematge
    if (backupOption === 'nas_local_2b') { hw += 420; labor += 90; monthly += 15; }
    else if (backupOption === 'nas_local_4b') { hw += 980; labor += 140; monthly += 25; }
    else if (backupOption === 'gfs_321') { hw += 500; labor += 140; monthly += 35; }

    if (backupSoftware === 'veeam_std' && backupOption !== 'none') { sw += 380; }

    // 7. Comerç & Retail TPV
    if (businessType === 'retail' || detectedCategories.retail) {
      const posUnitHw = 540 + (includeThermalPrinters ? 145 : 0) + (includeBarcodeScanners ? 85 : 0) + 65;
      hw += posTerminals * posUnitHw;
      labor += posTerminals * 80;
    }

    // 8. Articles Personalitzats afegits des de la BBDD (100 SKUs)
    customArticles.forEach(item => {
      const itemHw = (item.price || 0) * (item.quantity || 1);
      hw += itemHw;
      labor += (item.quantity || 1) * 20; // 20€ de mà d'obra d'instal·lació i muntatge per referència
    });

    // 9. Contracte de Manteniment SLA
    if (slaOption === 'support_8x5') { monthly += 65; }
    else if (slaOption === 'support_247') { monthly += 140; }
    else if (slaOption === 'support_vip') { monthly += 240; }

    const subtotal = hw + sw + labor;
    const iva = subtotal * 0.21;
    const total = subtotal + iva;

    // Càlcul de càrrega SAI Dinàmic
    const activeWorkstations = Math.max(1, Math.ceil(networkPoints / 2));
    const workstationsWatts = activeWorkstations * 95 + ((businessType === 'retail' || detectedCategories.retail) ? posTerminals * 85 : 0);
    const networkWatts = (networkPoints <= 16 ? 65 : 130) + (wifiAPs * 15) + (switchType === 'cisco_cat_48' ? 90 : 0);
    const serverWatts = serverModel === 'proxmox_ha' ? 750 : serverModel === 'hpe_dl380' ? 480 : serverModel !== 'none' ? 320 : 0;
    const backupWatts = backupOption !== 'none' ? 55 : 0;

    const upsLoadWatts = workstationsWatts + networkWatts + serverWatts + backupWatts;
    const upsSafetyWatts = Math.ceil(upsLoadWatts * 1.2);
    const upsRequiredVA = Math.ceil(upsSafetyWatts / 0.7);

    let upsNominalVA = 0;
    let upsBatteryWh = 0;
    let upsLabel = 'Sense SAI';
    if (upsOption === 'ups_line_1000') {
      upsNominalVA = 1000;
      upsBatteryWh = 260;
      upsLabel = 'SAI Line-Interactive 1000VA (APC Back-UPS Pro)';
    } else if (upsOption === 'ups_rack_1500') {
      upsNominalVA = 1500;
      upsBatteryWh = 450;
      upsLabel = 'SAI Enrackable 1500VA (Salicru SLC Twin RT2 / APC Smart-UPS)';
    } else if (upsOption === 'ups_online_3000') {
      upsNominalVA = 3000;
      upsBatteryWh = 980;
      upsLabel = 'SAI Online 3000VA Doble Conversió 0ms (APC Smart-UPS On-Line SRT3000)';
    } else if (upsOption === 'ups_online_5000') {
      upsNominalVA = 5000;
      upsBatteryWh = 1920;
      upsLabel = 'SAI Online Industrial 5000VA Doble Conversió CPD (APC Smart-UPS RT 5000)';
    }

    const upsAutonomyMin = upsNominalVA > 0
      ? Math.max(5, Math.round(((upsBatteryWh * 0.85) / Math.max(upsLoadWatts, 60)) * 60))
      : 0;

    return {
      hw,
      sw,
      labor,
      subtotal,
      iva,
      total,
      monthly,
      upsLoadWatts,
      upsSafetyWatts,
      upsRequiredVA,
      upsNominalVA,
      upsLabel,
      upsAutonomyMin,
    };
  }, [
    networkPoints, rackType, switchType, fiberUplink, includePatchPanels,
    wifiAPs, wifiModel, wifiCloudController, wifiGuestPortal,
    serverModel, serverRaid, serverOS, includeActiveDirectory,
    firewallModel, includeUtmLicense, includeVpnTeletreball,
    upsOption, includeSnmpCard,
    backupOption, backupSoftware,
    businessType, detectedCategories.retail, posTerminals, includeThermalPrinters, includeBarcodeScanners,
    customArticles,
    slaOption
  ]);

  const contactPerson = clientName || prefillData?.nom || companyName || 'Departament IT';
  const effectiveCompany = companyName || clientName || 'Client Corporatiu';

  const buildEquipmentSummary = () => {
    const parts = [
      `${networkPoints} punts RJ45 Cat6A`,
      rackType === 'floor_42u' ? 'Armari CPD 42U' : rackType === 'floor_24u' ? 'Rack 24U' : rackType === 'wall_12u' ? 'Rack 12U' : null,
      switchType === 'cisco_cat_48' ? 'Switch Cisco 48P PoE+' : switchType === 'ubnt_promax_24' ? 'Switch Ubiquiti Pro Max PoE+' : 'Switch Gigabit',
      wifiAPs > 0 ? `${wifiAPs} APs Wi-Fi 6` : null,
      serverModel === 'dell_r450' ? 'Servidor Dell R450 Xeon' : serverModel === 'hpe_dl380' ? 'Servidor HPE DL380' : serverModel === 'proxmox_ha' ? 'Clúster HA Proxmox' : serverModel === 'dell_t150' ? 'Servidor Dell T150' : null,
      firewallModel !== 'none' ? (firewallModel === 'fortigate_60f' ? 'NGFW Fortinet 60F' : firewallModel === 'sonicwall_tz370' ? 'NGFW SonicWall' : 'Router Mikrotik') : null,
      upsOption !== 'none' ? quote.upsLabel.split('(')[0].trim() : null,
      backupOption === 'gfs_321' ? 'Backup GFS 3-2-1' : backupOption !== 'none' ? 'NAS Local' : null,
      (businessType === 'retail' || detectedCategories.retail) ? `${posTerminals} TPVs Posiflex` : null,
      customArticles.length > 0 ? `+${customArticles.length} equips BBDD KernelCore` : null
    ].filter(Boolean);
    return parts.join(' + ');
  };

  const buildDetailedItems = () => {
    const list = [
      {
        concepte: `Cablatge estructurat Cat6A (${networkPoints} punts RJ45)`,
        descripcio: 'Instal·lació, grimpament i certificació Fluke DSX-8000 TIA/EIA-568.2-D',
        quantitat: networkPoints,
        preu_unitari: 80,
        import: networkPoints * 80,
        total: networkPoints * 80,
      },
    ];

    if (rackType !== 'none') {
      const rackPrice = rackType === 'wall_12u' ? 310 : rackType === 'floor_24u' ? 760 : 1450;
      const rackDesc = rackType === 'wall_12u' ? 'Armari Rack Mural 12U amb PDU i organitzador' : rackType === 'floor_24u' ? 'Armari Rack de Terra 24U amb ventilació forçada' : 'Armari Rack CPD 42U 800x1000 amb PDU intel·ligent';
      list.push({
        concepte: `Armari Rack 19" (${rackType === 'wall_12u' ? '12U Mural' : rackType === 'floor_24u' ? '24U de Terra' : '42U CPD'})`,
        descripcio: rackDesc,
        quantitat: 1,
        preu_unitari: rackPrice,
        import: rackPrice,
        total: rackPrice,
      });
    }

    if (switchType !== 'none') {
      const swPrice = switchType === 'basic_unmanaged' ? 220 : switchType === 'ubnt_promax_24' ? 650 : switchType === 'cisco_cat_48' ? 1100 : 1010;
      const swName = switchType === 'cisco_cat_48' ? 'Switch Cisco Catalyst 1000 48 Ports Full PoE+' : switchType === 'ubnt_promax_24' ? 'Switch Ubiquiti UniFi Pro Max 24 PoE+ L2/L3' : switchType === 'core_10g' ? 'Switch Core 10G SFP+ Aggregation' : 'Switch Gestionable Gigabit 16 Ports';
      list.push({
        concepte: swName,
        descripcio: 'Segmentació VLAN corporativa, QoS per a telefonia VoIP i alimentació PoE+',
        quantitat: 1,
        preu_unitari: swPrice,
        import: swPrice,
        total: swPrice,
      });
    }

    if (wifiAPs > 0) {
      const apPrice = wifiModel === 'hpe_aruba_ap22' ? 235 : wifiModel === 'tplink_eap653' ? 150 : 205;
      list.push({
        concepte: `Punts d'Accés Wi-Fi 6 Corporatius (${wifiAPs} APs)`,
        descripcio: `Roaming sense talls 802.11k/v/r, WPA3 Enterprise i controlador centralitzat (${wifiModel})`,
        quantitat: wifiAPs,
        preu_unitari: apPrice,
        import: wifiAPs * apPrice,
        total: wifiAPs * apPrice,
      });
    }

    if (serverModel !== 'none') {
      const srvPrice = serverModel === 'dell_t150' ? 1170 : serverModel === 'dell_r450' ? 2300 : serverModel === 'hpe_dl380' ? 3550 : 4700;
      const srvName = serverModel === 'proxmox_ha' ? 'Clúster d\'Alta Disponibilitat Proxmox VE (2 Nodes HA)' : serverModel === 'hpe_dl380' ? 'Servidor HPE ProLiant DL380 Gen10 Plus 2U' : serverModel === 'dell_r450' ? 'Servidor Rack 1U Dell PowerEdge R450 Xeon' : 'Servidor Torre Dell PowerEdge T150';
      list.push({
        concepte: srvName,
        descripcio: `Arquitectura de sistemes, emmagatzematge ${serverRaid === 'raid1_nvme' ? 'RAID 1 NVMe' : 'RAID 5 SAS'} i serveis ${includeActiveDirectory ? 'Active Directory DS' : 'bàsics'}`,
        quantitat: 1,
        preu_unitari: srvPrice,
        import: srvPrice,
        total: srvPrice,
      });
    }

    if (firewallModel !== 'none') {
      const fwPrice = firewallModel === 'fortigate_60f' ? 750 : firewallModel === 'sonicwall_tz370' ? 860 : 240;
      list.push({
        concepte: `Tallafocs Perimetral NGFW (${firewallModel === 'fortigate_60f' ? 'Fortinet FortiGate 60F' : firewallModel === 'sonicwall_tz370' ? 'SonicWall TZ370' : 'Mikrotik RouterBOARD'})`,
        descripcio: `Seguretat perimetral, inspecció SSL/TLS, ${includeUtmLicense ? 'llicència UTM 1 any' : 'filtratge bàsic'} i ${includeVpnTeletreball ? 'túnels VPN per a teletreball' : 'connexió segura'}`,
        quantitat: 1,
        preu_unitari: fwPrice,
        import: fwPrice,
        total: fwPrice,
      });
    }

    if (upsOption !== 'none') {
      const upsPrice = upsOption === 'ups_line_1000' ? 235 : upsOption === 'ups_rack_1500' ? 525 : upsOption === 'ups_online_3000' ? 1100 : 2030;
      list.push({
        concepte: quote.upsLabel,
        descripcio: `Protecció elèctrica per a ${quote.upsLoadWatts}W nominals (${quote.upsRequiredVA}VA amb +20% de marge de seguretat normatiu) · ~${quote.upsAutonomyMin} minuts d'autonomia`,
        quantitat: 1,
        preu_unitari: upsPrice,
        import: upsPrice,
        total: upsPrice,
      });
    }

    if (backupOption !== 'none') {
      const bkpPrice = backupOption === 'gfs_321' ? 640 : backupOption === 'nas_local_4b' ? 1120 : 510;
      list.push({
        concepte: backupOption === 'gfs_321' ? 'Arquitectura de Backup GFS 3-2-1 Anti-Ransomware' : 'Cabina NAS Local en RAID per a Còpies',
        descripcio: 'Servidor NAS, snapshots automàtics, retenció immutable i recuperació davant desastres',
        quantitat: 1,
        preu_unitari: bkpPrice,
        import: bkpPrice,
        total: bkpPrice,
      });
    }

    if (businessType === 'retail' || detectedCategories.retail) {
      list.push({
        concepte: `Terminals Punt de Venda TPV Posiflex (${posTerminals} unitats)`,
        descripcio: 'Terminals tàctils industrials, impressora tèrmica Epson, calaix portamonedes elèctric i lector 2D Zebra',
        quantitat: posTerminals,
        preu_unitari: 895,
        import: posTerminals * 895,
        total: posTerminals * 895,
      });
    }

    // Afegir cadascun dels articles personalitzats de la base de dades
    customArticles.forEach(item => {
      const itemUnitTotal = (item.price || 0) + 20; // 20€ instal·lació
      list.push({
        concepte: `[BBDD] ${item.brand} ${item.name} (${item.sku})`,
        descripcio: `Referència oficial de magatzem DFactory · Categoria: ${item.category} (${item.tier})`,
        quantitat: item.quantity,
        preu_unitari: itemUnitTotal,
        import: itemUnitTotal * item.quantity,
        total: itemUnitTotal * item.quantity,
      });
    });

    return list;
  };

  const buildBackendPayload = () => {
    const equipSummary = buildEquipmentSummary();
    const envLabel = businessType === 'retail' ? 'Comerç Retail' : businessType === 'industrial' ? 'Nau Industrial' : 'Oficina PIME';
    const saiInfo = {
      loadWatts: quote.upsLoadWatts,
      safetyWatts: quote.upsSafetyWatts,
      requiredVA: quote.upsRequiredVA,
      nominalVA: quote.upsNominalVA,
      label: quote.upsLabel,
      autonomyMin: quote.upsAutonomyMin,
    };

    return {
      id: prefillData?.id,
      requestId: prefillData?.id,
      nom_empresa: effectiveCompany,
      companyName: effectiveCompany,
      persona_contacte: contactPerson,
      clientName: contactPerson,
      email: clientEmail,
      to: clientEmail,
      telefon: prefillData?.telefon || '',
      environment: prefillData?.entorn || envLabel,
      equipament: equipSummary,
      items: buildDetailedItems(),
      cost_maquinari: quote.hw,
      cost_software: quote.sw,
      cost_ma_obra: quote.labor,
      base_imposable: quote.subtotal,
      iva: quote.iva,
      import_total: quote.total,
      quota_mensual_suport: quote.monthly,
      quota_mensual: quote.monthly,
      subject: emailSubject,
      customMessage,
      senderName: selectedSender.senderName,
      senderRole: selectedSender.senderRole,
      saiInfo,
    };
  };

  const buildQuoteText = () => {
    const lines = [
      '╔══════════════════════════════════════════════════════════╗',
      '║             PRESSUPOST TÈCNIC — KERNELCORE               ║',
      '╚══════════════════════════════════════════════════════════╝',
      'Seu Oficial: DFactory Barcelona, Carrer 27 del BZ, 10-16 (Zona Franca), 08040 Barcelona',
      '',
      effectiveCompany ? `Empresa:  ${effectiveCompany}` : '',
      contactPerson ? `Contacte: ${contactPerson}` : '',
      clientEmail ? `Correu:   ${clientEmail}` : '',
      `Data:     ${new Date().toLocaleDateString('ca-ES')}`,
      `Abast:    ${buildEquipmentSummary()}`,
      '',
      customMessage ? '──────────────────────────────────────────────────────────' : '',
      customMessage ? 'NOTA TÈCNICA PER AL CLIENT' : '',
      customMessage ? '──────────────────────────────────────────────────────────' : '',
      customMessage || '',
      customMessage ? '' : '',
      '──────────────────────────────────────────────────────────',
      'DIMENSIONAMENT ELÈCTRIC SAI (+20% MARGE SEGURETAT)',
      '──────────────────────────────────────────────────────────',
      `  Consum actiu estimat:         ${quote.upsLoadWatts} W`,
      `  Potència amb +20% marge:      ${quote.upsSafetyWatts} W / ${quote.upsRequiredVA} VA`,
      `  Equip SAI seleccionat:        ${quote.upsLabel}`,
      `  Autonomia estimada:           ~${quote.upsAutonomyMin} minuts`,
      '',
      '──────────────────────────────────────────────────────────',
      'DESGLOSSAMENT DE COSTOS',
      '──────────────────────────────────────────────────────────',
      `  Maquinari & Materials:        ${quote.hw.toFixed(2)} €`,
      `  Programari & Llicències:      ${quote.sw.toFixed(2)} €`,
      `  Mà d'Obra & Instal·lació:     ${quote.labor.toFixed(2)} €`,
      '──────────────────────────────────────────────────────────',
      `  Subtotal (Base Imposable):    ${quote.subtotal.toFixed(2)} €`,
      `  IVA (21%):                    ${quote.iva.toFixed(2)} €`,
      `  TOTAL PRESSUPOST (IVA incl.): ${quote.total.toFixed(2)} €`,
      `  Quota manteniment mensual:    ${quote.monthly.toFixed(2)} €/mes`,
      '──────────────────────────────────────────────────────────',
      '',
      `Signat per ${selectedSender.senderRole}:`,
      selectedSender.senderName,
      "Vàlid per 30 dies naturals des de la data d'emissió.",
    ].filter(l => l !== undefined && l !== '');
    return lines.join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildQuoteText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([buildQuoteText()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pressupost-kernelcore-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = async () => {
    setDownloadingPdf(true);
    try {
      const response = await fetch(`${API_BASE}/pressupostos/pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildBackendPayload()),
      });

      if (!response.ok) throw new Error('Error generant PDF al servidor');

      const blob = await response.blob();
      const pdfBlob = new Blob([blob], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Pressupost_KernelCore_${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch {
      alert('Error en descarregar el PDF. Comprova que el backend estigui actiu.');
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handlePreviewPDF = async () => {
    setPreviewingPdf(true);
    try {
      const response = await fetch(`${API_BASE}/pressupostos/pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildBackendPayload()),
      });

      if (!response.ok) throw new Error('Error previsualitzant PDF');

      const blob = await response.blob();
      const pdfBlob = new Blob([blob], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfBlob);
      window.open(url, '_blank', 'noopener,noreferrer');
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch {
      alert('Error previsualitzant el PDF.');
    } finally {
      setPreviewingPdf(false);
    }
  };

  const handleSendEmail = async () => {
    if (!clientEmail) return;
    setSendingEmail(true);

    const payload = buildBackendPayload();

    try {
      const response = await fetch(`${API_BASE}/pressupostos/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(resData?.error || 'Error enviant el correu');
      }

      const emailLog = resData?.emailLog || resData?.data?.emailLog || {
        to: clientEmail,
        subject: emailSubject,
        fileName: resData?.fileName || `Pressupost_KernelCore_${Date.now()}.pdf`,
        mode: resData?.mode || (resData?.previewUrl ? 'ethereal' : 'smtp'),
      };
      const previewUrl = resData?.previewUrl || emailLog?.previewUrl || null;
      const createdQuote = resData?.quote || resData?.data || null;

      if (prefillData?.id) {
        const reqs = JSON.parse(localStorage.getItem('kernel_quote_requests') || '[]');
        const updated = reqs.map(r => r.id === prefillData.id ? {
          ...r,
          status: 'Pressupost enviat',
          emailEnviat: true,
          pressupostGenerat: {
            total: quote.total,
            monthly: quote.monthly,
            data: new Date().toISOString(),
            fileName: emailLog.fileName,
            previewUrl,
          }
        } : r);
        localStorage.setItem('kernel_quote_requests', JSON.stringify(updated));
      }

      setSentResult({
        emailLog,
        previewUrl,
        quote: createdQuote,
      });
      setSent(true);
    } catch {
      const fallbackFile = `Pressupost_KernelCore_${Date.now()}.pdf`;
      setSentResult({
        emailLog: {
          to: clientEmail,
          subject: emailSubject,
          fileName: fallbackFile,
          mode: 'local_fallback',
        },
        previewUrl: null,
        quote: null,
      });
      setSent(true);
    } finally {
      setSendingEmail(false);
    }
  };

  const handleFinishAndClose = () => {
    if (onPressupostGenerat) {
      onPressupostGenerat({
        ...quote,
        clientEmail,
        clientName: effectiveCompany,
        contactPerson,
        createdQuote: sentResult?.quote || null,
        emailLog: sentResult?.emailLog || null,
        previewUrl: sentResult?.previewUrl || null,
      });
    } else if (onClose) {
      onClose();
    }
  };

  // Categories de la BBDD per als botons de filtre ràpid
  const DB_CATEGORIES = [
    'all', 'Racks 19"', 'Cablejat', 'Xarxa & VLAN', 'Wi-Fi 6',
    'Seguretat NGFW', 'Protecció SAI', 'Servidors', 'Retail TPV', 'Eines SAT'
  ];

  return (
    <div className="relative space-y-6">
      
      {/* ─── CAPÇALERA SUPERIOR AMB DETALL DE LA SOL·LICITUD ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Configurador Tècnic d&apos;Enginyeria
            </span>
            {prefillData?.id && (
              <span className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800 text-[11px] font-mono font-bold">
                {prefillData.id}
              </span>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
            {effectiveCompany}
          </h3>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-3 flex-wrap">
            <span>Interlocutor: <strong className="text-slate-200">{contactPerson}</strong></span>
            {clientEmail && (
              <span className="flex items-center gap-1 font-mono text-cyan-300">
                <Mail className="w-3.5 h-3.5 text-cyan-400" /> {clientEmail}
              </span>
            )}
          </p>
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors self-start sm:self-auto border border-slate-800"
            title="Tancar Configurador"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* ─── BANNER DE DETECCIÓ INTEL·LIGENT DE CATEGORIES DE LA SOL·LICITUD ─── */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-[#0B132B] border border-cyan-500/40 p-4 sm:p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Layers className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs font-heading font-black text-white uppercase tracking-wider">
                Àmbits Tècnics Detectats a la Sol·licitud:
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              El motor d&apos;enginyeria ha analitzat els requisits i ha activat automàticament els següents mòduls d&apos;infraestructura:
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {detectedCategories.xarxa && (
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 flex items-center gap-1.5 shadow-sm">
                <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                Xarxa & Cablatge
              </span>
            )}
            {detectedCategories.servidors && (
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-purple-500/15 border border-purple-500/40 text-purple-300 flex items-center gap-1.5 shadow-sm">
                <Server className="w-3.5 h-3.5 text-purple-400" />
                Servidors & AD
              </span>
            )}
            {detectedCategories.sai && (
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-teal-500/15 border border-teal-500/40 text-teal-300 flex items-center gap-1.5 shadow-sm">
                <Zap className="w-3.5 h-3.5 text-teal-400" />
                Protecció SAI
              </span>
            )}
            {detectedCategories.wifi && (
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-blue-500/15 border border-blue-500/40 text-blue-300 flex items-center gap-1.5 shadow-sm">
                <Wifi className="w-3.5 h-3.5 text-blue-400" />
                Wi-Fi 6
              </span>
            )}
            {detectedCategories.seguretat && (
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-rose-500/15 border border-rose-500/40 text-rose-300 flex items-center gap-1.5 shadow-sm">
                <Lock className="w-3.5 h-3.5 text-rose-400" />
                Seguretat NGFW
              </span>
            )}
            {detectedCategories.backup && (
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5 shadow-sm">
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                Còpies 3-2-1
              </span>
            )}
            {detectedCategories.retail && (
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/15 border border-amber-500/40 text-amber-300 flex items-center gap-1.5 shadow-sm">
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                Retail & TPV
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ─── PESTANYES DE NAVEGACIÓ D'ENGINYERIA I CATÀLEG BBDD ─── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-800">
        {[
          { id: 'xarxa', label: '1. Xarxa & Cablejat', icon: Wifi, highlight: detectedCategories.xarxa },
          { id: 'servidors', label: '2. Servidors & Sistemes', icon: Server, highlight: detectedCategories.servidors },
          { id: 'wifi', label: '3. Wi-Fi 6', icon: Wifi, highlight: detectedCategories.wifi },
          { id: 'seguretat', label: '4. Seguretat NGFW', icon: ShieldCheck, highlight: detectedCategories.seguretat },
          { id: 'sai', label: '5. Protecció SAI', icon: Zap, highlight: detectedCategories.sai },
          { id: 'backup', label: '6. Còpies 3-2-1', icon: HardDrive, highlight: detectedCategories.backup },
          ...(detectedCategories.retail || businessType === 'retail' ? [{ id: 'retail', label: '7. Retail & TPV', icon: ShoppingBag, highlight: true }] : []),
          { id: 'catalog', label: `Catàleg BBDD (${customArticles.length > 0 ? `+${customArticles.length}` : '100 SKUs'})`, icon: Package, isCatalog: true }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeCategoryTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategoryTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? tab.isCatalog 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md font-black'
                    : 'bg-cyan-500 text-slate-950 shadow-md font-black'
                  : tab.isCatalog
                    ? 'bg-slate-900 border border-emerald-500/30 text-emerald-300 hover:border-emerald-500/60'
                    : tab.highlight
                      ? 'bg-slate-900/90 border border-cyan-500/40 text-cyan-300 hover:bg-slate-800'
                      : 'bg-slate-950 text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.highlight && !isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ══════════════════════════════════════════════════════════
            COLUMNA ESQUERRA: MENÚS I OPCIONS PER CATEGORIA O BBDD
        ══════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-2 space-y-6">

          {/* 1. SECCIÓ: XARXA & CABLEJAT ESTRUCTURAT */}
          {activeCategoryTab === 'xarxa' && (
            <div className="space-y-6">
              {/* Tipus de negoci */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <h4 className="text-xs font-heading font-bold text-slate-400 uppercase tracking-wider mb-3">Modalitat d&apos;Entorn Físic</h4>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { value: 'office', label: 'Oficina PIME', icon: Building2 },
                    { value: 'retail', label: 'Comerç Retail', icon: ShoppingBag },
                    { value: 'industrial', label: 'Nau Industrial', icon: Factory },
                  ].map(b => {
                    const IconComponent = b.icon;
                    return (
                      <button 
                        key={b.value} 
                        type="button" 
                        onClick={() => setBusinessType(b.value)}
                        className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                          businessType === b.value ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 shadow-sm' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{b.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Paràmetres de Cablejat i Armaris */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-heading font-black text-white flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-cyan-400"/>
                    Cablejat Estructurat Cat6A & Racks 19&quot;
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Fluke DSX-8000 Certificat</span>
                </div>

                <Slider 
                  label="Punts de xarxa Cat6A certificats (preses RJ45 dobles a llocs de treball)" 
                  value={networkPoints} 
                  min={2} 
                  max={96} 
                  onChange={setNetworkPoints} 
                  suffix=" punts" 
                />

                <RadioGroup 
                  label="Bastidor / Armari Rack 19 polzades:" 
                  value={rackType} 
                  onChange={setRackType} 
                  options={[
                    { value: 'none', label: 'Sense armari rack', desc: 'Preses directes a paret sense centralitzador', price: 0 },
                    { value: 'wall_12u', label: 'Rack Mural 12U (600x450)', desc: 'Recomanat per a oficines de 2 a 12 llocs (220€ HW + 90€ M.O.)', price: 310 },
                    { value: 'floor_24u', label: 'Rack de Terra 24U (600x800)', desc: 'Bastidor corporatiu amb ventilació forçada i PDU (580€ HW + 180€ M.O.)', price: 760 },
                    { value: 'floor_42u', label: 'Armari Rack de CPD 42U (800x1000)', desc: 'Armari d\'alta densitat amb organització vertical de cablejat (1.150€ HW + 300€ M.O.)', price: 1450 },
                  ]} 
                />

                <RadioGroup 
                  label="Electrònica de Commutació (Switching L2 / L3):" 
                  value={switchType} 
                  onChange={setSwitchType} 
                  options={[
                    { value: 'basic_unmanaged', label: 'Switch Gigabit No Gestionable', desc: 'Connexió bàsica plug & play sense segmentació VLAN (180€ HW + 40€ M.O.)', price: 220 },
                    { value: 'ubnt_promax_24', label: 'Switch Ubiquiti UniFi Pro Max 24 PoE+ (L2+/L3)', desc: '24 ports Gigabit PoE+ amb enllaços 10G SFP+ i VLANs gestionades (540€ HW + 110€ M.O.)', price: 650 },
                    { value: 'cisco_cat_48', label: 'Switch Cisco Catalyst 1000 48 Ports Full PoE+', desc: 'Alta densitat empresarial amb seguretat 802.1X i suport Cisco TAC (920€ HW + 180€ M.O.)', price: 1100 },
                    { value: 'core_10g', label: 'Switch Core 10G SFP+ Aggregation', desc: 'Commutador central de fibra òptica per a CPD i tràfic inter-VLAN (850€ HW + 160€ M.O.)', price: 1010 },
                  ]} 
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <input
                      id="cbPatchPanels"
                      type="checkbox"
                      checked={includePatchPanels}
                      onChange={e => setIncludePatchPanels(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor="cbPatchPanels" className="text-xs text-slate-300 cursor-pointer">
                      Incloure Patch Panels Cat6A 24P + Passafils (+115€/panell)
                    </label>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <input
                      id="cbFiber"
                      type="checkbox"
                      checked={fiberUplink === 'fiber_10g_om4'}
                      onChange={e => setFiberUplink(e.target.checked ? 'fiber_10g_om4' : 'none')}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
                    />
                    <label htmlFor="cbFiber" className="text-xs text-slate-300 cursor-pointer">
                      Enllaç Troncal Fibra 10G OM4 + Transceptors SFP+ (+460€)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. SECCIÓ: SERVIDORS & SISTEMES OPERATIUS */}
          {activeCategoryTab === 'servidors' && (
            <div className="space-y-6">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-heading font-black text-white flex items-center gap-2">
                    <Server className="w-4 h-4 text-purple-400"/>
                    Arquitectura de Servidors & Active Directory DS
                  </h4>
                  <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Hans Lao · Cap de Sistemes</span>
                </div>

                <RadioGroup 
                  label="Model de Servidor Físic / Plataforma:" 
                  value={serverModel} 
                  onChange={setServerModel} 
                  options={[
                    { value: 'none', label: 'Sense servidor dedicat', desc: 'Entorn basat exclusivament en llocs de treball i Cloud', price: 0 },
                    { value: 'dell_t150', label: 'Dell PowerEdge T150 Torre (Micro-PIME)', desc: 'Intel Xeon E-2324G, 16GB ECC RAM, 2x 1TB (890€ HW + 280€ M.O.)', price: 1170 },
                    { value: 'dell_r450', label: 'Dell PowerEdge R450 Rack 1U Empresarial', desc: 'Xeon Silver 4310 12C/24T, 64GB DDR4 ECC, iDRAC9 Enterprise (1.850€ HW + 450€ M.O.)', price: 2300 },
                    { value: 'hpe_dl380', label: 'HPE ProLiant DL380 Gen10 Plus Rack 2U (CPD)', desc: 'Doble Xeon Silver, 128GB RAM, controladora Smart Array, fonts redundants (2.950€ HW + 600€ M.O.)', price: 3550 },
                    { value: 'proxmox_ha', label: 'Clúster d\'Alta Disponibilitat Proxmox VE (2 Nodes Físics)', desc: '2x Servidors en rack amb replicació ZFS i tolerància a fallades 0 downtime (3.800€ HW + 900€ M.O.)', price: 4700 },
                  ]} 
                />

                {serverModel !== 'none' && (
                  <>
                    <RadioGroup 
                      label="Configuració de Discs & Tolerància a Fallades (RAID):" 
                      value={serverRaid} 
                      onChange={setServerRaid} 
                      options={[
                        { value: 'raid1_nvme', label: 'RAID 1 Mirroring (2x SSD NVMe 1TB Enterprise)', desc: 'Arrencada ràpida i protecció davant avaria d\'un disc (+240€ HW)', price: 240 },
                        { value: 'raid5_enterprise', label: 'RAID 5 / 10 Paritat (4x SSD Enterprise SAS 1.92TB)', desc: 'Capacitat massiva i màxima velocitat d\'I/O per a bases de dades (+780€ HW + 60€ M.O.)', price: 840 },
                      ]} 
                    />

                    <RadioGroup 
                      label="Sistema Operatiu & Llicenciament de Servidor:" 
                      value={serverOS} 
                      onChange={setServerOS} 
                      options={[
                        { value: 'win_std_2025', label: 'Microsoft Windows Server 2025 Standard (16 Cores) + 10 CALs', desc: 'Suport natiu Active Directory, DNS, DHCP i GPOs corporatives (+780€ Llic. · +55€/mes)', price: 780 },
                        { value: 'win_dc_2025', label: 'Microsoft Windows Server 2025 Datacenter Edition', desc: 'Màquines virtuals Hyper-V il·limitades per a grans organitzacions (+2.400€ Llic. · +85€/mes)', price: 2400 },
                        { value: 'ubuntu_ent', label: 'Ubuntu Server 24.04 LTS Enterprise + Samba AD', desc: 'Solució Open Source robusta sense cost de llicència (+0€ Llic. · +40€/mes)', price: 0 },
                        { value: 'proxmox_sub', label: 'Subscripció Empresarial Proxmox VE Enterprise', desc: 'Repositori certificat i suport oficial d\'enginyeria de virtualització (+320€ Llic. · +45€/mes)', price: 320 },
                      ]} 
                    />

                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <input
                        id="cbAD"
                        type="checkbox"
                        checked={includeActiveDirectory}
                        onChange={e => setIncludeActiveDirectory(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-purple-500 focus:ring-purple-500"
                      />
                      <label htmlFor="cbAD" className="text-xs text-slate-300 cursor-pointer">
                        Desplegament i Enduriment complet d&apos;Active Directory DS + Polítiques GPO corporatives (+350€ M.O.)
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* 3. SECCIÓ: WI-FI 6 PROFESSIONAL */}
          {activeCategoryTab === 'wifi' && (
            <div className="space-y-6">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-heading font-black text-white flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-blue-400"/>
                    Cobertura Wi-Fi 6 d&apos;Alta Densitat
                  </h4>
                  <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">Roaming 802.11k/v/r</span>
                </div>

                <Slider 
                  label="Nombre de Punts d'Accés Wi-Fi 6 (APs)" 
                  value={wifiAPs} 
                  min={0} 
                  max={12} 
                  onChange={setWifiAPs} 
                  suffix=" APs" 
                />

                <RadioGroup 
                  label="Model de Punt d'Accés Homologat:" 
                  value={wifiModel} 
                  onChange={setWifiModel} 
                  options={[
                    { value: 'tplink_eap653', label: 'TP-Link Omada EAP653 AX3000 Ultra-Slim', desc: 'Opció econòmica i fiable per a despatxos (110€ HW + 40€ M.O.)', price: 150 },
                    { value: 'ubnt_u6_pro', label: 'Ubiquiti UniFi U6 Pro Dual-Band AX5400', desc: 'Estàndard professional d\'alta densitat amb OFDMA i MU-MIMO (165€ HW + 40€ M.O.)', price: 205 },
                    { value: 'hpe_aruba_ap22', label: 'HPE Aruba Instant On AP22 Enterprise Wi-Fi 6', desc: 'Garantia d\'alta disponibilitat i seguretat WPA3 d\'Aruba (195€ HW + 40€ M.O.)', price: 235 },
                  ]} 
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <input
                      id="cbWifiCtrl"
                      type="checkbox"
                      checked={wifiCloudController}
                      onChange={e => setWifiCloudController(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500"
                    />
                    <label htmlFor="cbWifiCtrl" className="text-xs text-slate-300 cursor-pointer">
                      Controlador Cloud Centralitzat amb gestió remota (+240€)
                    </label>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <input
                      id="cbGuestPortal"
                      type="checkbox"
                      checked={wifiGuestPortal}
                      onChange={e => setWifiGuestPortal(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500"
                    />
                    <label htmlFor="cbGuestPortal" className="text-xs text-slate-300 cursor-pointer">
                      Portal Captiu de Convidats amb aïllament de xarxa (+120€)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. SECCIÓ: SEGURETAT PERIMETRAL NGFW */}
          {activeCategoryTab === 'seguretat' && (
            <div className="space-y-6">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-heading font-black text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-rose-400"/>
                    Tallafocs Perimetral NGFW & Accés Remot Segur
                  </h4>
                  <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">Compliment RGPD / ENS</span>
                </div>

                <RadioGroup 
                  label="Dispositiu de Seguretat Perimetral (Firewall):" 
                  value={firewallModel} 
                  onChange={setFirewallModel} 
                  options={[
                    { value: 'none', label: 'Sense tallafocs dedicat', desc: 'Ús del router bàsic del proveïdor d\'Internet', price: 0 },
                    { value: 'mikrotik_hex', label: 'Mikrotik RouterBOARD hEX S Gigabit', desc: 'Enrutador amb firewall d\'estat i filtratge bàsic (160€ HW + 80€ M.O.)', price: 240 },
                    { value: 'fortigate_60f', label: 'Fortinet FortiGate 60F Next-Generation Firewall', desc: 'Inspecció profunda de paquets, protecció contra malware i IPS (590€ HW + 160€ M.O.)', price: 750 },
                    { value: 'sonicwall_tz370', label: 'SonicWall TZ370 Enterprise Security Gateway', desc: 'Protecció contra ransomware i inspecció SSL amb antivirus perimetral (680€ HW + 180€ M.O.)', price: 860 },
                  ]} 
                />

                {firewallModel !== 'none' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <input
                        id="cbUtm"
                        type="checkbox"
                        checked={includeUtmLicense}
                        onChange={e => setIncludeUtmLicense(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-rose-500 focus:ring-rose-500"
                      />
                      <label htmlFor="cbUtm" className="text-xs text-slate-300 cursor-pointer">
                        Llicència UTM 1 Any (Antivirus, IPS/IDS i Filtratge Web) (+340€)
                      </label>
                    </div>

                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <input
                        id="cbVpn"
                        type="checkbox"
                        checked={includeVpnTeletreball}
                        onChange={e => setIncludeVpnTeletreball(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-rose-500 focus:ring-rose-500"
                      />
                      <label htmlFor="cbVpn" className="text-xs text-slate-300 cursor-pointer">
                        Desplegament de VPN SSL / IPsec per a Teletreball Segur (+250€)
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 5. SECCIÓ: PROTECCIÓ ELÈCTRICA SAI & CÀRREGA CRÍTICA */}
          {activeCategoryTab === 'sai' && (
            <div className="space-y-6">
              <div className="bg-slate-900/80 border border-teal-500/30 rounded-2xl p-5 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-heading font-black text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-teal-400"/>
                    Protecció Elèctrica SAI & Continuïtat Operativa
                  </h4>
                  <span className="text-[10px] font-mono text-teal-300 font-bold uppercase">Càlcul Certificat Actiu</span>
                </div>

                {/* Resum interactiu de la càrrega elèctrica calculada */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-950 border border-teal-500/30 font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Càrrega Activa</span>
                    <span className="text-base font-bold text-white">{quote.upsLoadWatts} W</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">+20% Seguretat</span>
                    <span className="text-base font-bold text-cyan-400">{quote.upsSafetyWatts} W</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Capacitat VA</span>
                    <span className="text-base font-bold text-teal-300">{quote.upsRequiredVA} VA</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Autonomia Est.</span>
                    <span className="text-base font-bold text-emerald-400">~{quote.upsAutonomyMin} min</span>
                  </div>
                </div>

                <RadioGroup 
                  label="Model de Sistema SAI Seleccionat:" 
                  value={upsOption} 
                  onChange={setUpsOption} 
                  options={[
                    { value: 'none', label: 'Sense SAI', desc: 'Risc de pèrdua de dades per apagades o sobretensions', price: 0 },
                    { value: 'ups_line_1000', label: 'SAI Line-Interactive 1000VA (APC Back-UPS Pro)', desc: 'Protecció bàsica per a llocs clau i xarxa (195€ HW + 40€ M.O.)', price: 235 },
                    { value: 'ups_rack_1500', label: 'SAI Enrackable 1500VA (Salicru SLC Twin RT2 / APC Smart-UPS)', desc: 'Estàndard corporatiu per a armaris rack i servidors PIME (460€ HW + 65€ M.O.)', price: 525 },
                    { value: 'ups_online_3000', label: 'SAI Online 3000VA Doble Conversió (0ms temps transferència)', desc: 'Protecció sinusoïdal pura per a servidors de producció (980€ HW + 120€ M.O.)', price: 1100 },
                    { value: 'ups_online_5000', label: 'SAI Online Industrial 5000VA per a CPD (APC Smart-UPS RT 5000)', desc: 'Màxima autonomia per a bastidors complets i càrregues crítiques (1.850€ HW + 180€ M.O.)', price: 2030 },
                  ]} 
                />

                {upsOption !== 'none' && (
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <input
                      id="cbSnmp"
                      type="checkbox"
                      checked={includeSnmpCard}
                      onChange={e => setIncludeSnmpCard(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-teal-500 focus:ring-teal-500"
                    />
                    <label htmlFor="cbSnmp" className="text-xs text-slate-300 cursor-pointer">
                      Targeta de Xarxa SNMP/Web per a apagada automàtica de servidors i alertes per correu (+235€)
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 6. SECCIÓ: CÒPIES DE SEGURETAT 3-2-1 */}
          {activeCategoryTab === 'backup' && (
            <div className="space-y-6">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-heading font-black text-white flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-emerald-400"/>
                    Estratègia de Còpies de Seguretat 3-2-1 Anti-Ransomware
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Retenció Immutable</span>
                </div>

                <RadioGroup 
                  label="Arquitectura de Còpies de Seguretat:" 
                  value={backupOption} 
                  onChange={setBackupOption} 
                  options={[
                    { value: 'none', label: 'Sense còpies de seguretat', desc: 'No recomanat sota cap circumstància', price: 0 },
                    { value: 'nas_local_2b', label: 'NAS Local 2 Badies RAID 1 (Synology DS224+ amb 2x 4TB)', desc: 'Còpia diària automatitzada a la xarxa local (420€ HW + 90€ M.O. · +15€/mes)', price: 510 },
                    { value: 'nas_local_4b', label: 'NAS Empresarial 4 Badies RAID 5 (Synology DS923+ amb 4x 8TB)', desc: 'Capacitat massiva amb snapshots Btrfs i tolerància a fallades (980€ HW + 140€ M.O. · +25€/mes)', price: 1120 },
                    { value: 'gfs_321', label: 'Estratègia GFS 3-2-1 Completa (Local + Cloud Xifrat)', desc: 'Còpia en NAS local més rèplica immutable al Cloud S3 deslocalitzat (500€ HW + 140€ M.O. · +35€/mes)', price: 640 },
                  ]} 
                />

                {backupOption !== 'none' && (
                  <RadioGroup 
                    label="Programari de Còpies de Seguretat & Deduplicació:" 
                    value={backupSoftware} 
                    onChange={setBackupSoftware} 
                    options={[
                      { value: 'synology_abb', label: 'Synology Active Backup for Business', desc: 'Solució integrada sense llicències recurrents per a PCs, servidors i VMs', price: 0 },
                      { value: 'veeam_std', label: 'Veeam Backup & Replication Enterprise', desc: 'L\'estàndard corporatiu per a entorns virtuals i restauració instantània (+380€ Llic.)', price: 380 },
                    ]} 
                  />
                )}
              </div>
            </div>
          )}

          {/* 7. SECCIÓ: COMERÇ & RETAIL TPV */}
          {activeCategoryTab === 'retail' && (
            <div className="space-y-6">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-heading font-black text-white flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-amber-400"/>
                    Equipament per a Comerç, Restauració & Retail
                  </h4>
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Punts de Venda TPV</span>
                </div>

                <Slider 
                  label="Nombre de Caixes / Terminals TPV de Cobrament" 
                  value={posTerminals} 
                  min={1} 
                  max={12} 
                  onChange={setPosTerminals} 
                  suffix=" TPVs" 
                />

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Pack de Caixes TPV Inclòs:</h5>
                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span>• Terminal Tàctil Posiflex XT-3815G Fanless Industrial</span>
                      <span className="font-mono text-cyan-400 font-bold">540 € / ud</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          id="cbRetailPrinter"
                          type="checkbox"
                          checked={includeThermalPrinters}
                          onChange={e => setIncludeThermalPrinters(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
                        />
                        <label htmlFor="cbRetailPrinter" className="cursor-pointer">
                          Impressora Tèrmica de Tiquets Epson TM-T20III Ethernet
                        </label>
                      </div>
                      <span className="font-mono text-cyan-400 font-bold">145 € / ud</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          id="cbRetailScanner"
                          type="checkbox"
                          checked={includeBarcodeScanners}
                          onChange={e => setIncludeBarcodeScanners(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
                        />
                        <label htmlFor="cbRetailScanner" className="cursor-pointer">
                          Lector de Codis de Barres 2D Zebra DS2208
                        </label>
                      </div>
                      <span className="font-mono text-cyan-400 font-bold">85 € / ud</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>• Calaix Portamonedes Metàl·lic Heavy Duty</span>
                      <span className="font-mono text-cyan-400 font-bold">65 € / ud</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-800 pt-2 font-bold text-white">
                      <span>Muntatge físic, cablejat de xarxa i posada en marxa per caixa</span>
                      <span className="font-mono text-cyan-300">80 € / ud</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 8. SECCIÓ: CATÀLEG DE LA BASE DE DADES (100 SKUs) */}
          {activeCategoryTab === 'catalog' && (
            <div className="space-y-6">
              <div className="bg-slate-900/80 border border-emerald-500/40 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="text-sm font-heading font-black text-white flex items-center gap-2">
                      <Package className="w-4 h-4 text-emerald-400"/>
                      Buscador d&apos;Articles del Catàleg Oficial (100 Referències BBDD)
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Cerca qualsevol peça del magatzem de DFactory Barcelona i afegeix-la directament al pressupost.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 self-start sm:self-auto">
                    {filteredDbArticles.length} articles disponibles
                  </span>
                </div>

                {/* Cercador i Filtres */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Cercar per model, SKU o fabricant (Cisco, Dell, Fortinet, APC...)"
                      value={articleSearchQuery}
                      onChange={e => setArticleSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Filtre ràpid per categoria */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {DB_CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setArticleCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        articleCategoryFilter === cat
                          ? 'bg-emerald-500/20 border border-emerald-500/60 text-emerald-300 font-bold'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {cat === 'all' ? 'Totes les Categories' : cat}
                    </button>
                  ))}
                </div>

                {/* Llistat d'articles filtrats de la BBDD */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                  {filteredDbArticles.slice(0, 40).map(art => {
                    const isAdded = customArticles.find(item => item.id === art.id);
                    return (
                      <div 
                        key={art.id}
                        className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                          isAdded 
                            ? 'bg-emerald-950/20 border-emerald-500/50 shadow-md' 
                            : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-[10px] font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60">
                              {art.sku}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400 font-mono">
                              Estoc: <strong className="text-white">{art.stock}</strong> uds
                            </span>
                          </div>

                          <h5 className="text-xs font-bold text-white leading-tight line-clamp-2">
                            {art.name}
                          </h5>
                          <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                            <span>{art.brand}</span>
                            <span>•</span>
                            <span className="text-slate-500">{art.category}</span>
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80">
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase font-mono">Preu KernelCore</span>
                            <span className="text-sm font-black font-mono text-emerald-400">
                              {(art.price || 0).toFixed(2)} €
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddCustomArticle(art)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              isAdded
                                ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-sm'
                                : 'bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 border border-emerald-500/40'
                            }`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{isAdded ? `Afegit (${isAdded.quantity})` : 'Afegir'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Llistat d'articles personalitzats afegits al pressupost */}
              {customArticles.length > 0 && (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-xs font-heading font-black text-white uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Articles del Catàleg Afegits al Pressupost ({customArticles.length})
                    </h4>
                    <button
                      type="button"
                      onClick={() => setCustomArticles([])}
                      className="text-[11px] text-rose-400 hover:underline font-bold"
                    >
                      Buidar selecció
                    </button>
                  </div>

                  <div className="space-y-2">
                    {customArticles.map(item => (
                      <div 
                        key={item.id} 
                        className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                      >
                        <div className="min-w-0 flex-1">
                          <span className="font-bold text-white block truncate">{item.name}</span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {item.sku} · {item.brand} · {(item.price || 0).toFixed(2)} €/ud (+20€ M.O.)
                          </span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
                            <button
                              type="button"
                              onClick={() => handleUpdateCustomArticleQty(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 font-bold"
                            >
                              -
                            </button>
                            <span className="w-6 text-center font-mono font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateCustomArticleQty(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 font-bold"
                            >
                              +
                            </button>
                          </div>

                          <span className="font-mono font-bold text-emerald-400 w-20 text-right">
                            {(((item.price || 0) + 20) * item.quantity).toFixed(2)} €
                          </span>

                          <button
                            type="button"
                            onClick={() => handleRemoveCustomArticle(item.id)}
                            className="p-1.5 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CONTRACTE DE MANTENIMENT SLA */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-sm font-heading font-black text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-cyan-400"/>
              Contracte de Manteniment Preventiu & Suport SLA
            </h4>
            <RadioGroup 
              label="" 
              value={slaOption} 
              onChange={setSlaOption} 
              options={[
                { value: 'none', label: 'Sense manteniment continuat', desc: 'Intervencions facturades sota demanda a tarifa estàndard', price: 0 },
                { value: 'support_8x5', label: 'SLA Laboral 8x5 (Temps de resposta ≤4h)', desc: 'Monitoratge bàsic, pegats de seguretat i assistència remota (+65€/mes)', price: 65, priceSuffix: '/mes' },
                { value: 'support_247', label: 'SLA 24/7 amb Guàrdia Permanent (Temps de resposta ≤1h)', desc: 'Monitoratge 24 hores des de DFactory Barcelona i resposta crítica immediata (+140€/mes)', price: 140, priceSuffix: '/mes' },
                { value: 'support_vip', label: 'SLA VIP Critical DFactory (Temps de resposta <30 min)', desc: 'Substitució de maquinari in-situ de magatzem amb vehicle d\'intervenció (+240€/mes)', price: 240, priceSuffix: '/mes' },
              ]} 
            />
          </div>

          {/* PERSONALITZACIÓ DE L'EMAIL I SIGNATURA CORPORATIVA */}
          <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-heading font-black text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                Personalització de l&apos;Enviament per Email + PDF Adjunt
              </h4>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold">
                Nodemailer + PDFKit
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Nom del Destinatari</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder="Ex: Carles Mendoza"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Empresa / Organització</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="Ex: Logística BCN S.L."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Correu Electrònic del Client</label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={e => setClientEmail(e.target.value)}
                  placeholder="client@empresa.cat"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Signant Oficial de la Proposta
                </label>
                <select
                  value={senderProfile}
                  onChange={e => setSenderProfile(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-semibold"
                >
                  {SENDER_PROFILES.map(profile => (
                    <option key={profile.id} value={profile.id}>
                      {profile.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1.5">Plantilles Ràpides de Missatge</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'standard', label: 'Estàndard Corporatiu' },
                  { id: 'urgent_sla', label: 'Intervenció Urgent SLA' },
                  { id: 'audit_rgpd', label: 'Auditoria & Seguretat RGPD' },
                ].map(tpl => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => handleApplyTemplate(tpl.id)}
                    className={`py-2 px-2.5 rounded-xl text-[11px] font-bold border transition-all ${
                      activeTemplate === tpl.id
                        ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Assumpte del Correu</label>
              <input
                type="text"
                value={emailSubject}
                onChange={e => setEmailSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                Missatge Personalitzat per al Client (s&apos;inclou a l&apos;email HTML i a la portada del PDF):
              </label>
              <textarea
                rows={4}
                value={customMessage}
                onChange={e => setCustomMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════
            COLUMNA DRETA: RESUM ECONÒMIC, SAI I ACCIONS PDF/EMAIL
        ══════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sticky top-24 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-heading font-black text-white">Resum Consolidat</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold">DFactory BCN</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Maquinari & Materials:</span>
                <span className="font-mono text-slate-200 font-bold">{quote.hw.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Programari & Llicències:</span>
                <span className="font-mono text-slate-200 font-bold">{quote.sw.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Mà d&apos;Obra & Enginyeria:</span>
                <span className="font-mono text-slate-200 font-bold">{quote.labor.toFixed(2)} €</span>
              </div>
              {customArticles.length > 0 && (
                <div className="flex justify-between text-emerald-400 text-[11px] pt-1">
                  <span>Articles BBDD ({customArticles.length}):</span>
                  <span className="font-mono font-bold">
                    +{customArticles.reduce((acc, it) => acc + (((it.price || 0) + 20) * it.quantity), 0).toFixed(2)} €
                  </span>
                </div>
              )}
              <div className="border-t border-slate-800 pt-2 flex justify-between text-slate-300 font-bold">
                <span>Base Imposable (Subtotal):</span>
                <span className="font-mono text-white">{quote.subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>IVA (21%):</span>
                <span className="font-mono">{quote.iva.toFixed(2)} €</span>
              </div>
            </div>

            <div className="bg-slate-950 rounded-2xl p-4 text-center border border-slate-800 shadow-inner">
              <p className="text-[10px] text-slate-400 uppercase font-mono font-bold mb-1">Import Total (IVA 21% Inclòs)</p>
              <p className="text-3xl font-heading font-black text-white tracking-tight">
                {quote.total.toFixed(2)} <span className="text-lg text-slate-400 font-normal">€</span>
              </p>
              {quote.monthly > 0 && (
                <p className="text-xs text-cyan-400 font-mono mt-1 font-bold">
                  + {quote.monthly.toFixed(2)} €/mes quota manteniment
                </p>
              )}
            </div>

            {/* Indicador tècnic de Dimensionament SAI */}
            <div className="bg-slate-950/90 border border-teal-500/30 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-heading font-bold text-teal-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-teal-400" />
                  Dimensionament SAI (+20%)
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-400">
                  ~{quote.upsAutonomyMin} min
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-slate-900/80 rounded-lg p-2 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Càrrega activa</span>
                  <span className="font-mono font-bold text-white">{quote.upsLoadWatts} W</span>
                </div>
                <div className="bg-slate-900/80 rounded-lg p-2 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Requerit (+20%)</span>
                  <span className="font-mono font-bold text-teal-300">{quote.upsRequiredVA} VA</span>
                </div>
              </div>
            </div>

            {/* Botons d'Acció Directa */}
            <div className="space-y-2 pt-1">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  disabled={downloadingPdf}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 text-xs font-heading font-bold border border-cyan-500/40 transition-all active:scale-95 shadow-sm"
                >
                  <Printer className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{downloadingPdf ? 'Generant...' : 'Descarregar PDF'}</span>
                </button>
                <button
                  type="button"
                  onClick={handlePreviewPDF}
                  disabled={previewingPdf}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-heading font-bold border border-cyan-500/30 transition-all active:scale-95 shadow-sm"
                >
                  <Eye className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{previewingPdf ? 'Obrint...' : 'Previsualitzar'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button 
                  type="button" 
                  onClick={handleCopy}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-300 text-xs font-medium border border-slate-800 transition-colors"
                >
                  {copied ? (
                    <><Check className="w-3.5 h-3.5 text-emerald-400"/><span className="text-emerald-400 font-bold">Copiat!</span></>
                  ) : (
                    <><Copy className="w-3.5 h-3.5 text-cyan-400"/><span>Copiar Text</span></>
                  )}
                </button>
                <button 
                  type="button" 
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-300 text-xs font-medium border border-slate-800 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400"/>
                  <span>Descarregar .TXT</span>
                </button>
              </div>

              {/* Botó d'enviar per email amb PDF adjunt */}
              <button
                type="button"
                onClick={handleSendEmail}
                disabled={!clientEmail || sendingEmail || sent}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition-all shadow-xl active:scale-95 ${
                  sent
                    ? 'bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 cursor-default'
                    : !clientEmail
                      ? 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/25'
                }`}
              >
                {sent ? (
                  <><Check className="w-4 h-4"/><span>Email + PDF Despatxat a {clientEmail}</span></>
                ) : sendingEmail ? (
                  <span className="animate-pulse">Generant PDF i enviant per SMTP...</span>
                ) : (
                  <><Send className="w-4 h-4"/><span>Enviar Email + PDF al Client</span></>
                )}
              </button>
            </div>

            {/* Panell de confirmació després de l'enviament */}
            {sentResult && (
              <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-4 space-y-3 mt-3 animate-fadeIn">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <p className="font-heading font-bold text-emerald-300">
                      Pressupost i PDF Oficial enviats correctament
                    </p>
                    <p className="text-slate-300">
                      Destinatari: <span className="font-mono text-white">{sentResult.emailLog?.to || clientEmail}</span>
                    </p>
                    <p className="text-slate-400 flex items-center gap-1.5">
                      <Paperclip className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="font-mono text-[11px] text-cyan-300 break-all">
                        {sentResult.emailLog?.fileName || 'Pressupost_KernelCore.pdf'}
                      </span>
                    </p>
                  </div>
                </div>

                {sentResult.previewUrl && (
                  <button
                    type="button"
                    onClick={() => window.open(sentResult.previewUrl, '_blank', 'noopener,noreferrer')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 text-xs font-heading font-bold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                    <span>Obrir Previsualització Webmail SMTP (Ethereal)</span>
                  </button>
                )}

                {(onPressupostGenerat || onClose) && (
                  <button
                    type="button"
                    onClick={handleFinishAndClose}
                    className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                  >
                    Tornar al llistat / Tancar
                  </button>
                )}
              </div>
            )}

            <p className="text-[10px] text-slate-500 text-center pt-1 font-mono">
              Seu Oficial KernelCore · DFactory Barcelona
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

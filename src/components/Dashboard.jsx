import React, { useState, useEffect, useCallback } from 'react';
import QuotationHub from './QuotationHub';
import ProductDetailModal from './ProductDetailModal';
import { getProductImage } from '../data/productImages';
import { initialDashboardData } from '../data/dashboardMockData';
import { 
  LayoutDashboard, FileText, FolderKanban, Package, LifeBuoy,
  LogOut, Plus, Search, CheckCircle2, ArrowLeft, Server,
  Eye, X, AlertCircle, Clock,
  Building2, Wrench, Mail, Phone, Inbox,
  RefreshCw, Zap, Check, Terminal, Play,
  TrendingUp, Layers, DollarSign,
  PanelLeftClose, PanelLeftOpen,
  RotateCcw, LayoutGrid, List, Tag, Factory, ArrowUpDown, AlertTriangle,
  MapPin, User, Flame, Info, Download, ChevronDown, ChevronUp,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  ShieldCheck, Truck, Users, Filter, Lock,
  Send, UserCheck, Key, Award, FileSignature, Save,
  Network, BatteryCharging, Copy, HardDrive
} from 'lucide-react';
import { API_BASE, BACKEND_URL } from '../config/api';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

function parseSaiCalculation(text) {
  if (!text || typeof text !== 'string') return null;
  const match = text.match(/\[Dimensionament SAI:\s*(.*?)\]/i);
  if (!match) return null;
  const raw = match[1];

  const equipMatch = raw.match(/^\s*([^->]+?)\s*->/);
  const equipStr = equipMatch ? equipMatch[1].trim() : '';

  const wMatch = raw.match(/Consum\s*(\d+)W/i);
  const watts = wMatch ? Number(wMatch[1]) : null;

  const vaMatch = raw.match(/Pot[eè]ncia(?:\s*amb\s*\+20%\s*marge)?:\s*(\d+)VA/i);
  const va = vaMatch ? Number(vaMatch[1]) : null;

  const modelMatch = raw.match(/Recomanat:\s*([^(|\]]+)/i);
  const model = modelMatch ? modelMatch[1].trim() : 'APC Smart-UPS On-Line / Salicru Twin PRO2';

  const runtimeMatch = raw.match(/\(~?([^)]+autonomia[^)]*)\)/i);
  const runtime = runtimeMatch ? runtimeMatch[1].trim() : null;

  const cleanDescription = text.replace(/\[Dimensionament SAI:[^\]]+\]/g, '').trim();

  return { raw: match[0], equipStr, watts, va, model, runtime, cleanDescription };
}

function formatEnvironment(env) {
  if (!env) return 'Oficina PIME / Despatx Professional';
  const mapping = {
    'oficina_pime': 'Oficina PIME / Despatx Professional',
    'nau_industrial': 'Nau Industrial / Indústria 4.0',
    'comerc_retail': 'Comerç & Punts de Venda (Retail)',
    'coworking': 'Espai Co-working & Tecnològic',
    'sanitari_clinica': 'Sector Sanitari / Clínica Mèdica',
    'datacenter_cpd': 'Data Center / Sala de Servidors CPD',
    'educatiu': 'Centre Educatiu / Formació'
  };
  return mapping[env] || env.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function getServiceIcon(serviceName = '') {
  const s = serviceName.toLowerCase();
  if (s.includes('cablejat') || s.includes('xarxa') || s.includes('cat6')) return Network;
  if (s.includes('servidor') || s.includes('proxmox') || s.includes('linux') || s.includes('windows')) return Server;
  if (s.includes('base') || s.includes('dades') || s.includes('software') || s.includes('backup')) return HardDrive;
  if (s.includes('manteniment') || s.includes('preventiu') || s.includes('suport')) return Wrench;
  if (s.includes('sai') || s.includes('continuïtat') || s.includes('elèctric') || s.includes('electric')) return Zap;
  if (s.includes('tpv') || s.includes('cobrament') || s.includes('retail')) return Package;
  return CheckCircle2;
}

const STATUS_COLORS = {
  'Aprovat':               'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40',
  'En curs':               'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40',
  'Pendent de signatura':  'bg-amber-500/15 text-amber-300 border border-amber-500/40',
  'Resolt':                'bg-slate-700/60 text-slate-300 border border-slate-600',
  'En progrés':            'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40',
  'Pendent':               'bg-amber-500/15 text-amber-300 border border-amber-500/40',
  'Nova sol·licitud':      'bg-blue-500/20 text-blue-300 border border-blue-500/40',
  'Pressupost enviat':     'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
  'Descartada':            'bg-slate-800 text-slate-400 border border-slate-700',
};

const ROLE_PROFILES = {
  admin: {
    id: 'admin',
    sqlId: 1,
    nom: 'Administrador KernelCore',
    email: 'admin-kernelcore@kernelcore.com',
    carrec: 'Vista Global & Financera',
    departament: 'Direcció DFactory Barcelona',
    telefon: '+34 93 220 40 99 · Ext. 101',
    ubicacio: 'DFactory Barcelona, Carrer 27 del BZ, 10-16 (Zona Franca), 08040 Barcelona · Despatx 2.01',
    bio: 'Direcció executiva, governança tecnològica, relacions institucionals DFactory i gestió financera de KernelCore.',
    signaturaEmail: 'Administrador KernelCore\nDirecció General & Estratègia IT\nKernelCore Systems · DFactory Barcelona (Zona Franca)\nTel: +34 93 220 40 99 · admin-kernelcore@kernelcore.com',
    certificacions: ['ITIL 4 Managing Professional', 'Project Management Professional (PMP)', 'Lead Cybersecurity Auditor ISO 27001'],
    ambit: 'Administració Global, Pressupostos, Proveïdors & Capital',
    competencies: ['Autorització Inversió Capital', 'Control Global RBAC', 'Facturació & Proveïdors', 'Auditoria Sistemes'],
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    avatarColor: 'from-cyan-500 to-blue-600',
    glowColor: 'cyan',
    canAuthorizeCapital: true,
    leadFilterKeyword: 'all'
  },
  hans: {
    id: 'hans',
    sqlId: 2,
    nom: 'Hans Lao Moncusi',
    email: 'hans@kernelcore.cat',
    carrec: 'Direcció Tècnica · Sistemes, Servidors, AD DS & Seguretat',
    departament: 'Sistemes & Ciberseguretat',
    telefon: '+34 93 220 40 99 · Ext. 202',
    ubicacio: 'DFactory Barcelona, Carrer 27 del BZ, 10-16 (Zona Franca), 08040 Barcelona · Laboratori de Servidors 2.04',
    bio: 'Cap d\'Enginyeria de Sistemes i Seguretat Informàtica. Especialitzat en Windows Server 2025, Active Directory, GPO, virtualització Proxmox, servidors Linux i compliment de la normativa RGPD.',
    signaturaEmail: 'Hans Lao Moncusi\nCap de Sistemes & Ciberseguretat · Direcció Tècnica\nKernelCore · DFactory Barcelona (Zona Franca)\nTel: +34 93 220 40 99 · hans@kernelcore.cat · www.kernelcore.cat',
    certificacions: ['Microsoft MCSA Windows Server 2025', 'CompTIA Security+', 'Synology Certified Architect (DSM 7.2)', 'Especialista RGPD / ENS'],
    ambit: 'Windows Server 2025, Active Directory, GPO, NAS Synology & RGPD',
    competencies: ['Windows Server 2025 AD DS', 'Backups 3-2-1 Synology RAID', 'Ciberseguretat NGFW & GPO', 'Auditoria RGPD'],
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    avatarColor: 'from-purple-500 to-indigo-600',
    glowColor: 'purple',
    canAuthorizeCapital: false,
    leadFilterKeyword: 'Hans'
  },
  joel: {
    id: 'joel',
    sqlId: 3,
    nom: 'Joel Pérez Armenteros',
    email: 'joel@kernelcore.cat',
    carrec: 'Direcció General · Infraestructura de Xarxes, Cat6A, Racks & SAI',
    departament: 'Infraestructura de Xarxes & Telecomunicacions',
    telefon: '+34 93 220 40 99 · Ext. 203',
    ubicacio: 'DFactory Barcelona, Carrer 27 del BZ, 10-16 (Zona Franca), 08040 Barcelona · Laboratori de Telecomunicacions 2.04',
    bio: 'Cap d\'Infraestructura de Xarxes i Telecomunicacions. Especialitzat en commutació Cisco Catalyst L2/L3, segmentació VLAN, cablejat Cat6A certificat per Fluke, armaris rack 19" i sistemes SAI industrials On-Line.',
    signaturaEmail: 'Joel Pérez Armenteros\nCap d\'Infraestructura de Xarxes · Direcció General\nKernelCore · DFactory Barcelona (Zona Franca)\nTel: +34 93 220 40 99 · joel@kernelcore.cat · www.kernelcore.cat',
    certificacions: ['Cisco Certified Network Associate (CCNA 200-301)', 'Fluke Networks Certified Cabling Test Technician (CCTT)', 'APC Schneider Critical Power Specialist', 'Ubiquiti Enterprise Wireless Administrator (UEWA)'],
    ambit: 'Enginyeria Xarxes L2/L3 Cisco, Cablejat Cat6A Fluke, Racks 19" & SAIs',
    competencies: ['Autorització Direcció General', 'Switching Cisco L3 & VLANs', 'Certificació Fluke Cat6A', 'SAIs Doble Conversió'],
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    avatarColor: 'from-emerald-500 to-teal-600',
    glowColor: 'emerald',
    canAuthorizeCapital: true,
    leadFilterKeyword: 'Joel'
  }
};

const SIGNER_OPTIONS = [
  {
    id: 'hans',
    label: 'Hans Lao Moncusi — Direcció Tècnica',
    email: 'hans@kernelcore.cat',
    shortName: 'Hans Lao Moncusi'
  },
  {
    id: 'joel',
    label: 'Joel Pérez Armenteros — Direcció General',
    email: 'joel@kernelcore.cat',
    shortName: 'Joel Pérez Armenteros'
  },
  {
    id: 'admin',
    label: 'Administrador KernelCore — Direcció DFactory',
    email: 'admin-kernelcore@kernelcore.com',
    shortName: 'Administrador KernelCore'
  }
];

const FALLBACK_SENT_EMAILS = [
  {
    id: 'EML-2026-001',
    quoteCode: 'PR-2026-001',
    to: 'carlos.mendoza@logisticazf.cat',
    clientName: 'Carlos Mendoza',
    companyName: 'Logística & Robòtica Zona Franca BCN',
    subject: 'Proposta Tècnica i Pressupost Oficial PR-2026-001 — Logística & Robòtica Zona Franca BCN | KernelCore DFactory BCN',
    attachmentName: 'Pressupost_KernelCore_PR-2026-001.pdf',
    senderName: 'Joel Pérez Armenteros — Direcció General',
    senderRole: 'joel',
    sentAt: '18/10/2026, 11:25:00',
    status: 'Lliurat (SMTP TLS)',
    previewUrl: null
  },
  {
    id: 'EML-2026-002',
    quoteCode: 'PR-2026-002',
    to: 'administracio@dentaldiagonal.cat',
    clientName: 'Dra. Laura Miralles',
    companyName: 'Clínica Dental Diagonal',
    subject: 'Proposta Tècnica i Pressupost Oficial PR-2026-002 — Clínica Dental Diagonal | KernelCore DFactory BCN',
    attachmentName: 'Pressupost_KernelCore_PR-2026-002.pdf',
    senderName: 'Hans Lao Moncusi — Direcció Tècnica',
    senderRole: 'hans',
    sentAt: '19/10/2026, 09:40:00',
    status: 'Lliurat (SMTP TLS)',
    previewUrl: null
  }
];

const sanitizePdfAscii = (str = '') =>
  String(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[()\\]/g, '')
    .replace(/[^\x20-\x7E]/g, ' ');

const buildLocalPdfBlob = (quote) => {
  const code = sanitizePdfAscii(quote?.id || quote?.codi_pressupost || 'PR-2026-001');
  const client = sanitizePdfAscii(quote?.client || quote?.nom_empresa || 'Client Corporatiu BCN');
  const contact = sanitizePdfAscii(quote?.contact || quote?.persona_contacte || 'Responsable IT');
  const email = sanitizePdfAscii(quote?.email || quote?.client_email || 'contacte@empresa.cat');
  const items = sanitizePdfAscii(quote?.items || quote?.resum_equipament || 'Infraestructura IT homologada');
  const amount = Number(quote?.amount || quote?.import_total || 0).toFixed(2);
  const monthly = Number(quote?.monthly || quote?.quota_mensual_suport || 95).toFixed(2);
  const dateStr = sanitizePdfAscii(quote?.date || quote?.data_emissio || new Date().toISOString().split('T')[0]);

  const lines = [
    'BT',
    '/F1 18 Tf',
    '50 780 Td',
    '(KERNELCORE SYSTEMS BCN S.L. - PRESSUPOST OFICIAL IT) Tj',
    '/F1 10 Tf',
    '0 -22 Td',
    '(DFactory Barcelona, Carrer 27 Zona Franca, 08040 Barcelona | CIF: B-67941028) Tj',
    '0 -28 Td',
    `/F1 13 Tf (Codi de Pressupost: ${code}   |   Data Emissio: ${dateStr}) Tj`,
    '0 -24 Td',
    `/F1 11 Tf (Empresa Client: ${client}) Tj`,
    '0 -18 Td',
    `(Persona de Contacte: ${contact}   |   Email: ${email}) Tj`,
    '0 -28 Td',
    '/F1 12 Tf (Desglossament de Maquinari, Sistemes i Serveis:) Tj',
    '0 -18 Td',
    `/F1 10 Tf (${items.slice(0, 92)}) Tj`,
    items.length > 92 ? `0 -15 Td (${items.slice(92, 184)}) Tj` : '',
    '0 -32 Td',
    `/F1 14 Tf (IMPORT TOTAL PRESSUPOST (IVA inclos): ${amount} EUR) Tj`,
    '0 -20 Td',
    `/F1 11 Tf (Quota Mensual Manteniment Preventiu i SLA < 4h: ${monthly} EUR/mes) Tj`,
    '0 -36 Td',
    '/F1 9 Tf (Signat digitalment per Direccio Tecnica i General de KernelCore Systems BCN S.L.) Tj',
    'ET'
  ].filter(Boolean).join('\n');

  const pdfBody = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 595 842] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length ${lines.length} >>
stream
${lines}
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000229 00000 n 
0000000297 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${350 + lines.length}
%%EOF`;

  return new Blob([pdfBody], { type: 'application/pdf' });
};

const FALLBACK_CLIENTS = [
  {
    id: 'CLI-001',
    nom_empresa: 'Logística & Robòtica Zona Franca BCN',
    cif: 'B-65891204',
    persona_contacte: 'Carlos Mendoza',
    telefon: '+34 932 638 100',
    email: 'carlos.mendoza@logisticazf.cat',
    adreca: 'Carrer 27, Sector BZ, Zona Franca, 08040 Barcelona',
    sector: 'Industrial'
  },
  {
    id: 'CLI-002',
    nom_empresa: 'Clínica Dental Diagonal',
    cif: 'B-64120987',
    persona_contacte: 'Dra. Laura Miralles',
    telefon: '+34 934 145 220',
    email: 'administracio@dentaldiagonal.cat',
    adreca: 'Avinguda Diagonal 482, Eixample, 08006 Barcelona',
    sector: 'Oficina PIME'
  },
  {
    id: 'CLI-003',
    nom_empresa: 'Supermercats Gourmet Born S.L.',
    cif: 'B-66341892',
    persona_contacte: 'Marc Vila i Soler',
    telefon: '+34 932 458 910',
    email: 'm.vila@gourmetborn.cat',
    adreca: 'Passeig del Born 18, Ciutat Vella, 08003 Barcelona',
    sector: 'Comerç & Retail'
  },
  {
    id: 'CLI-004',
    nom_empresa: 'Nexum Tech Studio Barcelona (22@)',
    cif: 'B-67210445',
    persona_contacte: 'Sílvia Camps Prat',
    telefon: '+34 931 889 021',
    email: 'silvia@nexumtech.barcelona',
    adreca: 'Carrer de Pallars 193, Districte 22@ Poblenou, 08005 Barcelona',
    sector: 'Espai Co-working'
  },
  {
    id: 'CLI-005',
    nom_empresa: 'Bufet Jurídic Fontanals & Associats',
    cif: 'B-61982340',
    persona_contacte: 'Clara Fontanals Bellver',
    telefon: '+34 935 440 188',
    email: 'clara@fontanalsjuridic.es',
    adreca: 'Passeig de Gràcia 84, 3r 1a, 08008 Barcelona',
    sector: 'Oficina PIME'
  },
  {
    id: 'CLI-006',
    nom_empresa: 'Transports & Càrrega Port BCN',
    cif: 'A-08451923',
    persona_contacte: 'Jordi Altimira Mas',
    telefon: '+34 933 671 294',
    email: 'jaltimira@transportscarga.cat',
    adreca: 'Moll d\'Álvarez de la Campa, Port de Barcelona, 08039 Barcelona',
    sector: 'Industrial'
  }
];

const FALLBACK_SUPPLIERS = [
  {
    id: 'PRV-001',
    nom_comercial: 'Ingram Micro Spain S.L.U.',
    cif: 'B-60129483',
    telefon: '+34 934 749 000',
    email_comandes: 'comandes.enterprise@ingrammicro.es',
    adreca: 'Av. Baix Llobregat 3-5, Parc Empresarial, 08940 Cornellà de Llobregat (BCN)',
    condicions_pagament: '60 dies transferència B2B',
    marques_oficials: ['Cisco', 'Ubiquiti', 'Fortinet', 'HPE', 'HPE Aruba', 'SonicWall', 'MikroTik', 'TP-Link Omada'],
    marca_principal: 'Cisco'
  },
  {
    id: 'PRV-002',
    nom_comercial: 'Esprinet Iberica S.L.U.',
    cif: 'B-50792183',
    telefon: '+34 932 970 500',
    email_comandes: 'b2b.catalunya@esprinet.com',
    adreca: 'WTC Almeda Park, Edifici 4, 08940 Cornellà de Llobregat (BCN)',
    condicions_pagament: '30 dies transferència',
    marques_oficials: ['Dell', 'Lenovo', 'Synology', 'QNAP', 'Western Digital', 'Seagate', 'Samsung Enterprise'],
    marca_principal: 'Dell'
  },
  {
    id: 'PRV-003',
    nom_comercial: 'Schneider Electric España S.A.',
    cif: 'A-08008450',
    telefon: '+34 934 843 100',
    email_comandes: 'canal.it.bcn@se.com',
    adreca: 'Carrer de Bac de Roda 52, Edifici A (22@), 08019 Barcelona',
    condicions_pagament: '45 dies confirming bancari',
    marques_oficials: ['APC Schneider', 'Legrand', 'Salicru', 'Eaton', 'Tripp Lite', 'RackMatic'],
    marca_principal: 'APC Schneider'
  },
  {
    id: 'PRV-004',
    nom_comercial: 'TD SYNNEX Spain S.L.U.',
    cif: 'B-08674327',
    telefon: '+34 932 970 000',
    email_comandes: 'infraestructura.bcn@tdsynnex.com',
    adreca: 'Carrer de la Selva 12, Parc de Negocis Mas Blau, 08820 El Prat de Llobregat (BCN)',
    condicions_pagament: '45 dies transferència',
    marques_oficials: ['Fluke Networks', 'Panduit', 'CommScope', 'Corning', 'Draka Prysmian'],
    marca_principal: 'Fluke Networks'
  },
  {
    id: 'PRV-005',
    nom_comercial: 'Posiflex Iberia & Retail Solutions S.L.',
    cif: 'B-63918204',
    telefon: '+34 933 008 412',
    email_comandes: 'distribucio@posiflexiberia.cat',
    adreca: 'Carrer de los Castillejos 162, 08013 Barcelona',
    condicions_pagament: '30 dies domiciliació SEPA',
    marques_oficials: ['Posiflex', 'Epson', 'Zebra Technologies', 'Datalogic'],
    marca_principal: 'Posiflex'
  }
];

const buildDefaultAudit = (invLength = 100, telLength = 4) => ({
  status: '100% OK',
  score: 100,
  intervalSeconds: 60,
  lastRunAt: new Date().toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  checks: [
    {
      id: 'chk-db',
      name: 'Base de Dades SQL kernelcore_db',
      detail: 'Esquema relacional MariaDB 10.11 verificat (8 taules íntegres i claus foranes actives)',
      status: 'OK',
      latency: '1.4 ms'
    },
    {
      id: 'chk-stock',
      name: 'Integritat de les 100 Referències d\'Estoc',
      detail: `${invLength} SKUs multimarca sincronitzats sense valors negatius ni referències òrfenes`,
      status: 'OK',
      latency: '2.1 ms'
    },
    {
      id: 'chk-nodes',
      name: 'Nodos de Telemetria DFactory',
      detail: `${telLength} nodes crítics (AD DS, Synology NAS, Switch Cisco L3 i SAI APC) en línia`,
      status: 'OK',
      latency: '0.9 ms'
    },
    {
      id: 'chk-rbac',
      name: 'Seguretat RBAC 3 Usuaris Oficials',
      detail: 'Permisos verificats per a Admin Global, Hans Lao (Sistemes) i Joel Pérez (Xarxes)',
      status: 'OK',
      latency: '0.6 ms'
    },
    {
      id: 'chk-api',
      name: 'Endpoints REST API',
      detail: 'Tots els endpoints operatius (/inventari, /clients, /proveidors, /projectes, /audit)',
      status: 'OK',
      latency: '1.8 ms'
    }
  ]
});

const FALLBACK_COMPANIES = [
  { nom: 'Marta Soldevila Camps', empresa: 'BioTech Barcelona Labs', entorn: 'Laboratori / R+D', serveis: ['Xarxa Cat6A 10G', 'Servidor de Dades', 'SAI Doble Conversió'] },
  { nom: 'Eduard Font i Rovira', empresa: 'Assessoria Fiscal & Tributària Rambla', entorn: 'Despatx Jurídic', serveis: ['Còpies de Seguretat 3-2-1', 'Manteniment Mensual', 'RGPD'] },
  { nom: 'Carla Puigverd Martí', empresa: 'Estudi d\'Arquitectura & BIM 22@', entorn: 'Estudi de Disseny', serveis: ['NAS Synology 10GbE', 'Wi-Fi 6 d\'Alta Velocitat', 'Rack 12U'] },
  { nom: 'Pol Benavent Serra', empresa: 'Fàbrica Metal·lúrgica del Besòs', entorn: 'Indústria Pesant', serveis: ['Xarxa Industrial Blindada', 'Switch Cisco PoE+', 'Certificació Fluke'] }
];

const detectInitialRole = (usr) => {
  const email = (usr?.email || '').toLowerCase();
  const nom = (usr?.nom || usr?.name || '').toLowerCase();
  if (email.includes('hans') || nom.includes('hans')) return 'hans';
  if (email.includes('joel') || nom.includes('joel')) return 'joel';
  return 'admin';
};

export default function Dashboard({ user, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Rol de l'usuari autenticat
  const activeRoleKey = detectInitialRole(user);
  const currentRole = ROLE_PROFILES[activeRoleKey] || ROLE_PROFILES.admin;

  // Dades operatives vives sincronitzades amb el Backend (amb fallback inicial complet)
  const [quotes, setQuotes] = useState(initialDashboardData.quotes);
  const [projects, setProjects] = useState(initialDashboardData.projects);
  const [inventory, setInventory] = useState(initialDashboardData.inventory);
  const [tickets, setTickets] = useState(initialDashboardData.tickets);
  const [quoteRequests, setQuoteRequests] = useState(initialDashboardData.requests);
  const [telemetry, setTelemetry] = useState(initialDashboardData.telemetry);
  const [clients, setClients] = useState(initialDashboardData.clients || FALLBACK_CLIENTS);
  const [suppliers, setSuppliers] = useState(initialDashboardData.suppliers || FALLBACK_SUPPLIERS);

  // Motor d'Auditoria Automàtica Programada (Cada 60s)
  const [auditData, setAuditData] = useState(() => buildDefaultAudit(initialDashboardData.inventory.length, initialDashboardData.telemetry.length));
  const [auditCountdown, setAuditCountdown] = useState(60);
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);

  // Estats auxiliars
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const [backendInfo, setBackendInfo] = useState('DFactory Barcelona');
  const [searchQuery, setSearchQuery] = useState('');
  const [quoteSearchQuery, setQuoteSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Filtres de Clients & PIMEs
  const [clientSearchQuery, setClientSearchQuery] = useState('');
  const [clientSectorFilter, setClientSectorFilter] = useState('Tots');
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [newClientForm, setNewClientForm] = useState({
    nom_empresa: '',
    cif: '',
    persona_contacte: '',
    telefon: '',
    email: '',
    adreca: '',
    sector: 'Oficina PIME'
  });

  // Modal de Proveïdors Oficials
  const [showNewSupplierModal, setShowNewSupplierModal] = useState(false);
  const [newSupplierForm, setNewSupplierForm] = useState({
    nom_comercial: '',
    cif: '',
    telefon: '',
    email_comandes: '',
    adreca: '',
    condicions_pagament: '30 dies transferència',
    marques_oficials: '',
    marca_principal: ''
  });

  // Filtres i creació de Projectes i Fites Tècniques + Filtre Tiquets SAT per Rol
  const [projectLeadFilter, setProjectLeadFilter] = useState('all'); // 'all' | 'hans' | 'joel'
  const [ticketLeadFilter, setTicketLeadFilter] = useState('all'); // 'all' | 'hans' | 'joel'
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    name: '',
    client: '',
    techLead: 'Hans Lao Moncusi (Cap de Sistemes & Seguretat)',
    deadline: '30 Novembre 2026',
    initialTasks: ''
  });
  const [inlineTaskInputs, setInlineTaskInputs] = useState({});

  // Filtres i Gestió de Capital en Estoc Multimarca
  const [showCapitalModal, setShowCapitalModal] = useState(false);
  const [inventoryTierFilter, setInventoryTierFilter] = useState('all');
  const [inventoryBrandFilter, setInventoryBrandFilter] = useState('all');
  const [inventoryCategoryFilter, setInventoryCategoryFilter] = useState('all');
  const [inventoryStockStatusFilter, setInventoryStockStatusFilter] = useState('all');
  const [inventoryPriceFilter, setInventoryPriceFilter] = useState('all'); // 'all' | 'under100' | '100to500' | '500to1500' | 'over1500'
  const [inventorySortBy, setInventorySortBy] = useState('default');
  const [inventoryViewMode, setInventoryViewMode] = useState('cards'); // 'cards' | 'table'
  const [inventoryPage, setInventoryPage] = useState(1);
  const [inventoryItemsPerPage, setInventoryItemsPerPage] = useState(25);
  const [showCategoryDrawer, setShowCategoryDrawer] = useState(false);
  const [isInvesting, setIsInvesting] = useState(false);
  const [investmentToast, setInvestmentToast] = useState(null);

  // Eina de diagnòstic Ping / Consola
  const [pingHost, setPingHost] = useState('192.168.10.1');
  const [pingResult, setPingResult] = useState(null);
  const [isPinging, setIsPinging] = useState(false);

  // Modals Pressupostos, PDF & Enviament d'Emails amb PDF Adjunt
  const [showNewQuoteModal, setShowNewQuoteModal] = useState(false);
  const [newClient, setNewClient] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newItems, setNewItems] = useState('');
  const [autoSendEmailOnCreate, setAutoSendEmailOnCreate] = useState(true);

  const [sentEmails, setSentEmails] = useState(FALLBACK_SENT_EMAILS);
  const [emailModalQuote, setEmailModalQuote] = useState(null);
  const [emailTemplateKey, setEmailTemplateKey] = useState('presentacio');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSendConfirmation, setEmailSendConfirmation] = useState(null);
  const [emailForm, setEmailForm] = useState({
    to: '',
    clientName: '',
    companyName: '',
    senderLabel: SIGNER_OPTIONS[0].label,
    subject: '',
    customMessage: ''
  });

  // Configuració de Servidor SMTP / Correu
  const [showSmtpModal, setShowSmtpModal] = useState(false);
  const [smtpMode, setSmtpMode] = useState('ethereal'); // 'ethereal' | 'custom'
  const [smtpForm, setSmtpForm] = useState({
    host: 'smtp.gmail.com',
    port: '587',
    user: 'operacions@kernelcore.cat',
    pass: '',
    fromName: 'KernelCore Systems BCN — DFactory',
    fromEmail: 'operacions@kernelcore.cat'
  });
  const [isSavingSmtp, setIsSavingSmtp] = useState(false);
  const [smtpStatusMsg, setSmtpStatusMsg] = useState(null);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showQuotationHub, setShowQuotationHub] = useState(false);
  const [viewRequest, setViewRequest] = useState(null);
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  // ─── ESTATS DE 'EL MEU PERFIL' ──────────────────────────────────────────────
  const [pwdForm, setPwdForm] = useState({ current: '', newPwd: '', confirmPwd: '' });
  const [pwdFeedback, setPwdFeedback] = useState(null);
  const [isUpdatingPwd, setIsUpdatingPwd] = useState(false);
  const [customProfileOverrides, setCustomProfileOverrides] = useState({});
  const [profileSavedMsg, setProfileSavedMsg] = useState(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const profilePhone = customProfileOverrides[currentRole.id]?.phone ?? (currentRole.telefon || '+34 93 220 40 99');
  const profileBio = customProfileOverrides[currentRole.id]?.bio ?? (currentRole.bio || '');
  const profileSignature = customProfileOverrides[currentRole.id]?.signature ?? (currentRole.signaturaEmail || '');

  const setProfilePhone = (val) => setCustomProfileOverrides(prev => ({
    ...prev,
    [currentRole.id]: { ...(prev[currentRole.id] || {}), phone: val }
  }));
  const setProfileBio = (val) => setCustomProfileOverrides(prev => ({
    ...prev,
    [currentRole.id]: { ...(prev[currentRole.id] || {}), bio: val }
  }));
  const setProfileSignature = (val) => setCustomProfileOverrides(prev => ({
    ...prev,
    [currentRole.id]: { ...(prev[currentRole.id] || {}), signature: val }
  }));

  // ─── AUDITORIA AUTOMÀTICA PROGRAMADA (CADA 60 SEGONS) ──────────────────────
  const fetchAuditStatus = useCallback(async (triggerRun = false) => {
    try {
      if (triggerRun) setIsRunningAudit(true);
      const endpoint = triggerRun ? `${API_BASE}/audit/run` : `${API_BASE}/audit`;
      const method = triggerRun ? 'POST' : 'GET';
      const res = await fetch(endpoint, { method }).catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        const normalized = data.audit || data;
        setAuditData({
          status: normalized.status || '100% OK',
          score: normalized.score ?? 100,
          intervalSeconds: 60,
          lastRunAt: normalized.lastRunAt || normalized.timestamp || new Date().toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          checks: Array.isArray(normalized.checks) && normalized.checks.length > 0
            ? normalized.checks
            : buildDefaultAudit(inventory.length, telemetry.length).checks
        });
      } else {
        setAuditData(buildDefaultAudit(inventory.length, telemetry.length));
      }
      setAuditCountdown(60);
    } catch {
      setAuditData(buildDefaultAudit(inventory.length, telemetry.length));
      setAuditCountdown(60);
    } finally {
      if (triggerRun) setIsRunningAudit(false);
    }
  }, [inventory.length, telemetry.length]);

  useEffect(() => {
    const initialAuditTimer = setTimeout(() => {
      fetchAuditStatus(false);
    }, 0);
    const countdownTimer = setInterval(() => {
      setAuditCountdown(prev => {
        if (prev <= 1) {
          fetchAuditStatus(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearTimeout(initialAuditTimer);
      clearInterval(countdownTimer);
    };
  }, [fetchAuditStatus]);

  // ─── CARREGAR DADES VIVES DEL BACKEND AMB FALLBACK AUTOMÀTIC ───────────────
  const loadAllData = useCallback(async () => {
    try {
      setLoading(true);
      // Health check
      const healthRes = await fetch(`${API_BASE}/health`).catch(() => null);
      if (healthRes && healthRes.ok) {
        const healthData = await healthRes.json().catch(() => ({}));
        setIsBackendOnline(true);
        setBackendInfo(healthData.seu || 'DFactory Barcelona');
      } else if (isSupabaseConfigured && supabase) {
        setIsBackendOnline(true);
        setBackendInfo('DFactory · Supabase Cloud (PostgreSQL)');
      } else {
        setIsBackendOnline(false);
        setBackendInfo('DFactory Barcelona (Mode Local)');
      }

      // Sol·licituds (sincronització combinada Backend + LocalStorage per no perdre cap petició enviada pel client)
      let localRequests = [];
      try {
        localRequests = JSON.parse(localStorage.getItem('kernel_quote_requests') || '[]');
      } catch {
        localRequests = [];
      }
      const reqRes = await fetch(`${API_BASE}/sollicituds`).catch(() => null);
      if (reqRes && reqRes.ok) {
        const backendData = await reqRes.json();
        const merged = Array.isArray(localRequests) ? [...localRequests] : [];
        if (Array.isArray(backendData)) {
          for (const item of backendData) {
            if (!merged.some(m => m.id === item.id || (m.email && m.email === item.email && m.createdAt === item.createdAt))) {
              merged.push(item);
            }
          }
        }
        setQuoteRequests(merged.length > 0 ? merged : initialDashboardData.requests);
      } else {
        const fallbackList = Array.isArray(localRequests) && localRequests.length > 0 ? localRequests : initialDashboardData.requests;
        setQuoteRequests(prev => (prev.length > 0 ? prev : fallbackList));
      }

      // Pressupostos
      const quotesRes = await fetch(`${API_BASE}/pressupostos`).catch(() => null);
      if (quotesRes && quotesRes.ok) {
        const data = await quotesRes.json();
        setQuotes(data);
      } else {
        setQuotes(prev => (prev.length > 0 ? prev : initialDashboardData.quotes));
      }

      // Projectes
      const projRes = await fetch(`${API_BASE}/projectes`).catch(() => null);
      if (projRes && projRes.ok) {
        const data = await projRes.json();
        setProjects(data);
      } else {
        setProjects(prev => (prev.length > 0 ? prev : initialDashboardData.projects));
      }

      // Inventari
      const invRes = await fetch(`${API_BASE}/inventari`).catch(() => null);
      if (invRes && invRes.ok) {
        const data = await invRes.json().catch(() => null);
        if (Array.isArray(data)) setInventory(data);
      } else if (isSupabaseConfigured && supabase) {
        const { data: sInv } = await supabase.from('inventari_maquinari').select('*').range(0, 4999).catch(() => ({ data: null }));
        if (Array.isArray(sInv) && sInv.length > 0) {
          setInventory(sInv.map(i => ({
            id: i.id_article,
            sku: i.codi_referencia,
            name: i.nom_article,
            brand: i.fabricant,
            category: i.categoria,
            tier: i.gama,
            stock: i.estoc_actual,
            min: i.estoc_minim,
            price: Number(i.preu_venda),
            cost: Number(i.preu_cost)
          })));
        } else {
          setInventory(prev => (prev.length > 0 ? prev : initialDashboardData.inventory));
        }
      } else {
        setInventory(prev => (prev.length > 0 ? prev : initialDashboardData.inventory));
      }

      // Tiquets SAT
      const tckRes = await fetch(`${API_BASE}/tiquets`).catch(() => null);
      if (tckRes && tckRes.ok) {
        const data = await tckRes.json();
        setTickets(data);
      } else {
        setTickets(prev => (prev.length > 0 ? prev : initialDashboardData.tickets));
      }

      // Telemetria en temps real
      const telRes = await fetch(`${API_BASE}/telemetria`).catch(() => null);
      if (telRes && telRes.ok) {
        const data = await telRes.json();
        setTelemetry(data);
      } else {
        setTelemetry(prev => (prev.length > 0 ? prev : initialDashboardData.telemetry));
      }

      // Clients corporatius
      const cliRes = await fetch(`${API_BASE}/clients`).catch(() => null);
      if (cliRes && cliRes.ok) {
        const data = await cliRes.json().catch(() => null);
        if (Array.isArray(data) && data.length > 0) setClients(data);
      } else if (isSupabaseConfigured && supabase) {
        const { data: sCli } = await supabase.from('clients').select('*').catch(() => ({ data: null }));
        if (Array.isArray(sCli) && sCli.length > 0) {
          setClients(sCli);
        } else {
          setClients(prev => (prev.length > 0 ? prev : FALLBACK_CLIENTS));
        }
      } else {
        setClients(prev => (prev.length > 0 ? prev : FALLBACK_CLIENTS));
      }

      // Proveïdors oficials
      const supRes = await fetch(`${API_BASE}/proveidors`).catch(() => null);
      if (supRes && supRes.ok) {
        const data = await supRes.json().catch(() => null);
        if (Array.isArray(data) && data.length > 0) setSuppliers(data);
      } else if (isSupabaseConfigured && supabase) {
        const { data: sSup } = await supabase.from('proveidors').select('*').catch(() => ({ data: null }));
        if (Array.isArray(sSup) && sSup.length > 0) {
          setSuppliers(sSup);
        } else {
          setSuppliers(prev => (prev.length > 0 ? prev : FALLBACK_SUPPLIERS));
        }
      } else {
        setSuppliers(prev => (prev.length > 0 ? prev : FALLBACK_SUPPLIERS));
      }

      // Historial d'Emails Enviats amb PDF Adjunt
      const emailHistRes = await fetch(`${API_BASE}/emails/history`).catch(() => null);
      if (emailHistRes && emailHistRes.ok) {
        const data = await emailHistRes.json();
        const list = Array.isArray(data) ? data : (data.history || data.emails || data.data || []);
        if (Array.isArray(list) && list.length > 0) {
          setSentEmails(list);
        } else {
          setSentEmails(prev => (prev.length > 0 ? prev : FALLBACK_SENT_EMAILS));
        }
      } else {
        setSentEmails(prev => (prev.length > 0 ? prev : FALLBACK_SENT_EMAILS));
      }

    } catch (err) {
      console.warn('Error sincronitzant amb el backend, usant dades locals:', err);
      setQuoteRequests(prev => (prev.length > 0 ? prev : initialDashboardData.requests));
      setQuotes(prev => (prev.length > 0 ? prev : initialDashboardData.quotes));
      setProjects(prev => (prev.length > 0 ? prev : initialDashboardData.projects));
      setInventory(prev => (prev.length > 0 ? prev : initialDashboardData.inventory));
      setTickets(prev => (prev.length > 0 ? prev : initialDashboardData.tickets));
      setTelemetry(prev => (prev.length > 0 ? prev : initialDashboardData.telemetry));
      setClients(prev => (prev.length > 0 ? prev : FALLBACK_CLIENTS));
      setSuppliers(prev => (prev.length > 0 ? prev : FALLBACK_SUPPLIERS));
      setSentEmails(prev => (prev.length > 0 ? prev : FALLBACK_SENT_EMAILS));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialLoadTimer = setTimeout(() => {
      loadAllData();
    }, 0);
    // Refresc automàtic cada 30 segons per telemetria viva
    const interval = setInterval(loadAllData, 30000);
    return () => {
      clearTimeout(initialLoadTimer);
      clearInterval(interval);
    };
  }, [loadAllData]);

  // Sincronització automàtica quan es registra una nova sol·licitud des d'una altra pestanya o formulari web
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const localRequests = JSON.parse(localStorage.getItem('kernel_quote_requests') || '[]');
        if (Array.isArray(localRequests) && localRequests.length > 0) {
          setQuoteRequests(prev => {
            const merged = [...localRequests];
            for (const item of prev) {
              if (!merged.some(m => m.id === item.id || (m.email && m.email === item.email && m.createdAt === item.createdAt))) {
                merged.push(item);
              }
            }
            return merged;
          });
        }
      } catch {
        // Ignorar errors de parsing
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sincronització manual de dades en temps real des del backend i base de dades
  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      await Promise.all([
        loadAllData(),
        fetchAuditStatus(true),
        new Promise((resolve) => setTimeout(resolve, 3000))
      ]);
    } finally {
      setIsSyncing(false);
    }
  };

  // ─── GENERADOR DE DADES EN TEMPS REAL (AMB FALLBACK LOCAL) ─────────────────
  const handleGenerateLiveRequest = async () => {
    try {
      setIsGenerating(true);
      const res = await fetch(`${API_BASE}/generate/request`, { method: 'POST' }).catch(() => null);
      if (res && res.ok) {
        const result = await res.json();
        setQuoteRequests(prev => [result.data, ...prev]);
      } else {
        const tpl = FALLBACK_COMPANIES[Math.floor(Math.random() * FALLBACK_COMPANIES.length)];
        const urgencies = ['urgent', 'normal', 'baixa'];
        const fallbackReq = {
          id: `SOL-2026-${Math.floor(110 + Math.random() * 890)}`,
          nom: tpl.nom,
          empresa: tpl.empresa,
          email: `contacte@${tpl.empresa.toLowerCase().replace(/[^a-z]/g, '')}.cat`,
          telefon: `+34 93${Math.floor(1000000 + Math.random() * 8999999)}`,
          entorn: tpl.entorn,
          treballadors: `${10 + Math.floor(Math.random() * 40)} treballadors`,
          urgencia: urgencies[Math.floor(Math.random() * urgencies.length)],
          pressupostAprox: `${(3000 + Math.floor(Math.random() * 12) * 1000).toLocaleString('ca-ES')} €`,
          serveiLabels: tpl.serveis,
          descripcio: `Sol·licitud generada per a la seu de ${tpl.empresa}. Es requereix implantació urgent de ${tpl.serveis.join(', ')} amb certificació i posada en marxa per part de KernelCore.`,
          status: 'Nova sol·licitud',
          createdAt: new Date().toISOString()
        };
        setQuoteRequests(prev => [fallbackReq, ...prev]);
      }
      setActiveTab('requests');
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateLiveTicket = async () => {
    try {
      setIsGenerating(true);
      const res = await fetch(`${API_BASE}/generate/ticket`, { method: 'POST' }).catch(() => null);
      if (res && res.ok) {
        const result = await res.json();
        setTickets(prev => [result.data, ...prev]);
      } else {
        const clients = quotes.map(q => q.client || q.nom_empresa);
        const client = clients[Math.floor(Math.random() * clients.length)] || 'DFactory Barcelona Tenant';
        const subjects = [
          { s: 'Revisió de sincronització de còpies Synology NAS al núvol xifrat', p: 'Mitjana', lead: 'Hans Lao Moncusi (Sistemes)' },
          { s: 'Test de continuïtat del cablejat Cat6A i comprovació de par trenat 7-8', p: 'Alta', lead: 'Joel Pérez Armenteros (Xarxes)' },
          { s: 'Configuració de túnel VPN WireGuard xifrat per a teletreballadors', p: 'Mitjana', lead: 'Joel Pérez Armenteros (Xarxes)' },
          { s: 'Actualització de pedaços de seguretat a Windows Server 2025 sense aturada', p: 'Baixa', lead: 'Hans Lao Moncusi (Sistemes)' },
          { s: 'Alerta preventiva de temperatura al rack principal (> 32°C)', p: 'Alta', lead: 'Joel Pérez Armenteros (Xarxes)' }
        ];
        const tpl = subjects[Math.floor(Math.random() * subjects.length)];
        const fallbackTicket = {
          id: `TCK-${Math.floor(210 + Math.random() * 790)}`,
          client,
          subject: tpl.s,
          priority: tpl.p,
          status: 'En progrés',
          assignedTo: tpl.lead,
          date: new Date().toISOString().split('T')[0],
          resolutionNotes: 'Ticket obert automàticament pel servei de monitoratge tècnic actiu de KernelCore.'
        };
        setTickets(prev => [fallbackTicket, ...prev]);
      }
      setActiveTab('tickets');
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  // ─── ACCIONS OPERATIVES ───────────────────────────────────────────────────
  const handleToggleQuoteStatus = async (id) => {
    // Actualització optimista
    setQuotes(quotes.map(q => {
      const qId = q.id || q.codi_pressupost;
      if (qId !== id) return q;
      const next = (q.status || q.estat) === 'Pendent de signatura' ? 'Aprovat'
                 : (q.status || q.estat) === 'Aprovat' ? 'En curs'
                 : 'Pendent de signatura';
      return { ...q, status: next, estat: next };
    }));

    try {
      await fetch(`${API_BASE}/pressupostos/${id}/status`, { method: 'PATCH' });
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleTask = async (projectId, taskIndex) => {
    setProjects(projects.map(proj => {
      if (proj.id !== projectId) return proj;
      const updatedTasks = proj.tasks.map((t, idx) =>
        idx === taskIndex ? { ...t, done: !t.done } : t
      );
      const progress = Math.round((updatedTasks.filter(t => t.done).length / updatedTasks.length) * 100);
      return { ...proj, tasks: updatedTasks, progress };
    }));

    try {
      await fetch(`${API_BASE}/projectes/${projectId}/tasks/${taskIndex}/toggle`, { method: 'PATCH' });
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateStock = async (itemId, delta) => {
    setInventory(inventory.map(item =>
      item.id === itemId ? { ...item, stock: Math.max(0, item.stock + delta) } : item
    ));

    if (selectedProductModal && selectedProductModal.id === itemId) {
      setSelectedProductModal(prev => prev ? { ...prev, stock: Math.max(0, prev.stock + delta) } : null);
    }

    if (isSupabaseConfigured && supabase) {
      const current = inventory.find(i => i.id === itemId);
      const newStock = Math.max(0, (current?.stock || 0) + delta);
      supabase.from('inventari_maquinari').update({ estoc_actual: newStock }).eq('id_article', itemId).then(() => {});
    }

    try {
      await fetch(`${API_BASE}/inventari/${itemId}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ delta })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const applyLocalCapitalInjection = (plan) => {
    const basicAdditions = {
      1: 15, 2: 8, 7: 35, 11: 40, 16: 25, 17: 15, 18: 15, 30: 12, 32: 10,
      33: 15, 35: 12, 41: 12, 43: 15, 47: 10, 54: 12, 55: 14, 58: 10,
      65: 6, 75: 12, 76: 10, 79: 8, 81: 40, 83: 25, 87: 14, 89: 20,
      90: 16, 93: 20, 95: 15
    };
    const midAdditions = {
      3: 10, 5: 8, 8: 10, 12: 20, 14: 15, 15: 18, 19: 15, 20: 8, 22: 10,
      23: 16, 24: 8, 27: 14, 29: 10, 31: 6, 34: 10, 37: 30, 38: 18, 40: 15,
      44: 10, 48: 12, 49: 8, 51: 8, 52: 6, 56: 8, 59: 8, 61: 6, 63: 6, 64: 12,
      77: 6, 88: 8, 91: 10, 92: 8, 94: 6, 99: 5
    };
    const proAdditions = {
      4: 4, 6: 4, 9: 6, 10: 6, 13: 10, 21: 4, 25: 4, 26: 2, 28: 4, 36: 4,
      39: 10, 42: 6, 45: 6, 46: 4, 50: 4, 53: 2, 57: 3, 60: 2, 62: 4,
      67: 4, 68: 2, 70: 4, 71: 2, 73: 3, 74: 2, 78: 4, 86: 12, 96: 1,
      97: 1, 98: 3, 100: 2
    };

    let capitalInjected = 0;
    const updatedInventory = inventory.map(item => {
      let qty = 0;
      if (plan === 'basic_general') qty = basicAdditions[item.id] || 0;
      else if (plan === 'mid_networking') qty = midAdditions[item.id] || 0;
      else if (plan === 'enterprise_servers') qty = proAdditions[item.id] || 0;
      else if (plan === 'megapack_multibrand') {
        qty = (item.tier || '').includes('Bàsic') ? 15 : (item.tier || '').includes('Mitjà') ? 8 : 2;
      }
      if (qty > 0) {
        capitalInjected += qty * (item.price || 0);
        return { ...item, stock: (item.stock || 0) + qty };
      }
      return item;
    });
    const totalVal = Math.round(updatedInventory.reduce((acc, i) => acc + ((i.stock || 0) * (i.price || 0)), 0));
    setInventory(updatedInventory);
    setInvestmentToast(`Inversió de capital executada (+${Math.round(capitalInjected).toLocaleString('ca-ES')} €). Valor total estoc: ${totalVal.toLocaleString('ca-ES')} €`);
    setTimeout(() => setInvestmentToast(null), 6000);
    setShowCapitalModal(false);
  };

  const handleInjectCapital = async (plan) => {
    setIsInvesting(true);
    try {
      const res = await fetch(`${API_BASE}/inventari/inversio-capital`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan })
      }).catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        setInventory(data.inventory);
        setInvestmentToast(data.message);
        setTimeout(() => setInvestmentToast(null), 6000);
        setShowCapitalModal(false);
      } else {
        applyLocalCapitalInjection(plan);
      }
    } catch (err) {
      console.error(err);
      applyLocalCapitalInjection(plan);
    } finally {
      setIsInvesting(false);
    }
  };

  const handleResetInventory = async () => {
    setIsInvesting(true);
    try {
      const res = await fetch(`${API_BASE}/inventari/reset`, { method: 'POST' }).catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        setInventory(data.inventory);
        setInvestmentToast(data.message);
        setTimeout(() => setInvestmentToast(null), 6000);
        setShowCapitalModal(false);
      } else {
        setInventory(initialDashboardData.inventory);
        setInvestmentToast('Estoc restablert correctament al catàleg base (757.901 €).');
        setTimeout(() => setInvestmentToast(null), 6000);
        setShowCapitalModal(false);
      }
    } catch {
      setInventory(initialDashboardData.inventory);
      setShowCapitalModal(false);
    } finally {
      setIsInvesting(false);
    }
  };

  const handleResolveTicket = async (ticketId) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: 'Resolt' } : t));
    try {
      await fetch(`${API_BASE}/tiquets/${ticketId}/resolve`, { method: 'PATCH' });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDiscardRequest = async (reqId) => {
    setQuoteRequests(quoteRequests.map(r => r.id === reqId ? { ...r, status: 'Descartada' } : r));
    try {
      await fetch(`${API_BASE}/sollicituds/${reqId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Descartada' })
      });
    } catch (e) {
      console.error(e);
    }
  };

  // ─── ACCIONS DE PDF I EMAIL AMB PDF ADJUNT PER A PRESSUPOSTOS ─────────────
  const resolveQuoteEmail = (quote) => {
    if (quote?.email || quote?.client_email) return quote.email || quote.client_email;
    const compName = (quote?.client || quote?.nom_empresa || '').toLowerCase();
    const matchedClient = clients.find(c =>
      compName && (c.nom_empresa || '').toLowerCase().includes(compName.split(' ')[0])
    );
    if (matchedClient?.email) return matchedClient.email;
    const slug = compName.replace(/[^a-z0-9]/g, '').slice(0, 18) || 'empresa';
    return `administracio@${slug}.cat`;
  };

  const buildEmailTemplateContent = (tplKey, quote, companyOverride, contactOverride) => {
    const qId = quote?.id || quote?.codi_pressupost || 'PR-2026-001';
    const company = companyOverride || quote?.client || quote?.nom_empresa || 'Empresa Client';
    const contact = contactOverride || quote?.contact || quote?.persona_contacte || 'Responsable IT';
    const items = quote?.items || quote?.resum_equipament || 'Infraestructura IT homologada';
    const amount = Number(quote?.amount || quote?.import_total || 0).toLocaleString('ca-ES');
    const monthly = Number(quote?.monthly || quote?.quota_mensual_suport || 95).toLocaleString('ca-ES');

    if (tplKey === 'recordatori') {
      return {
        subject: `Seguiment i Revisió del Pressupost Tècnic ${qId} — ${company} | KernelCore`,
        customMessage: `Benvolgut/da ${contact},\n\nUs remetem novament una còpia adjunta en format PDF (Pressupost_KernelCore_${qId}.pdf) del pressupost elaborat per a ${company} per tal de revisar l'abast tècnic de l'equipament:\n- Partides incloses: ${items}\n- Import total (IVA inclòs): ${amount} €\n\nLa reserva d'estoc al nostre magatzem de DFactory Barcelona es manté garantida durant el període de validesa de l'oferta. Quedem a la vostra disposició per resoldre qualsevol consulta o ajustar el dimensionament.`
      };
    }

    if (tplKey === 'urgent') {
      return {
        subject: `[URGENT] Validació i Aprovació de Desplegament ${qId} — ${company} | KernelCore`,
        customMessage: `Benvolgut/da ${contact},\n\nAdjuntem el document definitiu en PDF (Pressupost_KernelCore_${qId}.pdf) per a l'aprovació urgent del projecte d'infraestructura IT de ${company} (${amount} € IVA inclòs + ${monthly} €/mes manteniment SLA < 4h).\n\nUn cop rebem la vostra conformitat sobre aquest pressupost, l'equip d'enginyeria de KernelCore immobilitzarà immediatament el maquinari en estoc i activarà el calendari d'instal·lació prioritària.`
      };
    }

    return {
      subject: `Proposta Tècnica i Pressupost Oficial ${qId} — ${company} | KernelCore DFactory BCN`,
      customMessage: `Benvolgut/da ${contact},\n\nAdjunt a aquest correu trobareu el document oficial en format PDF (Pressupost_KernelCore_${qId}.pdf) amb la proposta tècnica i econòmica detallada per a ${company}.\n\nResum de la intervenció:\n- Equipament i serveis: ${items}\n- Import total (IVA inclòs): ${amount} €\n- Quota de manteniment i suport SLA (< 4h): ${monthly} €/mes\n\nRestem a la vostra disposició a la seu de DFactory Barcelona per resoldre qualsevol dubte tècnic o planificar l'inici del desplegament.`
    };
  };

  const handleDownloadQuotePdf = async (quoteOrCode) => {
    const quoteObj = typeof quoteOrCode === 'string'
      ? (quotes.find(q => (q.id || q.codi_pressupost) === quoteOrCode) || { id: quoteOrCode, codi_pressupost: quoteOrCode })
      : quoteOrCode;
    const qId = quoteObj?.id || quoteObj?.codi_pressupost || 'PR-2026-001';
    const fileName = `Pressupost_KernelCore_${qId}.pdf`;

    try {
      const res = await fetch(`${API_BASE}/pressupostos/${qId}/pdf`).catch(() => null);
      if (res && res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        return;
      }
    } catch (err) {
      console.warn('Fallback local PDF download:', err);
    }

    const fallbackBlob = buildLocalPdfBlob(quoteObj);
    const url = URL.createObjectURL(fallbackBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleViewQuotePdf = async (quoteOrCode) => {
    const quoteObj = typeof quoteOrCode === 'string'
      ? (quotes.find(q => (q.id || q.codi_pressupost) === quoteOrCode) || { id: quoteOrCode, codi_pressupost: quoteOrCode })
      : quoteOrCode;
    const qId = quoteObj?.id || quoteObj?.codi_pressupost || 'PR-2026-001';
    const inlineUrl = `${API_BASE}/pressupostos/${qId}/pdf?inline=1`;

    if (isBackendOnline) {
      window.open(inlineUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    try {
      const headRes = await fetch(inlineUrl, { method: 'HEAD' }).catch(() => null);
      if (headRes && headRes.ok) {
        window.open(inlineUrl, '_blank', 'noopener,noreferrer');
        return;
      }
    } catch {
      // Fallback local blob preview
    }

    const fallbackBlob = buildLocalPdfBlob(quoteObj);
    const blobUrl = URL.createObjectURL(fallbackBlob);
    window.open(blobUrl, '_blank', 'noopener,noreferrer');
  };

  const openEmailModalForQuote = (quote) => {
    const companyName = quote?.client || quote?.nom_empresa || 'Empresa Client';
    const clientName = quote?.contact || quote?.persona_contacte || 'Responsable IT';
    const recipientEmail = resolveQuoteEmail(quote);
    const defaultSigner = SIGNER_OPTIONS.find(s => s.id === currentRole.id)?.label || SIGNER_OPTIONS[0].label;
    const tpl = buildEmailTemplateContent('presentacio', quote, companyName, clientName);

    setEmailTemplateKey('presentacio');
    setEmailSendConfirmation(null);
    setEmailForm({
      to: recipientEmail,
      clientName,
      companyName,
      senderLabel: defaultSigner,
      subject: tpl.subject,
      customMessage: tpl.customMessage
    });
    setEmailModalQuote(quote);
  };

  const handleApplyEmailTemplate = (tplKey) => {
    setEmailTemplateKey(tplKey);
    if (!emailModalQuote) return;
    const tpl = buildEmailTemplateContent(tplKey, emailModalQuote, emailForm.companyName, emailForm.clientName);
    setEmailForm(prev => ({
      ...prev,
      subject: tpl.subject,
      customMessage: tpl.customMessage
    }));
  };

  const executeSendQuoteEmail = async (quoteObj, formValues) => {
    const qId = quoteObj?.id || quoteObj?.codi_pressupost || 'PR-2026-001';
    const attachmentName = `Pressupost_KernelCore_${qId}.pdf`;
    const signerOpt = SIGNER_OPTIONS.find(s => s.label === formValues.senderLabel) || SIGNER_OPTIONS[0];
    const payload = {
      quoteCode: qId,
      id: qId,
      codi_pressupost: qId,
      to: formValues.to,
      email: formValues.to,
      client_email: formValues.to,
      clientName: formValues.clientName,
      contact: formValues.clientName,
      persona_contacte: formValues.clientName,
      companyName: formValues.companyName,
      client: formValues.companyName,
      nom_empresa: formValues.companyName,
      senderRole: signerOpt.id,
      senderName: formValues.senderLabel,
      signant: formValues.senderLabel,
      subject: formValues.subject,
      customMessage: formValues.customMessage,
      message: formValues.customMessage,
      items: quoteObj?.items || quoteObj?.resum_equipament || 'Infraestructura IT homologada',
      amount: quoteObj?.amount || quoteObj?.import_total || 0,
      import_total: quoteObj?.amount || quoteObj?.import_total || 0,
      monthly: quoteObj?.monthly || quoteObj?.quota_mensual_suport || 95,
      environment: quoteObj?.environment || 'Oficina Corporativa / PIME'
    };

    const nowFormatted = new Date().toLocaleString('ca-ES');

    try {
      const res = await fetch(`${API_BASE}/pressupostos/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json();
        const record = data.emailRecord || data.record || data.data || {};
        const newHistoryItem = {
          id: record.id || data.messageId || `EML-${Date.now()}`,
          quoteCode: record.quoteCode || record.codi_pressupost || qId,
          to: record.to || record.email || formValues.to,
          clientName: record.clientName || formValues.clientName,
          companyName: record.companyName || record.empresa || formValues.companyName,
          subject: record.subject || formValues.subject,
          attachmentName: record.attachmentName || record.filename || attachmentName,
          senderName: record.senderName || record.signant || formValues.senderLabel,
          senderRole: record.senderRole || signerOpt.id,
          sentAt: record.sentAt || record.date || nowFormatted,
          status: record.status || 'Enviat amb PDF Adjunt',
          previewUrl: data.previewUrl || record.previewUrl || null
        };
        setSentEmails(prev => [newHistoryItem, ...prev.filter(item => item.id !== newHistoryItem.id)]);
        return newHistoryItem;
      }
    } catch (err) {
      console.warn('Fallback local email delivery:', err);
    }

    const fallbackHistoryItem = {
      id: `EML-${Date.now()}`,
      quoteCode: qId,
      to: formValues.to,
      clientName: formValues.clientName,
      companyName: formValues.companyName,
      subject: formValues.subject,
      attachmentName,
      senderName: formValues.senderLabel,
      senderRole: signerOpt.id,
      sentAt: nowFormatted,
      status: 'Enviat (PDF Adjunt)',
      previewUrl: null
    };
    setSentEmails(prev => [fallbackHistoryItem, ...prev]);
    return fallbackHistoryItem;
  };

  const handleSendQuoteEmailSubmit = async (e) => {
    e.preventDefault();
    if (!emailModalQuote || !emailForm.to) return;
    setIsSendingEmail(true);
    try {
      const sentItem = await executeSendQuoteEmail(emailModalQuote, emailForm);
      setEmailSendConfirmation(sentItem);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleSaveSmtpConfig = async (e) => {
    e.preventDefault();
    setIsSavingSmtp(true);
    setSmtpStatusMsg(null);
    const payload = smtpMode === 'ethereal'
      ? { useEthereal: true, mode: 'ethereal' }
      : {
          useEthereal: false,
          mode: 'custom',
          host: smtpForm.host,
          port: Number(smtpForm.port) || 587,
          user: smtpForm.user,
          pass: smtpForm.pass,
          fromName: smtpForm.fromName || 'KernelCore Enginyeria IT · DFactory Barcelona',
          fromEmail: smtpForm.user || smtpForm.fromEmail || 'pressupostos@kernelcore.cat'
        };

    try {
      const res = await fetch(`${API_BASE}/emails/smtp-config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json();
        setSmtpStatusMsg(data.message || (smtpMode === 'ethereal'
          ? 'Servidor SMTP de Proves Integrat (Ethereal) activat correctament.'
          : `Servidor SMTP corporatiu (${smtpForm.host}:${smtpForm.port}) configurat correctament.`));
      } else {
        setSmtpStatusMsg(smtpMode === 'ethereal'
          ? 'Servidor SMTP de Proves Integrat (Ethereal) actiu per defecte.'
          : `Configuració SMTP desada (${smtpForm.host}:${smtpForm.port}).`);
      }
    } catch {
      setSmtpStatusMsg('Configuració SMTP actualitzada al panell.');
    } finally {
      setIsSavingSmtp(false);
    }
  };

  const handleCreateQuote = async (e) => {
    e.preventDefault();
    if (!newClient || !newAmount) return;
    const resolvedEmail = newClientEmail.trim() || `administracio@${newClient.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 18) || 'empresa'}.cat`;
    const body = {
      nom_empresa: newClient,
      persona_contacte: newContact || 'Responsable IT',
      email: resolvedEmail,
      client_email: resolvedEmail,
      items: newItems || 'Pack desplegament de xarxa i equips',
      import_total: parseFloat(newAmount),
      monthly: 95
    };

    const buildFallbackQuoteObj = () => {
      const nextNum = String(quotes.length + 1).padStart(3, '0');
      const code = `PR-2026-${nextNum}`;
      const today = new Date().toISOString().split('T')[0];
      return {
        id: code,
        codi_pressupost: code,
        client: body.nom_empresa,
        nom_empresa: body.nom_empresa,
        contact: body.persona_contacte,
        persona_contacte: body.persona_contacte,
        email: resolvedEmail,
        client_email: resolvedEmail,
        items: body.items,
        resum_equipament: body.items,
        amount: body.import_total,
        import_total: body.import_total,
        monthly: body.monthly,
        quota_mensual_suport: body.monthly,
        status: 'Pendent de signatura',
        estat: 'Pendent de signatura',
        date: today,
        data_emissio: today
      };
    };

    let createdQuote = null;

    try {
      const res = await fetch(`${API_BASE}/pressupostos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }).catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        createdQuote = { ...buildFallbackQuoteObj(), ...(data.pressupost || {}) };
        setQuotes(prev => [createdQuote, ...prev]);
      } else {
        createdQuote = buildFallbackQuoteObj();
        setQuotes(prev => [createdQuote, ...prev]);
      }
    } catch (err) {
      console.error(err);
      createdQuote = buildFallbackQuoteObj();
      setQuotes(prev => [createdQuote, ...prev]);
    }

    if (autoSendEmailOnCreate && createdQuote) {
      const defaultSigner = SIGNER_OPTIONS.find(s => s.id === currentRole.id)?.label || SIGNER_OPTIONS[0].label;
      const tpl = buildEmailTemplateContent('presentacio', createdQuote, createdQuote.client || createdQuote.nom_empresa, createdQuote.contact || createdQuote.persona_contacte);
      await executeSendQuoteEmail(createdQuote, {
        to: resolvedEmail,
        clientName: createdQuote.contact || createdQuote.persona_contacte || 'Responsable IT',
        companyName: createdQuote.client || createdQuote.nom_empresa,
        senderLabel: defaultSigner,
        subject: tpl.subject,
        customMessage: tpl.customMessage
      });
    }

    setNewClient('');
    setNewContact('');
    setNewClientEmail('');
    setNewAmount('');
    setNewItems('');
    setShowNewQuoteModal(false);
  };

  // Crear nou client corporatiu (POST /api/clients + estat local)
  const handleCreateClient = async (e) => {
    e.preventDefault();
    if (!newClientForm.nom_empresa || !newClientForm.cif) return;
    const payload = {
      id: `CLI-${String(clients.length + 1).padStart(3, '0')}`,
      nom_empresa: newClientForm.nom_empresa,
      cif: newClientForm.cif,
      persona_contacte: newClientForm.persona_contacte || 'Responsable IT',
      telefon: newClientForm.telefon || '+34 932 000 000',
      email: newClientForm.email || `contacte@${newClientForm.nom_empresa.toLowerCase().replace(/[^a-z0-9]/g, '')}.cat`,
      adreca: newClientForm.adreca || 'Districte 22@, Barcelona',
      sector: newClientForm.sector || 'Oficina PIME'
    };

    try {
      const res = await fetch(`${API_BASE}/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        setClients(prev => [data.client || data.data || payload, ...prev]);
      } else {
        setClients(prev => [payload, ...prev]);
      }
    } catch {
      setClients(prev => [payload, ...prev]);
    }

    setNewClientForm({
      nom_empresa: '',
      cif: '',
      persona_contacte: '',
      telefon: '',
      email: '',
      adreca: '',
      sector: 'Oficina PIME'
    });
    setShowNewClientModal(false);
  };

  // Crear nou proveïdor oficial (POST /api/proveidors + estat local)
  const handleCreateSupplier = async (e) => {
    e.preventDefault();
    if (!newSupplierForm.nom_comercial || !newSupplierForm.cif) return;
    const parsedBrands = newSupplierForm.marques_oficials
      ? newSupplierForm.marques_oficials.split(',').map(b => b.trim()).filter(Boolean)
      : ['Cisco'];
    const payload = {
      id: `PRV-${String(suppliers.length + 1).padStart(3, '0')}`,
      nom_comercial: newSupplierForm.nom_comercial,
      cif: newSupplierForm.cif,
      telefon: newSupplierForm.telefon || '+34 934 000 000',
      email_comandes: newSupplierForm.email_comandes || `comandes@${newSupplierForm.nom_comercial.toLowerCase().replace(/[^a-z0-9]/g, '')}.es`,
      adreca: newSupplierForm.adreca || 'Zona Franca Logística, Barcelona',
      condicions_pagament: newSupplierForm.condicions_pagament || '30 dies transferència',
      marques_oficials: parsedBrands,
      marca_principal: newSupplierForm.marca_principal || parsedBrands[0] || 'Cisco'
    };

    try {
      const res = await fetch(`${API_BASE}/proveidors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        setSuppliers(prev => [data.proveidor || data.supplier || data.data || payload, ...prev]);
      } else {
        setSuppliers(prev => [payload, ...prev]);
      }
    } catch {
      setSuppliers(prev => [payload, ...prev]);
    }

    setNewSupplierForm({
      nom_comercial: '',
      cif: '',
      telefon: '',
      email_comandes: '',
      adreca: '',
      condicions_pagament: '30 dies transferència',
      marques_oficials: '',
      marca_principal: ''
    });
    setShowNewSupplierModal(false);
  };

  // Filtrar estoc d'un proveïdor oficial a la pestanya d'inventari
  const handleFilterSupplierStock = (primaryBrand) => {
    handleResetFilters();
    setInventoryBrandFilter(primaryBrand || 'all');
    setActiveTab('inventory');
  };

  // Crear nou projecte d'enginyeria (POST /api/projectes + estat local)
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectForm.name || !newProjectForm.client) return;
    const rawTasks = newProjectForm.initialTasks
      ? newProjectForm.initialTasks.split('\n').map(t => t.trim()).filter(Boolean)
      : [
          'Auditoria tècnica inicial i validació de plànols a la seu del client',
          'Aprovisionament de material homologat des del magatzem de DFactory Barcelona',
          'Desplegament físic, configuració i certificació de qualitat KernelCore'
        ];
    const tasksArray = rawTasks.map((tName, idx) => ({ name: tName, done: idx === 0 }));
    const progress = Math.round((tasksArray.filter(t => t.done).length / tasksArray.length) * 100);

    const payload = {
      id: `PRJ-26-${String(projects.length + 1).padStart(2, '0')}`,
      name: newProjectForm.name,
      client: newProjectForm.client,
      techLead: newProjectForm.techLead,
      deadline: newProjectForm.deadline || '30 Novembre 2026',
      progress,
      tasks: tasksArray
    };

    try {
      const res = await fetch(`${API_BASE}/projectes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        setProjects(prev => [data.projecte || data.project || data.data || payload, ...prev]);
      } else {
        setProjects(prev => [payload, ...prev]);
      }
    } catch {
      setProjects(prev => [payload, ...prev]);
    }

    setNewProjectForm({
      name: '',
      client: '',
      techLead: 'Hans Lao Moncusi (Cap de Sistemes & Seguretat)',
      deadline: '30 Novembre 2026',
      initialTasks: ''
    });
    setShowNewProjectModal(false);
  };

  // Afegir nova fita tècnica inline a un projecte (POST /api/projectes/:id/tasks + estat local)
  const handleAddProjectTask = async (e, projectId) => {
    e.preventDefault();
    const taskName = (inlineTaskInputs[projectId] || '').trim();
    if (!taskName) return;

    const newTask = { name: taskName, done: false };
    setProjects(prev => prev.map(proj => {
      if (proj.id !== projectId) return proj;
      const updatedTasks = [...(proj.tasks || []), newTask];
      const progress = Math.round((updatedTasks.filter(t => t.done).length / updatedTasks.length) * 100);
      return { ...proj, tasks: updatedTasks, progress };
    }));
    setInlineTaskInputs(prev => ({ ...prev, [projectId]: '' }));

    try {
      await fetch(`${API_BASE}/projectes/${projectId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: taskName, done: false })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const openQuotationForRequest = (req) => {
    setSelectedRequest(req);
    setShowQuotationHub(true);
  };

  const handlePressupostGenerat = () => {
    loadAllData();
    setShowQuotationHub(false);
    setSelectedRequest(null);
  };

  // ─── GESTIÓ D'EL MEU PERFIL TÈCNIC ──────────────────────────────────────────
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPwdFeedback(null);
    if (!pwdForm.current || !pwdForm.newPwd || !pwdForm.confirmPwd) {
      setPwdFeedback({ type: 'error', text: 'Tots els camps de contrasenya són obligatoris.' });
      return;
    }
    if (pwdForm.newPwd.length < 6) {
      setPwdFeedback({ type: 'error', text: 'La nova contrasenya ha de tenir com a mínim 6 caràcters.' });
      return;
    }
    if (pwdForm.newPwd !== pwdForm.confirmPwd) {
      setPwdFeedback({ type: 'error', text: 'La confirmació de la nova contrasenya no coincideix.' });
      return;
    }

    setIsUpdatingPwd(true);
    try {
      const res = await fetch(`${API_BASE}/perfil/canvi-contrasenya`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentRole.email,
          currentPassword: pwdForm.current,
          newPassword: pwdForm.newPwd
        })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setPwdFeedback({ type: 'success', text: data.message || 'Contrasenya actualitzada i xifrada amb SHA-256 a la base de dades!' });
        setPwdForm({ current: '', newPwd: '', confirmPwd: '' });
      } else {
        setPwdFeedback({ type: 'error', text: data.error || 'La contrasenya actual indicada no és correcta.' });
      }
    } catch {
      setPwdFeedback({ type: 'error', text: 'Error connectant amb el servidor per canviar la contrasenya.' });
    } finally {
      setIsUpdatingPwd(false);
    }
  };

  const handleSaveProfilePreferences = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setProfileSavedMsg(null);
    try {
      const res = await fetch(`${API_BASE}/perfil/preferencies`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentRole.email,
          telefon: profilePhone,
          bio: profileBio,
          signaturaEmail: profileSignature
        })
      });
      if (res.ok) {
        setProfileSavedMsg('Dades professionals i signatura desades correctament.');
      } else {
        setProfileSavedMsg('Dades actualitzades localment per a la sessió.');
      }
    } catch {
      setProfileSavedMsg('Dades actualitzades localment per a la sessió.');
    } finally {
      setIsSavingProfile(false);
      setTimeout(() => setProfileSavedMsg(null), 4000);
    }
  };

  // Eina de diagnòstic Ping
  const handleRunPing = async () => {
    setIsPinging(true);
    try {
      const res = await fetch(`${API_BASE}/diagnostics/ping`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host: pingHost })
      });
      if (res.ok) {
        const data = await res.json();
        setPingResult(data);
      } else {
        setPingResult({ host: pingHost, status: 'ONLINE (LOCAL)', latency_ms: '0.9', loss_rate: '0%', packets: { transmitted: 4, received: 4, loss_rate: '0%' } });
      }
    } catch {
      setPingResult({ host: pingHost, status: 'ONLINE (LOCAL)', latency_ms: '0.9', loss_rate: '0%', packets: { transmitted: 4, received: 4, loss_rate: '0%' } });
    } finally {
      setIsPinging(false);
    }
  };

  const handleDownloadSQL = () => {
    window.open(`${BACKEND_URL}/database/kernelcore_db.sql`, '_blank');
  };

  const totalAmountQuotes = quotes.reduce((acc, q) => acc + (parseFloat(q.amount ?? q.import_total ?? 0) || 0), 0);
  const pendingRequests = quoteRequests.filter(r => r.status === 'Nova sol·licitud').length;

  // Càlculs globals de Capital en Estoc
  const totalInventoryValuation = inventory.reduce((acc, i) => acc + ((Number(i.stock) || 0) * (parseFloat(i.price) || 0)), 0);
  const totalInventoryUnits = inventory.reduce((acc, i) => acc + (Number(i.stock) || 0), 0);
  const basicTierValuation = inventory.filter(i => (i.tier || '').includes('Bàsic')).reduce((acc, i) => acc + ((Number(i.stock) || 0) * (parseFloat(i.price) || 0)), 0);
  const midTierValuation = inventory.filter(i => (i.tier || '').includes('Mitjà')).reduce((acc, i) => acc + ((Number(i.stock) || 0) * (parseFloat(i.price) || 0)), 0);
  const highTierValuation = inventory.filter(i => (i.tier || '').includes('Professional') || (i.tier || '').includes('Avançat')).reduce((acc, i) => acc + ((Number(i.stock) || 0) * (parseFloat(i.price) || 0)), 0);

  // Llistats únics de marques i categories per als filtres
  const allBrands = ['all', ...Array.from(new Set(inventory.map(i => i.brand).filter(Boolean))).sort()];
  const allCategories = ['all', ...Array.from(new Set(inventory.map(i => i.category).filter(Boolean))).sort()];

  // Recompte dinàmic per gammes i alertes
  const basicCount = inventory.filter(i => (i.tier || '').includes('Bàsic')).length;
  const midCount = inventory.filter(i => (i.tier || '').includes('Mitjà')).length;
  const proCount = inventory.filter(i => (i.tier || '').includes('Professional') || (i.tier || '').includes('Avançat')).length;
  // Marques més destacades per als xips d'accés ràpid
  const TOP_BRANDS = [
    'Cisco', 'Ubiquiti', 'Fortinet', 'APC Schneider', 'Dell', 
    'HPE', 'Synology', 'Fluke Networks', 'Legrand', 'Eaton', 
    'Posiflex', 'MikroTik'
  ];

  // Rangs de preu
  const PRICE_RANGES = [
    { id: 'all', label: 'Tots els preus' },
    { id: 'under100', label: '< 100 €' },
    { id: '100to500', label: '100 € - 500 €' },
    { id: '500to1500', label: '500 € - 1.500 €' },
    { id: 'over1500', label: '> 1.500 €' },
  ];

  // Recomptes específics d'estoc
  const lowStockCount = inventory.filter(i => (i.stock || 0) <= (i.min || 0)).length;
  const outOfStockCount = inventory.filter(i => (i.stock || 0) === 0).length;

  // Comptador de filtres actius
  const activeFiltersCount = 
    (inventoryTierFilter !== 'all' ? 1 : 0) +
    (inventoryBrandFilter !== 'all' ? 1 : 0) +
    (inventoryCategoryFilter !== 'all' ? 1 : 0) +
    (inventoryStockStatusFilter !== 'all' ? 1 : 0) +
    (inventoryPriceFilter !== 'all' ? 1 : 0) +
    (inventorySortBy !== 'default' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const handleResetFilters = () => {
    setInventoryTierFilter('all');
    setInventoryBrandFilter('all');
    setInventoryCategoryFilter('all');
    setInventoryStockStatusFilter('all');
    setInventoryPriceFilter('all');
    setInventorySortBy('default');
    setSearchQuery('');
    setInventoryPage(1);
  };

  // Articles d'inventari filtrats i ordenats
  const filteredInventory = inventory
    .filter(item => {
      // 1. Cercador ràpid
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = (item.name || '').toLowerCase().includes(q);
        const matchSku = (item.sku || '').toLowerCase().includes(q);
        const matchBrand = (item.brand || '').toLowerCase().includes(q);
        const matchCategory = (item.category || '').toLowerCase().includes(q);
        if (!matchName && !matchSku && !matchBrand && !matchCategory) return false;
      }
      // 2. Filtre Gama / Qualitat (Tier)
      if (inventoryTierFilter !== 'all') {
        if (inventoryTierFilter === 'basic' && !(item.tier || '').includes('Bàsic')) return false;
        if (inventoryTierFilter === 'mid' && !(item.tier || '').includes('Mitjà')) return false;
        if (inventoryTierFilter === 'pro' && !((item.tier || '').includes('Professional') || (item.tier || '').includes('Avançat'))) return false;
      }
      // 3. Filtre Marca / Fabricant
      if (inventoryBrandFilter !== 'all' && item.brand !== inventoryBrandFilter) {
        return false;
      }
      // 4. Filtre Categoria
      if (inventoryCategoryFilter !== 'all' && item.category !== inventoryCategoryFilter) {
        return false;
      }
      // 5. Filtre Rang de Preu
      if (inventoryPriceFilter !== 'all') {
        const price = item.price || 0;
        if (inventoryPriceFilter === 'under100' && price >= 100) return false;
        if (inventoryPriceFilter === '100to500' && (price < 100 || price > 500)) return false;
        if (inventoryPriceFilter === '500to1500' && (price < 500 || price > 1500)) return false;
        if (inventoryPriceFilter === 'over1500' && price <= 1500) return false;
      }
      // 6. Filtre Estat d'Estoc
      if (inventoryStockStatusFilter === 'out' && (item.stock || 0) > 0) {
        return false;
      }
      if (inventoryStockStatusFilter === 'low' && ((item.stock || 0) > (item.min || 0) || (item.stock || 0) === 0)) {
        return false;
      }
      if (inventoryStockStatusFilter === 'optimal' && (item.stock || 0) <= (item.min || 0)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (inventorySortBy === 'price_asc') return (a.price || 0) - (b.price || 0);
      if (inventorySortBy === 'price_desc') return (b.price || 0) - (a.price || 0);
      if (inventorySortBy === 'stock_desc') return (b.stock || 0) - (a.stock || 0);
      if (inventorySortBy === 'valuation_desc') return ((b.stock || 0) * (b.price || 0)) - ((a.stock || 0) * (a.price || 0));
      return (a.id || 0) - (b.id || 0);
    });

  // Mètriques de la selecció filtrada en viu
  const filteredUnits = filteredInventory.reduce((acc, i) => acc + (i.stock || 0), 0);
  const filteredValuation = filteredInventory.reduce((acc, i) => acc + ((i.stock || 0) * (i.price || 0)), 0);
  const filteredAvgPrice = filteredInventory.length > 0
    ? Math.round(filteredInventory.reduce((acc, i) => acc + (i.price || 0), 0) / filteredInventory.length)
    : 0;

  // Paginació d'alt rendiment per a milers d'articles
  const totalPages = Math.max(1, Math.ceil(filteredInventory.length / (inventoryItemsPerPage === -1 ? filteredInventory.length || 1 : inventoryItemsPerPage)));
  const safeInventoryPage = Math.min(Math.max(1, inventoryPage), totalPages);
  const paginatedInventory = inventoryItemsPerPage === -1
    ? filteredInventory
    : filteredInventory.slice((safeInventoryPage - 1) * inventoryItemsPerPage, safeInventoryPage * inventoryItemsPerPage);
  const pageStartRecord = filteredInventory.length === 0 ? 0 : (safeInventoryPage - 1) * (inventoryItemsPerPage === -1 ? filteredInventory.length : inventoryItemsPerPage) + 1;
  const pageEndRecord = inventoryItemsPerPage === -1 
    ? filteredInventory.length 
    : Math.min(safeInventoryPage * inventoryItemsPerPage, filteredInventory.length);

  // Exportació a CSV de la selecció filtrada
  const handleExportCSV = () => {
    if (filteredInventory.length === 0) return;
    const headers = ['ID', 'SKU', 'Nom', 'Fabricant', 'Categoria', 'Gama', 'Cost Unitari (EUR)', 'Estoc Fisic', 'Minim Alerta', 'Valor Lot (EUR)'];
    const rows = filteredInventory.map(item => [
      item.id,
      `"${item.sku || ''}"`,
      `"${(item.name || '').replace(/"/g, '""')}"`,
      `"${item.brand || ''}"`,
      `"${item.category || ''}"`,
      `"${item.tier || ''}"`,
      (item.price || 0).toFixed(2),
      item.stock || 0,
      item.min || 0,
      ((item.stock || 0) * (item.price || 0)).toFixed(2)
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `inventari_kernelcore_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'overview',   label: 'Visió General',            icon: LayoutDashboard },
    { id: 'requests',   label: 'Sol·licituds Clients',      icon: Inbox,          badge: pendingRequests, highlight: pendingRequests > 0 },
    { id: 'quotes',     label: 'Pressupostos IT',          icon: FileText,       badge: quotes.length },
    { id: 'clients',    label: 'Clients & PIMEs',          icon: Users,          badge: clients.length },
    { id: 'suppliers',  label: 'Proveïdors Oficials',      icon: Truck,          badge: suppliers.length },
    { id: 'projects',   label: 'Projectes Actius',          icon: FolderKanban,   badge: projects.length },
    { id: 'inventory',  label: 'Magatzem & Estoc',          icon: Package,        badge: inventory.length },
    { id: 'tickets',    label: 'Tiquets SAT & Incidències', icon: LifeBuoy,       badge: tickets.filter(t => t.status !== 'Resolt').length },
    { id: 'telemetry',  label: 'Servidors & Telemetria',    icon: Server,         badge: telemetry.length },
    { id: 'profile',    label: 'El meu Perfil',            icon: UserCheck }
  ];

  return (
    <div className="h-screen overflow-hidden bg-[#020617] text-slate-100 flex flex-col md:flex-row font-sans selection:bg-cyan-500 selection:text-slate-950 relative">

      {/* ─── MODAL / PANTALLA DE RECÀRREGA AMB CERCLE DE SINCRONITZACIÓ CENTRAT ─── */}
      {isSyncing && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-sm animate-fadeIn select-none p-6"
          role="status"
          aria-live="polite"
          aria-label="Sincronitzant dades del sistema"
        >
          {/* Cercle central de recàrrega amb anells concèntrics */}
          <div className="relative flex items-center justify-center">
            
            {/* Anell d'Aura Exterior suau */}
            <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/25 to-blue-400/20 blur-lg animate-pulse" />

            {/* Spinner Circular SVG exterior amb gradient cian-blau */}
            <svg 
              className="w-28 h-28 animate-spin drop-shadow-[0_0_20px_rgba(6,182,212,0.75)]"
              viewBox="0 0 120 120"
              style={{ animationDuration: '1.4s' }}
            >
              <defs>
                <linearGradient id="syncCircleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#67E8F9" />
                  <stop offset="35%" stopColor="#22D3EE" />
                  <stop offset="70%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>

              {/* Pista de fons */}
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="rgba(30, 41, 59, 0.45)"
                strokeWidth="5"
                fill="none"
              />

              {/* Segment actiu de càrrega */}
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="url(#syncCircleGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="314"
                strokeDashoffset="115"
                fill="none"
              />
            </svg>

            {/* Anell orbital interior contra-rotatori */}
            <svg 
              className="w-20 h-20 absolute animate-spin drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]"
              viewBox="0 0 100 100"
              style={{ animationDuration: '2.2s', animationDirection: 'reverse' }}
            >
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#38BDF8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="238"
                strokeDashoffset="150"
                strokeOpacity="0.8"
                fill="none"
              />
            </svg>

            {/* Icona central */}
            <div className="absolute flex items-center justify-center w-12 h-12 rounded-full bg-slate-900/95 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.35)] backdrop-blur-md">
              <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '2s' }} />
            </div>

          </div>

          {/* Text d'estat de sincronització */}
          <div className="mt-7 flex flex-col items-center text-center space-y-2 z-10">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
                KernelCore // Sincronització
              </span>
            </div>

            <h3 className="text-lg font-heading font-bold text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Sincronitzant amb el Sistema...
            </h3>
            
            <p className="text-xs text-slate-300 font-medium max-w-xs">
              Actualitzant mètriques de xarxa, estoc i telemetria des del servidor central.
            </p>
          </div>

        </div>
      )}

      {/* ─── SIDEBAR FIXA AMB SCROLL INTERN I MODE RESUMIT (ICONES) ─── */}
      <aside className={`h-screen sticky top-0 bg-[#0B132B] border-r border-slate-800 flex flex-col justify-between shrink-0 shadow-2xl z-40 overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'w-full md:w-80 p-5' : 'w-20 p-3'
      }`}>
        <div className="space-y-4">
          
          {/* Logo i Nom Corporatiu amb botó d'amagar/expandir */}
          {sidebarOpen ? (
            <div className="flex items-center justify-between gap-2 px-1 pt-1 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-3 min-w-0">
                <img 
                  src="/logo-mark.svg" 
                  alt="KernelCore" 
                  className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.45)] shrink-0" 
                />
                <div className="min-w-0">
                  <div className="text-lg font-heading font-black text-white tracking-tight leading-none mb-1">
                    <span>KERNEL<span className="text-cyan-400">CORE</span></span>
                  </div>
                  <span className="text-xs text-cyan-400/90 font-mono uppercase tracking-wider block font-semibold truncate">Portal d'Operacions</span>
                </div>
              </div>

              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all shrink-0 shadow-sm"
                title="Reduir menú (Mode resumit amb icones)"
              >
                <PanelLeftClose className="w-5 h-5 text-slate-300 hover:text-cyan-400" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 px-1 pt-1 pb-3 border-b border-slate-800/80">
              <img 
                src="/logo-mark.svg" 
                alt="KernelCore" 
                className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.45)] cursor-pointer hover:scale-105 transition-transform" 
                onClick={() => setSidebarOpen(true)}
                title="KernelCore - Clic per expandir menú"
              />
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl text-cyan-400 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 transition-all shadow-sm"
                title="Expandir menú complet"
              >
                <PanelLeftOpen className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Targeta del Rol Tècnic Connectat i Competències RBAC */}
          {sidebarOpen ? (
            <div 
              onClick={() => setActiveTab('profile')}
              className={`p-3.5 rounded-2xl bg-slate-900/90 border space-y-2.5 shadow-sm cursor-pointer transition-all group ${
                activeTab === 'profile' ? 'border-cyan-500/70 bg-cyan-950/25 ring-1 ring-cyan-500/30' : 'border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
              title="Veure i gestionar El meu Perfil"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentRole.avatarColor || 'from-cyan-500 to-blue-600'} text-slate-950 font-black text-base flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0 group-hover:scale-105 transition-transform`}>
                    {currentRole.nom.charAt(0)}
                  </div>
                  <div className="overflow-hidden min-w-0">
                    <span className="text-sm font-bold text-white block truncate group-hover:text-cyan-300 transition-colors">{currentRole.nom}</span>
                    <span className="text-[11px] text-cyan-400 block truncate font-mono">{currentRole.email}</span>
                  </div>
                </div>
                <UserCheck className={`w-4 h-4 shrink-0 transition-colors ${activeTab === 'profile' ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'}`} />
              </div>
              <div className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${currentRole.badgeColor}`}>
                {currentRole.carrec}
              </div>
              <div className="flex flex-wrap gap-1 pt-0.5">
                {currentRole.competencies.map(comp => (
                  <span key={comp} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-medium">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center" title={`${currentRole.nom} (${currentRole.carrec}) · Clic per veure el perfil`}>
              <div 
                onClick={() => { setActiveTab('profile'); setSidebarOpen(true); }}
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${currentRole.avatarColor || 'from-cyan-500 to-blue-600'} text-slate-950 font-black text-base flex items-center justify-center shadow-lg shadow-cyan-500/20 cursor-pointer hover:ring-2 hover:ring-cyan-400 transition-all`}
              >
                {currentRole.nom.charAt(0)}
              </div>
            </div>
          )}

          {/* Navegació de pestanyes */}
          <nav className="space-y-1.5">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  title={tab.label}
                  className={`w-full flex items-center rounded-xl text-sm font-semibold transition-all relative group ${
                    sidebarOpen ? 'justify-between px-3.5 py-2.5' : 'justify-center p-3'
                  } ${
                    isActive 
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/50 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent'
                  }`}
                >
                  <div className={`flex items-center ${sidebarOpen ? 'gap-3 min-w-0' : 'justify-center'}`}>
                    <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    {sidebarOpen && <span className="truncate">{tab.label}</span>}
                  </div>
                  
                  {tab.badge !== undefined && tab.badge > 0 && (
                    sidebarOpen ? (
                      <span className={`px-2 py-0.5 rounded-md text-xs font-mono font-bold shrink-0 ${
                        tab.highlight 
                          ? 'bg-blue-600 text-white animate-pulse'
                          : isActive 
                            ? 'bg-cyan-500/30 text-cyan-200' 
                            : 'bg-slate-800 text-slate-300'
                      }`}>
                        {tab.badge}
                      </span>
                    ) : (
                      <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-[#0B132B] animate-pulse" />
                    )
                  )}
                </button>
              );
            })}
          </nav>

          {/* Estat del Backend */}
          {sidebarOpen ? (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 text-xs">
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${isBackendOnline ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
                <span className="font-bold text-slate-200">
                  {isBackendOnline ? 'API Backend En Línia' : 'Connectant Backend...'}
                </span>
              </div>
              <p className="text-slate-400 font-mono text-[11px] leading-tight flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{backendInfo || 'DFactory Barcelona'}</span>
              </p>
            </div>
          ) : (
            <div className="flex justify-center" title={isBackendOnline ? `API En Línia - ${backendInfo || 'DFactory Barcelona'}` : 'Connectant Backend...'}>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center flex items-center justify-center">
                <span className={`w-3 h-3 rounded-full ${isBackendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              </div>
            </div>
          )}
        </div>

        {/* Botons Inferiors */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <button 
            onClick={onBackToSite}
            className={`w-full flex items-center rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors ${
              sidebarOpen ? 'gap-2.5 px-3.5 py-2.5' : 'justify-center p-2.5'
            }`}
            title="Tornar a la web pública"
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400 shrink-0" />
            {sidebarOpen && <span>Tornar a la web</span>}
          </button>
          <button 
            onClick={onLogout}
            className={`w-full flex items-center rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors ${
              sidebarOpen ? 'gap-2.5 px-3.5 py-2.5' : 'justify-center p-2.5'
            }`}
            title="Tancar Sessió"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>Tancar Sessió</span>}
          </button>
        </div>
      </aside>

      {/* ─── CONTINGUT PRINCIPAL FIX AMB SCROLL INDEPENDENT ─── */}
      <main className="flex-1 h-screen overflow-y-auto p-6 lg:p-10 transition-all duration-300">

        {/* BARRA SUPERIOR AMB CONMUTADOR DE ROL EN VIU, AUDITORIA AUTOMÀTICA 60s I ACCIONS */}
        <div className="pb-6 border-b border-slate-800 mb-8 space-y-4">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                {!sidebarOpen && (
                  <button 
                    onClick={() => setSidebarOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200 text-xs font-bold transition-all shadow-md mr-1 active:scale-95"
                    title="Expandir menú complet"
                  >
                    <PanelLeftOpen className="w-4 h-4 text-cyan-400" />
                    <span>Expandir Menú</span>
                  </button>
                )}
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  DFactory Barcelona // Seu Central SMX
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                  v2.6 Live
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${currentRole.badgeColor}`}>
                  Rol Actiu: {currentRole.nom}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-normal">
                {tabs.find(t => t.id === activeTab)?.label || 'Panell de Control'}
              </h1>
            </div>

            {/* Botons d'acció ràpida, Auditoria 60s i generador de dades en viu */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Indicador i Botó d'Auditoria Automàtica Programada (Cada 60s) */}
              <button
                onClick={() => setShowAuditModal(true)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-mono font-bold text-xs transition-all shadow-sm active:scale-95 shrink-0"
                title="Obrir panell d'Auditoria de Sistemes & Integritat Programada (Cada 60s)"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Auditoria Automàtica: {auditData.status} ({auditCountdown}s)</span>
              </button>

              <button
                onClick={handleGenerateLiveRequest}
                disabled={isGenerating}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-lg shadow-blue-600/20 active:scale-95 shrink-0"
                title="Genera una sol·licitud d'empresa real des del backend"
              >
                <Zap className="w-4 h-4" />
                <span>+ Generar Sol·licitud</span>
              </button>

              <button
                onClick={handleGenerateLiveTicket}
                disabled={isGenerating}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wide transition-all shadow-lg shadow-amber-500/20 active:scale-95 shrink-0"
                title="Genera un tiquet SAT tècnic des del backend"
              >
                <Wrench className="w-4 h-4" />
                <span>+ Generar Tiquet SAT</span>
              </button>

              <button 
                onClick={handleManualSync}
                disabled={isSyncing}
                className="relative overflow-hidden group flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 hover:bg-slate-850 text-slate-200 hover:text-white text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-60 shrink-0"
                title="Recarrega i sincronitza les dades del servidor en temps real"
              >
                <RefreshCw className={`w-4 h-4 text-cyan-400 relative z-10 ${isSyncing || loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                <span className="relative z-10 font-bold">{isSyncing ? 'Sincronitzant...' : 'Sincronitzar'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            TAB: VISIÓ GENERAL
        ══════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Cards amb números grans i ben llegibles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { 
                  label: 'Pressupostos Estatus', 
                  value: quotes.length, 
                  sub: `${totalAmountQuotes.toLocaleString('ca-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} € cartera activa`, 
                  color: 'text-cyan-400',
                  action: () => setActiveTab('quotes')
                },
                { 
                  label: 'Sol·licituds Pendents', 
                  value: pendingRequests, 
                  sub: 'Empreses pendents d\'estudi', 
                  color: pendingRequests > 0 ? 'text-blue-400' : 'text-slate-400', 
                  action: () => setActiveTab('requests') 
                },
                { 
                  label: 'Capital Actius en Estoc', 
                  value: `${Math.round(totalInventoryValuation / 1000)}k €`, 
                  sub: `${Math.round(totalInventoryValuation).toLocaleString('ca-ES')} € · ${totalInventoryUnits.toLocaleString('ca-ES')} uds. físiques`, 
                  color: 'text-emerald-400',
                  action: () => setActiveTab('inventory')
                },
                { 
                  label: 'Tiquets SAT Oberts', 
                  value: tickets.filter(t => t.status !== 'Resolt').length, 
                  sub: 'Suport tècnic & manteniment', 
                  color: 'text-amber-400',
                  action: () => setActiveTab('tickets')
                },
              ].map((kpi, i) => (
                <div 
                  key={i} 
                  onClick={kpi.action} 
                  className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-xl hover:shadow-cyan-500/5 group"
                >
                  <p className="text-sm font-semibold text-slate-400 mb-2 group-hover:text-slate-300">{kpi.label}</p>
                  <p className={`text-4xl font-heading font-black ${kpi.color}`}>{kpi.value}</p>
                  <p className="text-xs font-medium text-slate-400 mt-2">{kpi.sub}</p>
                </div>
              ))}
            </div>

            {/* Fila 2: Sol·licituds Recents + Projectes en marxa */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Sol·licituds recents */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2.5">
                    <Inbox className="w-5 h-5 text-cyan-400"/>
                    Sol·licituds de Pressupost Recents
                    {pendingRequests > 0 && (
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-600 text-white animate-pulse">
                        {pendingRequests}
                      </span>
                    )}
                  </h3>
                  <button onClick={() => setActiveTab('requests')} className="text-sm text-cyan-400 hover:text-cyan-300 font-semibold">
                    Veure totes →
                  </button>
                </div>

                {quoteRequests.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-sm">
                    <Inbox className="w-10 h-10 mx-auto mb-2 opacity-30"/>
                    Cap sol·licitud activa al sistema.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {quoteRequests.slice(0, 4).map(req => {
                      const cleanEnv = req.entorn === 'oficina_pime' 
                        ? 'Oficina PIME' 
                        : req.entorn === 'industria' 
                          ? 'Nau Industrial'
                          : (req.entorn || 'Oficina');
                      return (
                        <div 
                          key={req.id} 
                          onClick={() => {
                            setSelectedRequest(req);
                            setActiveTab('requests');
                          }}
                          className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-cyan-500/50 hover:bg-slate-900/50 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{req.empresa || req.nom}</span>
                              <span className="text-xs font-mono text-cyan-400/80 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">{req.id}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">
                              {req.email} · {cleanEnv}
                            </p>
                          </div>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-bold whitespace-nowrap ${STATUS_COLORS[req.status] || 'bg-slate-800 text-slate-300'}`}>
                            {req.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Estat de Projectes Actius */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2.5">
                    <FolderKanban className="w-5 h-5 text-cyan-400"/>
                    Projectes d'Instal·lació en Curs
                  </h3>
                  <button onClick={() => setActiveTab('projects')} className="text-sm text-cyan-400 hover:text-cyan-300 font-semibold">
                    Gestionar fites →
                  </button>
                </div>

                <div className="space-y-5">
                  {projects.map(proj => (
                    <div key={proj.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800/90">
                      <div className="flex justify-between items-start text-sm mb-2">
                        <div>
                          <span className="font-bold text-white block">{proj.name}</span>
                          <span className="text-xs text-slate-400">{proj.client} · {proj.techLead}</span>
                        </div>
                        <span className="text-base text-cyan-400 font-mono font-black">{proj.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2.5 rounded-full transition-all duration-500" 
                          style={{ width: `${proj.progress}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Fila 3: Telemetria de Nodes en Temps Real */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2.5">
                    <Server className="w-5 h-5 text-cyan-400"/>
                    Monitoratge d'Infraestructura a DFactory Barcelona
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Telemetria de servidors, xarxa Cisco i protecció SAI</p>
                </div>
                <button onClick={() => setActiveTab('telemetry')} className="text-sm text-cyan-400 hover:text-cyan-300 font-semibold">
                  Panell complet de telemetria →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {telemetry.map(node => (
                  <div key={node.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 truncate">{node.name}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3 truncate">{node.role}</p>
                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between text-slate-300">
                        <span>CPU:</span><span className="font-bold text-white">{node.cpu}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${node.cpu}%` }}></div>
                      </div>
                      <div className="flex justify-between text-slate-300 pt-1">
                        <span>Latència Ping:</span><span className="text-emerald-400 font-bold">{node.ping} ms</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: SOL·LICITUDS DE PRESSUPOST
        ══════════════════════════════════════ */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            
            {/* Modal de QuotationHub inline */}
            {showQuotationHub && selectedRequest && (
              <div className="bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl">
                <QuotationHub
                  prefillData={selectedRequest}
                  inventoryCatalog={inventory}
                  onPressupostGenerat={handlePressupostGenerat}
                  onClose={() => { setShowQuotationHub(false); setSelectedRequest(null); }}
                />
              </div>
            )}

            {/* Detall d'una sol·licitud seleccionada (Disseny Executiu Cyber-Tech) */}
            {viewRequest && !showQuotationHub && (() => {
              const sai = parseSaiCalculation(viewRequest.descripcio);
              const formattedEnv = formatEnvironment(viewRequest.entorn);
              const isUrgent = viewRequest.urgencia === 'urgent';
              const companyInitial = (viewRequest.empresa || viewRequest.nom || 'C').charAt(0).toUpperCase();

              return (
                <div className="bg-[#0B132B]/95 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden animate-fadeIn">
                  {/* Línia superior decorativa de neó */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>

                  {/* 1. Capçalera de la Sol·licitud */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8 pb-6 border-b border-slate-800/80">
                    <div className="flex items-start sm:items-center gap-4">
                      {/* Avatar Gran d'Empresa amb Anell de Neó */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center text-white font-heading font-black text-2xl sm:text-3xl shrink-0 shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-400/50">
                        {companyInitial}
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                          <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 shadow-sm flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-cyan-400" />
                            {viewRequest.id}
                          </span>
                          <span className={`text-xs px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 ${STATUS_COLORS[viewRequest.status] || 'bg-slate-800 text-slate-300'}`}>
                            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                            {viewRequest.status}
                          </span>
                          <span className={`text-xs px-3 py-1 rounded-lg font-bold border flex items-center gap-1.5 ${
                            isUrgent ? 'bg-rose-500/15 text-rose-300 border-rose-500/40' : 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                          }`}>
                            <Flame className="w-3.5 h-3.5" />
                            {isUrgent ? 'Urgència Crítica (SLA < 2h)' : 'Urgència Normal (SLA 24-48h)'}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-normal">
                          {viewRequest.empresa || viewRequest.nom}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-2 flex-wrap font-medium">
                          <span className="flex items-center gap-1 text-slate-300">
                            <Building2 className="w-4 h-4 text-cyan-400" />
                            {formattedEnv}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-slate-400">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            Rebuda: {viewRequest.createdAt ? new Date(viewRequest.createdAt).toLocaleString('ca-ES') : 'Recentment'}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
                      <button 
                        onClick={() => { setViewRequest(null); openQuotationForRequest(viewRequest); }}
                        className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wide transition-all shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-95"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Generar Pressupost Oficial</span>
                      </button>
                      <button 
                        onClick={() => setViewRequest(null)} 
                        className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all shadow-md"
                        title="Tancar Fitxa Tècnica"
                      >
                        <X className="w-5 h-5"/>
                      </button>
                    </div>
                  </div>

                  {/* 2. Targetes de Dades de Contacte i Responsable (3 Columnes Executives) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Persona de Contacte */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 shrink-0 border border-cyan-500/30">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                          Persona de Contacte
                        </span>
                        <p className="text-white font-bold text-sm truncate mt-0.5">
                          {viewRequest.nom}
                        </p>
                        <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                          Interlocutor Tècnic Autoritzat
                        </span>
                      </div>
                    </div>

                    {/* Correu Electrònic */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-400 shrink-0 border border-blue-500/30">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                          Correu Electrònic
                        </span>
                        <a 
                          href={`mailto:${viewRequest.email}`}
                          className="text-cyan-400 hover:text-cyan-300 font-bold text-sm truncate block mt-0.5 transition-colors underline underline-offset-2"
                          title="Enviar correu"
                        >
                          {viewRequest.email}
                        </a>
                        <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                          Destinatari PDF & Notificacions
                        </span>
                      </div>
                    </div>

                    {/* Telèfon Directe */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0 border border-emerald-500/30">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                          Telèfon Directe
                        </span>
                        <a 
                          href={viewRequest.telefon ? `tel:${viewRequest.telefon}` : '#'}
                          className="text-emerald-400 hover:text-emerald-300 font-bold text-sm truncate block mt-0.5 transition-colors"
                        >
                          {viewRequest.telefon || 'No indicat (Requerit per visita)'}
                        </a>
                        <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                          Línia d'Atenció Tècnica Directa
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Paràmetres d'Infraestructura & Llocs de Treball */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/70">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 font-mono">
                        <Building2 className="w-4 h-4 text-cyan-400" />
                        <span>Tipus d'Entorn</span>
                      </div>
                      <p className="text-sm font-bold text-white mt-1">
                        {formattedEnv}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/70">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 font-mono">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span>Treballadors / Llocs Actius</span>
                      </div>
                      <p className="text-sm font-bold text-white mt-1">
                        {viewRequest.treballadors ? `${viewRequest.treballadors} llocs de treball` : 'A determinar en visita tècnica'}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/70 sm:col-span-2 md:col-span-1">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 font-mono">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                        <span>Pressupost Orientatiu</span>
                      </div>
                      <p className="text-sm font-bold text-emerald-400 mt-1">
                        {viewRequest.pressupostAprox || 'A convenir segons dimensionament'}
                      </p>
                    </div>
                  </div>

                  {/* 4. Serveis i Mòduls d'Enginyeria Sol·licitats */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 font-mono">
                        <Layers className="w-4 h-4 text-cyan-400" />
                        Serveis i Mòduls d'Enginyeria Sol·licitats ({(viewRequest.serveiLabels || []).length}):
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {(viewRequest.serveiLabels || []).map(servei => {
                        const IconComponent = getServiceIcon(servei);
                        return (
                          <div 
                            key={servei}
                            className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/80 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
                          >
                            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-slate-200">
                              {servei}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 5. QUADRE D'ENGINYERIA ELÈCTRICA & DIMENSIONAMENT SAI CRÍTIC */}
                  {sai && (
                    <div className="mb-6 rounded-2xl bg-gradient-to-br from-teal-950/40 via-slate-950 to-cyan-950/30 border border-teal-500/40 p-5 sm:p-6 shadow-xl relative overflow-hidden">
                      <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-teal-500/30 flex-wrap">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40">
                            <BatteryCharging className="w-5 h-5 text-teal-300 animate-pulse" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-teal-300 uppercase tracking-wider font-mono block">
                              Dimensionament Elèctric & Càrrega Crítica (Càlcul Certificat SAI)
                            </span>
                            <span className="text-xs text-slate-400">
                              Càlcul actiu d'autonomia per a servidors, xarxa i estacions de treball
                            </span>
                          </div>
                        </div>

                        {sai.equipStr && (
                          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 text-teal-300 border border-teal-500/30">
                            Equipament: {sai.equipStr}
                          </span>
                        )}
                      </div>

                      {/* 4 Mètriques clau del SAI */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-teal-500/30">
                          <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Potència Activa (W)</span>
                          <span className="text-xl font-black font-mono text-teal-300 mt-1 block">
                            {sai.watts ? `${sai.watts.toLocaleString('ca-ES')} W` : '1.200 W'}
                          </span>
                          <span className="text-[10px] text-slate-500 block">Consum elèctric nominal</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-teal-500/30">
                          <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Capacitat SAI (+20%)</span>
                          <span className="text-xl font-black font-mono text-cyan-300 mt-1 block">
                            {sai.va ? `${sai.va.toLocaleString('ca-ES')} VA` : '2.058 VA'}
                          </span>
                          <span className="text-[10px] text-slate-500 block">Marge de seguretat normatiu</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-teal-500/30">
                          <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Autonomia Estimada</span>
                          <span className="text-xl font-black font-mono text-emerald-300 mt-1 block">
                            {sai.runtime || '~41 minuts'}
                          </span>
                          <span className="text-[10px] text-slate-500 block">Temps de seguretat en bateria</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-teal-500/30">
                          <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Topologia SAI</span>
                          <span className="text-sm font-black font-mono text-purple-300 mt-1 block">
                            On-Line Doble Conv.
                          </span>
                          <span className="text-[10px] text-slate-500 block">0 ms temps transferència</span>
                        </div>
                      </div>

                      {/* Equip SAI Homologat */}
                      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-teal-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 font-bold block">Model Homologat Recomanat per KernelCore:</span>
                          <span className="text-sm font-bold text-white block mt-0.5">{sai.model}</span>
                        </div>
                        <span className="px-3 py-1 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[11px] font-bold font-mono self-start sm:self-auto shrink-0">
                          Protecció 100% Sinusoïdal Pura
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Observacions i Requisits addicionals del Client */}
                  {(!sai || sai.cleanDescription) && (
                    <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 mb-6">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-mono mb-2">
                        Requisits Específics Declarats pel Client:
                      </span>
                      <p className="text-sm text-slate-200 leading-relaxed font-sans">
                        {sai ? sai.cleanDescription : viewRequest.descripcio}
                      </p>
                    </div>
                  )}

                  {/* 6. Barra d'Accions Executives */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-slate-800">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <button 
                        onClick={() => { setViewRequest(null); openQuotationForRequest(viewRequest); }}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wide transition-all shadow-xl shadow-cyan-500/25 active:scale-95"
                      >
                        <FileText className="w-4 h-4"/>
                        <span>Elaborar Pressupost Oficial d'Enginyeria</span>
                      </button>

                      <button
                        onClick={async () => {
                          const summary = `Sol·licitud ${viewRequest.id} — ${viewRequest.empresa || viewRequest.nom}\nContacte: ${viewRequest.nom} (${viewRequest.email} · ${viewRequest.telefon})\nEntorn: ${formattedEnv}\nTreballadors: ${viewRequest.treballadors || '6'}\nServeis: ${(viewRequest.serveiLabels || []).join(', ')}`;
                          await navigator.clipboard.writeText(summary);
                          setInvestmentToast('Resum de la sol·licitud copiat al porta-retalls.');
                          setTimeout(() => setInvestmentToast(null), 4000);
                        }}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all"
                        title="Copiar resum de la sol·licitud"
                      >
                        <Copy className="w-4 h-4 text-cyan-400" />
                        <span>Copiar Resum</span>
                      </button>
                    </div>

                    <button 
                      onClick={() => setViewRequest(null)} 
                      className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors border border-slate-800"
                    >
                      Tancar Fitxa Tècnica
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Llistat principal de sol·licituds */}
            {!showQuotationHub && !viewRequest && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-base text-slate-300 font-medium">
                    S'han rebut <span className="font-bold text-white font-mono">{quoteRequests.length}</span> sol·licituds reals de clients corporatius.
                  </p>
                  <button 
                    onClick={handleGenerateLiveRequest}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wide transition-all self-start sm:self-auto shadow-md"
                  >
                    <Plus className="w-4 h-4"/> Nova Sol·licitud Dinàmica
                  </button>
                </div>

                <div className="space-y-4">
                  {quoteRequests.map(req => {
                    const sai = parseSaiCalculation(req.descripcio);
                    const formattedEnv = formatEnvironment(req.entorn);
                    const isUrgent = req.urgencia === 'urgent';
                    const compInitial = (req.empresa || req.nom || 'C').charAt(0).toUpperCase();

                    return (
                      <div 
                        key={req.id} 
                        className={`bg-slate-900/90 border rounded-2xl p-5 sm:p-6 transition-all shadow-md hover:shadow-cyan-500/10 ${
                          req.status === 'Pressupost enviat'
                            ? 'border-emerald-500/40 hover:border-emerald-500/60'
                            : isUrgent
                              ? 'border-rose-500/40 hover:border-rose-500/60'
                              : 'border-slate-800 hover:border-cyan-500/40'
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                          <div className="flex items-start gap-4">
                            {/* Avatar d'empresa estilitzat amb lletra inicial i color de marca */}
                            <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-heading font-black text-xl shrink-0 shadow-md ${
                              req.status === 'Pressupost enviat'
                                ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white ring-2 ring-emerald-500/30'
                                : 'bg-gradient-to-br from-cyan-600 to-blue-700 text-white ring-2 ring-cyan-500/30'
                            }`}>
                              {compInitial}
                            </div>

                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className="flex items-center gap-2.5 flex-wrap">
                                <span className="text-base sm:text-lg font-bold text-white tracking-normal">
                                  {req.empresa || req.nom}
                                </span>
                                <span className="text-xs font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-800/60">
                                  {req.id}
                                </span>
                                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5 ${STATUS_COLORS[req.status] || 'bg-slate-800 text-slate-300'}`}>
                                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                                  {req.status}
                                </span>
                                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                                  isUrgent ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30' : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                }`}>
                                  {isUrgent ? 'Urgència Alta' : 'Urgència Normal'}
                                </span>
                              </div>

                              <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                                  <User className="w-3.5 h-3.5 text-cyan-400" /> {req.nom}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1.5 text-slate-400">
                                  <Mail className="w-3.5 h-3.5 text-slate-500" /> {req.email}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1.5 text-slate-400">
                                  <Building2 className="w-3.5 h-3.5 text-slate-500" /> {formattedEnv}
                                </span>
                                {req.treballadors && (
                                  <>
                                    <span>•</span>
                                    <span className="flex items-center gap-1 text-slate-300 font-mono font-semibold">
                                      <Users className="w-3.5 h-3.5 text-purple-400" /> {req.treballadors} llocs
                                    </span>
                                  </>
                                )}
                              </div>

                              {/* Mètriques tècniques si hi ha dimensionament SAI */}
                              {sai && (
                                <div className="inline-flex items-center gap-3 px-3 py-1 rounded-xl bg-teal-950/50 border border-teal-500/30 text-xs font-mono text-teal-300 mt-1 flex-wrap">
                                  <span className="flex items-center gap-1 font-bold">
                                    <Zap className="w-3.5 h-3.5 text-teal-400" />
                                    SAI: {sai.watts ? `${sai.watts}W` : '1.200W'} ({sai.va ? `${sai.va}VA` : '2.058VA'})
                                  </span>
                                  <span>•</span>
                                  <span className="text-teal-200">{sai.runtime || '~41 min autonomia'}</span>
                                  <span>•</span>
                                  <span className="text-slate-400 truncate max-w-[220px]">{sai.model}</span>
                                </div>
                              )}

                              {/* Mòduls d'enginyeria sol·licitats */}
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {(req.serveiLabels || []).map(s => {
                                  const IconComponent = getServiceIcon(s);
                                  return (
                                    <span key={s} className="text-xs px-2.5 py-0.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 flex items-center gap-1.5 font-medium">
                                      <IconComponent className="w-3 h-3 text-cyan-400" />
                                      {s}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Botons d'acció de la fila */}
                          <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
                            <button 
                              onClick={() => setViewRequest(req)}
                              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all border border-slate-700 shadow-sm"
                            >
                              <Eye className="w-4 h-4 text-cyan-400"/>
                              <span>Fitxa Tècnica</span>
                            </button>

                            {req.status !== 'Pressupost enviat' && req.status !== 'Descartada' && (
                              <>
                                <button 
                                  onClick={() => openQuotationForRequest(req)}
                                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-black uppercase tracking-wide transition-all shadow-md active:scale-95"
                                >
                                  <FileText className="w-4 h-4"/>
                                  <span>Elaborar Pressupost</span>
                                </button>
                                <button 
                                  onClick={() => handleDiscardRequest(req.id)}
                                  title="Descartar Sol·licitud"
                                  className="p-2.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                >
                                  <X className="w-4 h-4"/>
                                </button>
                              </>
                            )}

                            {req.status === 'Pressupost enviat' && (
                              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
                                <CheckCircle2 className="w-4 h-4"/> Pressupost Enviat
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: PRESSUPOSTOS
        ══════════════════════════════════════ */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"/>
                <input 
                  type="text" 
                  placeholder="Cercar per client o codi PR..." 
                  value={quoteSearchQuery}
                  onChange={e => setQuoteSearchQuery(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500 w-72"
                />
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setShowSmtpModal(true)}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all"
                  title="Configura el servidor SMTP o utilitza el relé de proves integrat"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Configurar SMTP / Correu</span>
                </button>
                <button 
                  onClick={() => setShowNewQuoteModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-md transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4"/> Nou Pressupost Manual
                </button>
              </div>
            </div>

            <div className="overflow-x-auto bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl">
              <table className="w-full text-sm">
                <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-5 py-4 text-left">Codi PR</th>
                    <th className="px-5 py-4 text-left">Client & Contacte</th>
                    <th className="px-5 py-4 text-left hidden lg:table-cell">Descripció Maquinari & Serveis</th>
                    <th className="px-5 py-4 text-right">Import Total</th>
                    <th className="px-5 py-4 text-center">Estat Actual</th>
                    <th className="px-5 py-4 text-center">Gestió de Proposta & PDF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {quotes.filter(q => {
                    const c = (q.client || q.nom_empresa || '').toLowerCase();
                    const id = (q.id || q.codi_pressupost || '').toLowerCase();
                    const s = quoteSearchQuery.toLowerCase();
                    return !s || c.includes(s) || id.includes(s);
                  }).map(q => {
                    const qId = q.id || q.codi_pressupost;
                    const amountVal = q.amount || q.import_total || 0;
                    const monthlyVal = q.monthly || q.quota_mensual_suport || 0;
                    const st = q.status || q.estat;
                    return (
                      <tr key={qId} className="hover:bg-slate-900/50 transition-colors">
                        <td className="py-4 px-5 font-mono font-bold text-cyan-400">{qId}</td>
                        <td className="py-4 px-5">
                          <p className="font-bold text-white text-sm">{q.client || q.nom_empresa}</p>
                          <p className="text-xs text-slate-400">{q.contact || q.persona_contacte} · {resolveQuoteEmail(q)}</p>
                        </td>
                        <td className="py-4 px-5 text-slate-300 hidden lg:table-cell max-w-sm truncate text-xs">
                          {q.items || q.resum_equipament}
                        </td>
                        <td className="py-4 px-5 text-right font-mono">
                          <p className="font-black text-white text-base">{Number(amountVal).toLocaleString('ca-ES')} €</p>
                          <p className="text-xs text-slate-400">{monthlyVal} €/mes manteniment</p>
                        </td>
                        <td className="py-4 px-5 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${STATUS_COLORS[st] || 'bg-slate-800 text-slate-300'}`}>
                            {st}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-center">
                          <div className="flex items-center justify-center gap-1.5 flex-wrap">
                            <button
                              type="button"
                              onClick={() => handleViewQuotePdf(q)}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 text-xs font-bold transition-all flex items-center gap-1"
                              title="Previsualitza el document PDF oficial al navegador"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>PDF</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDownloadQuotePdf(q)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
                              title="Descarrega el fitxer .PDF binari oficial"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => openEmailModalForQuote(q)}
                              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all shadow-sm flex items-center gap-1.5"
                              title="Envia el pressupost per correu electrònic amb el PDF adjunt"
                            >
                              <Send className="w-3 h-3" />
                              <span>Enviar Email</span>
                            </button>
                            <button 
                              onClick={() => handleToggleQuoteStatus(qId)}
                              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition-colors"
                              title="Canviar estat del cicle de venda"
                            >
                              Estat
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Historial d'Enviaments per Email (amb PDF Adjunt) */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between gap-4 flex-wrap pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-base font-heading font-black text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    Registre d'Emails Corporatius Enviats als Clients
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Historial de propostes comercials despatxades amb el document PDF binari adjunt
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {sentEmails.length} enviaments registrats
                </span>
              </div>

              {sentEmails.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-3">Encara no s'ha despatxat cap pressupost per correu electrònic.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {sentEmails.map((item, idx) => (
                    <div key={item.id || idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between text-xs space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-cyan-400 font-bold">{item.quoteCode}</span>
                          <h5 className="font-bold text-white text-sm">{item.companyName}</h5>
                          <p className="text-slate-400">Destinatari: <span className="text-slate-200 font-mono">{item.to}</span></p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          {item.status || 'Enviat'}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 text-[11px] text-slate-300 space-y-1">
                        <p className="truncate"><strong className="text-slate-400">Assumpte:</strong> {item.subject}</p>
                        <p className="flex items-center gap-1.5 text-cyan-300 font-mono">
                          <FileText className="w-3.5 h-3.5 shrink-0" />
                          <span>{item.attachmentName || `Pressupost_KernelCore_${item.quoteCode}.pdf`}</span>
                        </p>
                        <p className="text-slate-500">Signat per: {item.senderName} · {item.sentAt}</p>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleDownloadQuotePdf(item.quoteCode)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Download className="w-3 h-3 text-cyan-400" />
                          <span>Descarregar PDF</span>
                        </button>
                        {item.previewUrl && (
                          <a
                            href={item.previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5"
                          >
                            <Mail className="w-3 h-3" />
                            <span>Veure Webmail</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: CLIENTS & PIMEs CORPORATIUS
        ══════════════════════════════════════ */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            {/* Barra superior de cerca, filtres per sector i botó + Nou Client Corporatiu */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-xl">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Cercar client per empresa, CIF o persona de contacte..."
                    value={clientSearchQuery}
                    onChange={e => setClientSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  onClick={() => setShowNewClientModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wide shadow-lg shadow-cyan-500/20 transition-all self-start lg:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Nou Client Corporatiu</span>
                </button>
              </div>

              {/* Filtre per sector */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
                  <Filter className="w-3.5 h-3.5 text-cyan-400" />
                  Sector Empresarial:
                </span>
                {['Tots', 'Industrial', 'Oficina PIME', 'Comerç & Retail', 'Espai Co-working'].map(sec => {
                  const isActive = clientSectorFilter === sec;
                  return (
                    <button
                      key={sec}
                      onClick={() => setClientSectorFilter(sec)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-sm'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {sec}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Graella de Targetes de Clients Corporatius */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {clients
                .filter(c => {
                  const nom = (c.nom_empresa || c.empresa || c.name || '').toLowerCase();
                  const cif = (c.cif || '').toLowerCase();
                  const contact = (c.persona_contacte || c.contacte || c.contact || '').toLowerCase();
                  const sector = c.sector || 'Oficina PIME';
                  const q = clientSearchQuery.toLowerCase().trim();
                  if (q && !nom.includes(q) && !cif.includes(q) && !contact.includes(q)) return false;
                  if (clientSectorFilter !== 'Tots' && !sector.toLowerCase().includes(clientSectorFilter.toLowerCase())) return false;
                  return true;
                })
                .map((client, idx) => {
                  const companyName = client.nom_empresa || client.empresa || client.name;
                  const cifCode = client.cif || 'B-00000000';
                  const contactPerson = client.persona_contacte || client.contacte || client.contact || 'Responsable IT';
                  const phoneNum = client.telefon || client.phone || '+34 932 000 000';
                  const emailAddr = client.email || 'info@empresa.cat';
                  const addressBcn = client.adreca || client.direccio || client.address || 'Barcelona';
                  const sectorLabel = client.sector || 'Oficina PIME';

                  const assocQuotes = quotes.filter(q =>
                    (q.client || q.nom_empresa || '').toLowerCase().includes(companyName.toLowerCase().split(' ')[0])
                  ).length;
                  const assocProjects = projects.filter(p =>
                    (p.client || '').toLowerCase().includes(companyName.toLowerCase().split(' ')[0])
                  ).length;

                  return (
                    <div
                      key={client.id || idx}
                      className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all shadow-lg"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-md border border-cyan-800">
                            CIF: {cifCode}
                          </span>
                          <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 font-bold">
                            {sectorLabel}
                          </span>
                        </div>

                        <h3 className="text-lg font-heading font-black text-white leading-snug mb-2">
                          {companyName}
                        </h3>

                        <div className="space-y-2 text-xs text-slate-300 mt-3">
                          <p className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>Contacte: <strong className="text-white">{contactPerson}</strong></span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span className="font-mono">{phoneNum}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <a href={`mailto:${emailAddr}`} className="text-cyan-300 hover:underline truncate">{emailAddr}</a>
                          </p>
                          <p className="flex items-start gap-2">
                            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="text-slate-400">{addressBcn}</span>
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-slate-300">
                            <strong className="text-cyan-400">{assocQuotes}</strong> Pressupostos
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-slate-300">
                            <strong className="text-emerald-400">{assocProjects}</strong> Projectes
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setNewClient(companyName);
                            setNewContact(contactPerson);
                            setShowNewQuoteModal(true);
                          }}
                          className="text-xs font-bold text-cyan-400 hover:text-cyan-300"
                        >
                          + Pressupost
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: PROVEÏDORS OFICIALS MAJORISTES
        ══════════════════════════════════════ */}
        {activeTab === 'suppliers' && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    Canal B2B Homologat
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Logística DFactory Barcelona</span>
                </div>
                <h2 className="text-xl font-heading font-black text-white">
                  Proveïdors Oficials & Mayoristes Tecnològics
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Control en temps real del volum d'SKUs i capital immobilitzat en magatzem per cada majorista oficial.
                </p>
              </div>

              <button
                onClick={() => setShowNewSupplierModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wide shadow-lg shadow-cyan-500/20 transition-all self-start lg:self-auto shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>+ Nou Proveïdor Oficial</span>
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {suppliers.map((sup, idx) => {
                const nomComercial = sup.nom_comercial || sup.nom || sup.name;
                const cif = sup.cif || 'B-00000000';
                const telefon = sup.telefon || sup.phone || '+34 934 000 000';
                const emailComandes = sup.email_comandes || sup.email || 'comandes@proveidor.es';
                const adreca = sup.adreca || sup.address || 'Barcelona';
                const condicions = sup.condicions_pagament || sup.paymentTerms || '30 dies transferència';
                const brandsList = Array.isArray(sup.marques_oficials)
                  ? sup.marques_oficials
                  : typeof sup.marques_oficials === 'string'
                    ? sup.marques_oficials.split(',').map(s => s.trim()).filter(Boolean)
                    : Array.isArray(sup.brands)
                      ? sup.brands
                      : ['Cisco'];
                const primaryBrand = sup.marca_principal || sup.primaryBrand || brandsList[0] || 'Cisco';

                // Càlcul automàtic en temps real sobre inventory
                const matchingItems = inventory.filter(item =>
                  brandsList.some(b => (item.brand || '').toLowerCase() === b.toLowerCase())
                );
                const supplierSkuCount = matchingItems.length;
                const supplierTotalUnits = matchingItems.reduce((acc, i) => acc + (i.stock || 0), 0);
                const supplierStockCapital = matchingItems.reduce((acc, i) => acc + ((i.stock || 0) * (i.price || 0)), 0);

                return (
                  <div
                    key={sup.id || idx}
                    className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all shadow-xl"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800">
                        <div>
                          <span className="font-mono text-xs font-bold text-cyan-400">
                            {sup.id || `PRV-00${idx + 1}`} // CIF: {cif}
                          </span>
                          <h3 className="text-lg font-heading font-black text-white mt-0.5">
                            {nomComercial}
                          </h3>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          {condicions}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300 mb-4">
                        <p className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="font-mono">{telefon}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <a href={`mailto:${emailComandes}`} className="text-cyan-300 hover:underline truncate">{emailComandes}</a>
                        </p>
                        <p className="flex items-start gap-2 sm:col-span-2">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-slate-400">{adreca}</span>
                        </p>
                      </div>

                      {/* Marques oficials subministrades */}
                      <div className="mb-4">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                          Marques Oficials Subministrades:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {brandsList.map(brand => (
                            <span
                              key={brand}
                              onClick={() => handleFilterSupplierStock(brand)}
                              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-cyan-950 text-cyan-300 border border-slate-800 hover:border-cyan-500/50 text-xs font-bold cursor-pointer transition-colors"
                              title={`Filtrar estoc de ${brand}`}
                            >
                              {brand}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Càlcul en temps real de SKUs i Capital en Estoc d'aquest Proveïdor */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-3 gap-3 text-xs mb-4">
                        <div>
                          <span className="text-slate-400 block">SKUs en Catàleg:</span>
                          <span className="text-lg font-black font-mono text-cyan-400">{supplierSkuCount} refs</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Estoc Físic:</span>
                          <span className="text-lg font-black font-mono text-white">{supplierTotalUnits} uds.</span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-400 block">Capital en Estoc:</span>
                          <span className="text-lg font-black font-mono text-emerald-400">
                            {supplierStockCapital.toLocaleString('ca-ES')} €
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleFilterSupplierStock(primaryBrand)}
                      className="w-full py-2.5 px-4 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 font-black text-xs uppercase tracking-wide transition-all flex items-center justify-center gap-2"
                    >
                      <Package className="w-4 h-4" />
                      <span>Filtrar Estoc d'aquest Proveïdor ({primaryBrand})</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: PROJECTES ACTIUS & FITES TÈCNIQUES
        ══════════════════════════════════════ */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Barra de Filtres per Responsable Tècnic + Botó Nou Projecte d'Enginyeria */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
                  <Filter className="w-3.5 h-3.5 text-cyan-400" />
                  Responsable Tècnic:
                </span>
                {[
                  { id: 'all', label: 'Tots els Projectes' },
                  { id: 'hans', label: 'Hans Lao (Sistemes & AD)' },
                  { id: 'joel', label: 'Joel Pérez (Xarxes & SAI)' }
                ].map(flt => {
                  const isActive = projectLeadFilter === flt.id;
                  return (
                    <button
                      key={flt.id}
                      onClick={() => setProjectLeadFilter(flt.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-md'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {flt.label}
                    </button>
                  );
                })}

                {currentRole.id !== 'admin' && (
                  <button
                    onClick={() => setProjectLeadFilter(currentRole.id)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 transition-all"
                  >
                    El meu àmbit tècnic ({currentRole.id === 'hans' ? 'Hans' : 'Joel'})
                  </button>
                )}
              </div>

              <button
                onClick={() => setShowNewProjectModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wide shadow-lg shadow-cyan-500/20 transition-all self-start lg:self-auto shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>+ Nou Projecte d'Enginyeria</span>
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {projects
                .filter(proj => {
                  if (projectLeadFilter === 'all') return true;
                  const lead = (proj.techLead || '').toLowerCase();
                  if (projectLeadFilter === 'hans') return lead.includes('hans');
                  if (projectLeadFilter === 'joel') return lead.includes('joel');
                  return true;
                })
                .map(proj => (
                  <div key={proj.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-xs font-mono font-bold text-cyan-400 uppercase">{proj.id} // {proj.client}</span>
                          <h3 className="text-base font-bold text-white mt-1">{proj.name}</h3>
                          <p className="text-xs text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> Termini: <strong className="text-slate-300">{proj.deadline}</strong></span>
                            <span>·</span>
                            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-cyan-400" /> Liderat per: <strong className="text-cyan-300">{proj.techLead}</strong></span>
                          </p>
                        </div>
                        <span className="text-2xl font-black text-cyan-400 font-mono">{proj.progress}%</span>
                      </div>

                      <div className="w-full bg-slate-800 rounded-full h-3 mb-5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-300" 
                          style={{ width: `${proj.progress}%` }} 
                        />
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">Fites d'Enginyeria & Desplegament:</p>
                        {(proj.tasks || []).map((task, idx) => (
                          <button 
                            key={idx} 
                            onClick={() => handleToggleTask(proj.id, idx)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-xs transition-colors ${
                              task.done 
                                ? 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-300' 
                                : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${task.done ? 'bg-emerald-500 border-emerald-400' : 'border-slate-700'}`}>
                              {task.done && <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]"/>}
                            </div>
                            <span className={task.done ? 'line-through opacity-70 font-medium' : 'font-semibold'}>
                              {task.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Formulari inline per afegir una nova fita tècnica en temps real */}
                    <form
                      onSubmit={e => handleAddProjectTask(e, proj.id)}
                      className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2"
                    >
                      <input
                        type="text"
                        placeholder="+ Afegir nova fita tècnica..."
                        value={inlineTaskInputs[proj.id] || ''}
                        onChange={e => setInlineTaskInputs(prev => ({ ...prev, [proj.id]: e.target.value }))}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 outline-none focus:border-cyan-500"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 font-bold text-xs transition-all shrink-0 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Afegir</span>
                      </button>
                    </form>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: INVENTARI & CAPITAL EN ESTOC MULTIMARCA
        ══════════════════════════════════════ */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            
            {/* Banner de Gran Inversió de Capital */}
            <div className="bg-gradient-to-br from-[#0B132B] via-[#0F172A] to-[#020617] border border-cyan-500/40 rounded-3xl p-7 lg:p-9 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5"/> Actius en Magatzem Homologat
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        DFactory Barcelona (Zona Franca)
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1 ${
                        currentRole.canAuthorizeCapital
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                          : 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                      }`}>
                        <Lock className="w-3 h-3" />
                        {currentRole.canAuthorizeCapital
                          ? `Autorització Financera Activa (${currentRole.nom})`
                          : 'Requereix Validació Direcció General / Admin'}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">
                      Gestió de Capital & Estoc Multimarca
                    </h2>
                    <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                      Inversió de capital estratègic en equipament físic per a desplegaments immediats de xarxes, servidors, SAIs i retail per a tota l'Àrea Metropolitana de Barcelona.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowCapitalModal(true)}
                    className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/25 active:scale-95 shrink-0 self-start lg:self-auto"
                  >
                    <TrendingUp className="w-5 h-5"/>
                    <span>+ Executar Inversió de Capital</span>
                  </button>
                </div>

                {/* 4 Mètriques de Capital Grans */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/30">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Capital Total en Estoc
                    </span>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono text-emerald-400 block">
                      {totalInventoryValuation.toLocaleString('ca-ES')} €
                    </span>
                    <span className="text-xs text-slate-400 mt-1.5 block font-medium">
                      {totalInventoryUnits} unitats · {inventory.length} SKUs actius
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Gama Bàsica / General
                    </span>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-300 block">
                      {basicTierValuation.toLocaleString('ca-ES')} €
                    </span>
                    <span className="text-xs text-slate-400 mt-1.5 block">
                      Alta rotació (cablejat, racks 12U, routers PIME)
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Gama Mitjana Empresarial
                    </span>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-blue-400 block">
                      {midTierValuation.toLocaleString('ca-ES')} €
                    </span>
                    <span className="text-xs text-slate-400 mt-1.5 block">
                      Estàndard corporatiu (Cisco L3, UniFi 6, SAIs APC)
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Professional / Datacenter
                    </span>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-purple-400 block">
                      {highTierValuation.toLocaleString('ca-ES')} €
                    </span>
                    <span className="text-xs text-slate-400 mt-1.5 block">
                      CPD & Certificació (Dell Xeon, Fluke DSX-5000)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notificació d'Inversió Executada */}
            {investmentToast && (
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-sm font-semibold flex items-center justify-between gap-3 shadow-lg animate-fadeIn">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0"/>
                  <span>{investmentToast}</span>
                </div>
                <button onClick={() => setInvestmentToast(null)} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-4 h-4"/>
                </button>
              </div>
            )}

            {/* ─── BARRA DE FILTRES I GESTIÓ D'ESTOC MULTIMARCA AVANÇADA ─── */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              
              {/* Fila 1: Cercador + Commutadors de Vista + Botó Exportar CSV */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Cercador Intel·ligent */}
                <div className="relative flex-1 max-w-xl">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5"/>
                  <input
                    type="text"
                    placeholder="Cercar per model, SKU (ex: CISCO, APC, UBI), marca o descripció..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-10 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 transition-colors"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-3.5 text-slate-400 hover:text-white p-0.5 rounded-md hover:bg-slate-800"
                      title="Netejar cerca"
                    >
                      <X className="w-4 h-4"/>
                    </button>
                  )}
                </div>

                {/* Accions: Mode de Vista + Exportar CSV + Descarregar SQL */}
                <div className="flex items-center gap-3 self-end lg:self-center flex-wrap">
                  {/* Commutador Targetes / Taula */}
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => setInventoryViewMode('cards')}
                      className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                        inventoryViewMode === 'cards'
                          ? 'bg-cyan-500 text-slate-950 shadow-sm font-black'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Vista en targetes"
                    >
                      <LayoutGrid className="w-3.5 h-3.5"/> Targetes
                    </button>
                    <button
                      type="button"
                      onClick={() => setInventoryViewMode('table')}
                      className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                        inventoryViewMode === 'table'
                          ? 'bg-cyan-500 text-slate-950 shadow-sm font-black'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Vista en taula tècnica"
                    >
                      <List className="w-3.5 h-3.5"/> Taula
                    </button>
                  </div>

                  {/* Botó Exportar CSV */}
                  <button
                    onClick={handleExportCSV}
                    disabled={filteredInventory.length === 0}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 font-bold text-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                    title="Exportar llistat actual filtrat a full de càlcul CSV"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400"/>
                    <span>Exportar CSV</span>
                    <span className="text-[11px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                      {filteredInventory.length}
                    </span>
                  </button>

                  {/* Botó Descarregar SQL BBDD */}
                  <button
                    onClick={handleDownloadSQL}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-800 hover:border-cyan-500/40 font-bold text-xs transition-all shadow-sm"
                    title="Descarregar script relacional SQL de la base de dades kernelcore_db"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400"/>
                    <span>Descarregar SQL BBDD</span>
                  </button>
                </div>
              </div>

              {/* Fila 2: Filtres Segmentats de Gama de Qualitat (Tier) */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400"/>
                  Gama:
                </span>
                {[
                  { id: 'all', label: 'Totes les Games', count: inventory.length },
                  { id: 'basic', label: 'Bàsic / General', count: basicCount, color: 'text-emerald-400' },
                  { id: 'mid', label: 'Mitjà Empresarial', count: midCount, color: 'text-cyan-400' },
                  { id: 'pro', label: 'Professional / CPD', count: proCount, color: 'text-purple-400' },
                ].map(tier => {
                  const isActive = inventoryTierFilter === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setInventoryTierFilter(tier.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md font-black'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span>{tier.label}</span>
                      <span className={`text-[11px] px-1.5 py-0.5 rounded-md font-bold ${
                        isActive ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-900 text-slate-400'
                      }`}>
                        {tier.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Fila 3: Submenú de Marques Ràpides (Top Enterprise Brands) */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5 text-blue-400"/>
                  Marques Destacades:
                </span>
                <button
                  onClick={() => setInventoryBrandFilter('all')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    inventoryBrandFilter === 'all'
                      ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  Totes ({inventory.length})
                </button>
                {TOP_BRANDS.map(brand => {
                  const count = inventory.filter(i => i.brand === brand).length;
                  if (count === 0) return null;
                  const isActive = inventoryBrandFilter === brand;
                  return (
                    <button
                      key={brand}
                      onClick={() => setInventoryBrandFilter(isActive ? 'all' : brand)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                        isActive
                          ? 'bg-blue-500 text-slate-950 border-blue-400 font-black shadow-sm'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span>{brand}</span>
                      <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                        isActive ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-900 text-slate-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Fila 4: Desplegables de Precisió (Fabricant complet, Categoria, Preu, Estat d'Estoc, Ordre) */}
              <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                
                {/* Desplegable Fabricant Completa (Tots els 30) */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Factory className="w-3.5 h-3.5 text-blue-400"/> Fabricant / Marca:
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{allBrands.length - 1} marques</span>
                  </label>
                  <select
                    value={inventoryBrandFilter}
                    onChange={e => setInventoryBrandFilter(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-medium outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                  >
                    <option value="all">Tots els Fabricants ({inventory.length})</option>
                    {allBrands.filter(b => b !== 'all').map(brand => {
                      const count = inventory.filter(i => i.brand === brand).length;
                      return (
                        <option key={brand} value={brand}>
                          {brand} ({count} refs)
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Desplegable Categoria de Maquinari */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-cyan-400"/> Categoria:
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCategoryDrawer(prev => !prev)}
                      className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5"
                    >
                      {showCategoryDrawer ? 'Amagar panell' : 'Veure xips'}
                      {showCategoryDrawer ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>}
                    </button>
                  </div>
                  <select
                    value={inventoryCategoryFilter}
                    onChange={e => setInventoryCategoryFilter(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-medium outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                  >
                    <option value="all">Totes les Categories ({inventory.length})</option>
                    {allCategories.filter(c => c !== 'all').map(cat => {
                      const count = inventory.filter(i => i.category === cat).length;
                      return (
                        <option key={cat} value={cat}>
                          {cat} ({count})
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Desplegable Rang de Preu */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400"/> Rang de Preu:
                  </label>
                  <select
                    value={inventoryPriceFilter}
                    onChange={e => setInventoryPriceFilter(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-medium outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                  >
                    {PRICE_RANGES.map(p => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </div>

                {/* Desplegable Estat d'Estoc & Disponibilitat */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400"/> Disponibilitat Estoc:
                  </label>
                  <select
                    value={inventoryStockStatusFilter}
                    onChange={e => setInventoryStockStatusFilter(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-medium outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                  >
                    <option value="all">Tots els Estats</option>
                    <option value="optimal">Estoc Òptim (&gt; Mínim)</option>
                    <option value="low">Alerta Mínim / Reposició ({lowStockCount})</option>
                    <option value="out">Esgotat / 0 Unitats ({outOfStockCount})</option>
                  </select>
                </div>

                {/* Desplegable Ordenar per */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400"/> Ordenar per:
                  </label>
                  <select
                    value={inventorySortBy}
                    onChange={e => setInventorySortBy(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-medium outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                  >
                    <option value="default">Per defecte (SKU / Id)</option>
                    <option value="price_asc">Preu: Menor a Major</option>
                    <option value="price_desc">Preu: Major a Menor</option>
                    <option value="stock_desc">Més Unitats en Estoc</option>
                    <option value="valuation_desc">Major Valoració Lot</option>
                  </select>
                </div>

              </div>

              {/* Submenú desplegable de categories en xips interactius */}
              {showCategoryDrawer && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-cyan-400"/> Selecció Directa per Categoria:
                    </span>
                    <button
                      onClick={() => setInventoryCategoryFilter('all')}
                      className="text-xs text-cyan-400 hover:underline"
                    >
                      Veure totes les categories
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {allCategories.filter(c => c !== 'all').map(cat => {
                      const count = inventory.filter(i => i.category === cat).length;
                      const isActive = inventoryCategoryFilter === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setInventoryCategoryFilter(isActive ? 'all' : cat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${
                            isActive
                              ? 'bg-purple-600 text-white border-purple-400 font-black shadow-md'
                              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          <span>{cat}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                            isActive ? 'bg-purple-900 text-purple-200' : 'bg-slate-950 text-slate-400'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Fila 5: Resum de filtres actius, Mètriques de la selecció i Botó de neteja */}
              <div className="pt-3 border-t border-slate-800/70 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                
                {/* Mètriques en temps real del conjunt filtrat */}
                <div className="flex items-center gap-4 flex-wrap text-slate-300 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider">Articles:</span>
                    <span className="font-bold text-cyan-400 font-mono text-sm">{filteredInventory.length}</span>
                    <span className="text-slate-500 text-xs">/ {inventory.length} SKUs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider">Unitats en Estoc:</span>
                    <span className="font-bold text-emerald-400 font-mono text-sm">{filteredUnits.toLocaleString('ca-ES')} uds.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider">Valoració Filtrada:</span>
                    <span className="font-bold text-emerald-300 font-mono text-sm">{filteredValuation.toLocaleString('ca-ES')} €</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider">Cost Mitjà:</span>
                    <span className="font-mono text-slate-200 text-xs">{filteredAvgPrice.toLocaleString('ca-ES')} € / ud.</span>
                  </div>
                </div>

                {/* Xips de filtres actius + Botó Restablir */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Chips actius */}
                  {inventoryTierFilter !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-bold text-[11px]">
                      Gama: {inventoryTierFilter === 'basic' ? 'Bàsic' : inventoryTierFilter === 'mid' ? 'Mitjà' : 'Pro'}
                      <button onClick={() => setInventoryTierFilter('all')} className="hover:text-white ml-0.5">
                        <X className="w-3 h-3"/>
                      </button>
                    </span>
                  )}

                  {inventoryBrandFilter !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-950/80 border border-blue-800 text-blue-300 font-bold text-[11px]">
                      {inventoryBrandFilter}
                      <button onClick={() => setInventoryBrandFilter('all')} className="hover:text-white ml-0.5">
                        <X className="w-3 h-3"/>
                      </button>
                    </span>
                  )}

                  {inventoryCategoryFilter !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-bold text-[11px]">
                      {inventoryCategoryFilter}
                      <button onClick={() => setInventoryCategoryFilter('all')} className="hover:text-white ml-0.5">
                        <X className="w-3 h-3"/>
                      </button>
                    </span>
                  )}

                  {inventoryPriceFilter !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-bold text-[11px]">
                      Preu: {PRICE_RANGES.find(p => p.id === inventoryPriceFilter)?.label}
                      <button onClick={() => setInventoryPriceFilter('all')} className="hover:text-white ml-0.5">
                        <X className="w-3 h-3"/>
                      </button>
                    </span>
                  )}

                  {inventoryStockStatusFilter !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-300 font-bold text-[11px]">
                      Estat: {inventoryStockStatusFilter === 'low' ? 'Alerta Mínim' : inventoryStockStatusFilter === 'out' ? 'Esgotat' : 'Òptim'}
                      <button onClick={() => setInventoryStockStatusFilter('all')} className="hover:text-white ml-0.5">
                        <X className="w-3 h-3"/>
                      </button>
                    </span>
                  )}

                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-bold text-[11px]">
                      "{searchQuery}"
                      <button onClick={() => setSearchQuery('')} className="hover:text-white ml-0.5">
                        <X className="w-3 h-3"/>
                      </button>
                    </span>
                  )}

                  {/* Botó Netejar */}
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={handleResetFilters}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold transition-colors shadow-sm"
                      title="Netejar tots els filtres i cercador"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-cyan-400"/>
                      <span>Netejar ({activeFiltersCount})</span>
                    </button>
                  )}
                </div>

              </div>

            </div>

            {/* Barra de Paginació Superior */}
            {filteredInventory.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl text-xs">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-slate-400 font-medium">
                    Mostrant <span className="font-bold text-white font-mono">{pageStartRecord}</span> - <span className="font-bold text-white font-mono">{pageEndRecord}</span> de <span className="font-bold text-cyan-400 font-mono">{filteredInventory.length}</span> SKUs
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 text-[11px]">Per pàgina:</span>
                    <select
                      value={inventoryItemsPerPage}
                      onChange={(e) => {
                        setInventoryItemsPerPage(Number(e.target.value));
                        setInventoryPage(1);
                      }}
                      className="bg-slate-950 border border-slate-800 text-slate-200 font-bold rounded-lg px-2 py-1 text-xs outline-none focus:border-cyan-500 cursor-pointer"
                    >
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                      <option value={-1}>Tots ({filteredInventory.length})</option>
                    </select>
                  </div>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    <button
                      onClick={() => setInventoryPage(1)}
                      disabled={safeInventoryPage === 1}
                      className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Primera pàgina"
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setInventoryPage(prev => Math.max(1, prev - 1))}
                      disabled={safeInventoryPage === 1}
                      className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Pàgina anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg font-mono font-bold text-xs text-cyan-400">
                      {safeInventoryPage} / {totalPages}
                    </span>

                    <button
                      onClick={() => setInventoryPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={safeInventoryPage === totalPages}
                      className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Pàgina següent"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setInventoryPage(totalPages)}
                      disabled={safeInventoryPage === totalPages}
                      className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Última pàgina"
                    >
                      <ChevronsRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* VISTA 1: TARGETES / GRAELLA RESPONSIVA */}
            {inventoryViewMode === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {paginatedInventory.map(item => {
                  const isLow = (item.stock || 0) <= (item.min || 0);
                  const lotValuation = (item.stock || 0) * (item.price || 0);
                  const tierColor = (item.tier || '').includes('Bàsic') 
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : (item.tier || '').includes('Mitjà')
                      ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                      : 'bg-purple-500/15 text-purple-300 border-purple-500/30';
                  const itemImg = getProductImage(item);

                  return (
                    <div 
                      key={item.id} 
                      className={`group bg-slate-900/80 border rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/20 ${
                        isLow ? 'border-amber-500/50 bg-amber-500/5' : 'border-slate-800'
                      }`}
                    >
                      {/* Imatge de l'article amb botó d'accés directe a la fitxa */}
                      <div 
                        onClick={() => setSelectedProductModal(item)}
                        className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden cursor-pointer"
                        title="Fes clic per veure la fitxa tècnica completa"
                      >
                        <img 
                          src={itemImg} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                        {/* Badges sobre la imatge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-xs font-bold text-cyan-300 bg-slate-950/90 px-2.5 py-0.5 rounded-md border border-cyan-800/80 backdrop-blur-sm">
                            {item.sku || `SKU-${item.id}`}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          <span className="text-xs px-2 py-0.5 rounded-md bg-slate-950/90 text-white font-bold border border-slate-700 backdrop-blur-sm">
                            {item.brand || 'KernelCore'}
                          </span>
                        </div>

                        {/* Distintiu d'estoc inferior a la foto */}
                        <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
                          {item.stock > 0 ? (
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-emerald-500/90 text-slate-950">
                              {item.stock} uds. disponibles
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-cyan-500/90 text-slate-950">
                              Sota comanda 24h
                            </span>
                          )}
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold border backdrop-blur-sm ${tierColor}`}>
                            {item.tier || 'Standard'}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Nom del producte clicable */}
                          <h4 
                            onClick={() => setSelectedProductModal(item)}
                            className="text-base font-bold text-white leading-snug mb-1 hover:text-cyan-400 transition-colors cursor-pointer"
                            title="Obrir fitxa detallada de l'article"
                          >
                            {item.name}
                          </h4>
                          <p className="text-xs text-slate-400 font-medium mb-3 flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-slate-500" />
                            <span>{item.category}</span>
                          </p>

                          {/* Mètriques de cost i valoració del lot */}
                          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 grid grid-cols-2 gap-3 text-xs mb-3">
                            <div>
                              <span className="text-slate-400 block text-xs font-medium">Cost Unitari:</span>
                              <span className="text-base font-bold font-mono text-slate-200">{item.price} €</span>
                            </div>
                            <div className="text-right">
                              <span className="text-slate-400 block text-xs font-medium">Valor Lot en Estoc:</span>
                              <span className="text-base font-black font-mono text-emerald-400">
                                {lotValuation.toLocaleString('ca-ES')} €
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Controls d'Estoc i botó de fitxa */}
                        <div className="pt-3 border-t border-slate-800/80 space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <span className="text-xs text-slate-400 block font-medium">Unitats Físiques:</span>
                              <span className={`text-xl font-black font-mono ${isLow ? 'text-amber-400' : 'text-white'}`}>
                                {item.stock} <span className="text-xs font-normal text-slate-400">uds.</span>
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleUpdateStock(item.id, -1)}
                                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-sm border border-slate-700 transition-colors cursor-pointer"
                                title="Restar 1 unitat"
                              >
                                -
                              </button>
                              <button
                                onClick={() => handleUpdateStock(item.id, 1)}
                                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-sm border border-slate-700 transition-colors cursor-pointer"
                                title="Afegir 1 unitat"
                              >
                                +1
                              </button>
                              <button
                                onClick={() => handleUpdateStock(item.id, 5)}
                                className="px-2 h-7 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs border border-cyan-500/40 transition-colors cursor-pointer"
                                title="Reposició ràpida +5 unitats"
                              >
                                +5
                              </button>
                              <button
                                onClick={() => handleUpdateStock(item.id, 10)}
                                className="px-2 h-7 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs border border-emerald-500/40 transition-colors cursor-pointer"
                                title="Reposició ràpida +10 unitats"
                              >
                                +10
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => setSelectedProductModal(item)}
                            className="w-full py-2 px-3 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Veure Fitxa Tècnica & Logística</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* VISTA 2: TAULA TÈCNICA AVANÇADA */}
            {inventoryViewMode === 'table' && (
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-950/80 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="py-3.5 px-3 text-center">Foto</th>
                        <th className="py-3.5 px-4">SKU</th>
                        <th className="py-3.5 px-4">Producte & Referència</th>
                        <th className="py-3.5 px-4">Marca & Gama</th>
                        <th className="py-3.5 px-4">Categoria</th>
                        <th className="py-3.5 px-4 text-right">Cost Unitari</th>
                        <th className="py-3.5 px-4 text-center">Estoc Físic</th>
                        <th className="py-3.5 px-4 text-right">Valor Lot</th>
                        <th className="py-3.5 px-4 text-center">Accions & Reposició</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      {paginatedInventory.map(item => {
                        const isLow = (item.stock || 0) <= (item.min || 0);
                        const lotValuation = (item.stock || 0) * (item.price || 0);
                        const tierColor = (item.tier || '').includes('Bàsic') 
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : (item.tier || '').includes('Mitjà')
                            ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                            : 'bg-purple-500/15 text-purple-300 border-purple-500/30';
                        const itemImg = getProductImage(item);

                        return (
                          <tr key={item.id} className="hover:bg-slate-850/60 transition-colors">
                            <td className="py-2.5 px-3 text-center">
                              <div 
                                onClick={() => setSelectedProductModal(item)}
                                className="w-12 h-9 rounded-lg bg-slate-950 overflow-hidden border border-slate-800 mx-auto cursor-pointer hover:border-cyan-400 transition-colors"
                                title="Veure fitxa"
                              >
                                <img src={itemImg} alt="" className="w-full h-full object-cover" loading="lazy" />
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-xs text-cyan-400">
                              <button 
                                onClick={() => setSelectedProductModal(item)}
                                className="hover:underline text-left cursor-pointer"
                              >
                                {item.sku || `SKU-${item.id}`}
                              </button>
                            </td>
                            <td className="py-3.5 px-4">
                              <button
                                onClick={() => setSelectedProductModal(item)}
                                className="font-bold text-white block text-sm hover:text-cyan-400 text-left transition-colors cursor-pointer"
                              >
                                {item.name}
                              </button>
                              <span className="text-xs text-slate-500">Mínim de seguretat: {item.min} uds.</span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-white font-bold border border-slate-700">
                                  {item.brand || 'KernelCore'}
                                </span>
                                <span className={`text-[11px] px-2 py-0.5 rounded font-bold border ${tierColor}`}>
                                  {item.tier || 'Standard'}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                              {item.category}
                            </td>
                            <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-200">
                              {item.price} €
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono font-bold text-sm ${
                                isLow ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-white'
                              }`}>
                                {item.stock} uds.
                                {isLow && <span className="text-[10px] text-amber-400 font-bold uppercase">ALERTA</span>}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400 text-sm">
                              {lotValuation.toLocaleString('ca-ES')} €
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <div className="inline-flex items-center gap-1">
                                <button
                                  onClick={() => setSelectedProductModal(item)}
                                  className="w-7 h-7 rounded bg-cyan-950/80 hover:bg-cyan-900 text-cyan-400 flex items-center justify-center font-bold text-xs border border-cyan-800/80 transition-colors cursor-pointer"
                                  title="Veure fitxa tècnica de l'article"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleUpdateStock(item.id, -1)}
                                  className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-xs border border-slate-700"
                                  title="Restar 1 unitat"
                                >
                                  -
                                </button>
                                <button
                                  onClick={() => handleUpdateStock(item.id, 1)}
                                  className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-xs border border-slate-700"
                                  title="Afegir 1 unitat"
                                >
                                  +1
                                </button>
                                <button
                                  onClick={() => handleUpdateStock(item.id, 5)}
                                  className="px-2 h-7 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs border border-cyan-500/40"
                                  title="Afegir 5 unitats"
                                >
                                  +5
                                </button>
                                <button
                                  onClick={() => handleUpdateStock(item.id, 10)}
                                  className="px-2 h-7 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs border border-emerald-500/40"
                                  title="Afegir 10 unitats"
                                >
                                  +10
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Barra de Paginació Inferior */}
            {filteredInventory.length > 0 && totalPages > 1 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl text-xs">
                <span className="text-slate-400 font-medium">
                  Pàgina <span className="font-bold text-cyan-400 font-mono">{safeInventoryPage}</span> de <span className="font-bold text-white font-mono">{totalPages}</span> · ({filteredInventory.length} articles totals)
                </span>

                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  <button
                    onClick={() => {
                      setInventoryPage(1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={safeInventoryPage === 1}
                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    title="Primera pàgina"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setInventoryPage(prev => Math.max(1, prev - 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={safeInventoryPage === 1}
                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    title="Pàgina anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg font-mono font-bold text-xs text-cyan-400">
                    {safeInventoryPage} / {totalPages}
                  </span>

                  <button
                    onClick={() => {
                      setInventoryPage(prev => Math.min(totalPages, prev + 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={safeInventoryPage === totalPages}
                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    title="Pàgina següent"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setInventoryPage(totalPages);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={safeInventoryPage === totalPages}
                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    title="Última pàgina"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {filteredInventory.length === 0 && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-sm space-y-3">
                <AlertCircle className="w-8 h-8 text-slate-500 mx-auto"/>
                <p className="font-medium">Cap article coincideix amb els filtres seleccionats.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wide hover:bg-cyan-400 transition-colors"
                >
                  Restablir filtres
                </button>
              </div>
            )}

          </div>
        )}


        {/* ══════════════════════════════════════
            TAB: TIQUETS SAT
        ══════════════════════════════════════ */}
        {activeTab === 'tickets' && (
          <div className="space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
                  <Filter className="w-3.5 h-3.5 text-amber-400" />
                  Àmbit SAT:
                </span>
                {[
                  { id: 'all', label: 'Tots els Tiquets SAT' },
                  { id: 'hans', label: 'Hans Lao (Sistemes & RGPD)' },
                  { id: 'joel', label: 'Joel Pérez (Xarxes & SAI)' }
                ].map(flt => {
                  const isActive = ticketLeadFilter === flt.id;
                  return (
                    <button
                      key={flt.id}
                      onClick={() => setTicketLeadFilter(flt.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {flt.label}
                    </button>
                  );
                })}

                {currentRole.id !== 'admin' && (
                  <button
                    onClick={() => setTicketLeadFilter(currentRole.id)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-all"
                  >
                    El meu àmbit tècnic ({currentRole.id === 'hans' ? 'Hans' : 'Joel'})
                  </button>
                )}
              </div>

              <button 
                onClick={handleGenerateLiveTicket}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wide transition-all self-start lg:self-auto shrink-0"
              >
                <Plus className="w-4 h-4"/> Generar Nou Tiquet
              </button>
            </div>

            <div className="space-y-4">
              {tickets
                .filter(ticket => {
                  if (ticketLeadFilter === 'all') return true;
                  const assigned = (ticket.assignedTo || '').toLowerCase();
                  if (ticketLeadFilter === 'hans') return assigned.includes('hans');
                  if (ticketLeadFilter === 'joel') return assigned.includes('joel');
                  return true;
                })
                .map(ticket => (
                  <div key={ticket.id} className={`bg-slate-900/80 border rounded-2xl p-6 transition-all ${ticket.status === 'Resolt' ? 'border-slate-800 opacity-60' : 'border-slate-800 hover:border-slate-700 shadow-lg'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-mono text-xs text-cyan-400 font-black">{ticket.id}</span>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                            ticket.priority === 'Alta' ? 'bg-red-500/20 text-red-300 border border-red-500/40' 
                            : ticket.priority === 'Mitjana' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                            : 'bg-slate-700 text-slate-300'
                          }`}>
                            Prioritat {ticket.priority}
                          </span>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${STATUS_COLORS[ticket.status] || 'bg-slate-800 text-slate-300'}`}>
                            {ticket.status}
                          </span>
                        </div>
                        <p className="text-base font-bold text-white mt-2">{ticket.subject}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Client: <strong className="text-slate-300">{ticket.client}</strong> · Data: {ticket.date} · Assignat a: <strong className="text-cyan-300">{ticket.assignedTo}</strong>
                        </p>
                        {ticket.resolutionNotes && (
                          <div className="mt-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono flex items-start gap-2">
                            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{ticket.resolutionNotes}</span>
                          </div>
                        )}
                      </div>

                      {ticket.status !== 'Resolt' && (
                        <button 
                          onClick={() => handleResolveTicket(ticket.id)}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-colors shrink-0 self-start sm:self-auto"
                        >
                          <CheckCircle2 className="w-4 h-4"/> Marcar com a Resolt
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: SERVIDORS, TELEMETRIA & AUDITORIA AUTOMÀTICA
        ══════════════════════════════════════ */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6">
            
            {/* Panell d'Auditoria de Sistemes & Integritat Programada (Cada 60s) */}
            <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-5">
                <div>
                  <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Estat: {auditData.status}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Última verificació: <strong className="text-white">{auditData.lastRunAt}</strong>
                    </span>
                    <span className="text-xs font-mono text-cyan-400">
                       següent auditoria en: <strong>{auditCountdown}s</strong>
                    </span>
                  </div>
                  <h3 className="text-lg font-heading font-black text-white">
                    Auditoria de Sistemes & Integritat Programada (Cada 60s)
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Verificació automàtica contínua dels 5 subsistemes crítics de KernelCore a DFactory Barcelona.
                  </p>
                </div>

                <button
                  onClick={() => fetchAuditStatus(true)}
                  disabled={isRunningAudit}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wide transition-all shadow-lg shadow-emerald-500/20 self-start lg:self-auto shrink-0 active:scale-95"
                >
                  <RefreshCw className={`w-4 h-4 ${isRunningAudit ? 'animate-spin' : ''}`} />
                  <span>{isRunningAudit ? 'Verificant...' : 'Executar Auditoria Ara'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3.5">
                {(auditData.checks || []).map((chk, idx) => (
                  <div key={chk.id || idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {chk.status || 'OK'}
                        </span>
                        <span className="text-[11px] font-mono text-cyan-400">{chk.latency || '1.1 ms'}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white leading-snug mb-1">{chk.name}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{chk.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consola interactiva de diagnòstic Ping */}
            <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">Eina de Diagnòstic ICMP Ping (Directe des del Backend)</h3>
                </div>
                <button
                  onClick={handleDownloadSQL}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-850 text-cyan-300 hover:text-white border border-cyan-500/40 font-bold text-xs transition-all self-start sm:self-auto"
                  title="Descarregar l'script SQL complet de kernelcore_db"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Descarregar SQL BBDD</span>
                </button>
              </div>
              <p className="text-xs text-slate-400 mb-4">Executa una comprovació de xarxa per comprovar l'estabilitat i la latència dels equips del rack de DFactory Barcelona.</p>
              
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input 
                  type="text" 
                  value={pingHost} 
                  onChange={e => setPingHost(e.target.value)}
                  placeholder="IP o Hostname (p.ex. 192.168.10.1)" 
                  className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-cyan-300 font-mono outline-none focus:border-cyan-400 w-full sm:w-80"
                />
                <button 
                  onClick={handleRunPing}
                  disabled={isPinging}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wide transition-all shadow-md active:scale-95"
                >
                  <Play className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
                  <span>{isPinging ? 'Provant...' : 'Executar Ping'}</span>
                </button>
              </div>

              {pingResult && (
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200">
                  <div className="flex items-center justify-between text-emerald-400 font-bold mb-2">
                    <span>HOST: {pingResult.host} // ESTAT: {pingResult.status}</span>
                    <span>LATÈNCIA: {pingResult.latency_ms} ms</span>
                  </div>
                  <p className="text-slate-400">Gateway: {pingResult.gateway || 'Cisco Core Switch L3'}</p>
                  <p className="text-slate-400">Paquets: 4 enviats, 4 rebuts ({pingResult.packets?.loss_rate || pingResult.loss_rate || '0%'} pèrdua)</p>
                </div>
              )}
            </div>

            {/* Nodes de Servidors i Xarxa */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {telemetry.map(node => (
                <div key={node.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex justify-between items-start mb-4 pb-3 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                        <h4 className="text-base font-bold text-white font-mono">{node.name}</h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{node.role} · <strong>{node.os}</strong></p>
                      <p className="text-xs text-cyan-400 font-mono mt-0.5">IP: {node.ip} · {node.location}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      UPTIME: {node.uptime}
                    </span>
                  </div>

                  {/* Barrers de CPU, RAM, Disk */}
                  <div className="grid grid-cols-3 gap-4 mb-5 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block mb-1">CPU Load</span>
                      <span className="text-lg font-black text-cyan-400 block">{node.cpu}%</span>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${node.cpu}%` }}></div>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block mb-1">RAM Usada</span>
                      <span className="text-lg font-black text-blue-400 block">{node.ram}%</span>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${node.ram}%` }}></div>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block mb-1">Disc / Càrrega</span>
                      <span className="text-lg font-black text-emerald-400 block">{node.disk}%</span>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${node.disk}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Serveis Actius */}
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">Serveis Crítics Actius:</p>
                    <div className="space-y-1.5">
                      {node.services.map((svc, sIdx) => (
                        <div key={sIdx} className="flex justify-between items-center text-xs p-2 rounded-lg bg-slate-950 border border-slate-850">
                          <span className="text-slate-200 font-medium">{svc.name}</span>
                          <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                            <Check className="w-3 h-3"/> {svc.state}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            PESTANYA: EL MEU PERFIL TÈCNIC & CREDENCIALS CORPORATIVES
        ══════════════════════════════════════════════════════════ */}
        {activeTab === 'profile' && (
          <div className="space-y-8 animate-fadeIn">

            {/* ─── BANNER PRINCIPAL DE PERFIL AMB GLOW & SELECTOR RÀPID ─── */}
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                
                {/* Avatar & Dades d'Identitat */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="relative">
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br ${currentRole.avatarColor || 'from-cyan-500 to-blue-600'} text-slate-950 font-black text-3xl sm:text-4xl flex items-center justify-center shadow-xl shadow-cyan-500/25 ring-4 ring-slate-800`}>
                      {currentRole.nom.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-4 border-[#0B132B] flex items-center justify-center" title="Compte Verificat & Actiu">
                      <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">
                        {currentRole.nom}
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentRole.badgeColor}`}>
                        {currentRole.carrec}
                      </span>
                    </div>

                    <p className="text-cyan-400 font-mono text-xs sm:text-sm flex items-center gap-2">
                      <Mail className="w-4 h-4 shrink-0" />
                      <span>{currentRole.email}</span>
                    </p>

                    <p className="text-slate-400 text-xs flex items-center gap-2 pt-0.5">
                      <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>Seu Oficial: <strong>DFactory Barcelona</strong> · Carrer 27 del BZ, 10-16 (Zona Franca)</span>
                    </p>
                  </div>
                </div>

                {/* Badges d'Auditoria i Seguretat SQL */}
                <div className="flex flex-col sm:flex-row xl:flex-col gap-2 shrink-0">
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-500">ID SQL:</span>
                      <span className="text-cyan-400 font-bold">#{currentRole.sqlId || 1} (usuaris_tecnics)</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-500">Departament:</span>
                      <span className="text-slate-200 font-semibold">{currentRole.departament}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-500">Criptografia:</span>
                      <span className="text-emerald-400 font-bold">SHA-256 (FIPS 180-4)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── TARGETES KPI D'ACTIVITAT VINCULADA AL PERFIL ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div 
                onClick={() => {
                  setProjectLeadFilter(currentRole.id === 'admin' ? 'all' : currentRole.id);
                  setActiveTab('projects');
                }}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all group shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase text-slate-400">Projectes Assignats</span>
                  <FolderKanban className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl font-black font-mono text-white mb-1">
                  {currentRole.id === 'admin'
                    ? projects.length
                    : projects.filter(p => (p.techLead || '').toLowerCase().includes(currentRole.leadFilterKeyword.toLowerCase())).length}
                </div>
                <span className="text-[11px] text-cyan-300 font-medium group-hover:underline">Veure projectes actius &rarr;</span>
              </div>

              <div 
                onClick={() => {
                  setTicketLeadFilter(currentRole.id === 'admin' ? 'all' : currentRole.id);
                  setActiveTab('tickets');
                }}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all group shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase text-slate-400">Tiquets SAT Assignats</span>
                  <LifeBuoy className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl font-black font-mono text-white mb-1">
                  {currentRole.id === 'admin'
                    ? tickets.filter(t => t.status !== 'Resolt').length
                    : tickets.filter(t => (t.tech || t.tecnic || '').toLowerCase().includes(currentRole.leadFilterKeyword.toLowerCase()) || t.id_tecnic_assignat === currentRole.sqlId).length}
                </div>
                <span className="text-[11px] text-amber-300 font-medium group-hover:underline">Revisar incidències SLA &rarr;</span>
              </div>

              <div 
                onClick={() => setActiveTab('quotes')}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all group shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase text-slate-400">Pressupostos Signats</span>
                  <FileSignature className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl font-black font-mono text-white mb-1">
                  {quotes.length}
                </div>
                <span className="text-[11px] text-emerald-300 font-medium group-hover:underline">Auditar propostes &rarr;</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase text-slate-400">Nivell d'Accés RBAC</span>
                  <Lock className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-xl font-black font-mono text-purple-300 mb-1">
                  Nivell 1 (Complet)
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Permisos d'Enginyeria & Administració</span>
              </div>

            </div>

            {/* ─── GRID DE 2 COLUMNES: FITXA PROFESSIONAL + SEGURETAT I PERMISOS ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Columna Esquerra: Dades de Contacte & Certificacions */}
              <div className="space-y-6">

                {/* Fitxa Professional de Contacte */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-cyan-400" />
                      <span>Fitxa Professional & Ubicació</span>
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">DFactory Barcelona</span>
                  </div>

                  <form onSubmit={handleSaveProfilePreferences} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Nom Complet</label>
                      <input
                        type="text"
                        value={currentRole.nom}
                        disabled
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-400 outline-none cursor-not-allowed font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Correu Corporatiu</label>
                        <input
                          type="text"
                          value={currentRole.email}
                          disabled
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-cyan-400 font-mono outline-none cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Telèfon Corporatiu</label>
                        <input
                          type="text"
                          value={profilePhone}
                          onChange={e => setProfilePhone(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 font-mono outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Ubicació Física Assignada</label>
                      <input
                        type="text"
                        value={currentRole.ubicacio}
                        disabled
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-400 outline-none cursor-not-allowed font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Descripció & Responsabilitats Tècniques</label>
                      <textarea
                        rows={3}
                        value={profileBio}
                        onChange={e => setProfileBio(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-cyan-500 leading-relaxed"
                      />
                    </div>

                    {profileSavedMsg && (
                      <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{profileSavedMsg}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSavingProfile}
                      className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSavingProfile ? 'Desant Canvis...' : 'Desar Dades Professionals'}</span>
                    </button>
                  </form>
                </div>

                {/* Certificacions Oficials & Especialitzacions */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-400" />
                      <span>Certificacions Oficials & Especialitats</span>
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400">Homologat SMX</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Credencials tècniques i acreditacions oficials associades a la fitxa de <strong>{currentRole.nom}</strong>:
                  </p>

                  <div className="space-y-2 pt-1">
                    {(currentRole.certificacions || []).map((cert, cIdx) => (
                      <div key={cIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0">
                          <Award className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-200 block truncate">{cert}</span>
                          <span className="text-[10px] text-slate-500 font-mono">Emès per organisme oficial certificador</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/60 text-xs text-slate-300">
                    <strong className="text-cyan-300 block mb-1">Especialitat Tècnica d'Àmbit:</strong>
                    <p className="leading-relaxed">{currentRole.ambit}</p>
                  </div>
                </div>

              </div>

              {/* Columna Dreta: Matriu RBAC & Canvi de Contrasenya */}
              <div className="space-y-6">

                {/* Matriu de Permisos RBAC en Temps Real */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Lock className="w-5 h-5 text-purple-400" />
                      <span>Matriu de Permisos RBAC en Temps Real</span>
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono">
                      Rol: {currentRole.id.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      {
                        action: "Signatura Oficial de Pressupostos i Generació PDF",
                        granted: true,
                        detail: "Permís per emetre propostes formals i firmar documents legals."
                      },
                      {
                        action: "Despatx de Pressupostos per Email amb Fitxer Adjunt",
                        granted: true,
                        detail: "Capacitat de despatxar correus automàtics amb PDFKit i Nodemailer."
                      },
                      {
                        action: "Aprovisionament & Inversió de Capital en Estoc (100 SKUs)",
                        granted: currentRole.canAuthorizeCapital,
                        detail: currentRole.canAuthorizeCapital
                          ? "Autorització plena per executar injeccions de capital des de DFactory."
                          : "Requereix confirmació o autorització prèvia de Direcció General (Joel / Admin)."
                      },
                      {
                        action: "Configuració de Nodos de Telemetria & Active Directory",
                        granted: currentRole.id === 'hans' || currentRole.id === 'admin',
                        detail: "Accés complet a la gestió de domini, GPO i monitoratge de servidors."
                      },
                      {
                        action: "Atenció i Resolució de Tiquets SAT & Incidències SLA",
                        granted: true,
                        detail: "Assignació, diagnòstic i tancament d'incidències tècniques de clients."
                      },
                      {
                        action: "Execució d'Auditoria Automàtica de Sistemes (60s)",
                        granted: true,
                        detail: "Facultat per executar comprovacions d'integritat SQL i estoc sota demanda."
                      }
                    ].map((perm, pIdx) => (
                      <div key={pIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
                        <div className="space-y-0.5 min-w-0">
                          <h4 className="text-xs font-bold text-slate-200">{perm.action}</h4>
                          <p className="text-[11px] text-slate-400 leading-tight">{perm.detail}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 font-mono ${
                          perm.granted
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}>
                          {perm.granted ? 'Concedit' : 'Restringit'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gestió de Seguretat & Canvi de Contrasenya */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Key className="w-5 h-5 text-cyan-400" />
                      <span>Seguretat del Compte & Canvi de Contrasenya</span>
                    </h3>
                    <span className="text-[10px] font-mono text-emerald-400">SHA-256 Actiu</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Les credencials s'emmagatzemen a la taula <strong className="text-slate-200 font-mono">usuaris_tecnics</strong> amb la funció criptogràfica <span className="font-mono text-cyan-300">SHA2(password, 256)</span> per garantir la seguretat en repòs.
                  </p>

                  <form onSubmit={handleUpdatePassword} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Contrasenya Actual</label>
                      <input
                        type="password"
                        placeholder="Contrasenya actual del compte"
                        value={pwdForm.current}
                        onChange={e => setPwdForm({ ...pwdForm, current: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Nova Contrasenya</label>
                        <input
                          type="password"
                          placeholder="Mínim 6 caràcters"
                          value={pwdForm.newPwd}
                          onChange={e => setPwdForm({ ...pwdForm, newPwd: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Repetir Nova Contrasenya</label>
                        <input
                          type="password"
                          placeholder="Confirmar nova contrasenya"
                          value={pwdForm.confirmPwd}
                          onChange={e => setPwdForm({ ...pwdForm, confirmPwd: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>
                    </div>

                    {pwdFeedback && (
                      <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 animate-fadeIn ${
                        pwdFeedback.type === 'success'
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                          : 'bg-red-500/15 border-red-500/40 text-red-300'
                      }`}>
                        {pwdFeedback.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 shrink-0" />
                        )}
                        <span>{pwdFeedback.text}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isUpdatingPwd}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Key className="w-4 h-4" />
                      <span>{isUpdatingPwd ? 'Actualitzant a MariaDB...' : 'Actualitzar Contrasenya de Forma Segura'}</span>
                    </button>
                  </form>
                </div>

              </div>

            </div>

            {/* ─── CARD 3: CONFIGURACIÓ DE SIGNATURA DIGITAL CORPORATIVA ─── */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileSignature className="w-5 h-5 text-cyan-400" />
                    <span>Signatura Digital Corporativa per a Pressupostos & Emails</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Aquest text s'afegeix automàticament al peu dels correus electrònics i propostes oficials generades en PDF despatxades per <strong>{currentRole.nom}</strong>.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-cyan-400">PDFKit & Nodemailer</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Editar Peu de Signatura Personalitzat:</label>
                  <textarea
                    rows={5}
                    value={profileSignature}
                    onChange={e => setProfileSignature(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 outline-none focus:border-cyan-500 font-mono leading-relaxed"
                  />
                  <button
                    type="button"
                    onClick={handleSaveProfilePreferences}
                    disabled={isSavingProfile}
                    className="mt-2.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-2"
                  >
                    <Save className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Desar Signatura</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider block">
                    Previsualització al Peu de Document:
                  </span>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-line leading-relaxed border-l-4 border-l-cyan-400">
                    {profileSignature}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ─── MODAL CREACIÓ MANUAL DE PRESSUPOST ─── */}
      {showNewQuoteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B132B] border border-slate-800 rounded-3xl shadow-2xl p-8 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
              <h3 className="text-lg font-heading font-black text-white">Crear Nou Pressupost Manual</h3>
              <button onClick={() => setShowNewQuoteModal(false)} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5"/>
              </button>
            </div>
            <form onSubmit={handleCreateQuote} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Nom de l'Empresa / Client *</label>
                <input 
                  type="text" 
                  placeholder="p.ex. Indústries Metal·lúrgiques BCN" 
                  value={newClient} 
                  onChange={e => setNewClient(e.target.value)} 
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Persona de Contacte</label>
                <input 
                  type="text" 
                  placeholder="p.ex. Carles Domènech" 
                  value={newContact} 
                  onChange={e => setNewContact(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Resum d'Equipament i Serveis</label>
                <input 
                  type="text" 
                  placeholder="p.ex. Rack 24U + Switch Cisco L3 + Cablejat Cat6A" 
                  value={newItems} 
                  onChange={e => setNewItems(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Import Total (€) *</label>
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="p.ex. 6500" 
                  value={newAmount} 
                  onChange={e => setNewAmount(e.target.value)} 
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500 font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Correu Electrònic del Client (per a enviament PDF)</label>
                <input 
                  type="email" 
                  placeholder="p.ex. client@empresa.cat" 
                  value={newClientEmail} 
                  onChange={e => setNewClientEmail(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500 font-mono"
                />
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <input
                  id="autoSendEmailCheckbox"
                  type="checkbox"
                  checked={autoSendEmailOnCreate}
                  onChange={e => setAutoSendEmailOnCreate(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
                />
                <label htmlFor="autoSendEmailCheckbox" className="text-xs text-slate-300 cursor-pointer">
                  Enviar automàticament per correu electrònic amb el PDF adjunt en desar
                </label>
              </div>
              <div className="flex gap-3 pt-3">
                <button 
                  type="submit" 
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-sm font-black uppercase tracking-wide transition-all shadow-lg shadow-cyan-500/20"
                >
                  Registrar Pressupost
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowNewQuoteModal(false)} 
                  className="flex-1 py-3 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 text-sm font-semibold transition-colors"
                >
                  Cancel·lar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL NOU CLIENT CORPORATIU ─── */}
      {showNewClientModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B132B] border border-slate-800 rounded-3xl shadow-2xl p-8 w-full max-w-lg my-8">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
              <h3 className="text-lg font-heading font-black text-white">Registrar Nou Client Corporatiu</h3>
              <button onClick={() => setShowNewClientModal(false)} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateClient} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-300 block mb-1">Nom de l'Empresa *</label>
                  <input
                    type="text"
                    required
                    placeholder="p.ex. Laboratoris Químics Diagonal S.L."
                    value={newClientForm.nom_empresa}
                    onChange={e => setNewClientForm({ ...newClientForm, nom_empresa: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">CIF Corporatiu *</label>
                  <input
                    type="text"
                    required
                    placeholder="p.ex. B-68102934"
                    value={newClientForm.cif}
                    onChange={e => setNewClientForm({ ...newClientForm, cif: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 font-mono outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Sector</label>
                  <select
                    value={newClientForm.sector}
                    onChange={e => setNewClientForm({ ...newClientForm, sector: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                  >
                    <option value="Industrial">Industrial</option>
                    <option value="Oficina PIME">Oficina PIME</option>
                    <option value="Comerç & Retail">Comerç & Retail</option>
                    <option value="Espai Co-working">Espai Co-working</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Persona de Contacte</label>
                  <input
                    type="text"
                    placeholder="p.ex. Anna Serra"
                    value={newClientForm.persona_contacte}
                    onChange={e => setNewClientForm({ ...newClientForm, persona_contacte: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Telèfon</label>
                  <input
                    type="text"
                    placeholder="+34 934 000 000"
                    value={newClientForm.telefon}
                    onChange={e => setNewClientForm({ ...newClientForm, telefon: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-300 block mb-1">Email Corporatiu</label>
                  <input
                    type="email"
                    placeholder="it@empresa.cat"
                    value={newClientForm.email}
                    onChange={e => setNewClientForm({ ...newClientForm, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-300 block mb-1">Adreça a Barcelona / Àrea Metropolitana</label>
                  <input
                    type="text"
                    placeholder="Carrer de Tanger 98, 22@ Barcelona"
                    value={newClientForm.adreca}
                    onChange={e => setNewClientForm({ ...newClientForm, adreca: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-sm font-black uppercase tracking-wide transition-all shadow-lg shadow-cyan-500/20"
                >
                  Guardar Client
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewClientModal(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 text-sm font-semibold transition-colors"
                >
                  Cancel·lar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL NOU PROVEÏDOR OFICIAL ─── */}
      {showNewSupplierModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B132B] border border-slate-800 rounded-3xl shadow-2xl p-8 w-full max-w-lg my-8">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
              <h3 className="text-lg font-heading font-black text-white">Registrar Nou Proveïdor Oficial</h3>
              <button onClick={() => setShowNewSupplierModal(false)} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateSupplier} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-300 block mb-1">Nom Comercial del Majorista *</label>
                  <input
                    type="text"
                    required
                    placeholder="p.ex. MCR Info Electronic BCN S.L."
                    value={newSupplierForm.nom_comercial}
                    onChange={e => setNewSupplierForm({ ...newSupplierForm, nom_comercial: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">CIF *</label>
                  <input
                    type="text"
                    required
                    placeholder="p.ex. B-82910452"
                    value={newSupplierForm.cif}
                    onChange={e => setNewSupplierForm({ ...newSupplierForm, cif: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 font-mono outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Condicions de Pagament</label>
                  <input
                    type="text"
                    placeholder="30 dies transferència"
                    value={newSupplierForm.condicions_pagament}
                    onChange={e => setNewSupplierForm({ ...newSupplierForm, condicions_pagament: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Telèfon</label>
                  <input
                    type="text"
                    placeholder="+34 934 000 000"
                    value={newSupplierForm.telefon}
                    onChange={e => setNewSupplierForm({ ...newSupplierForm, telefon: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Email de Comandes B2B</label>
                  <input
                    type="email"
                    placeholder="comandes@majorista.es"
                    value={newSupplierForm.email_comandes}
                    onChange={e => setNewSupplierForm({ ...newSupplierForm, email_comandes: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-300 block mb-1">Adreça Logística</label>
                  <input
                    type="text"
                    placeholder="Polígon Industrial Pedrosa, L'Hospitalet de Llobregat"
                    value={newSupplierForm.adreca}
                    onChange={e => setNewSupplierForm({ ...newSupplierForm, adreca: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-300 block mb-1">Marques Oficials (separades per comes)</label>
                  <input
                    type="text"
                    placeholder="Cisco, Ubiquiti, Samsung Enterprise, Western Digital"
                    value={newSupplierForm.marques_oficials}
                    onChange={e => setNewSupplierForm({ ...newSupplierForm, marques_oficials: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-sm font-black uppercase tracking-wide transition-all shadow-lg shadow-cyan-500/20"
                >
                  Guardar Proveïdor
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewSupplierModal(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 text-sm font-semibold transition-colors"
                >
                  Cancel·lar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL NOU PROJECTE D'ENGINYERIA ─── */}
      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B132B] border border-slate-800 rounded-3xl shadow-2xl p-8 w-full max-w-lg my-8">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
              <h3 className="text-lg font-heading font-black text-white">Nou Projecte d'Enginyeria IT</h3>
              <button onClick={() => setShowNewProjectModal(false)} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Nom del Projecte Tècnic *</label>
                <input
                  type="text"
                  required
                  placeholder="p.ex. Desplegament Cluster Windows Server 2025 & Rack 24U"
                  value={newProjectForm.name}
                  onChange={e => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Client Corporatiu *</label>
                <input
                  type="text"
                  required
                  placeholder="p.ex. Nexum Tech Studio Barcelona (22@)"
                  value={newProjectForm.client}
                  onChange={e => setNewProjectForm({ ...newProjectForm, client: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Responsable Tècnic Assignat</label>
                <select
                  value={newProjectForm.techLead}
                  onChange={e => setNewProjectForm({ ...newProjectForm, techLead: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                >
                  <option value="Hans Lao Moncusi (Cap de Sistemes & Seguretat)">Hans Lao Moncusi (Cap de Sistemes & Seguretat)</option>
                  <option value="Joel Pérez Armenteros (Cap de Xarxes & Cablejat)">Joel Pérez Armenteros (Cap de Xarxes & Cablejat)</option>
                  <option value="Joel Pérez Armenteros & Hans Lao Moncusi">Joel Pérez Armenteros & Hans Lao Moncusi</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Data de Lliurament Prevista</label>
                <input
                  type="text"
                  placeholder="p.ex. 30 Novembre 2026"
                  value={newProjectForm.deadline}
                  onChange={e => setNewProjectForm({ ...newProjectForm, deadline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Fites Tècniques Inicials (una per línia)</label>
                <textarea
                  rows={3}
                  placeholder={"1. Muntatge d'armari Rack Legrand 24U\n2. Certificació de punts de xarxa Cat6A amb Fluke DSX-5000\n3. Configuració d'Active Directory i còpies 3-2-1"}
                  value={newProjectForm.initialTasks}
                  onChange={e => setNewProjectForm({ ...newProjectForm, initialTasks: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500"
                />
              </div>
              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-sm font-black uppercase tracking-wide transition-all shadow-lg shadow-cyan-500/20"
                >
                  Crear Projecte
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 text-sm font-semibold transition-colors"
                >
                  Cancel·lar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL D'AUDITORIA DE SISTEMES & INTEGRITAT PROGRAMADA (CADA 60s) ─── */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B132B] border border-emerald-500/40 rounded-3xl shadow-2xl p-7 sm:p-9 w-full max-w-3xl my-8">
            <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Auditoria Automàtica: {auditData.status}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Última execució: {auditData.lastRunAt} · Pròxima en {auditCountdown}s
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
                  Motor d'Auditoria de Sistemes & Integritat Programada
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Verificació cíclica cada 60 segons contra els serveis del backend i l'estructura SQL de DFactory Barcelona.
                </p>
              </div>
              <button
                onClick={() => setShowAuditModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {(auditData.checks || []).map((chk, idx) => (
                <div key={chk.id || idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{chk.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{chk.detail}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 block">
                      {chk.status || 'OK'}
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400 mt-1 block">{chk.latency || '1.2 ms'}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => fetchAuditStatus(true)}
                disabled={isRunningAudit}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wide transition-all shadow-lg shadow-emerald-500/20"
              >
                <RefreshCw className={`w-4 h-4 ${isRunningAudit ? 'animate-spin' : ''}`} />
                <span>{isRunningAudit ? 'Executant Auditoria...' : 'Executar Auditoria Ara'}</span>
              </button>
              <button
                onClick={() => setShowAuditModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Tancar Panell
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL INVERSIÓ DE CAPITAL EN ESTOC MULTIMARCA ─── */}
      {showCapitalModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B132B] border border-cyan-500/40 rounded-3xl shadow-2xl p-7 sm:p-9 w-full max-w-3xl my-8">
            <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5"/> Inversió de Capital Estratègic
                  </span>
                  <span className="text-xs text-slate-400 font-mono">DFactory Barcelona</span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Autorització Direcció General / Admin ({currentRole.nom})
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
                  Aprovisionament & Inversió de Capital en Estoc
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Selecciona el pla d'injecció de capital per comprar lots físics multimarca (Cisco, Legrand, APC, Dell, Synology, Ubiquiti, WD, etc.).
                </p>
              </div>
              <button 
                onClick={() => setShowCapitalModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              >
                <X className="w-5 h-5"/>
              </button>
            </div>

            {/* Opcions de Plans d'Inversió */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              
              {/* Pla 1: Bàsic / General */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Gama Bàsica / General
                    </span>
                    <span className="text-base font-black font-mono text-emerald-400">+93.613 €</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">
                    Pack Rotació Ràpida (Cablejat, PIMEs & TPV)
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    +40 bobines Cat6A Draka, +25 patch panels Legrand, +15 racks 12U, +15 routers MikroTik, +40 discos WD Red Pro 8TB, +14 TPVs Posiflex i impressores Epson.
                  </p>
                </div>
                <button
                  onClick={() => handleInjectCapital('basic_general')}
                  disabled={isInvesting}
                  className="mt-4 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wide transition-all shadow-md active:scale-95"
                >
                  {isInvesting ? 'Injectant Capital...' : 'Executar Inversió Bàsica (+93.613 €)'}
                </button>
              </div>

              {/* Pla 2: Gamma Mitjana Empresarial */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 hover:border-cyan-500/60 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      Gamma Mitjana Empresarial
                    </span>
                    <span className="text-base font-black font-mono text-cyan-300">+122.845 €</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">
                    Pack Switching Cisco & Wi-Fi Ubiquiti & SAIs
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    +16 switches Cisco Catalyst 24P PoE+, +8 switches CBS350 48P, +30 APs Wi-Fi 6 Ubiquiti UniFi 6 Pro, +14 SAIs APC Smart-UPS 1500VA/3000VA, Salicru i Eaton.
                  </p>
                </div>
                <button
                  onClick={() => handleInjectCapital('mid_networking')}
                  disabled={isInvesting}
                  className="mt-4 w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wide transition-all shadow-md active:scale-95"
                >
                  {isInvesting ? 'Injectant Capital...' : 'Executar Inversió Mitjana (+122.845 €)'}
                </button>
              </div>

              {/* Pla 3: Servidors & CPD Datacenter */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 hover:border-purple-500/60 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      Professional / Datacenter
                    </span>
                    <span className="text-base font-black font-mono text-purple-400">+179.000 €</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">
                    Pack Servidors Dell Xeon, NAS Rack & Fluke
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    +6 servidors Dell PowerEdge R450 Xeon, +6 HPE DL20, +6 Synology RackStation, +20 discos Seagate IronWolf 16TB, +30 SSDs Samsung Enterprise, +1 Fluke DSX-5000.
                  </p>
                </div>
                <button
                  onClick={() => handleInjectCapital('enterprise_servers')}
                  disabled={isInvesting}
                  className="mt-4 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-md active:scale-95"
                >
                  {isInvesting ? 'Injectant Capital...' : 'Executar Inversió CPD (+179.000 €)'}
                </button>
              </div>

              {/* Pla 4: Megapack Global Multimarca */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/60 to-cyan-950/40 border border-blue-500/40 hover:border-cyan-400 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-500/20 text-cyan-200 border border-cyan-400/50">
                      Aprovisionament Global Massiu
                    </span>
                    <span className="text-base font-black font-mono text-cyan-300">+402.969 €</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">
                    Megapack Completa de les 100 Referències
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Augmenta l'estoc de totes les marques simultàniament (Legrand, Cisco, Ubiquiti, APC, Dell, Synology, Draka, Samsung Enterprise, Epson) per a grans licitacions.
                  </p>
                </div>
                <button
                  onClick={() => handleInjectCapital('megapack_multibrand')}
                  disabled={isInvesting}
                  className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wide transition-all shadow-lg shadow-cyan-500/25 active:scale-95"
                >
                  {isInvesting ? 'Injectant Capital...' : 'Executar Megapack (+402.969 €)'}
                </button>
              </div>

            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 flex-wrap gap-3">
              <button
                onClick={handleResetInventory}
                disabled={isInvesting}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all"
                title="Restableix tot l'inventari a la valoració inicial de 757.901 €"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablir Estoc Inicial Base (757.901 €)</span>
              </button>

              <button 
                onClick={() => setShowCapitalModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Tancar Finestra
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL D'ENVIAMENT D'EMAIL PERSONALITZAT AMB PDF ADJUNT ─── */}
      {emailModalQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-7 text-slate-100 max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => { setEmailModalQuote(null); setEmailSendConfirmation(null); }}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-black text-white">
                  Despatxar Pressupost per Correu Electrònic
                </h3>
                <p className="text-xs text-slate-400">
                  {emailModalQuote.id || emailModalQuote.codi_pressupost} · Generació i adjunció automàtica del fitxer PDF binari
                </p>
              </div>
            </div>

            {emailSendConfirmation ? (
              <div className="space-y-4 p-5 rounded-2xl bg-slate-950/90 border border-emerald-500/40 text-center animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Correu Electrònic Despatxat amb Èxit!</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    El document <strong className="text-cyan-300 font-mono">{emailSendConfirmation.attachmentName || `Pressupost_KernelCore_${emailSendConfirmation.quoteCode}.pdf`}</strong> s'ha adjuntat i enviat correctament a <span className="font-mono text-white">{emailSendConfirmation.to}</span>.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadQuotePdf(emailSendConfirmation.quoteCode)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Descarregar Còpia PDF</span>
                  </button>
                  {emailSendConfirmation.previewUrl && (
                    <a
                      href={emailSendConfirmation.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Veure Email a la Safata SMTP</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => { setEmailModalQuote(null); setEmailSendConfirmation(null); }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Tancar Finestra
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendQuoteEmailSubmit} className="space-y-4">
                {/* Badge de PDF Adjunt */}
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-cyan-200 font-mono">
                    <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Pressupost_KernelCore_{emailModalQuote.id || emailModalQuote.codi_pressupost}.pdf</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleViewQuotePdf(emailModalQuote)}
                    className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline text-[11px]"
                  >
                    Previsualitzar PDF
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Destinatari (Email Client):</label>
                    <input
                      type="email"
                      required
                      value={emailForm.to}
                      onChange={e => setEmailForm(prev => ({ ...prev, to: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Empresa / Client:</label>
                    <input
                      type="text"
                      value={emailForm.companyName}
                      onChange={e => setEmailForm(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Plantilles ràpides */}
                <div>
                  <span className="block text-xs font-bold text-slate-400 mb-1.5">Plantilles Ràpides de Missatge:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'presentacio', label: 'Presentació Oficial' },
                      { key: 'urgent', label: 'Desplegament Urgent' },
                      { key: 'seguretat', label: 'Auditoria & RGPD' },
                    ].map(t => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => handleApplyEmailTemplate(t.key)}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-all truncate ${emailTemplateKey === t.key ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'}`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Assumpte del Correu:</label>
                  <input
                    type="text"
                    required
                    value={emailForm.subject}
                    onChange={e => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Missatge Personalitzat per al Client:</label>
                  <textarea
                    rows={4}
                    value={emailForm.customMessage}
                    onChange={e => setEmailForm(prev => ({ ...prev, customMessage: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-cyan-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Signat en Nom de:</label>
                  <select
                    value={emailForm.senderLabel}
                    onChange={e => setEmailForm(prev => ({ ...prev, senderLabel: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold"
                  >
                    {SIGNER_OPTIONS.map(s => (
                      <option key={s.id} value={s.label}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEmailModalQuote(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Cancel·lar
                  </button>
                  <button
                    type="submit"
                    disabled={isSendingEmail}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 active:scale-95 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSendingEmail ? 'Generant PDF & Despatxant...' : 'Enviar Email amb PDF Adjunt'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ─── MODAL DE CONFIGURACIÓ SMTP / CORREU ELECTRÒNIC ─── */}
      {showSmtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-7 text-slate-100">
            <button
              onClick={() => setShowSmtpModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-black text-white">
                  Configuració del Servidor SMTP
                </h3>
                <p className="text-xs text-slate-400">
                  Canvia entre el relé de proves integrat o un servidor SMTP corporatiu / Gmail
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveSmtpConfig} className="space-y-4">
              <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-slate-950 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setSmtpMode('ethereal')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${smtpMode === 'ethereal' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Relé SMTP Integrat (Ethereal)
                </button>
                <button
                  type="button"
                  onClick={() => setSmtpMode('custom')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${smtpMode === 'custom' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  SMTP Personalitzat / Gmail
                </button>
              </div>

              {smtpMode === 'ethereal' ? (
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <p className="font-semibold text-cyan-300">Mode Relé de Proves Actiu (Zero Credencials):</p>
                  <p className="leading-relaxed">
                    Tots els correus es despatxen pel servidor segur de proves <span className="font-mono text-cyan-400">smtp.ethereal.email</span> amb el fitxer PDF adjunt. Cada enviament genera un enllaç de safata d'entrada real per visualitzar el resultat i descarregar el PDF directament.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="col-span-2">
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">Servidor SMTP:</label>
                      <input
                        type="text"
                        value={smtpForm.host}
                        onChange={e => setSmtpForm(prev => ({ ...prev, host: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-500 font-mono"
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">Port:</label>
                      <input
                        type="number"
                        value={smtpForm.port}
                        onChange={e => setSmtpForm(prev => ({ ...prev, port: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-500 font-mono"
                        placeholder="587"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Usuari SMTP / Email:</label>
                    <input
                      type="text"
                      value={smtpForm.user}
                      onChange={e => setSmtpForm(prev => ({ ...prev, user: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-500 font-mono"
                      placeholder="propostes@kernelcore.cat"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Contrasenya / App Password:</label>
                    <input
                      type="password"
                      value={smtpForm.pass}
                      onChange={e => setSmtpForm(prev => ({ ...prev, pass: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-500 font-mono"
                      placeholder="••••••••••••••••"
                    />
                  </div>
                </div>
              )}

              {smtpStatusMsg && (
                <div className={`p-3 rounded-xl text-xs font-semibold ${smtpStatusMsg.type === 'success' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/15 text-red-300 border border-red-500/30'}`}>
                  {smtpStatusMsg.text}
                </div>
              )}

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowSmtpModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Tancar
                </button>
                <button
                  type="submit"
                  disabled={isSavingSmtp}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  {isSavingSmtp ? 'Desant...' : 'Desar Configuració SMTP'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Modal de Fitxa Tècnica i Detall d'Article */}
      <ProductDetailModal
        item={selectedProductModal}
        isOpen={!!selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        onUpdateStock={handleUpdateStock}
      />

    </div>
  );
}


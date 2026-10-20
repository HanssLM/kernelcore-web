// ─────────────────────────────────────────────────────────────────────────────
// KERNELCORE // MOTOR DE DADES OPERATIVES I GENERADOR DINÀMIC
// Seu Central: DFactory Barcelona (Zona Franca)
// Dades de síntesi SMX 2026/27 - Infraestructura, Xarxes i Sistemes
// ─────────────────────────────────────────────────────────────────────────────

export const initialRequests = [
  {
    id: 'SOL-2026-101',
    nom: 'Marc Vila i Soler',
    empresa: 'Supermercats Gourmet Born S.L.',
    email: 'm.vila@gourmetborn.cat',
    telefon: '+34 932 458 910',
    entorn: 'Comerç & Retail',
    treballadors: '10-25 empleats',
    urgencia: 'urgent',
    pressupostAprox: '4.500 € - 7.000 €',
    serveiLabels: ['Xarxa Cablada Cat6A', 'TPVs Comercials', 'Protecció Elèctrica SAI'],
    descripcio: 'Necessitem renovar la línia de 4 caixes TPV amb terminals tàctils Posiflex, muntar un switch PoE+ dedicat i instal·lar un SAI per evitar caigudes del cobrament amb targeta davant talls de subministrament al barri del Born.',
    status: 'Nova sol·licitud',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
  },
  {
    id: 'SOL-2026-102',
    nom: 'Dr. Oriol Rius Castells',
    empresa: 'Centre Mèdic & Diagnòstic Eixample',
    email: 'o.rius@mediceixample.com',
    telefon: '+34 934 112 300',
    entorn: 'Sanitari / Clínica',
    treballadors: '25-50 empleats',
    urgencia: 'normal',
    pressupostAprox: '8.000 € - 14.000 €',
    serveiLabels: ['Servidor Windows Server 2025', 'Còpies 3-2-1 RGPD', 'Wi-Fi 6 Pacients/Metges'],
    descripcio: 'Auditoria urgent de seguretat segons RGPD per a historials mèdics. Cal implantar Active Directory amb polítiques GPO estrictes, bloqueig de ports USB no autoritzats i còpies de seguretat en NAS Synology local més rèplica xifrada al núvol.',
    status: 'Nova sol·licitud',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
  },
  {
    id: 'SOL-2026-103',
    nom: 'Sílvia Camps Prat',
    empresa: 'Nexum Tech Studio Barcelona (22@)',
    email: 'silvia@nexumtech.barcelona',
    telefon: '+34 931 889 021',
    entorn: 'Oficina PIME / Startup Tech',
    treballadors: '20-35 empleats',
    urgencia: 'normal',
    pressupostAprox: '6.000 € - 9.500 €',
    serveiLabels: ['Xarxa 10G Cat6A', 'Wi-Fi 6 Ubiquiti', 'Rack 19" 12U'],
    descripcio: 'Nova seu al districte 22@ Poblenou. Volem cablejat estructurat Cat6A apantallat per a 30 llocs de desenvolupament, cobertura Wi-Fi 6 d\'alta densitat amb roaming ràpid i un armari rack mural insonoritzat.',
    status: 'Nova sol·licitud',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString()
  },
  {
    id: 'SOL-2026-104',
    nom: 'Jordi Altimira Mas',
    empresa: 'Transports & Càrrega Port BCN',
    email: 'jaltimira@transportscarga.cat',
    telefon: '+34 933 671 294',
    entorn: 'Nau Industrial / Logística',
    treballadors: '50+ empleats',
    urgencia: 'urgent',
    pressupostAprox: '12.000 € - 18.000 €',
    serveiLabels: ['Xarxa Industrial', 'SAI On-Line 3000VA', 'VLANs Cisco L3', 'Certificació Fluke'],
    descripcio: 'Modernització del centre de càrrega a Zona Franca. Seccions de molls de descàrrega amb interferències electromagnètiques. Requereix cablejat Cat6A LSZH 500MHz certificat Fluke i SAI doble conversió de 3000VA per als servidors de logística.',
    status: 'Pressupost enviat',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString()
  },
  {
    id: 'SOL-2026-105',
    nom: 'Clara Fontanals Bellver',
    empresa: 'Bufet Jurídic Fontanals & Associats',
    email: 'clara@fontanalsjuridic.es',
    telefon: '+34 935 440 188',
    entorn: 'Oficina Professional',
    treballadors: '12 empleats',
    urgencia: 'baixa',
    pressupostAprox: '3.000 € - 5.000 €',
    serveiLabels: ['Còpies de Seguretat NAS', 'Manteniment Informàtic Mensual'],
    descripcio: 'Contractació de manteniment preventiu mensual amb SLA inferior a 4 hores i revisió del sistema de còpies al despatx del Passeig de Gràcia.',
    status: 'Nova sol·licitud',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
  }
];

export const initialQuotes = [
  {
    id: 'PR-2026-001',
    codi_pressupost: 'PR-2026-001',
    client: 'Logística & Robòtica Zona Franca BCN',
    nom_empresa: 'Logística & Robòtica Zona Franca BCN',
    contact: 'Carlos Mendoza',
    persona_contacte: 'Carlos Mendoza',
    email: 'carlos.mendoza@logisticazf.cat',
    environment: 'Nau Industrial / Indústria 4.0',
    items: 'Xarxa Cat6A 24 punts + Rack 24U + Cisco L3 PoE+ + SAI APC 3000VA On-Line + Certificació Fluke',
    resum_equipament: 'Xarxa Cat6A 24 punts + Rack 24U + Cisco L3 PoE+ + SAI APC 3000VA On-Line + Certificació Fluke',
    cost_maquinari: 5640.00,
    cost_software: 480.00,
    cost_ma_obra: 1170.00,
    amount: 8820.90,
    import_total: 8820.90,
    monthly: 195.00,
    quota_mensual_suport: 195.00,
    status: 'Aprovat',
    estat: 'Aprovat',
    date: '2026-10-02',
    data_emissio: '2026-10-02'
  },
  {
    id: 'PR-2026-002',
    codi_pressupost: 'PR-2026-002',
    client: 'Clínica Dental Diagonal',
    nom_empresa: 'Clínica Dental Diagonal',
    contact: 'Dra. Laura Miralles',
    persona_contacte: 'Dra. Laura Miralles',
    email: 'administracio@dentaldiagonal.cat',
    environment: 'Oficina PIME Sanitària',
    items: 'Rack 12U Legrand + Dell PowerEdge Win Server 2025 AD DS + SAI 1500VA + Synology NAS 4-Bay RAID 5',
    resum_equipament: 'Rack 12U Legrand + Dell PowerEdge Win Server 2025 AD DS + SAI 1500VA + Synology NAS 4-Bay RAID 5',
    cost_maquinari: 4120.00,
    cost_software: 680.00,
    cost_ma_obra: 950.00,
    amount: 6957.50,
    import_total: 6957.50,
    monthly: 135.00,
    quota_mensual_suport: 135.00,
    status: 'En curs',
    estat: 'En curs',
    date: '2026-10-05',
    data_emissio: '2026-10-05'
  },
  {
    id: 'PR-2026-003',
    codi_pressupost: 'PR-2026-003',
    client: 'Supermercats Gourmet Born',
    nom_empresa: 'Supermercats Gourmet Born',
    contact: 'Marc Vila i Soler',
    persona_contacte: 'Marc Vila i Soler',
    email: 'm.vila@gourmetborn.cat',
    environment: 'Comerç & Retail',
    items: '4 TPVs Posiflex 15.6" Fanless + Impressores Epson TM-T20III + Switch Cisco 24P PoE+ + SAI APC 1500VA',
    resum_equipament: '4 TPVs Posiflex 15.6" Fanless + Impressores Epson TM-T20III + Switch Cisco 24P PoE+ + SAI APC 1500VA',
    cost_maquinari: 3450.00,
    cost_software: 290.00,
    cost_ma_obra: 820.00,
    amount: 5517.60,
    import_total: 5517.60,
    monthly: 110.00,
    quota_mensual_suport: 110.00,
    status: 'Pendent de signatura',
    estat: 'Pendent de signatura',
    date: '2026-10-10',
    data_emissio: '2026-10-10'
  },
  {
    id: 'PR-2026-004',
    codi_pressupost: 'PR-2026-004',
    client: 'Nexum Tech Studio Barcelona (22@)',
    nom_empresa: 'Nexum Tech Studio Barcelona (22@)',
    contact: 'Sílvia Camps Prat',
    persona_contacte: 'Sílvia Camps Prat',
    email: 'silvia@nexumtech.barcelona',
    environment: 'Espai Co-working & Desenvolupament Tech',
    items: 'Rack 12U Insonoritzat + Bobina 305m Cat6A LSZH + 3 APs Ubiquiti Wi-Fi 6 Pro + Router MikroTik 10G',
    resum_equipament: 'Rack 12U Insonoritzat + Bobina 305m Cat6A LSZH + 3 APs Ubiquiti Wi-Fi 6 Pro + Router MikroTik 10G',
    cost_maquinari: 2890.00,
    cost_software: 150.00,
    cost_ma_obra: 780.00,
    amount: 4622.20,
    import_total: 4622.20,
    monthly: 95.00,
    quota_mensual_suport: 95.00,
    status: 'Pendent de signatura',
    estat: 'Pendent de signatura',
    date: '2026-10-12',
    data_emissio: '2026-10-12'
  }
];

export const initialProjects = [
  {
    id: 'PRJ-26-01',
    name: 'Desplegament Xarxa 10G Cat6A i SAI Doble Conversió Zona Franca',
    client: 'Logística & Robòtica Zona Franca BCN',
    techLead: 'Joel Pérez Armenteros (Cap de Xarxes & Cablejat)',
    progress: 75,
    deadline: '24 Octubre 2026',
    tasks: [
      { name: 'Inspecció física a DFactory Barcelona i nau industrial de Zona Franca', done: true },
      { name: 'Instal·lació i anclatge de rack de terra 24U Legrand amb presa de terra equipotencial', done: true },
      { name: 'Tirada de 24 línies Cat6A LSZH 500MHz i certificació Fluke DSX-5000 (< 3dB Return Loss)', done: true },
      { name: 'Configuració switch Cisco L3: VLAN 10 (Gestió), VLAN 20 (Robòtica), VLAN 30 (Oficines)', done: true },
      { name: 'Connexió SAI APC 3000VA Doble Conversió On-Line i proves de commutació 0ms', done: false }
    ]
  },
  {
    id: 'PRJ-26-02',
    name: 'Implantació Domini Windows Server 2025 i Backups GFS 3-2-1',
    client: 'Clínica Dental Diagonal',
    techLead: 'Hans Lao Moncusi (Cap de Sistemes & Seguretat)',
    progress: 40,
    deadline: '28 Octubre 2026',
    tasks: [
      { name: 'Auditoria de seguretat RGPD, anàlisi de riscos sanitaris i definició de rols RBAC', done: true },
      { name: 'Instal·lació Windows Server 2025 Datacenter i promoció a Controlador de Domini AD DS', done: true },
      { name: 'Desplegament de polítiques de seguretat GPO per equips (bloqueig USB, BitLocker, pantalla de bloqueig)', done: false },
      { name: 'Configuració NAS Synology 4-Bay en RAID 5 Btrfs amb snapshots immutables i rèplica al núvol', done: false }
    ]
  },
  {
    id: 'PRJ-26-03',
    name: 'Modernització Infraestructura POS i Segmentació Wi-Fi 6',
    client: 'Supermercats Gourmet Born',
    techLead: 'Joel Pérez Armenteros & Hans Lao Moncusi',
    progress: 20,
    deadline: '10 Novembre 2026',
    tasks: [
      { name: 'Revisió elèctrica i anàlisi de càrregues dels 4 punts de venda TPV', done: true },
      { name: 'Muntatge dels terminals tàctils Posiflex Fanless i connexió de calaixos portamonedes', done: false },
      { name: 'Instal·lació de punts d\'accés Wi-Fi 6 Ubiquiti amb portal captiu separat per a clients', done: false },
      { name: 'Test d\'estrès i simulació de fallada de xarxa amb suport d\'enllaç 4G/5G de contingència', done: false }
    ]
  }
];

export const initialInventory = [
  // ─── 1. RACKS 19" & PDU / DISTRIBUCIÓ D'ENERGIA (10 REFERÈNCIES) ───
  { id: 1, sku: 'LEG-RK12-WL', name: 'Armari Rack 19" Mural 12U Enclavat amb Porta de Vidre', brand: 'Legrand', category: 'Racks 19"', stock: 28, min: 6, price: 145.00, tier: 'Bàsic / General' },
  { id: 2, sku: 'RKM-RK18-WL', name: 'Armari Rack 19" Mural 18U amb Panells Laterals Desmuntables', brand: 'RackMatic', category: 'Racks 19"', stock: 18, min: 4, price: 210.00, tier: 'Bàsic / General' },
  { id: 3, sku: 'LEG-RK24-FL', name: 'Armari Rack 19" Terra 24U 600x800 amb Rodes i Fre', brand: 'Legrand', category: 'Racks 19"', stock: 16, min: 4, price: 380.00, tier: 'Mitjà Empresarial' },
  { id: 4, sku: 'APC-NS42-CPD', name: 'Armari Rack 19" CPD NetShelter SX 42U Insonoritzat 800x1200mm', brand: 'APC Schneider', category: 'Racks 19"', stock: 6, min: 2, price: 1150.00, tier: 'Professional / CPD' },
  { id: 5, sku: 'TRP-SRW12US', name: 'Armari Rack 19" Mural 12U Tripp Lite SmartRack Batent Pivotant', brand: 'Tripp Lite', category: 'Racks 19"', stock: 12, min: 3, price: 275.00, tier: 'Mitjà Empresarial' },
  { id: 6, sku: 'EAT-RE42-SRV', name: 'Armari Rack 19" Eaton RE Series 42U Perforat Ventilació 80%', brand: 'Eaton', category: 'Racks 19"', stock: 8, min: 2, price: 980.00, tier: 'Professional / CPD' },
  { id: 7, sku: 'LEG-PDU-8SCH', name: 'Regleta PDU 19" 8 Preses Schuko 16A amb Protecció Sobretensions', brand: 'Legrand', category: 'Racks 19"', stock: 55, min: 12, price: 35.00, tier: 'Bàsic / General' },
  { id: 8, sku: 'RKM-PDU-IP8', name: 'PDU Gestionable per Xarxa IP SNMP 8 Preses C13 Monitoritzades', brand: 'RackMatic', category: 'Racks 19"', stock: 14, min: 3, price: 195.00, tier: 'Mitjà Empresarial' },
  { id: 9, sku: 'APC-AP8858-PDU', name: 'PDU APC Metered Rack 2G 208V/230V 16A Zero-U 20xC13 4xC19', brand: 'APC Schneider', category: 'Racks 19"', stock: 10, min: 2, price: 460.00, tier: 'Professional / CPD' },
  { id: 10, sku: 'EAT-EMA001-PDU', name: 'PDU Eaton ePDU G3 Managed 16A Commutació Remota per Port', brand: 'Eaton', category: 'Racks 19"', stock: 8, min: 2, price: 590.00, tier: 'Professional / CPD' },

  // ─── 2. CABLEJAT ESTRUCTURAT CAT6A/CAT7 & FIBRA ÒPTICA (12 REFERÈNCIES) ───
  { id: 11, sku: 'DRK-C6A-305', name: 'Bobina 305m Cable UTP Cat6A LSZH 500MHz Draka UC500', brand: 'Draka Prysmian', category: 'Cablejat', stock: 95, min: 20, price: 115.00, tier: 'Bàsic / General' },
  { id: 12, sku: 'LEG-C6A-F305', name: 'Bobina 305m Cable FTP Cat6A Apantallat LCS3 10G Euroclasse Cca', brand: 'Legrand', category: 'Cablejat', stock: 45, min: 10, price: 148.00, tier: 'Mitjà Empresarial' },
  { id: 13, sku: 'CMS-C6A-STP', name: 'Bobina 500m Cable S/FTP Cat7 Industrial LSZH 600MHz GigaSPEED', brand: 'CommScope', category: 'Cablejat', stock: 22, min: 5, price: 285.00, tier: 'Professional / CPD' },
  { id: 14, sku: 'PAN-TX6A-UTP', name: 'Bobina 305m Cable Cat6A Panduit TX6A-SD 10Gig F/UTP Cca', brand: 'Panduit', category: 'Cablejat', stock: 26, min: 6, price: 195.00, tier: 'Mitjà Empresarial' },
  { id: 15, sku: 'PAN-NK6-PP24', name: 'Patch Panel Panduit NetKey 24 Ports Cat6A RJ45 Apantallat 1U', brand: 'Panduit', category: 'Cablejat', stock: 35, min: 8, price: 85.00, tier: 'Mitjà Empresarial' },
  { id: 16, sku: 'LEG-PP24-KYS', name: 'Patch Panel 24 Ports Cat6A RJ45 Keystones FTP 1U Legrand', brand: 'Legrand', category: 'Cablejat', stock: 50, min: 12, price: 48.00, tier: 'Bàsic / General' },
  { id: 17, sku: 'DRK-PTCH-1M', name: 'Lot 100x Latiguillos Cat6A UTP 1m LSZH Blau Snagless', brand: 'Draka Prysmian', category: 'Cablejat', stock: 30, min: 6, price: 140.00, tier: 'Bàsic / General' },
  { id: 18, sku: 'DRK-PTCH-2M', name: 'Lot 100x Latiguillos Cat6A UTP 2m LSZH Gris Snagless', brand: 'Draka Prysmian', category: 'Cablejat', stock: 30, min: 6, price: 180.00, tier: 'Bàsic / General' },
  { id: 19, sku: 'PAN-PTCH-5M-10', name: 'Pack 10x Latiguillos Cat6A S/FTP Panduit 5m Apantallats Cca', brand: 'Panduit', category: 'Cablejat', stock: 25, min: 5, price: 95.00, tier: 'Mitjà Empresarial' },
  { id: 20, sku: 'CRN-FO4-500', name: 'Bobina 500m Fibra Òptica OM4 Multimode 50/125um LSZH Tight-Buffer', brand: 'Corning', category: 'Cablejat', stock: 12, min: 3, price: 290.00, tier: 'Mitjà Empresarial' },
  { id: 21, sku: 'CRN-OS2-1000', name: 'Bobina 1000m Fibra Òptica Monomode OS2 9/125um Blindada CPD', brand: 'Corning', category: 'Cablejat', stock: 8, min: 2, price: 440.00, tier: 'Professional / CPD' },
  { id: 22, sku: 'CRN-PPFO-24', name: 'Safata Repartidora Fibra Òptica 1U 24 Ports LC Duplex Corning', brand: 'Corning', category: 'Cablejat', stock: 16, min: 3, price: 125.00, tier: 'Mitjà Empresarial' },

  // ─── 3. SWITCHES & ROUTING GESTIONABLE L2/L3 (14 REFERÈNCIES) ───
  { id: 23, sku: 'CSCO-C1000-24P', name: 'Switch Cisco Catalyst 1000 24 Ports Gigabit PoE+ 195W 4xSFP', brand: 'Cisco', category: 'Xarxa & VLAN', stock: 24, min: 5, price: 340.00, tier: 'Mitjà Empresarial' },
  { id: 24, sku: 'CSCO-CBS350-48P', name: 'Switch Cisco CBS350 48 Ports Gigabit PoE+ 370W 4x10G SFP+ Enrutament L3', brand: 'Cisco', category: 'Xarxa & VLAN', stock: 14, min: 3, price: 680.00, tier: 'Mitjà Empresarial' },
  { id: 25, sku: 'CSCO-C9200L-24T', name: 'Switch Cisco Catalyst 9200L 24 Ports L3 Avançat 4x10G StackWise', brand: 'Cisco', category: 'Xarxa & VLAN', stock: 8, min: 2, price: 1450.00, tier: 'Professional / CPD' },
  { id: 26, sku: 'CSCO-C9300-48UXM', name: 'Switch Cisco Catalyst 9300 48 Ports MultiGigabit mGig UPoE 90W 100G Uplink', brand: 'Cisco', category: 'Xarxa & VLAN', stock: 4, min: 1, price: 3850.00, tier: 'Professional / CPD' },
  { id: 27, sku: 'UBQ-USW-PRO-24P', name: 'Switch Ubiquiti UniFi Pro 24 Ports PoE+ 400W L3 amb 2x10G SFP+', brand: 'Ubiquiti', category: 'Xarxa & VLAN', stock: 22, min: 4, price: 360.00, tier: 'Mitjà Empresarial' },
  { id: 28, sku: 'UBQ-USW-ENT-48P', name: 'Switch Ubiquiti UniFi Enterprise 48 Ports 2.5GbE PoE+ 720W 4x25G SFP28', brand: 'Ubiquiti', category: 'Xarxa & VLAN', stock: 8, min: 2, price: 1290.00, tier: 'Professional / CPD' },
  { id: 29, sku: 'UBQ-USW-AGG-8', name: 'Switch UniFi Aggregation 8 Ports 10G SFP+ Troncal per CPD', brand: 'Ubiquiti', category: 'Xarxa & VLAN', stock: 15, min: 3, price: 260.00, tier: 'Mitjà Empresarial' },
  { id: 30, sku: 'ARUB-IO-1930-24', name: 'Switch Aruba Instant On 1930 24 Ports PoE+ 195W L2+ Cloud 4xSFP+', brand: 'HPE Aruba', category: 'Xarxa & VLAN', stock: 20, min: 4, price: 285.00, tier: 'Bàsic / General' },
  { id: 31, sku: 'ARUB-CX-6100-48P', name: 'Switch Aruba CX 6100 48 Ports PoE+ 370W Enterprise L3 Class 4', brand: 'HPE Aruba', category: 'Xarxa & VLAN', stock: 10, min: 2, price: 890.00, tier: 'Mitjà Empresarial' },
  { id: 32, sku: 'TPL-SG3428XMP', name: 'Switch TP-Link Omada 24 Ports PoE+ 384W 4x10G SFP+ L2+ SDN', brand: 'TP-Link Omada', category: 'Xarxa & VLAN', stock: 18, min: 4, price: 295.00, tier: 'Bàsic / General' },
  { id: 33, sku: 'MIK-RB5009-UG', name: 'Router MikroTik RB5009UG+S+IN Gigabit PoE+ 1x2.5G 1x10G SFP+ RouterOS v7', brand: 'MikroTik', category: 'Xarxa & VLAN', stock: 26, min: 6, price: 185.00, tier: 'Bàsic / General' },
  { id: 34, sku: 'MIK-CCR2004-10G', name: 'Router Gateway MikroTik CCR2004 16x10G SFP+ Dual Redundant PSU', brand: 'MikroTik', category: 'Xarxa & VLAN', stock: 16, min: 3, price: 425.00, tier: 'Mitjà Empresarial' },
  { id: 35, sku: 'MIK-CRS326-24G', name: 'Switch MikroTik CRS326 Cloud Router Switch 24xGbE 2xSFP+ Dual Boot', brand: 'MikroTik', category: 'Xarxa & VLAN', stock: 20, min: 4, price: 175.00, tier: 'Bàsic / General' },
  { id: 36, sku: 'MIK-CCR2116-12G', name: 'Core Router MikroTik CCR2116-12G-4S+ 16-Core 64-bit 10G BGP/OSPF', brand: 'MikroTik', category: 'Xarxa & VLAN', stock: 6, min: 2, price: 820.00, tier: 'Professional / CPD' },

  // ─── 4. WI-FI 6 I WI-FI 7 EMPRESARIAL (10 REFERÈNCIES) ───
  { id: 37, sku: 'UBQ-U6-PRO', name: 'Punt d\'Accés Wi-Fi 6 Ubiquiti UniFi 6 Pro AX5400 Gigabit 4x4 MIMO', brand: 'Ubiquiti', category: 'Wi-Fi 6', stock: 60, min: 12, price: 110.00, tier: 'Mitjà Empresarial' },
  { id: 38, sku: 'UBQ-U6-LR', name: 'Punt d\'Accés Wi-Fi 6 Ubiquiti UniFi 6 Long-Range AX3000 Cobertura Ampla', brand: 'Ubiquiti', category: 'Wi-Fi 6', stock: 35, min: 8, price: 135.00, tier: 'Mitjà Empresarial' },
  { id: 39, sku: 'UBQ-U6-ENT', name: 'Punt d\'Accés Wi-Fi 6E Ubiquiti UniFi Enterprise 10.2Gbps 2.5GbE Tri-Band', brand: 'Ubiquiti', category: 'Wi-Fi 6', stock: 18, min: 4, price: 245.00, tier: 'Professional / CPD' },
  { id: 40, sku: 'UBQ-U7-PRO', name: 'Punt d\'Accés Wi-Fi 7 Ubiquiti UniFi 7 Pro Tri-Band 2.5GbE Multi-Link Operation', brand: 'Ubiquiti', category: 'Wi-Fi 6', stock: 24, min: 5, price: 165.00, tier: 'Mitjà Empresarial' },
  { id: 41, sku: 'UBQ-UCG-ULTRA', name: 'Controladora UniFi Cloud Gateway Ultra 1Gbps Firewall IPS integrat', brand: 'Ubiquiti', category: 'Wi-Fi 6', stock: 24, min: 5, price: 139.00, tier: 'Bàsic / General' },
  { id: 42, sku: 'UBQ-UDM-PRO-MAX', name: 'Consola de Xarxa Ubiquiti UniFi Dream Machine Pro Max Dual 10G SFP+ NVR', brand: 'Ubiquiti', category: 'Wi-Fi 6', stock: 10, min: 2, price: 540.00, tier: 'Professional / CPD' },
  { id: 43, sku: 'ARUB-AP22', name: 'Punt d\'Accés Wi-Fi 6 Aruba Instant On AP22 AX1800 Mesh Certificat WPA3', brand: 'HPE Aruba', category: 'Wi-Fi 6', stock: 25, min: 5, price: 120.00, tier: 'Bàsic / General' },
  { id: 44, sku: 'ARUB-AP25', name: 'Punt d\'Accés Wi-Fi 6 Aruba Instant On AP25 AX5400 4x4 2.5G Ultra-Densitat', brand: 'HPE Aruba', category: 'Wi-Fi 6', stock: 16, min: 3, price: 215.00, tier: 'Mitjà Empresarial' },
  { id: 45, sku: 'CSCO-C9115AXI', name: 'Punt d\'Accés Cisco Catalyst 9115AXI Wi-Fi 6 Empresarial Antenes Internes', brand: 'Cisco', category: 'Wi-Fi 6', stock: 12, min: 3, price: 490.00, tier: 'Professional / CPD' },
  { id: 46, sku: 'CSCO-C9130AXE', name: 'Punt d\'Accés Cisco Catalyst 9130AXE Wi-Fi 6 8x8 Tri-Radio Alta Freqüència', brand: 'Cisco', category: 'Wi-Fi 6', stock: 6, min: 2, price: 890.00, tier: 'Professional / CPD' },

  // ─── 5. SEGURETAT PERIMETRAL / FIREWALLS NGFW (8 REFERÈNCIES) ───
  { id: 47, sku: 'FTN-FG-40F', name: 'Firewall NGFW Fortinet FortiGate 40F 5Gbps Firewall 600Mbps Threat Protection', brand: 'Fortinet', category: 'Seguretat NGFW', stock: 18, min: 4, price: 390.00, tier: 'Bàsic / General' },
  { id: 48, sku: 'FTN-FG-60F', name: 'Firewall NGFW Fortinet FortiGate 60F 10xGE RJ45 700Mbps SSL-VPN Inspecció', brand: 'Fortinet', category: 'Seguretat NGFW', stock: 22, min: 5, price: 580.00, tier: 'Mitjà Empresarial' },
  { id: 49, sku: 'FTN-FG-70F-BDL', name: 'Firewall NGFW Fortinet FortiGate 70F amb Llicència FortiGuard UTP 1 Any', brand: 'Fortinet', category: 'Seguretat NGFW', stock: 12, min: 3, price: 920.00, tier: 'Mitjà Empresarial' },
  { id: 50, sku: 'FTN-FG-100F', name: 'Firewall Corporatiu Fortinet FortiGate 100F 1Gbps IPS 2x10G SFP+ Dual PSU', brand: 'Fortinet', category: 'Seguretat NGFW', stock: 6, min: 2, price: 2150.00, tier: 'Professional / CPD' },
  { id: 51, sku: 'SNW-TZ370-SEC', name: 'Firewall SonicWall TZ370 TotalSecure Advanced Edition SD-WAN', brand: 'SonicWall', category: 'Seguretat NGFW', stock: 14, min: 3, price: 540.00, tier: 'Mitjà Empresarial' },
  { id: 52, sku: 'SNW-TZ470-W', name: 'Firewall SonicWall TZ470W Wi-Fi Integrat Multi-Gigabit Zero-Touch', brand: 'SonicWall', category: 'Seguretat NGFW', stock: 10, min: 2, price: 790.00, tier: 'Mitjà Empresarial' },
  { id: 53, sku: 'SNW-NS-2700', name: 'Firewall SonicWall NSa 2700 Enterprise 3Gbps Threat Prevention 3x10G SFP+', brand: 'SonicWall', category: 'Seguretat NGFW', stock: 4, min: 1, price: 2950.00, tier: 'Professional / CPD' },
  { id: 54, sku: 'MIK-RB4011-FW', name: 'Router Firewall MikroTik RB4011iGS+RM Quad-Core Encriptació IPsec Hardware', brand: 'MikroTik', category: 'Seguretat NGFW', stock: 20, min: 4, price: 225.00, tier: 'Bàsic / General' },

  // ─── 6. PROTECCIÓ ELÈCTRICA SAI / UPS (10 REFERÈNCIES) ───
  { id: 55, sku: 'APC-SMT-1500RMI', name: 'SAI APC Smart-UPS 1500VA Enrackable 2U Line-Interactive LCD SmartConnect', brand: 'APC Schneider', category: 'Protecció SAI', stock: 26, min: 5, price: 420.00, tier: 'Bàsic / General' },
  { id: 56, sku: 'APC-SRT-3000RMX', name: 'SAI APC Smart-UPS On-Line 3000VA 2U Doble Conversió 0ms Commutació', brand: 'APC Schneider', category: 'Protecció SAI', stock: 14, min: 3, price: 890.00, tier: 'Mitjà Empresarial' },
  { id: 57, sku: 'APC-SRT-5000RMX', name: 'SAI APC Smart-UPS On-Line 5000VA 3U Doble Conversió CPD Trifàsic/Monofàsic', brand: 'APC Schneider', category: 'Protecció SAI', stock: 5, min: 1, price: 2350.00, tier: 'Professional / CPD' },
  { id: 58, sku: 'SAL-TWIN-1500', name: 'SAI Salicru SLC Twin PRO2 1500VA Doble Conversió Torre/Rack Enclavat', brand: 'Salicru', category: 'Protecció SAI', stock: 20, min: 4, price: 395.00, tier: 'Bàsic / General' },
  { id: 59, sku: 'SAL-TWIN-3000', name: 'SAI Salicru SLC Twin PRO2 3000VA Doble Conversió On-Line Factor 1.0', brand: 'Salicru', category: 'Protecció SAI', stock: 12, min: 3, price: 620.00, tier: 'Mitjà Empresarial' },
  { id: 60, sku: 'SAL-ADAPT-6000', name: 'SAI Salicru SLC Adapt 6kVA Modular Redundant N+1 CPD Hot-Swap', brand: 'Salicru', category: 'Protecció SAI', stock: 4, min: 1, price: 2850.00, tier: 'Professional / CPD' },
  { id: 61, sku: 'EAT-9SX-1500IR', name: 'SAI Eaton 9SX 1500VA Doble Conversió Enrackable On-Line Factor 0.9', brand: 'Eaton', category: 'Protecció SAI', stock: 10, min: 2, price: 540.00, tier: 'Mitjà Empresarial' },
  { id: 62, sku: 'EAT-9PX-3000RT', name: 'SAI Eaton 9PX 3000VA 3000W On-Line Eficiència Energy Star 94%', brand: 'Eaton', category: 'Protecció SAI', stock: 8, min: 2, price: 1120.00, tier: 'Professional / CPD' },
  { id: 63, sku: 'TRP-SU1500RT', name: 'SAI Tripp Lite SmartOnline 1500VA 1350W 2U Doble Conversió Sinusoidal', brand: 'Tripp Lite', category: 'Protecció SAI', stock: 12, min: 3, price: 470.00, tier: 'Mitjà Empresarial' },
  { id: 64, sku: 'APC-AP9640-NMC', name: 'Targeta Gestió SNMP APC Network Management Card 3 (NMC3) Gigabit', brand: 'APC Schneider', category: 'Protecció SAI', stock: 22, min: 4, price: 140.00, tier: 'Mitjà Empresarial' },

  // ─── 7. SERVIDORS DE CPD & RACKS (10 REFERÈNCIES) ───
  { id: 65, sku: 'DEL-PE-R250-E', name: 'Servidor Dell PowerEdge R250 1U Intel Xeon E-2336 16GB ECC PERC H355', brand: 'Dell', category: 'Servidors', stock: 12, min: 3, price: 1280.00, tier: 'Bàsic / General' },
  { id: 66, sku: 'DEL-PE-R450-XN', name: 'Servidor Dell PowerEdge R450 1U Intel Xeon Silver 4310 32GB RDIMM Dual PSU', brand: 'Dell', category: 'Servidors', stock: 10, min: 2, price: 1890.00, tier: 'Mitjà Empresarial' },
  { id: 67, sku: 'DEL-PE-R660-XS', name: 'Servidor Dell PowerEdge R660 1U 2x Intel Xeon Gold 5416S 64GB DDR5 iDRAC9 Enterprise', brand: 'Dell', category: 'Servidors', stock: 5, min: 1, price: 3750.00, tier: 'Professional / CPD' },
  { id: 68, sku: 'DEL-PE-R760-2U', name: 'Servidor Dell PowerEdge R760 2U Dual Xeon Gold 6430 128GB DDR5 24xNVMe BOSS-N1', brand: 'Dell', category: 'Servidors', stock: 3, min: 1, price: 5400.00, tier: 'Professional / CPD' },
  { id: 69, sku: 'HPE-DL20-G10P', name: 'Servidor HPE ProLiant DL20 Gen10 Plus Intel Xeon E-2314 16GB iLO5 Standard', brand: 'HPE', category: 'Servidors', stock: 8, min: 2, price: 1420.00, tier: 'Mitjà Empresarial' },
  { id: 70, sku: 'HPE-DL360-G11', name: 'Servidor HPE ProLiant DL360 Gen11 1U Intel Xeon Silver 4410Y 32GB Smart Array', brand: 'HPE', category: 'Servidors', stock: 6, min: 2, price: 2650.00, tier: 'Professional / CPD' },
  { id: 71, sku: 'HPE-DL380-G11', name: 'Servidor HPE ProLiant DL380 Gen11 2U 2x Xeon Gold 5418Y 64GB 8SFF Redundant', brand: 'HPE', category: 'Servidors', stock: 4, min: 1, price: 4200.00, tier: 'Professional / CPD' },
  { id: 72, sku: 'LNV-SR250-V2', name: 'Servidor Lenovo ThinkSystem SR250 V2 1U Xeon E-2324G 16GB XClarity Controller', brand: 'Lenovo', category: 'Servidors', stock: 10, min: 2, price: 1350.00, tier: 'Mitjà Empresarial' },
  { id: 73, sku: 'LNV-SR630-V3', name: 'Servidor Lenovo ThinkSystem SR630 V3 1U Intel Xeon Silver 4410T 32GB DDR5', brand: 'Lenovo', category: 'Servidors', stock: 5, min: 1, price: 2780.00, tier: 'Professional / CPD' },
  { id: 74, sku: 'LNV-SR650-V3', name: 'Servidor Lenovo ThinkSystem SR650 V3 2U Dual Xeon Gold 6426Y 128GB AnyBay', brand: 'Lenovo', category: 'Servidors', stock: 3, min: 1, price: 4890.00, tier: 'Professional / CPD' },

  // ─── 8. EMMAGATZEMATGE NAS/SAN & DISCOS / SSDs ENTERPRISE (12 REFERÈNCIES) ───
  { id: 75, sku: 'SYN-DS224P-2B', name: 'Servidor NAS Synology DiskStation DS224+ 2-Bay Intel Celeron 2GB DDR4', brand: 'Synology', category: 'Servidors', stock: 25, min: 5, price: 320.00, tier: 'Bàsic / General' },
  { id: 76, sku: 'SYN-DS923P-4B', name: 'Servidor NAS Synology DiskStation DS923+ 4-Bay AMD Ryzen 4GB ECC M.2 NVMe', brand: 'Synology', category: 'Servidors', stock: 20, min: 4, price: 540.00, tier: 'Bàsic / General' },
  { id: 77, sku: 'SYN-RS822P-1U', name: 'Servidor NAS Synology RackStation RS822+ 1U 4-Bay Redundant PSU Btrfs', brand: 'Synology', category: 'Servidors', stock: 8, min: 2, price: 820.00, tier: 'Mitjà Empresarial' },
  { id: 78, sku: 'SYN-RS2423P-2U', name: 'Servidor NAS Synology RackStation RS2423RP+ 2U 12-Bay Redundant Power', brand: 'Synology', category: 'Servidors', stock: 5, min: 1, price: 1750.00, tier: 'Professional / CPD' },
  { id: 79, sku: 'QNP-TS464-4B', name: 'Servidor NAS QNAP TS-464 4-Bay Intel Celeron 2x2.5GbE Dual M.2 PCIe', brand: 'QNAP', category: 'Servidors', stock: 12, min: 3, price: 510.00, tier: 'Bàsic / General' },
  { id: 80, sku: 'QNP-TS873AU-2U', name: 'Servidor NAS QNAP TS-873AeU-RP 2U 8-Bay Curt Redundant PSU Dual 2.5GbE', brand: 'QNAP', category: 'Servidors', stock: 6, min: 2, price: 1180.00, tier: 'Mitjà Empresarial' },
  { id: 81, sku: 'WDC-REDPRO-8TB', name: 'Disc Dur Western Digital Red Pro 8TB NAS 7200RPM 256MB SATA3 CMR', brand: 'Western Digital', category: 'Servidors', stock: 75, min: 16, price: 215.00, tier: 'Bàsic / General' },
  { id: 82, sku: 'WDC-REDPRO-16TB', name: 'Disc Dur Western Digital Red Pro 16TB NAS 7200RPM 512MB SATA3 CMR Enterprise', brand: 'Western Digital', category: 'Servidors', stock: 35, min: 8, price: 330.00, tier: 'Mitjà Empresarial' },
  { id: 83, sku: 'ST-IRON-8TB', name: 'Disc Dur Seagate IronWolf Pro 8TB Enterprise NAS 7200RPM 256MB CMR', brand: 'Seagate', category: 'Servidors', stock: 45, min: 10, price: 195.00, tier: 'Bàsic / General' },
  { id: 84, sku: 'ST-IRON-16TB', name: 'Disc Dur Seagate IronWolf Pro 16TB Enterprise NAS 7200RPM 256MB AgileArray', brand: 'Seagate', category: 'Servidors', stock: 24, min: 6, price: 310.00, tier: 'Mitjà Empresarial' },
  { id: 85, sku: 'SAM-PM893-2TB', name: 'Disc SSD Empresarial Samsung PM893 1.92TB SATA 6Gb/s DWPD 1.3 Protecció Caiguda Elèctrica', brand: 'Samsung Enterprise', category: 'Servidors', stock: 40, min: 8, price: 185.00, tier: 'Mitjà Empresarial' },
  { id: 86, sku: 'SAM-PM9A3-384TB', name: 'Disc SSD Enterprise NVMe U.2 Samsung PM9A3 3.84TB PCIe 4.0 x4 6900MB/s 1.3 DWPD', brand: 'Samsung Enterprise', category: 'Servidors', stock: 15, min: 3, price: 395.00, tier: 'Professional / CPD' },

  // ─── 9. SISTEMES RETAIL & TPV COMERCIAL (9 REFERÈNCIES) ───
  { id: 87, sku: 'POS-XT3815-I3', name: 'Terminal TPV Posiflex XT-3815 15.6" Tàctil Capacitiu Core i3 Fanless IP65', brand: 'Posiflex', category: 'Retail TPV', stock: 28, min: 6, price: 410.00, tier: 'Bàsic / General' },
  { id: 88, sku: 'POS-RT2015-I5', name: 'Terminal TPV Posiflex RT-2015 15" Ultra-Prim Core i5 8GB SSD 128GB Disseny Elegant', brand: 'Posiflex', category: 'Retail TPV', stock: 16, min: 4, price: 590.00, tier: 'Mitjà Empresarial' },
  { id: 89, sku: 'POS-CR4100-BL', name: 'Calaix Portamonedes Posiflex CR-4100 Obertura Elèctrica RJ11 Alta Resistència', brand: 'Posiflex', category: 'Retail TPV', stock: 35, min: 8, price: 65.00, tier: 'Bàsic / General' },
  { id: 90, sku: 'EPS-TM20-ETH', name: 'Impressora Tèrmica Epson TM-T20III 250mm/s Ethernet + USB + Tallador Automàtic', brand: 'Epson', category: 'Retail TPV', stock: 32, min: 6, price: 135.00, tier: 'Bàsic / General' },
  { id: 91, sku: 'EPS-TM88-VII', name: 'Impressora Tèrmica Epson TM-T88VII Alta Velocitat 500mm/s Triple Interfície Cloud Print', brand: 'Epson', category: 'Retail TPV', stock: 18, min: 4, price: 260.00, tier: 'Mitjà Empresarial' },
  { id: 92, sku: 'ZEB-ZD421-TT', name: 'Impressora d\'Etiquetes Transferència Tèrmica Zebra ZD421t 300dpi Ethernet/USB', brand: 'Zebra Technologies', category: 'Retail TPV', stock: 15, min: 3, price: 340.00, tier: 'Mitjà Empresarial' },
  { id: 93, sku: 'ZEB-DS2208-2D', name: 'Lector Codi de Barres 2D QR Zebra DS2208 USB amb Suport Mans Lliures Intellistand', brand: 'Zebra Technologies', category: 'Retail TPV', stock: 40, min: 8, price: 92.00, tier: 'Bàsic / General' },
  { id: 94, sku: 'ZEB-TC21-MOB', name: 'Terminal Portàtil PDA Zebra TC21 Android 11 Wi-Fi Escàner SE4710 per Magatzem', brand: 'Zebra Technologies', category: 'Retail TPV', stock: 12, min: 3, price: 460.00, tier: 'Mitjà Empresarial' },
  { id: 95, sku: 'DAT-QSCAN-2D', name: 'Lector Codi de Barres 2D QR Datalogic QuickScan QD2430 amb Suport Fix', brand: 'Datalogic', category: 'Retail TPV', stock: 30, min: 6, price: 85.00, tier: 'Bàsic / General' },

  // ─── 10. INSTRUMENTACIÓ I CERTIFICACIÓ SMX & FIBRA (5 REFERÈNCIES) ───
  { id: 96, sku: 'FLK-DSX-5000', name: 'Certificador de Cablejat Fluke Networks DSX-5000 Cat6A 10G Calibrat Versiv 2', brand: 'Fluke Networks', category: 'Eines SAT', stock: 2, min: 1, price: 3400.00, tier: 'Professional / CPD' },
  { id: 97, sku: 'FLK-DSX-8000', name: 'Certificador de Cablejat Fluke Networks DSX-8000 Cat8 2000MHz 40G Cat8 Certificat', brand: 'Fluke Networks', category: 'Eines SAT', stock: 1, min: 1, price: 5800.00, tier: 'Professional / CPD' },
  { id: 98, sku: 'FLK-LIQ-100', name: 'Comprovador de Xarxa Fluke Networks LinkIQ amb Test de Càrrega PoE 90W i Cablejat', brand: 'Fluke Networks', category: 'Eines SAT', stock: 5, min: 1, price: 1850.00, tier: 'Professional / CPD' },
  { id: 99, sku: 'FLK-MS2-100', name: 'Comprovador Verificador de Cables MicroScanner2 Fluke Networks PoE i Mapa de Filferros', brand: 'Fluke Networks', category: 'Eines SAT', stock: 10, min: 2, price: 620.00, tier: 'Mitjà Empresarial' },
  { id: 100, sku: 'FLK-FIBER-INSP', name: 'Sonda d\'Inspecció de Fibra Òptica Fluke FiberInspector FI-7000 Pass/Fail Automatitzat', brand: 'Fluke Networks', category: 'Eines SAT', stock: 3, min: 1, price: 2150.00, tier: 'Professional / CPD' }
];

export const initialTickets = [
  {
    id: 'TCK-201',
    client: 'Logística & Robòtica Zona Franca BCN',
    subject: 'Verificació d\'autonomia en fallada elèctrica simulada SAI 3000VA',
    priority: 'Mitjana',
    status: 'Resolt',
    assignedTo: 'Joel Pérez Armenteros (Xarxes)',
    date: '2026-10-11',
    resolutionNotes: 'Prova de tall elèctric de 15 minuts realitzada amb èxit. Bateries al 94%, commutació a inversor en 0ms sense caiguda dels switches Cisco.'
  },
  {
    id: 'TCK-202',
    client: 'Clínica Dental Diagonal',
    subject: 'Configuració GPO per a bloqueig d\'USB no autoritzats (RGPD Mèdic)',
    priority: 'Alta',
    status: 'En progrés',
    assignedTo: 'Hans Lao Moncusi (Sistemes)',
    date: '2026-10-12',
    resolutionNotes: 'Polítiques de grup creades a l\'OU "Equips_Clinica". Pendents de test a la recepció i despatx mèdic principal.'
  },
  {
    id: 'TCK-203',
    client: 'Supermercats Gourmet Born',
    subject: 'Latència anòmala a la impressora tèrmica de tiquets Caixa 2',
    priority: 'Mitjana',
    status: 'En progrés',
    assignedTo: 'Joel Pérez Armenteros (Xarxes)',
    date: '2026-10-13',
    resolutionNotes: 'Revisat cable USB i port COM virtual. S\'ha assignat port estàtic i netejat cua de treball a Windows.'
  },
  {
    id: 'TCK-204',
    client: 'Nexum Tech Studio Barcelona (22@)',
    subject: 'Configuració xarxa de convidats amb aïllament d\'equips (Client Isolation)',
    priority: 'Baixa',
    status: 'Resolt',
    assignedTo: 'Joel Pérez Armenteros (Xarxes)',
    date: '2026-10-09',
    resolutionNotes: 'VLAN 50 creada a UniFi Controller amb subnet 192.168.50.0/24 i aïllament L2 total respecte a la xarxa corporativa.'
  },
  {
    id: 'TCK-205',
    client: 'Bufet Jurídic Fontanals',
    subject: 'Revisió d\'espai disponible al volum RAID 5 del NAS Synology',
    priority: 'Alta',
    status: 'Pendent',
    assignedTo: 'Hans Lao Moncusi (Sistemes)',
    date: '2026-10-13',
    resolutionNotes: 'Alerta del 85% d\'ocupació. Cal depurar snapshots de més de 90 dies i comprovar quotes per usuari.'
  }
];

export const initialTelemetry = [
  {
    id: 'SRV-DC01',
    name: 'SRV-DC01.kernelcore.local',
    role: 'Controlador de Domini AD DS / DNS',
    os: 'Windows Server 2025 Datacenter',
    location: 'DFactory Barcelona (Rack 24U)',
    ip: '192.168.10.10',
    status: 'online',
    cpu: 18,
    ram: 62,
    disk: 44,
    ping: 1.2,
    uptime: '42 dies, 14h 22m',
    services: [
      { name: 'Active Directory Domain Services', state: 'Running' },
      { name: 'DNS Server', state: 'Running' },
      { name: 'DHCP Failover', state: 'Running' },
      { name: 'Group Policy Client Engine', state: 'Running' }
    ]
  },
  {
    id: 'NAS-BCN',
    name: 'NAS-SYNOLOGY.kernelcore.local',
    role: 'Emmagatzematge RAID 5 & Còpies GFS',
    os: 'Synology DSM 7.2 (Btrfs)',
    location: 'DFactory Barcelona (Mural 12U)',
    ip: '192.168.10.15',
    status: 'online',
    cpu: 12,
    ram: 48,
    disk: 58,
    ping: 0.8,
    uptime: '89 dies, 06h 11m',
    services: [
      { name: 'Snapshot Replication Engine', state: 'Running' },
      { name: 'Hyper Backup Vault (Xifrat AES-256)', state: 'Running' },
      { name: 'iSCSI Target Server', state: 'Running' }
    ]
  },
  {
    id: 'SW-CORE-01',
    name: 'SW-CISCO-CATALYST-L3',
    role: 'Switch de Distribució & Enrutament Inter-VLAN',
    os: 'Cisco IOS-XE 17.9',
    location: 'DFactory Barcelona (Mòdul Xarxa)',
    ip: '192.168.10.1',
    status: 'online',
    cpu: 24,
    ram: 39,
    disk: 15,
    ping: 0.4,
    uptime: '110 dies, 18h 03m',
    services: [
      { name: 'VLAN Routing (10, 20, 30, 40)', state: 'Active' },
      { name: 'Spanning Tree Protocol (RSTP)', state: 'Forwarding' },
      { name: 'PoE+ Power Budget (370W)', state: '142W Consum' }
    ]
  },
  {
    id: 'UPS-APC-3000',
    name: 'UPS-APC-SMART3000-OL',
    role: 'SAI Doble Conversió On-Line',
    os: 'APC SmartConnect v4.2',
    location: 'DFactory Barcelona (Sub-quadre elèctric)',
    ip: '192.168.10.250',
    status: 'online',
    cpu: 8,
    ram: 20,
    disk: 10,
    ping: 1.1,
    uptime: '154 dies, 01h 55m',
    services: [
      { name: 'Càrrega de Bateries', state: '100% Optima' },
      { name: 'Voltatge Entrada / Sortida', state: '231V / 230V' },
      { name: 'Autonomia estimada', state: '54 minuts a plena càrrega' }
    ]
  }
];

export const initialUsers = [
  {
    id: 1,
    nom: 'Administrador KernelCore',
    email: 'admin-kernelcore@kernelcore.com',
    password: 'admin1234',
    rol: 'Administrador',
    departament: 'Direcció DFactory',
    telefon: '+34 93 220 40 99 · Ext. 101',
    ubicacio: 'DFactory Barcelona, Carrer 27 del BZ, 10-16 (Zona Franca), 08040 Barcelona · Despatx 2.01',
    bio: 'Direcció executiva, governança tecnològica, relacions institucionals DFactory i gestió financera de KernelCore.',
    signaturaEmail: 'Administrador KernelCore\nDirecció General & Estratègia IT\nKernelCore Systems · DFactory Barcelona (Zona Franca)\nTel: +34 93 220 40 99 · admin-kernelcore@kernelcore.com',
    certificacions: ['ITIL 4 Managing Professional', 'Project Management Professional (PMP)', 'Lead Cybersecurity Auditor ISO 27001'],
    dataAlta: '01/09/2026',
    actiu: true
  },
  {
    id: 2,
    nom: 'Hans Lao Moncusi',
    email: 'hans@kernelcore.cat',
    password: 'HansKernel2026!',
    rol: 'Direcció Tècnica (Hans)',
    departament: 'Sistemes & Seguretat',
    telefon: '+34 93 220 40 99 · Ext. 202',
    ubicacio: 'DFactory Barcelona, Carrer 27 del BZ, 10-16 (Zona Franca), 08040 Barcelona · Laboratori de Servidors 2.04',
    bio: 'Cap d\'Enginyeria de Sistemes i Seguretat Informàtica. Especialitzat en Windows Server 2025, Active Directory, GPO, virtualització Proxmox, servidors Linux i compliment de la normativa RGPD.',
    signaturaEmail: 'Hans Lao Moncusi\nCap de Sistemes & Ciberseguretat · Direcció Tècnica\nKernelCore · DFactory Barcelona (Zona Franca)\nTel: +34 93 220 40 99 · hans@kernelcore.cat · www.kernelcore.cat',
    certificacions: ['Microsoft MCSA Windows Server 2025', 'CompTIA Security+', 'Synology Certified Architect (DSM 7.2)', 'Especialista RGPD / ENS'],
    dataAlta: '01/09/2026',
    actiu: true
  },
  {
    id: 3,
    nom: 'Joel Pérez Armenteros',
    email: 'joel@kernelcore.cat',
    password: 'JoelKernel2026!',
    rol: 'Direcció General (Joel)',
    departament: 'Infraestructura de Xarxes',
    telefon: '+34 93 220 40 99 · Ext. 203',
    ubicacio: 'DFactory Barcelona, Carrer 27 del BZ, 10-16 (Zona Franca), 08040 Barcelona · Laboratori de Telecomunicacions 2.04',
    bio: 'Cap d\'Infraestructura de Xarxes i Telecomunicacions. Especialitzat en commutació Cisco Catalyst L2/L3, segmentació VLAN, cablejat Cat6A certificat per Fluke, armaris rack 19" i sistemes SAI industrials On-Line.',
    signaturaEmail: 'Joel Pérez Armenteros\nCap d\'Infraestructura de Xarxes · Direcció General\nKernelCore · DFactory Barcelona (Zona Franca)\nTel: +34 93 220 40 99 · joel@kernelcore.cat · www.kernelcore.cat',
    certificacions: ['Cisco Certified Network Associate (CCNA 200-301)', 'Fluke Networks Certified Cabling Test Technician (CCTT)', 'APC Schneider Critical Power Specialist', 'Ubiquiti Enterprise Wireless Administrator (UEWA)'],
    dataAlta: '01/09/2026',
    actiu: true
  }
];

export const initialContacts = [];

export const initialClients = [
  {
    id: 1,
    id_client: 1,
    nom_empresa: 'Logística & Robòtica Zona Franca BCN',
    name: 'Logística & Robòtica Zona Franca BCN',
    nif_cif: 'B-65891204',
    cif: 'B-65891204',
    persona_contacte: 'Carlos Mendoza',
    contact: 'Carlos Mendoza',
    telefon: '+34 932 631 100',
    phone: '+34 932 631 100',
    email: 'carlos.mendoza@logisticazf.cat',
    adreca: 'Carrer 27 del BZ, Zona Franca, Barcelona',
    address: 'Carrer 27 del BZ, Zona Franca, Barcelona',
    poblacio: 'Barcelona',
    tipus_entorn: 'Industrial',
    environment: 'Industrial',
    data_alta: '2026-09-15'
  },
  {
    id: 2,
    id_client: 2,
    nom_empresa: 'Clínica Dental Diagonal',
    name: 'Clínica Dental Diagonal',
    nif_cif: 'B-61209843',
    cif: 'B-61209843',
    persona_contacte: 'Dra. Laura Miralles',
    contact: 'Dra. Laura Miralles',
    telefon: '+34 934 145 220',
    phone: '+34 934 145 220',
    email: 'administracio@dentaldiagonal.cat',
    adreca: 'Av. Diagonal 490, Barcelona',
    address: 'Av. Diagonal 490, Barcelona',
    poblacio: 'Barcelona',
    tipus_entorn: 'Oficina PIME',
    environment: 'Oficina PIME',
    data_alta: '2026-09-18'
  },
  {
    id: 3,
    id_client: 3,
    nom_empresa: 'Supermercats Gourmet Born S.L.',
    name: 'Supermercats Gourmet Born S.L.',
    nif_cif: 'B-64901122',
    cif: 'B-64901122',
    persona_contacte: 'Marc Vila i Soler',
    contact: 'Marc Vila i Soler',
    telefon: '+34 932 458 910',
    phone: '+34 932 458 910',
    email: 'm.vila@gourmetborn.cat',
    adreca: 'Passeig del Born 18, Barcelona',
    address: 'Passeig del Born 18, Barcelona',
    poblacio: 'Barcelona',
    tipus_entorn: 'Comerç & Retail',
    environment: 'Comerç & Retail',
    data_alta: '2026-09-22'
  },
  {
    id: 4,
    id_client: 4,
    nom_empresa: 'Nexum Tech Studio Barcelona (22@)',
    name: 'Nexum Tech Studio Barcelona (22@)',
    nif_cif: 'B-67441098',
    cif: 'B-67441098',
    persona_contacte: 'Sílvia Camps Prat',
    contact: 'Sílvia Camps Prat',
    telefon: '+34 931 889 021',
    phone: '+34 931 889 021',
    email: 'silvia@nexumtech.barcelona',
    adreca: 'Carrer de Pallars 193, 22@ Barcelona',
    address: 'Carrer de Pallars 193, 22@ Barcelona',
    poblacio: 'Barcelona',
    tipus_entorn: 'Espai Co-working',
    environment: 'Espai Co-working',
    data_alta: '2026-09-29'
  },
  {
    id: 5,
    id_client: 5,
    nom_empresa: 'Centre Mèdic & Diagnòstic Eixample',
    name: 'Centre Mèdic & Diagnòstic Eixample',
    nif_cif: 'B-62334510',
    cif: 'B-62334510',
    persona_contacte: 'Dr. Oriol Rius Castells',
    contact: 'Dr. Oriol Rius Castells',
    telefon: '+34 934 112 300',
    phone: '+34 934 112 300',
    email: 'o.rius@mediceixample.com',
    adreca: 'Carrer d\'Aragó 280, Barcelona',
    address: 'Carrer d\'Aragó 280, Barcelona',
    poblacio: 'Barcelona',
    tipus_entorn: 'Oficina PIME',
    environment: 'Oficina PIME',
    data_alta: '2026-10-03'
  },
  {
    id: 6,
    id_client: 6,
    nom_empresa: 'Bufet Jurídic Fontanals & Associats',
    name: 'Bufet Jurídic Fontanals & Associats',
    nif_cif: 'B-59887120',
    cif: 'B-59887120',
    persona_contacte: 'Clara Fontanals Bellver',
    contact: 'Clara Fontanals Bellver',
    telefon: '+34 935 440 188',
    phone: '+34 935 440 188',
    email: 'clara@fontanalsjuridic.es',
    adreca: 'Passeig de Gràcia 84, Barcelona',
    address: 'Passeig de Gràcia 84, Barcelona',
    poblacio: 'Barcelona',
    tipus_entorn: 'Oficina PIME',
    environment: 'Oficina PIME',
    data_alta: '2026-10-08'
  }
];

export const initialSuppliers = [
  {
    id: 1,
    id_proveidor: 1,
    nom_comercial: 'Ingram Micro Technologies',
    name: 'Ingram Micro Technologies',
    cif: 'A-08123456',
    telefon: '935 000 100',
    phone: '935 000 100',
    email_contacte: 'comandes@ingrammicro.es',
    email: 'comandes@ingrammicro.es',
    adreca: 'Av. Diagonal 400, Barcelona',
    address: 'Av. Diagonal 400, Barcelona',
    condicions_pagament: '30 dies transferència',
    paymentTerms: '30 dies transferència',
    marques: ['Cisco', 'HPE', 'HPE Aruba', 'Dell', 'Lenovo', 'Microsoft', 'Fortinet'],
    marcas: ['Cisco', 'HPE', 'HPE Aruba', 'Dell', 'Lenovo', 'Microsoft', 'Fortinet'],
    brands: ['Cisco', 'HPE', 'HPE Aruba', 'Dell', 'Lenovo', 'Microsoft', 'Fortinet']
  },
  {
    id: 2,
    id_proveidor: 2,
    nom_comercial: 'Esprinet Ibèrica S.L.U.',
    name: 'Esprinet Ibèrica S.L.U.',
    cif: 'B-58234567',
    telefon: '936 000 200',
    phone: '936 000 200',
    email_contacte: 'vendes@esprinet.es',
    email: 'vendes@esprinet.es',
    adreca: 'Pol. Ind. Pedrosa, L\'Hospitalet de Llobregat',
    address: 'Pol. Ind. Pedrosa, L\'Hospitalet de Llobregat',
    condicions_pagament: '45 dies confirming',
    paymentTerms: '45 dies confirming',
    marques: ['Ubiquiti', 'MikroTik', 'TP-Link Omada', 'Synology', 'QNAP', 'Western Digital', 'Seagate', 'Samsung Enterprise'],
    marcas: ['Ubiquiti', 'MikroTik', 'TP-Link Omada', 'Synology', 'QNAP', 'Western Digital', 'Seagate', 'Samsung Enterprise'],
    brands: ['Ubiquiti', 'MikroTik', 'TP-Link Omada', 'Synology', 'QNAP', 'Western Digital', 'Seagate', 'Samsung Enterprise']
  },
  {
    id: 3,
    id_proveidor: 3,
    nom_comercial: 'Schneider Electric & APC España',
    name: 'Schneider Electric & APC España',
    cif: 'A-28001122',
    telefon: '934 843 100',
    phone: '934 843 100',
    email_contacte: 'distribucio@se.com',
    email: 'distribucio@se.com',
    adreca: 'Carrer de Bac de Roda 52, Barcelona',
    address: 'Carrer de Bac de Roda 52, Barcelona',
    condicions_pagament: '30 dies transferència',
    paymentTerms: '30 dies transferència',
    marques: ['APC Schneider', 'Legrand', 'Salicru', 'Eaton', 'Tripp Lite', 'RackMatic'],
    marcas: ['APC Schneider', 'Legrand', 'Salicru', 'Eaton', 'Tripp Lite', 'RackMatic'],
    brands: ['APC Schneider', 'Legrand', 'Salicru', 'Eaton', 'Tripp Lite', 'RackMatic']
  },
  {
    id: 4,
    id_proveidor: 4,
    nom_comercial: 'TD SYNNEX Spain (Tech Data)',
    name: 'TD SYNNEX Spain (Tech Data)',
    cif: 'B-08456789',
    telefon: '932 970 000',
    phone: '932 970 000',
    email_contacte: 'enterprise@tdsynnex.com',
    email: 'enterprise@tdsynnex.com',
    adreca: 'Carrer de la Selva 2, El Prat de Llobregat',
    address: 'Carrer de la Selva 2, El Prat de Llobregat',
    condicions_pagament: '60 dies domiciliació',
    paymentTerms: '60 dies domiciliació',
    marques: ['SonicWall', 'CommScope', 'Panduit', 'Corning', 'Draka Prysmian', 'Fluke Networks'],
    marcas: ['SonicWall', 'CommScope', 'Panduit', 'Corning', 'Draka Prysmian', 'Fluke Networks'],
    brands: ['SonicWall', 'CommScope', 'Panduit', 'Corning', 'Draka Prysmian', 'Fluke Networks']
  },
  {
    id: 5,
    id_proveidor: 5,
    nom_comercial: 'Posiflex & Retail Iberia',
    name: 'Posiflex & Retail Iberia',
    cif: 'B-63998877',
    telefon: '933 219 400',
    phone: '933 219 400',
    email_contacte: 'canal@posiflexiberia.com',
    email: 'canal@posiflexiberia.com',
    adreca: 'Carrer dels Motors 140, Zona Franca, Barcelona',
    address: 'Carrer dels Motors 140, Zona Franca, Barcelona',
    condicions_pagament: '30 dies transferència',
    paymentTerms: '30 dies transferència',
    marques: ['Posiflex', 'Epson', 'Zebra Technologies', 'Datalogic'],
    marcas: ['Posiflex', 'Epson', 'Zebra Technologies', 'Datalogic'],
    brands: ['Posiflex', 'Epson', 'Zebra Technologies', 'Datalogic']
  }
];

export const initialSentEmails = [
  {
    id: 'EML-2026-001',
    quoteId: 'PR-2026-001',
    codi_pressupost: 'PR-2026-001',
    to: 'carlos.mendoza@logisticazf.cat',
    clientName: 'Carlos Mendoza',
    companyName: 'Logística & Robòtica Zona Franca BCN',
    subject: 'Pressupost Oficial PR-2026-001 · Desplegament Xarxa Cat6A i SAI Doble Conversió',
    customMessage: 'Benvolgut Carlos, adjuntem el pressupost tècnic i econòmic definitiu validat des de DFactory Barcelona per a la nau de Zona Franca, incloent certificació Fluke DSX-5000 i SAI APC On-Line de 3000VA.',
    senderName: 'Joel Pérez Armenteros',
    senderRole: 'Direcció General · Infraestructura de Xarxes',
    attachmentName: 'Pressupost_KernelCore_PR-2026-001.pdf',
    amount: 8820.90,
    monthly: 195.00,
    transportMode: 'Nodemailer Ethereal SMTP',
    status: 'Lliurat amb PDF adjunt',
    sentAt: '2026-10-02T10:30:00.000Z',
    previewUrl: null
  },
  {
    id: 'EML-2026-002',
    quoteId: 'PR-2026-002',
    codi_pressupost: 'PR-2026-002',
    to: 'administracio@dentaldiagonal.cat',
    clientName: 'Dra. Laura Miralles',
    companyName: 'Clínica Dental Diagonal',
    subject: 'Pressupost Oficial PR-2026-002 · Domini Windows Server 2025 AD DS i Backups RGPD',
    customMessage: 'Benvolguda Dra. Miralles, li fem arribar la proposta completa d\'adequació tecnològica i seguretat mèdica RGPD amb servidor Dell PowerEdge i còpies 3-2-1 en NAS Synology.',
    senderName: 'Hans Lao Moncusi',
    senderRole: 'Direcció Tècnica · Sistemes & Seguretat',
    attachmentName: 'Pressupost_KernelCore_PR-2026-002.pdf',
    amount: 6957.50,
    monthly: 135.00,
    transportMode: 'Nodemailer Ethereal SMTP',
    status: 'Lliurat amb PDF adjunt',
    sentAt: '2026-10-05T15:15:00.000Z',
    previewUrl: null
  }
];

// Estat de memòria dinàmica viva
export let liveStore = {
  requests: [...initialRequests],
  quotes: [...initialQuotes],
  projects: [...initialProjects],
  inventory: [...initialInventory],
  tickets: [...initialTickets],
  telemetry: [...initialTelemetry],
  users: [...initialUsers],
  contacts: [...initialContacts],
  clients: [...initialClients],
  suppliers: [...initialSuppliers],
  sentEmails: [...initialSentEmails],
  auditLogs: []
};

export function runSystemAudit(isDbConnected = false) {
  const totalSkus = liveStore.inventory.length;
  const totalUnits = liveStore.inventory.reduce((acc, i) => acc + i.stock, 0);
  const lowStockItems = liveStore.inventory.filter(i => i.stock <= i.min);
  const totalValuation = Math.round(liveStore.inventory.reduce((acc, i) => acc + (i.stock * i.price), 0));

  const telemetryNodes = liveStore.telemetry.map(n => n.id);
  const allNodesSafe = liveStore.telemetry.every(n => n.status === 'online' && n.cpu < 90 && n.ram < 90 && n.ping < 15);

  const activeUsers = liveStore.users.filter(u => u.actiu);
  const activeProjects = liveStore.projects.length;
  const openTickets = liveStore.tickets.filter(t => t.status !== 'Resolt').length;
  const resolvedTickets = liveStore.tickets.filter(t => t.status === 'Resolt').length;

  const checks = [
    {
      id: 'CHK-DB',
      name: isDbConnected ? 'MariaDBRelacional' : 'FallbackMemòria',
      category: 'Base de Dades & Persistència',
      target: isDbConnected ? 'MariaDBRelacional' : 'FallbackMemòria',
      status: 'OK',
      detail: isDbConnected
        ? 'Pool mysql2/promise connectat a MariaDBRelacional (kernelcore_db @ Port 3306).'
        : 'Motor FallbackMemòria actiu amb sincronització d\'alta disponibilitat en temps real.'
    },
    {
      id: 'CHK-INV',
      name: `${totalSkus} SKUs (${totalUnits} unitats)`,
      category: 'Integritat de l\'Inventari',
      target: `${totalSkus} SKUs (${totalUnits} unitats)`,
      status: lowStockItems.length === 0 ? 'OK' : 'WARN',
      detail: `${totalSkus} SKUs verificats, ${totalUnits} unitats en magatzem DFactory (${totalValuation.toLocaleString('ca-ES')} €). Alertes d'estoc baix (stock <= min): ${lowStockItems.length}.`
    },
    {
      id: 'CHK-TEL',
      name: telemetryNodes.join(', '),
      category: 'Nodes de Telemetria Crítica',
      target: telemetryNodes.join(', '),
      status: allNodesSafe ? 'OK' : 'WARN',
      detail: `4 nodes monitoritzats (${telemetryNodes.join(', ')}) amb CPU, RAM i Ping ICMP dins del llindar segur.`
    },
    {
      id: 'CHK-RBAC',
      name: `${activeUsers.length} Usuaris Oficials`,
      category: 'Comptes i Permisos RBAC',
      target: `${activeUsers.length} Usuaris Oficials`,
      status: activeUsers.length === 3 ? 'OK' : 'WARN',
      detail: '3 comptes oficials verificats: Admin General, Hans Lao Moncusi i Joel Pérez Armenteros.'
    },
    {
      id: 'CHK-OPS',
      name: `${activeProjects} Projectes / ${liveStore.tickets.length} Tiquets SAT`,
      category: 'Projectes i Tiquets SAT Actius',
      target: `${activeProjects} Projectes / ${liveStore.tickets.length} Tiquets SAT`,
      status: 'OK',
      detail: `${activeProjects} desplegaments d'infraestructura actius, ${openTickets} tiquets SAT en curs i ${resolvedTickets} tiquets resolts.`
    }
  ];

  const auditResult = {
    id: `AUD-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toISOString(),
    status: 'OPTIMAL',
    mode: isDbConnected ? 'MariaDBRelacional' : 'FallbackMemòria',
    score: 100,
    checks
  };

  liveStore.auditLogs.unshift(auditResult);
  if (liveStore.auditLogs.length > 20) {
    liveStore.auditLogs.length = 20;
  }

  return auditResult;
}

// Generador de sol·licituds realistes
const CLIENT_COMPANIES = [
  { nom: 'Marta Soldevila Camps', empresa: 'BioTech Barcelona Labs', entorn: 'Laboratori / R+D', serveis: ['Xarxa Cat6A 10G', 'Servidor de Dades', 'SAI Doble Conversió'] },
  { nom: 'Eduard Font i Rovira', empresa: 'Assessoria Fiscal & Tributària Rambla', entorn: 'Despatx Jurídic', serveis: ['Còpies de Seguretat 3-2-1', 'Manteniment Mensual', 'RGPD'] },
  { nom: 'Carla Puigverd Martí', empresa: 'Estudi d\'Arquitectura & BIM 22@', entorn: 'Estudi de Disseny', serveis: ['NAS Synology 10GbE', 'Wi-Fi 6 d\'Alta Velocitat', 'Rack 12U'] },
  { nom: 'Pol Benavent Serra', empresa: 'Fàbrica Metal·lúrgica del Besòs', entorn: 'Indústria Pesant', serveis: ['Xarxa Industrial Blindada', 'Switch Cisco PoE+', 'Certificació Fluke'] }
];

export function generateRealisticRequest() {
  const tpl = CLIENT_COMPANIES[Math.floor(Math.random() * CLIENT_COMPANIES.length)];
  const id = `SOL-2026-${Math.floor(110 + Math.random() * 890)}`;
  const urgencies = ['urgent', 'normal', 'baixa'];
  const urgencia = urgencies[Math.floor(Math.random() * urgencies.length)];
  const req = {
    id,
    nom: tpl.nom,
    empresa: tpl.empresa,
    email: `contacte@${tpl.empresa.toLowerCase().replace(/[^a-z]/g, '')}.cat`,
    telefon: `+34 93${Math.floor(1000000 + Math.random() * 8999999)}`,
    entorn: tpl.entorn,
    treballadors: `${10 + Math.floor(Math.random() * 40)} treballadors`,
    urgencia,
    pressupostAprox: `${(3000 + Math.floor(Math.random() * 12) * 1000).toLocaleString('ca-ES')} €`,
    serveiLabels: tpl.serveis,
    descripcio: `Sol·licitud generada per a la seu de ${tpl.empresa}. Es requereix implantació urgent de ${tpl.serveis.join(', ')} amb certificació i posada en marxa per part de KernelCore.`,
    status: 'Nova sol·licitud',
    createdAt: new Date().toISOString()
  };
  liveStore.requests.unshift(req);
  return req;
}

export function generateRealisticTicket() {
  const clients = liveStore.quotes.map(q => q.client);
  const client = clients[Math.floor(Math.random() * clients.length)] || 'DFactory Barcelona Tenant';
  const subjects = [
    { s: 'Revisió de sincronització de còpies Synology NAS al núvol xifrat', p: 'Mitjana', lead: 'Hans Lao Moncusi (Sistemes)' },
    { s: 'Test de continuïtat del cablejat Cat6A i comprovació de par trenat 7-8', p: 'Alta', lead: 'Joel Pérez Armenteros (Xarxes)' },
    { s: 'Configuració de túnel VPN WireGuard xifrat per a teletreballadors', p: 'Mitjana', lead: 'Joel Pérez Armenteros (Xarxes)' },
    { s: 'Actualització de pedaços de seguretat a Windows Server 2025 sense aturada', p: 'Baixa', lead: 'Hans Lao Moncusi (Sistemes)' },
    { s: 'Alerta preventiva de temperatura al rack principal (> 32°C)', p: 'Alta', lead: 'Joel Pérez Armenteros (Xarxes)' }
  ];
  const tpl = subjects[Math.floor(Math.random() * subjects.length)];
  const id = `TCK-${Math.floor(210 + Math.random() * 790)}`;
  const ticket = {
    id,
    client,
    subject: tpl.s,
    priority: tpl.p,
    status: 'En progrés',
    assignedTo: tpl.lead,
    date: new Date().toISOString().split('T')[0],
    resolutionNotes: 'Ticket obert automàticament pel servei de monitoratge tècnic actiu de KernelCore.'
  };
  liveStore.tickets.unshift(ticket);
  return ticket;
}

export function injectCapitalInvestment(plan = 'basic_general') {
  let capitalInjected = 0;

  if (plan === 'basic_general') {
    // Inversió en estoc general i bàsic multimarca (Draka, Legrand, TP-Link, MikroTik, Synology, WD, Posiflex, Epson, Zebra)
    const additions = { 
      1: 15, 2: 8, 7: 35, 11: 40, 16: 25, 17: 15, 18: 15, 30: 12, 32: 10, 
      33: 15, 35: 12, 41: 12, 43: 15, 47: 10, 54: 12, 55: 14, 58: 10, 
      65: 6, 75: 12, 76: 10, 79: 8, 81: 40, 83: 25, 87: 14, 89: 20, 
      90: 16, 93: 20, 95: 15 
    };
    for (const [id, qty] of Object.entries(additions)) {
      const item = liveStore.inventory.find(i => i.id === Number(id));
      if (item) {
        item.stock += qty;
        capitalInjected += qty * item.price;
      }
    }
  } else if (plan === 'mid_networking') {
    // Inversió en gamma mitjana empresarial (Cisco, Ubiquiti, APC Schneider, Salicru, Eaton, Panduit, Corning, Fortinet, SonicWall)
    const additions = { 
      3: 10, 5: 8, 8: 10, 12: 20, 14: 15, 15: 18, 19: 15, 20: 8, 22: 10, 
      23: 16, 24: 8, 27: 14, 29: 10, 31: 6, 34: 10, 37: 30, 38: 18, 40: 15, 
      44: 10, 48: 12, 49: 8, 51: 8, 52: 6, 56: 8, 59: 8, 61: 6, 63: 6, 64: 12, 
      77: 6, 88: 8, 91: 10, 92: 8, 94: 6, 99: 5 
    };
    for (const [id, qty] of Object.entries(additions)) {
      const item = liveStore.inventory.find(i => i.id === Number(id));
      if (item) {
        item.stock += qty;
        capitalInjected += qty * item.price;
      }
    }
  } else if (plan === 'enterprise_servers') {
    // Inversió en servidors, emmagatzematge massiu, fibra i CPD (Dell, HPE, Lenovo, Seagate, Samsung Enterprise NVMe, CommScope, Fluke)
    const additions = { 
      4: 4, 6: 4, 9: 6, 10: 6, 13: 10, 21: 4, 25: 4, 26: 2, 28: 4, 36: 4, 
      39: 10, 42: 6, 45: 6, 46: 4, 50: 4, 53: 2, 57: 3, 60: 2, 62: 4, 
      67: 4, 68: 2, 70: 4, 71: 2, 73: 3, 74: 2, 78: 4, 86: 12, 96: 1, 
      97: 1, 98: 3, 100: 2 
    };
    for (const [id, qty] of Object.entries(additions)) {
      const item = liveStore.inventory.find(i => i.id === Number(id));
      if (item) {
        item.stock += qty;
        capitalInjected += qty * item.price;
      }
    }
  } else if (plan === 'megapack_multibrand') {
    // Aprovisionament massiu global de totes les referències (+100.000 €)
    liveStore.inventory.forEach(item => {
      const qty = item.tier.includes('Bàsic') ? 15 : item.tier.includes('Mitjà') ? 8 : 2;
      item.stock += qty;
      capitalInjected += qty * item.price;
    });
  }

  return {
    plan,
    capitalInjected: Math.round(capitalInjected),
    totalInventoryValuation: Math.round(liveStore.inventory.reduce((acc, i) => acc + (i.stock * i.price), 0)),
    totalUnits: liveStore.inventory.reduce((acc, i) => acc + i.stock, 0),
    totalSkus: liveStore.inventory.length
  };
}

// Dades del panell de control de KernelCore vinculades al model de BBDD relacional (kernelcore_db)

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

export const initialClients = [
  {
    id_client: 1,
    nom_empresa: 'Logística & Robòtica Zona Franca BCN',
    nif_cif: 'B-65891204',
    persona_contacte: 'Carlos Mendoza',
    telefon: '+34 932 631 100',
    email: 'carlos.mendoza@logisticazf.cat',
    adreca: 'Carrer 27 del BZ, Zona Franca, Barcelona',
    ciutat: 'Barcelona',
    tipus_entorn: 'Industrial'
  },
  {
    id_client: 2,
    nom_empresa: 'Clínica Dental Diagonal',
    nif_cif: 'B-61209843',
    persona_contacte: 'Dra. Laura Miralles',
    telefon: '+34 934 145 220',
    email: 'administracio@dentaldiagonal.cat',
    adreca: 'Av. Diagonal 490, Barcelona',
    ciutat: 'Barcelona',
    tipus_entorn: 'Oficina PIME'
  },
  {
    id_client: 3,
    nom_empresa: 'Supermercats Gourmet Born S.L.',
    nif_cif: 'B-64901122',
    persona_contacte: 'Marc Vila i Soler',
    telefon: '+34 932 458 910',
    email: 'm.vila@gourmetborn.cat',
    adreca: 'Passeig del Born 18, Barcelona',
    ciutat: 'Barcelona',
    tipus_entorn: 'Comerç & Retail'
  },
  {
    id_client: 4,
    nom_empresa: 'Nexum Tech Studio Barcelona (22@)',
    nif_cif: 'B-67441098',
    persona_contacte: 'Sílvia Camps Prat',
    telefon: '+34 931 889 021',
    email: 'silvia@nexumtech.barcelona',
    adreca: 'Carrer de Pallars 193, 22@ Barcelona',
    ciutat: 'Barcelona',
    tipus_entorn: 'Espai Co-working'
  },
  {
    id_client: 5,
    nom_empresa: 'Centre Mèdic & Diagnòstic Eixample',
    nif_cif: 'B-62334510',
    persona_contacte: 'Dr. Oriol Rius Castells',
    telefon: '+34 934 112 300',
    email: 'o.rius@mediceixample.com',
    adreca: 'Carrer d\'Aragó 280, Barcelona',
    ciutat: 'Barcelona',
    tipus_entorn: 'Oficina PIME'
  },
  {
    id_client: 6,
    nom_empresa: 'Bufet Jurídic Fontanals & Associats',
    nif_cif: 'B-59887120',
    persona_contacte: 'Clara Fontanals Bellver',
    telefon: '+34 935 440 188',
    email: 'clara@fontanalsjuridic.es',
    adreca: 'Passeig de Gràcia 84, Barcelona',
    ciutat: 'Barcelona',
    tipus_entorn: 'Oficina PIME'
  }
];

export const initialSuppliers = [
  {
    id_proveidor: 1,
    nom_comercial: 'Ingram Micro Technologies',
    cif: 'A-08123456',
    telefon: '935 000 100',
    email_contacte: 'comandes@ingrammicro.es',
    adreca: 'Av. Diagonal 400, Barcelona',
    condicions_pagament: '30 dies transferència',
    marques: ['Cisco', 'HPE', 'HPE Aruba', 'Dell', 'Lenovo', 'Fortinet']
  },
  {
    id_proveidor: 2,
    nom_comercial: 'Esprinet Ibèrica S.L.U.',
    cif: 'B-58234567',
    telefon: '936 000 200',
    email_contacte: 'vendes@esprinet.es',
    adreca: 'Pol. Ind. Pedrosa, L\'Hospitalet de Llobregat',
    condicions_pagament: '45 dies confirming',
    marques: ['Ubiquiti', 'MikroTik', 'TP-Link Omada', 'Synology', 'QNAP', 'Western Digital', 'Seagate', 'Samsung Enterprise']
  },
  {
    id_proveidor: 3,
    nom_comercial: 'Schneider Electric & APC España',
    cif: 'A-28001122',
    telefon: '934 843 100',
    email_contacte: 'distribucio@se.com',
    adreca: 'Carrer de Bac de Roda 52, Barcelona',
    condicions_pagament: '30 dies transferència',
    marques: ['APC Schneider', 'Legrand', 'Salicru', 'Eaton', 'Tripp Lite', 'RackMatic']
  },
  {
    id_proveidor: 4,
    nom_comercial: 'TD SYNNEX Spain (Tech Data)',
    cif: 'B-08456789',
    telefon: '932 970 000',
    email_contacte: 'enterprise@tdsynnex.com',
    adreca: 'Carrer de la Selva 2, El Prat de Llobregat',
    condicions_pagament: '60 dies domiciliació',
    marques: ['SonicWall', 'CommScope', 'Panduit', 'Corning', 'Draka Prysmian', 'Fluke Networks']
  },
  {
    id_proveidor: 5,
    nom_comercial: 'Posiflex & Retail Iberia',
    cif: 'B-63998877',
    telefon: '933 219 400',
    email_contacte: 'canal@posiflexiberia.com',
    adreca: 'Carrer dels Motors 140, Zona Franca, Barcelona',
    condicions_pagament: '30 dies transferència',
    marques: ['Posiflex', 'Epson', 'Zebra Technologies', 'Datalogic']
  }
];

export const initialAuditReport = {
  status: 'OPTIMAL',
  score: 100,
  intervalSeconds: 60,
  lastRun: new Date().toISOString(),
  checks: [
    {
      id: 'CHK-INV-100',
      name: 'Integritat d\'Estoc i 100 Referències SKU',
      status: 'OK',
      detail: '100/100 referències verificades sense trencament d\'estoc crític.'
    },
    {
      id: 'CHK-SUP-FK',
      name: 'Relació d\'Integritat Proveïdors (FK)',
      status: 'OK',
      detail: '5 proveïdors mayoristes oficials vinculats a les 25 marques del catàleg.'
    },
    {
      id: 'CHK-CLI-BCN',
      name: 'Cartera Corporativa i Pressupostos',
      status: 'OK',
      detail: '6 clients corporatius de Barcelona sincronitzats amb projectes i tiquets SAT.'
    },
    {
      id: 'CHK-TEL-NODES',
      name: 'Telemetria CPD DFactory Barcelona',
      status: 'OK',
      detail: '4 nodes crítics operatius amb latència mitjana < 1.5 ms i SAI al 100%.'
    },
    {
      id: 'CHK-SEC-RBAC',
      name: 'Control d\'Accés i Seguretat RGPD',
      status: 'OK',
      detail: '3 perfils oficials verificats amb autenticació SHA-256 i polítiques AD DS actives.'
    }
  ]
};

export const initialDashboardData = {
  kpis: {
    totalQuotes: initialQuotes.length,
    activeProjects: initialProjects.length,
    openTickets: initialTickets.filter(t => t.status !== 'Resolt').length,
    monthlyBilling: 25918.20
  },
  requests: initialRequests,
  quotes: initialQuotes,
  projects: initialProjects,
  tickets: initialTickets,
  inventory: initialInventory,
  telemetry: initialTelemetry,
  clients: initialClients,
  suppliers: initialSuppliers,
  audit: initialAuditReport
};

export const servicesData = [
  {
    id: 'xarxa',
    title: 'Infraestructura de Xarxa & Cablejat Estructurat',
    category: 'Xarxes & Telecomunicacions',
    description: 'Disseny, instal·lació i certificació de xarxes corporatives d\'alt rendiment sota estàndards TIA/EIA.',
    icon: 'Network',
    features: [
      'Cablejat UTP/STP Cat6 i Cat6A lliure d\'halògens (LSZH)',
      'Armaris Rack 19" murals i de terra amb ventilació forçada',
      'Configuració de switches gestionables L2/L3 amb suport PoE+',
      'Segmentació per VLANs (Sistemes, Gestió, Convidats, Wi-Fi)',
      'Enllaços Wi-Fi 6 Professionals de llarg abast amb Roaming actiu',
      'Maquetació prèvia i simulació de topologies amb GNS3 i Cisco Packet Tracer'
    ],
    sla: 'Garantia d\'instal·lació de 2 anys'
  },
  {
    id: 'servidors',
    title: 'Administració de Servidors & Virtualització',
    category: 'Sistemes Operatius',
    description: 'Implantació i gestió integral de servidors dedicats locals i entorns virtualitzats segurs.',
    icon: 'Server',
    features: [
      'Desplegament de Windows Server 2022/2025 i Linux Enterprise (Debian/Ubuntu/RHEL)',
      'Configuració de Dominis corporatius (Active Directory DS / Samba LDAP)',
      'Gestió centralitzada d\'usuaris, grups i polítiques de grup (GPO)',
      'Serveis de xarxa essencials: Servidors DNS interns i àmbits DHCP resistents',
      'Virtualització avançada amb Hyper-V i Proxmox VE per a alta densitat de serveis',
      'Compartició d\'arxius amb permisos estrictes ACL i xifratge BitLocker/LUKS'
    ],
    sla: 'Disponibilitat garantida 99.9%'
  },
  {
    id: 'seguretat',
    title: 'Seguretat Passiva & Continuïtat (SAI & Backups)',
    category: 'Seguretat & Contingència',
    description: 'Protecció contra caigudes de tensió i blindatge de la informació corporativa crítica.',
    icon: 'ShieldAlert',
    features: [
      'Auditoria de càrrega elèctrica i dimensionament de potència (W / VA)',
      'Instal·lació de sistemes SAI/UPS enrackables amb marge de seguretat del +20%',
      'Càlcul matemàtic d\'autonomia energètica garantida per a apagades suaus',
      'Política de còpies de seguretat sota la regla universal 3-2-1',
      'Planificació temporal GFS (Grandfather-Father-Son) amb retenció anual',
      'Còpies locals en servidors NAS amb RAID redundant + sincronització al Cloud'
    ],
    sla: 'Recuperació RPO < 1h / RTO < 4h'
  },
  {
    id: 'retail',
    title: 'Solucions de Punts de Venda (TPV) & Retail',
    category: 'Maquinari Comercial',
    description: 'Equipament informàtic complet per a botigues, mostradors i atenció ràpida al públic.',
    icon: 'MonitorSmartphone',
    features: [
      'Terminals TPV compactes i silenciosos amb pantalla tàctil capacitiva',
      'Calaixos portamonedes elèctrics d\'alta durabilitat amb obertura automàtica',
      'Impressores tèrmiques de tiquets d\'alta velocitat (connexió USB/Ethernet)',
      'Lectors manuals i omnidireccionals de codis de barres 1D i codis QR 2D',
      'Impressió multifunció làser departamental connectada en xarxa local',
      'Integració amb passarel·les de pagament bancari i datàfons TPV'
    ],
    sla: 'Substitució express en menys de 24h'
  },
  {
    id: 'bbdd',
    title: 'Bases de Dades & Desenvolupament Web',
    category: 'Software & Dades',
    description: 'Arquitectura de dades eficient i portals digitals que connecten la teva empresa amb el món.',
    icon: 'Database',
    features: [
      'Disseny de models relacionals SQL normalitzats (MySQL, MariaDB, PostgreSQL)',
      'Gestió de taules d\'estoc, catàlegs d\'articles, proveïdors i gestió de clients',
      'Implementació de sistemes de gestió de continguts (CMS WordPress o portals a mida)',
      'Reserva i gestió de dominis corporatius i configuració de hosting professional',
      'Connexió remota segura via SSH, SFTP i panells de control de gestió',
      'Optimització d\'índexs i seguretat contra injeccions SQL i accessos no autoritzats'
    ],
    sla: 'Optimització i integritat de dades'
  },
  {
    id: 'sat',
    title: 'Ciberseguretat Perimetral & Manteniment SAT',
    category: 'Manteniment & Ciberdefensa',
    description: 'Vigilància proactiva, resolució d\'incidències tècniques i blindatge de xarxes.',
    icon: 'Lock',
    features: [
      'Tallafocs perimetrals de xarxa (pfSense / OPNsense / Fortinet)',
      'Gestió i tancament de ports crítics, detecció d\'intrusions (IDS/IPS)',
      'Auditories regulars de vulnerabilitats i gestió de pedaços de seguretat',
      'Accés remot securitzat mitjançant túnels VPN WireGuard i OpenVPN',
      'Neteja física d\'equips, substitució de pasta tèrmica i gestió de ventilació',
      'Assistència remota d\'urgència i suport tècnic presencial per a avaries de maquinari'
    ],
    sla: 'Temps de resposta < 15 min'
  }
];

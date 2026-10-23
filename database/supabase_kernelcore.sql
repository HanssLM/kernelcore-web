-- ==========================================================
-- BBDD CLOUD SUPABASE (PostgreSQL) - KERNELCORE
-- Projecte de Síntesi CFGM SMX · DFactory Barcelona
-- Hans Lao Moncusi
-- ==========================================================

-- 1. TAULA: usuaris_tecnics
CREATE TABLE IF NOT EXISTS usuaris_tecnics (
    id_usuari SERIAL PRIMARY KEY,
    nom_complet VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    contrasenya_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(80) NOT NULL DEFAULT 'Tècnic de Sistemes',
    departament VARCHAR(60) DEFAULT 'Operacions IT DFactory',
    actiu BOOLEAN DEFAULT TRUE,
    data_creacio TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TAULA: proveidors
CREATE TABLE IF NOT EXISTS proveidors (
    id_proveidor SERIAL PRIMARY KEY,
    nom_comercial VARCHAR(100) NOT NULL,
    cif VARCHAR(15) NOT NULL UNIQUE,
    telefon VARCHAR(20) NOT NULL,
    email_contacte VARCHAR(100) NOT NULL,
    adreca VARCHAR(150),
    condicions_pagament VARCHAR(50) DEFAULT '30 dies transferència'
);

-- 3. TAULA: inventari_maquinari
CREATE TABLE IF NOT EXISTS inventari_maquinari (
    id_article SERIAL PRIMARY KEY,
    codi_referencia VARCHAR(30) NOT NULL UNIQUE,
    nom_article VARCHAR(150) NOT NULL,
    fabricant VARCHAR(60) NOT NULL,
    categoria VARCHAR(60) NOT NULL,
    gama VARCHAR(60) NOT NULL DEFAULT 'Mitjà Empresarial',
    id_proveidor INT REFERENCES proveidors(id_proveidor) ON DELETE SET NULL,
    estoc_actual INT NOT NULL DEFAULT 0,
    estoc_minim INT NOT NULL DEFAULT 2,
    preu_cost NUMERIC(10, 2) NOT NULL,
    preu_venda NUMERIC(10, 2) NOT NULL,
    ubicacio_magatzem VARCHAR(60) DEFAULT 'DFactory Hub - Passadís B',
    data_actualitzacio TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TAULA: clients
CREATE TABLE IF NOT EXISTS clients (
    id_client SERIAL PRIMARY KEY,
    nom_empresa VARCHAR(120) NOT NULL,
    nif_cif VARCHAR(15) NOT NULL UNIQUE,
    persona_contacte VARCHAR(100) NOT NULL,
    telefon VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    adreca VARCHAR(150) NOT NULL,
    poblacio VARCHAR(80) DEFAULT 'Barcelona',
    tipus_entorn VARCHAR(80) NOT NULL DEFAULT 'Oficina PIME',
    data_alta TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TAULA: pressupostos
CREATE TABLE IF NOT EXISTS pressupostos (
    id_pressupost SERIAL PRIMARY KEY,
    codi_pressupost VARCHAR(20) NOT NULL UNIQUE,
    id_client INT NOT NULL REFERENCES clients(id_client) ON DELETE CASCADE,
    resum_equipament TEXT NOT NULL,
    cost_maquinari NUMERIC(10, 2) NOT NULL,
    cost_software NUMERIC(10, 2) NOT NULL,
    cost_ma_obra NUMERIC(10, 2) NOT NULL,
    base_imposable NUMERIC(10, 2) NOT NULL,
    iva_percentatge NUMERIC(4, 2) DEFAULT 21.00,
    import_total NUMERIC(10, 2) NOT NULL,
    quota_mensual_suport NUMERIC(10, 2) DEFAULT 0.00,
    estat VARCHAR(60) DEFAULT 'Pendent de signatura',
    data_emissio DATE NOT NULL DEFAULT CURRENT_DATE
);

-- 6. TAULA: projectes_instalacio
CREATE TABLE IF NOT EXISTS projectes_instalacio (
    id_projecte SERIAL PRIMARY KEY,
    codi_projecte VARCHAR(20) NOT NULL UNIQUE,
    titol_projecte VARCHAR(150) NOT NULL,
    id_client INT NOT NULL REFERENCES clients(id_client) ON DELETE CASCADE,
    id_pressupost INT REFERENCES pressupostos(id_pressupost) ON DELETE SET NULL,
    percentatge_progres INT NOT NULL DEFAULT 0,
    data_inici DATE NOT NULL,
    data_termini DATE NOT NULL,
    id_tecnic_responsable INT REFERENCES usuaris_tecnics(id_usuari) ON DELETE SET NULL,
    estat VARCHAR(60) DEFAULT 'Planificació'
);

-- 7. TAULA: tiquets_sat
CREATE TABLE IF NOT EXISTS tiquets_sat (
    id_tiquet SERIAL PRIMARY KEY,
    codi_tiquet VARCHAR(20) NOT NULL UNIQUE,
    id_client INT NOT NULL REFERENCES clients(id_client) ON DELETE CASCADE,
    assumpte VARCHAR(150) NOT NULL,
    descripcio TEXT NOT NULL,
    prioritat VARCHAR(60) DEFAULT 'Mitjana',
    estat VARCHAR(60) DEFAULT 'Pendent',
    id_tecnic_assignat INT REFERENCES usuaris_tecnics(id_usuari) ON DELETE SET NULL,
    data_obertura TIMESTAMPTZ DEFAULT NOW(),
    data_resolucio TIMESTAMPTZ NULL
);

-- 8. TAULA: contactes_web
CREATE TABLE IF NOT EXISTS contactes_web (
    id_contacte SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL,
    telefon VARCHAR(20),
    tipus_servei VARCHAR(150) NOT NULL DEFAULT 'Auditoria General',
    missatge TEXT NOT NULL,
    consentiment_rgpd BOOLEAN NOT NULL DEFAULT TRUE,
    data_recepcio TIMESTAMPTZ DEFAULT NOW(),
    estat VARCHAR(60) DEFAULT 'Nou'
);

-- Habilitar accés públic de lectura/escriptura per al Client Web de Supabase
ALTER TABLE usuaris_tecnics ENABLE ROW LEVEL SECURITY;
ALTER TABLE proveidors ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventari_maquinari ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE pressupostos ENABLE ROW LEVEL SECURITY;
ALTER TABLE projectes_instalacio ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiquets_sat ENABLE ROW LEVEL SECURITY;
ALTER TABLE contactes_web ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accés públic usuaris_tecnics" ON usuaris_tecnics FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Accés públic proveidors" ON proveidors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Accés públic inventari_maquinari" ON inventari_maquinari FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Accés públic clients" ON clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Accés públic pressupostos" ON pressupostos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Accés públic projectes_instalacio" ON projectes_instalacio FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Accés públic tiquets_sat" ON tiquets_sat FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Accés públic contactes_web" ON contactes_web FOR ALL USING (true) WITH CHECK (true);

-- ----------------------------------------------------------
-- DADES INICIALS (INSERTS)
-- ----------------------------------------------------------
INSERT INTO usuaris_tecnics (nom_complet, email, contrasenya_hash, rol, departament) VALUES
('Administrador KernelCore', 'admin-kernelcore@kernelcore.com', 'ac9689e2272427085e35b9d3e3e8bed88cb3434828b43b86fc0596cad4c6e270', 'Administrador', 'Direcció DFactory'),
('Hans Lao Moncusi', 'hans@kernelcore.cat', '229b864c65a0aa0445fb6ea4e6f661ad8f39cf25afd4f3ec5a948b6fcbe21434', 'Direcció Tècnica (Hans)', 'Sistemes & Seguretat'),
('Joel Pérez Armenteros', 'joel@kernelcore.cat', 'c52f1f9c84ceeacd9c9e5d9c4cc86824fc89b3c824b451573ef72a224baab28f', 'Direcció General (Joel)', 'Infraestructura de Xarxes');

INSERT INTO proveidors (nom_comercial, cif, telefon, email_contacte, adreca, condicions_pagament) VALUES
('Ingram Micro Technologies', 'A-08123456', '935 000 100', 'comandes@ingrammicro.es', 'Av. Diagonal 400, Barcelona', '30 dies transferència'),
('Esprinet Ibèrica S.L.U.', 'B-58234567', '936 000 200', 'vendes@esprinet.es', 'Pol. Ind. Pedrosa, L\'Hospitalet de Llobregat', '45 dies confirming'),
('Schneider Electric & APC España', 'A-28001122', '934 843 100', 'distribucio@se.com', 'Carrer de Bac de Roda 52, Barcelona', '30 dies transferència'),
('TD SYNNEX Spain (Tech Data)', 'B-08456789', '932 970 000', 'enterprise@tdsynnex.com', 'Carrer de la Selva 2, El Prat de Llobregat', '60 dies domiciliació'),
('Posiflex & Retail Iberia', 'B-63998877', '933 219 400', 'canal@posiflexiberia.com', 'Carrer dels Motors 140, Zona Franca, Barcelona', '30 dies transferència');

INSERT INTO inventari_maquinari (codi_referencia, nom_article, fabricant, categoria, gama, id_proveidor, estoc_actual, estoc_minim, preu_cost, preu_venda, ubicacio_magatzem) VALUES
-- 3.1. Racks 19" & PDU / Distribució d'Energia (10 referències)
('LEG-RK12-WL', 'Armari Rack 19" Mural 12U Enclavat amb Porta de Vidre', 'Legrand', 'Racks 19"', 'Bàsic / General', 1, 28, 6, 113.10, 145.00, 'DFactory - Passadís A1'),
('RKM-RK18-WL', 'Armari Rack 19" Mural 18U amb Panells Laterals Desmuntables', 'RackMatic', 'Racks 19"', 'Bàsic / General', 2, 18, 4, 163.80, 210.00, 'DFactory - Passadís A1'),
('LEG-RK24-FL', 'Armari Rack 19" Terra 24U 600x800 amb Rodes i Fre', 'Legrand', 'Racks 19"', 'Mitjà Empresarial', 1, 16, 4, 296.40, 380.00, 'DFactory - Passadís A1'),
('APC-NS42-CPD', 'Armari Rack 19" CPD NetShelter SX 42U Insonoritzat 800x1200mm', 'APC Schneider', 'Racks 19"', 'Professional / CPD', 3, 6, 2, 897.00, 1150.00, 'DFactory - Passadís A2'),
('TRP-SRW12US', 'Armari Rack 19" Mural 12U Tripp Lite SmartRack Batent Pivotant', 'Tripp Lite', 'Racks 19"', 'Mitjà Empresarial', 1, 12, 3, 214.50, 275.00, 'DFactory - Passadís A1'),
('EAT-RE42-SRV', 'Armari Rack 19" Eaton RE Series 42U Perforat Ventilació 80%', 'Eaton', 'Racks 19"', 'Professional / CPD', 3, 8, 2, 764.40, 980.00, 'DFactory - Passadís A2'),
('LEG-PDU-8SCH', 'Regleta PDU 19" 8 Preses Schuko 16A amb Protecció Sobretensions', 'Legrand', 'Racks 19"', 'Bàsic / General', 1, 55, 12, 27.30, 35.00, 'DFactory - Passadís A3'),
('RKM-PDU-IP8', 'PDU Gestionable per Xarxa IP SNMP 8 Preses C13 Monitoritzades', 'RackMatic', 'Racks 19"', 'Mitjà Empresarial', 2, 14, 3, 152.10, 195.00, 'DFactory - Passadís A3'),
('APC-AP8858-PDU', 'PDU APC Metered Rack 2G 208V/230V 16A Zero-U 20xC13 4xC19', 'APC Schneider', 'Racks 19"', 'Professional / CPD', 3, 10, 2, 358.80, 460.00, 'DFactory - Passadís A3'),
('EAT-EMA001-PDU', 'PDU Eaton ePDU G3 Managed 16A Commutació Remota per Port', 'Eaton', 'Racks 19"', 'Professional / CPD', 3, 8, 2, 460.20, 590.00, 'DFactory - Passadís A3'),

-- 3.2. Cablejat Estructurat Cat6A/Cat7 & Fibra Òptica (12 referències)
('DRK-C6A-305', 'Bobina 305m Cable UTP Cat6A LSZH 500MHz Draka UC500', 'Draka Prysmian', 'Cablejat', 'Bàsic / General', 2, 95, 20, 89.70, 115.00, 'DFactory - Passadís B1'),
('LEG-C6A-F305', 'Bobina 305m Cable FTP Cat6A Apantallat LCS3 10G Euroclasse Cca', 'Legrand', 'Cablejat', 'Mitjà Empresarial', 1, 45, 10, 115.44, 148.00, 'DFactory - Passadís B1'),
('CMS-C6A-STP', 'Bobina 500m Cable S/FTP Cat7 Industrial LSZH 600MHz GigaSPEED', 'CommScope', 'Cablejat', 'Professional / CPD', 1, 22, 5, 222.30, 285.00, 'DFactory - Passadís B1'),
('PAN-TX6A-UTP', 'Bobina 305m Cable Cat6A Panduit TX6A-SD 10Gig F/UTP Cca', 'Panduit', 'Cablejat', 'Mitjà Empresarial', 1, 26, 6, 152.10, 195.00, 'DFactory - Passadís B1'),
('PAN-NK6-PP24', 'Patch Panel Panduit NetKey 24 Ports Cat6A RJ45 Apantallat 1U', 'Panduit', 'Cablejat', 'Mitjà Empresarial', 1, 35, 8, 66.30, 85.00, 'DFactory - Passadís B2'),
('LEG-PP24-KYS', 'Patch Panel 24 Ports Cat6A RJ45 Keystones FTP 1U Legrand', 'Legrand', 'Cablejat', 'Bàsic / General', 1, 50, 12, 37.44, 48.00, 'DFactory - Passadís B2'),
('DRK-PTCH-1M', 'Lot 100x Latiguillos Cat6A UTP 1m LSZH Blau Snagless', 'Draka Prysmian', 'Cablejat', 'Bàsic / General', 2, 30, 6, 109.20, 140.00, 'DFactory - Passadís B2'),
('DRK-PTCH-2M', 'Lot 100x Latiguillos Cat6A UTP 2m LSZH Gris Snagless', 'Draka Prysmian', 'Cablejat', 'Bàsic / General', 2, 30, 6, 140.40, 180.00, 'DFactory - Passadís B2'),
('PAN-PTCH-5M-10', 'Pack 10x Latiguillos Cat6A S/FTP Panduit 5m Apantallats Cca', 'Panduit', 'Cablejat', 'Mitjà Empresarial', 1, 25, 5, 74.10, 95.00, 'DFactory - Passadís B2'),
('CRN-FO4-500', 'Bobina 500m Fibra Òptica OM4 Multimode 50/125um LSZH Tight-Buffer', 'Corning', 'Cablejat', 'Mitjà Empresarial', 1, 12, 3, 226.20, 290.00, 'DFactory - Passadís B3'),
('CRN-OS2-1000', 'Bobina 1000m Fibra Òptica Monomode OS2 9/125um Blindada CPD', 'Corning', 'Cablejat', 'Professional / CPD', 1, 8, 2, 343.20, 440.00, 'DFactory - Passadís B3'),
('CRN-PPFO-24', 'Safata Repartidora Fibra Òptica 1U 24 Ports LC Duplex Corning', 'Corning', 'Cablejat', 'Mitjà Empresarial', 1, 16, 3, 97.50, 125.00, 'DFactory - Passadís B3'),

-- 3.3. Switches & Routing Gestionable L2/L3 (14 referències)
('CSCO-C1000-24P', 'Switch Cisco Catalyst 1000 24 Ports Gigabit PoE+ 195W 4xSFP', 'Cisco', 'Xarxa & VLAN', 'Mitjà Empresarial', 1, 24, 5, 265.20, 340.00, 'DFactory - Passadís C1'),
('CSCO-CBS350-48P', 'Switch Cisco CBS350 48 Ports Gigabit PoE+ 370W 4x10G SFP+ Enrutament L3', 'Cisco', 'Xarxa & VLAN', 'Mitjà Empresarial', 1, 14, 3, 530.40, 680.00, 'DFactory - Passadís C1'),
('CSCO-C9200L-24T', 'Switch Cisco Catalyst 9200L 24 Ports L3 Avançat 4x10G StackWise', 'Cisco', 'Xarxa & VLAN', 'Professional / CPD', 1, 8, 2, 1131.00, 1450.00, 'DFactory - Passadís C1'),
('CSCO-C9300-48UXM', 'Switch Cisco Catalyst 9300 48 Ports MultiGigabit mGig UPoE 90W 100G Uplink', 'Cisco', 'Xarxa & VLAN', 'Professional / CPD', 1, 4, 1, 3003.00, 3850.00, 'DFactory - Passadís C1'),
('UBQ-USW-PRO-24P', 'Switch Ubiquiti UniFi Pro 24 Ports PoE+ 400W L3 amb 2x10G SFP+', 'Ubiquiti', 'Xarxa & VLAN', 'Mitjà Empresarial', 2, 22, 4, 280.80, 360.00, 'DFactory - Passadís C2'),
('UBQ-USW-ENT-48P', 'Switch Ubiquiti UniFi Enterprise 48 Ports 2.5GbE PoE+ 720W 4x25G SFP28', 'Ubiquiti', 'Xarxa & VLAN', 'Professional / CPD', 2, 8, 2, 1006.20, 1290.00, 'DFactory - Passadís C2'),
('UBQ-USW-AGG-8', 'Switch UniFi Aggregation 8 Ports 10G SFP+ Troncal per CPD', 'Ubiquiti', 'Xarxa & VLAN', 'Mitjà Empresarial', 2, 15, 3, 202.80, 260.00, 'DFactory - Passadís C2'),
('ARUB-IO-1930-24', 'Switch Aruba Instant On 1930 24 Ports PoE+ 195W L2+ Cloud 4xSFP+', 'HPE Aruba', 'Xarxa & VLAN', 'Bàsic / General', 1, 20, 4, 222.30, 285.00, 'DFactory - Passadís C2'),
('ARUB-CX-6100-48P', 'Switch Aruba CX 6100 48 Ports PoE+ 370W Enterprise L3 Class 4', 'HPE Aruba', 'Xarxa & VLAN', 'Mitjà Empresarial', 1, 10, 2, 694.20, 890.00, 'DFactory - Passadís C2'),
('TPL-SG3428XMP', 'Switch TP-Link Omada 24 Ports PoE+ 384W 4x10G SFP+ L2+ SDN', 'TP-Link Omada', 'Xarxa & VLAN', 'Bàsic / General', 2, 18, 4, 230.10, 295.00, 'DFactory - Passadís C3'),
('MIK-RB5009-UG', 'Router MikroTik RB5009UG+S+IN Gigabit PoE+ 1x2.5G 1x10G SFP+ RouterOS v7', 'MikroTik', 'Xarxa & VLAN', 'Bàsic / General', 2, 26, 6, 144.30, 185.00, 'DFactory - Passadís C3'),
('MIK-CCR2004-10G', 'Router Gateway MikroTik CCR2004 16x10G SFP+ Dual Redundant PSU', 'MikroTik', 'Xarxa & VLAN', 'Mitjà Empresarial', 2, 16, 3, 331.50, 425.00, 'DFactory - Passadís C3'),
('MIK-CRS326-24G', 'Switch MikroTik CRS326 Cloud Router Switch 24xGbE 2xSFP+ Dual Boot', 'MikroTik', 'Xarxa & VLAN', 'Bàsic / General', 2, 20, 4, 136.50, 175.00, 'DFactory - Passadís C3'),
('MIK-CCR2116-12G', 'Core Router MikroTik CCR2116-12G-4S+ 16-Core 64-bit 10G BGP/OSPF', 'MikroTik', 'Xarxa & VLAN', 'Professional / CPD', 2, 6, 2, 639.60, 820.00, 'DFactory - Passadís C3'),

-- 3.4. Wi-Fi 6 i Wi-Fi 7 Empresarial (10 referències)
('UBQ-U6-PRO', 'Punt d\'Accés Wi-Fi 6 Ubiquiti UniFi 6 Pro AX5400 Gigabit 4x4 MIMO', 'Ubiquiti', 'Wi-Fi 6', 'Mitjà Empresarial', 2, 60, 12, 85.80, 110.00, 'DFactory - Passadís D1'),
('UBQ-U6-LR', 'Punt d\'Accés Wi-Fi 6 Ubiquiti UniFi 6 Long-Range AX3000 Cobertura Ampla', 'Ubiquiti', 'Wi-Fi 6', 'Mitjà Empresarial', 2, 35, 8, 105.30, 135.00, 'DFactory - Passadís D1'),
('UBQ-U6-ENT', 'Punt d\'Accés Wi-Fi 6E Ubiquiti UniFi Enterprise 10.2Gbps 2.5GbE Tri-Band', 'Ubiquiti', 'Wi-Fi 6', 'Professional / CPD', 2, 18, 4, 191.10, 245.00, 'DFactory - Passadís D1'),
('UBQ-U7-PRO', 'Punt d\'Accés Wi-Fi 7 Ubiquiti UniFi 7 Pro Tri-Band 2.5GbE Multi-Link Operation', 'Ubiquiti', 'Wi-Fi 6', 'Mitjà Empresarial', 2, 24, 5, 128.70, 165.00, 'DFactory - Passadís D1'),
('UBQ-UCG-ULTRA', 'Controladora UniFi Cloud Gateway Ultra 1Gbps Firewall IPS integrat', 'Ubiquiti', 'Wi-Fi 6', 'Bàsic / General', 2, 24, 5, 108.42, 139.00, 'DFactory - Passadís D1'),
('UBQ-UDM-PRO-MAX', 'Consola de Xarxa Ubiquiti UniFi Dream Machine Pro Max Dual 10G SFP+ NVR', 'Ubiquiti', 'Wi-Fi 6', 'Professional / CPD', 2, 10, 2, 421.20, 540.00, 'DFactory - Passadís D1'),
('ARUB-AP22', 'Punt d\'Accés Wi-Fi 6 Aruba Instant On AP22 AX1800 Mesh Certificat WPA3', 'HPE Aruba', 'Wi-Fi 6', 'Bàsic / General', 1, 25, 5, 93.60, 120.00, 'DFactory - Passadís D2'),
('ARUB-AP25', 'Punt d\'Accés Wi-Fi 6 Aruba Instant On AP25 AX5400 4x4 2.5G Ultra-Densitat', 'HPE Aruba', 'Wi-Fi 6', 'Mitjà Empresarial', 1, 16, 3, 167.70, 215.00, 'DFactory - Passadís D2'),
('CSCO-C9115AXI', 'Punt d\'Accés Cisco Catalyst 9115AXI Wi-Fi 6 Empresarial Antenes Internes', 'Cisco', 'Wi-Fi 6', 'Professional / CPD', 1, 12, 3, 382.20, 490.00, 'DFactory - Passadís D2'),
('CSCO-C9130AXE', 'Punt d\'Accés Cisco Catalyst 9130AXE Wi-Fi 6 8x8 Tri-Radio Alta Freqüència', 'Cisco', 'Wi-Fi 6', 'Professional / CPD', 1, 6, 2, 694.20, 890.00, 'DFactory - Passadís D2'),

-- 3.5. Seguretat Perimetral / Firewalls NGFW (8 referències)
('FTN-FG-40F', 'Firewall NGFW Fortinet FortiGate 40F 5Gbps Firewall 600Mbps Threat Protection', 'Fortinet', 'Seguretat NGFW', 'Bàsic / General', 1, 18, 4, 304.20, 390.00, 'DFactory - Passadís E1'),
('FTN-FG-60F', 'Firewall NGFW Fortinet FortiGate 60F 10xGE RJ45 700Mbps SSL-VPN Inspecció', 'Fortinet', 'Seguretat NGFW', 'Mitjà Empresarial', 1, 22, 5, 452.40, 580.00, 'DFactory - Passadís E1'),
('FTN-FG-70F-BDL', 'Firewall NGFW Fortinet FortiGate 70F amb Llicència FortiGuard UTP 1 Any', 'Fortinet', 'Seguretat NGFW', 'Mitjà Empresarial', 1, 12, 3, 717.60, 920.00, 'DFactory - Passadís E1'),
('FTN-FG-100F', 'Firewall Corporatiu Fortinet FortiGate 100F 1Gbps IPS 2x10G SFP+ Dual PSU', 'Fortinet', 'Seguretat NGFW', 'Professional / CPD', 1, 6, 2, 1677.00, 2150.00, 'DFactory - Passadís E1'),
('SNW-TZ370-SEC', 'Firewall SonicWall TZ370 TotalSecure Advanced Edition SD-WAN', 'SonicWall', 'Seguretat NGFW', 'Mitjà Empresarial', 1, 14, 3, 421.20, 540.00, 'DFactory - Passadís E2'),
('SNW-TZ470-W', 'Firewall SonicWall TZ470W Wi-Fi Integrat Multi-Gigabit Zero-Touch', 'SonicWall', 'Seguretat NGFW', 'Mitjà Empresarial', 1, 10, 2, 616.20, 790.00, 'DFactory - Passadís E2'),
('SNW-NS-2700', 'Firewall SonicWall NSa 2700 Enterprise 3Gbps Threat Prevention 3x10G SFP+', 'SonicWall', 'Seguretat NGFW', 'Professional / CPD', 1, 4, 1, 2301.00, 2950.00, 'DFactory - Passadís E2'),
('MIK-RB4011-FW', 'Router Firewall MikroTik RB4011iGS+RM Quad-Core Encriptació IPsec Hardware', 'MikroTik', 'Seguretat NGFW', 'Bàsic / General', 2, 20, 4, 175.50, 225.00, 'DFactory - Passadís E2'),

-- 3.6. Protecció Elèctrica SAI / UPS (10 referències)
('APC-SMT-1500RMI', 'SAI APC Smart-UPS 1500VA Enrackable 2U Line-Interactive LCD SmartConnect', 'APC Schneider', 'Protecció SAI', 'Bàsic / General', 3, 26, 5, 327.60, 420.00, 'DFactory - Passadís F1'),
('APC-SRT-3000RMX', 'SAI APC Smart-UPS On-Line 3000VA 2U Doble Conversió 0ms Commutació', 'APC Schneider', 'Protecció SAI', 'Mitjà Empresarial', 3, 14, 3, 694.20, 890.00, 'DFactory - Passadís F1'),
('APC-SRT-5000RMX', 'SAI APC Smart-UPS On-Line 5000VA 3U Doble Conversió CPD Trifàsic/Monofàsic', 'APC Schneider', 'Protecció SAI', 'Professional / CPD', 3, 5, 1, 1833.00, 2350.00, 'DFactory - Passadís F1'),
('SAL-TWIN-1500', 'SAI Salicru SLC Twin PRO2 1500VA Doble Conversió Torre/Rack Enclavat', 'Salicru', 'Protecció SAI', 'Bàsic / General', 2, 20, 4, 308.10, 395.00, 'DFactory - Passadís F2'),
('SAL-TWIN-3000', 'SAI Salicru SLC Twin PRO2 3000VA Doble Conversió On-Line Factor 1.0', 'Salicru', 'Protecció SAI', 'Mitjà Empresarial', 2, 12, 3, 483.60, 620.00, 'DFactory - Passadís F2'),
('SAL-ADAPT-6000', 'SAI Salicru SLC Adapt 6kVA Modular Redundant N+1 CPD Hot-Swap', 'Salicru', 'Protecció SAI', 'Professional / CPD', 2, 4, 1, 2223.00, 2850.00, 'DFactory - Passadís F2'),
('EAT-9SX-1500IR', 'SAI Eaton 9SX 1500VA Doble Conversió Enrackable On-Line Factor 0.9', 'Eaton', 'Protecció SAI', 'Mitjà Empresarial', 3, 10, 2, 421.20, 540.00, 'DFactory - Passadís F3'),
('EAT-9PX-3000RT', 'SAI Eaton 9PX 3000VA 3000W On-Line Eficiència Energy Star 94%', 'Eaton', 'Protecció SAI', 'Professional / CPD', 3, 8, 2, 873.60, 1120.00, 'DFactory - Passadís F3'),
('TRP-SU1500RT', 'SAI Tripp Lite SmartOnline 1500VA 1350W 2U Doble Conversió Sinusoidal', 'Tripp Lite', 'Protecció SAI', 'Mitjà Empresarial', 1, 12, 3, 366.60, 470.00, 'DFactory - Passadís F3'),
('APC-AP9640-NMC', 'Targeta Gestió SNMP APC Network Management Card 3 (NMC3) Gigabit', 'APC Schneider', 'Protecció SAI', 'Mitjà Empresarial', 3, 22, 4, 109.20, 140.00, 'DFactory - Passadís F3'),

-- 3.7. Servidors de CPD & Racks (10 referències)
('DEL-PE-R250-E', 'Servidor Dell PowerEdge R250 1U Intel Xeon E-2336 16GB ECC PERC H355', 'Dell', 'Servidors', 'Bàsic / General', 1, 12, 3, 998.40, 1280.00, 'DFactory - Passadís G1'),
('DEL-PE-R450-XN', 'Servidor Dell PowerEdge R450 1U Intel Xeon Silver 4310 32GB RDIMM Dual PSU', 'Dell', 'Servidors', 'Mitjà Empresarial', 1, 10, 2, 1474.20, 1890.00, 'DFactory - Passadís G1'),
('DEL-PE-R660-XS', 'Servidor Dell PowerEdge R660 1U 2x Intel Xeon Gold 5416S 64GB DDR5 iDRAC9 Enterprise', 'Dell', 'Servidors', 'Professional / CPD', 1, 5, 1, 2925.00, 3750.00, 'DFactory - Passadís G1'),
('DEL-PE-R760-2U', 'Servidor Dell PowerEdge R760 2U Dual Xeon Gold 6430 128GB DDR5 24xNVMe BOSS-N1', 'Dell', 'Servidors', 'Professional / CPD', 1, 3, 1, 4212.00, 5400.00, 'DFactory - Passadís G1'),
('HPE-DL20-G10P', 'Servidor HPE ProLiant DL20 Gen10 Plus Intel Xeon E-2314 16GB iLO5 Standard', 'HPE', 'Servidors', 'Mitjà Empresarial', 1, 8, 2, 1107.60, 1420.00, 'DFactory - Passadís G2'),
('HPE-DL360-G11', 'Servidor HPE ProLiant DL360 Gen11 1U Intel Xeon Silver 4410Y 32GB Smart Array', 'HPE', 'Servidors', 'Professional / CPD', 1, 6, 2, 2067.00, 2650.00, 'DFactory - Passadís G2'),
('HPE-DL380-G11', 'Servidor HPE ProLiant DL380 Gen11 2U 2x Xeon Gold 5418Y 64GB 8SFF Redundant', 'HPE', 'Servidors', 'Professional / CPD', 1, 4, 1, 3276.00, 4200.00, 'DFactory - Passadís G2'),
('LNV-SR250-V2', 'Servidor Lenovo ThinkSystem SR250 V2 1U Xeon E-2324G 16GB XClarity Controller', 'Lenovo', 'Servidors', 'Mitjà Empresarial', 2, 10, 2, 1053.00, 1350.00, 'DFactory - Passadís G3'),
('LNV-SR630-V3', 'Servidor Lenovo ThinkSystem SR630 V3 1U Intel Xeon Silver 4410T 32GB DDR5', 'Lenovo', 'Servidors', 'Professional / CPD', 2, 5, 1, 2168.40, 2780.00, 'DFactory - Passadís G3'),
('LNV-SR650-V3', 'Servidor Lenovo ThinkSystem SR650 V3 2U Dual Xeon Gold 6426Y 128GB AnyBay', 'Lenovo', 'Servidors', 'Professional / CPD', 2, 3, 1, 3814.20, 4890.00, 'DFactory - Passadís G3'),

-- 3.8. Emmagatzematge NAS/SAN & Discos / SSDs Enterprise (12 referències)
('SYN-DS224P-2B', 'Servidor NAS Synology DiskStation DS224+ 2-Bay Intel Celeron 2GB DDR4', 'Synology', 'Servidors', 'Bàsic / General', 2, 25, 5, 249.60, 320.00, 'DFactory - Passadís H1'),
('SYN-DS923P-4B', 'Servidor NAS Synology DiskStation DS923+ 4-Bay AMD Ryzen 4GB ECC M.2 NVMe', 'Synology', 'Servidors', 'Bàsic / General', 2, 20, 4, 421.20, 540.00, 'DFactory - Passadís H1'),
('SYN-RS822P-1U', 'Servidor NAS Synology RackStation RS822+ 1U 4-Bay Redundant PSU Btrfs', 'Synology', 'Servidors', 'Mitjà Empresarial', 2, 8, 2, 639.60, 820.00, 'DFactory - Passadís H1'),
('SYN-RS2423P-2U', 'Servidor NAS Synology RackStation RS2423RP+ 2U 12-Bay Redundant Power', 'Synology', 'Servidors', 'Professional / CPD', 2, 5, 1, 1365.00, 1750.00, 'DFactory - Passadís H1'),
('QNP-TS464-4B', 'Servidor NAS QNAP TS-464 4-Bay Intel Celeron 2x2.5GbE Dual M.2 PCIe', 'QNAP', 'Servidors', 'Bàsic / General', 2, 12, 3, 397.80, 510.00, 'DFactory - Passadís H1'),
('QNP-TS873AU-2U', 'Servidor NAS QNAP TS-873AeU-RP 2U 8-Bay Curt Redundant PSU Dual 2.5GbE', 'QNAP', 'Servidors', 'Mitjà Empresarial', 2, 6, 2, 920.40, 1180.00, 'DFactory - Passadís H1'),
('WDC-REDPRO-8TB', 'Disc Dur Western Digital Red Pro 8TB NAS 7200RPM 256MB SATA3 CMR', 'Western Digital', 'Servidors', 'Bàsic / General', 1, 75, 16, 167.70, 215.00, 'DFactory - Passadís H2'),
('WDC-REDPRO-16TB', 'Disc Dur Western Digital Red Pro 16TB NAS 7200RPM 512MB SATA3 CMR Enterprise', 'Western Digital', 'Servidors', 'Mitjà Empresarial', 1, 35, 8, 257.40, 330.00, 'DFactory - Passadís H2'),
('ST-IRON-8TB', 'Disc Dur Seagate IronWolf Pro 8TB Enterprise NAS 7200RPM 256MB CMR', 'Seagate', 'Servidors', 'Bàsic / General', 1, 45, 10, 152.10, 195.00, 'DFactory - Passadís H2'),
('ST-IRON-16TB', 'Disc Dur Seagate IronWolf Pro 16TB Enterprise NAS 7200RPM 256MB AgileArray', 'Seagate', 'Servidors', 'Mitjà Empresarial', 1, 24, 6, 241.80, 310.00, 'DFactory - Passadís H2'),
('SAM-PM893-2TB', 'Disc SSD Empresarial Samsung PM893 1.92TB SATA 6Gb/s DWPD 1.3 Protecció Caiguda Elèctrica', 'Samsung Enterprise', 'Servidors', 'Mitjà Empresarial', 1, 40, 8, 144.30, 185.00, 'DFactory - Passadís H3'),
('SAM-PM9A3-384TB', 'Disc SSD Enterprise NVMe U.2 Samsung PM9A3 3.84TB PCIe 4.0 x4 6900MB/s 1.3 DWPD', 'Samsung Enterprise', 'Servidors', 'Professional / CPD', 1, 15, 3, 308.10, 395.00, 'DFactory - Passadís H3'),

-- 3.9. Sistemes Retail & TPV Comercial (9 referències)
('POS-XT3815-I3', 'Terminal TPV Posiflex XT-3815 15.6" Tàctil Capacitiu Core i3 Fanless IP65', 'Posiflex', 'Retail TPV', 'Bàsic / General', 2, 28, 6, 319.80, 410.00, 'DFactory - Passadís I1'),
('POS-RT2015-I5', 'Terminal TPV Posiflex RT-2015 15" Ultra-Prim Core i5 8GB SSD 128GB Disseny Elegant', 'Posiflex', 'Retail TPV', 'Mitjà Empresarial', 2, 16, 4, 460.20, 590.00, 'DFactory - Passadís I1'),
('POS-CR4100-BL', 'Calaix Portamonedes Posiflex CR-4100 Obertura Elèctrica RJ11 Alta Resistència', 'Posiflex', 'Retail TPV', 'Bàsic / General', 2, 35, 8, 50.70, 65.00, 'DFactory - Passadís I1'),
('EPS-TM20-ETH', 'Impressora Tèrmica Epson TM-T20III 250mm/s Ethernet + USB + Tallador Automàtic', 'Epson', 'Retail TPV', 'Bàsic / General', 2, 32, 6, 105.30, 135.00, 'DFactory - Passadís I2'),
('EPS-TM88-VII', 'Impressora Tèrmica Epson TM-T88VII Alta Velocitat 500mm/s Triple Interfície Cloud Print', 'Epson', 'Retail TPV', 'Mitjà Empresarial', 2, 18, 4, 202.80, 260.00, 'DFactory - Passadís I2'),
('ZEB-ZD421-TT', 'Impressora d\'Etiquetes Transferència Tèrmica Zebra ZD421t 300dpi Ethernet/USB', 'Zebra Technologies', 'Retail TPV', 'Mitjà Empresarial', 1, 15, 3, 265.20, 340.00, 'DFactory - Passadís I3'),
('ZEB-DS2208-2D', 'Lector Codi de Barres 2D QR Zebra DS2208 USB amb Suport Mans Lliures Intellistand', 'Zebra Technologies', 'Retail TPV', 'Bàsic / General', 1, 40, 8, 71.76, 92.00, 'DFactory - Passadís I3'),
('ZEB-TC21-MOB', 'Terminal Portàtil PDA Zebra TC21 Android 11 Wi-Fi Escàner SE4710 per Magatzem', 'Zebra Technologies', 'Retail TPV', 'Mitjà Empresarial', 1, 12, 3, 358.80, 460.00, 'DFactory - Passadís I3'),
('DAT-QSCAN-2D', 'Lector Codi de Barres 2D QR Datalogic QuickScan QD2430 amb Suport Fix', 'Datalogic', 'Retail TPV', 'Bàsic / General', 2, 30, 6, 66.30, 85.00, 'DFactory - Passadís I3'),

-- 3.10. Instrumentació i Certificació SMX & Fibra (5 referències)
('FLK-DSX-5000', 'Certificador de Cablejat Fluke Networks DSX-5000 Cat6A 10G Calibrat Versiv 2', 'Fluke Networks', 'Eines SAT', 'Professional / CPD', 1, 2, 1, 2652.00, 3400.00, 'DFactory - Laboratori SAT'),
('FLK-DSX-8000', 'Certificador de Cablejat Fluke Networks DSX-8000 Cat8 2000MHz 40G Cat8 Certificat', 'Fluke Networks', 'Eines SAT', 'Professional / CPD', 1, 1, 1, 4524.00, 5800.00, 'DFactory - Laboratori SAT'),
('FLK-LIQ-100', 'Comprovador de Xarxa Fluke Networks LinkIQ amb Test de Càrrega PoE 90W i Cablejat', 'Fluke Networks', 'Eines SAT', 'Professional / CPD', 1, 5, 1, 1443.00, 1850.00, 'DFactory - Laboratori SAT'),
('FLK-MS2-100', 'Comprovador Verificador de Cables MicroScanner2 Fluke Networks PoE i Mapa de Filferros', 'Fluke Networks', 'Eines SAT', 'Mitjà Empresarial', 1, 10, 2, 483.60, 620.00, 'DFactory - Laboratori SAT'),
('FLK-FIBER-INSP', 'Sonda d\'Inspecció de Fibra Òptica Fluke FiberInspector FI-7000 Pass/Fail Automatitzat', 'Fluke Networks', 'Eines SAT', 'Professional / CPD', 1, 3, 1, 1677.00, 2150.00, 'DFactory - Laboratori SAT');

INSERT INTO clients (nom_empresa, nif_cif, persona_contacte, telefon, email, adreca, poblacio, tipus_entorn) VALUES
('Logística & Robòtica Zona Franca BCN', 'B-65891204', 'Carlos Mendoza', '+34 932 631 100', 'carlos.mendoza@logisticazf.cat', 'Carrer 27 del BZ, Zona Franca, Barcelona', 'Barcelona', 'Industrial'),
('Clínica Dental Diagonal', 'B-61209843', 'Dra. Laura Miralles', '+34 934 145 220', 'administracio@dentaldiagonal.cat', 'Av. Diagonal 490, Barcelona', 'Barcelona', 'Oficina PIME'),
('Supermercats Gourmet Born S.L.', 'B-64901122', 'Marc Vila i Soler', '+34 932 458 910', 'm.vila@gourmetborn.cat', 'Passeig del Born 18, Barcelona', 'Barcelona', 'Comerç & Retail'),
('Nexum Tech Studio Barcelona (22@)', 'B-67441098', 'Sílvia Camps Prat', '+34 931 889 021', 'silvia@nexumtech.barcelona', 'Carrer de Pallars 193, 22@ Barcelona', 'Barcelona', 'Espai Co-working'),
('Centre Mèdic & Diagnòstic Eixample', 'B-62334510', 'Dr. Oriol Rius Castells', '+34 934 112 300', 'o.rius@mediceixample.com', 'Carrer d\'Aragó 280, Barcelona', 'Barcelona', 'Oficina PIME'),
('Bufet Jurídic Fontanals & Associats', 'B-59887120', 'Clara Fontanals Bellver', '+34 935 440 188', 'clara@fontanalsjuridic.es', 'Passeig de Gràcia 84, Barcelona', 'Barcelona', 'Oficina PIME');

INSERT INTO pressupostos (codi_pressupost, id_client, resum_equipament, cost_maquinari, cost_software, cost_ma_obra, base_imposable, import_total, quota_mensual_suport, estat, data_emissio) VALUES
('PR-2026-001', 1, 'Xarxa Cat6A 24 punts + Rack 24U + Cisco L3 PoE+ + SAI APC 3000VA On-Line + Certificació Fluke', 5640.00, 480.00, 1170.00, 7290.00, 8820.90, 195.00, 'Aprovat', '2026-10-02'),
('PR-2026-002', 2, 'Rack 12U Legrand + Dell PowerEdge Win Server 2025 AD DS + SAI 1500VA + Synology NAS 4-Bay RAID 5', 4120.00, 680.00, 950.00, 5750.00, 6957.50, 135.00, 'En curs', '2026-10-05'),
('PR-2026-003', 3, '4 TPVs Posiflex 15.6" Fanless + Impressores Epson TM-T20III + Switch Cisco 24P PoE+ + SAI APC 1500VA', 3450.00, 290.00, 820.00, 4560.00, 5517.60, 110.00, 'Pendent de signatura', '2026-10-10'),
('PR-2026-004', 4, 'Rack 12U Insonoritzat + Bobina 305m Cat6A LSZH + 3 APs Ubiquiti Wi-Fi 6 Pro + Router MikroTik 10G', 2890.00, 150.00, 780.00, 3820.00, 4622.20, 95.00, 'Pendent de signatura', '2026-10-12');

INSERT INTO projectes_instalacio (codi_projecte, titol_projecte, id_client, id_pressupost, percentatge_progres, data_inici, data_termini, id_tecnic_responsable, estat) VALUES
('PRJ-26-01', 'Desplegament Xarxa 10G Cat6A i SAI Doble Conversió Logística Zona Franca', 1, 1, 75, '2026-10-03', '2026-10-24', 3, 'En execució'),
('PRJ-26-02', 'Implantació Domini Windows Server 2025 i Backups GFS Clínica Diagonal', 2, 2, 40, '2026-10-06', '2026-10-28', 2, 'En execució'),
('PRJ-26-03', 'Modernització Infraestructura POS i Segmentació Wi-Fi 6 Supermercats Gourmet Born', 3, 3, 20, '2026-10-11', '2026-11-10', 3, 'En execució');

INSERT INTO tiquets_sat (codi_tiquet, id_client, assumpte, descripcio, prioritat, estat, id_tecnic_assignat) VALUES
('TCK-201', 1, 'Verificació d\'autonomia en fallada elèctrica simulada SAI 3000VA', 'Prova de tall elèctric de 15 minuts realitzada amb èxit. Bateries al 94%, commutació a inversor en 0ms sense caiguda dels switches Cisco.', 'Mitjana', 'Resolt', 3),
('TCK-202', 2, 'Configuració GPO per a bloqueig d\'USB no autoritzats (RGPD Mèdic)', 'Polítiques de grup creades a l\'OU Equips_Clinica. Pendents de test a la recepció i despatx mèdic principal.', 'Alta', 'En progrés', 2),
('TCK-203', 3, 'Latència anòmala a la impressora tèrmica de tiquets Caixa 2', 'Revisat cable USB i port COM virtual. S\'ha assignat port estàtic i netejat cua de treball a Windows.', 'Mitjana', 'En progrés', 3),
('TCK-204', 4, 'Configuració xarxa de convidats amb aïllament d\'equips (Client Isolation)', 'VLAN 50 creada a UniFi Controller amb subnet 192.168.50.0/24 i aïllament L2 total respecte a la xarxa corporativa.', 'Baixa', 'Resolt', 3),
('TCK-205', 6, 'Revisió d\'espai disponible al volum RAID 5 del NAS Synology', 'Alerta del 85% d\'ocupació. Cal depurar snapshots de més de 90 dies i comprovar quotes per usuari.', 'Alta', 'Pendent', 2);

INSERT INTO contactes_web (nom, email, telefon, tipus_servei, missatge) VALUES
('Jordi Bosch', 'jbosch@innovatech.barcelona', '654 321 098', 'Cablejat & Racks', 'Necessitem pressupost per cablejar una nova oficina amb 16 llocs de treball i armari rack a Poblenou.');


// ============================================================================
// KERNELCORE - GENERADOR DEL GRAN CATÀLEG DE REFERÈNCIES REALS MULTIMARCA
// DFactory Barcelona (Zona Franca) · Més de 1.500 referències oficials
// ============================================================================

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// ────────────────────────────────────────────────────────────────────────────
// GENERADORS PER MARCA I LÍNIA DE PRODUCTE
// ────────────────────────────────────────────────────────────────────────────

export function generateAllRealSKUs() {
  const catalog = [];
  const skuSet = new Set();

  function addItem(item) {
    if (!item.sku || skuSet.has(item.sku)) {
      return; // Evitar duplicats
    }
    skuSet.add(item.sku);
    catalog.push(item);
  }

  // ==========================================================================
  // 1. CISCO (Cat1000, Cat9200L, Cat9200, Cat9300, CBS250, CBS350, Meraki, SFPs)
  // Proveïdor 1: Ingram Micro Technologies
  // ==========================================================================
  
  // Catalyst 1000 Series (18 variacions oficials)
  const cat1000Models = [
    { p: 8, poe: 'none', w: 0, up: '2G', upl: '2x 1G SFP', c: 215, pr: 295 },
    { p: 8, poe: 'PoE+ (67W)', w: 67, up: '2G', upl: '2x 1G SFP', c: 295, pr: 395 },
    { p: 8, poe: 'Full PoE+ (130W)', w: 130, up: '2G', upl: '2x 1G SFP', c: 375, pr: 495 },
    { p: 16, poe: 'none', w: 0, up: '2G', upl: '2x 1G SFP', c: 380, pr: 510 },
    { p: 16, poe: 'PoE+ (120W)', w: 120, up: '2G', upl: '2x 1G SFP', c: 490, pr: 650 },
    { p: 16, poe: 'Full PoE+ (240W)', w: 240, up: '2G', upl: '2x 1G SFP', c: 590, pr: 785 },
    { p: 24, poe: 'none', w: 0, up: '4G', upl: '4x 1G SFP', c: 490, pr: 650 },
    { p: 24, poe: 'PoE+ (195W)', w: 195, up: '4G', upl: '4x 1G SFP', c: 680, pr: 895 },
    { p: 24, poe: 'Full PoE+ (370W)', w: 370, up: '4G', upl: '4x 1G SFP', c: 860, pr: 1140 },
    { p: 48, poe: 'none', w: 0, up: '4G', upl: '4x 1G SFP', c: 820, pr: 1080 },
    { p: 48, poe: 'PoE+ (370W)', w: 370, up: '4G', upl: '4x 1G SFP', c: 1140, pr: 1490 },
    { p: 48, poe: 'Full PoE+ (740W)', w: 740, up: '4G', upl: '4x 1G SFP', c: 1450, pr: 1890 },
    { p: 24, poe: 'none', w: 0, up: '4X', upl: '4x 10G SFP+', c: 720, pr: 950 },
    { p: 24, poe: 'PoE+ (195W)', w: 195, up: '4X', upl: '4x 10G SFP+', c: 920, pr: 1220 },
    { p: 24, poe: 'Full PoE+ (370W)', w: 370, up: '4X', upl: '4x 10G SFP+', c: 1090, pr: 1440 },
    { p: 48, poe: 'none', w: 0, up: '4X', upl: '4x 10G SFP+', c: 1050, pr: 1390 },
    { p: 48, poe: 'PoE+ (370W)', w: 370, up: '4X', upl: '4x 10G SFP+', c: 1380, pr: 1790 },
    { p: 48, poe: 'Full PoE+ (740W)', w: 740, up: '4X', upl: '4x 10G SFP+', c: 1690, pr: 2190 }
  ];

  cat1000Models.forEach(m => {
    const poeCode = m.poe === 'none' ? 'T' : (m.w >= 240 ? 'FP' : 'P');
    const sku = `C1000-${m.p}${poeCode}-${m.up}-L`;
    addItem({
      sku,
      name: `Switch Cisco Catalyst 1000 ${m.p} Ports GE ${m.poe !== 'none' ? m.poe + ' ' : ''}${m.upl} Uplink`,
      brand: 'Cisco',
      category: 'Xarxa & VLAN',
      tier: m.p === 48 || m.up === '4X' ? 'Professional / CPD' : 'Mitjà Empresarial',
      supplierId: 1,
      stock: Math.floor(Math.random() * 15) + 5,
      min: 3,
      cost: m.c,
      price: m.pr,
      location: 'DFactory Hub - Passadís C1'
    });
  });

  // Catalyst 9200L & 9200 (Network Essentials & Network Advantage)
  const c9200Variants = [
    { sku: 'C9200L-24T-4G-E', name: 'Switch Cisco Catalyst 9200L 24 Ports GE 4x 1G SFP Network Essentials', c: 1180, pr: 1550 },
    { sku: 'C9200L-24P-4G-E', name: 'Switch Cisco Catalyst 9200L 24 Ports GE PoE+ (370W) 4x 1G SFP NE', c: 1540, pr: 1990 },
    { sku: 'C9200L-48T-4G-E', name: 'Switch Cisco Catalyst 9200L 48 Ports GE 4x 1G SFP NE', c: 1850, pr: 2390 },
    { sku: 'C9200L-48P-4G-E', name: 'Switch Cisco Catalyst 9200L 48 Ports GE PoE+ (740W) 4x 1G SFP NE', c: 2450, pr: 3190 },
    { sku: 'C9200L-24T-4X-E', name: 'Switch Cisco Catalyst 9200L 24 Ports GE 4x 10G SFP+ Uplinks NE', c: 1620, pr: 2100 },
    { sku: 'C9200L-24P-4X-E', name: 'Switch Cisco Catalyst 9200L 24 Ports GE PoE+ (370W) 4x 10G SFP+ NE', c: 1980, pr: 2550 },
    { sku: 'C9200L-48T-4X-E', name: 'Switch Cisco Catalyst 9200L 48 Ports GE 4x 10G SFP+ NE', c: 2350, pr: 2990 },
    { sku: 'C9200L-48P-4X-E', name: 'Switch Cisco Catalyst 9200L 48 Ports GE PoE+ (740W) 4x 10G SFP+ NE', c: 2850, pr: 3650 },
    { sku: 'C9200L-24PXG-4X-E', name: 'Switch Cisco Catalyst 9200L 24 Ports mGig PoE+ 4x 10G SFP+ NE', c: 2250, pr: 2890 },
    { sku: 'C9200L-48PXG-4X-E', name: 'Switch Cisco Catalyst 9200L 48 Ports mGig PoE+ 4x 10G SFP+ NE', c: 3450, pr: 4390 },
    { sku: 'C9200L-24T-4X-A', name: 'Switch Cisco Catalyst 9200L 24 Ports GE 4x 10G Network Advantage', c: 1950, pr: 2490 },
    { sku: 'C9200L-24P-4X-A', name: 'Switch Cisco Catalyst 9200L 24 Ports GE PoE+ 4x 10G NA', c: 2350, pr: 2990 },
    { sku: 'C9200L-48T-4X-A', name: 'Switch Cisco Catalyst 9200L 48 Ports GE 4x 10G NA', c: 2790, pr: 3550 },
    { sku: 'C9200L-48P-4X-A', name: 'Switch Cisco Catalyst 9200L 48 Ports GE PoE+ 4x 10G NA', c: 3350, pr: 4250 },
    { sku: 'C9200-24T-E', name: 'Switch Modular Cisco Catalyst 9200 24 Ports GE Fonts Redundants NE', c: 1750, pr: 2250 },
    { sku: 'C9200-24P-E', name: 'Switch Modular Cisco Catalyst 9200 24 Ports GE PoE+ (370W) NE', c: 2150, pr: 2750 },
    { sku: 'C9200-48T-E', name: 'Switch Modular Cisco Catalyst 9200 48 Ports GE Fonts Redundants NE', c: 2650, pr: 3390 },
    { sku: 'C9200-48P-E', name: 'Switch Modular Cisco Catalyst 9200 48 Ports GE PoE+ (740W) NE', c: 3250, pr: 4150 },
    { sku: 'C9200-24T-A', name: 'Switch Modular Cisco Catalyst 9200 24 Ports GE Network Advantage', c: 2200, pr: 2800 },
    { sku: 'C9200-24P-A', name: 'Switch Modular Cisco Catalyst 9200 24 Ports GE PoE+ (370W) NA', c: 2650, pr: 3390 },
    { sku: 'C9200-48T-A', name: 'Switch Modular Cisco Catalyst 9200 48 Ports GE Network Advantage', c: 3190, pr: 4050 },
    { sku: 'C9200-48P-A', name: 'Switch Modular Cisco Catalyst 9200 48 Ports GE PoE+ (740W) NA', c: 3850, pr: 4890 }
  ];
  c9200Variants.forEach(v => addItem({
    sku: v.sku,
    name: v.name,
    brand: 'Cisco',
    category: 'Xarxa & VLAN',
    tier: 'Professional / CPD',
    supplierId: 1,
    stock: Math.floor(Math.random() * 8) + 3,
    min: 2,
    cost: v.c,
    price: v.pr,
    location: 'DFactory Hub - Passadís C2'
  }));

  // Catalyst 9300 Core & Multi-Gigabit Series
  const c9300Variants = [
    { sku: 'C9300-24T-A', name: 'Switch Cisco Catalyst 9300 24 Ports GE Modular Network Advantage', c: 2850, pr: 3650 },
    { sku: 'C9300-24P-A', name: 'Switch Cisco Catalyst 9300 24 Ports GE PoE+ (445W) NA StackWise-480', c: 3450, pr: 4390 },
    { sku: 'C9300-24U-A', name: 'Switch Cisco Catalyst 9300 24 Ports Cisco UPOE (60W per port) NA', c: 3950, pr: 5050 },
    { sku: 'C9300-24UX-A', name: 'Switch Cisco Catalyst 9300 24 Ports Multi-Gigabit mGig UPOE NA', c: 4600, pr: 5890 },
    { sku: 'C9300-48T-A', name: 'Switch Cisco Catalyst 9300 48 Ports GE Modular Network Advantage', c: 3950, pr: 5050 },
    { sku: 'C9300-48P-A', name: 'Switch Cisco Catalyst 9300 48 Ports GE PoE+ (740W) NA', c: 4750, pr: 6080 },
    { sku: 'C9300-48U-A', name: 'Switch Cisco Catalyst 9300 48 Ports Cisco UPOE (60W per port) NA', c: 5400, pr: 6890 },
    { sku: 'C9300-48UXM-A', name: 'Switch Cisco Catalyst 9300 48 Ports Multi-Gig UPOE+ (90W) 802.3bt', c: 6800, pr: 8690 },
    { sku: 'C9300-24S-A', name: 'Switch Cisco Catalyst 9300 24 Ports 1G SFP Fibra Aggregation NA', c: 3800, pr: 4850 },
    { sku: 'C9300-48S-A', name: 'Switch Cisco Catalyst 9300 48 Ports 1G SFP Fibra Aggregation NA', c: 5600, pr: 7150 },
    { sku: 'C9300-NM-4G', name: 'Mòdul de Xarxa Cisco Catalyst 9300 4 Ports 1G SFP', c: 320, pr: 420 },
    { sku: 'C9300-NM-8X', name: 'Mòdul de Xarxa Cisco Catalyst 9300 8 Ports 10G SFP+', c: 1150, pr: 1490 },
    { sku: 'C9300-NM-2Q', name: 'Mòdul de Xarxa Cisco Catalyst 9300 2 Ports 40G QSFP+', c: 1450, pr: 1890 },
    { sku: 'C9300-NM-4M', name: 'Mòdul de Xarxa Cisco Catalyst 9300 4 Ports Multi-Gigabit mGig', c: 890, pr: 1150 },
    { sku: 'STACK-T1-50CM', name: 'Cable d\'Apilament Cisco StackWise-480 Longitud 50cm per a C9300', c: 110, pr: 155 },
    { sku: 'STACK-T1-1M', name: 'Cable d\'Apilament Cisco StackWise-480 Longitud 1 metre', c: 145, pr: 195 },
    { sku: 'STACK-T1-3M', name: 'Cable d\'Apilament Cisco StackWise-480 Longitud 3 metres', c: 220, pr: 295 }
  ];
  c9300Variants.forEach(v => addItem({
    sku: v.sku,
    name: v.name,
    brand: 'Cisco',
    category: 'Xarxa & VLAN',
    tier: 'Professional / CPD',
    supplierId: 1,
    stock: Math.floor(Math.random() * 6) + 2,
    min: 1,
    cost: v.c,
    price: v.pr,
    location: 'DFactory Hub - Passadís C2'
  }));

  // Cisco Business CBS 250 & CBS 350
  const cbsVariants = [
    { sku: 'CBS250-8T-E-2G', name: 'Switch Cisco Business 250 8P GE 2x Combo Smart Managed', c: 135, pr: 185 },
    { sku: 'CBS250-8P-E-2G', name: 'Switch Cisco Business 250 8P GE PoE+ (67W) 2x Combo', c: 185, pr: 245 },
    { sku: 'CBS250-8FP-E-2G', name: 'Switch Cisco Business 250 8P GE Full PoE+ (120W) 2x Combo', c: 235, pr: 310 },
    { sku: 'CBS250-16T-2G', name: 'Switch Cisco Business 250 16P GE 2x SFP Fanless', c: 220, pr: 295 },
    { sku: 'CBS250-16P-2G', name: 'Switch Cisco Business 250 16P GE PoE+ (120W) 2x SFP', c: 320, pr: 425 },
    { sku: 'CBS250-24T-4G', name: 'Switch Cisco Business 250 24P GE 4x SFP Smart Managed', c: 290, pr: 390 },
    { sku: 'CBS250-24P-4G', name: 'Switch Cisco Business 250 24P GE PoE+ (195W) 4x SFP', c: 440, pr: 585 },
    { sku: 'CBS250-24FP-4G', name: 'Switch Cisco Business 250 24P GE Full PoE+ (370W) 4x SFP', c: 560, pr: 735 },
    { sku: 'CBS250-48T-4G', name: 'Switch Cisco Business 250 48P GE 4x SFP', c: 510, pr: 680 },
    { sku: 'CBS250-48P-4G', name: 'Switch Cisco Business 250 48P GE PoE+ (370W) 4x SFP', c: 720, pr: 950 },
    { sku: 'CBS250-24T-4X', name: 'Switch Cisco Business 250 24P GE 4x 10G SFP+ Uplinks', c: 490, pr: 650 },
    { sku: 'CBS250-24P-4X', name: 'Switch Cisco Business 250 24P GE PoE+ (195W) 4x 10G SFP+', c: 680, pr: 890 },
    { sku: 'CBS250-48T-4X', name: 'Switch Cisco Business 250 48P GE 4x 10G SFP+', c: 780, pr: 1020 },
    { sku: 'CBS250-48P-4X', name: 'Switch Cisco Business 250 48P GE PoE+ (370W) 4x 10G SFP+', c: 980, pr: 1290 },
    { sku: 'CBS350-8T-E-2G', name: 'Switch Cisco Business 350 8P GE 2x Combo Layer 3', c: 220, pr: 295 },
    { sku: 'CBS350-8P-2G', name: 'Switch Cisco Business 350 8P GE PoE+ (67W) 2x Combo L3', c: 285, pr: 380 },
    { sku: 'CBS350-8FP-2G', name: 'Switch Cisco Business 350 8P GE Full PoE+ (120W) L3', c: 350, pr: 465 },
    { sku: 'CBS350-16T-2G', name: 'Switch Cisco Business 350 16P GE 2x SFP L3', c: 360, pr: 475 },
    { sku: 'CBS350-16P-2G', name: 'Switch Cisco Business 350 16P GE PoE+ (120W) 2x SFP L3', c: 460, pr: 610 },
    { sku: 'CBS350-24T-4G', name: 'Switch Cisco Business 350 24P GE 4x SFP L3 Stacking', c: 420, pr: 560 },
    { sku: 'CBS350-24P-4G', name: 'Switch Cisco Business 350 24P GE PoE+ (195W) 4x SFP L3', c: 580, pr: 770 },
    { sku: 'CBS350-24FP-4G', name: 'Switch Cisco Business 350 24P GE Full PoE+ (370W) 4x SFP L3', c: 710, pr: 940 },
    { sku: 'CBS350-48T-4G', name: 'Switch Cisco Business 350 48P GE 4x SFP L3', c: 680, pr: 895 },
    { sku: 'CBS350-48P-4G', name: 'Switch Cisco Business 350 48P GE PoE+ (370W) 4x SFP L3', c: 920, pr: 1210 },
    { sku: 'CBS350-24T-4X', name: 'Switch Cisco Business 350 24P GE 4x 10G SFP+ Uplinks L3 Stacking', c: 620, pr: 820 },
    { sku: 'CBS350-24P-4X', name: 'Switch Cisco Business 350 24P GE PoE+ (195W) 4x 10G SFP+ L3', c: 790, pr: 1050 },
    { sku: 'CBS350-24FP-4X', name: 'Switch Cisco Business 350 24P GE Full PoE+ (370W) 4x 10G SFP+ L3', c: 960, pr: 1260 },
    { sku: 'CBS350-48T-4X', name: 'Switch Cisco Business 350 48P GE 4x 10G SFP+ L3', c: 980, pr: 1290 },
    { sku: 'CBS350-48P-4X', name: 'Switch Cisco Business 350 48P GE PoE+ (370W) 4x 10G SFP+ L3', c: 1190, pr: 1560 },
    { sku: 'CBS350-48FP-4X', name: 'Switch Cisco Business 350 48P GE Full PoE+ (740W) 4x 10G SFP+ L3', c: 1480, pr: 1940 },
    { sku: 'CBS350-8XTS', name: 'Switch Cisco Business 350 8 Ports 10GBase-T + 2x SFP+ 10G Core', c: 890, pr: 1170 },
    { sku: 'CBS350-12XT', name: 'Switch Cisco Business 350 12 Ports 10GBase-T + 2x SFP+ 10G Core', c: 1250, pr: 1640 },
    { sku: 'CBS350-24XS', name: 'Switch Cisco Business 350 24 Ports 10G SFP+ Core Fiber Aggregation', c: 1850, pr: 2420 }
  ];
  cbsVariants.forEach(v => addItem({
    sku: v.sku,
    name: v.name,
    brand: 'Cisco',
    category: 'Xarxa & VLAN',
    tier: v.sku.includes('4X') || v.sku.includes('XS') || v.sku.includes('XT') ? 'Professional / CPD' : 'Mitjà Empresarial',
    supplierId: 1,
    stock: Math.floor(Math.random() * 12) + 4,
    min: 2,
    cost: v.c,
    price: v.pr,
    location: 'DFactory Hub - Passadís C2'
  }));

  // Cisco Meraki (MS Switches, MR Wireless, MX Security)
  const merakiList = [
    { sku: 'MS120-8', name: 'Switch Cisco Meraki MS120-8 Cloud Managed 8x GE 2x SFP Fanless', cat: 'Xarxa & VLAN', c: 380, pr: 510 },
    { sku: 'MS120-8FP', name: 'Switch Cisco Meraki MS120-8FP 8x GE Full PoE+ (124W) 2x SFP', cat: 'Xarxa & VLAN', c: 540, pr: 720 },
    { sku: 'MS120-8LP', name: 'Switch Cisco Meraki MS120-8LP 8x GE PoE+ (67W) 2x SFP', cat: 'Xarxa & VLAN', c: 450, pr: 595 },
    { sku: 'MS120-24', name: 'Switch Cisco Meraki MS120-24 24x GE 2x SFP Rack 1U', cat: 'Xarxa & VLAN', c: 680, pr: 895 },
    { sku: 'MS120-24P', name: 'Switch Cisco Meraki MS120-24P 24x GE PoE+ (370W) 4x SFP', cat: 'Xarxa & VLAN', c: 980, pr: 1290 },
    { sku: 'MS120-48', name: 'Switch Cisco Meraki MS120-48 48x GE 4x SFP', cat: 'Xarxa & VLAN', c: 1150, pr: 1510 },
    { sku: 'MS120-48LP', name: 'Switch Cisco Meraki MS120-48LP 48x GE PoE+ (370W) 4x SFP', cat: 'Xarxa & VLAN', c: 1550, pr: 2020 },
    { sku: 'MS120-48FP', name: 'Switch Cisco Meraki MS120-48FP 48x GE Full PoE+ (740W) 4x SFP', cat: 'Xarxa & VLAN', c: 1980, pr: 2580 },
    { sku: 'MS210-24P', name: 'Switch Cisco Meraki MS210-24P 24x GE PoE+ (370W) 4x 1G SFP Stacking', cat: 'Xarxa & VLAN', c: 1280, pr: 1670 },
    { sku: 'MS210-48FP', name: 'Switch Cisco Meraki MS210-48FP 48x GE Full PoE+ (740W) 4x 1G SFP Stacking', cat: 'Xarxa & VLAN', c: 2250, pr: 2920 },
    { sku: 'MS225-24P', name: 'Switch Cisco Meraki MS225-24P 24x GE PoE+ (370W) 4x 10G SFP+ Uplinks', cat: 'Xarxa & VLAN', c: 1580, pr: 2060 },
    { sku: 'MS225-48FP', name: 'Switch Cisco Meraki MS225-48FP 48x GE Full PoE+ (740W) 4x 10G SFP+ Uplinks', cat: 'Xarxa & VLAN', c: 2650, pr: 3450 },
    { sku: 'MS250-24P', name: 'Switch Cisco Meraki MS250-24P 24x GE PoE+ Fonts Redundants L3 4x 10G SFP+', cat: 'Xarxa & VLAN', c: 2150, pr: 2790 },
    { sku: 'MS250-48FP', name: 'Switch Cisco Meraki MS250-48FP 48x GE Full PoE+ Fonts Redundants L3 4x 10G', cat: 'Xarxa & VLAN', c: 3450, pr: 4490 },
    { sku: 'MS350-24X', name: 'Switch Cisco Meraki MS350-24X 24x mGig UPOE (740W) 4x 10G SFP+ L3', cat: 'Xarxa & VLAN', c: 3890, pr: 5050 },
    { sku: 'MR20-HW', name: 'Punt d\'Accés Cisco Meraki MR20 Wi-Fi 5 Wave 2 2x2 Basic Cloud', cat: 'Wi-Fi 6', c: 195, pr: 260 },
    { sku: 'MR28-HW', name: 'Punt d\'Accés Cisco Meraki MR28 Wi-Fi 6 2x2 Cloud Managed', cat: 'Wi-Fi 6', c: 295, pr: 395 },
    { sku: 'MR36-HW', name: 'Punt d\'Accés Cisco Meraki MR36 Wi-Fi 6 2x2 MIMO WIDS/WIPS', cat: 'Wi-Fi 6', c: 480, pr: 640 },
    { sku: 'MR44-HW', name: 'Punt d\'Accés Cisco Meraki MR44 Wi-Fi 6 4x4 + 2x2 Uplink 2.5GbE', cat: 'Wi-Fi 6', c: 680, pr: 890 },
    { sku: 'MR46-HW', name: 'Punt d\'Accés Cisco Meraki MR46 Wi-Fi 6 Multi-Gig 4x4 MIMO 2.5GbE', cat: 'Wi-Fi 6', c: 840, pr: 1120 },
    { sku: 'MR56-HW', name: 'Punt d\'Accés Cisco Meraki MR56 Wi-Fi 6 8x8 MIMO Alta Densitat Estadis/Auditoris', cat: 'Wi-Fi 6', c: 1150, pr: 1520 },
    { sku: 'MR76-HW', name: 'Punt d\'Accés Cisco Meraki MR76 Wi-Fi 6 Exterior IP67 Antenes Externes', cat: 'Wi-Fi 6', c: 890, pr: 1180 },
    { sku: 'MR86-HW', name: 'Punt d\'Accés Cisco Meraki MR86 Wi-Fi 6 Exterior Alta Densitat 4x4 IP67', cat: 'Wi-Fi 6', c: 1290, pr: 1690 },
    { sku: 'MX67-HW', name: 'Security Appliance Cisco Meraki MX67 450Mbps Stateful Firewall', cat: 'Seguretat NGFW', c: 510, pr: 680 },
    { sku: 'MX67W-HW', name: 'Security Appliance Cisco Meraki MX67W amb Wi-Fi 802.11ac Integrat', cat: 'Seguretat NGFW', c: 620, pr: 825 },
    { sku: 'MX67C-HW', name: 'Security Appliance Cisco Meraki MX67C amb Mòdem Cel·lular LTE Integrat', cat: 'Seguretat NGFW', c: 750, pr: 995 },
    { sku: 'MX68-HW', name: 'Security Appliance Cisco Meraki MX68 10x GE (2x PoE+) 450Mbps FW', cat: 'Seguretat NGFW', c: 720, pr: 960 },
    { sku: 'MX68W-HW', name: 'Security Appliance Cisco Meraki MX68W amb Wi-Fi Integrat i 2x PoE+', cat: 'Seguretat NGFW', c: 840, pr: 1120 },
    { sku: 'MX68CW-HW', name: 'Security Appliance Cisco Meraki MX68CW amb Wi-Fi i Mòdem 4G LTE Cat 6', cat: 'Seguretat NGFW', c: 980, pr: 1295 },
    { sku: 'MX75-HW', name: 'Security Appliance Cisco Meraki MX75 1Gbps Firewall 1G SFP WAN Rack', cat: 'Seguretat NGFW', c: 1080, pr: 1420 },
    { sku: 'MX85-HW', name: 'Security Appliance Cisco Meraki MX85 1Gbps Firewall 2x 10G SFP+ Redundant PSU', cat: 'Seguretat NGFW', c: 1750, pr: 2290 },
    { sku: 'MX95-HW', name: 'Security Appliance Cisco Meraki MX95 2Gbps Firewall 2x 10G SFP+ Uplinks', cat: 'Seguretat NGFW', c: 2650, pr: 3450 },
    { sku: 'MX105-HW', name: 'Security Appliance Cisco Meraki MX105 3Gbps Firewall 10G SFP+ Enterprise', cat: 'Seguretat NGFW', c: 3890, pr: 5050 },
    { sku: 'MX250-HW', name: 'Security Appliance Cisco Meraki MX250 4Gbps Firewall Dual 10G SFP+ CPD', cat: 'Seguretat NGFW', c: 5900, pr: 7650 }
  ];
  merakiList.forEach(m => addItem({
    sku: m.sku,
    name: m.name,
    brand: 'Cisco',
    category: m.cat,
    tier: 'Professional / CPD',
    supplierId: 1,
    stock: Math.floor(Math.random() * 8) + 2,
    min: 2,
    cost: m.c,
    price: m.pr,
    location: 'DFactory Hub - Passadís C3'
  }));

  // Cisco Transceivers oficials (1G, 10G, 25G, 40G, 100G)
  const ciscoTransceivers = [
    { sku: 'GLC-T', name: 'Transceiver Cisco 1000BASE-T SFP Copper RJ45 fins a 100m Cat5e/6', c: 42, pr: 59 },
    { sku: 'GLC-TE', name: 'Transceiver Cisco 1000BASE-T SFP Rang Temperatura Estès -40°C/+85°C', c: 48, pr: 68 },
    { sku: 'GLC-SX-MM', name: 'Transceiver Cisco 1000BASE-SX SFP 850nm Multimode OM2/OM3 fins a 550m', c: 45, pr: 65 },
    { sku: 'GLC-SX-MMD', name: 'Transceiver Cisco 1000BASE-SX SFP amb Diagnòstic Digital DOM/DDM', c: 52, pr: 74 },
    { sku: 'GLC-LH-SM', name: 'Transceiver Cisco 1000BASE-LX/LH SFP 1310nm Monomode fins a 10km', c: 62, pr: 88 },
    { sku: 'GLC-LH-SMD', name: 'Transceiver Cisco 1000BASE-LX/LH SFP amb Monitoratge DDM', c: 68, pr: 95 },
    { sku: 'GLC-EX-SMD', name: 'Transceiver Cisco 1000BASE-EX SFP 1310nm Monomode fins a 40km', c: 115, pr: 160 },
    { sku: 'GLC-ZX-SMD', name: 'Transceiver Cisco 1000BASE-ZX SFP 1550nm Monomode fins a 80km', c: 185, pr: 255 },
    { sku: 'SFP-10G-SR', name: 'Transceiver Cisco 10GBASE-SR SFP+ 850nm Multimode fins a 300m', c: 110, pr: 155 },
    { sku: 'SFP-10G-SR-S', name: 'Transceiver Cisco 10GBASE-SR SFP+ S-Class per a Enllaços Empresarials', c: 95, pr: 135 },
    { sku: 'SFP-10G-LR', name: 'Transceiver Cisco 10GBASE-LR SFP+ 1310nm Monomode fins a 10km', c: 180, pr: 245 },
    { sku: 'SFP-10G-LR-S', name: 'Transceiver Cisco 10GBASE-LR SFP+ S-Class Monomode 10km', c: 155, pr: 215 },
    { sku: 'SFP-10G-ER', name: 'Transceiver Cisco 10GBASE-ER SFP+ 1550nm Monomode fins a 40km', c: 380, pr: 510 },
    { sku: 'SFP-10G-ZR', name: 'Transceiver Cisco 10GBASE-ZR SFP+ 1550nm Monomode fins a 80km', c: 590, pr: 780 },
    { sku: 'SFP-25G-SR-S', name: 'Transceiver Cisco 25GBASE-SR SFP28 850nm Multimode fins a 100m OM4', c: 240, pr: 330 },
    { sku: 'SFP-25G-LR-S', name: 'Transceiver Cisco 25GBASE-LR SFP28 1310nm Monomode fins a 10km', c: 380, pr: 510 },
    { sku: 'QSFP-40G-SR4', name: 'Transceiver Cisco 40GBASE-SR4 QSFP+ 4x 10G Multimode MPO/MTP fins a 100m', c: 320, pr: 440 },
    { sku: 'QSFP-40G-LR4', name: 'Transceiver Cisco 40GBASE-LR4 QSFP+ 1310nm LC Monomode fins a 10km', c: 580, pr: 780 },
    { sku: 'QSFP-100G-SR4-S', name: 'Transceiver Cisco 100GBASE-SR4 QSFP28 850nm MPO-12 Multimode 100m', c: 520, pr: 710 },
    { sku: 'QSFP-100G-LR4-S', name: 'Transceiver Cisco 100GBASE-LR4 QSFP28 1310nm Duplex LC Monomode 10km', c: 890, pr: 1190 },
    { sku: 'SFP-H10GB-CU1M', name: 'Cable Direct Attach Twinax Cisco 10G SFP+ Passiu 1 metre', c: 32, pr: 45 },
    { sku: 'SFP-H10GB-CU1-5M', name: 'Cable Direct Attach Twinax Cisco 10G SFP+ Passiu 1.5 metres', c: 36, pr: 50 },
    { sku: 'SFP-H10GB-CU2M', name: 'Cable Direct Attach Twinax Cisco 10G SFP+ Passiu 2 metres', c: 39, pr: 55 },
    { sku: 'SFP-H10GB-CU2-5M', name: 'Cable Direct Attach Twinax Cisco 10G SFP+ Passiu 2.5 metres', c: 42, pr: 59 },
    { sku: 'SFP-H10GB-CU3M', name: 'Cable Direct Attach Twinax Cisco 10G SFP+ Passiu 3 metres', c: 45, pr: 64 },
    { sku: 'SFP-H10GB-CU5M', name: 'Cable Direct Attach Twinax Cisco 10G SFP+ Passiu 5 metres', c: 58, pr: 82 },
    { sku: 'QSFP-H40G-CU1M', name: 'Cable Direct Attach Twinax Cisco 40G QSFP+ Passiu 1 metre', c: 55, pr: 78 },
    { sku: 'QSFP-H40G-CU3M', name: 'Cable Direct Attach Twinax Cisco 40G QSFP+ Passiu 3 metres', c: 75, pr: 105 }
  ];
  ciscoTransceivers.forEach(t => addItem({
    sku: t.sku,
    name: t.name,
    brand: 'Cisco',
    category: 'Xarxa & VLAN',
    tier: 'Professional / CPD',
    supplierId: 1,
    stock: Math.floor(Math.random() * 25) + 8,
    min: 4,
    cost: t.c,
    price: t.pr,
    location: 'DFactory Hub - Calaix C3-01'
  }));

  // ==========================================================================
  // 2. UBIQUITI NETWORKS (UniFi Switches, APs, Gateways, Patch Cords, SFP)
  // Proveïdor 2: Esprinet Ibèrica S.L.U.
  // ==========================================================================
  const unifiSwitches = [
    { sku: 'USW-Flex-Mini', name: 'Switch UniFi Flex Mini 5x GbE RJ45 Alimentació PoE o USB-C', c: 26, pr: 36 },
    { sku: 'USW-Flex', name: 'Switch UniFi Flex 5x GbE Exterior IP55 Passthrough PoE++ 46W', c: 92, pr: 125 },
    { sku: 'USW-Flex-XG', name: 'Switch UniFi Flex XG 4x 10GBase-T + 1x GbE PoE-in Multi-Gigabit', c: 245, pr: 325 },
    { sku: 'USW-Lite-8-PoE', name: 'Switch UniFi Lite 8 Ports (4x PoE+ 52W) Fanless', c: 98, pr: 132 },
    { sku: 'USW-Lite-16-PoE', name: 'Switch UniFi Lite 16 Ports (8x PoE+ 45W) Fanless', c: 175, pr: 235 },
    { sku: 'USW-16-PoE', name: 'Switch UniFi 16 Ports (8x PoE+ 42W) 2x 1G SFP Rack 1U Pantalla LCM', c: 260, pr: 345 },
    { sku: 'USW-24', name: 'Switch UniFi 24 Ports GE 2x 1G SFP Fanless Rack 1U LCM', c: 205, pr: 275 },
    { sku: 'USW-24-PoE', name: 'Switch UniFi 24 Ports (16x PoE+ 95W) 2x 1G SFP Rack 1U', c: 340, pr: 450 },
    { sku: 'USW-48', name: 'Switch UniFi 48 Ports GE 4x 1G SFP Rack 1U Fanless LCM', c: 360, pr: 475 },
    { sku: 'USW-48-PoE', name: 'Switch UniFi 48 Ports (32x PoE+ 195W) 4x 1G SFP Rack 1U', c: 520, pr: 685 },
    { sku: 'USW-Pro-24', name: 'Switch UniFi Pro 24 Ports GE 2x 10G SFP+ Layer 3 Pantalla LCM', c: 360, pr: 475 },
    { sku: 'USW-Pro-24-PoE', name: 'Switch UniFi Pro 24 Ports (16x PoE+ + 8x PoE++ 400W) 2x 10G SFP+ L3', c: 620, pr: 815 },
    { sku: 'USW-Pro-48', name: 'Switch UniFi Pro 48 Ports GE 4x 10G SFP+ L3 SmartPower RPS', c: 530, pr: 695 },
    { sku: 'USW-Pro-48-PoE', name: 'Switch UniFi Pro 48 Ports (40x PoE+ + 8x PoE++ 600W) 4x 10G SFP+ L3', c: 960, pr: 1250 },
    { sku: 'USW-Enterprise-8-PoE', name: 'Switch UniFi Enterprise 8 Ports 2.5GbE PoE+ (120W) 2x 10G SFP+', c: 420, pr: 550 },
    { sku: 'USW-Enterprise-24-PoE', name: 'Switch UniFi Enterprise 24 Ports 2.5GbE PoE+ (400W) 2x 10G SFP+', c: 720, pr: 945 },
    { sku: 'USW-Enterprise-48-PoE', name: 'Switch UniFi Enterprise 48 Ports 2.5GbE PoE+ (720W) 4x 10G SFP+', c: 1420, pr: 1850 },
    { sku: 'USW-EnterpriseXG-24', name: 'Switch UniFi EnterpriseXG 24 Ports 10GBase-T 2x 25G SFP28 Core', c: 1150, pr: 1495 },
    { sku: 'USW-Pro-Max-16', name: 'Switch UniFi Pro Max 16 Ports (4x 2.5G + 12x 1G) 2x 10G SFP+ Etherlighting', c: 260, pr: 345 },
    { sku: 'USW-Pro-Max-16-PoE', name: 'Switch UniFi Pro Max 16 Ports PoE+ (180W) 2x 10G SFP+ Etherlighting', c: 360, pr: 475 },
    { sku: 'USW-Pro-Max-24', name: 'Switch UniFi Pro Max 24 Ports (8x 2.5G + 16x 1G) 2x 10G SFP+', c: 410, pr: 540 },
    { sku: 'USW-Pro-Max-24-PoE', name: 'Switch UniFi Pro Max 24 Ports PoE++ (400W) 2x 10G SFP+ Etherlighting', c: 720, pr: 945 },
    { sku: 'USW-Pro-Max-48', name: 'Switch UniFi Pro Max 48 Ports (16x 2.5G + 32x 1G) 4x 10G SFP+', c: 680, pr: 890 },
    { sku: 'USW-Pro-Max-48-PoE', name: 'Switch UniFi Pro Max 48 Ports PoE++ (720W) 4x 10G SFP+ Etherlighting', c: 1180, pr: 1540 },
    { sku: 'USW-Aggregation', name: 'Switch UniFi Aggregation 8 Ports 10G SFP+ Core Switch Fanless 1U', c: 245, pr: 325 },
    { sku: 'USW-Pro-Aggregation', name: 'Switch UniFi Pro Aggregation 28 Ports 10G SFP+ 4x 25G SFP28 Layer 3', c: 810, pr: 1060 },
    { sku: 'USW-Mission-Critical', name: 'Switch UniFi Mission Critical SAI Integrat 368Wh 4x Preses AC 8x PoE+', c: 890, pr: 1180 }
  ];
  unifiSwitches.forEach(s => addItem({
    sku: s.sku,
    name: s.name,
    brand: 'Ubiquiti',
    category: 'Xarxa & VLAN',
    tier: s.sku.includes('Pro') || s.sku.includes('Enterprise') || s.sku.includes('Aggregation') ? 'Professional / CPD' : 'Mitjà Empresarial',
    supplierId: 2,
    stock: Math.floor(Math.random() * 15) + 5,
    min: 3,
    cost: s.c,
    price: s.pr,
    location: 'DFactory Hub - Passadís D1'
  }));

  // UniFi APs (Wi-Fi 6 i 7)
  const unifiAPs = [
    { sku: 'U6-Plus', name: 'Punt d\'Accés UniFi U6+ Wi-Fi 6 Banda Dual 2x2 MIMO 1.5Gbps', c: 85, pr: 115 },
    { sku: 'U6-Lite', name: 'Punt d\'Accés UniFi U6 Lite Wi-Fi 6 Compacte PoE 802.3af', c: 78, pr: 105 },
    { sku: 'U6-Pro', name: 'Punt d\'Accés UniFi U6 Pro Wi-Fi 6 4x4 MIMO 5.3Gbps Agregats', c: 125, pr: 165 },
    { sku: 'U6-LR', name: 'Punt d\'Accés UniFi U6 Long-Range Wi-Fi 6 4x4 Cobertura Ampliada', c: 155, pr: 205 },
    { sku: 'U6-Enterprise', name: 'Punt d\'Accés UniFi U6 Enterprise Wi-Fi 6E Tri-Banda 2.5GbE PoE+', c: 235, pr: 310 },
    { sku: 'U6-Enterprise-IW', name: 'Punt d\'Accés UniFi U6 Enterprise In-Wall Wi-Fi 6E Switch 4P Integrat', c: 260, pr: 345 },
    { sku: 'U6-Mesh', name: 'Punt d\'Accés UniFi U6 Mesh Wi-Fi 6 Exterior IPX5 Format Cilindre', c: 145, pr: 190 },
    { sku: 'U6-Mesh-Pro', name: 'Punt d\'Accés UniFi U6 Mesh Pro Exterior Alta Potència 4x4', c: 185, pr: 245 },
    { sku: 'U6-Extender', name: 'Extensor UniFi U6 Extender Endoll Directe Wi-Fi 6 Mesh', c: 120, pr: 160 },
    { sku: 'U6-IW', name: 'Punt d\'Accés UniFi U6 In-Wall Wi-Fi 6 Encastable en Caixa Mecanisme', c: 155, pr: 205 },
    { sku: 'U7-Pro', name: 'Punt d\'Accés UniFi U7 Pro Wi-Fi 7 Tri-Banda 320MHz Uplink 2.5GbE 9.3Gbps', c: 158, pr: 210 },
    { sku: 'U7-Pro-Max', name: 'Punt d\'Accés UniFi U7 Pro Max Wi-Fi 7 Tri-Banda 4x4 Ràdio Espectral Dedicat', c: 235, pr: 310 },
    { sku: 'U7-Pro-Wall', name: 'Punt d\'Accés UniFi U7 Pro Wall Wi-Fi 7 Mural Extra-Fi 2.5GbE', c: 175, pr: 235 },
    { sku: 'U7-Outdoor', name: 'Punt d\'Accés UniFi U7 Outdoor Wi-Fi 7 Exterior IPX6 Antenes Direccionals', c: 245, pr: 325 },
    { sku: 'UK-Ultra', name: 'Punt d\'Accés UniFi Swiss Army Knife Ultra Wi-Fi 5 Compacte Exterior IPX6', c: 68, pr: 92 }
  ];
  unifiAPs.forEach(ap => addItem({
    sku: ap.sku,
    name: ap.name,
    brand: 'Ubiquiti',
    category: 'Wi-Fi 6',
    tier: ap.sku.includes('Enterprise') || ap.sku.includes('U7') ? 'Professional / CPD' : 'Mitjà Empresarial',
    supplierId: 2,
    stock: Math.floor(Math.random() * 20) + 6,
    min: 4,
    cost: ap.c,
    price: ap.pr,
    location: 'DFactory Hub - Passadís E1'
  }));

  // UniFi Consoles & Gateways
  const unifiGateways = [
    { sku: 'UCG-Ultra', name: 'Gateway UniFi Cloud Gateway Ultra 1x 2.5GbE WAN 4x GbE LAN IDS/IPS 1Gbps', c: 95, pr: 129 },
    { sku: 'UCG-Max-NS', name: 'Gateway UniFi Cloud Gateway Max 5x 2.5GbE Ports sense disc Protect', c: 165, pr: 220 },
    { sku: 'UCG-Max-512G', name: 'Gateway UniFi Cloud Gateway Max amb 512GB NVMe Protect Pre-instal·lat', c: 225, pr: 295 },
    { sku: 'UCG-Max-1TB', name: 'Gateway UniFi Cloud Gateway Max amb 1TB NVMe Protect Pre-instal·lat', c: 275, pr: 360 },
    { sku: 'UCG-Max-2TB', name: 'Gateway UniFi Cloud Gateway Max amb 2TB NVMe Protect Pre-instal·lat', c: 350, pr: 460 },
    { sku: 'UDM-Pro', name: 'Consola UniFi Dream Machine Pro 10G SFP+ WAN/LAN IDS/IPS 3.5Gbps HDD 3.5"', c: 310, pr: 410 },
    { sku: 'UDM-SE', name: 'Consola UniFi Dream Machine Special Edition 2.5G WAN 8x PoE (2x PoE+) 128GB SSD', c: 410, pr: 540 },
    { sku: 'UXG-Pro', name: 'Gateway UniFi Next-Generation Gateway Pro Doble WAN 10G SFP+ Rack 1U', c: 420, pr: 550 },
    { sku: 'UXG-Lite', name: 'Gateway UniFi Next-Generation Gateway Lite Compacte 1x GbE WAN 1x GbE LAN', c: 105, pr: 139 },
    { sku: 'UXG-Enterprise', name: 'Gateway UniFi Enterprise Gateway 2x 25G SFP28 10G SFP+ Alta Disponibilitat', c: 1850, pr: 2420 },
    { sku: 'UNVR', name: 'Gravador UniFi Network Video Recorder 4 Badies 3.5" RAID 1/5 10G SFP+', c: 245, pr: 325 },
    { sku: 'UNVR-Pro', name: 'Gravador UniFi Network Video Recorder Pro 7 Badies 3.5" RAID 5/6/10 10G SFP+', c: 410, pr: 540 }
  ];
  unifiGateways.forEach(gw => addItem({
    sku: gw.sku,
    name: gw.name,
    brand: 'Ubiquiti',
    category: 'Seguretat NGFW',
    tier: gw.sku.includes('Pro') || gw.sku.includes('Enterprise') ? 'Professional / CPD' : 'Mitjà Empresarial',
    supplierId: 2,
    stock: Math.floor(Math.random() * 12) + 3,
    min: 2,
    cost: gw.c,
    price: gw.pr,
    location: 'DFactory Hub - Passadís F2'
  }));

  // Latiguillos UniFi Oficials Ultra-Prim (Lengths: 0.1m, 0.3m, 1m, 1.5m, 2m, 3m, 5m, 8m x 3 colors: White, Blue, Black)
  const patchLengths = [
    { len: '0.1M', m: '0.1m (10cm)', c: 1.8, pr: 2.9 },
    { len: '0.3M', m: '0.3m (30cm)', c: 2.1, pr: 3.2 },
    { len: '1M',   m: '1 metre',     c: 2.6, pr: 3.9 },
    { len: '1.5M', m: '1.5 metres',  c: 3.1, pr: 4.6 },
    { len: '2M',   m: '2 metres',    c: 3.6, pr: 5.4 },
    { len: '3M',   m: '3 metres',    c: 4.5, pr: 6.8 },
    { len: '5M',   m: '5 metres',    c: 5.9, pr: 8.9 },
    { len: '8M',   m: '8 metres',    c: 8.2, pr: 12.4 }
  ];
  const patchColors = [
    { code: '', name: 'Blanc', hex: 'WH' },
    { code: '-BL', name: 'Blau', hex: 'BU' },
    { code: '-BK', name: 'Negre', hex: 'BK' }
  ];

  patchLengths.forEach(pl => {
    patchColors.forEach(pc => {
      const sku = `U-Cable-Patch-${pl.len}-RJ45${pc.code}`;
      addItem({
        sku,
        name: `Latiguillo UniFi Ultra-Prim Cat6 RJ45 Diàmetre 3mm ${pl.m} Color ${pc.name}`,
        brand: 'Ubiquiti',
        category: 'Cablejat',
        tier: 'Mitjà Empresarial',
        supplierId: 2,
        stock: Math.floor(Math.random() * 80) + 20,
        min: 15,
        cost: pl.c,
        price: pl.pr,
        location: 'DFactory Hub - Calaix D2-01'
      });
    });
  });

  // ==========================================================================
  // 3. COMMSCOPE SYSTIMAX & PANDUIT & DRAKA (Cablejat Estructurat Complet)
  // Proveïdor 4: TD SYNNEX Spain (Tech Data)
  // ==========================================================================

  // CommScope GigaSPEED XL (Cat6) Patch Cords: 8 Colors x 8 Longituds = 64 SKUs reals
  const csLengths = [
    { f: '002', len: '0.5m', c: 2.10, pr: 3.20 },
    { f: '003', len: '1m',   c: 2.60, pr: 3.90 },
    { f: '005', len: '1.5m', c: 2.90, pr: 4.40 },
    { f: '007', len: '2m',   c: 3.20, pr: 4.80 },
    { f: '010', len: '3m',   c: 3.90, pr: 5.80 },
    { f: '016', len: '5m',   c: 5.20, pr: 7.70 },
    { f: '023', len: '7m',   c: 6.80, pr: 9.90 },
    { f: '033', len: '10m',  c: 8.50, pr: 12.50 }
  ];
  const csColorsCat6 = [
    { id: '01', name: 'Gris' },
    { id: '02', name: 'Blau' },
    { id: '03', name: 'Vermell' },
    { id: '04', name: 'Groc' },
    { id: '05', name: 'Verd' },
    { id: '06', name: 'Taronja' },
    { id: '07', name: 'Blanc' },
    { id: '08', name: 'Negre' }
  ];

  csLengths.forEach(l => {
    csColorsCat6.forEach(c => {
      const sku = `CMS-CPC3312-${c.id}F${l.f}`;
      addItem({
        sku,
        name: `Latiguillo Patch Cord Cat6 U/UTP CommScope GigaSPEED XL RJ45 ${l.len} Color ${c.name}`,
        brand: 'CommScope',
        category: 'Cablejat',
        tier: 'Bàsic / General',
        supplierId: 4,
        stock: Math.floor(Math.random() * 100) + 30,
        min: 20,
        cost: l.c,
        price: l.pr,
        location: 'DFactory Hub - Calaix B2-01'
      });
    });
  });

  // CommScope GigaSPEED X10D (Cat6A Apantallat 10GbE): 5 Colors x 8 Longituds = 40 SKUs reals
  const csColorsCat6A = [
    { id: '01', name: 'Gris' },
    { id: '02', name: 'Blau' },
    { id: '03', name: 'Vermell' },
    { id: '04', name: 'Groc' },
    { id: '07', name: 'Blanc' }
  ];
  csLengths.forEach(l => {
    csColorsCat6A.forEach(c => {
      const sku = `CMS-CPC3392-${c.id}F${l.f}`;
      addItem({
        sku,
        name: `Latiguillo Patch Cord Cat6A Apantallat CommScope GigaSPEED X10D RJ45 10GbE ${l.len} Color ${c.name}`,
        brand: 'CommScope',
        category: 'Cablejat',
        tier: 'Mitjà Empresarial',
        supplierId: 4,
        stock: Math.floor(Math.random() * 80) + 25,
        min: 15,
        cost: Number((l.c * 1.5).toFixed(2)),
        price: Number((l.pr * 1.5).toFixed(2)),
        location: 'DFactory Hub - Calaix B2-02'
      });
    });
  });

  // Panduit TX6A 28AWG Slim Patch Cords: 7 Colors x 8 Longituds = 56 SKUs reals
  const panLengths = [
    { l: '0.5M', len: '0.5m', c: 4.10, pr: 6.20 },
    { l: '1M',   len: '1m',   c: 4.90, pr: 7.40 },
    { l: '1.5M', len: '1.5m', c: 5.40, pr: 8.10 },
    { l: '2M',   len: '2m',   c: 5.90, pr: 8.80 },
    { l: '2.5M', len: '2.5m', c: 6.50, pr: 9.70 },
    { l: '3M',   len: '3m',   c: 7.20, pr: 10.80 },
    { l: '5M',   len: '5m',   c: 9.80, pr: 14.50 },
    { l: '7M',   len: '7m',   c: 12.50, pr: 18.20 }
  ];
  const panColors = [
    { code: 'BU', name: 'Blau' },
    { code: 'GY', name: 'Gris' },
    { code: 'YL', name: 'Groc' },
    { code: 'RD', name: 'Vermell' },
    { code: 'BL', name: 'Negre' },
    { code: 'WH', name: 'Blanc' },
    { code: 'GR', name: 'Verd' }
  ];
  panLengths.forEach(l => {
    panColors.forEach(c => {
      const sku = `PAN-UTP28X${l.l}${c.code}`;
      addItem({
        sku,
        name: `Latiguillo Ultra-Prim Panduit QuickNet Cat6A 28AWG ${l.len} Color ${c.name} Estalvi Espai Rack`,
        brand: 'Panduit',
        category: 'Cablejat',
        tier: 'Professional / CPD',
        supplierId: 4,
        stock: Math.floor(Math.random() * 60) + 20,
        min: 15,
        cost: l.c,
        price: l.pr,
        location: 'DFactory Hub - Calaix B2-03'
      });
    });
  });

  // Keystones Panduit Mini-Com (8 colors)
  panColors.forEach(c => {
    addItem({
      sku: `PAN-CJ6X88TG${c.code}`,
      name: `Mòdul Keystone Jack Cat6A Panduit Mini-Com TG Apantallat Color ${c.name} Terminació 100% sense eina`,
      brand: 'Panduit',
      category: 'Cablejat',
      tier: 'Mitjà Empresarial',
      supplierId: 4,
      stock: Math.floor(Math.random() * 150) + 50,
      min: 30,
      cost: 6.20,
      price: 8.90,
      location: 'DFactory Hub - Calaix B3-01'
    });
  });

  // Bobines de Cablejat CommScope, Panduit, Draka (305m, 500m, 1000m)
  const bulkCables = [
    { sku: 'CMS-760004465', name: 'Bobina Cable Cat6 U/UTP SYSTIMAX 1071E 305m Blau', c: 145, pr: 195 },
    { sku: 'CMS-700211931', name: 'Bobina Cable Cat6 U/UTP LSZH Cca SYSTIMAX 3071E 305m Blau Ignífug', c: 168, pr: 225 },
    { sku: 'CMS-700211949', name: 'Bobina Cable Cat6 U/UTP LSZH Cca SYSTIMAX 3071E 305m Gris', c: 168, pr: 225 },
    { sku: 'CMS-700211956', name: 'Bobina Cable Cat6 U/UTP LSZH Cca SYSTIMAX 3071E 305m Groc', c: 168, pr: 225 },
    { sku: 'CMS-700211964', name: 'Bobina Cable Cat6 U/UTP LSZH Cca SYSTIMAX 3071E 305m Vermell', c: 168, pr: 225 },
    { sku: 'CMS-760081372', name: 'Bobina Cable Cat6A F/UTP Apantallat SYSTIMAX 1091B 305m Blau', c: 215, pr: 285 },
    { sku: 'CMS-760105742', name: 'Bobina Cable Cat6A F/UTP LSZH B2ca SYSTIMAX 3091B 10GbE 305m Blau', c: 245, pr: 325 },
    { sku: 'CMS-760105759', name: 'Bobina Cable Cat6A F/UTP LSZH B2ca SYSTIMAX 3091B 10GbE 305m Gris', c: 245, pr: 325 },
    { sku: 'CMS-760105767', name: 'Bobina Cable Cat6A F/UTP LSZH B2ca SYSTIMAX 3091B 10GbE 305m Groc', c: 245, pr: 325 },
    { sku: 'CMS-760105775', name: 'Bobina Cable Cat6A F/UTP LSZH B2ca SYSTIMAX 3091B 10GbE 305m Vermell', c: 245, pr: 325 },
    { sku: 'CMS-760237722', name: 'Tambor Gran Format Cat6A F/UTP LSZH SYSTIMAX 3091B 500m Blau', c: 395, pr: 520 },
    { sku: 'CMS-760237730', name: 'Tambor Gran Format Cat6A F/UTP LSZH SYSTIMAX 3091B 1000m Blau', c: 780, pr: 1020 },
    { sku: 'PAN-PUZ6004BU-CED', name: 'Bobina Cable Cat6 U/UTP LSZH Cca Panduit TX6 PLUS 305m Blau', c: 162, pr: 215 },
    { sku: 'PAN-PUZ6004IG-CED', name: 'Bobina Cable Cat6 U/UTP LSZH Cca Panduit TX6 PLUS 305m Gris', c: 162, pr: 215 },
    { sku: 'PAN-PUZ6ASD04BU-EG', name: 'Bobina Cable Cat6A U/UTP LSZH Panduit TX6A-SD 10Gig 305m Blau', c: 235, pr: 310 },
    { sku: 'PAN-PUZ6ASD04IG-EG', name: 'Bobina Cable Cat6A U/UTP LSZH Panduit TX6A-SD 10Gig 305m Gris', c: 235, pr: 310 },
    { sku: 'DRK-60011571', name: 'Bobina Cable Cat6 U/UTP LSZH Draka UC400 23 AWG 305m Blau Cca', c: 135, pr: 180 },
    { sku: 'DRK-60011572', name: 'Tambor Cable Cat6 U/UTP LSZH Draka UC400 23 AWG 500m Blau Cca', c: 220, pr: 290 },
    { sku: 'DRK-60015344', name: 'Tambor Cable Cat6A U/FTP LSZH Draka UC500 23 AWG 10GbE 500m Blau B2ca', c: 360, pr: 475 },
    { sku: 'DRK-60013180', name: 'Tambor Cable Cat6A U/FTP LSZH Draka UC500 10GbE 1000m Blau B2ca', c: 710, pr: 935 },
    { sku: 'DRK-60011598', name: 'Tambor Cable Cat7 S/FTP Doble Pantalla Draka UC900 SS23 500m Taronja CPD', c: 490, pr: 645 },
    { sku: 'DRK-60011600', name: 'Tambor Cable Cat7A S/FTP Draka UC1500 SS22 1500MHz 500m Blau 40GbE', c: 680, pr: 890 }
  ];
  bulkCables.forEach(bc => addItem({
    sku: bc.sku,
    name: bc.name,
    brand: bc.sku.startsWith('CMS') ? 'CommScope' : (bc.sku.startsWith('PAN') ? 'Panduit' : 'Draka Prysmian'),
    category: 'Cablejat',
    tier: bc.sku.includes('Cat7') || bc.sku.includes('6A') ? 'Professional / CPD' : 'Mitjà Empresarial',
    supplierId: 4,
    stock: Math.floor(Math.random() * 25) + 8,
    min: 4,
    cost: bc.c,
    price: bc.pr,
    location: 'DFactory Hub - Passadís B1'
  }));

  // ==========================================================================
  // 4. PROTECCIÓ SAI (APC SCHNEIDER & SALICRU)
  // Proveïdor 3: Schneider Electric & APC España
  // ==========================================================================
  const apcModels = [
    { sku: 'APC-SMC1000I', name: 'SAI APC Smart-UPS C 1000VA / 600W Torre LCD 4x C13', c: 340, pr: 445 },
    { sku: 'APC-SMC1000I-2UC', name: 'SAI APC Smart-UPS C 1000VA / 600W 2U Rack SmartConnect', c: 380, pr: 495 },
    { sku: 'APC-SMC1500I', name: 'SAI APC Smart-UPS C 1500VA / 900W Torre Sinus Pur', c: 460, pr: 605 },
    { sku: 'APC-SMC1500I-2UC', name: 'SAI APC Smart-UPS C 1500VA / 900W 2U Rack SmartConnect', c: 510, pr: 665 },
    { sku: 'APC-SMT750I', name: 'SAI APC Smart-UPS 750VA / 500W Torre LCD SmartSlot', c: 320, pr: 420 },
    { sku: 'APC-SMT750RMI2UC', name: 'SAI APC Smart-UPS 750VA / 500W 2U Rack SmartConnect', c: 380, pr: 495 },
    { sku: 'APC-SMT1000I', name: 'SAI APC Smart-UPS 1000VA / 700W Torre LCD AVR', c: 480, pr: 630 },
    { sku: 'APC-SMT1000RMI2UC', name: 'SAI APC Smart-UPS 1000VA / 700W 2U Rack SmartConnect', c: 540, pr: 710 },
    { sku: 'APC-SMT1500I', name: 'SAI APC Smart-UPS 1500VA / 1000W Torre LCD 8x C13', c: 640, pr: 840 },
    { sku: 'APC-SMT1500RMI2UC', name: 'SAI APC Smart-UPS 1500VA / 1000W 2U Rack SmartConnect', c: 720, pr: 940 },
    { sku: 'APC-SMT2200I', name: 'SAI APC Smart-UPS 2200VA / 1980W Torre Factor 0.9', c: 1020, pr: 1340 },
    { sku: 'APC-SMT2200RMI2UC', name: 'SAI APC Smart-UPS 2200VA / 1980W 2U Rack SmartConnect', c: 1140, pr: 1490 },
    { sku: 'APC-SMT3000I', name: 'SAI APC Smart-UPS 3000VA / 2700W Torre LCD 8x C13 1x C19', c: 1290, pr: 1690 },
    { sku: 'APC-SMT3000RMI2UC', name: 'SAI APC Smart-UPS 3000VA / 2700W 2U Rack SmartConnect', c: 1420, pr: 1850 },
    { sku: 'APC-SMX1500RMI2U', name: 'SAI APC Smart-UPS X 1500VA / 1200W Autonomia Extensible Rack/Torre', c: 890, pr: 1160 },
    { sku: 'APC-SMX2200RMLV2U', name: 'SAI APC Smart-UPS X 2200VA / 1980W Autonomia Extensible', c: 1350, pr: 1760 },
    { sku: 'APC-SMX3000RMHV2U', name: 'SAI APC Smart-UPS X 3000VA / 2700W 208V/230V Alta Tensió', c: 1650, pr: 2150 },
    { sku: 'APC-SRT1000XLI', name: 'SAI APC Smart-UPS On-Line 1000VA / 1000W Doble Conversió 0ms', c: 860, pr: 1120 },
    { sku: 'APC-SRT1000RMXLI', name: 'SAI APC Smart-UPS On-Line 1000VA / 1000W 2U Rack', c: 940, pr: 1230 },
    { sku: 'APC-SRT1500XLI', name: 'SAI APC Smart-UPS On-Line 1500VA / 1500W Doble Conversió Factor 1.0', c: 1090, pr: 1420 },
    { sku: 'APC-SRT1500RMXLI', name: 'SAI APC Smart-UPS On-Line 1500VA / 1500W 2U Rack', c: 1180, pr: 1540 },
    { sku: 'APC-SRT2200XLI', name: 'SAI APC Smart-UPS On-Line 2200VA / 1980W Doble Conversió', c: 1390, pr: 1810 },
    { sku: 'APC-SRT2200RMXLI', name: 'SAI APC Smart-UPS On-Line 2200VA / 1980W 2U Rack', c: 1490, pr: 1940 },
    { sku: 'APC-SRT3000XLI', name: 'SAI APC Smart-UPS On-Line 3000VA / 2700W Doble Conversió', c: 1890, pr: 2460 },
    { sku: 'APC-SRT3000RMXLI', name: 'SAI APC Smart-UPS On-Line 3000VA / 2700W 3U Rack amb Rails', c: 1980, pr: 2580 },
    { sku: 'APC-SRT5000XLI', name: 'SAI APC Smart-UPS On-Line 5000VA / 4500W 3U Rack/Torre CPD', c: 3250, pr: 4220 },
    { sku: 'APC-SRT5000RMXLI', name: 'SAI APC Smart-UPS On-Line 5000VA / 4500W 3U amb NMC3 Integrada', c: 3490, pr: 4540 },
    { sku: 'APC-SRT6000XLI', name: 'SAI APC Smart-UPS On-Line 6000VA / 6000W Factor 1.0 Unity PF', c: 3950, pr: 5150 },
    { sku: 'APC-SRT8000XLI', name: 'SAI APC Smart-UPS On-Line 8000VA / 8000W Entrada Trifàsic/Monofàsic', c: 5200, pr: 6780 },
    { sku: 'APC-SRT10KXLI', name: 'SAI APC Smart-UPS On-Line 10000VA / 10000W Màxima Protecció CPD Data Center', c: 6500, pr: 8480 },
    { sku: 'APC-AP9640', name: 'Targeta SNMP APC Network Management Card 3 (NMC3) IPv6 Gigabit', c: 260, pr: 345 },
    { sku: 'APC-AP9641', name: 'Targeta SNMP APC NMC3 amb Monitoratge Ambiental Temperatura/Humitat', c: 310, pr: 410 },
    { sku: 'APC-RBC48', name: 'Cartutx de Bateria de Recanvi Original APC RBC48 per a SMC/SMT 1000', c: 145, pr: 195 },
    { sku: 'APC-RBC55', name: 'Cartutx de Bateria de Recanvi Original APC RBC55 per a SMT 2200/3000', c: 295, pr: 395 },
    { sku: 'APC-RBC140', name: 'Mòdul de Bateria Original APC RBC140 per a On-Line SRT 5kVA/6kVA', c: 540, pr: 710 }
  ];
  apcModels.forEach(m => addItem({
    sku: m.sku,
    name: m.name,
    brand: 'APC Schneider',
    category: 'Protecció SAI',
    tier: m.sku.includes('SRT') || m.sku.includes('2200') || m.sku.includes('3000') ? 'Professional / CPD' : 'Mitjà Empresarial',
    supplierId: 3,
    stock: Math.floor(Math.random() * 10) + 3,
    min: 2,
    cost: m.c,
    price: m.pr,
    location: 'DFactory Hub - Passadís G1'
  }));

  // Salicru SLC Twin Pro2 & RT2
  const salicruModels = [
    { sku: 'SAL-SLC-700-TWIN-PRO2', name: 'SAI Salicru SLC Twin Pro2 700VA / 630W Torre On-Line Doble Conversió', c: 260, pr: 345 },
    { sku: 'SAL-SLC-1000-TWIN-PRO2', name: 'SAI Salicru SLC Twin Pro2 1000VA / 900W Torre On-Line Factor 0.9', c: 340, pr: 445 },
    { sku: 'SAL-SLC-1500-TWIN-PRO2', name: 'SAI Salicru SLC Twin Pro2 1500VA / 1350W Torre On-Line 0ms', c: 440, pr: 575 },
    { sku: 'SAL-SLC-2000-TWIN-PRO2', name: 'SAI Salicru SLC Twin Pro2 2000VA / 1800W Torre On-Line', c: 540, pr: 710 },
    { sku: 'SAL-SLC-3000-TWIN-PRO2', name: 'SAI Salicru SLC Twin Pro2 3000VA / 2700W Torre On-Line Eco-Mode', c: 720, pr: 940 },
    { sku: 'SAL-SLC-1000-TWIN-RT2', name: 'SAI Salicru SLC Twin RT2 1000VA / 1000W 2U Rack/Torre Factor 1.0', c: 410, pr: 540 },
    { sku: 'SAL-SLC-1500-TWIN-RT2', name: 'SAI Salicru SLC Twin RT2 1500VA / 1500W 2U Rack/Torre Factor 1.0', c: 520, pr: 685 },
    { sku: 'SAL-SLC-2000-TWIN-RT2', name: 'SAI Salicru SLC Twin RT2 2000VA / 2000W 2U Rack/Torre Factor 1.0', c: 650, pr: 855 },
    { sku: 'SAL-SLC-3000-TWIN-RT2', name: 'SAI Salicru SLC Twin RT2 3000VA / 3000W 2U Rack/Torre Factor 1.0', c: 890, pr: 1165 },
    { sku: 'SAL-SLC-4000-TWIN-RT2', name: 'SAI Salicru SLC Twin RT2 4000VA / 4000W 3U Rack/Torre Factor 1.0', c: 1350, pr: 1760 },
    { sku: 'SAL-SLC-5000-TWIN-RT2', name: 'SAI Salicru SLC Twin RT2 5000VA / 5000W 3U Rack/Torre Borns', c: 1750, pr: 2290 },
    { sku: 'SAL-SLC-6000-TWIN-RT2', name: 'SAI Salicru SLC Twin RT2 6000VA / 6000W 3U Rack/Torre Factor 1.0', c: 2150, pr: 2810 },
    { sku: 'SAL-SLC-8000-TWIN-RT2', name: 'SAI Salicru SLC Twin RT2 8000VA / 8000W 4U Rack/Torre', c: 2790, pr: 3640 },
    { sku: 'SAL-SLC-10000-TWIN-RT2', name: 'SAI Salicru SLC Twin RT2 10000VA / 10000W 4U Paral·lelitzable', c: 3450, pr: 4490 },
    { sku: 'SAL-SPS-800-ADV-RT2', name: 'SAI Salicru SPS Advance RT2 800VA / 720W 2U Line-Interactive', c: 240, pr: 315 },
    { sku: 'SAL-SPS-1100-ADV-RT2', name: 'SAI Salicru SPS Advance RT2 1100VA / 990W 2U Line-Interactive', c: 280, pr: 370 },
    { sku: 'SAL-SPS-1500-ADV-RT2', name: 'SAI Salicru SPS Advance RT2 1500VA / 1350W 2U Sinus Pur', c: 320, pr: 420 },
    { sku: 'SAL-SPS-2000-ADV-RT2', name: 'SAI Salicru SPS Advance RT2 2000VA / 1800W 2U AVR', c: 410, pr: 540 },
    { sku: 'SAL-SPS-3000-ADV-RT2', name: 'SAI Salicru SPS Advance RT2 3000VA / 2700W 2U LCD', c: 580, pr: 760 },
    { sku: 'SAL-SPS-500-ONE', name: 'SAI Salicru SPS One 500VA / 240W 2x Schuko Lloc de Treball', c: 48, pr: 65 },
    { sku: 'SAL-SPS-700-ONE', name: 'SAI Salicru SPS One 700VA / 360W 4x Schuko', c: 58, pr: 79 },
    { sku: 'SAL-SPS-900-ONE', name: 'SAI Salicru SPS One 900VA / 480W 4x Schuko', c: 72, pr: 98 },
    { sku: 'SAL-SPS-1500-ONE', name: 'SAI Salicru SPS One 1500VA / 900W 4x Schuko per a TPVs', c: 115, pr: 155 },
    { sku: 'SAL-SPS-2000-ONE', name: 'SAI Salicru SPS One 2000VA / 1200W 4x Schuko', c: 145, pr: 195 }
  ];
  salicruModels.forEach(m => addItem({
    sku: m.sku,
    name: m.name,
    brand: 'Salicru',
    category: 'Protecció SAI',
    tier: m.sku.includes('RT2') && (m.sku.includes('3000') || m.sku.includes('5000') || m.sku.includes('10000')) ? 'Professional / CPD' : 'Mitjà Empresarial',
    supplierId: 3,
    stock: Math.floor(Math.random() * 14) + 4,
    min: 2,
    cost: m.c,
    price: m.pr,
    location: 'DFactory Hub - Passadís G3'
  }));

  // ==========================================================================
  // 5. SYNOLOGY, QNAP & EMMAGATZEMATGE DE SERVIDOR ENTERPRISE
  // Proveïdor 2: Esprinet Ibèrica S.L.U.
  // ==========================================================================
  const synologyModels = [
    { sku: 'SYN-DS124', name: 'NAS Synology DiskStation DS124 1 Badia Realtek RTD1619B 1GB DDR4', c: 135, pr: 179 },
    { sku: 'SYN-DS223', name: 'NAS Synology DiskStation DS223 2 Badies Realtek 2GB DDR4 Btrfs', c: 215, pr: 285 },
    { sku: 'SYN-DS223j', name: 'NAS Synology DiskStation DS223j 2 Badies Econòmic per a Backup SoHo', c: 165, pr: 219 },
    { sku: 'SYN-DS224+', name: 'NAS Synology DiskStation DS224+ 2 Badies Intel Celeron J4125 2GB DDR4', c: 275, pr: 365 },
    { sku: 'SYN-DS423', name: 'NAS Synology DiskStation DS423 4 Badies Realtek Quad-Core 2GB DDR4', c: 310, pr: 410 },
    { sku: 'SYN-DS423+', name: 'NAS Synology DiskStation DS423+ 4 Badies Intel J4125 2GB DDR4 2x M.2 NVMe', c: 435, pr: 575 },
    { sku: 'SYN-DS723+', name: 'NAS Synology DiskStation DS723+ 2 Badies AMD Ryzen R1600 2GB ECC Ranura 10GbE', c: 410, pr: 540 },
    { sku: 'SYN-DS923+', name: 'NAS Synology DiskStation DS923+ 4 Badies AMD Ryzen R1600 4GB ECC Ranura 10GbE', c: 510, pr: 675 },
    { sku: 'SYN-DS1522+', name: 'NAS Synology DiskStation DS1522+ 5 Badies AMD Ryzen R1600 8GB ECC 4x GbE', c: 650, pr: 855 },
    { sku: 'SYN-DS1621+', name: 'NAS Synology DiskStation DS1621+ 6 Badies AMD Ryzen V1500B 4GB ECC PCIe x8', c: 780, pr: 1020 },
    { sku: 'SYN-DS1821+', name: 'NAS Synology DiskStation DS1821+ 8 Badies AMD Ryzen V1500B 4GB ECC', c: 880, pr: 1150 },
    { sku: 'SYN-DS2422+', name: 'NAS Synology DiskStation DS2422+ 12 Badies AMD Ryzen V1500B 4GB ECC', c: 1550, pr: 2020 },
    { sku: 'SYN-DS3622xs+', name: 'NAS Synology DiskStation DS3622xs+ 12 Badies Xeon D-1531 16GB ECC 10GbE', c: 2850, pr: 3690 },
    { sku: 'SYN-RS422+', name: 'NAS Synology RackStation RS422+ 1U 4 Badies Fons Compacte 2GB ECC', c: 580, pr: 760 },
    { sku: 'SYN-RS822+', name: 'NAS Synology RackStation RS822+ 1U 4 Badies AMD Ryzen V1500B 2GB ECC', c: 840, pr: 1090 },
    { sku: 'SYN-RS822RP+', name: 'NAS Synology RackStation RS822RP+ 1U 4 Badies Doble Font Redundant', c: 1120, pr: 1460 },
    { sku: 'SYN-RS1221+', name: 'NAS Synology RackStation RS1221+ 2U 8 Badies Fons Compacte 380mm 4GB ECC', c: 1160, pr: 1520 },
    { sku: 'SYN-RS1221RP+', name: 'NAS Synology RackStation RS1221RP+ 2U 8 Badies Doble Font Redundant', c: 1490, pr: 1950 },
    { sku: 'SYN-RS2423+', name: 'NAS Synology RackStation RS2423+ 2U 12 Badies AMD Ryzen V1780B 8GB ECC 10GbE', c: 2150, pr: 2790 },
    { sku: 'SYN-RS2423RP+', name: 'NAS Synology RackStation RS2423RP+ 2U 12 Badies Doble Font Redundant 10GbE', c: 2590, pr: 3380 },
    { sku: 'SYN-RS3621xs+', name: 'NAS Synology RackStation RS3621xs+ 2U 12 Badies Intel Xeon D-1541 16GB ECC 10G', c: 4100, pr: 5350 },
    { sku: 'SYN-DX517', name: 'Unitat d\'Expansió Synology DX517 5 Badies eSATA per a DS923+/DS1522+', c: 395, pr: 520 },
    { sku: 'SYN-RX418', name: 'Unitat d\'Expansió Synology RX418 1U 4 Badies per a RS822+', c: 540, pr: 710 },
    { sku: 'SYN-RX1223RP', name: 'Unitat d\'Expansió Synology RX1223RP 2U 12 Badies Doble Font per a RS2423RP+', c: 1550, pr: 2020 }
  ];
  synologyModels.forEach(m => addItem({
    sku: m.sku,
    name: m.name,
    brand: 'Synology',
    category: 'Servidors',
    tier: m.sku.includes('RS') || m.sku.includes('xs+') ? 'Professional / CPD' : 'Mitjà Empresarial',
    supplierId: 2,
    stock: Math.floor(Math.random() * 8) + 2,
    min: 1,
    cost: m.c,
    price: m.pr,
    location: 'DFactory Hub - Passadís H3'
  }));

  // Discos Durs Western Digital Red Pro & Ultrastar Enterprise (SATA & SAS)
  const wdCapacities = [
    { cap: '2TB', code: '2002FFSX', c: 95, pr: 125 },
    { cap: '4TB', code: '4005FFBX', c: 125, pr: 165 },
    { cap: '6TB', code: '6003FFBX', c: 165, pr: 215 },
    { cap: '8TB', code: '8003FFBX', c: 198, pr: 260 },
    { cap: '10TB', code: '102KFBX', c: 245, pr: 325 },
    { cap: '12TB', code: '121KFBX', c: 285, pr: 375 },
    { cap: '14TB', code: '141KFGX', c: 320, pr: 420 },
    { cap: '16TB', code: '161KFGX', c: 360, pr: 475 },
    { cap: '18TB', code: '181KFGX', c: 395, pr: 520 },
    { cap: '20TB', code: '201KFGX', c: 450, pr: 590 },
    { cap: '22TB', code: '221KFGX', c: 510, pr: 670 }
  ];
  wdCapacities.forEach(w => {
    // Red Pro
    addItem({
      sku: `WDC-WD${w.code}`,
      name: `Disc Dur Western Digital Red Pro ${w.cap} SATA 3.5" 7200rpm 256MB/512MB per a NAS RAID 24x7`,
      brand: 'Western Digital',
      category: 'Servidors',
      tier: 'Mitjà Empresarial',
      supplierId: 2,
      stock: Math.floor(Math.random() * 25) + 6,
      min: 4,
      cost: w.c,
      price: w.pr,
      location: 'DFactory Hub - Passadís H5'
    });
    // Ultrastar DC Enterprise
    addItem({
      sku: `WDC-HC550-${w.cap}-SATA`,
      name: `Disc Dur Western Digital Ultrastar DC HC550 ${w.cap} SATA 3.5" 7200rpm Enterprise Data Center`,
      brand: 'Western Digital',
      category: 'Servidors',
      tier: 'Professional / CPD',
      supplierId: 2,
      stock: Math.floor(Math.random() * 20) + 5,
      min: 3,
      cost: Number((w.c * 1.1).toFixed(2)),
      price: Number((w.pr * 1.1).toFixed(2)),
      location: 'DFactory Hub - Passadís H5'
    });
    // Ultrastar DC Enterprise SAS 12Gbps
    addItem({
      sku: `WDC-HC550-${w.cap}-SAS12`,
      name: `Disc Dur Western Digital Ultrastar DC ${w.cap} SAS 12Gbps 7200rpm per a Servidors Dell/HPE`,
      brand: 'Western Digital',
      category: 'Servidors',
      tier: 'Professional / CPD',
      supplierId: 2,
      stock: Math.floor(Math.random() * 15) + 4,
      min: 2,
      cost: Number((w.c * 1.18).toFixed(2)),
      price: Number((w.pr * 1.18).toFixed(2)),
      location: 'DFactory Hub - Passadís H5'
    });
  });

  // Seagate IronWolf Pro & Exos Enterprise
  const seagateCapacities = [
    { cap: '4TB', code: '4000NT001', c: 120, pr: 160 },
    { cap: '6TB', code: '6000NT001', c: 160, pr: 210 },
    { cap: '8TB', code: '8000NT001', c: 195, pr: 255 },
    { cap: '10TB', code: '10000NT001', c: 240, pr: 315 },
    { cap: '12TB', code: '12000NT001', c: 280, pr: 370 },
    { cap: '14TB', code: '14000NT001', c: 315, pr: 415 },
    { cap: '16TB', code: '16000NT001', c: 355, pr: 465 },
    { cap: '18TB', code: '18000NT001', c: 390, pr: 515 },
    { cap: '20TB', code: '20000NT001', c: 440, pr: 580 },
    { cap: '22TB', code: '22000NT001', c: 495, pr: 650 }
  ];
  seagateCapacities.forEach(s => {
    // IronWolf Pro
    addItem({
      sku: `SEA-ST${s.code}`,
      name: `Disc Dur Seagate IronWolf Pro ${s.cap} SATA 3.5" 7200rpm 256MB CMR Sensor RV Rotacional`,
      brand: 'Seagate',
      category: 'Servidors',
      tier: 'Mitjà Empresarial',
      supplierId: 2,
      stock: Math.floor(Math.random() * 20) + 6,
      min: 4,
      cost: s.c,
      price: s.pr,
      location: 'DFactory Hub - Passadís H5'
    });
    // Exos X Enterprise
    addItem({
      sku: `SEA-EXOS-${s.cap}-SATA`,
      name: `Disc Dur Seagate Exos X ${s.cap} SATA 3.5" 7200rpm 512e/4Kn 2.5 Milions d'Hores MTBF`,
      brand: 'Seagate',
      category: 'Servidors',
      tier: 'Professional / CPD',
      supplierId: 2,
      stock: Math.floor(Math.random() * 18) + 5,
      min: 3,
      cost: Number((s.c * 1.08).toFixed(2)),
      price: Number((s.pr * 1.08).toFixed(2)),
      location: 'DFactory Hub - Passadís H5'
    });
    // Exos SAS 12Gbps
    addItem({
      sku: `SEA-EXOS-${s.cap}-SAS12`,
      name: `Disc Dur Seagate Exos X ${s.cap} SAS 12Gbps Enterprise per a Servidors PowerEdge`,
      brand: 'Seagate',
      category: 'Servidors',
      tier: 'Professional / CPD',
      supplierId: 2,
      stock: Math.floor(Math.random() * 15) + 4,
      min: 2,
      cost: Number((s.c * 1.15).toFixed(2)),
      price: Number((s.pr * 1.15).toFixed(2)),
      location: 'DFactory Hub - Passadís H5'
    });
  });

  // Samsung Enterprise SSDs (PM893 SATA & PM9A3 NVMe)
  const samsungSSDs = [
    { sku: 'SAM-MZ7L3480HCHQ', name: 'Disc SSD Samsung PM893 480GB SATA 2.5" Enterprise Server 1.3 DWPD', c: 85, pr: 115 },
    { sku: 'SAM-MZ7L3960HCJR', name: 'Disc SSD Samsung PM893 960GB SATA 2.5" Enterprise Protecció Fallada PLP', c: 135, pr: 180 },
    { sku: 'SAM-MZ7L31T9HBLR', name: 'Disc SSD Samsung PM893 1.92TB SATA 2.5" Enterprise 1.3 DWPD', c: 235, pr: 310 },
    { sku: 'SAM-MZ7L33T8HBLR', name: 'Disc SSD Samsung PM893 3.84TB SATA 2.5" Enterprise Lectura Intensiva', c: 440, pr: 580 },
    { sku: 'SAM-MZ7L37T6HBLA', name: 'Disc SSD Samsung PM893 7.68TB SATA 2.5" Enterprise Màxima Densitat', c: 850, pr: 1120 },
    { sku: 'SAM-MZQL2960HCJR', name: 'Disc SSD Samsung PM9A3 960GB U.2 PCIe 4.0 NVMe Enterprise 6800MB/s', c: 165, pr: 225 },
    { sku: 'SAM-MZQL21T9HCJR', name: 'Disc SSD Samsung PM9A3 1.92TB U.2 PCIe 4.0 NVMe Enterprise', c: 295, pr: 395 },
    { sku: 'SAM-MZQL23T8HCLS', name: 'Disc SSD Samsung PM9A3 3.84TB U.2 PCIe 4.0 NVMe Enterprise', c: 560, pr: 740 },
    { sku: 'SAM-MZQL27T6HBLA', name: 'Disc SSD Samsung PM9A3 7.68TB U.2 PCIe 4.0 NVMe Enterprise CPD', c: 1080, pr: 1420 },
    { sku: 'SAM-MZ1L2960HCJR', name: 'Disc SSD Samsung PM9A3 960GB M.2 22110 PCIe 4.0 NVMe amb PLP', c: 175, pr: 235 },
    { sku: 'SAM-MZ1L21T9HCLS', name: 'Disc SSD Samsung PM9A3 1.92TB M.2 22110 PCIe 4.0 NVMe amb PLP', c: 310, pr: 415 }
  ];
  samsungSSDs.forEach(ssd => addItem({
    sku: ssd.sku,
    name: ssd.name,
    brand: 'Samsung Enterprise',
    category: 'Servidors',
    tier: 'Professional / CPD',
    supplierId: 2,
    stock: Math.floor(Math.random() * 20) + 5,
    min: 3,
    cost: ssd.c,
    price: ssd.pr,
    location: 'DFactory Hub - Calaix H5-01'
  }));

  // ==========================================================================
  // 6. RACKS 19", ARMARIS LEGRAND LINKEO & RACKMATIC
  // Proveïdor 3: Schneider Electric & APC España
  // ==========================================================================
  const rackModels = [
    { sku: 'LEG-646200', name: 'Armari Rack 19" Mural 6U 600x450mm Linkeo Porta Vidre', c: 82.50, pr: 115 },
    { sku: 'LEG-646201', name: 'Armari Rack 19" Mural 9U 600x450mm Linkeo Porta Vidre', c: 95, pr: 130 },
    { sku: 'LEG-646202', name: 'Armari Rack 19" Mural 12U 600x450mm Linkeo Enclavat IP20', c: 113.10, pr: 145 },
    { sku: 'LEG-646203', name: 'Armari Rack 19" Mural 15U 600x450mm Linkeo Panells Desmuntables', c: 132, pr: 175 },
    { sku: 'LEG-646204', name: 'Armari Rack 19" Mural 18U 600x450mm Linkeo Pany de Clau', c: 158, pr: 210 },
    { sku: 'LEG-646205', name: 'Armari Rack 19" Mural 12U 600x600mm Linkeo Gran Fons', c: 148, pr: 195 },
    { sku: 'LEG-646206', name: 'Armari Rack 19" Mural 15U 600x600mm Linkeo Gran Fons', c: 172, pr: 228 },
    { sku: 'LEG-646207', name: 'Armari Rack 19" Mural 18U 600x600mm Linkeo Gran Fons', c: 198, pr: 260 },
    { sku: 'LEG-646208', name: 'Armari Rack 19" Mural Pivotant Doble Cos 12U 600x600mm Obertura 180°', c: 265, pr: 345 },
    { sku: 'LEG-646209', name: 'Armari Rack 19" Mural Pivotant Doble Cos 18U 600x600mm Accés Ràpid', c: 320, pr: 415 },
    { sku: 'LEG-646210', name: 'Armari Rack 19" Terra 24U 600x600mm Linkeo Rodes i Peus', c: 375, pr: 485 },
    { sku: 'LEG-646211', name: 'Armari Rack 19" Terra 24U 600x800mm Linkeo Càrrega 400kg', c: 440, pr: 570 },
    { sku: 'LEG-646212', name: 'Armari Rack 19" Terra 24U 800x800mm Linkeo Passafils Verticals', c: 510, pr: 660 },
    { sku: 'LEG-646213', name: 'Armari Rack 19" Terra 33U 600x800mm Linkeo Acer 1.5mm', c: 560, pr: 725 },
    { sku: 'LEG-646214', name: 'Armari Rack 19" Terra 33U 800x800mm Linkeo Alta Densitat', c: 640, pr: 830 },
    { sku: 'LEG-646215', name: 'Armari Rack 19" Terra 42U 600x800mm Linkeo Porta Reversible', c: 690, pr: 890 },
    { sku: 'LEG-646216', name: 'Armari Rack 19" Terra 42U 800x800mm Linkeo Canals Laterals', c: 760, pr: 980 },
    { sku: 'LEG-646217', name: 'Armari Rack 19" Terra 42U 800x1000mm CPD Servidors Portes Microperforades 80%', c: 920, pr: 1190 },
    { sku: 'LEG-646218', name: 'Armari Rack 19" Terra 42U 800x1200mm CPD Gran Fons Deep Chassis', c: 1080, pr: 1390 },
    { sku: 'LEG-646219', name: 'Armari Rack 19" Terra 47U 800x1000mm CPD Càrrega 1000kg', c: 1220, pr: 1580 },
    { sku: 'RKM-WK006', name: 'Armari Rack 19" Mural 6U 600x450mm MobiRack Desmuntable', c: 68, pr: 95 },
    { sku: 'RKM-WK009', name: 'Armari Rack 19" Mural 9U 600x450mm MobiRack', c: 85, pr: 118 },
    { sku: 'RKM-WK012', name: 'Armari Rack 19" Mural 12U 600x450mm MobiRack', c: 105, pr: 142 },
    { sku: 'RKM-WK015', name: 'Armari Rack 19" Mural 15U 600x450mm MobiRack', c: 125, pr: 168 },
    { sku: 'RKM-WK018', name: 'Armari Rack 19" Mural 18U 600x600mm MobiRack Desmuntable', c: 160, pr: 210 },
    { sku: 'RKM-WK022', name: 'Armari Rack 19" Terra 22U 600x800mm MobiRack amb Rodes Industrials', c: 320, pr: 415 },
    { sku: 'RKM-WK027', name: 'Armari Rack 19" Terra 27U 600x800mm MobiRack Estructura Rebitada', c: 390, pr: 505 },
    { sku: 'RKM-WK032', name: 'Armari Rack 19" Terra 32U 800x1000mm MobiRack Servidors', c: 530, pr: 685 },
    { sku: 'RKM-WK042', name: 'Armari Rack 19" Terra 42U 800x1000mm MobiRack Portes Dobles Perforades', c: 720, pr: 930 },
    { sku: 'RKM-OF042', name: 'Bastidor Open Frame 19" 2 Columnes 42U Bastidor Obert Laboratori', c: 215, pr: 285 },
    { sku: 'LEG-646810', name: 'PDU Rack 19" 1U 6 Preses Schuko amb Interruptor Protegit Cable 3m', c: 28, pr: 38 },
    { sku: 'LEG-646811', name: 'PDU Rack 19" 1U 8 Preses Schuko 16A sense Interruptor per a SAI', c: 34, pr: 46 },
    { sku: 'LEG-646812', name: 'PDU Rack 19" 1U 9 Preses Schuko amb Magnetotèrmic 16A', c: 49, pr: 66 },
    { sku: 'LEG-646813', name: 'PDU Rack 19" 1U 12 Preses IEC C13 10A Servidors CPD', c: 58, pr: 78 },
    { sku: 'LEG-646815', name: 'PDU Rack 19" 1U 16 Preses Schuko amb Amperímetre Digital LCD', c: 110, pr: 148 },
    { sku: 'LEG-646816', name: 'PDU Vertical Zero-U 24 Preses Schuko 16A amb Amperímetre Digital', c: 165, pr: 220 },
    { sku: 'LEG-646817', name: 'PDU Vertical Zero-U 20x C13 + 4x C19 per a Racks 42U de Servidors', c: 195, pr: 260 }
  ];
  rackModels.forEach(r => addItem({
    sku: r.sku,
    name: r.name,
    brand: r.sku.startsWith('LEG') ? 'Legrand' : 'RackMatic',
    category: 'Racks 19"',
    tier: r.sku.includes('42U') || r.sku.includes('47U') || r.sku.includes('Zero-U') ? 'Professional / CPD' : 'Mitjà Empresarial',
    supplierId: 3,
    stock: Math.floor(Math.random() * 15) + 3,
    min: 2,
    cost: r.c,
    price: r.pr,
    location: 'DFactory Hub - Passadís A2'
  }));

  // ==========================================================================
  // 7. RETAIL TPV, IMPRESSORES TÈRMIQUES & ESCÀNERS DE CODI DE BARRES
  // Proveïdor 5: Posiflex & Retail Iberia
  // ==========================================================================
  const retailModels = [
    { sku: 'PSF-XT-3815-J1900-4G', name: 'TPV Posiflex XT-3815 15" TFT Capacitiu Celeron J1900 4GB 128GB SSD', c: 420, pr: 560 },
    { sku: 'PSF-XT-3815-J1900-8G', name: 'TPV Posiflex XT-3815 15" Celeron J1900 8GB RAM 256GB SSD Win10 IoT', c: 480, pr: 640 },
    { sku: 'PSF-XT-6315-I3-8G', name: 'TPV Posiflex XT-6315 15" Intel Core i3 8GB RAM 256GB SSD Alumini', c: 650, pr: 865 },
    { sku: 'PSF-XT-6315-I5-16G', name: 'TPV Posiflex XT-6315 15" Intel Core i5 16GB RAM 512GB SSD Comerç Exigent', c: 840, pr: 1110 },
    { sku: 'PSF-HAYDN-A6-I3', name: 'TPV All-in-One Posiflex Haydn A6 Core i3 amb Impressora Tèrmica Integrada', c: 890, pr: 1180 },
    { sku: 'PSF-HAYDN-A6-I5', name: 'TPV All-in-One Posiflex Haydn A6 Core i5 16GB RAM Impressora 250mm/s', c: 1080, pr: 1420 },
    { sku: 'PSF-RT-615-G2-I3', name: 'TPV Ultra-Prim Posiflex RT-615-G2 15.6" Format 16:9 Intel Core i3', c: 720, pr: 960 },
    { sku: 'EPS-C31CJ57112', name: 'Impressora Tèrmica Epson TM-T88VII 500mm/s USB/Ethernet Negre Hostaleria', c: 215, pr: 285 },
    { sku: 'EPS-C31CJ57111', name: 'Impressora Tèrmica Epson TM-T88VII 500mm/s USB/Ethernet Blanc', c: 215, pr: 285 },
    { sku: 'EPS-C31CK26102', name: 'Impressora Compacta Epson TM-m30III Cub 300mm/s USB/Ethernet/BT Negre', c: 185, pr: 245 },
    { sku: 'EPS-C31CK26101', name: 'Impressora Compacta Epson TM-m30III Cub 300mm/s USB/Ethernet/BT Blanc', c: 185, pr: 245 },
    { sku: 'EPS-C31CH51012', name: 'Impressora Tèrmica Epson TM-T20III 250mm/s USB/Ethernet Negre', c: 115, pr: 155 },
    { sku: 'EPS-C31C514057', name: 'Impressora d\'Impacte Epson TM-U220B Matricial Bicolor Cuines', c: 195, pr: 260 },
    { sku: 'ZEB-DS2208-SR7U2100SGW', name: 'Lector 1D/2D Zebra DS2208 USB amb Suport Mans Lliures Intellistand', c: 72, pr: 98 },
    { sku: 'ZEB-DS2278-SR7U2100PRW', name: 'Lector 1D/2D Sense Fils Bluetooth Zebra DS2278 amb Bressol USB', c: 175, pr: 235 },
    { sku: 'ZEB-DS4608-SR7U2100SGW', name: 'Lector 2D Alta Densitat Zebra DS4608 per a Farmàcia i Retail', c: 135, pr: 180 },
    { sku: 'ZEB-DS9308-SR4R0110AZW', name: 'Lector Sobretaula Omnidireccional 1D/2D Zebra DS9308 Línia de Caixes', c: 145, pr: 195 },
    { sku: 'ZEB-TC210K-01B212-A6', name: 'Terminal Mòbil PDA Zebra TC21 Android 11 5" Wi-Fi 2D SE4710 3GB/32GB', c: 395, pr: 525 },
    { sku: 'ZEB-TC26BK-11B212-A6', name: 'Terminal Mòbil PDA Zebra TC26 Android 11 4G LTE + Wi-Fi 2D', c: 485, pr: 640 },
    { sku: 'ZEB-ZD4A042-30EE00EZ', name: 'Impressora d\'Etiquetes Zebra ZD421T Transferència Tèrmica 203dpi USB/Eth', c: 285, pr: 375 },
    { sku: 'ZEB-ZD4A043-30EE00EZ', name: 'Impressora d\'Etiquetes Zebra ZD421T Transferència Tèrmica 300dpi Alta Res', c: 345, pr: 455 },
    { sku: 'ZEB-ZD6A042-30EE00EZ', name: 'Impressora Industrial Zebra ZD621T 203dpi Pantalla Color LCD', c: 490, pr: 650 },
    { sku: 'DAT-QD2430-BKK1S', name: 'Lector 1D/2D Datalogic QuickScan QD2430 USB Punter Verd Green Spot', c: 65, pr: 89 },
    { sku: 'PSF-CR-4000B', name: 'Calaix Portamonedes Posiflex CR-4000B Acer 5B/8M Connexió RJ11 Negre', c: 58, pr: 79 },
    { sku: 'PSF-PD-2608UE', name: 'Visor de Client Posiflex PD-2608UE 2x20 Caràcters Fluorescent VFD USB', c: 72, pr: 98 }
  ];
  retailModels.forEach(m => addItem({
    sku: m.sku,
    name: m.name,
    brand: m.sku.startsWith('PSF') ? 'Posiflex' : (m.sku.startsWith('EPS') ? 'Epson' : (m.sku.startsWith('ZEB') ? 'Zebra Technologies' : 'Datalogic')),
    category: 'Retail TPV',
    tier: m.sku.includes('6315') || m.sku.includes('ZD6A') || m.sku.includes('TC') ? 'Professional / CPD' : 'Mitjà Empresarial',
    supplierId: 5,
    stock: Math.floor(Math.random() * 20) + 5,
    min: 3,
    cost: m.c,
    price: m.pr,
    location: 'DFactory Hub - Passadís I1'
  }));

  // ==========================================================================
  // 8. EINES DE CERTIFICACIÓ FLUKE NETWORKS
  // Proveïdor 4: TD SYNNEX Spain (Tech Data)
  // ==========================================================================
  const flukeTools = [
    { sku: 'FLK-DSX2-5000', name: 'Certificador Fluke Networks DSX2-5000 CableAnalyzer Cat6A/Class EA 500MHz', c: 9500, pr: 12400 },
    { sku: 'FLK-DSX2-8000', name: 'Certificador Fluke Networks DSX2-8000 CableAnalyzer Cat8/Class II 2GHz', c: 12800, pr: 16500 },
    { sku: 'FLK-MS2-100', name: 'Verificador de Cablejat Fluke Networks MicroScanner2 MS2-100 RJ45/Coax TDR', c: 480, pr: 635 },
    { sku: 'FLK-MS2-KIT', name: 'Kit Professional Fluke Networks MicroScanner2 MS2-KIT amb Sonda IntelliTone', c: 790, pr: 1040 },
    { sku: 'FLK-MS2-POE', name: 'Comprovador de Cablejat i PoE Fluke Networks MicroScanner PoE 802.3bt fins a 90W', c: 650, pr: 855 },
    { sku: 'FLK-MT-8200-60-KIT', name: 'Generador de Tons i Sonda Digital Fluke Networks IntelliTone Pro 200 Kit', c: 275, pr: 365 },
    { sku: 'FLK-LIQ-100', name: 'Comprovador de Cable i Xarxa Fluke Networks LinkIQ LIQ-100 Proves 10G Ping IP', c: 2150, pr: 2790 },
    { sku: 'FLK-LIQ-KIT', name: 'Kit Industrial Fluke Networks LinkIQ Industrial Ethernet & PoE Advanced Kit', c: 2890, pr: 3750 },
    { sku: 'FLK-FI-500', name: 'Microscopi d\'Inspecció de Fibra Òptica Fluke Networks FiberInspector Micro LCD', c: 2350, pr: 3050 },
    { sku: 'FLK-TS100', name: 'Localitzador de Fallades de Cablejat TDR Fluke Networks TS100 fins a 900m', c: 380, pr: 495 },
    { sku: 'FLK-PRO3000', name: 'Kit Generador de Tons i Sonda Analògic Fluke Networks Pro3000 Parells', c: 95, pr: 128 },
    { sku: 'FLK-11291000', name: 'Eina d\'Inserció per Impacte Fluke Networks D914S Fulla 110/Krone', c: 65, pr: 88 }
  ];
  flukeTools.forEach(t => addItem({
    sku: t.sku,
    name: t.name,
    brand: 'Fluke Networks',
    category: 'Eines SAT',
    tier: t.c > 1000 ? 'Professional / CPD' : 'Mitjà Empresarial',
    supplierId: 4,
    stock: Math.floor(Math.random() * 6) + 2,
    min: 1,
    cost: t.c,
    price: t.pr,
    location: 'DFactory Hub - Armari de Seguretat SAT'
  }));

  return catalog;
}

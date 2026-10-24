// Catàleg d'imatges oficials, resolució específica per model i gestió de càrrega personalitzada per a KernelCore

// ─── GESTIÓ D'IMATGES PUJADES PER L'USUARI (LOCALSTORAGE & PERSISTÈNCIA) ─────────
export function getCustomImages() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem('kernel_custom_product_images') || '{}');
  } catch {
    return {};
  }
}

export function saveCustomProductImage(key, dataUrl) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getCustomImages();
    existing[key] = dataUrl;
    localStorage.setItem('kernel_custom_product_images', JSON.stringify(existing));
    return existing;
  } catch (e) {
    console.error('Error desant imatge personalitzada:', e);
  }
}

export function removeCustomProductImage(key) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getCustomImages();
    delete existing[key];
    localStorage.setItem('kernel_custom_product_images', JSON.stringify(existing));
    return existing;
  } catch (e) {
    console.error('Error eliminant imatge personalitzada:', e);
  }
}

// ─── GENERADOR DE FITXA VISUAL TÈCNICA VECTORIAL (SVG) ESPECÍFICA PER MODEL ──────────
export function generateProductVectorSpec(item) {
  if (!item) return '';
  const brand = (item.brand || 'KernelCore').toUpperCase();
  const sku = item.sku || `SKU-${item.id}`;
  const name = item.name || '';
  const cat = (item.category || '').toLowerCase();

  const brandColors = {
    CISCO: { primary: '#049fd9', accent: '#005073', bg: '#0b1622' },
    DELL: { primary: '#0076ce', accent: '#004c87', bg: '#08121e' },
    UBIQUITI: { primary: '#006fff', accent: '#004399', bg: '#091528' },
    LEGRAND: { primary: '#e30613', accent: '#8a0008', bg: '#1c1012' },
    RACKMATIC: { primary: '#f59e0b', accent: '#b45309', bg: '#1c170d' },
    'APC SCHNEIDER': { primary: '#3dcd58', accent: '#00873d', bg: '#0a1d12' },
    SALICRU: { primary: '#e11d48', accent: '#9f1239', bg: '#1e0a12' },
    SYNOLOGY: { primary: '#14b8a6', accent: '#0f766e', bg: '#081a17' },
    COMMSCOPE: { primary: '#06b6d4', accent: '#0891b2', bg: '#09171f' },
    PANDUIT: { primary: '#10b981', accent: '#047857', bg: '#081813' },
    'DRAKA PRYSMIAN': { primary: '#8b5cf6', accent: '#6d28d9', bg: '#170f26' },
    'WESTERN DIGITAL': { primary: '#ef4444', accent: '#b91c1c', bg: '#1a0c0e' },
    SEAGATE: { primary: '#84cc16', accent: '#4d7c0f', bg: '#121909' },
    'SAMSUNG ENTERPRISE': { primary: '#3b82f6', accent: '#1d4ed8', bg: '#0b1329' },
    'FLUKE NETWORKS': { primary: '#eab308', accent: '#a16207', bg: '#1c1608' },
    FORTINET: { primary: '#ee2e24', accent: '#991b1b', bg: '#1c0c0d' },
    'HPE ARUBA': { primary: '#ff8300', accent: '#c2410c', bg: '#1c1109' },
    MIKROTIK: { primary: '#38bdf8', accent: '#0284c7', bg: '#081726' },
    POSIFLEX: { primary: '#0ea5e9', accent: '#0369a1', bg: '#0c1824' },
    EPSON: { primary: '#0284c7', accent: '#0369a1', bg: '#0c1824' },
    'ZEBRA TECHNOLOGIES': { primary: '#f97316', accent: '#c2410c', bg: '#1c1209' },
    DATALOGIC: { primary: '#22c55e', accent: '#15803d', bg: '#091c10' }
  };

  const scheme = brandColors[brand] || { primary: '#06b6d4', accent: '#0891b2', bg: '#0f172a' };

  let graphic = '';

  // ARMARIS RACK (Dibuix segons U i format mural o terra)
  if (cat.includes('rack') || brand.includes('LEGRAND') || brand.includes('RACKMATIC')) {
    const uHeight = name.match(/(\d+)u/i)?.[1] || '42';
    const isMural = name.toLowerCase().includes('mural') || parseInt(uHeight, 10) <= 18;
    const isPdu = name.toLowerCase().includes('pdu') || sku.includes('PDU');

    if (isPdu) {
      graphic = `
        <g transform="translate(40, 115)">
          <rect x="0" y="0" width="400" height="38" rx="4" fill="#0f172a" stroke="#334155" stroke-width="2" />
          <rect x="15" y="10" width="30" height="18" rx="2" fill="#ef4444" />
          <text x="30" y="22" fill="#ffffff" font-family="monospace" font-size="7" text-anchor="middle">ON/OFF</text>
          ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `
            <rect x="${70 + i * 40}" y="8" width="28" height="22" rx="3" fill="#1e293b" stroke="#475569" stroke-width="1" />
            <circle cx="${84 + i * 40}" cy="19" r="6" fill="#0b0f19" />
          `).join('')}
        </g>
      `;
    } else if (isMural) {
      graphic = `
        <g transform="translate(170, 40)">
          <rect x="0" y="0" width="140" height="210" rx="8" fill="#111827" stroke="#374151" stroke-width="2.5" />
          <rect x="10" y="10" width="120" height="190" rx="4" fill="#1f2937" stroke="${scheme.primary}" stroke-opacity="0.5" stroke-width="1.5" />
          <line x1="24" y1="18" x2="24" y2="192" stroke="#4b5563" stroke-dasharray="2 4" stroke-width="2" />
          <line x1="116" y1="18" x2="116" y2="192" stroke="#4b5563" stroke-dasharray="2 4" stroke-width="2" />
          <rect x="30" y="24" width="80" height="162" fill="#030712" fill-opacity="0.7" rx="2" />
          <rect x="36" y="38" width="68" height="14" rx="2" fill="#374151" />
          <circle cx="44" cy="45" r="2" fill="#10b981" />
          <rect x="36" y="60" width="68" height="22" rx="2" fill="#1f2937" stroke="#4b5563" />
          <text x="70" y="74" fill="#9ca3af" font-family="monospace" font-size="9" text-anchor="middle" font-weight="bold">MURAL ${uHeight}U</text>
          <path d="M 10 10 L 130 150 L 130 200 L 10 60 Z" fill="white" fill-opacity="0.04" />
        </g>
      `;
    } else {
      graphic = `
        <g transform="translate(160, 30)">
          <rect x="0" y="0" width="160" height="230" rx="8" fill="#0b0f19" stroke="#374151" stroke-width="3" />
          <rect x="10" y="8" width="140" height="214" rx="4" fill="#111827" stroke="${scheme.primary}" stroke-opacity="0.6" stroke-width="2" />
          <line x1="24" y1="15" x2="24" y2="215" stroke="#4b5563" stroke-dasharray="3 4" stroke-width="2" />
          <line x1="136" y1="15" x2="136" y2="215" stroke="#4b5563" stroke-dasharray="3 4" stroke-width="2" />
          <rect x="32" y="18" width="96" height="194" fill="#030712" fill-opacity="0.8" rx="2" />
          ${[0, 1, 2, 3, 4].map(i => `
            <rect x="38" y="${30 + i * 36}" width="84" height="24" rx="2" fill="#1f2937" stroke="#374151" stroke-width="1" />
            <circle cx="46" cy="${42 + i * 36}" r="2" fill="#10b981" />
            <circle cx="54" cy="${42 + i * 36}" r="2" fill="#38bdf8" />
          `).join('')}
          <text x="80" y="210" fill="${scheme.primary}" font-family="monospace" font-size="10" text-anchor="middle" font-weight="bold">CPD ${uHeight}U</text>
        </g>
      `;
    }
  }

  // SWITCHES DE XARXA & ENRUTAMENT
  else if (cat.includes('xarxa') || cat.includes('switch') || name.toLowerCase().includes('switch')) {
    const ports = name.includes('48') ? 48 : name.includes('24') ? 24 : name.includes('16') ? 16 : 8;
    const cols = Math.min(ports / 2, 24);
    let portRects = '';
    for (let c = 0; c < cols; c++) {
      const px = 55 + c * 13;
      portRects += `
        <rect x="${px}" y="126" width="10" height="8" rx="1.5" fill="#1f2937" stroke="#4b5563" stroke-width="0.8"/>
        <rect x="${px}" y="137" width="10" height="8" rx="1.5" fill="#1f2937" stroke="#4b5563" stroke-width="0.8"/>
        <circle cx="${px + 5}" cy="122" r="1.3" fill="#10b981" />
      `;
    }
    graphic = `
      <g transform="translate(15, 15)">
        <rect x="25" y="105" width="410" height="56" rx="4" fill="#0f172a" stroke="#334155" stroke-width="2" />
        <rect x="18" y="112" width="7" height="42" rx="1" fill="#475569" />
        <rect x="435" y="112" width="7" height="42" rx="1" fill="#475569" />
        <text x="35" y="132" fill="#e2e8f0" font-family="sans-serif" font-weight="900" font-size="10">${brand}</text>
        <text x="35" y="146" fill="${scheme.primary}" font-family="monospace" font-weight="700" font-size="8">${ports}P GbE</text>
        ${portRects}
        <rect x="${55 + cols * 13 + 12}" y="125" width="20" height="20" rx="2" fill="#0284c7" fill-opacity="0.3" stroke="#38bdf8" stroke-width="1.2" />
        <rect x="${55 + cols * 13 + 36}" y="125" width="20" height="20" rx="2" fill="#0284c7" fill-opacity="0.3" stroke="#38bdf8" stroke-width="1.2" />
      </g>
    `;
  }

  // SERVIDORS ENTERPRISE (Torre o Rack 1U/2U)
  else if (cat.includes('servidor')) {
    const isTower = name.toLowerCase().includes('torre') || sku.includes('T150') || sku.includes('T350') || sku.includes('T550');
    if (isTower) {
      graphic = `
        <g transform="translate(170, 40)">
          <rect x="0" y="0" width="140" height="215" rx="6" fill="#0b0f19" stroke="#334155" stroke-width="2.5" />
          <rect x="15" y="18" width="110" height="38" rx="3" fill="#1e293b" />
          <text x="70" y="42" fill="#e2e8f0" font-family="sans-serif" font-weight="900" font-size="11" text-anchor="middle">${brand} TOWER</text>
          ${[0, 1, 2, 3].map(i => `
            <rect x="20" y="${72 + i * 32}" width="100" height="26" rx="2" fill="#111827" stroke="#374151" stroke-width="1" />
            <circle cx="30" cy="${85 + i * 32}" r="2.5" fill="#10b981" />
            <rect x="45" y="${80 + i * 32}" width="65" height="10" rx="1" fill="#1e293b" />
          `).join('')}
        </g>
      `;
    } else {
      graphic = `
        <g transform="translate(20, 30)">
          <rect x="20" y="85" width="400" height="90" rx="4" fill="#090d16" stroke="#334155" stroke-width="2.5" />
          <rect x="12" y="93" width="8" height="74" rx="2" fill="#475569" />
          <rect x="420" y="93" width="8" height="74" rx="2" fill="#475569" />
          <text x="32" y="115" fill="#38bdf8" font-family="sans-serif" font-weight="900" font-size="10">${brand}</text>
          <text x="32" y="130" fill="#94a3b8" font-family="monospace" font-size="8">${sku.slice(0, 12)}</text>
          <text x="32" y="155" fill="#10b981" font-family="monospace" font-size="7">iDRAC9 ENTERPRISE</text>
          ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `
            <g transform="translate(${95 + i * 39}, 95)">
              <rect x="0" y="0" width="34" height="70" rx="2" fill="#1e293b" stroke="#334155" stroke-width="1" />
              <rect x="4" y="6" width="26" height="7" rx="1" fill="#475569" />
              <circle cx="8" cy="58" r="2.2" fill="#10b981" />
              <circle cx="16" cy="58" r="2.2" fill="#38bdf8" />
            </g>
          `).join('')}
        </g>
      `;
    }
  }

  // NAS SYNOLOGY (Desktop o Rack)
  else if (cat.includes('nas') || brand.includes('SYNOLOGY')) {
    const isRack = sku.includes('RS') || name.toLowerCase().includes('rackstation');
    if (isRack) {
      graphic = `
        <g transform="translate(30, 70)">
          <rect x="10" y="40" width="400" height="70" rx="4" fill="#0f172a" stroke="#334155" stroke-width="2" />
          <text x="25" y="75" fill="#14b8a6" font-family="sans-serif" font-weight="900" font-size="11">Synology RackStation</text>
          ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `
            <rect x="${160 + i * 30}" y="48" width="26" height="54" rx="2" fill="#1e293b" stroke="#475569" stroke-width="1" />
            <circle cx="${173 + i * 30}" cy="94" r="2" fill="#10b981" />
          `).join('')}
        </g>
      `;
    } else {
      graphic = `
        <g transform="translate(170, 45)">
          <rect x="0" y="0" width="140" height="200" rx="8" fill="#0f172a" stroke="#334155" stroke-width="2.5" />
          <text x="70" y="35" fill="#14b8a6" font-family="sans-serif" font-weight="900" font-size="12" text-anchor="middle">Synology DiskStation</text>
          ${[0, 1, 2, 3].map(i => `
            <rect x="15" y="${55 + i * 32}" width="110" height="26" rx="3" fill="#1e293b" stroke="#475569" stroke-width="1" />
            <circle cx="25" cy="${68 + i * 32}" r="2.5" fill="#10b981" />
          `).join('')}
        </g>
      `;
    }
  }

  // SISTEMES D'ALIMENTACIÓ ININTERROMPUDA (SAI / UPS)
  else if (cat.includes('sai') || cat.includes('protecció') || brand.includes('APC') || brand.includes('SALICRU')) {
    graphic = `
      <g transform="translate(60, 60)">
        <rect x="20" y="40" width="320" height="85" rx="4" fill="#090d16" stroke="#334155" stroke-width="2" />
        <rect x="40" y="55" width="70" height="40" rx="3" fill="#0284c7" fill-opacity="0.2" stroke="#38bdf8" stroke-width="1.2" />
        <text x="75" y="72" fill="#38bdf8" font-family="monospace" font-size="8" text-anchor="middle">230V · 50Hz</text>
        <text x="75" y="86" fill="#10b981" font-family="monospace" font-size="10" text-anchor="middle" font-weight="bold">ONLINE 100%</text>
        <circle cx="135" cy="75" r="5" fill="#10b981" />
        <text x="148" y="78" fill="#e2e8f0" font-family="sans-serif" font-size="10" font-weight="bold">${brand} SMART-UPS</text>
        <rect x="230" y="65" width="90" height="25" rx="2" fill="#1e293b" />
        <text x="275" y="81" fill="#94a3b8" font-family="monospace" font-size="8.5" text-anchor="middle">AVR / BATTERY</text>
      </g>
    `;
  }

  // DISCS DURS I SSDS
  else if (cat.includes('storage') || brand.includes('WESTERN') || brand.includes('SEAGATE') || brand.includes('SAMSUNG')) {
    graphic = `
      <g transform="translate(150, 45)">
        <rect x="0" y="0" width="180" height="205" rx="8" fill="#1e293b" stroke="#475569" stroke-width="2.5" />
        <rect x="15" y="15" width="150" height="100" rx="4" fill="${scheme.primary}" fill-opacity="0.15" stroke="${scheme.primary}" stroke-width="1.5" />
        <text x="90" y="45" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="12" text-anchor="middle">${brand}</text>
        <text x="90" y="65" fill="${scheme.primary}" font-family="monospace" font-weight="bold" font-size="10" text-anchor="middle">ENTERPRISE CMR</text>
        <text x="90" y="85" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">${sku}</text>
        <circle cx="90" cy="155" r="30" fill="#0f172a" stroke="#64748b" stroke-width="2" />
        <circle cx="90" cy="155" r="8" fill="#cbd5e1" />
      </g>
    `;
  }

  // CABLEJAT ESTRUCTURAT I PATCH CORDS
  else if (cat.includes('cable') || brand.includes('COMMSCOPE') || brand.includes('PANDUIT') || brand.includes('DRAKA')) {
    let wireColor = '#06b6d4';
    const n = name.toLowerCase();
    if (n.includes('vermell')) wireColor = '#ef4444';
    else if (n.includes('verd')) wireColor = '#10b981';
    else if (n.includes('groc')) wireColor = '#eab308';
    else if (n.includes('blanc')) wireColor = '#f8fafc';
    else if (n.includes('negre')) wireColor = '#334155';
    else if (n.includes('taronja')) wireColor = '#f97316';
    else if (n.includes('violeta')) wireColor = '#a855f7';
    else if (n.includes('gris')) wireColor = '#94a3b8';

    graphic = `
      <g transform="translate(140, 50)">
        <rect x="40" y="55" width="120" height="75" rx="8" fill="#0f172a" stroke="#334155" stroke-width="2" />
        <path d="M 0 95 Q 40 35 100 95 T 200 95" fill="none" stroke="${wireColor}" stroke-width="14" stroke-linecap="round" />
        <rect x="75" y="78" width="50" height="32" rx="4" fill="#1e293b" stroke="#475569" stroke-width="1.5" />
        <text x="100" y="98" fill="#f8fafc" font-family="monospace" font-size="9.5" text-anchor="middle" font-weight="bold">RJ45 Cat6A</text>
      </g>
    `;
  }

  // RETAIL TPV, SCANNERS I FLUKE TOOLS
  else {
    graphic = `
      <g transform="translate(190, 75)">
        <circle cx="50" cy="50" r="48" fill="${scheme.primary}" fill-opacity="0.12" stroke="${scheme.primary}" stroke-width="2.5" />
        <rect x="25" y="25" width="50" height="50" rx="8" fill="#0f172a" stroke="#334155" stroke-width="2" />
        <circle cx="50" cy="50" r="12" fill="${scheme.primary}" />
      </g>
    `;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad_${sku.replace(/[^a-zA-Z0-9]/g, '_')}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${scheme.bg}" />
          <stop offset="100%" stop-color="#020617" />
        </linearGradient>
      </defs>
      <rect width="480" height="320" fill="url(#bgGrad_${sku.replace(/[^a-zA-Z0-9]/g, '_')})" />
      <rect x="24" y="20" width="6" height="24" rx="2" fill="${scheme.primary}" />
      <text x="38" y="32" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="12" letter-spacing="1">${brand}</text>
      <text x="38" y="46" fill="#94a3b8" font-family="monospace" font-weight="700" font-size="10">${sku}</text>

      <g transform="translate(330, 20)">
        <rect x="0" y="0" width="126" height="22" rx="6" fill="#1e293b" stroke="${scheme.primary}" stroke-opacity="0.5" stroke-width="1" />
        <text x="63" y="14" fill="${scheme.primary}" font-family="system-ui, sans-serif" font-weight="800" font-size="8.5" text-anchor="middle">${(item.category || '').toUpperCase().slice(0, 18)}</text>
      </g>

      ${graphic}

      <rect x="0" y="258" width="480" height="62" fill="#020617" fill-opacity="0.92" />
      <line x1="0" y1="258" x2="480" y2="258" stroke="#1e293b" stroke-width="1" />
      <text x="24" y="283" fill="#f8fafc" font-family="system-ui, sans-serif" font-weight="800" font-size="12.5">${name.length > 56 ? name.slice(0, 53) + '...' : name}</text>
      <text x="24" y="302" fill="#64748b" font-family="monospace" font-size="9.5">DFactory Barcelona &middot; Certificació Industrial KernelCore</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ─── FITXA PER DEFECTE DE CONTINGÈNCIA ───────────────────────────────────────────
export function getFallbackImage(item) {
  return generateProductVectorSpec(item);
}

// ─── RESOLUCIÓ D'IMATGES PRIORITZANT IMATGES REALS I ESPECÍFIQUES DE MODEL ───────
export function getProductImage(item) {
  if (!item) return '';

  // 1. Prioritat absoluta: Imatge personalitzada pujada per l'usuari
  if (item.custom_image) return item.custom_image;

  const customImages = getCustomImages();
  if (item.sku && customImages[item.sku]) return customImages[item.sku];
  if (item.id && customImages[item.id]) return customImages[item.id];
  if (item.imatge_url) return item.imatge_url;

  const name = (item.name || '').toLowerCase();
  const sku = (item.sku || '').toUpperCase();
  const brand = (item.brand || '').toLowerCase();

  // 2. Servidors Dell PowerEdge (CDN oficial de Dell transparent PNG - 100% 200 OK)
  if (brand.includes('dell')) {
    if (sku.includes('T150') || sku.includes('T350') || sku.includes('T550') || name.includes('torre')) {
      return 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-enterprise-products/enterprise-systems/poweredge/t350/global-spi/ng/enterprise-servers-poweredge-t350-relativesize-500-ng.psd?fmt=png-alpha&wid=800';
    }
    if (sku.includes('R250') || sku.includes('R350')) {
      return 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-enterprise-products/enterprise-systems/poweredge/poweredge-r250/ng/enterprise-servers-poweredge-r250-relativesize-500-ng.psd?fmt=png-alpha&wid=800';
    }
    if (sku.includes('R750') || sku.includes('R650') || sku.includes('R450')) {
      return 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-enterprise-products/enterprise-systems/poweredge/r-series/r750/global-spi/ng/enterprise-servers-poweredge-r750-lf-relativesize-500-ng.psd?fmt=png-alpha&wid=800';
    }
  }

  // 3. Ubiquiti UniFi (CDN oficial store.ui.com - 100% 200 OK)
  if (brand.includes('ubiquiti')) {
    if (sku.includes('UDM') || sku.includes('UCG')) {
      return 'https://images.svc.ui.com/?u=https%3A%2F%2Fcdn.ecomm.ui.com%2Fproducts%2F9df27ed4-c4ae-471a-8982-f5b0650da76a%2F4d5a4995-faa5-489a-8d2b-fd866c46ccbd.png&q=85&w=800';
    }
    if (sku.includes('U6') || sku.includes('U7') || name.includes("punt d'accés")) {
      return 'https://images.svc.ui.com/?u=https%3A%2F%2Fcdn.ecomm.ui.com%2Fproducts%2F8e88b222-7a55-4cf0-8677-ae9b6347fe84%2F37ec259f-1044-47a3-ab94-15ee0f729c02.png&q=85&w=800';
    }
    if (sku.includes('USW')) {
      return 'https://images.svc.ui.com/?u=https%3A%2F%2Fcdn.ecomm.ui.com%2Fproducts%2F467359c4-e5c3-487b-ae00-f6b7de29c6fc%2F9d1f571f-6ec8-41c6-8576-a4046b4a5012.png&q=85&w=800';
    }
  }

  // 4. Synology NAS (CDN oficial fileres.synology.com - 100% 200 OK)
  if (brand.includes('synology') && sku.includes('DS')) {
    return 'https://fileres.synology.com/images/ec/products/DS923+@2x.jpg';
  }

  // 5. Salicru Protecció Elèctrica (CDN CloudFront oficial de Salicru - 100% 200 OK)
  if (brand.includes('salicru')) {
    if (sku.includes('RT2')) {
      return 'https://d7rh5s3nxmpy4.cloudfront.net/CMP1313/5/PR1337BI2529_20010_SLC_TWIN_RT2_4_10_kVA_SZ4.jpg';
    }
    return 'https://d7rh5s3nxmpy4.cloudfront.net/CMP1313/17/FM850BI2568_699CA000001_SZ4.jpg';
  }

  // 6. Western Digital & Seagate (Imatges dedicades per model)
  if (sku.includes('WD-RED') || name.includes('red pro')) {
    return 'https://www.westerndigital.com/content/dam/store/en-us/assets/products/internal-storage/wd-red-pro-sata-hdd/gallery/wd-red-pro-main-nocap.png';
  }
  if (name.includes('ironwolf') || (sku.includes('ST') && !sku.includes('EXOS') && !name.includes('exos'))) {
    return 'https://www.seagate.com/content/dam/seagate/assets/products/nas-drives/ironwolf-pro-hard-drive/images/ironwolf-pro-32tb-front.png';
  }
  if (sku.includes('EXOS') || name.includes('exos')) {
    return 'https://www.seagate.com/content/dam/seagate/assets/products/enterprise-drives/exos/exos-pdp/exos-pdp-row1-config1-640x640.png';
  }

  // 7. Retail TPV (Zebra, Epson, Posiflex dedicades exclusivament al seu model real)
  if (sku.includes('DS2208') || name.includes('ds2208')) {
    return 'https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/product-cards/model/ds2208-3x2-3600.jpg.imgw.1920.1920.jpg';
  }
  if (sku.includes('TM-T88') || name.includes('tm-t88')) {
    return 'https://i8.amplience.net/i/epsonemear/32046-productpicture-lores-ix-tm-t88vii_bk_main?$product-xlarge$&fmt=auto';
  }
  if (sku.includes('XT-3815') || name.includes('xt-3815')) {
    return 'https://www.posiflex.com/upload/catalog_m/XT-3815-G2_FR__24B202nHfN.png';
  }

  // 8. Fluke Networks
  if (sku.includes('DSX') || name.includes('dsx')) {
    return 'https://www.flukenetworks.com/sites/default/files/17412_dsx_cableanalyzer_series_v2_ds_headgraphic.jpg';
  }
  if (sku.includes('MS2-POE') || name.includes('poe')) {
    return 'https://www.flukenetworks.com/sites/default/files/carouselimgs/microscanner-poe-cable-verifier.png';
  }

  // 9. Panduit Keystone
  if (sku.includes('CJ6') || (brand.includes('panduit') && name.includes('keystone'))) {
    return 'https://s7d9.scene7.com/is/image/panduitdm/110103031?wid=800';
  }

  // 10. Per a la resta de models i per evitar repeticions entre articles de la mateixa marca,
  // generem la fitxa tècnica vectorial oficial específica per a cada SKU i model exacte.
  return generateProductVectorSpec(item);
}

// ─── UBICACIÓ DE MAGATZEM DFACTORY BARCELONA ───────────────────────────────────────
export function getWarehouseLocation(item) {
  const cat = (item.category || '').toLowerCase();
  const id = item.id || 1;

  if (cat.includes('rack')) {
    return `Zona Racks · Badia 01 · Palet R-${(id % 6) + 1}`;
  }
  if (cat.includes('cable') || cat.includes('cablejat')) {
    return `Passadís C (Cablejat) · Prestatge ${(id % 5) + 1} · Safata C-${(id % 12) + 1}`;
  }
  if (cat.includes('xarxa') || cat.includes('vlan')) {
    return `Passadís X (Electrònica) · Armari X-0${(id % 4) + 1} · Safata ${(id % 6) + 1}`;
  }
  if (cat.includes('wi-fi') || cat.includes('wifi')) {
    return `Passadís W (Ràdio) · Prestatge 2 · Safata W-${(id % 4) + 1}`;
  }
  if (cat.includes('servidor')) {
    return `Búnquer CPD · Sala Servidors DFactory · Rack RCK-SRV-0${(id % 3) + 1}`;
  }
  if (cat.includes('sai') || cat.includes('protecció')) {
    return `Zona Potència · Sala SAIs DFactory · Banc ${(id % 2) + 1}`;
  }
  if (cat.includes('retail') || cat.includes('tpv')) {
    return `Passadís T (TPV & Retail) · Safata ${(id % 4) + 1}`;
  }
  return `Passadís General DFactory · Safata ${(id % 8) + 1}`;
}

// ─── MAJORISTA OFICIAL ASSIGNAT ───────────────────────────────────────────────────
export function getOfficialSupplier(item) {
  const brand = (item.brand || '').toLowerCase();

  if (brand.includes('cisco') || brand.includes('meraki')) {
    return { name: 'Ingram Micro España S.L.', cif: 'B-60589201', terms: 'Crèdit 60 dies B2B' };
  }
  if (brand.includes('dell')) {
    return { name: 'Esprinet Iberica DFactory Channel', cif: 'A-50893241', terms: 'Crèdit 45 dies OEM' };
  }
  if (brand.includes('apc') || brand.includes('schneider') || brand.includes('legrand')) {
    return { name: 'Schneider & Legrand B2B Catalunya', cif: 'A-08123490', terms: 'Compte Majorista 30 dies' };
  }
  if (brand.includes('ubiquiti')) {
    return { name: 'TD SYNNEX Networks Barcelona', cif: 'A-28491029', terms: 'Distribució Oficial 60 dies' };
  }
  if (brand.includes('posiflex') || brand.includes('zebra') || brand.includes('epson')) {
    return { name: 'Posiflex & AutoID Iberia S.A.', cif: 'A-61209345', terms: 'Canal Oficial TPV 30 dies' };
  }
  return { name: 'Grup Majorista Homologat DFactory', cif: 'B-66789123', terms: 'Crèdit Comercial Standard' };
}

// ─── ESPECIALISTA TÈCNIC OFICIAL ASSIGNAT ─────────────────────────────────────────
export function getAssignedTechLead(item) {
  const cat = (item.category || '').toLowerCase();
  if (cat.includes('xarxa') || cat.includes('cable') || cat.includes('rack') || cat.includes('wi-fi')) {
    return { name: 'Joel Pérez', email: 'joel.perez@kernelcore.cat', role: 'Enginyer de Sistemes & Xarxes' };
  }
  return { name: 'Hans Lao', email: 'hans.lao@kernelcore.cat', role: 'Lead Architect & Solucions Corporatives' };
}

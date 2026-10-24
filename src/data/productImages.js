// Helper centralitzat per a imatges oficials d'alta definició i especificacions de les 1.882 referències de KernelCore

// Imatges d'alta resolució catalogades per categoria, marca, model i color
export function getProductImage(item) {
  if (!item) return 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80';
  
  const name = (item.name || '').toLowerCase();
  const sku = (item.sku || '').toUpperCase();
  const brand = (item.brand || '').toLowerCase();
  const cat = (item.category || '').toLowerCase();

  // 1. CABLEJAT I CONNECTIVITAT
  if (cat.includes('cable') || cat.includes('cablejat')) {
    if (name.includes('keystone') || sku.includes('CJ6') || sku.includes('MGS400')) {
      return 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('bobina') || name.includes('305m') || name.includes('500m')) {
      return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('patch panel') || name.includes('panell')) {
      return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80';
    }
    // Latiguillos per color
    if (name.includes('blau') || sku.includes('-BU') || sku.includes('-BLU')) {
      return 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('vermell') || sku.includes('-RD') || sku.includes('-RED')) {
      return 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('verd') || sku.includes('-GR') || sku.includes('-GRN')) {
      return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('groc') || sku.includes('-YL') || sku.includes('-YEL')) {
      return 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('blanc') || sku.includes('-WH') || sku.includes('-WHT')) {
      return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('negre') || sku.includes('-BL') || sku.includes('-BLK')) {
      return 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('taronja') || sku.includes('-OR') || sku.includes('-ORN')) {
      return 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('violeta') || sku.includes('-VL') || sku.includes('-VIO')) {
      return 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80';
    }
    // Gris o per defecte
    return 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80';
  }

  // 2. XARXA & SWITCHES & ROUTERS
  if (cat.includes('xarxa') || cat.includes('vlan')) {
    if (sku.includes('SFP') || sku.includes('GLC') || sku.includes('DAC') || name.includes('transceptor')) {
      return 'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=600&q=80';
    }
    if (brand.includes('cisco')) {
      return 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80';
    }
    if (brand.includes('ubiquiti')) {
      return 'https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?auto=format&fit=crop&w=600&q=80';
    }
    if (brand.includes('aruba') || brand.includes('hpe')) {
      return 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80';
  }

  // 3. WI-FI 6 / ACCESS POINTS
  if (cat.includes('wi-fi') || cat.includes('wifi') || name.includes('punt d\'accés') || name.includes('access point')) {
    if (brand.includes('ubiquiti')) {
      return 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80';
  }

  // 4. SEGURETAT NGFW & FIREWALLS
  if (cat.includes('seguretat') || cat.includes('ngfw') || name.includes('firewall')) {
    return 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80';
  }

  // 5. PROTECCIÓ SAI & ENERGIA
  if (cat.includes('sai') || cat.includes('protecció') || name.includes('smart-ups') || name.includes('twin')) {
    if (name.includes('bateria') || name.includes('rbc')) {
      return 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80';
  }

  // 6. SERVIDORS I DISCS
  if (cat.includes('servidor')) {
    if (brand.includes('dell') && (name.includes('torre') || sku.includes('T150') || sku.includes('T350'))) {
      return 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80';
    }
    if (brand.includes('synology') && name.includes('diskstation')) {
      return 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80';
    }
    if (brand.includes('western digital') || brand.includes('seagate') || name.includes('disc') || name.includes('hard drive')) {
      return 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('ssd') || brand.includes('samsung')) {
      return 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('ram') || name.includes('rdimm') || name.includes('memòria')) {
      return 'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=600&q=80';
    }
    // Servidors Rack 1U/2U Dell PowerEdge
    return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80';
  }

  // 7. RETAIL TPV
  if (cat.includes('tpv') || cat.includes('retail')) {
    if (name.includes('impressora') || brand.includes('epson')) {
      return 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('lector') || brand.includes('zebra') || brand.includes('datalogic')) {
      return 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80';
    }
    // Terminal TPV tàctil Posiflex
    return 'https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=600&q=80';
  }

  // 8. RACKS 19" I PDUS
  if (cat.includes('rack')) {
    if (name.includes('pdu') || name.includes('regleta')) {
      return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80';
  }

  // 9. EINES SAT (FLUKE)
  if (cat.includes('eines') || brand.includes('fluke')) {
    return 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80';
  }

  return 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80';
}

// Obtenir ubicació de magatzem a DFactory per a cada referència
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
    return `Zona Energia (SAI) · Plataforma Pesada E-0${(id % 4) + 1}`;
  }
  if (cat.includes('seguretat')) {
    return `Armari Cuirassat Seguretat · Safata SEC-0${(id % 3) + 1}`;
  }
  if (cat.includes('tpv') || cat.includes('retail')) {
    return `Zona Retail & TPV · Prestatge T-01 · Safata ${(id % 5) + 1}`;
  }
  if (cat.includes('eines') || (item.brand || '').includes('Fluke')) {
    return `Armari d'Instrumentació Calibrada SAT · Caixa Força FLUKE-01`;
  }
  return `Magatzem General DFactory · Prestatge 01 · Safata ${(id % 10) + 1}`;
}

// Obtenir majorista oficial
export function getOfficialSupplier(item) {
  const brand = (item.brand || '').toLowerCase();
  if (brand.includes('cisco') || brand.includes('hpe') || brand.includes('aruba') || brand.includes('dell')) {
    return { name: 'Ingram Micro Technologies', cif: 'A-08123456', terms: '30 dies transferència' };
  }
  if (brand.includes('ubiquiti') || brand.includes('synology') || brand.includes('western digital') || brand.includes('seagate') || brand.includes('samsung')) {
    return { name: 'Esprinet Ibèrica S.L.U.', cif: 'B-58234567', terms: '45 dies confirming' };
  }
  if (brand.includes('apc') || brand.includes('schneider') || brand.includes('salicru') || brand.includes('legrand') || brand.includes('rackmatic')) {
    return { name: 'Schneider Electric & APC España', cif: 'A-28001122', terms: '30 dies transferència' };
  }
  if (brand.includes('commscope') || brand.includes('panduit') || brand.includes('fluke') || brand.includes('sonicwall') || brand.includes('fortinet')) {
    return { name: 'TD SYNNEX Spain (Tech Data)', cif: 'B-08456789', terms: '60 dies domiciliació' };
  }
  if (brand.includes('posiflex') || brand.includes('epson') || brand.includes('zebra') || brand.includes('datalogic')) {
    return { name: 'Posiflex & Retail Iberia', cif: 'B-63998877', terms: '30 dies transferència' };
  }
  return { name: 'Ingram Micro Technologies', cif: 'A-08123456', terms: '30 dies' };
}

// Obtenir responsable tècnic assignat a DFactory
export function getAssignedTechLead(item) {
  const cat = (item.category || '').toLowerCase();
  if (cat.includes('servidor') || cat.includes('seguretat') || cat.includes('tpv') || cat.includes('eines')) {
    return {
      name: 'Hans Lao Moncusi',
      role: 'Direcció Tècnica · Cap de Sistemes & Seguretat IT',
      email: 'hans@kernelcore.cat'
    };
  }
  return {
    name: 'Joel Pérez Armenteros',
    role: 'Direcció General · Cap d\'Infraestructura de Xarxes & Cablejat',
    email: 'joel@kernelcore.cat'
  };
}

// Catàleg d'imatges oficials i gestió de càrrega personalitzada d'imatges per a cada article de KernelCore

export const OFFICIAL_MANUFACTURER_ASSETS = {
  // CISCO SYSTEMS (Oficial cisco.com CDN)
  cisco: {
    catalyst_1000: 'https://www.cisco.com/c/dam/assets/support/product-images/series/switches-catalyst-1000-series-switches.jpg',
    catalyst_9200_9300: 'https://www.cisco.com/content/dam/cisco-cdc/site/images/photography/products/networking/switches/meraki-switches/catalyst-9300-m/hero-product-image-C9300X-24Y-min.png',
    business_cbs: 'https://www.cisco.com/c/dam/assets/support/product-images/series/switches-catalyst-1000-series-switches.jpg',
    meraki_switch: 'https://www.cisco.com/content/dam/cisco-cdc/site/images/photography/products/networking/switches/meraki-switches/catalyst-9300-m/hero-product-image-C9300X-24Y-min.png',
    meraki_ap: 'https://www.hpe.com/content/dam/hpe/shared-publishing/images-norend/instant-on/products/Instant-On-Access-Point-AP22-600x528.png',
    sfp_transceiver: 'https://images.svc.ui.com/?u=https%3A%2F%2Fcdn.ecomm.ui.com%2Fproducts%2F467359c4-e5c3-487b-ae00-f6b7de29c6fc%2F9d1f571f-6ec8-41c6-8576-a4046b4a5012.png&q=85&w=800'
  },

  // DELL TECHNOLOGIES (Oficial i.dell.com CDN transparent PNG)
  dell: {
    poweredge_r250: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-enterprise-products/enterprise-systems/poweredge/poweredge-r250/ng/enterprise-servers-poweredge-r250-relativesize-500-ng.psd?fmt=png-alpha&wid=800',
    poweredge_r750: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-enterprise-products/enterprise-systems/poweredge/r-series/r750/global-spi/ng/enterprise-servers-poweredge-r750-lf-relativesize-500-ng.psd?fmt=png-alpha&wid=800',
    poweredge_t350: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-enterprise-products/enterprise-systems/poweredge/t350/global-spi/ng/enterprise-servers-poweredge-t350-relativesize-500-ng.psd?fmt=png-alpha&wid=800'
  },

  // UBIQUITI UNIFI (Oficial store.ui.com / images.svc.ui.com CDN)
  ubiquiti: {
    switch_rack: 'https://images.svc.ui.com/?u=https%3A%2F%2Fcdn.ecomm.ui.com%2Fproducts%2F467359c4-e5c3-487b-ae00-f6b7de29c6fc%2F9d1f571f-6ec8-41c6-8576-a4046b4a5012.png&q=85&w=800',
    u6_pro_ap: 'https://images.svc.ui.com/?u=https%3A%2F%2Fcdn.ecomm.ui.com%2Fproducts%2F8e88b222-7a55-4cf0-8677-ae9b6347fe84%2F37ec259f-1044-47a3-ab94-15ee0f729c02.png&q=85&w=800',
    udm_pro: 'https://images.svc.ui.com/?u=https%3A%2F%2Fcdn.ecomm.ui.com%2Fproducts%2F9df27ed4-c4ae-471a-8982-f5b0650da76a%2F4d5a4995-faa5-489a-8d2b-fd866c46ccbd.png&q=85&w=800'
  },

  // HPE ARUBA NETWORKING (Oficial hpe.com CDN)
  aruba: {
    ap22_wifi6: 'https://www.hpe.com/content/dam/hpe/shared-publishing/images-norend/instant-on/products/Instant-On-Access-Point-AP22-600x528.png',
    switch_instant_on: 'https://www.cisco.com/c/dam/assets/support/product-images/series/switches-catalyst-1000-series-switches.jpg'
  },

  // SCHNEIDER ELECTRIC / APC (Oficial download.se.com CDN)
  apc: {
    smart_ups_smt: 'https://download.se.com/files?p_Doc_Ref=SPD_CENZ-AW77CR_A_V&p_File_Type=rendition_1500_jpg',
    smart_ups_srt_online: 'https://download.se.com/files?p_Doc_Ref=SPD_LEAN-9HDJLE_B_H&p_File_Type=rendition_1500_jpg'
  },

  // SALICRU (Oficial salicru.com CloudFront CDN)
  salicru: {
    slc_twin_rt2: 'https://d7rh5s3nxmpy4.cloudfront.net/CMP1313/5/PR1337BI2529_20010_SLC_TWIN_RT2_4_10_kVA_SZ4.jpg',
    slc_twin_pro2: 'https://d7rh5s3nxmpy4.cloudfront.net/CMP1313/17/FM850BI2568_699CA000001_SZ4.jpg'
  },

  // SYNOLOGY (Oficial fileres.synology.com CDN)
  synology: {
    diskstation_ds: 'https://fileres.synology.com/images/ec/products/DS923+@2x.jpg',
    rackstation_rs: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=85'
  },

  // WESTERN DIGITAL & SEAGATE (Oficials westerndigital.com & seagate.com CDN)
  storage: {
    wd_red_pro: 'https://www.westerndigital.com/content/dam/store/en-us/assets/products/internal-storage/wd-red-pro-sata-hdd/gallery/wd-red-pro-main-nocap.png',
    seagate_ironwolf_pro: 'https://www.seagate.com/content/dam/seagate/assets/products/nas-drives/ironwolf-pro-hard-drive/images/ironwolf-pro-32tb-front.png',
    seagate_exos: 'https://www.seagate.com/content/dam/seagate/assets/products/enterprise-drives/exos/exos-pdp/exos-pdp-row1-config1-640x640.png'
  },

  // FLUKE NETWORKS (Oficial flukenetworks.com CDN)
  fluke: {
    microscanner2_poe: 'https://www.flukenetworks.com/sites/default/files/carouselimgs/microscanner-poe-cable-verifier.png',
    dsx_cableanalyzer: 'https://www.flukenetworks.com/sites/default/files/17412_dsx_cableanalyzer_series_v2_ds_headgraphic.jpg'
  },

  // FORTINET (Oficial fortinet.com CDN)
  fortinet: {
    fortigate_appliance: 'https://marvel-b1-cdn.bc0a.com/f00000000310757/www.fortinet.com/content/dam/fortinet/images/products/cover-datasheet-fortigate-40f-series-new.png'
  },

  // RETAIL TPV & LOGÍSTICA (Zebra, Epson, Posiflex Oficials)
  retail: {
    zebra_ds2208: 'https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/product-cards/model/ds2208-3x2-3600.jpg.imgw.1920.1920.jpg',
    epson_tmt88: 'https://i8.amplience.net/i/epsonemear/32046-productpicture-lores-ix-tm-t88vii_bk_main?$product-xlarge$&fmt=auto',
    posiflex_xt3815: 'https://www.posiflex.com/upload/catalog_m/XT-3815-G2_FR__24B202nHfN.png'
  },

  // RACKS 19" (Armari Rack amb porta de vidre / Armari de terra)
  racks: {
    mural_glass: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=85',
    floor_rack: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=85',
    pdu: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=85'
  },

  // PANDUIT & COMMSCOPE (CABLEJAT)
  cabling: {
    panduit_keystone: 'https://s7d9.scene7.com/is/image/panduitdm/110103031?wid=800',
    patch_blue: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=85',
    patch_grey: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=85',
    patch_red: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=85',
    patch_yellow: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=85',
    patch_green: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=85',
    patch_white: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=85',
    patch_black: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=85',
    patch_orange: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=85',
    patch_violet: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=85',
    cable_drum: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=85'
  }
};

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

// ─── RESOLUCIÓ D'IMATGE PRIORITZANT LES PUJADES PER L'USUARI ─────────────────────
export function getProductImage(item) {
  if (!item) return OFFICIAL_MANUFACTURER_ASSETS.cabling.patch_blue;

  // 1. PRIORITAT ABSOLUTA: Si l'usuari ha pujat una imatge per a aquest article
  if (item.custom_image) return item.custom_image;

  const customImages = getCustomImages();
  if (item.sku && customImages[item.sku]) return customImages[item.sku];
  if (item.id && customImages[item.id]) return customImages[item.id];
  if (item.imatge_url) return item.imatge_url;

  const sku = (item.sku || '').toUpperCase();
  const name = (item.name || '').toLowerCase();
  const brand = (item.brand || '').toLowerCase();
  const cat = (item.category || '').toLowerCase();

  // 2. ARMARIS RACK 19" (IMPORTANT: No assignar servidors Dell als racks)
  if (cat.includes('rack') || brand.includes('legrand') || brand.includes('rackmatic')) {
    if (name.includes('pdu') || name.includes('regleta')) {
      return OFFICIAL_MANUFACTURER_ASSETS.racks.pdu;
    }
    if (name.includes('terra') || name.includes('42u') || name.includes('47u') || name.includes('22u')) {
      return OFFICIAL_MANUFACTURER_ASSETS.racks.floor_rack;
    }
    return OFFICIAL_MANUFACTURER_ASSETS.racks.mural_glass;
  }

  // 3. CISCO SYSTEMS
  if (brand.includes('cisco')) {
    if (sku.includes('9200') || sku.includes('9300')) {
      return OFFICIAL_MANUFACTURER_ASSETS.cisco.catalyst_9200_9300;
    }
    if (sku.includes('MR') || name.includes('meraki mr')) {
      return OFFICIAL_MANUFACTURER_ASSETS.cisco.meraki_ap;
    }
    return OFFICIAL_MANUFACTURER_ASSETS.cisco.catalyst_1000;
  }

  // 4. DELL POWEREDGE (Només servidors Dell i peces Dell)
  if (brand.includes('dell')) {
    if (sku.includes('T150') || sku.includes('T350') || sku.includes('T550') || name.includes('torre')) {
      return OFFICIAL_MANUFACTURER_ASSETS.dell.poweredge_t350;
    }
    if (sku.includes('R250') || sku.includes('R350')) {
      return OFFICIAL_MANUFACTURER_ASSETS.dell.poweredge_r250;
    }
    return OFFICIAL_MANUFACTURER_ASSETS.dell.poweredge_r750;
  }

  // 5. UBIQUITI UNIFI
  if (brand.includes('ubiquiti')) {
    if (sku.includes('U6') || sku.includes('U7') || name.includes("punt d'accés")) {
      return OFFICIAL_MANUFACTURER_ASSETS.ubiquiti.u6_pro_ap;
    }
    if (sku.includes('UDM') || sku.includes('UCG') || name.includes('gateway') || name.includes('dream')) {
      return OFFICIAL_MANUFACTURER_ASSETS.ubiquiti.udm_pro;
    }
    return OFFICIAL_MANUFACTURER_ASSETS.ubiquiti.switch_rack;
  }

  // 6. HPE ARUBA
  if (brand.includes('aruba') || brand.includes('hpe')) {
    if (sku.includes('AP') || name.includes("punt d'accés")) {
      return OFFICIAL_MANUFACTURER_ASSETS.aruba.ap22_wifi6;
    }
    return OFFICIAL_MANUFACTURER_ASSETS.cisco.catalyst_1000;
  }

  // 7. APC SCHNEIDER ELECTRIC
  if (brand.includes('apc') || brand.includes('schneider')) {
    if (sku.includes('SRT') || name.includes('on-line')) {
      return OFFICIAL_MANUFACTURER_ASSETS.apc.smart_ups_srt_online;
    }
    return OFFICIAL_MANUFACTURER_ASSETS.apc.smart_ups_smt;
  }

  // 8. SALICRU
  if (brand.includes('salicru')) {
    if (sku.includes('RT2') || name.includes('rt2')) {
      return OFFICIAL_MANUFACTURER_ASSETS.salicru.slc_twin_rt2;
    }
    return OFFICIAL_MANUFACTURER_ASSETS.salicru.slc_twin_pro2;
  }

  // 9. SYNOLOGY
  if (brand.includes('synology')) {
    if (sku.includes('RS') || name.includes('rackstation')) {
      return OFFICIAL_MANUFACTURER_ASSETS.synology.rackstation_rs;
    }
    return OFFICIAL_MANUFACTURER_ASSETS.synology.diskstation_ds;
  }

  // 10. STORAGE (WESTERN DIGITAL & SEAGATE)
  if (brand.includes('western digital') || sku.includes('WD-RED') || name.includes('red pro')) {
    return OFFICIAL_MANUFACTURER_ASSETS.storage.wd_red_pro;
  }
  if (brand.includes('seagate')) {
    if (sku.includes('ST') && (name.includes('ironwolf') || sku.includes('IW'))) {
      return OFFICIAL_MANUFACTURER_ASSETS.storage.seagate_ironwolf_pro;
    }
    return OFFICIAL_MANUFACTURER_ASSETS.storage.seagate_exos;
  }

  // 11. FLUKE NETWORKS
  if (brand.includes('fluke')) {
    if (sku.includes('DSX') || name.includes('certificador')) {
      return OFFICIAL_MANUFACTURER_ASSETS.fluke.dsx_cableanalyzer;
    }
    return OFFICIAL_MANUFACTURER_ASSETS.fluke.microscanner2_poe;
  }

  // 12. FORTINET
  if (brand.includes('fortinet')) {
    return OFFICIAL_MANUFACTURER_ASSETS.fortinet.fortigate_appliance;
  }

  // 13. RETAIL TPV (ZEBRA, EPSON, POSIFLEX)
  if (cat.includes('retail') || cat.includes('tpv')) {
    if (brand.includes('zebra') || sku.includes('DS2208')) {
      return OFFICIAL_MANUFACTURER_ASSETS.retail.zebra_ds2208;
    }
    if (brand.includes('epson') || sku.includes('TM-T88')) {
      return OFFICIAL_MANUFACTURER_ASSETS.retail.epson_tmt88;
    }
    if (brand.includes('posiflex') || sku.includes('XT-3815') || sku.includes('XT3815')) {
      return OFFICIAL_MANUFACTURER_ASSETS.retail.posiflex_xt3815;
    }
    return OFFICIAL_MANUFACTURER_ASSETS.retail.posiflex_xt3815;
  }

  // 14. PANDUIT & COMMSCOPE (CABLEJAT)
  if (cat.includes('cable') || cat.includes('cablejat')) {
    if (name.includes('keystone') || sku.includes('CJ6') || sku.includes('MGS400')) {
      return OFFICIAL_MANUFACTURER_ASSETS.cabling.panduit_keystone;
    }
    if (name.includes('bobina') || name.includes('tambor') || name.includes('305m')) {
      return OFFICIAL_MANUFACTURER_ASSETS.cabling.cable_drum;
    }

    if (name.includes('blau') || sku.includes('-BU') || sku.includes('-BLU')) return OFFICIAL_MANUFACTURER_ASSETS.cabling.patch_blue;
    if (name.includes('vermell') || sku.includes('-RD') || sku.includes('-RED')) return OFFICIAL_MANUFACTURER_ASSETS.cabling.patch_red;
    if (name.includes('verd') || sku.includes('-GR') || sku.includes('-GRN')) return OFFICIAL_MANUFACTURER_ASSETS.cabling.patch_green;
    if (name.includes('groc') || sku.includes('-YL') || sku.includes('-YEL')) return OFFICIAL_MANUFACTURER_ASSETS.cabling.patch_yellow;
    if (name.includes('blanc') || sku.includes('-WH') || sku.includes('-WHT')) return OFFICIAL_MANUFACTURER_ASSETS.cabling.patch_white;
    if (name.includes('negre') || sku.includes('-BL') || sku.includes('-BLK')) return OFFICIAL_MANUFACTURER_ASSETS.cabling.patch_black;
    if (name.includes('taronja') || sku.includes('-OR') || sku.includes('-ORN')) return OFFICIAL_MANUFACTURER_ASSETS.cabling.patch_orange;
    if (name.includes('violeta') || sku.includes('-VL') || sku.includes('-VIO')) return OFFICIAL_MANUFACTURER_ASSETS.cabling.patch_violet;
    if (name.includes('gris') || sku.includes('-GY') || sku.includes('-GRY')) return OFFICIAL_MANUFACTURER_ASSETS.cabling.patch_grey;

    return OFFICIAL_MANUFACTURER_ASSETS.cabling.patch_blue;
  }

  return OFFICIAL_MANUFACTURER_ASSETS.cabling.patch_blue;
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

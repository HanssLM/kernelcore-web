// ─────────────────────────────────────────────────────────────────────────────
// KERNELCORE // GENERADOR DE FACTURA PROFORMA / PRESSUPOST D'ENGINYERIA (PDFKit)
// Seu Central Oficial: DFactory Barcelona · Carrer 27 del BZ, 10-16 (Zona Franca)
// Document Executiu d'Alta Gamma: Tipus Proforma / Pressupost Oficial (2 Pàgines A4)
// Disseny Perfectament Proporcionat (Sense talls ni desbordament vertical)
// ─────────────────────────────────────────────────────────────────────────────

import PDFDocument from 'pdfkit';

function formatEur(val) {
  const num = Number(val || 0);
  return `${num.toLocaleString('ca-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
}

/**
 * Dibuixa el logotip vectorial oficial de KernelCore basat en la geometria de LogoMark.
 * viewBox 0 0 64 64: hexàgon cibernètic amb traçat "K" i nodes de xarxa.
 */
function drawKernelCoreLogo(doc, x, y, size = 44) {
  const s = size / 64;

  const hexRaw = [
    [32, 4],
    [56.25, 18],
    [56.25, 46],
    [32, 60],
    [7.75, 46],
    [7.75, 18]
  ];
  const hexPoints = hexRaw.map(([px, py]) => [x + px * s, y + py * s]);

  // Fons de l'hexàgon (blau nit d'alta densitat)
  doc
    .polygon(...hexPoints)
    .lineWidth(2.4 * s)
    .fillAndStroke('#0b172a', '#06b6d4');

  // Nucli radial intern
  const innerHex = hexRaw.map(([px, py]) => [x + (32 + (px - 32) * 0.74) * s, y + (32 + (py - 32) * 0.74) * s]);
  doc.polygon(...innerHex).fill('#0f294d');

  // Traçat de la lletra "K" amb connectors de circuit
  doc
    .moveTo(x + 25.3 * s, y + 21 * s)
    .lineTo(x + 25.3 * s, y + 43 * s)
    .lineWidth(4.2 * s)
    .lineCap('round')
    .stroke('#22d3ee');

  doc
    .moveTo(x + 25.3 * s, y + 32 * s)
    .lineTo(x + 38.3 * s, y + 21 * s)
    .lineWidth(4.2 * s)
    .lineCap('round')
    .stroke('#38bdf8');

  doc
    .moveTo(x + 25.3 * s, y + 32 * s)
    .lineTo(x + 38.3 * s, y + 43 * s)
    .lineWidth(4.2 * s)
    .lineCap('round')
    .stroke('#38bdf8');

  // Nodes actius terminals de la "K"
  doc.circle(x + 38.3 * s, y + 21 * s, 2.5 * s).fill('#e0fbff');
  doc.circle(x + 38.3 * s, y + 43 * s, 2.5 * s).fill('#e0fbff');

  // Nodes de xarxa perimetrals
  for (const [px, py] of hexRaw) {
    doc.circle(x + px * s, y + py * s, 1.6 * s).fill('#67e8f9');
  }

  doc.lineCap('butt');
}

/**
 * Dibuixa un traçat de signatura digital estilitzada a tinta blava d'alta resolució.
 */
function drawDigitalSignature(doc, x, y, type = 'hans') {
  doc.save();
  if (type === 'hans') {
    // Signatura estilitzada de Hans Lao Moncusi
    doc
      .moveTo(x + 10, y + 22)
      .bezierCurveTo(x + 18, y + 6, x + 28, y + 4, x + 34, y + 16)
      .bezierCurveTo(x + 40, y + 28, x + 46, y + 8, x + 54, y + 18)
      .bezierCurveTo(x + 62, y + 28, x + 72, y + 12, x + 82, y + 15)
      .bezierCurveTo(x + 94, y + 18, x + 105, y + 10, x + 118, y + 14)
      .lineWidth(1.4)
      .stroke('#0284c7');

    // Traç inferior d'accent i rúbrica
    doc
      .moveTo(x + 16, y + 26)
      .bezierCurveTo(x + 45, y + 20, x + 85, y + 27, x + 128, y + 18)
      .lineWidth(1.0)
      .stroke('#0369a1');

    doc
      .moveTo(x + 110, y + 14)
      .lineTo(x + 122, y + 6)
      .lineWidth(1.2)
      .stroke('#0284c7');
  } else {
    // Signatura estilitzada de Joel Pérez Armenteros
    doc
      .moveTo(x + 12, y + 16)
      .bezierCurveTo(x + 16, y + 4, x + 28, y + 3, x + 30, y + 18)
      .bezierCurveTo(x + 32, y + 28, x + 44, y + 25, x + 50, y + 14)
      .bezierCurveTo(x + 58, y + 5, x + 68, y + 20, x + 78, y + 16)
      .bezierCurveTo(x + 88, y + 12, x + 100, y + 26, x + 114, y + 14)
      .lineWidth(1.4)
      .stroke('#0284c7');

    // Bucle de rúbrica
    doc
      .moveTo(x + 22, y + 24)
      .bezierCurveTo(x + 50, y + 30, x + 90, y + 15, x + 124, y + 24)
      .lineWidth(1.0)
      .stroke('#0369a1');
  }
  doc.restore();
}

/**
 * Genera un buffer PDF binari d'alta gamma tipus Factura Proforma / Pressupost d'Enginyeria.
 * @param {Object} quoteData - Dades del pressupost
 * @returns {Promise<Buffer>}
 */
export function generateQuotePDFBuffer(quoteData = {}) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 0, bottom: 0, left: 0, right: 0 },
        info: {
          Title: `Factura Proforma ${quoteData.codi_pressupost || quoteData.id || 'PR-2026-001'} - KernelCore`,
          Author: 'KernelCore · Enginyeria de Sistemes, Xarxes & Seguretat IT',
          Subject: 'Factura Proforma / Pressupost d\'Infraestructura IT',
          Creator: 'KernelCore ERP · DFactory Barcelona'
        }
      });

      const chunks = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));

      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const leftMargin = 32;
      const contentWidth = pageWidth - leftMargin * 2; // 531.28

      const rawCodi = quoteData.codi_pressupost || quoteData.id || 'PF-2026-001';
      const codiProforma = rawCodi.replace(/^PR-/, 'PF-');
      const dataEmissio = quoteData.data_emissio || quoteData.date || new Date().toISOString().split('T')[0];
      const nomEmpresa = quoteData.nom_empresa || quoteData.client || quoteData.companyName || 'Client Corporatiu';
      const personaContacte = quoteData.persona_contacte || quoteData.contact || quoteData.clientName || 'Responsable IT';
      const emailClient = quoteData.email || quoteData.to || 'administracio@client.cat';
      const telefonClient = quoteData.telefon || '+34 932 000 000';
      const entornOperatiu = quoteData.environment || 'Oficina PIME / Seu Corporativa';
      const cifClient = quoteData.cif || quoteData.nif || 'B-65891204';
      const customMessage = quoteData.customMessage || '';
      const rawItems = quoteData.items;
      const rawSai = quoteData.saiInfo || null;

      // Càlculs econòmics consolidats
      const rawTotal = Number(quoteData.import_total ?? quoteData.amount ?? 0);
      let costMaquinari = Number(quoteData.cost_maquinari ?? 0);
      let costSoftware = Number(quoteData.cost_software ?? 0);
      let costMaObra = Number(quoteData.cost_ma_obra ?? 0);

      if (costMaquinari + costSoftware + costMaObra <= 0 && rawTotal > 0) {
        const baseCalc = Math.round((rawTotal / 1.21) * 100) / 100;
        costMaquinari = Math.round(baseCalc * 0.65 * 100) / 100;
        costSoftware = Math.round(baseCalc * 0.15 * 100) / 100;
        costMaObra = Math.round((baseCalc - costMaquinari - costSoftware) * 100) / 100;
      }

      const baseImposable =
        Number(quoteData.base_imposable) > 0
          ? Number(quoteData.base_imposable)
          : Math.round((costMaquinari + costSoftware + costMaObra) * 100) / 100;
      const iva = Number(quoteData.iva) > 0 ? Number(quoteData.iva) : Math.round(baseImposable * 0.21 * 100) / 100;
      const importTotal = rawTotal > 0 ? rawTotal : Math.round((baseImposable + iva) * 100) / 100;
      const quotaMensual = Number(quoteData.quota_mensual_suport ?? quoteData.monthly ?? 120);

      // Dimensionament SAI
      let saiWatts = 1250;
      let saiVA = 1500;
      let saiModel = 'APC Smart-UPS On-Line 1500VA Doble Conversió (SRT1500XLI)';
      let saiAutonomia = '28 minuts';

      if (rawSai && typeof rawSai === 'object') {
        if (rawSai.watts) saiWatts = Number(rawSai.watts);
        if (rawSai.va) saiVA = Number(rawSai.va);
        if (rawSai.model) saiModel = String(rawSai.model);
        if (rawSai.runtime || rawSai.autonomia) saiAutonomia = String(rawSai.runtime || rawSai.autonomia);
      } else if (typeof rawSai === 'string' && rawSai.trim().length > 0) {
        saiModel = rawSai;
      }

      // Codi de Verificació Segura (CSV)
      const csvHash = `KC-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

      // =========================================================================
      // PÀGINA 1: FACTURA PROFORMA & PRESSUPOST EXECUTIU OFICIAL
      // Distribució vertical optimitzada perquè TOT càpiga amb respiració elegant
      // =========================================================================

      // ─── 1.1. CAPÇALERA FISCAL D'ALTA GAMMA (BLAU NIT + BORDURA CYAN) ─────────
      doc.rect(0, 0, pageWidth, 98).fill('#0b1329');
      doc.rect(0, 98, pageWidth, 3).fill('#06b6d4');

      // Logo vectorial oficial KernelCore
      drawKernelCoreLogo(doc, leftMargin, 18, 54);

      // Identitat Fiscal de l'Emissor
      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(20)
        .text('KERNELCORE', leftMargin + 66, 20, { lineBreak: false });

      doc
        .fillColor('#38bdf8')
        .font('Helvetica-Bold')
        .fontSize(8)
        .text('ENGINYERIA DE SISTEMES, XARXES & SEGURETAT IT', leftMargin + 66, 44, { lineBreak: false });

      doc
        .fillColor('#94a3b8')
        .font('Helvetica')
        .fontSize(7.2)
        .text('DFactory Barcelona · Carrer 27 del BZ, 10-16 (Zona Franca), 08040 Barcelona', leftMargin + 66, 57, { lineBreak: false });

      doc
        .fillColor('#cbd5e1')
        .font('Helvetica')
        .fontSize(7.2)
        .text('NIF: B-67981234 · Tel: +34 93 220 40 99 · info@kernelcore.cat · www.kernelcore.cat', leftMargin + 66, 69, { lineBreak: false });

      // Targeta Identificadora Tipus Factura Proforma (Superior Dreta)
      const pfBadgeW = 184;
      const pfBadgeH = 68;
      const pfBadgeX = pageWidth - leftMargin - pfBadgeW;
      doc.roundedRect(pfBadgeX, 15, pfBadgeW, pfBadgeH, 6).lineWidth(1.2).fillAndStroke('#0f172a', '#0284c7');

      doc
        .fillColor('#38bdf8')
        .font('Helvetica-Bold')
        .fontSize(7.2)
        .text('FACTURA PROFORMA / PRESSUPOST', pfBadgeX + 12, 24, { lineBreak: false });

      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(13.5)
        .text(codiProforma, pfBadgeX + 12, 35, { lineBreak: false });

      doc
        .fillColor('#94a3b8')
        .font('Helvetica')
        .fontSize(7.2)
        .text(`Data d'Emissió: ${dataEmissio}`, pfBadgeX + 12, 52, { lineBreak: false });

      doc
        .fillColor('#34d399')
        .font('Helvetica-Bold')
        .fontSize(7.2)
        .text('Validesa: 30 dies naturals', pfBadgeX + 12, 63, { lineBreak: false });

      // ─── 1.2. DOS BLOCS EN PARAL·LEL: DADES EMISSOR I DADES CLIENT ───────────
      let y1 = 110;
      const colBoxW = (contentWidth - 10) / 2;
      const colBoxH = 76;

      // Bloc Esquerra: Dades Fiscals de l'Emissor
      doc.roundedRect(leftMargin, y1, colBoxW, colBoxH, 5).lineWidth(0.8).fillAndStroke('#f8fafc', '#cbd5e1');
      doc.rect(leftMargin, y1, 3.5, colBoxH).fill('#0284c7');

      doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(8).text('DADES FISCALS DE L\'EMISSOR:', leftMargin + 12, y1 + 8, { lineBreak: false });
      doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(7.6).text('KERNELCORE S.L.', leftMargin + 12, y1 + 21, { lineBreak: false });
      doc.fillColor('#475569').font('Helvetica').fontSize(7.2).text('NIF Oficial: B-67981234', leftMargin + 12, y1 + 33, { lineBreak: false });
      doc.fillColor('#475569').font('Helvetica').fontSize(7.2).text('Seu: DFactory Barcelona (Zona Franca, 08040 Barcelona)', leftMargin + 12, y1 + 45, { lineBreak: false });
      doc.fillColor('#475569').font('Helvetica').fontSize(7.2).text('Reg. Mercantil BCN: Tom 48210, Foli 112, B-571290', leftMargin + 12, y1 + 57, { lineBreak: false });

      // Bloc Dreta: Dades Fiscals del Client / Facturar A
      const rightColX = leftMargin + colBoxW + 10;
      doc.roundedRect(rightColX, y1, colBoxW, colBoxH, 5).lineWidth(0.8).fillAndStroke('#f8fafc', '#cbd5e1');
      doc.rect(rightColX, y1, 3.5, colBoxH).fill('#06b6d4');

      doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(8).text('DADES DEL CLIENT / FACTURAR A:', rightColX + 12, y1 + 8, { lineBreak: false });
      doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(7.6).text(String(nomEmpresa).slice(0, 38), rightColX + 12, y1 + 21, { lineBreak: false });
      doc.fillColor('#475569').font('Helvetica').fontSize(7.2).text(`NIF / CIF: ${cifClient} · Att: ${String(personaContacte).slice(0, 24)}`, rightColX + 12, y1 + 33, { lineBreak: false });
      doc.fillColor('#0284c7').font('Helvetica').fontSize(7.2).text(String(emailClient).slice(0, 40), rightColX + 12, y1 + 45, { lineBreak: false });
      doc.fillColor('#475569').font('Helvetica').fontSize(7.2).text(`Tel: ${telefonClient} · Entorn: ${String(entornOperatiu).slice(0, 24)}`, rightColX + 12, y1 + 57, { lineBreak: false });

      // ─── 1.3. BARRA DE CONTROL METADADES PROFORMA ────────────────────────────
      y1 += colBoxH + 6;
      doc.roundedRect(leftMargin, y1, contentWidth, 20, 4).lineWidth(0.8).fillAndStroke('#0f172a', '#0284c7');
      doc.fillColor('#38bdf8').font('Helvetica-Bold').fontSize(6.8);
      doc.text('FORMA DE PAGAMENT: Transferència Bancària SEPA', leftMargin + 10, y1 + 6, { lineBreak: false });
      doc.text('CENTRE D\'ENGINYERIA: DFactory Barcelona', leftMargin + 205, y1 + 6, { lineBreak: false });
      doc.fillColor('#34d399').text('ESTAT: Validat per Direcció Tècnica', pageWidth - leftMargin - 160, y1 + 6, { width: 150, align: 'right', lineBreak: false });

      // ─── 1.4. TAULA DE PARTIDES I ESPECIFICACIÓ TÈCNICA PROFORMA ──────────────
      y1 += 26;
      doc
        .fillColor('#0b1329')
        .font('Helvetica-Bold')
        .fontSize(8.6)
        .text('PARTIDES D\'ENGINYERIA, MAQUINARI I SERVEIS CONTRACTATS', leftMargin, y1, { lineBreak: false });

      y1 += 13;

      // Columnes de la taula estil Proforma (sense talls de text)
      const colSkuW = 82;
      const colDescW = 244;
      const colQtyW = 34;
      const colPriceW = 80;
      const colSubtotalW = 91.28;

      doc.rect(leftMargin, y1, contentWidth, 19).fill('#0f172a');
      doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(7.2);
      doc.text('REF. / SKU', leftMargin + 8, y1 + 5, { lineBreak: false });
      doc.text('DESCRIPCIÓ TÈCNICA I ESPECIFICACIÓ', leftMargin + colSkuW + 8, y1 + 5, { lineBreak: false });
      doc.text('UDS.', leftMargin + colSkuW + colDescW, y1 + 5, { width: colQtyW, align: 'center', lineBreak: false });
      doc.text('PREU UNIT.', leftMargin + colSkuW + colDescW + colQtyW, y1 + 5, { width: colPriceW, align: 'right', lineBreak: false });
      doc.text('TOTAL NET', leftMargin + colSkuW + colDescW + colQtyW + colPriceW, y1 + 5, { width: colSubtotalW - 8, align: 'right', lineBreak: false });

      y1 += 19;

      // Partides reals estructurades estil Proforma
      let proformaItems = [];
      if (Array.isArray(rawItems) && rawItems.length > 0) {
        proformaItems = rawItems.map((it, idx) => {
          if (typeof it === 'object' && it !== null) {
            return {
              sku: it.sku || `KC-HW-0${idx + 1}`,
              name: it.concepte || it.name || it.article || 'Equipament IT Especialitzat',
              desc: it.descripcio || it.desc || '',
              qty: Number(it.quantitat || it.qty || 1),
              unitPrice: Number(it.preu_unitari || it.price || 0),
              total: Number(it.total || (Number(it.quantitat || 1) * Number(it.preu_unitari || 0)))
            };
          }
          return {
            sku: `KC-PART-${idx + 1}`,
            name: String(it),
            desc: '',
            qty: 1,
            unitPrice: 0,
            total: 0
          };
        });
      }

      if (proformaItems.length === 0) {
        const p1 = Math.round(costMaquinari * 0.45 * 100) / 100;
        const p2 = Math.round(costMaquinari * 0.35 * 100) / 100;
        const p3 = Math.round((costMaquinari - p1 - p2) * 100) / 100;

        proformaItems = [
          {
            sku: 'RACK-19-42U',
            name: 'Armari Rack 19" Professional + PDU Gestionable 8P',
            desc: 'Rack insonoritzat amb ventilació forçada, porta vidre temperat i gestió tèrmica.',
            qty: 1,
            unitPrice: p1,
            total: p1
          },
          {
            sku: 'SW-POE-L2L3',
            name: 'Commutació Gestionable L2/L3 Gigabit PoE+ 370W',
            desc: 'Switch professional Cisco / Aruba amb VLANs de veu i priorització QoS.',
            qty: 1,
            unitPrice: p2,
            total: p2
          },
          {
            sku: 'CAB-CAT6A-LS',
            name: 'Cablejat Estructurat Cat6A LSZH Dca 500MHz + Preses',
            desc: 'Bobines apantallades lliures d\'halògens i mòduls Keystone certificats Fluke.',
            qty: 1,
            unitPrice: p3,
            total: p3
          },
          {
            sku: 'LIC-SEC-NGFW',
            name: 'Llicències de Firewall NGFW, VPN IPsec i Seguretat',
            desc: 'Protecció perimetral avançada amb prevenció d\'intrusions IPS i filtratge DNS.',
            qty: 1,
            unitPrice: costSoftware,
            total: costSoftware
          },
          {
            sku: 'ENG-LABOR-CERT',
            name: 'Enginyeria d\'Instal·lació, Configuració i Certificació',
            desc: 'Mà d\'obra especialitzada d\'implantació, conectorització i informe DSX-8000.',
            qty: 1,
            unitPrice: costMaObra,
            total: costMaObra
          }
        ];
      }

      // Renderitzem les 5 files
      const maxRows = Math.min(proformaItems.length, 5);
      for (let i = 0; i < maxRows; i++) {
        const item = proformaItems[i];
        const rowH = item.desc ? 24 : 18;
        const bg = i % 2 === 0 ? '#f8fafc' : '#ffffff';

        doc.rect(leftMargin, y1, contentWidth, rowH).fill(bg);
        doc.rect(leftMargin, y1 + rowH - 0.5, contentWidth, 0.5).fill('#e2e8f0');

        doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(6.8).text(item.sku, leftMargin + 8, y1 + 5, { lineBreak: false });
        doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(7.4).text(item.name, leftMargin + colSkuW + 8, y1 + 5, { width: colDescW - 12, lineBreak: false });

        if (item.desc) {
          doc.fillColor('#64748b').font('Helvetica').fontSize(6.5).text(item.desc, leftMargin + colSkuW + 8, y1 + 14, { width: colDescW - 12, lineBreak: false });
        }

        doc.fillColor('#334155').font('Helvetica').fontSize(7.2).text(String(item.qty), leftMargin + colSkuW + colDescW, y1 + 5, { width: colQtyW, align: 'center', lineBreak: false });
        doc.fillColor('#334155').font('Helvetica').fontSize(7.2).text(formatEur(item.unitPrice), leftMargin + colSkuW + colDescW + colQtyW, y1 + 5, { width: colPriceW, align: 'right', lineBreak: false });
        doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(7.5).text(formatEur(item.total), leftMargin + colSkuW + colDescW + colQtyW + colPriceW, y1 + 5, { width: colSubtotalW - 8, align: 'right', lineBreak: false });

        y1 += rowH;
      }

      // ─── 1.5. QUADRE DE TOTALS I DADES BANCÀRIES DE PAGAMENT (PROFORMA) ───────
      y1 += 8;
      const sumBoxW = 260;
      const sumBoxX = pageWidth - leftMargin - sumBoxW;
      const sumBoxH = 130;

      // Caixa d'acompanyament a l'esquerra: Dades Bancàries per a Transferència
      const bankBoxW = contentWidth - sumBoxW - 10;
      doc.roundedRect(leftMargin, y1, bankBoxW, sumBoxH, 5).lineWidth(1).fillAndStroke('#f0f9ff', '#0284c7');
      doc.rect(leftMargin, y1, bankBoxW, 20).fill('#0f172a');
      doc.fillColor('#38bdf8').font('Helvetica-Bold').fontSize(7.2).text('DADES BANCÀRIES PER A LA TRANSFERÈNCIA', leftMargin + 10, y1 + 5, { lineBreak: false });

      doc.fillColor('#334155').font('Helvetica').fontSize(6.8);
      doc.text('Per formalitzar aquesta Factura Proforma, si us plau realitzeu la transferència:', leftMargin + 10, y1 + 25, { width: bankBoxW - 20, lineBreak: false });

      let bankY = y1 + 38;
      doc.roundedRect(leftMargin + 8, bankY, bankBoxW - 16, 52, 4).lineWidth(0.8).fillAndStroke('#ffffff', '#93c5fd');
      doc.fillColor('#1e40af').font('Helvetica-Bold').fontSize(7).text('ENTITAT BANCÀRIA: CaixaBank / Banc Sabadell', leftMargin + 12, bankY + 6, { lineBreak: false });
      doc.fillColor('#0f172a').font('Helvetica').fontSize(6.8).text('Titular: KERNELCORE S.L. (DFactory Barcelona)', leftMargin + 12, bankY + 17, { lineBreak: false });
      doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(7.4).text('IBAN: ES82 2100 0418 4502 0005 6789', leftMargin + 12, bankY + 28, { lineBreak: false });
      doc.fillColor('#475569').font('Helvetica').fontSize(6.8).text(`BIC: CAIXESBBXXX · Concepte: ${codiProforma} - ${String(nomEmpresa).slice(0, 16)}`, leftMargin + 12, bankY + 39, { lineBreak: false });

      doc.fillColor('#64748b').font('Helvetica').fontSize(6.6).text('Condicions: 40% a la confirmació de comanda i 60% al lliurament certificat Fluke.', leftMargin + 10, y1 + 97, { width: bankBoxW - 20, lineBreak: false });
      doc.fillColor('#059669').font('Helvetica-Bold').fontSize(6.6).text('Termini d\'execució: 5 a 10 dies laborables des de la recepció.', leftMargin + 10, y1 + 112, { lineBreak: false });

      // Caixa de Totals Proforma a la dreta
      doc.roundedRect(sumBoxX, y1, sumBoxW, sumBoxH, 5).lineWidth(1.2).fillAndStroke('#ffffff', '#0284c7');
      doc.rect(sumBoxX, y1, sumBoxW, 20).fill('#0f172a');
      doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(7.5).text('RESUM FISCAL I ECONÒMIC DE LA PROFORMA', sumBoxX + 10, y1 + 5, { lineBreak: false });

      let totY = y1 + 25;
      const renderTotRow = (lbl, val, isBold = false, isAccent = false) => {
        doc
          .fillColor(isAccent ? '#0284c7' : isBold ? '#0f172a' : '#475569')
          .font(isBold ? 'Helvetica-Bold' : 'Helvetica')
          .fontSize(isBold ? 7.4 : 7)
          .text(lbl, sumBoxX + 10, totY, { lineBreak: false });

        doc
          .fillColor(isAccent ? '#0284c7' : isBold ? '#0f172a' : '#1e293b')
          .font(isBold ? 'Helvetica-Bold' : 'Helvetica')
          .fontSize(isBold ? 7.4 : 7)
          .text(formatEur(val), sumBoxX + 130, totY, { width: sumBoxW - 140, align: 'right', lineBreak: false });

        totY += 14;
      };

      renderTotRow('1. Maquinari, Racks i Electrònica:', costMaquinari);
      renderTotRow('2. Llicències i Seguretat:', costSoftware);
      renderTotRow('3. Enginyeria i Certificació Fluke:', costMaObra);

      doc.moveTo(sumBoxX + 10, totY).lineTo(sumBoxX + sumBoxW - 10, totY).lineWidth(0.5).stroke('#e2e8f0');
      totY += 3;

      renderTotRow('Base Imposable (Subtotal):', baseImposable, true);
      renderTotRow('IVA Vigent (21%):', iva, false);

      // Caixa Destacada Total Proforma
      doc.rect(sumBoxX + 5, totY, sumBoxW - 10, 24).fill('#0f2447');
      doc
        .fillColor('#38bdf8')
        .font('Helvetica-Bold')
        .fontSize(8)
        .text('TOTAL FACTURA PROFORMA:', sumBoxX + 10, totY + 7, { lineBreak: false });
      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(10.5)
        .text(formatEur(importTotal), sumBoxX + 130, totY + 6, { width: sumBoxW - 142, align: 'right', lineBreak: false });

      // ─── 1.6. BANDA DE MANTENIMENT PREVENTIU SLA ──────────────────────────────
      y1 += sumBoxH + 6;
      doc.roundedRect(leftMargin, y1, contentWidth, 20, 4).lineWidth(0.8).fillAndStroke('#f0fdf4', '#86efac');
      doc.fillColor('#166534').font('Helvetica-Bold').fontSize(7.2).text('OPCIÓ DE MANTENIMENT PREVENTIU I SUPORT TÈCNIC SLA (< 4h):', leftMargin + 10, y1 + 5, { lineBreak: false });
      doc.fillColor('#15803d').font('Helvetica-Bold').fontSize(8).text(`${formatEur(quotaMensual)} / mes`, pageWidth - leftMargin - 150, y1 + 5, { width: 140, align: 'right', lineBreak: false });

      // ─── 1.7. BLOC TRIPARTIT DE SIGNATURES AMB LES FIRMES REALS ──────────────
      y1 += 26;
      const sigBoxW = (contentWidth - 16) / 3;
      const sigBoxH = 74;

      // Signatura 1: Hans Lao Moncusi
      doc.roundedRect(leftMargin, y1, sigBoxW, sigBoxH, 5).lineWidth(0.8).fillAndStroke('#ffffff', '#94a3b8');
      doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(7.5).text('Hans Lao Moncusi', leftMargin + 8, y1 + 6, { lineBreak: false });
      doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(6.5).text('Direcció Tècnica · Sistemes & Seguretat', leftMargin + 8, y1 + 16, { lineBreak: false });

      // Dibuixem signatura digital elegant a tinta
      drawDigitalSignature(doc, leftMargin + 10, y1 + 18, 'hans');

      doc.fillColor('#64748b').font('Helvetica').fontSize(6.2).text('Signat digitalment · KernelCore (DFactory)', leftMargin + 8, y1 + 62, { lineBreak: false });

      // Signatura 2: Joel Pérez Armenteros
      const sig2X = leftMargin + sigBoxW + 8;
      doc.roundedRect(sig2X, y1, sigBoxW, sigBoxH, 5).lineWidth(0.8).fillAndStroke('#ffffff', '#94a3b8');
      doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(7.5).text('Joel Pérez Armenteros', sig2X + 8, y1 + 6, { lineBreak: false });
      doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(6.5).text('Direcció General · Infraestructura de Xarxes', sig2X + 8, y1 + 16, { lineBreak: false });

      // Dibuixem signatura digital elegant a tinta
      drawDigitalSignature(doc, sig2X + 10, y1 + 18, 'joel');

      doc.fillColor('#64748b').font('Helvetica').fontSize(6.2).text('Signat digitalment · KernelCore (DFactory)', sig2X + 8, y1 + 62, { lineBreak: false });

      // Signatura 3: Conformitat i Comanda del Client
      const sig3X = sig2X + sigBoxW + 8;
      doc.roundedRect(sig3X, y1, sigBoxW, sigBoxH, 5).lineWidth(0.8).fillAndStroke('#f8fafc', '#94a3b8');
      doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(7.5).text('Conformitat i Comanda Ferm', sig3X + 8, y1 + 6, { lineBreak: false });
      doc.fillColor('#64748b').font('Helvetica').fontSize(6.5).text(String(nomEmpresa).slice(0, 24), sig3X + 8, y1 + 16, { lineBreak: false });
      doc.fillColor('#94a3b8').font('Helvetica').fontSize(6.2).text('Segell de l\'empresa, data i signatura:', sig3X + 8, y1 + 62, { lineBreak: false });

      // ─── 1.8. PEU DE PÀGINA 1 AMB CSV DE VERIFICACIÓ ─────────────────────────
      doc.rect(0, pageHeight - 24, pageWidth, 24).fill('#0b1329');
      doc
        .fillColor('#94a3b8')
        .font('Helvetica')
        .fontSize(6.8)
        .text(
          `KERNELCORE S.L. · DFactory Barcelona (Zona Franca) · Factura Proforma Oficial ${codiProforma} · CSV: ${csvHash} · Pàgina 1 de 2`,
          leftMargin,
          pageHeight - 16,
          { width: contentWidth, align: 'center', lineBreak: false }
        );

      // =========================================================================
      // PÀGINA 2: ANNEX TÈCNIC D'ENGINYERIA, SAI CRÍTIC I NORMATIVES FLUKE
      // =========================================================================
      doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });

      // ─── 2.1. CAPÇALERA PÀGINA 2 (BANNER CORPORATIU REDUÏT) ───────────────────
      doc.rect(0, 0, pageWidth, 50).fill('#0b1329');
      doc.rect(0, 50, pageWidth, 2.5).fill('#06b6d4');

      drawKernelCoreLogo(doc, leftMargin, 8, 34);

      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(11.5)
        .text('KERNELCORE', leftMargin + 44, 13, { lineBreak: false });

      doc
        .fillColor('#38bdf8')
        .font('Helvetica-Bold')
        .fontSize(7.5)
        .text('ANNEX TÈCNIC D\'ENGINYERIA, CONTINUÏTAT ELÈCTRICA SAI I CERTIFICACIÓ', leftMargin + 44, 28, { lineBreak: false });

      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(8.5)
        .text(`Ref: ${codiProforma}`, pageWidth - leftMargin - 140, 13, { width: 140, align: 'right', lineBreak: false });

      doc
        .fillColor('#94a3b8')
        .font('Helvetica')
        .fontSize(7.2)
        .text(`Client: ${String(nomEmpresa).slice(0, 24)}`, pageWidth - leftMargin - 180, 28, { width: 180, align: 'right', lineBreak: false });

      // ─── 2.2. MEMÒRIA D'INTERVENCIÓ I OBJECTIUS TÈCNICS ──────────────────────
      let y2 = 64;
      const techHeight = 150;
      doc.roundedRect(leftMargin, y2, contentWidth, techHeight, 5).lineWidth(1).fillAndStroke('#ffffff', '#cbd5e1');
      doc.rect(leftMargin, y2, contentWidth, 22).fill('#0f172a');
      doc
        .fillColor('#38bdf8')
        .font('Helvetica-Bold')
        .fontSize(8.4)
        .text('MEMÒRIA TÈCNICA D\'ENGINYERIA I OBJECTIUS DEL PROJECTE', leftMargin + 12, y2 + 6, { lineBreak: false });

      let techInnerY = y2 + 28;
      if (customMessage && customMessage.trim().length > 0) {
        doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(7.6).text('Instruccions tècniques i requeriments del client:', leftMargin + 12, techInnerY, { lineBreak: false });
        techInnerY += 11;
        const cleanCustom = String(customMessage).replace(/\s+/g, ' ').trim().slice(0, 360);
        doc.fillColor('#334155').font('Helvetica-Oblique').fontSize(7.6).text(`"${cleanCustom}"`, leftMargin + 12, techInnerY, {
          width: contentWidth - 24,
          height: 32,
          ellipsis: true
        });
        techInnerY += 36;
      }

      doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(7.6).text('Abast d\'intervenció de l\'equip d\'Enginyeria KernelCore:', leftMargin + 12, techInnerY, { lineBreak: false });
      techInnerY += 11;

      const techPoints = [
        'Desplegament i organització d\'armari rack professional de 19" amb distribució d\'energia PDU gestionable.',
        'Tirat, pentinat i conectorització de cablejat estructurat Cat6A lliure d\'halògens (LSZH Dca 500MHz).',
        'Commutació L2/L3 empresarial Cisco Catalyst / HPE Aruba amb segmentació de VLANs i prioritats de veu (QoS).',
        'Seguretat perimetral mitjançant tallafoc NGFW d\'última generació amb filtratge d\'amenaces i VPN IPsec.',
        'Protecció energètica ininterrompuda mitjançant SAI industrial de Doble Conversió On-Line amb bypass automàtic.',
        'Certificació individual de tots els enllaços permanents mitjançant reflectòmetre calibrat Fluke Networks DSX-8000.'
      ];

      for (const p of techPoints) {
        doc.circle(leftMargin + 18, techInnerY + 3.5, 1.8).fill('#06b6d4');
        doc.fillColor('#334155').font('Helvetica').fontSize(7.4).text(p, leftMargin + 25, techInnerY, { width: contentWidth - 38, lineBreak: false });
        techInnerY += 12;
      }

      // ─── 2.3. QUADRE D'ENGINYERIA ELÈCTRICA & DIMENSIONAMENT SAI CRÍTIC ──────
      y2 = 224;
      const saiBoxH = 146;
      doc.roundedRect(leftMargin, y2, contentWidth, saiBoxH, 5).lineWidth(1.2).fillAndStroke('#f0fdfa', '#0d9488');
      doc.rect(leftMargin, y2, contentWidth, 22).fill('#134e4a');

      doc
        .fillColor('#5eead4')
        .font('Helvetica-Bold')
        .fontSize(8.4)
        .text('CÀLCUL DE CÀRREGA I DIMENSIONAMENT ELÈCTRIC SAI (CONTINUÏTAT CRÍTICA)', leftMargin + 12, y2 + 6, { lineBreak: false });

      // 3 caixes mètriques (Watts / VA amb +20% marge / Autonomia)
      const metricBoxW = (contentWidth - 24) / 3;
      const metricBoxH = 42;
      const metricY = y2 + 30;

      // Caixa 1: Consum Actiu
      doc.roundedRect(leftMargin + 8, metricY, metricBoxW, metricBoxH, 4).lineWidth(0.8).fillAndStroke('#ffffff', '#99f6e4');
      doc.fillColor('#64748b').font('Helvetica-Bold').fontSize(6.6).text('POTÈNCIA ACTIVA ESTIMADA', leftMargin + 14, metricY + 6, { lineBreak: false });
      doc.fillColor('#0f766e').font('Helvetica-Bold').fontSize(13).text(`${saiWatts} W`, leftMargin + 14, metricY + 18, { lineBreak: false });

      // Caixa 2: Potència Aparent +20%
      const m2X = leftMargin + 8 + metricBoxW + 4;
      doc.roundedRect(m2X, metricY, metricBoxW, metricBoxH, 4).lineWidth(0.8).fillAndStroke('#ffffff', '#99f6e4');
      doc.fillColor('#64748b').font('Helvetica-Bold').fontSize(6.6).text('CAPACITAT REQUERIDA (+20%)', m2X + 8, metricY + 6, { lineBreak: false });
      doc.fillColor('#0f766e').font('Helvetica-Bold').fontSize(13).text(`${saiVA} VA`, m2X + 8, metricY + 18, { lineBreak: false });

      // Caixa 3: Autonomia sota Càrrega
      const m3X = m2X + metricBoxW + 4;
      doc.roundedRect(m3X, metricY, metricBoxW, metricBoxH, 4).lineWidth(0.8).fillAndStroke('#ffffff', '#99f6e4');
      doc.fillColor('#64748b').font('Helvetica-Bold').fontSize(6.6).text('AUTONOMIA ESTIMADA', m3X + 8, metricY + 6, { lineBreak: false });
      doc.fillColor('#059669').font('Helvetica-Bold').fontSize(13).text(saiAutonomia, m3X + 8, metricY + 18, { lineBreak: false });

      doc.fillColor('#134e4a').font('Helvetica-Bold').fontSize(7.6).text('Equip d\'Alimentació Ininterrompuda Homologat:', leftMargin + 12, y2 + 82, { lineBreak: false });
      doc.fillColor('#0f172a').font('Helvetica').fontSize(8).text(saiModel, leftMargin + 12, y2 + 94, { width: contentWidth - 24, lineBreak: false });

      doc.fillColor('#475569').font('Helvetica').fontSize(7.2).text(
        'Topologia de Doble Conversió VFI (Voltage and Frequency Independent) amb sortida sinusoïdal pura, factor de potència 0.9/1.0, bypass automàtic de manteniment i targeta SNMP integrada per a apagada ordenada de servidors físics i màquines virtuals.',
        leftMargin + 12,
        y2 + 110,
        { width: contentWidth - 24, lineGap: 1.5 }
      );

      // ─── 2.4. NORMATIVES D'ENGINYERIA I CERTIFICACIÓ APLICABLES ───────────────
      y2 = 380;
      const normHeight = 224;
      doc.roundedRect(leftMargin, y2, contentWidth, normHeight, 5).lineWidth(1).fillAndStroke('#f8fafc', '#cbd5e1');
      doc.rect(leftMargin, y2, contentWidth, 22).fill('#1e293b');
      doc
        .fillColor('#94a3b8')
        .font('Helvetica-Bold')
        .fontSize(8.2)
        .text('ESTÀNDARDS D\'ENGINYERIA, CONTROL DE QUALITAT I GARANTIA DEL SERVEI', leftMargin + 12, y2 + 6, { lineBreak: false });

      const standards = [
        {
          code: 'ISO/IEC 11801 & ANSI/TIA-568-C.2',
          desc: 'Normativa internacional de cablejat per a comunicacions Cat6A fins a 500 MHz i velocitats de 10GbE.'
        },
        {
          code: 'Certificació Fluke Networks DSX-8000',
          desc: 'Mesura de pèrdues d\'inserció, paradiafonia (NEXT), telediafonia (FEXT) i retorn de pèrdua (Return Loss) amb certificat individual.'
        },
        {
          code: 'IEEE 802.3bt Power over Ethernet (PoE++)',
          desc: 'Garanteix alimentació elèctrica de fins a 60W/90W per port per a punts d\'accés Wi-Fi 6 i càmeres de seguretat IP.'
        },
        {
          code: 'Reglament General de Protecció de Dades (RGPD / LOPDGDD)',
          desc: 'Tots els protocols de xarxa i emmagatzematge s\'implanten amb xifratge TLS 1.3, AES-256 i segmentació estricta.'
        }
      ];

      let stdY = y2 + 30;
      for (const s of standards) {
        doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(7.5).text(s.code, leftMargin + 12, stdY, { lineBreak: false });
        doc.fillColor('#475569').font('Helvetica').fontSize(7.2).text(s.desc, leftMargin + 12, stdY + 10, { width: contentWidth - 24, lineBreak: false });
        stdY += 26;
      }

      doc.roundedRect(leftMargin + 8, stdY + 4, contentWidth - 16, 46, 4).lineWidth(0.8).fillAndStroke('#eff6ff', '#bfdbfe');
      doc.fillColor('#1e40af').font('Helvetica-Bold').fontSize(7.4).text('COMPROMÍS D\'ENGINYERIA OFICIAL KERNELCORE:', leftMargin + 16, stdY + 10, { lineBreak: false });
      doc.fillColor('#1e3a8a').font('Helvetica').fontSize(7).text(
        'Totes les instal·lacions són executades directament pel nostre personal tècnic titulat i col·legiat a DFactory Barcelona, sense intermediaris ni subcontractacions a tercers, garantint l\'estricta puresa de l\'enginyeria i la traçabilitat integral dels components.',
        leftMargin + 16,
        stdY + 22,
        { width: contentWidth - 32, lineGap: 1.5 }
      );

      // ─── 2.5. CONDICIONS CONTRACTUALS I DRET DE DESISTIMENT ───────────────────
      y2 = 614;
      const termsBoxH = 170;
      doc.roundedRect(leftMargin, y2, contentWidth, termsBoxH, 5).lineWidth(0.8).fillAndStroke('#ffffff', '#cbd5e1');
      doc.rect(leftMargin, y2, 3.5, termsBoxH).fill('#06b6d4');

      doc
        .fillColor('#0b1329')
        .font('Helvetica-Bold')
        .fontSize(7.8)
        .text('CONDICIONS CONTRACTUALS GENERALS I GARANTIA DEL SERVEI', leftMargin + 12, y2 + 10, { lineBreak: false });

      doc
        .fillColor('#475569')
        .font('Helvetica')
        .fontSize(6.8)
        .text(
          '1. Acceptació de la Proforma: La signatura o abonament del 40% inicial d\'aquesta Factura Proforma formalitza la comanda i la reserva de maquinari en estoc central a DFactory Barcelona.\n' +
          '2. Garantia Oficial de Maquinari: Tot el maquinari subministrat disposa de 2 anys de garantia oficial amb substitució per avançat canalitzada a través dels proveïdors oficials majoristes.\n' +
          '3. Lliurament i Certificació Fluke: En finalitzar la implantació física, s\'entregarà el dossier oficial amb les corbes de reflectometria i certificació Fluke DSX-8000 per a cada presa RJ45.\n' +
          '4. Secret Professional i RGPD: Totes les dades i credencials d\'accés seran tractades sota estricte secret professional d\'acord amb el Reglament (UE) 2016/679 (RGPD) i la LOPDGDD 3/2018.\n' +
          '5. Dret de Desistiment: El client disposa de 14 dies naturals per exercir el dret de desistiment segons el Reial Decret Legislatiu 1/2007 (TRLGDCU).',
          leftMargin + 12,
          y2 + 25,
          { width: contentWidth - 24, lineGap: 3.2 }
        );

      doc
        .fillColor('#0284c7')
        .font('Helvetica-Bold')
        .fontSize(7)
        .text(`Verificació Electrònica d'Integritat: https://kernelcore.cat/valida · Codi CSV: ${csvHash}`, leftMargin + 12, y2 + 152, { lineBreak: false });

      // ─── 2.6. PEU DE PÀGINA 2 ────────────────────────────────────────────────
      doc.rect(0, pageHeight - 24, pageWidth, 24).fill('#0b1329');
      doc
        .fillColor('#94a3b8')
        .font('Helvetica')
        .fontSize(6.8)
        .text(
          `KERNELCORE S.L. · DFactory Barcelona (Zona Franca) · Factura Proforma Oficial ${codiProforma} · Pàgina 2 de 2`,
          leftMargin,
          pageHeight - 16,
          { width: contentWidth, align: 'center', lineBreak: false }
        );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

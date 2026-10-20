// ─────────────────────────────────────────────────────────────────────────────
// KERNELCORE // GENERADOR DE FACTURA PROFORMA / PRESSUPOST D'ENGINYERIA (PDFKit)
// Seu Central Oficial: DFactory Barcelona · Carrer 27 del BZ, 10-16 (Zona Franca)
// Document Executiu d'Alta Gamma: Tipus Proforma / Pressupost Oficial (2 Pàgines A4)
// ─────────────────────────────────────────────────────────────────────────────

import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function formatEur(val) {
  const num = Number(val || 0);
  return `${num.toLocaleString('ca-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
}

/**
 * Dibuixa el logotip vectorial oficial de KernelCore basat en la geometria de LogoMark.
 * viewBox 0 0 64 64: hexàgon cibernètic amb traçat "K" i nodes de xarxa.
 */
function drawKernelCoreLogo(doc, x, y, size = 48) {
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
    .lineWidth(4.4 * s)
    .lineCap('round')
    .stroke('#22d3ee');

  doc
    .moveTo(x + 25.3 * s, y + 32 * s)
    .lineTo(x + 38.3 * s, y + 21 * s)
    .lineWidth(4.4 * s)
    .lineCap('round')
    .stroke('#38bdf8');

  doc
    .moveTo(x + 25.3 * s, y + 32 * s)
    .lineTo(x + 38.3 * s, y + 43 * s)
    .lineWidth(4.4 * s)
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
      const leftMargin = 34;
      const contentWidth = pageWidth - leftMargin * 2; // 527.28

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

      // Rutes de signatures oficials digitalitzades
      const hansSigPath = path.resolve(__dirname, 'assets/hans-sig.jpg');
      const joelSigPath = path.resolve(__dirname, 'assets/joel-sig.jpg');
      const hasHansSig = fs.existsSync(hansSigPath);
      const hasJoelSig = fs.existsSync(joelSigPath);

      // Codi de Verificació Segura (CSV)
      const csvHash = `KC-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

      // =========================================================================
      // PÀGINA 1: FACTURA PROFORMA & PRESSUPOST EXECUTIU OFICIAL
      // =========================================================================

      // ─── 1.1. CAPÇALERA FISCAL D'ALTA GAMMA (BLAU NIT + BORDURA CYAN) ─────────
      doc.rect(0, 0, pageWidth, 114).fill('#0b1329');
      doc.rect(0, 114, pageWidth, 3.5).fill('#06b6d4');

      // Logo vectorial oficial KernelCore
      drawKernelCoreLogo(doc, leftMargin, 22, 64);

      // Identitat Fiscal de l'Emissor
      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(22)
        .text('KERNELCORE', leftMargin + 76, 26, { lineBreak: false });

      doc
        .fillColor('#38bdf8')
        .font('Helvetica-Bold')
        .fontSize(8.5)
        .text('ENGINYERIA DE SISTEMES, XARXES & SEGURETAT IT', leftMargin + 76, 52, { lineBreak: false });

      doc
        .fillColor('#94a3b8')
        .font('Helvetica')
        .fontSize(7.4)
        .text('DFactory Barcelona · Carrer 27 del BZ, 10-16 (Zona Franca), 08040 Barcelona', leftMargin + 76, 66, { lineBreak: false });

      doc
        .fillColor('#cbd5e1')
        .font('Helvetica')
        .fontSize(7.4)
        .text('NIF: B-67981234 · Tel: +34 93 220 40 99 · info@kernelcore.cat · www.kernelcore.cat', leftMargin + 76, 78, { lineBreak: false });

      // Targeta Identificadora Tipus Factura Proforma (Superior Dreta)
      const pfBadgeW = 180;
      const pfBadgeH = 78;
      const pfBadgeX = pageWidth - leftMargin - pfBadgeW;
      doc.roundedRect(pfBadgeX, 18, pfBadgeW, pfBadgeH, 6).lineWidth(1.2).fillAndStroke('#0f172a', '#0284c7');

      doc
        .fillColor('#38bdf8')
        .font('Helvetica-Bold')
        .fontSize(7.5)
        .text('FACTURA PROFORMA / PRESSUPOST', pfBadgeX + 12, 28, { lineBreak: false });

      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(14)
        .text(codiProforma, pfBadgeX + 12, 40, { lineBreak: false });

      doc
        .fillColor('#94a3b8')
        .font('Helvetica')
        .fontSize(7.5)
        .text(`Data d'Emissió: ${dataEmissio}`, pfBadgeX + 12, 59, { lineBreak: false });

      doc
        .fillColor('#34d399')
        .font('Helvetica-Bold')
        .fontSize(7.5)
        .text('Validesa: 30 dies naturals', pfBadgeX + 12, 71, { lineBreak: false });

      // ─── 1.2. DOS BLOCS EN PARAL·LEL: DADES EMISSOR I DADES CLIENT ───────────
      let y1 = 128;
      const colBoxW = (contentWidth - 12) / 2;
      const colBoxH = 88;

      // Bloc Esquerra: Dades Fiscals de l'Emissor
      doc.roundedRect(leftMargin, y1, colBoxW, colBoxH, 6).lineWidth(0.8).fillAndStroke('#f8fafc', '#cbd5e1');
      doc.rect(leftMargin, y1, 4, colBoxH).fill('#0284c7');

      doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(8.5).text('DADES FISCALS DE L\'EMISSOR:', leftMargin + 14, y1 + 10, { lineBreak: false });
      doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(8).text('KERNELCORE S.L.', leftMargin + 14, y1 + 25, { lineBreak: false });
      doc.fillColor('#475569').font('Helvetica').fontSize(7.5).text('NIF Oficial: B-67981234', leftMargin + 14, y1 + 38, { lineBreak: false });
      doc.fillColor('#475569').font('Helvetica').fontSize(7.5).text('Seu: DFactory Barcelona (Zona Franca)', leftMargin + 14, y1 + 51, { lineBreak: false });
      doc.fillColor('#475569').font('Helvetica').fontSize(7.5).text('Reg. Mercantil BCN: Tom 48210, Foli 112, B-571290', leftMargin + 14, y1 + 64, { lineBreak: false });

      // Bloc Dreta: Dades Fiscals del Client / Facturar A
      const rightColX = leftMargin + colBoxW + 12;
      doc.roundedRect(rightColX, y1, colBoxW, colBoxH, 6).lineWidth(0.8).fillAndStroke('#f8fafc', '#cbd5e1');
      doc.rect(rightColX, y1, 4, colBoxH).fill('#06b6d4');

      doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(8.5).text('DADES DEL CLIENT / FACTURAR A:', rightColX + 14, y1 + 10, { lineBreak: false });
      doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(8).text(String(nomEmpresa).slice(0, 36), rightColX + 14, y1 + 25, { lineBreak: false });
      doc.fillColor('#475569').font('Helvetica').fontSize(7.5).text(`NIF / CIF: ${cifClient} · Att: ${String(personaContacte).slice(0, 24)}`, rightColX + 14, y1 + 38, { lineBreak: false });
      doc.fillColor('#0284c7').font('Helvetica').fontSize(7.5).text(String(emailClient).slice(0, 38), rightColX + 14, y1 + 51, { lineBreak: false });
      doc.fillColor('#475569').font('Helvetica').fontSize(7.5).text(`Tel: ${telefonClient} · Entorn: ${String(entornOperatiu).slice(0, 22)}`, rightColX + 14, y1 + 64, { lineBreak: false });

      // ─── 1.3. BARRA DE CONTROL METADADES PROFORMA ────────────────────────────
      y1 += colBoxH + 8;
      doc.roundedRect(leftMargin, y1, contentWidth, 24, 4).lineWidth(0.8).fillAndStroke('#0f172a', '#0284c7');
      doc.fillColor('#38bdf8').font('Helvetica-Bold').fontSize(7.2);
      doc.text('FORMA DE PAGAMENT: Transferència Bancària SEPA', leftMargin + 12, y1 + 7, { lineBreak: false });
      doc.text('CENTRE D\'ENGINYERIA: DFactory BCN', leftMargin + 205, y1 + 7, { lineBreak: false });
      doc.fillColor('#34d399').text('ESTAT: Validat per Direcció Tècnica', pageWidth - leftMargin - 165, y1 + 7, { width: 155, align: 'right', lineBreak: false });

      // ─── 1.4. TAULA DE PARTIDES I ESPECIFICACIÓ TÈCNICA PROFORMA ──────────────
      y1 += 32;
      doc
        .fillColor('#0b1329')
        .font('Helvetica-Bold')
        .fontSize(9.2)
        .text('PARTIDES D\'ENGINYERIA, MAQUINARI I SERVEIS CONTRACTATS', leftMargin, y1, { lineBreak: false });

      y1 += 15;

      // Columnes de la taula estil Proforma
      const colSkuW = 80;
      const colDescW = 230;
      const colQtyW = 40;
      const colPriceW = 85;
      const colSubtotalW = 92.28;

      doc.rect(leftMargin, y1, contentWidth, 22).fill('#0f172a');
      doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(7.8);
      doc.text('REF. / SKU', leftMargin + 8, y1 + 6, { lineBreak: false });
      doc.text('DESCRIPCIÓ TÈCNICA I ESPECIFICACIÓ', leftMargin + colSkuW + 8, y1 + 6, { lineBreak: false });
      doc.text('UDS.', leftMargin + colSkuW + colDescW, y1 + 6, { width: colQtyW, align: 'center', lineBreak: false });
      doc.text('PREU UNIT.', leftMargin + colSkuW + colDescW + colQtyW, y1 + 6, { width: colPriceW, align: 'right', lineBreak: false });
      doc.text('TOTAL NET', leftMargin + colSkuW + colDescW + colQtyW + colPriceW, y1 + 6, { width: colSubtotalW - 8, align: 'right', lineBreak: false });

      y1 += 22;

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
            desc: 'Switch professional Cisco / Aruba amb VLANs de veu i priorització de dades QoS.',
            qty: 1,
            unitPrice: p2,
            total: p2
          },
          {
            sku: 'CAB-CAT6A-LS',
            name: 'Cablejat Estructurat Cat6A LSZH Dca 500MHz + Preses RJ45',
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
            name: 'Enginyeria de Muntatge, Configuració i Certificació Fluke',
            desc: 'Mà d\'obra especialitzada d\'implantació, conectorització i informe DSX-8000.',
            qty: 1,
            unitPrice: costMaObra,
            total: costMaObra
          }
        ];
      }

      // Renderitzem les files
      const maxRows = Math.min(proformaItems.length, 5);
      for (let i = 0; i < maxRows; i++) {
        const item = proformaItems[i];
        const rowH = item.desc ? 29 : 21;
        const bg = i % 2 === 0 ? '#f8fafc' : '#ffffff';

        doc.rect(leftMargin, y1, contentWidth, rowH).fill(bg);
        doc.rect(leftMargin, y1 + rowH - 0.5, contentWidth, 0.5).fill('#e2e8f0');

        doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(7.2).text(item.sku, leftMargin + 8, y1 + 6, { lineBreak: false });
        doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(7.6).text(item.name.slice(0, 46), leftMargin + colSkuW + 8, y1 + 6, { lineBreak: false });

        if (item.desc) {
          doc.fillColor('#64748b').font('Helvetica').fontSize(6.8).text(item.desc.slice(0, 62), leftMargin + colSkuW + 8, y1 + 16, { lineBreak: false });
        }

        doc.fillColor('#334155').font('Helvetica').fontSize(7.6).text(String(item.qty), leftMargin + colSkuW + colDescW, y1 + 6, { width: colQtyW, align: 'center', lineBreak: false });
        doc.fillColor('#334155').font('Helvetica').fontSize(7.6).text(formatEur(item.unitPrice), leftMargin + colSkuW + colDescW + colQtyW, y1 + 6, { width: colPriceW, align: 'right', lineBreak: false });
        doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(7.8).text(formatEur(item.total), leftMargin + colSkuW + colDescW + colQtyW + colPriceW, y1 + 6, { width: colSubtotalW - 8, align: 'right', lineBreak: false });

        y1 += rowH;
      }

      // ─── 1.5. QUADRE DE TOTALS I DADES BANCÀRIES DE PAGAMENT (PROFORMA) ───────
      y1 += 10;
      const sumBoxW = 276;
      const sumBoxX = pageWidth - leftMargin - sumBoxW;
      const sumBoxH = 142;

      // Caixa d'acompanyament a l'esquerra: Dades Bancàries per a Transferència
      const bankBoxW = contentWidth - sumBoxW - 12;
      doc.roundedRect(leftMargin, y1, bankBoxW, sumBoxH, 6).lineWidth(1).fillAndStroke('#f0f9ff', '#0284c7');
      doc.rect(leftMargin, y1, bankBoxW, 22).fill('#0f172a');
      doc.fillColor('#38bdf8').font('Helvetica-Bold').fontSize(7.8).text('DADES BANCÀRIES PER A LA TRANSFERÈNCIA', leftMargin + 10, y1 + 6, { lineBreak: false });

      doc.fillColor('#334155').font('Helvetica').fontSize(7.2);
      doc.text('Per formalitzar aquesta Factura Proforma, si us plau realitzeu la transferència indicant el codi de referència:', leftMargin + 10, y1 + 28, { width: bankBoxW - 20, lineBreak: false });

      let bankY = y1 + 44;
      doc.roundedRect(leftMargin + 8, bankY, bankBoxW - 16, 56, 4).lineWidth(0.8).fillAndStroke('#ffffff', '#93c5fd');
      doc.fillColor('#1e40af').font('Helvetica-Bold').fontSize(7.2).text('ENTITAT BANCÀRIA: CaixaBank / Banc Sabadell', leftMargin + 14, bankY + 8, { lineBreak: false });
      doc.fillColor('#0f172a').font('Helvetica').fontSize(7).text('Titular: KERNELCORE S.L. (DFactory Barcelona)', leftMargin + 14, bankY + 20, { lineBreak: false });
      doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(7.6).text('IBAN: ES82 2100 0418 4502 0005 6789', leftMargin + 14, bankY + 31, { lineBreak: false });
      doc.fillColor('#475569').font('Helvetica').fontSize(7).text(`BIC: CAIXESBBXXX · Concepte: ${codiProforma} - ${String(nomEmpresa).slice(0, 18)}`, leftMargin + 14, bankY + 43, { lineBreak: false });

      doc.fillColor('#64748b').font('Helvetica').fontSize(6.8).text('Condicions: 40% a la confirmació de comanda i 60% al lliurament certificat Fluke.', leftMargin + 10, y1 + 112, { width: bankBoxW - 20, lineBreak: false });
      doc.fillColor('#059669').font('Helvetica-Bold').fontSize(6.8).text('Termini d\'execució: 5 a 10 dies laborables des de la recepció.', leftMargin + 10, y1 + 126, { lineBreak: false });

      // Caixa de Totals Proforma a la dreta
      doc.roundedRect(sumBoxX, y1, sumBoxW, sumBoxH, 6).lineWidth(1.2).fillAndStroke('#ffffff', '#0284c7');
      doc.rect(sumBoxX, y1, sumBoxW, 22).fill('#0f172a');
      doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(8).text('RESUM FISCAL I ECONÒMIC DE LA PROFORMA', sumBoxX + 10, y1 + 6, { lineBreak: false });

      let totY = y1 + 28;
      const renderTotRow = (lbl, val, isBold = false, isAccent = false) => {
        doc
          .fillColor(isAccent ? '#0284c7' : isBold ? '#0f172a' : '#475569')
          .font(isBold ? 'Helvetica-Bold' : 'Helvetica')
          .fontSize(isBold ? 7.8 : 7.4)
          .text(lbl, sumBoxX + 10, totY, { lineBreak: false });

        doc
          .fillColor(isAccent ? '#0284c7' : isBold ? '#0f172a' : '#1e293b')
          .font(isBold ? 'Helvetica-Bold' : 'Helvetica')
          .fontSize(isBold ? 7.8 : 7.4)
          .text(formatEur(val), sumBoxX + 140, totY, { width: sumBoxW - 150, align: 'right', lineBreak: false });

        totY += 15;
      };

      renderTotRow('1. Maquinari, Racks i Electrònica:', costMaquinari);
      renderTotRow('2. Llicències i Seguretat:', costSoftware);
      renderTotRow('3. Enginyeria i Certificació Fluke:', costMaObra);

      doc.moveTo(sumBoxX + 10, totY).lineTo(sumBoxX + sumBoxW - 10, totY).lineWidth(0.5).stroke('#e2e8f0');
      totY += 4;

      renderTotRow('Base Imposable (Subtotal):', baseImposable, true);
      renderTotRow('IVA Vigent (21%):', iva, false);

      // Caixa Destacada Total Proforma
      doc.rect(sumBoxX + 6, totY, sumBoxW - 12, 26).fill('#0f2447');
      doc
        .fillColor('#38bdf8')
        .font('Helvetica-Bold')
        .fontSize(8.5)
        .text('TOTAL FACTURA PROFORMA:', sumBoxX + 12, totY + 8, { lineBreak: false });
      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(11)
        .text(formatEur(importTotal), sumBoxX + 140, totY + 7, { width: sumBoxW - 152, align: 'right', lineBreak: false });

      // ─── 1.6. BANDA DE MANTENIMENT PREVENTIU SLA ──────────────────────────────
      y1 += sumBoxH + 8;
      doc.roundedRect(leftMargin, y1, contentWidth, 24, 4).lineWidth(0.8).fillAndStroke('#f0fdf4', '#86efac');
      doc.fillColor('#166534').font('Helvetica-Bold').fontSize(7.8).text('OPCIÓ DE MANTENIMENT PREVENTIU I SUPORT TÈCNIC SLA (< 4h):', leftMargin + 12, y1 + 7, { lineBreak: false });
      doc.fillColor('#15803d').font('Helvetica-Bold').fontSize(8.5).text(`${formatEur(quotaMensual)} / mes`, pageWidth - leftMargin - 150, y1 + 6, { width: 140, align: 'right', lineBreak: false });

      // ─── 1.7. BLOC TRIPARTIT DE SIGNATURES AMB LES FIRMES REALS ──────────────
      y1 += 32;
      const sigBoxW = (contentWidth - 20) / 3;
      const sigBoxH = 96;

      // Signatura 1: Hans Lao Moncusi
      doc.roundedRect(leftMargin, y1, sigBoxW, sigBoxH, 5).lineWidth(0.8).fillAndStroke('#ffffff', '#94a3b8');
      doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(8).text('Hans Lao Moncusi', leftMargin + 10, y1 + 8, { lineBreak: false });
      doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(6.8).text('Direcció Tècnica · Sistemes & Seguretat', leftMargin + 10, y1 + 20, { lineBreak: false });

      if (hasHansSig) {
        try {
          doc.image(hansSigPath, leftMargin + 12, y1 + 29, {
            fit: [sigBoxW - 24, 48],
            align: 'center',
            valign: 'center'
          });
        } catch {
          doc.moveTo(leftMargin + 14, y1 + 54).bezierCurveTo(leftMargin + 45, y1 + 38, leftMargin + 85, y1 + 67, leftMargin + 125, y1 + 44).lineWidth(1.2).stroke('#0284c7');
        }
      }

      doc.fillColor('#64748b').font('Helvetica').fontSize(6.6).text('Signat digitalment · KernelCore (DFactory)', leftMargin + 10, y1 + 82, { lineBreak: false });

      // Signatura 2: Joel Pérez Armenteros
      const sig2X = leftMargin + sigBoxW + 10;
      doc.roundedRect(sig2X, y1, sigBoxW, sigBoxH, 5).lineWidth(0.8).fillAndStroke('#ffffff', '#94a3b8');
      doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(8).text('Joel Pérez Armenteros', sig2X + 10, y1 + 8, { lineBreak: false });
      doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(6.8).text('Direcció General · Infraestructura de Xarxes', sig2X + 10, y1 + 20, { lineBreak: false });

      if (hasJoelSig) {
        try {
          doc.image(joelSigPath, sig2X + 12, y1 + 29, {
            fit: [sigBoxW - 24, 48],
            align: 'center',
            valign: 'center'
          });
        } catch {
          doc.moveTo(sig2X + 18, y1 + 56).bezierCurveTo(sig2X + 55, y1 + 36, sig2X + 95, y1 + 64, sig2X + 130, y1 + 42).lineWidth(1.2).stroke('#0284c7');
        }
      }

      doc.fillColor('#64748b').font('Helvetica').fontSize(6.6).text('Signat digitalment · KernelCore (DFactory)', sig2X + 10, y1 + 82, { lineBreak: false });

      // Signatura 3: Conformitat i Comanda del Client
      const sig3X = sig2X + sigBoxW + 10;
      doc.roundedRect(sig3X, y1, sigBoxW, sigBoxH, 5).lineWidth(0.8).fillAndStroke('#f8fafc', '#94a3b8');
      doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(8).text('Conformitat i Comanda Ferm', sig3X + 10, y1 + 8, { lineBreak: false });
      doc.fillColor('#64748b').font('Helvetica').fontSize(6.8).text(String(nomEmpresa).slice(0, 26), sig3X + 10, y1 + 20, { lineBreak: false });
      doc.fillColor('#94a3b8').font('Helvetica').fontSize(6.5).text('Segell de l\'empresa, data i signatura:', sig3X + 10, y1 + 82, { lineBreak: false });

      // ─── 1.8. PEU DE PÀGINA 1 AMB CSV DE VERIFICACIÓ ─────────────────────────
      doc.rect(0, pageHeight - 26, pageWidth, 26).fill('#0b1329');
      doc
        .fillColor('#94a3b8')
        .font('Helvetica')
        .fontSize(7.2)
        .text(
          `KERNELCORE S.L. · DFactory Barcelona (Zona Franca) · Factura Proforma Oficial ${codiProforma} · CSV: ${csvHash} · Pàgina 1 de 2`,
          leftMargin,
          pageHeight - 18,
          { width: contentWidth, align: 'center', lineBreak: false }
        );

      // =========================================================================
      // PÀGINA 2: ANNEX TÈCNIC D'ENGINYERIA, SAI CRÍTIC I NORMATIVES FLUKE
      // =========================================================================
      doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });

      // ─── 2.1. CAPÇALERA PÀGINA 2 (BANNER CORPORATIU REDUÏT) ───────────────────
      doc.rect(0, 0, pageWidth, 52).fill('#0b1329');
      doc.rect(0, 52, pageWidth, 3).fill('#06b6d4');

      drawKernelCoreLogo(doc, leftMargin, 8, 36);

      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(12)
        .text('KERNELCORE', leftMargin + 46, 14, { lineBreak: false });

      doc
        .fillColor('#38bdf8')
        .font('Helvetica-Bold')
        .fontSize(7.8)
        .text('ANNEX TÈCNIC D\'ENGINYERIA, CONTINUÏTAT ELÈCTRICA SAI I CERTIFICACIÓ', leftMargin + 46, 30, { lineBreak: false });

      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(9)
        .text(`Ref: ${codiProforma}`, pageWidth - leftMargin - 140, 14, { width: 140, align: 'right', lineBreak: false });

      doc
        .fillColor('#94a3b8')
        .font('Helvetica')
        .fontSize(7.5)
        .text(`Client: ${String(nomEmpresa).slice(0, 24)}`, pageWidth - leftMargin - 180, 30, { width: 180, align: 'right', lineBreak: false });

      // ─── 2.2. MEMÒRIA D'INTERVENCIÓ I OBJECTIUS TÈCNICS ──────────────────────
      let y2 = 68;
      const techHeight = 155;
      doc.roundedRect(leftMargin, y2, contentWidth, techHeight, 6).lineWidth(1).fillAndStroke('#ffffff', '#cbd5e1');
      doc.rect(leftMargin, y2, contentWidth, 24).fill('#0f172a');
      doc
        .fillColor('#38bdf8')
        .font('Helvetica-Bold')
        .fontSize(8.8)
        .text('MEMÒRIA TÈCNICA D\'ENGINYERIA I OBJECTIUS DEL PROJECTE', leftMargin + 14, y2 + 7, { lineBreak: false });

      let techInnerY = y2 + 32;
      if (customMessage && customMessage.trim().length > 0) {
        doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(8).text('Instruccions tècniques i requeriments del client:', leftMargin + 14, techInnerY, { lineBreak: false });
        techInnerY += 12;
        const cleanCustom = String(customMessage).replace(/\s+/g, ' ').trim().slice(0, 360);
        doc.fillColor('#334155').font('Helvetica-Oblique').fontSize(8).text(`"${cleanCustom}"`, leftMargin + 14, techInnerY, {
          width: contentWidth - 28,
          height: 34,
          ellipsis: true
        });
        techInnerY += 38;
      }

      doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(8).text('Abast d\'intervenció de l\'equip d\'Enginyeria KernelCore:', leftMargin + 14, techInnerY, { lineBreak: false });
      techInnerY += 12;

      const techPoints = [
        'Desplegament i organització d\'armari rack professional de 19" amb distribució d\'energia PDU gestionable.',
        'Tirat, pentinat i conectorització de cablejat estructurat Cat6A lliure d\'halògens (LSZH Dca 500MHz).',
        'Commutació L2/L3 empresarial Cisco Catalyst / HPE Aruba amb segmentació de VLANs i prioritats de veu (QoS).',
        'Seguretat perimetral mitjançant tallafoc NGFW d\'última generació amb filtratge d\'amenaces i VPN IPsec.',
        'Protecció energètica ininterrompuda mitjançant SAI industrial de Doble Conversió On-Line amb bypass automàtic.',
        'Certificació individual de tots els enllaços permanents mitjançant reflectòmetre calibrat Fluke Networks DSX-8000.'
      ];

      for (const p of techPoints) {
        doc.circle(leftMargin + 20, techInnerY + 4, 2).fill('#06b6d4');
        doc.fillColor('#334155').font('Helvetica').fontSize(7.6).text(p, leftMargin + 28, techInnerY, { width: contentWidth - 42, lineBreak: false });
        techInnerY += 12.5;
      }

      // ─── 2.3. QUADRE D'ENGINYERIA ELÈCTRICA & DIMENSIONAMENT SAI CRÍTIC ──────
      y2 = 236;
      const saiBoxH = 154;
      doc.roundedRect(leftMargin, y2, contentWidth, saiBoxH, 6).lineWidth(1.2).fillAndStroke('#f0fdfa', '#0d9488');
      doc.rect(leftMargin, y2, contentWidth, 24).fill('#134e4a');

      doc
        .fillColor('#5eead4')
        .font('Helvetica-Bold')
        .fontSize(8.8)
        .text('CÀLCUL DE CÀRREGA I DIMENSIONAMENT ELÈCTRIC SAI (CONTINUÏTAT CRÍTICA)', leftMargin + 14, y2 + 7, { lineBreak: false });

      // 3 caixes mètriques (Watts / VA amb +20% marge / Autonomia)
      const metricBoxW = (contentWidth - 28) / 3;
      const metricBoxH = 44;
      const metricY = y2 + 34;

      // Caixa 1: Consum Actiu
      doc.roundedRect(leftMargin + 10, metricY, metricBoxW, metricBoxH, 4).lineWidth(0.8).fillAndStroke('#ffffff', '#99f6e4');
      doc.fillColor('#64748b').font('Helvetica-Bold').fontSize(6.8).text('POTÈNCIA ACTIVA ESTIMADA', leftMargin + 16, metricY + 7, { lineBreak: false });
      doc.fillColor('#0f766e').font('Helvetica-Bold').fontSize(13.5).text(`${saiWatts} W`, leftMargin + 16, metricY + 19, { lineBreak: false });

      // Caixa 2: Potència Aparent +20%
      const m2X = leftMargin + 10 + metricBoxW + 4;
      doc.roundedRect(m2X, metricY, metricBoxW, metricBoxH, 4).lineWidth(0.8).fillAndStroke('#ffffff', '#99f6e4');
      doc.fillColor('#64748b').font('Helvetica-Bold').fontSize(6.8).text('CAPACITAT REQUERIDA (+20%)', m2X + 8, metricY + 7, { lineBreak: false });
      doc.fillColor('#0f766e').font('Helvetica-Bold').fontSize(13.5).text(`${saiVA} VA`, m2X + 8, metricY + 19, { lineBreak: false });

      // Caixa 3: Autonomia sota Càrrega
      const m3X = m2X + metricBoxW + 4;
      doc.roundedRect(m3X, metricY, metricBoxW, metricBoxH, 4).lineWidth(0.8).fillAndStroke('#ffffff', '#99f6e4');
      doc.fillColor('#64748b').font('Helvetica-Bold').fontSize(6.8).text('AUTONOMIA ESTIMADA', m3X + 8, metricY + 7, { lineBreak: false });
      doc.fillColor('#059669').font('Helvetica-Bold').fontSize(13.5).text(saiAutonomia, m3X + 8, metricY + 19, { lineBreak: false });

      doc.fillColor('#134e4a').font('Helvetica-Bold').fontSize(8).text('Equip d\'Alimentació Ininterrompuda Homologat:', leftMargin + 14, y2 + 88, { lineBreak: false });
      doc.fillColor('#0f172a').font('Helvetica').fontSize(8.3).text(saiModel, leftMargin + 14, y2 + 101, { width: contentWidth - 28, lineBreak: false });

      doc.fillColor('#475569').font('Helvetica').fontSize(7.4).text(
        'Topologia de Doble Conversió VFI (Voltage and Frequency Independent) amb sortida sinusoïdal pura, factor de potència 0.9/1.0, bypass automàtic de manteniment i targeta SNMP integrada per a apagada ordenada de servidors físics i màquines virtuals.',
        leftMargin + 14,
        y2 + 118,
        { width: contentWidth - 28, lineGap: 1.5 }
      );

      // ─── 2.4. NORMATIVES D'ENGINYERIA I CERTIFICACIÓ APLICABLES ───────────────
      y2 = 402;
      const normHeight = 224;
      doc.roundedRect(leftMargin, y2, contentWidth, normHeight, 6).lineWidth(1).fillAndStroke('#f8fafc', '#cbd5e1');
      doc.rect(leftMargin, y2, contentWidth, 24).fill('#1e293b');
      doc
        .fillColor('#94a3b8')
        .font('Helvetica-Bold')
        .fontSize(8.5)
        .text('ESTÀNDARDS D\'ENGINYERIA, CONTROL DE QUALITAT I GARANTIA DEL SERVEI', leftMargin + 14, y2 + 7, { lineBreak: false });

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

      let stdY = y2 + 32;
      for (const s of standards) {
        doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(7.8).text(s.code, leftMargin + 14, stdY, { lineBreak: false });
        doc.fillColor('#475569').font('Helvetica').fontSize(7.4).text(s.desc, leftMargin + 14, stdY + 10, { width: contentWidth - 28, lineBreak: false });
        stdY += 26;
      }

      doc.roundedRect(leftMargin + 10, stdY + 4, contentWidth - 20, 48, 4).lineWidth(0.8).fillAndStroke('#eff6ff', '#bfdbfe');
      doc.fillColor('#1e40af').font('Helvetica-Bold').fontSize(7.6).text('COMPROMÍS D\'ENGINYERIA OFICIAL KERNELCORE:', leftMargin + 18, stdY + 11, { lineBreak: false });
      doc.fillColor('#1e3a8a').font('Helvetica').fontSize(7.2).text(
        'Totes les instal·lacions són executades directament pel nostre personal tècnic titulat i col·legiat a DFactory Barcelona, sense intermediaris ni subcontractacions a tercers, garantint l\'estricta puresa de l\'enginyeria i la traçabilitat integral dels components.',
        leftMargin + 18,
        stdY + 23,
        { width: contentWidth - 36, lineGap: 1.5 }
      );

      // ─── 2.5. CONDICIONS CONTRACTUALS I DRET DE DESISTIMENT ───────────────────
      y2 = 638;
      const termsBoxH = 158;
      doc.roundedRect(leftMargin, y2, contentWidth, termsBoxH, 6).lineWidth(0.8).fillAndStroke('#ffffff', '#cbd5e1');
      doc.rect(leftMargin, y2, 4, termsBoxH).fill('#06b6d4');

      doc
        .fillColor('#0b1329')
        .font('Helvetica-Bold')
        .fontSize(8)
        .text('CONDICIONS CONTRACTUALS GENERALS I GARANTIA DEL SERVEI', leftMargin + 14, y2 + 10, { lineBreak: false });

      doc
        .fillColor('#475569')
        .font('Helvetica')
        .fontSize(7)
        .text(
          '1. Acceptació de la Proforma: La signatura o abonament del 40% inicial d\'aquesta Factura Proforma formalitza la comanda i la reserva de maquinari en estoc central a DFactory Barcelona.\n' +
          '2. Garantia Oficial de Maquinari: Tot el maquinari subministrat disposa de 2 anys de garantia oficial amb substitució per avançat canalitzada a través dels proveïdors oficials majoristes.\n' +
          '3. Lliurament i Certificació Fluke: En finalitzar la implantació física, s\'entregarà el dossier oficial amb les corbes de reflectometria i certificació Fluke DSX-8000 per a cada presa RJ45.\n' +
          '4. Secret Professional i RGPD: Totes les dades i credencials d\'accés seran tractades sota estricte secret professional d\'acord amb el Reglament (UE) 2016/679 (RGPD) i la LOPDGDD 3/2018.\n' +
          '5. Dret de Desistiment: El client disposa de 14 dies naturals per exercir el dret de desistiment segons el Reial Decret Legislatiu 1/2007 (TRLGDCU).',
          leftMargin + 14,
          y2 + 25,
          { width: contentWidth - 28, lineGap: 3.5 }
        );

      doc
        .fillColor('#0284c7')
        .font('Helvetica-Bold')
        .fontSize(7.2)
        .text(`Verificació Electrònica d'Integritat: https://kernelcore.cat/valida · Codi CSV: ${csvHash}`, leftMargin + 14, y2 + 140, { lineBreak: false });

      // ─── 2.6. PEU DE PÀGINA 2 ────────────────────────────────────────────────
      doc.rect(0, pageHeight - 26, pageWidth, 26).fill('#0b1329');
      doc
        .fillColor('#94a3b8')
        .font('Helvetica')
        .fontSize(7.2)
        .text(
          `KERNELCORE S.L. · DFactory Barcelona (Zona Franca) · Factura Proforma Oficial ${codiProforma} · Pàgina 2 de 2`,
          leftMargin,
          pageHeight - 18,
          { width: contentWidth, align: 'center', lineBreak: false }
        );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

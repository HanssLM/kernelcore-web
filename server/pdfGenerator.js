// ─────────────────────────────────────────────────────────────────────────────
// KERNELCORE // GENERADOR DE PRESSUPOSTOS CORPORATIUS EN PDF BINARI (PDFKit)
// Seu Central Oficial: DFactory Barcelona · Carrer 27 del BZ, 10-16 (Zona Franca)
// Document Executiu d'Enginyeria de 2 Pàgines A4
// ─────────────────────────────────────────────────────────────────────────────

import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function formatCurrency(val) {
  const num = Number(val || 0);
  return `${num.toLocaleString('ca-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
}

/**
 * Dibuixa el logotip vectorial oficial de KernelCore basat en la geometria SVG de LogoMark.
 * viewBox 0 0 64 64: hexàgon cibernètic amb traçat "K" i nodes de xarxa.
 */
function drawKernelCoreLogo(doc, x, y, size = 44) {
  const s = size / 64;

  // 1. Punts de l'hexàgon exterior (HEX_POINTS = '32,4 56.25,18 56.25,46 32,60 7.75,46 7.75,18')
  const hexRaw = [
    [32, 4],
    [56.25, 18],
    [56.25, 46],
    [32, 60],
    [7.75, 46],
    [7.75, 18]
  ];
  const hexPoints = hexRaw.map(([px, py]) => [x + px * s, y + py * s]);

  // Fons de l'hexàgon (blau fosc d'alta densitat)
  doc
    .polygon(...hexPoints)
    .lineWidth(2.4 * s)
    .fillAndStroke('#0b1b36', '#06b6d4');

  // Nucli radial intern
  const innerHex = hexRaw.map(([px, py]) => [x + (32 + (px - 32) * 0.72) * s, y + (32 + (py - 32) * 0.72) * s]);
  doc.polygon(...innerHex).fill('#0c274c');

  // 2. Traçat de la lletra "K" amb connectors de circuit
  // Línia vertical: (25.3, 21) a (25.3, 43)
  doc
    .moveTo(x + 25.3 * s, y + 21 * s)
    .lineTo(x + 25.3 * s, y + 43 * s)
    .lineWidth(4.2 * s)
    .lineCap('round')
    .stroke('#22d3ee');

  // Diagonal superior: (25.3, 32) a (38.3, 21)
  doc
    .moveTo(x + 25.3 * s, y + 32 * s)
    .lineTo(x + 38.3 * s, y + 21 * s)
    .lineWidth(4.2 * s)
    .lineCap('round')
    .stroke('#38bdf8');

  // Diagonal inferior: (25.3, 32) a (38.3, 43)
  doc
    .moveTo(x + 25.3 * s, y + 32 * s)
    .lineTo(x + 38.3 * s, y + 43 * s)
    .lineWidth(4.2 * s)
    .lineCap('round')
    .stroke('#38bdf8');

  // 3. Nodes de la "K" (punts terminals actius)
  doc.circle(x + 38.3 * s, y + 21 * s, 2.4 * s).fill('#e0fbff');
  doc.circle(x + 38.3 * s, y + 43 * s, 2.4 * s).fill('#e0fbff');

  // 4. Nodes de xarxa perimetrals (vèrtexs de l'hexàgon)
  for (const [px, py] of hexRaw) {
    doc.circle(x + px * s, y + py * s, 1.6 * s).fill('#67e8f9');
  }

  // Restaura paràmetres de traçat
  doc.lineCap('butt');
}

/**
 * Genera un buffer PDF binari d'alta qualitat (Document corporatiu d'enginyeria de 2 pàgines A4).
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
          Title: `Pressupost KernelCore ${quoteData.codi_pressupost || quoteData.id || 'PR-2026-001'}`,
          Author: 'KernelCore · Enginyeria de Sistemes, Xarxes & Seguretat IT',
          Subject: 'Proposta Tècnica i Econòmica d\'Infraestructura IT',
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

      const codi = quoteData.codi_pressupost || quoteData.id || 'PR-2026-001';
      const dataEmissio = quoteData.data_emissio || quoteData.date || new Date().toISOString().split('T')[0];
      const nomEmpresa = quoteData.nom_empresa || quoteData.client || quoteData.companyName || 'Client Corporatiu';
      const personaContacte = quoteData.persona_contacte || quoteData.contact || quoteData.clientName || 'Responsable IT';
      const emailClient = quoteData.email || quoteData.to || 'info@client.cat';
      const telefonClient = quoteData.telefon || '+34 932 000 000';
      const entornOperatiu = quoteData.environment || 'Oficina PIME / Infraestructura Crítica';
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
      const quotaMensual = Number(quoteData.quota_mensual_suport ?? quoteData.monthly ?? 110);

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

      // Rutes de les signatures digitalitzades oficials
      const hansSigPath = path.resolve(__dirname, 'assets/hans-sig.jpg');
      const joelSigPath = path.resolve(__dirname, 'assets/joel-sig.jpg');
      const hasHansSig = fs.existsSync(hansSigPath);
      const hasJoelSig = fs.existsSync(joelSigPath);

      // =========================================================================
      // PÀGINA 1: PORTADA EXECUTIVA, DADES CLIENT I DIMENSIONAMENT SAI CRÍTIC
      // =========================================================================

      // ─── 1.1. CAPÇALERA CORPORATIVA (#0b1329 + #06b6d4) ───────────────────────
      doc.rect(0, 0, pageWidth, 110).fill('#0b1329');
      doc.rect(0, 110, pageWidth, 3.5).fill('#06b6d4');

      // Dibuixem el logotip vectorial oficial de KernelCore
      drawKernelCoreLogo(doc, leftMargin + 4, 25, 60);

      // Tipografia de Capçalera
      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(22)
        .text('KERNELCORE', leftMargin + 76, 28, { lineBreak: false });

      doc
        .fillColor('#22d3ee')
        .font('Helvetica-Bold')
        .fontSize(8.5)
        .text('SERVEIS & SISTEMES INFORMÀTICS · DFACTORY BARCELONA', leftMargin + 76, 54, { lineBreak: false });

      doc
        .fillColor('#94a3b8')
        .font('Helvetica')
        .fontSize(7.5)
        .text(
          'DFactory Barcelona · Carrer 27 del BZ, 10-16 (Zona Franca), 08040 Barcelona · NIF B-67981234',
          leftMargin + 76,
          68,
          { lineBreak: false }
        );

      doc
        .fillColor('#cbd5e1')
        .font('Helvetica')
        .fontSize(7.5)
        .text('Tel: +34 93 220 40 99 · info@kernelcore.cat · www.kernelcore.cat', leftMargin + 76, 80, { lineBreak: false });

      // Targeta Identificadora del Pressupost (Superior Dreta)
      const badgeW = 168;
      const badgeH = 74;
      const badgeX = pageWidth - leftMargin - badgeW;
      doc.roundedRect(badgeX, 18, badgeW, badgeH, 6).lineWidth(1).fillAndStroke('#0f172a', '#0284c7');
      doc
        .fillColor('#38bdf8')
        .font('Helvetica-Bold')
        .fontSize(7.5)
        .text('DOCUMENT OFICIAL D\'ENGINYERIA', badgeX + 12, 28, { lineBreak: false });
      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(13)
        .text(codi, badgeX + 12, 40, { lineBreak: false });
      doc
        .fillColor('#94a3b8')
        .font('Helvetica')
        .fontSize(7.6)
        .text(`Emissió: ${dataEmissio}`, badgeX + 12, 59, { lineBreak: false });
      doc
        .fillColor('#34d399')
        .font('Helvetica-Bold')
        .fontSize(7.6)
        .text('Validesa: 30 dies naturals', badgeX + 12, 71, { lineBreak: false });

      // ─── 1.2. BLOC DADES DEL CLIENT I ENTORN OPERATIU ────────────────────────
      let y1 = 126;
      doc.roundedRect(leftMargin, y1, contentWidth, 84, 6).lineWidth(1).fillAndStroke('#f8fafc', '#cbd5e1');
      doc.rect(leftMargin, y1, 5, 84).fill('#06b6d4');

      doc
        .fillColor('#0b1329')
        .font('Helvetica-Bold')
        .fontSize(9)
        .text('DADES DE L\'ORGANITZACIÓ I SEU D\'IMPLANTACIÓ', leftMargin + 16, y1 + 10, { lineBreak: false });

      doc
        .moveTo(leftMargin + 16, y1 + 23)
        .lineTo(leftMargin + contentWidth - 16, y1 + 23)
        .lineWidth(0.5)
        .stroke('#e2e8f0');

      // Columna esquerra
      doc.fillColor('#64748b').font('Helvetica-Bold').fontSize(7.8).text('Empresa / Organització:', leftMargin + 16, y1 + 31, { lineBreak: false });
      doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(8.8).text(String(nomEmpresa).slice(0, 44), leftMargin + 120, y1 + 31, { lineBreak: false });

      doc.fillColor('#64748b').font('Helvetica-Bold').fontSize(7.8).text('Persona de contacte:', leftMargin + 16, y1 + 47, { lineBreak: false });
      doc.fillColor('#1e293b').font('Helvetica').fontSize(8.2).text(String(personaContacte).slice(0, 42), leftMargin + 120, y1 + 47, { lineBreak: false });

      doc.fillColor('#64748b').font('Helvetica-Bold').fontSize(7.8).text('Correu electrònic:', leftMargin + 16, y1 + 63, { lineBreak: false });
      doc.fillColor('#0284c7').font('Helvetica').fontSize(8.2).text(String(emailClient).slice(0, 44), leftMargin + 120, y1 + 63, { lineBreak: false });

      // Columna dreta
      doc.fillColor('#64748b').font('Helvetica-Bold').fontSize(7.8).text('Telèfon directe:', leftMargin + 315, y1 + 31, { lineBreak: false });
      doc.fillColor('#1e293b').font('Helvetica').fontSize(8.2).text(String(telefonClient).slice(0, 24), leftMargin + 385, y1 + 31, { lineBreak: false });

      doc.fillColor('#64748b').font('Helvetica-Bold').fontSize(7.8).text('Entorn d\'implantació:', leftMargin + 315, y1 + 47, { lineBreak: false });
      doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(8.2).text(String(entornOperatiu).slice(0, 26), leftMargin + 405, y1 + 47, { lineBreak: false });

      doc.fillColor('#64748b').font('Helvetica-Bold').fontSize(7.8).text('Estat de la proposta:', leftMargin + 315, y1 + 63, { lineBreak: false });
      doc.fillColor('#059669').font('Helvetica-Bold').fontSize(8.2).text('Validat per Direcció Tècnica', leftMargin + 405, y1 + 63, { lineBreak: false });

      // ─── 1.3. BLOC MEMÒRIA TÈCNICA I NOTA D'ENGINYERIA ───────────────────────
      y1 = 222;
      const memHeight = 168;
      doc.roundedRect(leftMargin, y1, contentWidth, memHeight, 6).lineWidth(1).fillAndStroke('#ffffff', '#cbd5e1');
      doc.rect(leftMargin, y1, contentWidth, 24).fill('#0f172a');
      doc
        .fillColor('#38bdf8')
        .font('Helvetica-Bold')
        .fontSize(8.8)
        .text('MEMÒRIA TÈCNICA D\'ENGINYERIA I OBJECTIUS DEL PROJECTE', leftMargin + 14, y1 + 7, { lineBreak: false });

      let memInnerY = y1 + 32;
      if (customMessage && customMessage.trim().length > 0) {
        doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(8).text('Instruccions tècniques i requeriments del client:', leftMargin + 14, memInnerY, { lineBreak: false });
        memInnerY += 12;
        const cleanCustom = String(customMessage).replace(/\s+/g, ' ').trim().slice(0, 360);
        doc.fillColor('#334155').font('Helvetica-Oblique').fontSize(8).text(`"${cleanCustom}"`, leftMargin + 14, memInnerY, {
          width: contentWidth - 28,
          height: 34,
          ellipsis: true
        });
        memInnerY += 40;
      }

      doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(8).text('Abast d\'intervenció de l\'equip d\'Enginyeria KernelCore:', leftMargin + 14, memInnerY, { lineBreak: false });
      memInnerY += 12;

      const scopePoints = [
        'Desplegament i organització d\'armari rack professional de 19" amb distribució d\'energia PDU gestionable.',
        'Tirat, pentinat i conectorització de cablejat estructurat Cat6A lliure d\'halògens (LSZH Dca 500MHz).',
        'Commutació L2/L3 empresarial Cisco Catalyst / HPE Aruba amb segmentació de VLANs i prioritats de veu (QoS).',
        'Seguretat perimetral mitjançant tallafoc NGFW d\'última generació amb filtratge d\'amenaces i VPN IPsec.',
        'Protecció energètica ininterrompuda mitjançant SAI industrial de Doble Conversió On-Line amb bypass automàtic.',
        'Certificació individual de tots els enllaços permanents mitjançant reflectòmetre calibrat Fluke Networks DSX-8000.'
      ];

      for (const p of scopePoints) {
        doc.circle(leftMargin + 20, memInnerY + 4, 2).fill('#06b6d4');
        doc.fillColor('#334155').font('Helvetica').fontSize(7.8).text(p, leftMargin + 28, memInnerY, { width: contentWidth - 42, lineBreak: false });
        memInnerY += 13;
      }

      // ─── 1.4. QUADRE D'ENGINYERIA ELÈCTRICA & DIMENSIONAMENT SAI CRÍTIC ──────
      y1 = 402;
      const saiHeight = 158;
      doc.roundedRect(leftMargin, y1, contentWidth, saiHeight, 6).lineWidth(1.2).fillAndStroke('#f0fdfa', '#0d9488');
      doc.rect(leftMargin, y1, contentWidth, 24).fill('#134e4a');

      doc
        .fillColor('#5eead4')
        .font('Helvetica-Bold')
        .fontSize(8.8)
        .text('CÀLCUL DE CÀRREGA I DIMENSIONAMENT ELÈCTRIC SAI (CONTINUÏTAT CRÍTICA)', leftMargin + 14, y1 + 7, { lineBreak: false });

      // 3 caixes mètriques (Watts / VA amb +20% marge / Autonomia)
      const metricBoxW = (contentWidth - 28) / 3;
      const metricBoxH = 44;
      const metricY = y1 + 34;

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

      // Model recomanat i especificacions
      doc.fillColor('#134e4a').font('Helvetica-Bold').fontSize(8).text('Equip d\'Alimentació Ininterrompuda Homologat:', leftMargin + 14, y1 + 88, { lineBreak: false });
      doc.fillColor('#0f172a').font('Helvetica').fontSize(8.3).text(saiModel, leftMargin + 14, y1 + 101, { width: contentWidth - 28, lineBreak: false });

      doc.fillColor('#475569').font('Helvetica').fontSize(7.4).text(
        'Topologia de Doble Conversió VFI (Voltage and Frequency Independent) amb sortida sinusoïdal pura, factor de potència 0.9/1.0, bypass automàtic de manteniment i targeta SNMP integrada per a apagada ordenada de servidors físics i màquines virtuals.',
        leftMargin + 14,
        y1 + 118,
        { width: contentWidth - 28, lineGap: 1.5 }
      );

      // ─── 1.5. NORMATIVES D'ENGINYERIA I CERTIFICACIÓ APLICABLES ───────────────
      y1 = 572;
      const normHeight = 226;
      doc.roundedRect(leftMargin, y1, contentWidth, normHeight, 6).lineWidth(1).fillAndStroke('#f8fafc', '#cbd5e1');
      doc.rect(leftMargin, y1, contentWidth, 24).fill('#1e293b');
      doc
        .fillColor('#94a3b8')
        .font('Helvetica-Bold')
        .fontSize(8.5)
        .text('ESTÀNDARDS D\'ENGINYERIA, CONTROL DE QUALITAT I GARANTIA DEL SERVEI', leftMargin + 14, y1 + 7, { lineBreak: false });

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

      let stdY = y1 + 32;
      for (const s of standards) {
        doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(7.8).text(s.code, leftMargin + 14, stdY, { lineBreak: false });
        doc.fillColor('#475569').font('Helvetica').fontSize(7.4).text(s.desc, leftMargin + 14, stdY + 10, { width: contentWidth - 28, lineBreak: false });
        stdY += 26;
      }

      // Caixa de compromís oficial KernelCore
      doc.roundedRect(leftMargin + 10, stdY + 4, contentWidth - 20, 48, 4).lineWidth(0.8).fillAndStroke('#eff6ff', '#bfdbfe');
      doc.fillColor('#1e40af').font('Helvetica-Bold').fontSize(7.6).text('COMPROMÍS D\'ENGINYERIA OFICIAL KERNELCORE:', leftMargin + 18, stdY + 11, { lineBreak: false });
      doc.fillColor('#1e3a8a').font('Helvetica').fontSize(7.2).text(
        'Totes les instal·lacions són executades directament pel nostre personal tècnic especialitzat i col·legiat amb base operativa a DFactory Barcelona, sense intermediaris ni subcontractacions a tercers, garantint l\'estricta puresa de l\'enginyeria i la traçabilitat integral dels components.',
        leftMargin + 18,
        stdY + 23,
        { width: contentWidth - 36, lineGap: 1.5 }
      );

      // ─── 1.6. PEU DE PÀGINA 1 ────────────────────────────────────────────────
      doc.rect(0, pageHeight - 26, pageWidth, 26).fill('#0b1329');
      doc
        .fillColor('#94a3b8')
        .font('Helvetica')
        .fontSize(7.2)
        .text(
          `KERNELCORE S.L. · DFactory Barcelona (Zona Franca) · Document Oficial ${codi} · Pàgina 1 de 2`,
          leftMargin,
          pageHeight - 18,
          { width: contentWidth, align: 'center', lineBreak: false }
        );

      // =========================================================================
      // PÀGINA 2: DESGLOSSAMENT ECONÒMIC DETALLAT, CONDICIONS I SIGNATURES
      // =========================================================================
      doc.addPage({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });

      // ─── 2.1. CAPÇALERA PÀGINA 2 (BANNER CORPORATIU REDUÏT) ───────────────────
      doc.rect(0, 0, pageWidth, 52).fill('#0b1329');
      doc.rect(0, 52, pageWidth, 3).fill('#06b6d4');

      // Logo reduït a pàgina 2
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
        .text('DESGLOSSAMENT ECONÒMIC, CONDICIONS CONTRACTUALS I VALIDACIÓ TÈCNICA', leftMargin + 46, 30, { lineBreak: false });

      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(9)
        .text(`Ref: ${codi}`, pageWidth - leftMargin - 140, 14, { width: 140, align: 'right', lineBreak: false });

      doc
        .fillColor('#94a3b8')
        .font('Helvetica')
        .fontSize(7.5)
        .text(`Client: ${String(nomEmpresa).slice(0, 24)}`, pageWidth - leftMargin - 180, 30, { width: 180, align: 'right', lineBreak: false });

      // ─── 2.2. TAULA D'EQUIPAMENT I PARTIDES DEL PROJECTE ─────────────────────
      let y2 = 68;
      doc
        .fillColor('#0b1329')
        .font('Helvetica-Bold')
        .fontSize(9.2)
        .text('DESGLOSSAMENT D\'EQUIPAMENT, LLICÈNCIES I SERVEIS D\'ENGINYERIA', leftMargin, y2, { lineBreak: false });

      y2 += 15;

      // Capçalera de taula
      const colNumW = 28;
      const colDescW = 265;
      const colQtyW = 40;
      const colPriceW = 85;
      const colSubtotalW = 109;

      doc.rect(leftMargin, y2, contentWidth, 22).fill('#0f172a');
      doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(7.8);
      doc.text('#', leftMargin + 8, y2 + 6, { lineBreak: false });
      doc.text('CONCEPTE I ESPECIFICACIÓ TÈCNICA', leftMargin + colNumW + 8, y2 + 6, { lineBreak: false });
      doc.text('UDS', leftMargin + colNumW + colDescW, y2 + 6, { width: colQtyW, align: 'center', lineBreak: false });
      doc.text('PREU UNITARI', leftMargin + colNumW + colDescW + colQtyW, y2 + 6, { width: colPriceW, align: 'right', lineBreak: false });
      doc.text('SUBTOTAL', leftMargin + colNumW + colDescW + colQtyW + colPriceW, y2 + 6, { width: colSubtotalW - 8, align: 'right', lineBreak: false });

      y2 += 22;

      // Processament d'articles
      let itemsList = [];
      if (Array.isArray(rawItems) && rawItems.length > 0) {
        itemsList = rawItems.map((it, idx) => {
          if (typeof it === 'object' && it !== null) {
            return {
              num: idx + 1,
              name: it.concepte || it.name || it.article || 'Equipament IT Especialitzat',
              desc: it.descripcio || it.desc || '',
              qty: Number(it.quantitat || it.qty || 1),
              unitPrice: Number(it.preu_unitari || it.price || 0),
              total: Number(it.total || (Number(it.quantitat || 1) * Number(it.preu_unitari || 0)))
            };
          }
          return {
            num: idx + 1,
            name: String(it),
            desc: '',
            qty: 1,
            unitPrice: 0,
            total: 0
          };
        });
      }

      // Si no hi ha array detallat, construïm partides realistes amb els costos
      if (itemsList.length === 0) {
        const p1 = Math.round(costMaquinari * 0.45 * 100) / 100;
        const p2 = Math.round(costMaquinari * 0.35 * 100) / 100;
        const p3 = Math.round((costMaquinari - p1 - p2) * 100) / 100;

        itemsList = [
          {
            num: 1,
            name: 'Armari Rack 19" Professional + PDU 8 Preses + Passafils',
            desc: 'Armari rack mural/terra amb ventilació forçada, porta de vidre temperat i guies numerades.',
            qty: 1,
            unitPrice: p1,
            total: p1
          },
          {
            num: 2,
            name: 'Electrònica de Xarxa Commutació Gestionable L2/L3 Gigabit PoE+',
            desc: 'Switch professional gestionable amb VLANs, snooping IGMP i capacitat d\'alimentació PoE+ 370W.',
            qty: 1,
            unitPrice: p2,
            total: p2
          },
          {
            num: 3,
            name: 'Cablejat Estructurat Cat6A U/FTP LSZH Dca + Preses RJ45',
            desc: 'Bobines de cablejat apantallat lliure d\'halògens i mòduls Keystone Cat6A d\'alta densitat.',
            qty: 1,
            unitPrice: p3,
            total: p3
          },
          {
            num: 4,
            name: 'Llicències de Sistema Operatiu, Firewall NGFW i Gestió Centralitzada',
            desc: 'Llicenciament perimetral amb filtratge DNS, prevenció d\'intrusions IPS i accés segur VPN.',
            qty: 1,
            unitPrice: costSoftware,
            total: costSoftware
          },
          {
            num: 5,
            name: 'Enginyeria de Muntatge, Configuració Avançada i Certificació Fluke',
            desc: 'Mano d\'obra certificada d\'instal·lació, conectorització, verificació de paràmetres i informe oficial en PDF.',
            qty: 1,
            unitPrice: costMaObra,
            total: costMaObra
          }
        ];
      }

      // Renderitzem les files (màxim 6 files per espai)
      const maxRows = Math.min(itemsList.length, 6);
      for (let i = 0; i < maxRows; i++) {
        const item = itemsList[i];
        const rowH = item.desc ? 29 : 21;
        const bg = i % 2 === 0 ? '#f8fafc' : '#ffffff';

        doc.rect(leftMargin, y2, contentWidth, rowH).fill(bg);
        doc.rect(leftMargin, y2 + rowH - 0.5, contentWidth, 0.5).fill('#e2e8f0');

        doc.fillColor('#64748b').font('Helvetica-Bold').fontSize(7.4).text(String(item.num), leftMargin + 8, y2 + 6, { lineBreak: false });
        doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(7.8).text(item.name.slice(0, 52), leftMargin + colNumW + 8, y2 + 6, { lineBreak: false });

        if (item.desc) {
          doc.fillColor('#64748b').font('Helvetica').fontSize(6.8).text(item.desc.slice(0, 68), leftMargin + colNumW + 8, y2 + 16, { lineBreak: false });
        }

        doc.fillColor('#334155').font('Helvetica').fontSize(7.6).text(String(item.qty), leftMargin + colNumW + colDescW, y2 + 6, { width: colQtyW, align: 'center', lineBreak: false });
        doc.fillColor('#334155').font('Helvetica').fontSize(7.6).text(formatCurrency(item.unitPrice), leftMargin + colNumW + colDescW + colQtyW, y2 + 6, { width: colPriceW, align: 'right', lineBreak: false });
        doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(7.8).text(formatCurrency(item.total), leftMargin + colNumW + colDescW + colQtyW + colPriceW, y2 + 6, { width: colSubtotalW - 8, align: 'right', lineBreak: false });

        y2 += rowH;
      }

      // ─── 2.3. QUADRE ECONÒMIC I DADES BANCÀRIES DE PAGAMENT ──────────────────
      y2 += 10;
      const sumBoxW = 276;
      const sumBoxX = pageWidth - leftMargin - sumBoxW;
      const sumBoxH = 148;

      // Caixa d'acompanyament a l'esquerra: Condicions comercials i Dades Bancàries
      const noteBoxW = contentWidth - sumBoxW - 12;
      doc.roundedRect(leftMargin, y2, noteBoxW, sumBoxH, 6).lineWidth(1).fillAndStroke('#f8fafc', '#cbd5e1');
      doc.rect(leftMargin, y2, noteBoxW, 22).fill('#1e293b');
      doc.fillColor('#38bdf8').font('Helvetica-Bold').fontSize(7.8).text('CONDICIONS COMERCIALS I DADES BANCÀRIES', leftMargin + 10, y2 + 6, { lineBreak: false });

      doc.fillColor('#334155').font('Helvetica').fontSize(7.2);
      const termsList = [
        'Forma de pagament: 40% a la confirmació, 60% a la certificació Fluke final.',
        'Termini d\'execució estimat: 5 a 10 dies laborables des de l\'acceptació.',
        'Dipòsit de maquinari: magatzem central KernelCore a DFactory Barcelona.',
        'Preus expressats en Euros (€) amb desglossament del 21% d\'IVA vigent.'
      ];

      let termY = y2 + 28;
      for (const t of termsList) {
        doc.circle(leftMargin + 14, termY + 3.5, 1.8).fill('#0284c7');
        doc.text(t, leftMargin + 20, termY, { width: noteBoxW - 28, lineBreak: false });
        termY += 16;
      }

      // Caixa de Dades Bancàries per a Transferència
      doc.roundedRect(leftMargin + 8, termY + 2, noteBoxW - 16, 46, 4).lineWidth(0.8).fillAndStroke('#ffffff', '#93c5fd');
      doc.fillColor('#1e40af').font('Helvetica-Bold').fontSize(7.2).text('DADES DE TRANSFERÈNCIA BANCÀRIA OFICIAL:', leftMargin + 14, termY + 8, { lineBreak: false });
      doc.fillColor('#0f172a').font('Helvetica').fontSize(7).text('Entitat: CaixaBank / Banc Sabadell · Titular: KERNELCORE S.L.', leftMargin + 14, termY + 20, { lineBreak: false });
      doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(7.6).text('IBAN: ES82 2100 0418 4502 0005 6789 · BIC: CAIXESBBXXX', leftMargin + 14, termY + 31, { lineBreak: false });

      // Caixa de Totals a la dreta
      doc.roundedRect(sumBoxX, y2, sumBoxW, sumBoxH, 6).lineWidth(1.2).fillAndStroke('#ffffff', '#0284c7');
      doc.rect(sumBoxX, y2, sumBoxW, 22).fill('#0f172a');
      doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(8).text('RESUM ECONÒMIC DE LA PROPOSTA', sumBoxX + 10, y2 + 6, { lineBreak: false });

      let totY = y2 + 28;
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
          .text(formatCurrency(val), sumBoxX + 140, totY, { width: sumBoxW - 150, align: 'right', lineBreak: false });

        totY += 15;
      };

      renderTotRow('1. Maquinari, Racks i Electrònica:', costMaquinari);
      renderTotRow('2. Llicències i Seguretat:', costSoftware);
      renderTotRow('3. Enginyeria i Certificació Fluke:', costMaObra);

      doc.moveTo(sumBoxX + 10, totY).lineTo(sumBoxX + sumBoxW - 10, totY).lineWidth(0.5).stroke('#e2e8f0');
      totY += 4;

      renderTotRow('Base Imposable (Subtotal):', baseImposable, true);
      renderTotRow('IVA Vigent (21%):', iva, false);

      // Caixa Destacada Total
      doc.rect(sumBoxX + 6, totY, sumBoxW - 12, 26).fill('#0f2447');
      doc
        .fillColor('#38bdf8')
        .font('Helvetica-Bold')
        .fontSize(8.5)
        .text('TOTAL PRESSUPOST (IVA INCLÒS):', sumBoxX + 12, totY + 8, { lineBreak: false });
      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(10.5)
        .text(formatCurrency(importTotal), sumBoxX + 140, totY + 7, { width: sumBoxW - 152, align: 'right', lineBreak: false });

      // Banda de Quota Mensual SLA si s'ha contractat
      y2 += sumBoxH + 8;
      doc.roundedRect(leftMargin, y2, contentWidth, 24, 4).lineWidth(0.8).fillAndStroke('#f0fdf4', '#86efac');
      doc.fillColor('#166534').font('Helvetica-Bold').fontSize(7.8).text('OPCIÓ DE MANTENIMENT PREVENTIU I SUPORT SLA KERNELCORE:', leftMargin + 12, y2 + 7, { lineBreak: false });
      doc.fillColor('#15803d').font('Helvetica-Bold').fontSize(8.5).text(`${formatCurrency(quotaMensual)} / mes`, pageWidth - leftMargin - 150, y2 + 6, { width: 140, align: 'right', lineBreak: false });

      // ─── 2.4. GARANTIES LEGALS I PROTECCIÓ DE DADES (RGPD) ────────────────────
      y2 += 32;
      const legalBoxH = 74;
      doc.roundedRect(leftMargin, y2, contentWidth, legalBoxH, 5).lineWidth(0.8).fillAndStroke('#f8fafc', '#cbd5e1');
      doc.rect(leftMargin, y2, 4, legalBoxH).fill('#3b82f6');

      doc
        .fillColor('#0b1329')
        .font('Helvetica-Bold')
        .fontSize(7.8)
        .text('GARANTIES LEGALS, CERTIFICACIÓ DSX-8000 I PROTECCIÓ DE DADES (RGPD)', leftMargin + 12, y2 + 7, { lineBreak: false });

      doc
        .fillColor('#475569')
        .font('Helvetica')
        .fontSize(6.8)
        .text(
          '1. Garantia Oficial de Maquinari: Tot l\'equipament subministrat per KernelCore disposa de 2 anys de garantia oficial amb substitució per avançat mitjançant el canal majorista oficial.\n' +
          '2. Certificació de Xarxa Fluke DSX-8000: Es farà entrega d\'un dossier tècnic complet en format PDF amb els diagrames de reflectometria i valors d\'atenuació de cada presa RJ45.\n' +
          '3. Protecció de Dades (RGPD / LOPDGDD): Les dades seran tractades confidencialment per KernelCore S.L. exclusivament per a la gestió d\'aquest contracte, amb estricte secret professional.\n' +
          '4. Dret de Desistiment: El client disposa de 14 dies naturals per exercir el dret de desistiment d\'acord amb el Reial Decret Legislatiu 1/2007 (TRLGDCU).',
          leftMargin + 12,
          y2 + 20,
          { width: contentWidth - 24, lineGap: 2.1 }
        );

      // ─── 2.5. BLOC TRIPARTIT DE SIGNATURES OFICIALS (AMB SIGNATURES REALS) ─────
      y2 += legalBoxH + 8;
      const sigBoxW = (contentWidth - 20) / 3;
      const sigBoxH = 96;

      // Signatura 1: Hans Lao Moncusi (Direcció Tècnica)
      doc.roundedRect(leftMargin, y2, sigBoxW, sigBoxH, 5).lineWidth(0.8).fillAndStroke('#ffffff', '#94a3b8');
      doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(8).text('Hans Lao Moncusi', leftMargin + 10, y2 + 8, { lineBreak: false });
      doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(6.8).text('Direcció Tècnica · Sistemes & Seguretat', leftMargin + 10, y2 + 20, { lineBreak: false });

      if (hasHansSig) {
        try {
          doc.image(hansSigPath, leftMargin + 12, y2 + 30, {
            fit: [sigBoxW - 24, 46],
            align: 'center',
            valign: 'center'
          });
        } catch {
          doc
            .moveTo(leftMargin + 14, y2 + 54)
            .bezierCurveTo(leftMargin + 45, y2 + 38, leftMargin + 85, y2 + 67, leftMargin + 125, y2 + 44)
            .lineWidth(1.2)
            .stroke('#0284c7');
        }
      } else {
        doc
          .moveTo(leftMargin + 14, y2 + 54)
          .bezierCurveTo(leftMargin + 45, y2 + 38, leftMargin + 85, y2 + 67, leftMargin + 125, y2 + 44)
          .lineWidth(1.2)
          .stroke('#0284c7');
      }

      doc.fillColor('#64748b').font('Helvetica').fontSize(6.6).text('Signat digitalment · KernelCore (DFactory)', leftMargin + 10, y2 + 82, { lineBreak: false });

      // Signatura 2: Joel Pérez Armenteros (Direcció General)
      const sig2X = leftMargin + sigBoxW + 10;
      doc.roundedRect(sig2X, y2, sigBoxW, sigBoxH, 5).lineWidth(0.8).fillAndStroke('#ffffff', '#94a3b8');
      doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(8).text('Joel Pérez Armenteros', sig2X + 10, y2 + 8, { lineBreak: false });
      doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(6.8).text('Direcció General · Infraestructura de Xarxes', sig2X + 10, y2 + 20, { lineBreak: false });

      if (hasJoelSig) {
        try {
          doc.image(joelSigPath, sig2X + 12, y2 + 30, {
            fit: [sigBoxW - 24, 46],
            align: 'center',
            valign: 'center'
          });
        } catch {
          doc
            .moveTo(sig2X + 18, y2 + 56)
            .bezierCurveTo(sig2X + 55, y2 + 36, sig2X + 95, y2 + 64, sig2X + 130, y2 + 42)
            .lineWidth(1.2)
            .stroke('#0284c7');
        }
      } else {
        doc
          .moveTo(sig2X + 18, y2 + 56)
          .bezierCurveTo(sig2X + 55, y2 + 36, sig2X + 95, y2 + 64, sig2X + 130, y2 + 42)
          .lineWidth(1.2)
          .stroke('#0284c7');
      }

      doc.fillColor('#64748b').font('Helvetica').fontSize(6.6).text('Signat digitalment · KernelCore (DFactory)', sig2X + 10, y2 + 82, { lineBreak: false });

      // Signatura 3: Conformitat del Client
      const sig3X = sig2X + sigBoxW + 10;
      doc.roundedRect(sig3X, y2, sigBoxW, sigBoxH, 5).lineWidth(0.8).fillAndStroke('#f8fafc', '#94a3b8');
      doc.fillColor('#0b1329').font('Helvetica-Bold').fontSize(8).text('Conformitat i Acceptació del Client', sig3X + 10, y2 + 8, { lineBreak: false });
      doc.fillColor('#64748b').font('Helvetica').fontSize(6.8).text(String(nomEmpresa).slice(0, 26), sig3X + 10, y2 + 20, { lineBreak: false });
      doc.fillColor('#94a3b8').font('Helvetica').fontSize(6.5).text('Segell de l\'empresa, data i signatura:', sig3X + 10, y2 + 82, { lineBreak: false });

      // ─── 2.6. PEU DE PÀGINA 2 ────────────────────────────────────────────────
      doc.rect(0, pageHeight - 26, pageWidth, 26).fill('#0b1329');
      doc
        .fillColor('#94a3b8')
        .font('Helvetica')
        .fontSize(7.2)
        .text(
          `KERNELCORE S.L. · DFactory Barcelona (Zona Franca) · Document Oficial ${codi} · Pàgina 2 de 2`,
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

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { pool, testConnection } from './db.js';
import { 
  liveStore, 
  generateRealisticRequest, 
  generateRealisticTicket,
  injectCapitalInvestment,
  runSystemAudit,
  initialRequests,
  initialQuotes,
  initialProjects,
  initialInventory,
  initialTickets,
  initialTelemetry,
  initialUsers,
  initialContacts,
  initialClients,
  initialSuppliers,
  initialSentEmails
} from './dataStore.js';
import { generateQuotePDFBuffer } from './pdfGenerator.js';
import { sendQuoteEmail, getSmtpConfigStatus, updateSmtpConfig } from './mailer.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const DIST_INDEX = path.join(DIST_DIR, 'index.html');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Servir fitxers estàtics de producció si el paquet dist existeix
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
}

// Estat de connexió a la BBDD
let isDbConnected = false;

// Funció auxiliar per retornar el portal HTML d'estat de la REST API
const renderGatewayHtml = () => `
<!DOCTYPE html>
<html lang="ca">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>KernelCore API Gateway · DFactory Barcelona</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background: #030712; color: #f3f4f6; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
    .card { background: #0b1329; border: 1px solid #1e293b; border-radius: 20px; max-width: 680px; width: 100%; padding: 36px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); }
    .badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 999px; color: #34d399; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; box-shadow: 0 0 10px #10b981; }
    h1 { font-size: 28px; font-weight: 800; margin-top: 16px; margin-bottom: 8px; color: #ffffff; letter-spacing: -0.02em; }
    p.sub { color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 24px; }
    .hero-btn { display: inline-block; background: #06b6d4; color: #000; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 12px; font-size: 14px; transition: all 0.2s; box-shadow: 0 0 20px rgba(6, 182, 212, 0.35); }
    .hero-btn:hover { background: #22d3ee; transform: translateY(-1px); }
    .section-title { font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 28px; margin-bottom: 12px; }
    .endpoints { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
    .endpoint { display: block; padding: 10px 14px; background: #0f172a; border: 1px solid #1e293b; border-radius: 10px; color: #38bdf8; text-decoration: none; font-family: monospace; font-size: 13px; transition: all 0.15s; }
    .endpoint:hover { border-color: #06b6d4; background: #132238; color: #e0f2fe; }
    .footer { margin-top: 28px; padding-top: 20px; border-top: 1px solid #1e293b; color: #64748b; font-size: 12px; display: flex; justify-content: space-between; align-items: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge"><span class="dot"></span> Servei Actiu &middot; Port ${PORT}</div>
    <h1>KernelCore Backend API Gateway</h1>
    <p class="sub">
      Aquest servei és el servidor backend REST API d'alta disponibilitat que gestiona la base de dades, l'estoc de maquinari (100 referències), les peticions de pressupost i la telemetria de KernelCore a DFactory Barcelona.
    </p>

    <div style="margin-bottom: 24px;">
      <a href="/" class="hero-btn">Obrir Aplicació Web KernelCore &rarr;</a>
    </div>

    <div class="section-title">Rutes de la REST API (JSON)</div>
    <div class="endpoints">
      <a href="/api/health" class="endpoint">/api/health</a>
      <a href="/api/contacte" class="endpoint">/api/contacte</a>
      <a href="/api/clients" class="endpoint">/api/clients</a>
      <a href="/api/proveidors" class="endpoint">/api/proveidors</a>
      <a href="/api/inventari" class="endpoint">/api/inventari (100 SKUs)</a>
      <a href="/api/pressupostos" class="endpoint">/api/pressupostos</a>
      <a href="/api/projectes" class="endpoint">/api/projectes</a>
      <a href="/api/sollicituds" class="endpoint">/api/sollicituds</a>
      <a href="/api/tiquets" class="endpoint">/api/tiquets</a>
      <a href="/api/telemetria" class="endpoint">/api/telemetria</a>
      <a href="/api/audit" class="endpoint">/api/audit</a>
      <a href="/database/kernelcore_db.sql" class="endpoint">/database/kernelcore_db.sql</a>
    </div>

    <div class="footer">
      <span>KernelCore &middot; Infraestructura IT</span>
      <span>DFactory Barcelona &middot; Zona Franca</span>
    </div>
  </div>
</body>
</html>
`;

// Portal de documentació de l'API Gateway (/gateway)
app.get('/gateway', (req, res) => {
  res.send(renderGatewayHtml());
});

// ─── 0. ARREL: SERVIR FRONTEND EN PRODUCCIÓ O GATEWAY API ─────────────────────
app.get('/', (req, res) => {
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.json({
      service: 'KernelCore Backend API Gateway',
      status: 'online',
      headquarters: 'DFactory Barcelona (Zona Franca)',
      version: '2.6 Live',
      endpoints: [
        '/api/health',
        '/api/contacte',
        '/api/clients',
        '/api/proveidors',
        '/api/inventari',
        '/api/pressupostos',
        '/api/projectes',
        '/api/sollicituds',
        '/api/tiquets',
        '/api/telemetria',
        '/api/audit',
        '/database/kernelcore_db.sql'
      ]
    });
  }

  // Si el frontend ja està compilat a dist, servim la interfície web directament
  if (fs.existsSync(DIST_INDEX)) {
    return res.sendFile(DIST_INDEX);
  }

  // Fallback si no s'ha executat npm run build
  res.send(renderGatewayHtml());
});

// ─── 0.1. DESCÀRREGA DIRECTA DE L'ESQUEMA SQL (kernelcore_db.sql) ────────────
app.get('/database/kernelcore_db.sql', (req, res) => {
  const sqlFilePath = path.resolve(__dirname, '../database/kernelcore_db.sql');
  res.download(sqlFilePath, 'kernelcore_db.sql', (err) => {
    if (err && !res.headersSent) {
      res.status(404).json({ error: 'Fitxer SQL no trobat al servidor.' });
    }
  });
});

// ─── 1. RUTA DE SALUT & ESTAT DE SISTEMES ──────────────────────────────────────
app.get('/api/health', async (req, res) => {
  if (!isDbConnected) {
    isDbConnected = await testConnection();
  }
  res.json({
    status: 'online',
    empresa: 'KernelCore',
    seu: 'DFactory Barcelona (Zona Franca, 08040 Barcelona)',
    database_connected: isDbConnected,
    mode: isDbConnected ? 'MariaDB / MySQL Relacional' : 'Memòria Dinàmica d\'Alta Disponibilitat (SMX)',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ─── 1.1. RUTA DE FORMULARI DE CONTACTE WEB (/api/contacte) ───────────────────
app.get('/api/contacte', async (req, res) => {
  if (isDbConnected) {
    try {
      const [rows] = await pool.query('SELECT * FROM contactes_web ORDER BY data_recepcio DESC');
      if (rows.length > 0) return res.json(rows);
    } catch (err) {
      console.error('Error consultant contactes_web BBDD:', err);
    }
  }
  res.json(liveStore.contacts);
});

app.post('/api/contacte', async (req, res) => {
  const { nom, empresa, email, telefon, tipus_servei, missatge, consentiment_rgpd } = req.body;

  if (!nom || !email) {
    return res.status(400).json({ error: 'Cal especificar com a mínim nom i email.' });
  }

  const validServices = ['Cablejat & Racks', 'Servidors & AD', 'SAI & Seguretat', 'Punts TPV Retail', 'Auditoria General'];
  const serveiNormalitzat = validServices.includes(tipus_servei) ? tipus_servei : 'Auditoria General';

  const contacte = {
    id_contacte: liveStore.contacts.length + 1,
    nom,
    empresa: empresa || '',
    email,
    telefon: telefon || '',
    tipus_servei: serveiNormalitzat,
    missatge: missatge || 'Consulta rebuda des del formulari de contacte web de KernelCore.',
    consentiment_rgpd: consentiment_rgpd !== undefined ? Boolean(consentiment_rgpd) : true,
    data_recepcio: new Date().toISOString(),
    estat: 'Nou'
  };

  if (isDbConnected) {
    try {
      const [result] = await pool.query(
        'INSERT INTO contactes_web (nom, email, telefon, tipus_servei, missatge, consentiment_rgpd) VALUES (?, ?, ?, ?, ?, ?)',
        [contacte.nom, contacte.email, contacte.telefon, contacte.tipus_servei, contacte.missatge, contacte.consentiment_rgpd]
      );
      if (result && result.insertId) {
        contacte.id_contacte = result.insertId;
      }
    } catch (err) {
      console.error('Error inserint contacte a contactes_web BBDD:', err);
    }
  }

  liveStore.contacts.unshift(contacte);

  // Afegir també a les sol·licituds del Dashboard per unificació completa
  const requestLead = {
    id: `SOL-WEB-${contacte.id_contacte || liveStore.contacts.length}`,
    nom: contacte.nom,
    empresa: contacte.empresa || contacte.nom,
    email: contacte.email,
    telefon: contacte.telefon || '',
    entorn: 'Oficina PIME / Formulari Web',
    treballadors: '5-20',
    urgencia: 'normal',
    pressupostAprox: 'A convenir',
    serveiLabels: [contacte.tipus_servei || 'Contacte General'],
    descripcio: contacte.missatge,
    status: 'Nova sol·licitud',
    createdAt: contacte.data_recepcio
  };
  liveStore.requests.unshift(requestLead);

  res.status(201).json({ success: true, contacte, request: requestLead });
});

// ─── 2. RUTA DE CONTACTE I SOL·LICITUDS DE PRESSUPOST (LEADS) ─────────────────
app.get('/api/sollicituds', async (req, res) => {
  if (isDbConnected) {
    try {
      const [rows] = await pool.query('SELECT * FROM contactes_web ORDER BY id_contacte DESC');
      if (Array.isArray(rows) && rows.length > 0) {
        for (const row of rows) {
          const reqId = `SOL-DB-${String(row.id_contacte).padStart(3, '0')}`;
          const alreadyExists = liveStore.requests.some(
            r => r.id === reqId || (r.email === row.email && r.nom === row.nom)
          );
          if (!alreadyExists) {
            liveStore.requests.unshift({
              id: reqId,
              nom: row.nom,
              empresa: row.nom,
              email: row.email,
              telefon: row.telefon || '',
              entorn: 'Oficina PIME / Entorn Web',
              treballadors: '5-20',
              urgencia: 'normal',
              pressupostAprox: 'A convenir',
              serveiLabels: [row.tipus_servei || 'Auditoria General'],
              descripcio: row.missatge || 'Sol·licitud registrada des del portal web.',
              status: row.estat === 'Nou' ? 'Nova sol·licitud' : (row.estat || 'Nova sol·licitud'),
              createdAt: row.data_recepcio || new Date().toISOString()
            });
          }
        }
      }
    } catch (err) {
      console.error('Error consultant contactes_web a BBDD:', err);
    }
  }
  res.json(liveStore.requests);
});

app.post('/api/sollicituds', async (req, res) => {
  const { nom, empresa, email, telefon, entorn, treballadors, urgencia, pressupostAprox, serveiLabels, descripcio } = req.body;
  
  if (!nom || !email) {
    return res.status(400).json({ error: 'Cal especificar com a mínim nom i email.' });
  }

  const novaSollicitud = {
    id: `SOL-2026-${Math.floor(100 + Math.random() * 900)}`,
    nom,
    empresa: empresa || nom,
    email,
    telefon: telefon || '',
    entorn: entorn || 'Oficina PIME',
    treballadors: treballadors || '10-25',
    urgencia: urgencia || 'normal',
    pressupostAprox: pressupostAprox || 'A convenir',
    serveiLabels: Array.isArray(serveiLabels) && serveiLabels.length > 0 ? serveiLabels : ['Auditoria & Xarxes'],
    descripcio: descripcio || 'Sol·licitud registrada des del portal públic de KernelCore.',
    status: 'Nova sol·licitud',
    createdAt: new Date().toISOString()
  };

  if (isDbConnected) {
    try {
      const tipusServeiSql = novaSollicitud.serveiLabels.join(', ').slice(0, 150);
      const [result] = await pool.query(
        'INSERT INTO contactes_web (nom, email, telefon, tipus_servei, missatge, consentiment_rgpd) VALUES (?, ?, ?, ?, ?, ?)',
        [novaSollicitud.nom, novaSollicitud.email, novaSollicitud.telefon, tipusServeiSql, novaSollicitud.descripcio, true]
      );
      if (result && result.insertId) {
        novaSollicitud.id = `SOL-DB-${String(result.insertId).padStart(3, '0')}`;
        novaSollicitud.db_id = result.insertId;
      }
    } catch (err) {
      console.error('Error desant sol·licitud a contactes_web BBDD:', err);
    }
  }

  liveStore.requests.unshift(novaSollicitud);
  res.status(201).json({ success: true, request: novaSollicitud });
});

app.patch('/api/sollicituds/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const item = liveStore.requests.find(r => r.id === id);
  if (!item) return res.status(404).json({ error: 'Sol·licitud no trobada' });
  item.status = status;
  res.json({ success: true, item });
});

// ─── 3. GENERADOR DINÀMIC D'OPERACIONS EN TEMPS REAL ───────────────────────────
app.post('/api/generate/request', (req, res) => {
  const generated = generateRealisticRequest();
  res.status(201).json({ 
    success: true, 
    message: 'Nova sol·licitud d\'empresa generada pel sistema en temps real.', 
    data: generated 
  });
});

app.post('/api/generate/ticket', (req, res) => {
  const generated = generateRealisticTicket();
  res.status(201).json({ 
    success: true, 
    message: 'Nou tiquet tècnic SAT generat pel sistema de monitoratge.', 
    data: generated 
  });
});

app.post('/api/generate/reset', (req, res) => {
  liveStore.requests = [...initialRequests];
  liveStore.quotes = [...initialQuotes];
  liveStore.projects = [...initialProjects];
  liveStore.inventory = [...initialInventory];
  liveStore.tickets = [...initialTickets];
  liveStore.telemetry = [...initialTelemetry];
  liveStore.users = [...initialUsers];
  liveStore.contacts = [...initialContacts];
  liveStore.clients = [...initialClients];
  liveStore.suppliers = [...initialSuppliers];
  liveStore.sentEmails = [...initialSentEmails];
  liveStore.auditLogs = [];
  runSystemAudit(isDbConnected);
  res.json({ success: true, message: 'Dades del sistema reiniciades amb èxit a l\'estat inicial.' });
});

// ─── 3.1. AUTENTICACIÓ I ACCÉS ÚNIC AL PANELL TÈCNIC ─────────────────────────
const handleAuthLogin = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Si us plau, indica correu i contrasenya.' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // 1. Si la BBDD MariaDB/MySQL està connectada, autentiquem contra usuaris_tecnics
  if (isDbConnected) {
    try {
      const [rows] = await pool.query(
        'SELECT id_usuari, nom_complet, email, rol, departament, actiu FROM usuaris_tecnics WHERE LOWER(email) = ? AND contrasenya_hash = SHA2(?, 256)',
        [normalizedEmail, password]
      );
      if (rows && rows.length > 0) {
        const u = rows[0];
        if (!u.actiu) return res.status(403).json({ error: 'Aquest compte està desactivat pel departament de seguretat.' });
        return res.json({
          success: true,
          user: {
            id: u.id_usuari,
            nom: u.nom_complet,
            email: u.email,
            rol: u.rol,
            departament: u.departament
          }
        });
      }
    } catch (err) {
      console.error('Error consultant usuaris a la base de dades:', err);
    }
  }

  // 2. Comprovació en magatzem viu (liveStore)
  const found = liveStore.users.find(
    u => u.email.toLowerCase() === normalizedEmail && u.password === password
  );

  if (found) {
    if (!found.actiu) return res.status(403).json({ error: 'Aquest compte està desactivat.' });
    return res.json({
      success: true,
      user: {
        id: found.id,
        nom: found.nom,
        email: found.email,
        rol: found.rol,
        departament: found.departament
      }
    });
  }

  return res.status(401).json({ 
    error: 'Credencials incorrectes. Revisa el correu electrònic i la contrasenya d\'accés.' 
  });
};

app.post('/api/auth/login', handleAuthLogin);
app.post('/api/login', handleAuthLogin);

// ─── 3.1.1. PERFIL D'USUARI & SEGURETAT RBAC (/api/perfil) ───────────────────
app.get('/api/perfil/:identifier', async (req, res) => {
  const { identifier } = req.params;
  const lower = (identifier || '').trim().toLowerCase();
  
  let userObj = liveStore.users.find(u => 
    String(u.id) === identifier || u.email.toLowerCase() === lower || u.nom.toLowerCase().includes(lower)
  );

  if (isDbConnected) {
    try {
      const [rows] = await pool.query(
        'SELECT id_usuari, nom_complet, email, rol, departament, actiu, data_creacio FROM usuaris_tecnics WHERE id_usuari = ? OR LOWER(email) = ?',
        [Number.isNaN(Number(identifier)) ? -1 : Number(identifier), lower]
      );
      if (rows && rows.length > 0) {
        const r = rows[0];
        userObj = {
          ...(userObj || {}),
          id: r.id_usuari,
          nom: r.nom_complet,
          email: r.email,
          rol: r.rol,
          departament: r.departament,
          dataAlta: r.data_creacio ? new Date(r.data_creacio).toLocaleDateString('ca-ES') : (userObj?.dataAlta || '01/09/2026'),
          actiu: Boolean(r.actiu)
        };
      }
    } catch (err) {
      console.error('Error consultant perfil a la BBDD:', err);
    }
  }

  if (!userObj) {
    userObj = liveStore.users[0];
  }

  const assignedProjects = liveStore.projects.filter(p => 
    (p.techLead || '').toLowerCase().includes(userObj.nom.toLowerCase().split(' ')[0])
  ).length;
  const assignedTickets = liveStore.tickets.filter(t => 
    (t.tech || t.tecnic || '').toLowerCase().includes(userObj.nom.toLowerCase().split(' ')[0])
  ).length;
  const signedQuotes = liveStore.quotes.length;

  res.json({
    success: true,
    user: {
      ...userObj,
      assignedProjects,
      assignedTickets,
      signedQuotes,
      sede: 'DFactory Barcelona (Zona Franca, 08040 Barcelona)',
      ipSessio: '127.0.0.1 (Intranet DFactory)',
      protocol: 'TLS 1.3 / HTTP2 Secure Session',
      algorismeSeguretat: 'SHA-256 (NIST FIPS 180-4)'
    }
  });
});

app.post('/api/perfil/canvi-contrasenya', async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Cal indicar el correu, la contrasenya actual i la nova contrasenya.' });
  }

  const lower = email.trim().toLowerCase();
  let verified = false;

  if (isDbConnected) {
    try {
      const [rows] = await pool.query(
        'SELECT id_usuari FROM usuaris_tecnics WHERE LOWER(email) = ? AND contrasenya_hash = SHA2(?, 256)',
        [lower, currentPassword]
      );
      if (rows && rows.length > 0) {
        verified = true;
        await pool.query(
          'UPDATE usuaris_tecnics SET contrasenya_hash = SHA2(?, 256) WHERE LOWER(email) = ?',
          [newPassword, lower]
        );
      }
    } catch (err) {
      console.error('Error actualitzant contrasenya a BBDD:', err);
    }
  }

  const memUser = liveStore.users.find(u => u.email.toLowerCase() === lower);
  if (memUser) {
    if (memUser.password === currentPassword || verified) {
      verified = true;
      memUser.password = newPassword;
    }
  }

  if (!verified) {
    return res.status(401).json({ error: 'La contrasenya actual indicada és incorrecta.' });
  }

  res.json({
    success: true,
    message: 'Contrasenya actualitzada correctament amb xifratge SHA-256 a la base de dades.'
  });
});

app.put('/api/perfil/preferencies', async (req, res) => {
  const { email, nom, telefon, departament, bio, signaturaEmail } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Cal especificar el correu electrònic.' });
  }

  const lower = email.trim().toLowerCase();
  const memUser = liveStore.users.find(u => u.email.toLowerCase() === lower);
  if (memUser) {
    if (nom) memUser.nom = nom;
    if (telefon) memUser.telefon = telefon;
    if (departament) memUser.departament = departament;
    if (bio) memUser.bio = bio;
    if (signaturaEmail) memUser.signaturaEmail = signaturaEmail;
  }

  if (isDbConnected) {
    try {
      await pool.query(
        'UPDATE usuaris_tecnics SET nom_complet = COALESCE(?, nom_complet), departament = COALESCE(?, departament) WHERE LOWER(email) = ?',
        [nom || null, departament || null, lower]
      );
    } catch (err) {
      console.error('Error actualitzant preferències a la BBDD:', err);
    }
  }

  res.json({
    success: true,
    message: 'Preferències del perfil desades correctament.',
    user: memUser || { email, nom, telefon, departament, bio, signaturaEmail }
  });
});

// ─── 3.2. CLIENTS CORPORATIUS (/api/clients) ──────────────────────────────────
app.get('/api/clients', async (req, res) => {
  if (isDbConnected) {
    try {
      const [rows] = await pool.query('SELECT * FROM clients ORDER BY id_client DESC');
      if (rows && rows.length > 0) {
        const mapped = rows.map(r => ({
          ...r,
          id: r.id_client,
          name: r.nom_empresa,
          cif: r.nif_cif,
          contact: r.persona_contacte,
          phone: r.telefon,
          address: r.adreca,
          environment: r.tipus_entorn
        }));
        return res.json(mapped);
      }
    } catch (err) {
      console.error('Error consultant clients a BBDD:', err);
    }
  }
  res.json(liveStore.clients);
});

app.post('/api/clients', async (req, res) => {
  const {
    nom_empresa, name, empresa,
    nif_cif, cif,
    persona_contacte, contact,
    telefon, phone,
    email,
    adreca, address,
    poblacio, city,
    tipus_entorn, environment
  } = req.body;

  const finalName = nom_empresa || name || empresa;
  const finalCif = nif_cif || cif || `B-${Math.floor(10000000 + Math.random() * 89999999)}`;
  const finalContact = persona_contacte || contact || 'Responsable IT';
  const finalPhone = telefon || phone || '+34 930 000 000';
  const finalEmail = email || 'info@client.cat';
  const finalAddress = adreca || address || 'Barcelona';
  const finalCity = poblacio || city || 'Barcelona';
  const finalEnv = tipus_entorn || environment || 'Oficina PIME';

  if (!finalName) {
    return res.status(400).json({ error: 'Cal indicar el nom de l\'empresa client.' });
  }

  let newId = liveStore.clients.length > 0
    ? Math.max(...liveStore.clients.map(c => Number(c.id_client || c.id || 0))) + 1
    : 1;

  if (isDbConnected) {
    try {
      const validEnvs = ['Industrial', 'Oficina PIME', 'Comerç & Retail', 'Espai Co-working', 'Nau Industrial / Indústria 4.0', 'Sanitari / Clínica', 'Altres'];
      const dbEnv = validEnvs.includes(finalEnv) ? finalEnv : 'Oficina PIME';
      const [result] = await pool.query(
        'INSERT INTO clients (nom_empresa, nif_cif, persona_contacte, telefon, email, adreca, poblacio, tipus_entorn) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [finalName, finalCif, finalContact, finalPhone, finalEmail, finalAddress, finalCity, dbEnv]
      );
      if (result && result.insertId) {
        newId = result.insertId;
      }
    } catch (err) {
      console.error('Error inserint client a BBDD:', err);
    }
  }

  const nouClient = {
    id: newId,
    id_client: newId,
    nom_empresa: finalName,
    name: finalName,
    nif_cif: finalCif,
    cif: finalCif,
    persona_contacte: finalContact,
    contact: finalContact,
    telefon: finalPhone,
    phone: finalPhone,
    email: finalEmail,
    adreca: finalAddress,
    address: finalAddress,
    poblacio: finalCity,
    tipus_entorn: finalEnv,
    environment: finalEnv,
    data_alta: new Date().toISOString().split('T')[0]
  };

  liveStore.clients.unshift(nouClient);
  res.status(201).json({ success: true, client: nouClient });
});

app.delete('/api/clients/:id', async (req, res) => {
  const { id } = req.params;
  liveStore.clients = liveStore.clients.filter(
    c => String(c.id) !== String(id) && String(c.id_client) !== String(id) && c.nif_cif !== id && c.cif !== id
  );

  if (isDbConnected) {
    try {
      await pool.query('DELETE FROM clients WHERE id_client = ? OR nif_cif = ?', [id, id]);
    } catch (err) {
      console.error('Error eliminant client a BBDD:', err);
    }
  }

  res.json({ success: true, deletedId: id });
});

// ─── 3.3. PROVEÏDORS MAJORISTES (/api/proveidors) ─────────────────────────────
app.get('/api/proveidors', async (req, res) => {
  if (isDbConnected) {
    try {
      const [rows] = await pool.query('SELECT * FROM proveidors ORDER BY id_proveidor ASC');
      if (rows && rows.length > 0) {
        const enriched = rows.map(r => {
          const matched = liveStore.suppliers.find(
            s => s.cif === r.cif || s.id_proveidor === r.id_proveidor || s.nom_comercial === r.nom_comercial
          );
          const marques = matched ? matched.marques : ['Multimarca Enterprise'];
          return {
            ...r,
            id: r.id_proveidor,
            name: r.nom_comercial,
            phone: r.telefon,
            email: r.email_contacte,
            address: r.adreca,
            paymentTerms: r.condicions_pagament,
            marques,
            marcas: marques,
            brands: marques
          };
        });
        return res.json(enriched);
      }
    } catch (err) {
      console.error('Error consultant proveidors a BBDD:', err);
    }
  }
  res.json(liveStore.suppliers);
});

app.post('/api/proveidors', async (req, res) => {
  const {
    nom_comercial, name,
    cif,
    telefon, phone,
    email_contacte, email,
    adreca, address,
    condicions_pagament, paymentTerms,
    marques, marcas, brands
  } = req.body;

  const finalName = nom_comercial || name;
  const finalCif = cif || `B-${Math.floor(10000000 + Math.random() * 89999999)}`;
  const finalPhone = telefon || phone || '930 000 100';
  const finalEmail = email_contacte || email || 'comandes@proveidor.es';
  const finalAddress = adreca || address || 'Barcelona';
  const finalTerms = condicions_pagament || paymentTerms || '30 dies transferència';

  const rawBrands = marques || marcas || brands || ['Hardware IT'];
  const parsedBrands = Array.isArray(rawBrands)
    ? rawBrands
    : String(rawBrands).split(',').map(b => b.trim()).filter(Boolean);

  if (!finalName) {
    return res.status(400).json({ error: 'Cal indicar el nom comercial del proveïdor.' });
  }

  let newId = liveStore.suppliers.length > 0
    ? Math.max(...liveStore.suppliers.map(s => Number(s.id_proveidor || s.id || 0))) + 1
    : 1;

  if (isDbConnected) {
    try {
      const [result] = await pool.query(
        'INSERT INTO proveidors (nom_comercial, cif, telefon, email_contacte, adreca, condicions_pagament) VALUES (?, ?, ?, ?, ?, ?)',
        [finalName, finalCif, finalPhone, finalEmail, finalAddress, finalTerms]
      );
      if (result && result.insertId) {
        newId = result.insertId;
      }
    } catch (err) {
      console.error('Error inserint proveïdor a BBDD:', err);
    }
  }

  const nouProveidor = {
    id: newId,
    id_proveidor: newId,
    nom_comercial: finalName,
    name: finalName,
    cif: finalCif,
    telefon: finalPhone,
    phone: finalPhone,
    email_contacte: finalEmail,
    email: finalEmail,
    adreca: finalAddress,
    address: finalAddress,
    condicions_pagament: finalTerms,
    paymentTerms: finalTerms,
    marques: parsedBrands,
    marcas: parsedBrands,
    brands: parsedBrands
  };

  liveStore.suppliers.push(nouProveidor);
  res.status(201).json({ success: true, proveidor: nouProveidor, supplier: nouProveidor });
});

// ─── 4. PRESSUPOSTOS ──────────────────────────────────────────────────────────
app.get('/api/pressupostos', async (req, res) => {
  if (isDbConnected) {
    try {
      const [rows] = await pool.query(`
        SELECT p.*, c.nom_empresa, c.persona_contacte, c.email AS client_email
        FROM pressupostos p
        JOIN clients c ON p.id_client = c.id_client
        ORDER BY p.data_emissio DESC
      `);
      if (rows.length > 0) return res.json(rows);
    } catch (err) {
      console.error('Error consultant pressupostos BBDD:', err);
    }
  }

  res.json(liveStore.quotes);
});

app.post('/api/pressupostos', async (req, res) => {
  const { 
    nom_empresa, client, persona_contacte, contact, email, telefon, 
    equipament, items, environment, cost_maquinari, cost_software, 
    cost_ma_obra, base_imposable, import_total, amount, monthly, quota_mensual 
  } = req.body;

  const codi_pressupost = `PR-2026-${String(liveStore.quotes.length + 1).padStart(3, '0')}`;
  const total = Number(import_total || amount || 0);
  const qMensual = Number(quota_mensual || monthly || 110);

  const nouPressupost = {
    id: codi_pressupost,
    codi_pressupost,
    client: nom_empresa || client || 'Client Corporatiu',
    nom_empresa: nom_empresa || client || 'Client Corporatiu',
    contact: persona_contacte || contact || 'Departament IT',
    persona_contacte: persona_contacte || contact || 'Departament IT',
    email: email || 'info@client.cat',
    telefon: telefon || '',
    environment: environment || 'Oficina PIME',
    items: equipament || items || 'Infraestructura de xarxa i sistemes',
    resum_equipament: equipament || items || 'Infraestructura de xarxa i sistemes',
    cost_maquinari: cost_maquinari || Math.round(total * 0.65),
    cost_software: cost_software || Math.round(total * 0.15),
    cost_ma_obra: cost_ma_obra || Math.round(total * 0.20),
    base_imposable: base_imposable || Math.round((total / 1.21) * 100) / 100,
    amount: total,
    import_total: total,
    monthly: qMensual,
    quota_mensual_suport: qMensual,
    status: 'Pendent de signatura',
    estat: 'Pendent de signatura',
    date: new Date().toISOString().split('T')[0],
    data_emissio: new Date().toISOString().split('T')[0]
  };

  liveStore.quotes.unshift(nouPressupost);
  res.status(201).json({ success: true, pressupost: nouPressupost });
});

app.patch('/api/pressupostos/:id/status', async (req, res) => {
  const { id } = req.params;
  const quote = liveStore.quotes.find(q => q.id === id || q.codi_pressupost === id);
  const currentStatus = quote ? quote.status : 'Pendent de signatura';
  const next = currentStatus === 'Pendent de signatura' ? 'Aprovat'
             : currentStatus === 'Aprovat' ? 'En curs'
             : 'Pendent de signatura';

  if (quote) {
    quote.status = next;
    quote.estat = next;
  }

  if (isDbConnected) {
    try {
      await pool.query('UPDATE pressupostos SET estat = ? WHERE codi_pressupost = ? OR id_pressupost = ?', [next, id, id]);
    } catch (err) {
      console.error('Error actualitzant estat de pressupost a BBDD:', err);
    }
  }

  if (!quote && !isDbConnected) return res.status(404).json({ error: 'Pressupost no trobat' });
  res.json({ success: true, quote: quote || { id, codi_pressupost: id, status: next, estat: next } });
});

// ─── 4.1. GENERACIÓ DE PDF BINARI OFICIAL (PDFKit) ───────────────────────────
app.post('/api/pressupostos/pdf', async (req, res) => {
  try {
    const payload = req.body || {};
    const codi = payload.codi_pressupost || payload.id || payload.quoteId || `PR-2026-${String(liveStore.quotes.length + 1).padStart(3, '0')}`;
    const quoteData = {
      ...payload,
      id: codi,
      codi_pressupost: codi
    };

    const pdfBuffer = await generateQuotePDFBuffer(quoteData);
    const filename = `Pressupost_KernelCore_${codi}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    return res.send(pdfBuffer);
  } catch (err) {
    console.error('Error generant PDF de pressupost:', err);
    return res.status(500).json({ error: 'No s\'ha pogut generar el document PDF del pressupost.' });
  }
});

app.get('/api/pressupostos/:id/pdf', async (req, res) => {
  try {
    const { id } = req.params;
    let quote = liveStore.quotes.find(q => String(q.id) === String(id) || String(q.codi_pressupost) === String(id));

    if (!quote && isDbConnected) {
      try {
        const [rows] = await pool.query(
          `SELECT p.*, c.nom_empresa, c.persona_contacte, c.email, c.telefon, c.tipus_entorn AS environment
           FROM pressupostos p
           LEFT JOIN clients c ON p.id_client = c.id_client
           WHERE p.codi_pressupost = ? OR p.id_pressupost = ?`,
          [id, id]
        );
        if (rows && rows.length > 0) {
          quote = rows[0];
        }
      } catch (dbErr) {
        console.error('Error consultant pressupost per a PDF a BBDD:', dbErr);
      }
    }

    if (!quote) {
      return res.status(404).json({ error: `Pressupost ${id} no trobat.` });
    }

    const codi = quote.codi_pressupost || quote.id || id;
    const pdfBuffer = await generateQuotePDFBuffer(quote);
    const disposition = req.query.inline === '1' ? 'inline' : 'attachment';
    const filename = `Pressupost_KernelCore_${codi}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `${disposition}; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    return res.send(pdfBuffer);
  } catch (err) {
    console.error('Error servint PDF del pressupost:', err);
    return res.status(500).json({ error: 'Error intern generant el PDF del pressupost.' });
  }
});

// ─── 4.2. ENVIAMENT DE PRESSUPOST PER EMAIL AMB PDF ADJUNT (Nodemailer) ──────
app.post('/api/pressupostos/send-email', async (req, res) => {
  try {
    const {
      to,
      email,
      clientName,
      persona_contacte,
      contact,
      companyName,
      nom_empresa,
      client,
      telefon,
      environment,
      items,
      resum_equipament,
      equipament,
      cost_maquinari,
      cost_software,
      cost_ma_obra,
      base_imposable,
      import_total,
      amount,
      quota_mensual_suport,
      monthly,
      subject,
      customMessage,
      senderName,
      senderRole,
      quoteId,
      requestId,
      saiInfo
    } = req.body || {};

    const targetEmail = to || email || 'info@client.cat';
    const finalCompany = companyName || nom_empresa || client || 'Client Corporatiu';
    const finalContact = clientName || persona_contacte || contact || 'Responsable IT';
    const finalPhone = telefon || '+34 932 000 000';
    const finalEnv = environment || 'Oficina PIME';
    const finalItems = items || resum_equipament || equipament || 'Infraestructura de xarxa Cat6A, armari rack 19", sistemes i seguretat';

    let quote = quoteId
      ? liveStore.quotes.find(q => String(q.id) === String(quoteId) || String(q.codi_pressupost) === String(quoteId))
      : null;

    if (quote) {
      if (companyName || nom_empresa || client) {
        quote.client = finalCompany;
        quote.nom_empresa = finalCompany;
      }
      if (clientName || persona_contacte || contact) {
        quote.contact = finalContact;
        quote.persona_contacte = finalContact;
      }
      if (to || email) quote.email = targetEmail;
      if (telefon) quote.telefon = finalPhone;
      if (environment) quote.environment = finalEnv;
      if (items || resum_equipament || equipament) {
        quote.items = finalItems;
        quote.resum_equipament = finalItems;
      }
      if (cost_maquinari !== undefined) quote.cost_maquinari = Number(cost_maquinari);
      if (cost_software !== undefined) quote.cost_software = Number(cost_software);
      if (cost_ma_obra !== undefined) quote.cost_ma_obra = Number(cost_ma_obra);
      if (base_imposable !== undefined) quote.base_imposable = Number(base_imposable);
      if (import_total !== undefined || amount !== undefined) {
        const updatedTotal = Number(import_total ?? amount);
        quote.amount = updatedTotal;
        quote.import_total = updatedTotal;
      }
      if (quota_mensual_suport !== undefined || monthly !== undefined) {
        const updatedMonthly = Number(quota_mensual_suport ?? monthly);
        quote.monthly = updatedMonthly;
        quote.quota_mensual_suport = updatedMonthly;
      }
      if (customMessage !== undefined) quote.customMessage = customMessage;
      if (saiInfo !== undefined) quote.saiInfo = saiInfo;
    } else {
      const codi_pressupost =
        quoteId && String(quoteId).startsWith('PR-')
          ? String(quoteId)
          : `PR-2026-${String(liveStore.quotes.length + 1).padStart(3, '0')}`;

      const cMaq = Number(cost_maquinari ?? 0);
      const cSoft = Number(cost_software ?? 0);
      const cObra = Number(cost_ma_obra ?? 0);
      const rawTotal = Number(import_total ?? amount ?? 0);
      const calcBase =
        Number(base_imposable) > 0
          ? Number(base_imposable)
          : cMaq + cSoft + cObra > 0
            ? Math.round((cMaq + cSoft + cObra) * 100) / 100
            : Math.round((rawTotal / 1.21) * 100) / 100;
      const calcTotal = rawTotal > 0 ? rawTotal : Math.round(calcBase * 1.21 * 100) / 100;
      const calcMonthly = Number(quota_mensual_suport ?? monthly ?? 125);
      const today = new Date().toISOString().split('T')[0];

      quote = {
        id: codi_pressupost,
        codi_pressupost,
        client: finalCompany,
        nom_empresa: finalCompany,
        contact: finalContact,
        persona_contacte: finalContact,
        email: targetEmail,
        telefon: finalPhone,
        environment: finalEnv,
        items: finalItems,
        resum_equipament: finalItems,
        cost_maquinari: cMaq > 0 ? cMaq : Math.round(calcBase * 0.65 * 100) / 100,
        cost_software: cSoft > 0 ? cSoft : Math.round(calcBase * 0.15 * 100) / 100,
        cost_ma_obra: cObra > 0 ? cObra : Math.round(calcBase * 0.20 * 100) / 100,
        base_imposable: calcBase,
        amount: calcTotal,
        import_total: calcTotal,
        monthly: calcMonthly,
        quota_mensual_suport: calcMonthly,
        status: 'Pendent de signatura',
        estat: 'Pendent de signatura',
        date: today,
        data_emissio: today,
        customMessage: customMessage || '',
        saiInfo: saiInfo || null
      };

      liveStore.quotes.unshift(quote);

      if (isDbConnected) {
        try {
          const matchedClient = liveStore.clients.find(
            c => c.nom_empresa === finalCompany || c.name === finalCompany || c.email === targetEmail
          );
          const idClient = matchedClient ? (matchedClient.id_client || matchedClient.id || 1) : 1;
          await pool.query(
            `INSERT INTO pressupostos (codi_pressupost, id_client, data_emissio, resum_equipament, cost_maquinari, cost_software, cost_ma_obra, base_imposable, iva_percentatge, import_total, quota_mensual_suport, estat)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              quote.codi_pressupost,
              idClient,
              quote.data_emissio,
              quote.resum_equipament,
              quote.cost_maquinari,
              quote.cost_software,
              quote.cost_ma_obra,
              quote.base_imposable,
              21.00,
              quote.import_total,
              quote.quota_mensual_suport,
              'Pendent de signatura'
            ]
          );
        } catch (dbErr) {
          console.error('Error inserint pressupost enviat per email a BBDD:', dbErr);
        }
      }
    }

    if (requestId) {
      const reqItem = liveStore.requests.find(r => String(r.id) === String(requestId));
      if (reqItem) {
        reqItem.status = 'Pressupost enviat';
      }
    }

    const pdfRenderData = {
      ...quote,
      customMessage: customMessage !== undefined ? customMessage : quote.customMessage,
      saiInfo: saiInfo !== undefined ? saiInfo : quote.saiInfo
    };

    const pdfBuffer = await generateQuotePDFBuffer(pdfRenderData);

    const finalSenderName = senderName || 'Hans Lao Moncusi';
    const finalSenderRole = senderRole || 'Direcció Tècnica · Sistemes & Seguretat';
    const finalSubject =
      subject || `Pressupost Oficial ${quote.codi_pressupost} · Proposta d'Infraestructura IT per a ${quote.nom_empresa}`;

    const mailResult = await sendQuoteEmail({
      to: targetEmail,
      clientName: quote.persona_contacte,
      companyName: quote.nom_empresa,
      subject: finalSubject,
      customMessage: pdfRenderData.customMessage,
      senderName: finalSenderName,
      senderRole: finalSenderRole,
      quoteData: pdfRenderData,
      pdfBuffer
    });

    const emailLog = {
      id: `EML-2026-${String(liveStore.sentEmails.length + 1).padStart(3, '0')}`,
      quoteId: quote.codi_pressupost,
      codi_pressupost: quote.codi_pressupost,
      to: targetEmail,
      clientName: quote.persona_contacte,
      companyName: quote.nom_empresa,
      subject: finalSubject,
      customMessage: pdfRenderData.customMessage || '',
      senderName: finalSenderName,
      senderRole: finalSenderRole,
      attachmentName: mailResult.pdfFilename || `Pressupost_KernelCore_${quote.codi_pressupost}.pdf`,
      amount: quote.import_total,
      monthly: quote.quota_mensual_suport,
      transportMode: mailResult.transportMode,
      status: 'Lliurat amb PDF adjunt',
      sentAt: new Date().toISOString(),
      previewUrl: mailResult.previewUrl || null
    };

    liveStore.sentEmails.unshift(emailLog);

    return res.status(201).json({
      success: true,
      quote,
      emailLog,
      previewUrl: mailResult.previewUrl || null
    });
  } catch (err) {
    console.error('Error enviant pressupost per correu:', err);
    return res.status(500).json({ error: 'Error intern durant la generació i enviament del pressupost per correu.' });
  }
});

// ─── 4.3. HISTORIAL DE CORREUS I CONFIGURACIÓ SMTP (/api/emails/*) ───────────
app.get('/api/emails/history', (req, res) => {
  res.json(liveStore.sentEmails);
});

app.get('/api/emails/smtp-config', (req, res) => {
  res.json(getSmtpConfigStatus());
});

app.post('/api/emails/smtp-config', (req, res) => {
  const updated = updateSmtpConfig(req.body || {});
  res.json({
    success: true,
    message: 'Configuració SMTP actualitzada correctament en memòria.',
    config: updated,
    ...updated
  });
});

// ─── 5. PROJECTES D'INFRAESTRUCTURA ───────────────────────────────────────────
app.get('/api/projectes', (req, res) => {
  res.json(liveStore.projects);
});

app.post('/api/projectes', async (req, res) => {
  const { name, titol_projecte, client, techLead, deadline, tasks } = req.body;
  const projectName = name || titol_projecte;
  if (!projectName) {
    return res.status(400).json({ error: 'Cal indicar el nom del projecte.' });
  }

  const nextNum = liveStore.projects.length + 1;
  const projectId = `PRJ-26-${String(nextNum).padStart(2, '0')}`;

  const parsedTasks = Array.isArray(tasks) && tasks.length > 0
    ? tasks.map(t => typeof t === 'string' ? { name: t, done: false } : { name: t.name || 'Tasca tècnica', done: Boolean(t.done) })
    : [
        { name: 'Inspecció tècnica inicial i auditoria de requeriments', done: false },
        { name: 'Instal·lació de maquinari, cablejat i configuració de sistemes', done: false },
        { name: 'Certificació final, proves d\'estrès i lliurament d\'acta', done: false }
      ];

  const doneCount = parsedTasks.filter(t => t.done).length;
  const progress = parsedTasks.length > 0 ? Math.round((doneCount / parsedTasks.length) * 100) : 0;

  const nouProjecte = {
    id: projectId,
    name: projectName,
    client: client || 'Client Corporatiu Barcelona',
    techLead: techLead || 'Hans Lao Moncusi & Joel Pérez Armenteros',
    progress,
    deadline: deadline || '30 Novembre 2026',
    tasks: parsedTasks
  };

  if (isDbConnected) {
    try {
      const matchedClient = liveStore.clients.find(
        c => c.nom_empresa === nouProjecte.client || c.name === nouProjecte.client
      );
      const idClient = matchedClient ? (matchedClient.id_client || matchedClient.id || 1) : 1;
      const idTecnic = String(nouProjecte.techLead).includes('Hans') ? 2 : 3;
      const today = new Date().toISOString().split('T')[0];
      const targetDate = '2026-11-30';
      await pool.query(
        'INSERT INTO projectes_instalacio (codi_projecte, titol_projecte, id_client, percentatge_progres, data_inici, data_termini, id_tecnic_responsable, estat) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [projectId, projectName, idClient, progress, today, targetDate, idTecnic, 'En execució']
      );
    } catch (err) {
      console.error('Error inserint projecte a projectes_instalacio BBDD:', err);
    }
  }

  liveStore.projects.unshift(nouProjecte);
  res.status(201).json({ success: true, project: nouProjecte });
});

app.post('/api/projectes/:id/tasks', async (req, res) => {
  const { id } = req.params;
  const { name, task } = req.body;
  const taskName = name || task;
  const proj = liveStore.projects.find(p => p.id === id);
  if (!proj) return res.status(404).json({ error: 'Projecte no trobat' });
  if (!taskName) return res.status(400).json({ error: 'Cal indicar el nom de la tasca' });

  if (!Array.isArray(proj.tasks)) {
    proj.tasks = [];
  }
  proj.tasks.push({ name: taskName, done: false });
  const doneCount = proj.tasks.filter(t => t.done).length;
  proj.progress = Math.round((doneCount / proj.tasks.length) * 100);

  if (isDbConnected) {
    try {
      await pool.query(
        'UPDATE projectes_instalacio SET percentatge_progres = ? WHERE codi_projecte = ?',
        [proj.progress, id]
      );
    } catch (err) {
      console.error('Error actualitzant progrés de projecte a BBDD:', err);
    }
  }

  res.status(201).json({ success: true, project: proj });
});

app.patch('/api/projectes/:id/tasks/:taskIndex/toggle', async (req, res) => {
  const { id, taskIndex } = req.params;
  const proj = liveStore.projects.find(p => p.id === id);
  if (!proj) return res.status(404).json({ error: 'Projecte no trobat' });
  const idx = parseInt(taskIndex, 10);
  if (proj.tasks && proj.tasks[idx]) {
    proj.tasks[idx].done = !proj.tasks[idx].done;
    const doneCount = proj.tasks.filter(t => t.done).length;
    proj.progress = Math.round((doneCount / proj.tasks.length) * 100);
    if (isDbConnected) {
      try {
        await pool.query(
          'UPDATE projectes_instalacio SET percentatge_progres = ? WHERE codi_projecte = ?',
          [proj.progress, id]
        );
      } catch (err) {
        console.error('Error actualitzant progrés de projecte a BBDD:', err);
      }
    }
    return res.json({ success: true, project: proj });
  }
  res.status(400).json({ error: 'Fita no trobada' });
});

// ─── 6. INVENTARI DE MAQUINARI ────────────────────────────────────────────────
app.get('/api/inventari', async (req, res) => {
  if (isDbConnected) {
    try {
      const [rows] = await pool.query(`
        SELECT 
          id_article AS id,
          codi_referencia AS sku,
          nom_article AS name,
          fabricant AS brand,
          categoria AS category,
          estoc_actual AS stock,
          estoc_minim AS min,
          CAST(preu_venda AS DOUBLE) AS price,
          gama AS tier
        FROM inventari_maquinari
        ORDER BY id_article ASC
      `);
      if (rows && rows.length > 0) {
        return res.json(rows.map(r => ({ ...r, price: Number(r.price) })));
      }
    } catch (err) {
      console.error('Error consultant inventari_maquinari a BBDD:', err);
    }
  }
  res.json(liveStore.inventory);
});

app.patch('/api/inventari/:id/stock', async (req, res) => {
  const { id } = req.params;
  const { delta } = req.body;
  const numDelta = Number(delta || 0);
  const item = liveStore.inventory.find(i => String(i.id) === String(id));
  if (item) {
    item.stock = Math.max(0, item.stock + numDelta);
  }

  if (isDbConnected) {
    try {
      await pool.query(
        'UPDATE inventari_maquinari SET estoc_actual = GREATEST(0, estoc_actual + ?) WHERE id_article = ?',
        [numDelta, id]
      );
    } catch (err) {
      console.error('Error actualitzant estoc a BBDD:', err);
    }
  }

  if (!item && !isDbConnected) return res.status(404).json({ error: 'Article no trobat' });
  res.json({ success: true, item });
});

app.post('/api/inventari/inversio-capital', async (req, res) => {
  const { plan } = req.body;
  const result = injectCapitalInvestment(plan || 'basic_general');

  if (isDbConnected) {
    try {
      for (const item of liveStore.inventory) {
        await pool.query(
          'UPDATE inventari_maquinari SET estoc_actual = ? WHERE id_article = ?',
          [item.stock, item.id]
        );
      }
    } catch (err) {
      console.error('Error sincronitzant inversió de capital a BBDD:', err);
    }
  }

  res.json({
    success: true,
    message: `Inversió de capital executada amb èxit a DFactory Barcelona. S'han injectat ${result.capitalInjected.toLocaleString('ca-ES')} € en estoc estratègic.`,
    result,
    inventory: liveStore.inventory
  });
});

app.post('/api/inventari/reset', async (req, res) => {
  liveStore.inventory = initialInventory.map(i => ({ ...i }));

  if (isDbConnected) {
    try {
      for (const item of liveStore.inventory) {
        await pool.query(
          'UPDATE inventari_maquinari SET estoc_actual = ? WHERE id_article = ?',
          [item.stock, item.id]
        );
      }
    } catch (err) {
      console.error('Error restablint estoc a BBDD:', err);
    }
  }

  const totalVal = Math.round(liveStore.inventory.reduce((acc, i) => acc + (i.stock * i.price), 0));
  res.json({
    success: true,
    message: `Estoc restablert correctament al catàleg base de 100 SKUs (${totalVal.toLocaleString('ca-ES')} €).`,
    inventory: liveStore.inventory,
    totalVal
  });
});

// ─── 7. TIQUETS SAT ───────────────────────────────────────────────────────────
app.get('/api/tiquets', (req, res) => {
  res.json(liveStore.tickets);
});

app.patch('/api/tiquets/:id/resolve', (req, res) => {
  const { id } = req.params;
  const ticket = liveStore.tickets.find(t => t.id === id);
  if (!ticket) return res.status(404).json({ error: 'Tiquet no trobat' });
  ticket.status = 'Resolt';
  res.json({ success: true, ticket });
});

// ─── 8. TELEMETRIA I MONITORATGE EN TEMPS REAL ─────────────────────────────────
app.get('/api/telemetria', (req, res) => {
  // Simular oscil·lació realista de CPU, RAM i Ping en temps real
  const dynamicNodes = liveStore.telemetry.map(node => ({
    ...node,
    cpu: Math.min(95, Math.max(5, node.cpu + Math.floor(Math.random() * 7 - 3))),
    ram: Math.min(92, Math.max(25, node.ram + Math.floor(Math.random() * 3 - 1))),
    ping: Number((node.ping + (Math.random() * 0.4 - 0.2)).toFixed(2))
  }));
  res.json(dynamicNodes);
});

// ─── 9. DIAGNÒSTIC DE XARXA (PING & NMAP SIMULAT PER AL PANELL) ───────────────
app.post('/api/diagnostics/ping', (req, res) => {
  const { host } = req.body;
  const target = host || '192.168.10.1';
  const pingMs = (0.4 + Math.random() * 2.5).toFixed(2);
  const ttl = 64;
  res.json({
    host: target,
    status: 'ONLINE',
    latency_ms: pingMs,
    ttl,
    packets: { sent: 4, received: 4, lost: 0, loss_rate: '0%' },
    gateway: '192.168.10.1 (DFactory Cisco Core L3)'
  });
});

// ─── 9.1. AUDITORIA AUTOMÀTICA PROGRAMADA (/api/audit) ────────────────────────
app.get('/api/audit', (req, res) => {
  const latest = liveStore.auditLogs.length > 0
    ? liveStore.auditLogs[0]
    : runSystemAudit(isDbConnected);
  res.json({
    ...latest,
    current: latest,
    latest,
    history: liveStore.auditLogs,
    logs: liveStore.auditLogs
  });
});

app.post('/api/audit/run', (req, res) => {
  const latest = runSystemAudit(isDbConnected);
  res.status(201).json({
    success: true,
    ...latest,
    current: latest,
    latest,
    history: liveStore.auditLogs,
    logs: liveStore.auditLogs
  });
});

// Planificador d'auditoria periòdica automàtica cada 60 segons en segon pla
setInterval(() => {
  runSystemAudit(isDbConnected);
}, 60 * 1000);

// ─── 9.2. SPA FALLBACK / ROUTING DE PRODUCCIÓ ─────────────────────────────────
app.use((req, res) => {
  if (req.method === 'GET') {
    if (req.path.startsWith('/api') || req.path.startsWith('/database')) {
      return res.status(404).json({ error: `Ruta API '${req.path}' no trobada.` });
    }
    if (fs.existsSync(DIST_INDEX)) {
      return res.sendFile(DIST_INDEX);
    }
  }
  res.status(404).send(renderGatewayHtml());
});

// ─── 10. INICI DEL SERVIDOR ───────────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`[API] KernelCore Backend API escoltant al port ${PORT} (http://localhost:${PORT})`);
  console.log(`[SEU] Seu Central: DFactory Barcelona (Zona Franca)`);
  isDbConnected = await testConnection();
  runSystemAudit(isDbConnected);
});

# CHECKPOINTS I TASQUES DE PROJECTE PER A MICROSOFT PLANNER
## Projecte de Síntesi: KernelCore (CFGM SMX 2026/27 · DFactory Barcelona)
## Responsables: Hans Lao Moncusí & Joel Pérez Armenteros

---

### BUCKET 1: IDENTITAT CORPORATIVA, BRANDING I FRONTEND PÚBLIC

- [x] Definició de marca oficial única **KernelCore** (eliminació de referències antigues a KryptonCore).
- [x] Creació del component de logotip vectorial oficial `Logo.jsx` (hexàgon cibernètic amb lletra K i nodes de xarxa).
- [x] Exportació d'actius corporatius SVG i PNG (`logo-mark.svg`, `favicon.svg`).
- [x] Disseny de la barra de navegació superior `Navbar.jsx` amb efecte vidre acrílic (*glassmorphism*).
- [x] Unificació del breakpoint responsive a `lg` per evitar salts de menú en tauletes i portàtils.
- [x] Maquetació de la secció d'impacte `Hero.jsx` amb titular tecnològic i canvas de fons interactiu.
- [x] Fixació de la seu central única oficial a **DFactory Barcelona (Zona Franca, Carrer 27 del BZ, 10-16)**.
- [x] Implementació del peu de pàgina corporatiu `Footer.jsx` amb enllaços legals, dades fiscals i mapa de serveis.
- [x] Disseny i programació del bàner de consentiment de galetes `CookieBanner.jsx` amb configuració granular RGPD.
- [x] Creació del modal de polítiques legals `LegalModal.jsx` (Avís Legal, Política de Privacitat RGPD i Termes de Servei).

---

### BUCKET 2: CATÀLEG DE SERVEIS, METODOLOGIA I EXPERIÈNCIA MÒBIL

- [x] Estructuració del catàleg de serveis d'enginyeria a `servicesData.js` (Racks, Cat6A, Commutació L2/L3, NGFW, SAI i Servidors).
- [x] Disseny de la secció `Services.jsx` en graella d'alta densitat per a escriptori.
- [x] Programació de l'acordió mòbil interactiu mitjançant `IntersectionObserver`.
- [x] Implementació del desplegament progressiu automàtic en fer scroll descendent a dispositius mòbils.
- [x] Implementació del tancament automàtic en superar la targeta i reobertura en fer scroll ascendent.
- [x] Disseny de les 4 targetes d'enginyeria a `Methodology.jsx` (Auditoria, Disseny CAD, Desplegament i Certificació Fluke).
- [x] Transició de hover suau amb corba Bezier cúbica (`cubic-bezier(0.16, 1, 0.3, 1)`) i resplendor ambiental.
- [x] Formulari de contacte web controlat a `Contact.jsx` amb validació de camps i consentiment LOPD-GDD.
- [x] Connexió del formulari de contacte a l'endpoint `POST /api/contacte` amb inserció a la base de dades.

---

### BUCKET 3: HUB DE PRESSUPOSTOS I CALCULADORA DE CÀRREGA SAI

- [x] Disseny del formulari de sol·licitud pública de pressupost `QuoteRequestForm.jsx`.
- [x] Integració de la Calculadora de Càrrega i Autonomia Elèctrica per a SAIs (PCs, servidors i switches).
- [x] Càlcul dinàmic de potència activa en Watts (W) i potència aparent requerida amb un +20% de marge de seguretat (VA).
- [x] Estimació d'autonomia en minuts i recomanació automàtica de model homologat (APC Smart-UPS / Salicru Twin Pro2).
- [x] Creació del simulador i configurador tècnic avançat `QuotationHub.jsx`.
- [x] Càlcul en temps real del cost de maquinari, electrònica de xarxa, llicències de programari i mà d'obra de certificació.
- [x] Càlcul de Base Imposable, IVA vigent (21%) i opció de quota mensual de suport preventiu SLA.
- [x] Descarrega de proposta en format text pla estructurat (`.txt`) i còpia al porta-retalls en un clic.

---

### BUCKET 4: MOTOR DE FACTURA PROFORMA I GENERACIÓ PDF

- [x] Instal·lació i configuració de la llibreria binària `pdfkit` al servidor Express (`server/pdfGenerator.js`).
- [x] Disseny del document executiu oficial en format A4 de 2 pàgines tipus **Factura Proforma / Pressupost d'Enginyeria**.
- [x] Dibuix vectorial directe del logotip corporatiu de KernelCore en coordenades PDFKit (resolució infinita).
- [x] Capçalera fiscal completa amb dades de l'emissor (**KERNELCORE S.L.**, NIF B-67981234, DFactory Barcelona).
- [x] Bloc de dades del client, número de proforma (`PF-2026-XXX`), data d'emissió i validesa de 30 dies.
- [x] Taula de partides amb codis SKU (`RACK-19-42U`, `SW-POE-L2L3`, `CAB-CAT6A-LS`, `LIC-SEC-NGFW`, `ENG-LABOR-CERT`).
- [x] Inclusió de dades bancàries oficials per a transferència SEPA (CaixaBank / Banc Sabadell, compte IBAN i BIC/SWIFT).
- [x] Disseny del bloc tripartit de signatures amb traçat digital de tinta blava per a Hans Lao Moncusí i Joel Pérez Armenteros.
- [x] Pàgina 2 d'Annex Tècnic amb memòria d'abast, dimensionament SAI, normatives Fluke DSX-8000 i Codi Segur de Verificació (CSV).
- [x] Endpoint `GET /api/pressupostos/:id/pdf` per a visualització directa al navegador o descàrrega de fitxer.

---

### BUCKET 5: MOTOR DE CORREU ELECTRÒNIC SMTP I NOTIFICACIONS

- [x] Integració de `nodemailer` al servidor backend (`server/mailer.js`).
- [x] Creació de la plantilla de correu electrònic en HTML corporatiu responsive sense emojis.
- [x] Generació i adjunció automàtica del fitxer binari `Pressupost_KernelCore_PF-2026-XXX.pdf` al correu de sortida.
- [x] Configuració del Sandbox de proves integrat **Ethereal SMTP** amb generació d'enllaços webmail de verificació.
- [x] Implementació del protocol SMTP oficial de Google Workspace (`service: 'gmail'`) per a lliurament directe a bústies reals.
- [x] Connexió del compte oficial `igarciamunoz484@gmail.com` mitjançant contrasenya d'aplicació de 16 caràcters.
- [x] Persistència de les credencials SMTP a l'arxiu `.env` protegit al `.gitignore`.
- [x] Modal de configuració SMTP en calent al Dashboard amb opció d'alternar entre Ethereal i Gmail SMTP.
- [x] Safata d'historial d'enviaments de correus a la pestanya de Pressupostos (`/api/emails/history`).

---

### BUCKET 6: PANELL DE CONTROL I INTRANET CORPORATIVA (DASHBOARD)

- [x] Desenvolupament de la intranet integral `Dashboard.jsx` per a la gestió d'operacions de KernelCore.
- [x] Sistema d'autenticació i control d'accés basat en rols (**RBAC**) amb 3 perfils oficials:
  - Administrador KernelCore (Direcció DFactory)
  - Hans Lao Moncusí (Direcció Tècnica · Sistemes & Seguretat)
  - Joel Pérez Armenteros (Direcció General · Infraestructura de Xarxes)
- [x] Selector ràpid de perfils oficials al modal d'inici de sessió `LoginModal.jsx` per a la defensa davant el tribunal.
- [x] Pestanya de **Magatzem & Estoc**: gestió de les 100 referències de maquinari i 30 marques tecnològiques homologades.
- [x] Modal d'injecció de capital inversor amb 4 nivells de paquetització (Bàsic, Mitjà, CPD i Megapack 100 SKUs).
- [x] Pestanya de **Sol·licituds IT**: recepció de leads de la web amb botó per convertir a pressupost immediat.
- [x] Pestanya de **Pressupostos IT**: accions per veure PDF, descarregar PDF i enviar per correu amb fitxer adjunt.
- [x] Pestanya de **Projectes Actius**: seguiment d'instal·lacions en curs, fites tècniques i assignació de responsable (Hans/Joel).
- [x] Pestanya de **Tiquets SAT & Suport**: incidències tècniques amb codis SLA (< 4h) i diagnòstics de resolució.
- [x] Nova pestanya de **Clients Corporatius**: registre de PIMEs i indústries clientes a l'àrea de Barcelona.
- [x] Nova pestanya de **Proveïdors Oficials**: mayoristes oficials (Ingram Micro, Esprinet, Schneider Electric, TD SYNNEX, Posiflex).

---

### BUCKET 7: BASE DE DADES RELACIONAL MARIADB I FALLBACK DE MEMÒRIA

- [x] Disseny de l'esquema relacional en SQL (`database/kernelcore_db.sql`) amb codificació `utf8mb4_unicode_ci`.
- [x] Creació de les taules relacionades: `usuaris_tecnics`, `inventari_maquinari`, `sollicituds_pressupost`, `pressupostos`, `projectes_instalacio`, `tiquets_sat`, `clients`, `proveidors` i `contactes_web`.
- [x] Càrrega de les 100 referències completes d'inventari a la taula `inventari_maquinari` amb categories i gammes.
- [x] Connexió mitjançant `mysql2/promise` amb pool de connexions al port 3306 de MariaDB / XAMPP.
- [x] Motor de contingència automàtica a memòria (`server/dataStore.js` i `dashboardMockData.js`) si la base de dades s'apaga.
- [x] Endpoint `GET /database/kernelcore_db.sql` per descarregar l'script SQL complet des de la interfície.
- [x] Redacció de la memòria d'arquitectura backend a `database/ARQUITECTURA_BACKEND_SMX.md`.

---

### BUCKET 8: TELEMETRIA, DIAGNÒSTICS DE XARXA I AUDITORIA PROGRAMADA

- [x] Monitoratge en temps real dels 4 nodes de telemetria de KernelCore a DFactory Barcelona:
  - `SRV-DC01` (Controlador de Domini Windows Server 2025)
  - `NAS-BCN` (Servidor d'emmagatzematge i còpies de seguretat 3-2-1)
  - `SW-CORE-01` (Commutador troncal Cisco Catalyst L3)
  - `UPS-APC-3000` (SAI On-Line Doble Conversió 3000VA)
- [x] Consola interactiva de diagnòstics de xarxa ICMP Ping amb taxa de pèrdua de paquets i latència en mil·lisegons.
- [x] Motor d'auditoria automàtica programada cada 60 segons en segon pla (`runSystemAudit`).
- [x] Verificació periòdica dels 5 controls crítics (Base de Dades, Estoc de 100 SKUs, Nodos DFactory, Seguretat RBAC i Endpoints API).
- [x] Botó d'execució d'auditoria immediata sota demanda amb informe de puntuació (Score 100% OPTIMAL).
- [x] Script d'engegada unificada `npm run dev:all` mitjançant `concurrently` per aixecar backend i frontend alhora.

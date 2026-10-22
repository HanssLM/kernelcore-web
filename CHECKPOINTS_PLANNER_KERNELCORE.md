# TASQUES DE PROJECTE PER A MICROSOFT PLANNER · KERNELCORE
## Projecte de Síntesi CFGM SMX (2026/27) · DFactory Barcelona
## Responsables: Hans Lao Moncusí & Joel Pérez Armenteros

Aquest document conté la selecció optimitzada de **60 tasques petites i concretes**, dissenyades específicament per ser introduïdes a **Microsoft Planner** sense saturar el tauler Kanban i reflectint fidelment tot el desenvolupament realitzat.

---

### ESTRUCTURA RECOMANADA PER A MICROSOFT PLANNER

A Microsoft Planner, el flux de treball més eficient per a 2 persones és organitzar el tauler en **7 Cubells (Buckets)** temàtics. Cada tasca és petita, concreta i assignable a **Hans**, a **Joel** o a **Ambdós**.

---

### CUBELL 1: CONCEPCIÓ, DISSENY I IDENTITAT (BRANDING)
- [x] **T01.** Definir l'objecte social i model d'empresa d'instal·lacions i serveis IT a DFactory Barcelona. *(Ambdós)*
- [x] **T02.** Assignar rols fundacionals: Hans (Sistemes & Seguretat) i Joel (Xarxes & Cablejat). *(Ambdós)*
- [x] **T03.** Dissenyar la identitat visual corporativa: paleta de colors (blau fosc `#0b1329` i cyan `#06b6d4`). *(Hans)*
- [x] **T04.** Crear el logotip vectorial hexagonal amb la lletra K i nodes de xarxa en SVG (`Logo.jsx`). *(Joel)*
- [x] **T05.** Generar el favicon corporatiu (`favicon.svg`) i el manifest d'aplicació web. *(Hans)*
- [x] **T06.** Eliminar qualsevol rastre de marques anteriors (KryptonCore / KernelCore IT) i unificar a **KernelCore**. *(Joel)*
- [x] **T07.** Eliminar totes les icones informals o emojis del codi i documents per mantenir un to 100% industrial. *(Hans)*
- [x] **T08.** Digitalitzar les signatures oficials vectorials de Hans i Joel a tinta blava corporativa. *(Joel)*

---

### CUBELL 2: INFRAESTRUCTURA DE CODI I REPOSITORI GIT
- [x] **T09.** Inicialitzar el repositori Git del projecte amb control de versions i branques. *(Hans)*
- [x] **T10.** Configurar l'entorn de treball amb React 19, Vite i Tailwind CSS. *(Joel)*
- [x] **T11.** Instal·lar la suite d'icones industrials `lucide-react`. *(Hans)*
- [x] **T12.** Configurar l'eina de revisió estàtica de codi `oxlint` amb 0 advertències. *(Joel)*
- [x] **T13.** Crear el fitxer `.gitignore` per protegir credencials, `.env` i dependències pesades. *(Hans)*
- [x] **T14.** Crear l'script de llançament concurrent `npm run dev:all` (Vite + Express). *(Joel)*

---

### CUBELL 3: FRONTEND PÚBLIC I INTERFÍCIE WEB
- [x] **T15.** Crear la barra de navegació superior `Navbar.jsx` amb efecte *glassmorphism* i desplaçament suau. *(Hans)*
- [x] **T16.** Programar el menú mòbil desplegable accessible resolent els punts de ruptura a tauletes (`lg`). *(Joel)*
- [x] **T17.** Dissenyar la portada d'impacte `Hero.jsx` amb canvas animat de nodes i respecte a `prefers-reduced-motion`. *(Hans)*
- [x] **T18.** Definir les dades dels serveis d'enginyeria a `servicesData.js` (Racks, Cat6A, L2/L3, NGFW, SAI, Servidors). *(Joel)*
- [x] **T19.** Maquetar la graella de serveis a `Services.jsx` amb targetes il·luminades i xips de característiques. *(Hans)*
- [x] **T20.** Implementar l'acordió mòbil automàtic mitjançant l'API nativa `IntersectionObserver`. *(Joel)*
- [x] **T21.** Dissenyar la secció de metodologia en 4 etapes (Auditoria, Disseny, Desplegament i Certificació Fluke). *(Hans)*
- [x] **T22.** Crear la secció d'equip directiu `Team.jsx` amb les fitxes tècniques de Hans i Joel. *(Joel)*
- [x] **T23.** Crear el formulari de contacte web controlat `Contact.jsx` amb validació de camps. *(Hans)*
- [x] **T24.** Integrar el modal de suite legal `LegalModal.jsx` (Avís legal LSSI, Privacitat RGPD i Garantia de 2 anys). *(Joel)*
- [x] **T25.** Implementar el bàner flotant de galetes `CookieBanner.jsx` amb memòria persistent a `localStorage`. *(Hans)*

---

### CUBELL 4: EINES INTERACTIVES (SAI I PRESSUPOSTOS)
- [x] **T26.** Dissenyar la **Calculadora Interactiva de Càrrega i Autonomia SAI** amb sliders de potència (W). *(Hans)*
- [x] **T27.** Implementar el càlcul automàtic de potència aparent en VA amb marge de seguretat del +20%. *(Joel)*
- [x] **T28.** Afegir l'algorisme de recomanació del model de SAI (APC Smart-UPS / Salicru 1500VA, 3000VA, 5000VA). *(Hans)*
- [x] **T29.** Crear el configurador integral de pressupostos `QuotationHub.jsx` connectat a sol·licituds prèvies. *(Joel)*
- [x] **T30.** Implementar selectors de material: armaris rack (12U/42U), switches L2/L3 PoE+, NAS i seguretat NGFW. *(Hans)*
- [x] **T31.** Programar el càlcul automàtic de Base Imposable, IVA (21%) i quota mensual de manteniment SLA. *(Joel)*
- [x] **T32.** Afegir botons d'exportació de la proposta a fitxer de text estructurat `.txt` i còpia al porta-retalls. *(Hans)*

---

### CUBELL 5: MOTOR PDF I SERVEI DE CORREU CORPORATIU
- [x] **T33.** Desenvolupar el generador de PDF binari en memòria `server/pdfGenerator.js` mitjançant `pdfkit`. *(Hans)*
- [x] **T34.** Dibuixar el logotip vectorial hexagonal de KernelCore amb primitives gràfiques de PDF. *(Joel)*
- [x] **T35.** Dissenyar la maquetació oficial de **Factura Proforma / Pressupost** amb doble bloc fiscal i dades bancàries IBAN. *(Hans)*
- [x] **T36.** Incrustar les signatures oficials digitalitzades de Hans i Joel a tinta blava a la Pàgina 1. *(Joel)*
- [x] **T37.** Crear la Pàgina 2 del PDF com a **Annex Tècnic d'Enginyeria**, càlcul SAI, normes Fluke i Codi Segur de Verificació (CSV). *(Hans)*
- [x] **T38.** Configurar el mòdul de transport de correu `server/mailer.js` amb la llibreria `nodemailer`. *(Joel)*
- [x] **T39.** Dissenyar la plantilla de correu HTML responsive en to corporatiu sense emojis. *(Hans)*
- [x] **T40.** Integrar el relé SMTP de Gmail amb autenticació per contrasenya d'aplicació i arxiu protegit `.env`. *(Joel)*
- [x] **T41.** Crear l'endpoint `POST /api/pressupostos/send-email` per enviar el pressupost amb el PDF adjunt automàticament. *(Hans)*
- [x] **T42.** Crear l'endpoint `GET /api/pressupostos/:id/pdf` per a descàrrega i previsualització immediata. *(Joel)*

---

### CUBELL 6: BASE DE DADES MARIADB I PANNELL DASHBOARD
- [x] **T43.** Dissenyar l'esquema relacional de la base de dades `kernelcore_db.sql` en UTF-8 (`utf8mb4`). *(Hans)*
- [x] **T44.** Crear les taules de gestió: usuaris RBAC, inventari, clients, proveïdors, projectes, tiquets i contactes. *(Joel)*
- [x] **T45.** Inserir les **100 referències reals de maquinari** i electrònica de xarxa amb SKUs i estocs mínims. *(Hans)*
- [x] **T46.** Configurar el pool de connexions MySQL a `server/db.js` amb reconexió automàtica. *(Joel)*
- [x] **T47.** Implementar la passarel·la de dades a memòria de seguretat (`dataStore.js`) com a fallback si MariaDB no està engegada. *(Hans)*
- [x] **T48.** Desenvolupar el panell de control intern `Dashboard.jsx` amb navegació per pestanyes. *(Joel)*
- [x] **T49.** Implementar el control d'accés per rols (**RBAC**) diferenciant Admin General, Hans (Sistemes) i Joel (Xarxes). *(Hans)*
- [x] **T50.** Crear el selector ràpid de perfils a `LoginModal.jsx` per entrar en 1 clic durant la defensa davant el tribunal. *(Joel)*
- [x] **T51.** Afegir el filtre d'àmbit tècnic personalitzat a la llista de projectes i tiquets SAT. *(Hans)*
- [x] **T52.** Crear el modal d'injecció de capital d'inversor amb paquets calculats per ampliar l'estoc de les 100 referències. *(Joel)*
- [x] **T53.** Integrar la secció de Clients corporatius i la secció de Proveïdors oficials homologats. *(Hans)*
- [x] **T54.** Implementar la consola de diagnòstic de xarxa amb comanda de Ping ICMP en viu. *(Joel)*
- [x] **T55.** Programar el motor d'auditoria automàtica del sistema cada 60 segons verificant els 5 pilars d'integritat. *(Hans)*

---

### CUBELL 7: DESPLEGAMENT EN CONTENIDORS DOCKER I PREPARACIÓ FINAL
- [x] **T56.** Crear el `Dockerfile.backend` per empaquetar l'API Express en entorn lleuger Node Alpine. *(Hans)*
- [x] **T57.** Crear el `Dockerfile` *multi-stage* per compilar React i servir-lo sota un servidor web d'alt rendiment Nginx. *(Joel)*
- [x] **T58.** Configurar `nginx.conf` amb proxy invers intern cap al backend (`/api/`) evitant problemes de CORS. *(Hans)*
- [x] **T59.** Crear el fitxer d'orquestració `docker-compose.yml` que enllaça MariaDB, Backend i Frontend amb una sola comanda. *(Joel)*
- [x] **T60.** Redactar la guia de desplegament `DOCKER_KERNELCORE.md` i verificar que tot el projecte passa `oxlint` amb 0 errors. *(Ambdós)*

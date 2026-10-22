# TASQUES DE PROJECTE PER A MICROSOFT PLANNER · KERNELCORE
## Plataforma Web & Infraestructura Digital: KernelCore (DFactory Barcelona)
## Autor, Desenvolupador i Titular dels Drets de la Web: Hans Lao Moncusí
## Projecte de Síntesi CFGM SMX (2026/27)

> **Nota d'Atribució i Propietat Intel·lectual**: La totalitat del disseny, desenvolupament frontend, backend REST API, base de dades SQL, generador de PDF, sistema de correu SMTP i contenidors Docker de la plataforma web KernelCore ha estat desenvolupada íntegrament per **Hans Lao Moncusí**, qui ostenta la totalitat dels drets i la responsabilitat tècnica de la web.

---

### ESTRUCTURA DE 60 TASQUES A MICROSOFT PLANNER (RESPONSABLE: HANS LAO MONCUSÍ)

---

### CUBELL 1: CONCEPCIÓ, DISSENY I IDENTITAT (BRANDING)
- [x] **T01.** Definir l'objecte social, model tecnològic i catàleg de serveis de KernelCore a DFactory Barcelona. *(Hans Lao)*
- [x] **T02.** Establir la identitat corporativa i registrar la titularitat dels drets del projecte web. *(Hans Lao)*
- [x] **T03.** Dissenyar la paleta cromàtica corporativa: blau nit fosc (`#0b1329`) i cyan elèctric (`#06b6d4`). *(Hans Lao)*
- [x] **T04.** Programar el logotip vectorial hexagonal amb circuit de pistes K i nodes de xarxa en SVG (`Logo.jsx`). *(Hans Lao)*
- [x] **T05.** Generar el favicon corporatiu vectorial (`favicon.svg`) i els metadats web d'alta resolució. *(Hans Lao)*
- [x] **T06.** Netejar la denominació de marca i unificar estrictament a **KernelCore** (eliminant referències anteriors). *(Hans Lao)*
- [x] **T07.** Suprimir totes les icones informals o emojis del codi i de les vistes per garantir un to 100% professional. *(Hans Lao)*
- [x] **T08.** Dissenyar el sistema de signatures oficials vectorials a tinta blava per a documents legals i tècnics. *(Hans Lao)*

---

### CUBELL 2: INFRAESTRUCTURA DE CODI I REPOSITORI GIT
- [x] **T09.** Inicialitzar el repositori Git del projecte amb control de versions i estructura de branques. *(Hans Lao)*
- [x] **T10.** Configurar l'entorn de desenvolupament basat en React 19, Vite com a bundler i Tailwind CSS. *(Hans Lao)*
- [x] **T11.** Integrar la suite d'iconografia industrial vectorial `lucide-react`. *(Hans Lao)*
- [x] **T12.** Configurar l'eina de linter estàtic `oxlint` assegurant 0 advertències i 0 errors a tot el codi font. *(Hans Lao)*
- [x] **T13.** Crear el fitxer `.gitignore` per blindar credencials d'accés, claus d'entorn `.env` i dependències. *(Hans Lao)*
- [x] **T14.** Programar el llançament concurrent `npm run dev:all` per aixecar servidor web i backend en paral·lel. *(Hans Lao)*

---

### CUBELL 3: FRONTEND PÚBLIC I INTERFÍCIE WEB
- [x] **T15.** Programar la barra de navegació superior `Navbar.jsx` amb efecte *glassmorphism* i desplaçament suau. *(Hans Lao)*
- [x] **T16.** Implementar el menú mòbil desplegable responsive resolent els punts de ruptura a tauletes (`lg`). *(Hans Lao)*
- [x] **T17.** Dissenyar la portada d'impacte `Hero.jsx` amb canvas animat de nodes i suport a `prefers-reduced-motion`. *(Hans Lao)*
- [x] **T18.** Estructurar el catàleg de dades dels serveis d'enginyeria a `servicesData.js` (Racks, Cat6A, L2/L3, NGFW, SAI, Servidors). *(Hans Lao)*
- [x] **T19.** Maquetar la graella de serveis a `Services.jsx` amb targetes d'alta tecnologia i il·luminació cyan. *(Hans Lao)*
- [x] **T20.** Programar l'acordió mòbil automàtic mitjançant l'API nativa del navegador `IntersectionObserver`. *(Hans Lao)*
- [x] **T21.** Desenvolupar la secció de metodologia d'enginyeria en 4 etapes (Auditoria, Disseny, Desplegament i Certificació Fluke). *(Hans Lao)*
- [x] **T22.** Crear la secció d'equip i lideratge tècnic `Team.jsx` establint el perfil de direcció i sistemes. *(Hans Lao)*
- [x] **T23.** Desenvolupar el formulari web controlat de contacte `Contact.jsx` amb validació de camps en temps real. *(Hans Lao)*
- [x] **T24.** Integrar el modal de suite legal `LegalModal.jsx` (Avís legal LSSI, Privacitat RGPD i Garantia de 2 anys). *(Hans Lao)*
- [x] **T25.** Implementar el bàner flotant de consentiment de galetes `CookieBanner.jsx` amb persistència a `localStorage`. *(Hans Lao)*

---

### CUBELL 4: EINES INTERACTIVES (SAI I PRESSUPOSTOS)
- [x] **T26.** Dissenyar la **Calculadora Interactiva de Càrrega i Autonomia SAI** amb controls de potència activa (W). *(Hans Lao)*
- [x] **T27.** Programar el càlcul automàtic de potència aparent en VA aplicant el marge de seguretat del +20%. *(Hans Lao)*
- [x] **T28.** Desenvolupar l'algorisme de recomanació del model de SAI (APC Smart-UPS / Salicru 1500VA, 3000VA, 5000VA). *(Hans Lao)*
- [x] **T29.** Crear el configurador integral de pressupostos `QuotationHub.jsx` connectat a sol·licituds prèvies de clients. *(Hans Lao)*
- [x] **T30.** Implementar selectors de material: armaris rack (12U/42U), switches L2/L3 PoE+, NAS i seguretat NGFW. *(Hans Lao)*
- [x] **T31.** Programar el motor econòmic: càlcul de Base Imposable, IVA general (21%) i quota mensual de suport SLA. *(Hans Lao)*
- [x] **T32.** Afegir botons d'exportació de la proposta a fitxer de text estructurat `.txt` i còpia directa al porta-retalls. *(Hans Lao)*

---

### CUBELL 5: MOTOR PDF I SERVEI DE CORREU CORPORATIU
- [x] **T33.** Desenvolupar el generador de PDF binari en memòria `server/pdfGenerator.js` mitjançant la llibreria `pdfkit`. *(Hans Lao)*
- [x] **T34.** Programar el dibuix del logotip vectorial hexagonal de KernelCore mitjançant primitives gràfiques de PDF. *(Hans Lao)*
- [x] **T35.** Maquetar el document oficial de **Factura Proforma / Pressupost** amb doble bloc fiscal i dades bancàries IBAN. *(Hans Lao)*
- [x] **T36.** Integrar les signatures oficials digitalitzades a tinta blava a la Pàgina 1 sense errors de maquetació. *(Hans Lao)*
- [x] **T37.** Crear la Pàgina 2 del PDF com a **Annex Tècnic d'Enginyeria**, càlcul SAI, normes Fluke i Codi CSV de verificació. *(Hans Lao)*
- [x] **T38.** Configurar el mòdul de transport de correu corporatiu `server/mailer.js` mitjançant la llibreria `nodemailer`. *(Hans Lao)*
- [x] **T39.** Dissenyar la plantilla de correu HTML responsive en to professional blau nit sense emojis. *(Hans Lao)*
- [x] **T40.** Integrar el relé SMTP de Gmail amb contrasenya d'aplicació xifrada i arxiu protegit `.env`. *(Hans Lao)*
- [x] **T41.** Crear l'endpoint `POST /api/pressupostos/send-email` per enviar el pressupost amb el PDF adjunt en viu. *(Hans Lao)*
- [x] **T42.** Crear l'endpoint `GET /api/pressupostos/:id/pdf` per a descàrrega i previsualització immediata al navegador. *(Hans Lao)*

---

### CUBELL 6: BASE DE DADES MARIADB I PANELL DASHBOARD
- [x] **T43.** Dissenyar l'esquema relacional de la base de dades `kernelcore_db.sql` en UTF-8 (`utf8mb4_unicode_ci`). *(Hans Lao)*
- [x] **T44.** Crear les taules de gestió: usuaris RBAC, inventari, clients, proveïdors, projectes, tiquets i contactes. *(Hans Lao)*
- [x] **T45.** Inserir les **100 referències reals de maquinari** i electrònica de xarxa amb SKUs i estocs de seguretat. *(Hans Lao)*
- [x] **T46.** Configurar el pool de connexions MySQL a `server/db.js` amb gestió de reconexió automàtica. *(Hans Lao)*
- [x] **T47.** Implementar la passarel·la de dades a memòria de seguretat (`dataStore.js`) com a fallback si MariaDB no està engegada. *(Hans Lao)*
- [x] **T48.** Desenvolupar el panell de control intern `Dashboard.jsx` amb arquitectura modular de pestanyes. *(Hans Lao)*
- [x] **T49.** Implementar el control d'accés per rols (**RBAC**) diferenciant permisos de direcció i d'enginyeria. *(Hans Lao)*
- [x] **T50.** Crear el selector ràpid de perfils a `LoginModal.jsx` per iniciar sessió en 1 clic durant la defensa tècnica. *(Hans Lao)*
- [x] **T51.** Afegir el filtre d'àmbit tècnic personalitzat a la llista de projectes i tiquets SAT de la plataforma. *(Hans Lao)*
- [x] **T52.** Crear el modal d'injecció de capital d'inversor amb paquets calculats per ampliar l'estoc de les 100 referències. *(Hans Lao)*
- [x] **T53.** Integrar la secció de Clients corporatius de Barcelona i la secció de Proveïdors oficials homologats. *(Hans Lao)*
- [x] **T54.** Implementar la consola de diagnòstic de xarxa amb comanda de Ping ICMP en temps real. *(Hans Lao)*
- [x] **T55.** Programar el motor d'auditoria automàtica del sistema cada 60 segons verificant els 5 pilars d'integritat. *(Hans Lao)*

---

### CUBELL 7: DESPLEGAMENT EN CONTENIDORS DOCKER I ASSEGURAMENT DE QUALITAT
- [x] **T56.** Crear el `Dockerfile.backend` per empaquetar l'API Express en entorn lleuger Node 22 Alpine. *(Hans Lao)*
- [x] **T57.** Crear el `Dockerfile` *multi-stage* per compilar React i servir-lo sota un servidor web d'alt rendiment Nginx. *(Hans Lao)*
- [x] **T58.** Configurar `nginx.conf` amb proxy invers intern cap al backend (`/api/`) eliminant conflictes de CORS. *(Hans Lao)*
- [x] **T59.** Crear el fitxer d'orquestració `docker-compose.yml` que enllaça MariaDB, Backend i Frontend amb una sola comanda. *(Hans Lao)*
- [x] **T60.** Redactar la guia de desplegament `DOCKER_KERNELCORE.md` i auditar que tot el projecte passa `oxlint` amb 0 errors. *(Hans Lao)*

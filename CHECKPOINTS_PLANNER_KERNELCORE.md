# CHECKPOINTS I TASQUES DE PROJECTE PER A MICROSOFT PLANNER (DES DE PUNT ZERO FINS A L'ACTUALITAT)
## Projecte de Síntesi: KernelCore (CFGM SMX 2026/27 · DFactory Barcelona)
## Responsables de Projecte: Hans Lao Moncusí & Joel Pérez Armenteros
## Total Checkpoints: 200 tasques granulars estructurades per fases

---

### BUCKET 1: CONCEPCIÓ DE NEGOCI, PLANIFICACIÓ I DEFINICIÓ INICIAL (Checkpoints 1 - 12)
- [x] 001. Definició de la idea de negoci: empresa d'enginyeria de xarxes, sistemes i ciberseguretat per a PIMEs.
- [x] 002. Establiment dels socis fundadors: Hans Lao Moncusí (Sistemes & Seguretat) i Joel Pérez Armenteros (Xarxes & Cablejat).
- [x] 003. Elecció i fixació de la seu central oficial a DFactory Barcelona (Zona Franca, Carrer 27 del BZ, 10-16).
- [x] 004. Anàlisi de mercat i competència d'instal·ladors de telecomunicacions a l'àrea metropolitana de Barcelona.
- [x] 005. Definició del marc formatiu: Mòdul de Síntesi de Cicle Formatiu de Grau Mitjà (CFGM SMX 2026/2027).
- [x] 006. Establiment del model de serveis: disseny de xarxes Cat6A, servidors locals/híbrids, seguretat NGFW i manteniment SLA.
- [x] 007. Estudi de requisits de maquinari per a muntatge de racks industrials de 19 polzades.
- [x] 008. Determinació de marques tecnològiques oficials de referència (Cisco, Ubiquiti, Fortinet, APC, Fluke Networks, etc.).
- [x] 009. Definició de la política de preus: costos de maquinari, electrònica, programari i mà d'obra certificada.
- [x] 010. Establiment de les ràtios de marge comercial i quota mensual de manteniment preventiu SLA (< 4 hores).
- [x] 011. Redacció inicial de la memòria descriptiva del projecte i abast d'actuació.
- [x] 012. Planificació del calendari d'execució mitjançant diagrames de tasques i fites operatives.

---

### BUCKET 2: IDENTITAT DE MARCA, BRANDING I ASSETS GRÀFICS (Checkpoints 13 - 24)
- [x] 013. Transició de marca i unificació definitiva de la denominació corporativa com a **KernelCore** (eliminació de KryptonCore).
- [x] 014. Definició de la paleta de colors corporativa: blau nit (`#030712`, `#0b1329`), cyan elèctric (`#06b6d4`, `#22d3ee`) i gris pissarra.
- [x] 015. Elecció de la tipografia corporativa d'alta llegibilitat: Outfit i Plus Jakarta Sans.
- [x] 016. Concepció geomètrica del logotip: hexàgon cibernètic que allotja la lletra K formada per pistes de circuit imprès.
- [x] 017. Incorporació de nodes de topologia de xarxa als vèrtexs de l'hexàgon del logotip.
- [x] 018. Creació del component de logotip vectorial interactiu en React (`src/components/Logo.jsx`).
- [x] 019. Implementació de les variants del logotip: `horizontal`, `stacked` i `mark`.
- [x] 020. Creació de l'arxiu vectorial del logotip oficial `public/logo-mark.svg`.
- [x] 021. Disseny i configuració de la icona de pestanya del navegador `public/favicon.svg`.
- [x] 022. Supressió de tota iconografia d'aspecte informal (zero emojis) per garantir un aspecte 100% industrial i rigorós.
- [x] 023. Digitalització i neteja de les signatures oficials de Hans Lao Moncusí i Joel Pérez Armenteros.
- [x] 024. Normalització de les dades fiscals: Raó Social KERNELCORE S.L. i NIF oficial B-67981234.

---

### BUCKET 3: ESTRUCTURA TECNOLÒGICA, REPOSITORI I TOOLCHAIN (Checkpoints 25 - 36)
- [x] 025. Inicialització del repositori de control de versions Git (`git init`).
- [x] 026. Configuració de l'entorn de treball en React 19 amb Vite com a empaquetador ultraràpid.
- [x] 027. Configuració del framework de disseny Tailwind CSS per a classes d'utilitat i variables de tema.
- [x] 028. Configuració de l'arxiu de dependències `package.json` amb el nom oficial `kernelcore-web`.
- [x] 029. Configuració de la protecció de fitxers sensibles mitjançant `.gitignore` (`node_modules`, `.env`, logs, credencials).
- [x] 030. Instal·lació de la suite d'icones industrials vectorials `lucide-react`.
- [x] 031. Configuració del linter d'alt rendiment `oxlint` per a verificació estàtica de codi amb zero errors.
- [x] 032. Establiment de l'estructura de carpetes modular: `src/components/`, `src/data/`, `server/`, `database/`, `public/`.
- [x] 033. Integració de la llibreria de concurrència `concurrently` per a execució paral·lela de serveis.
- [x] 034. Creació de l'script npm unificat `npm run dev:all` per aixecar frontend i backend alhora.
- [x] 035. Configuració del build de producció amb `npm run build` verificant temps de compilació inferior a 2 segons.
- [x] 036. Verificació de compatibilitat d'execució en entorn Windows PowerShell.

---

### BUCKET 4: DISSENY FRONTEND PÚBLIC - NAVBAR I HERO (Checkpoints 37 - 48)
- [x] 037. Maquetació de la barra de navegació superior `Navbar.jsx` amb ancoratges de desplaçament suau (*smooth scroll*).
- [x] 038. Implementació de l'efecte de fons translúcid *glassmorphism* amb desenfocament de fons (*backdrop-blur*).
- [x] 039. Detecció de posició de scroll per canviar dinàmicament l'opacitat i vora del menú en navegar.
- [x] 040. Resolució del conflicte de punts de ruptura responsive (unificació a `lg` per evitar menús ocults en tauletes).
- [x] 041. Implementació del menú desplegable mòbil accessible amb transició suau d'obertura i tancament.
- [x] 042. Afegiment del botó destacat d'accés ràpid al Panell Tècnic DFactory des de la barra de navegació.
- [x] 043. Disseny de la secció d'impacte `Hero.jsx` amb titular tipogràfic i gradient de text d'alta tecnologia.
- [x] 044. Implementació del canvas interactiu de fons amb xarxa de nodes i partícules connectades en temps real.
- [x] 045. Respecte de l'accessibilitat d'animació segons la directiva `prefers-reduced-motion`.
- [x] 046. Afegiment dels xips de certificació oficial: DFactory Barcelona, Certificació Fluke DSX-8000 i ISO/IEC 11801.
- [x] 047. Inclusió de botons d'acció immediata (CTA): "Demanar Pressupost Sense Compromís" i "Explorar Serveis".
- [x] 048. Caixa d'estadístiques clau en temps real (temps de resposta SLA < 4h, 100% cablejat certificat, 0% subcontractació).

---

### BUCKET 5: DISSENY FRONTEND PÚBLIC - SERVEIS I ACORDIÓ MÒBIL (Checkpoints 49 - 60)
- [x] 049. Definició del conjunt de dades tècniques a `src/data/servicesData.js`.
- [x] 050. Estructuració del servei de Cablejat Estructurat Cat6A apantallat i armaris rack de 19 polzades.
- [x] 051. Estructuració del servei d'Electrònica de Xarxa Commutació Gestionable L2/L3 Gigabit PoE+.
- [x] 052. Estructuració del servei de Seguretat Perimetral mitjançant tallafocs NGFW i túnels VPN IPsec.
- [x] 053. Estructuració del servei de Sistemes d'Alimentació Ininterrompuda (SAI On-Line de Doble Conversió).
- [x] 054. Estructuració del servei de Servidors Físics i Virtualització (Windows Server 2025, Linux i Proxmox VE).
- [x] 055. Estructuració del servei de Manteniment Preventiu, Monitoratge Continu i Suport Informàtic SLA.
- [x] 056. Maquetació de la graella de serveis a `Services.jsx` amb targetes d'alta tecnologia i il·luminació cyan.
- [x] 057. Programació del sistema d'observació d'encreuament mitjançant l'API nativa `IntersectionObserver`.
- [x] 058. Implementació del desplegament automàtic progressiu de serveis a mida que es fa scroll descendent en mòbil.
- [x] 059. Implementació del tancament automàtic del servei quan l'usuari el supera en el scroll.
- [x] 060. Implementació de la reobertura dinàmica en fer scroll ascendent cap a dalt mantenint el control manual per toc.

---

### BUCKET 6: DISSENY FRONTEND PÚBLIC - METODOLOGIA, EQUIP I CONTACTE (Checkpoints 61 - 72)
- [x] 061. Disseny de la secció de procés d'enginyeria `Methodology.jsx` amb les 4 fases operatives.
- [x] 062. Fase 1: Auditoria prèvia i aixecament d'infraestructura in-situ a la seu del client.
- [x] 063. Fase 2: Disseny d'enginyeria, esquemes de xarxa i plànols de cablejat.
- [x] 064. Fase 3: Desplegament físic, tirat de línies Cat6A LSZH i conectorització de patx panels.
- [x] 065. Fase 4: Certificació Fluke Networks DSX-8000, lliurament de dossier PDF i garantia.
- [x] 066. Optimització de la transició hover a les 4 targetes mitjançant `cubic-bezier(0.16, 1, 0.3, 1)`.
- [x] 067. Disseny de la secció d'equip directiu `Team.jsx` presentant a Hans Lao Moncusí i Joel Pérez Armenteros.
- [x] 068. Descripció dels rols de direcció: Direcció Tècnica (Sistemes & Seguretat) i Direcció General (Xarxes).
- [x] 069. Desenvolupament del formulari web controlat de contacte `Contact.jsx`.
- [x] 070. Validació accessible de camps requerits: nom, empresa, correu, telèfon, tipus de servei i missatge.
- [x] 071. Integració de casella de consentiment exprés de protecció de dades (RGPD / LOPDGDD).
- [x] 072. Connexió del formulari de contacte a l'endpoint `POST /api/contacte` amb confirmació visual de recepció.

---

### BUCKET 7: CONFORMITAT LEGAL, RGPD I POLÍTICA DE GALETES (Checkpoints 73 - 84)
- [x] 073. Redacció de l'Avís Legal complet adaptat a la Llei 34/2002 de Serveis de la Societat de la Informació (LSSI-CE).
- [x] 074. Identificació del titular registral: KERNELCORE S.L., NIF B-67981234, DFactory Barcelona.
- [x] 075. Redacció de la Política de Privacitat segons el Reglament General de Protecció de Dades (UE 2016/679).
- [x] 076. Definició de les finalitats del tractament: gestió de pressupostos, execució de contractes i suport SAT.
- [x] 077. Establiment dels drets d'accés, rectificació, supressió, limitació, portabilitat i oposició (ARCO-POL).
- [x] 078. Redacció dels Termes i Condicions del Servei establint la garantia legal de maquinari de 2 anys.
- [x] 079. Incorporació de la clàusula del dret de desistiment de 14 dies naturals (TRLGDCU Reial Decret Legislatiu 1/2007).
- [x] 080. Creació del component de modal legal estructurat en pestanyes accessibles `LegalModal.jsx`.
- [x] 081. Desenvolupament del bàner flotant de galetes `CookieBanner.jsx` amb animació suau d'entrada.
- [x] 082. Configuració de selectors granulars per a galetes tècniques obligatòries, analítiques i de preferències.
- [x] 083. Persistència de la decisió de consentiment a `localStorage` evitant molestar l'usuari en visites recurrents.
- [x] 084. Enllaços directes des del peu de pàgina i des dels formularis per reobrir la configuració legal en qualsevol moment.

---

### BUCKET 8: CALCULADORA SAI I SOL·LICITUD PÚBLICA DE PRESSUPOST (Checkpoints 85 - 96)
- [x] 085. Desenvolupament del formulari públic de sol·licitud de pressupost `QuoteRequestForm.jsx`.
- [x] 086. Formulari pas a pas: selecció de serveis requerits, dades de l'empresa, nombre d'empleats i urgència.
- [x] 087. Disseny de la Calculadora Interactiva de Càrrega Elèctrica i Autonomia per a Sistemes SAI.
- [x] 088. Sliders interactius per definir quantitat de PCs/TPVs de treball (150W cadascun).
- [x] 089. Controls per indicar nombre de servidors físics en funcionament continu (300W cadascun).
- [x] 090. Controls per indicar nombre de commutadors de xarxa i equips de comunicació (75W cadascun).
- [x] 091. Càlcul automàtic de potència activa total consumida expressada en Watts (W).
- [x] 092. Aplicació del coeficient de seguretat del +20% i factor de potència 0.7 per obtenir la capacitat en Volt-Amperes (VA).
- [x] 093. Algorisme de recomanació del model homologat de SAI (APC Smart-UPS / Salicru Twin Pro2 de 1500VA, 3000VA o 5000VA).
- [x] 094. Càlcul estimat del temps d'autonomia en bateria en minuts sota la càrrega calculada.
- [x] 095. Inserció automàtica del resum del dimensionament SAI a les observacions tècniques de la sol·licitud.
- [x] 096. Enviament de la sol·licitud mitjançant `POST /api/sollicituds` amb emmagatzematge local de còpia de seguretat.

---

### BUCKET 9: CONFIGURADOR D'ENGINYERIA I QUOTATION HUB (Checkpoints 97 - 108)
- [x] 097. Creació del mòdul configurador de pressupostos avançat `QuotationHub.jsx`.
- [x] 098. Habilitació de càrrega de dades preexistents des de qualsevol sol·licitud rebuda de client.
- [x] 099. Resolució de controls numèrics per evitar valors NaN en punts de xarxa mitjançant parseig segur.
- [x] 100. Selectors per a tipus d'armari rack (mural de 12U o rack de terra de 24U/42U insonoritzat).
- [x] 101. Selectors de commutació: switches no gestionables, switches administrables L2 o switches capa 3 PoE+ de 370W.
- [x] 102. Selectors de protecció elèctrica SAI: SAI bàsic de línia interactiva o SAI On-Line de Doble Conversió VFI.
- [x] 103. Selectors de còpies de seguretat i emmagatzematge: unitats NAS Synology locals o sistema 3-2-1 amb rèplica xifrada al núvol.
- [x] 104. Selectors de manteniment preventiu i suport tècnic SLA amb tarifes mensuals desglossades (`+65 €/mes`, `+140 €/mes`).
- [x] 105. Motor de càlcul dinàmic de subtotal de maquinari, programari/llicències i mà d'obra de certificació Fluke.
- [x] 106. Càlcul de la Base Imposable i aplicació de l'IVA general del 21% obtenint el Total Pressupostat.
- [x] 107. Botó d'exportació de la proposta tècnica a fitxer de text pla estructurat (`.txt`).
- [x] 108. Botó de còpia ràpida de la proposta al porta-retalls per a ús immediat en comunicacions.

---

### BUCKET 10: MOTOR DE GENERACIÓ DE PDF BINARI (PDFKIT) (Checkpoints 109 - 120)
- [x] 109. Creació del servei backend de generació de documents PDF en memòria `server/pdfGenerator.js`.
- [x] 110. Configuració del format estàndard A4 (595.28 x 841.89 punts) amb marges de seguretat estrictes de 32 punts.
- [x] 111. Programació de la funció vectorial `drawKernelCoreLogo` per dibuixar el logotip oficial directament en primitives PDF.
- [x] 112. Dibuix de l'hexàgon perimetral, la lletra K en gradient de blau elèctric i els 8 nodes de xarxa amb resolució infinita.
- [x] 113. Maquetació de la capçalera corporativa de color blau nit (`#0b1329`) amb vora cyan d'accent tecnològic.
- [x] 114. Targeta superior dreta amb tipologia documental: **FACTURA PROFORMA / PRESSUPOST**, número i data de validesa.
- [x] 115. Doble bloc fiscal en paral·lel: dades fiscals de l'emissor KERNELCORE S.L. i dades fiscals de l'empresa client.
- [x] 116. Barra de control amb mètode de pagament (Transferència Bancària SEPA) i seu d'enginyeria DFactory Barcelona.
- [x] 117. Taula de partides amb columnes proporcionades (`REF. / SKU`, `DESCRIPCIÓ TÈCNICA`, `UDS.`, `PREU UNIT.`, `TOTAL NET`).
- [x] 118. Inserció dels codis SKU professionals (`RACK-19-42U`, `SW-POE-L2L3`, `CAB-CAT6A-LS`, `LIC-SEC-NGFW`, `ENG-LABOR-CERT`).
- [x] 119. Requadre de dades bancàries amb el compte IBAN oficial (`ES82 2100 0418 4502 0005 6789`) i codi BIC/SWIFT.
- [x] 120. Requadre de resum econòmic amb Base Imposable, quota d'IVA (21%) i Total Factura Proforma destacat.

---

### BUCKET 11: SIGNATURES DIGITALITZADES I ANNEX TÈCNIC DEL PDF (Checkpoints 121 - 132)
- [x] 121. Disseny del bloc tripartit de signatures oficials a la part inferior de la Pàgina 1 de la Proforma.
- [x] 122. Programació del traçat digital de signatura a tinta blava `drawDigitalSignature` per a Hans Lao Moncusí.
- [x] 123. Programació del traçat digital de signatura a tinta blava `drawDigitalSignature` per a Joel Pérez Armenteros.
- [x] 124. Casella de conformitat i comanda ferma per al segell, data i signatura d'aprovació del client.
- [x] 125. Recalibració de totes les alçades de la Pàgina 1 per garantir que cap element quedi desbordat ni tallat pel peu de pàgina.
- [x] 126. Creació de la Pàgina 2 de la Proforma: **Annex Tècnic d'Enginyeria, Continuïtat SAI i Certificació**.
- [x] 127. Inclusió de la memòria tècnica d'intervenció i punts clau del projecte d'infraestructura.
- [x] 128. Inclusió del quadre de dimensionament elèctric SAI amb les 3 targetes mètriques (Watts, VA +20% i autonomia).
- [x] 129. Desglossament dels estàndards de qualitat: ISO/IEC 11801, ANSI/TIA-568-C.2, Fluke DSX-8000 i PoE++ IEEE 802.3bt.
- [x] 130. Clàusules generals del contracte de subministrament, garantia de 2 anys i dret de desistiment de 14 dies (TRLGDCU).
- [x] 131. Generació del Codi Segur de Verificació (CSV) únic i enllaç de comprovació electrònica d'integritat a la seu electrònica.
- [x] 132. Endpoint de servei directe `GET /api/pressupostos/:id/pdf` per visualització en línia o descàrrega immediata.

---

### BUCKET 12: MOTOR DE CORREU ELECTRÒNIC CORPORATIU SMTP (Checkpoints 133 - 144)
- [x] 133. Desenvolupament del mòdul de transport de correu `server/mailer.js` basat en la llibreria `nodemailer`.
- [x] 134. Disseny de la plantilla de correu en format HTML responsive d'estil corporatiu blau nit i blanc, sense emojis.
- [x] 135. Inclusió de capçalera corporativa de DFactory Barcelona i salutació personalitzada amb el nom del client.
- [x] 136. Taula resum de la proposta al cos de l'email amb número de document, data, desglossament econòmic i firma tècnica.
- [x] 137. Adjunció automàtica del fitxer binari generat `Pressupost_KernelCore_PF-2026-XXX.pdf` com a adjunt MIME.
- [x] 138. Configuració del relé de proves integrat **Ethereal SMTP** per a entorns de desenvolupament i defensa del projecte.
- [x] 139. Generació d'enllaços de previsualització de missatges a la safata web d'Ethereal per comprovar l'entrega real.
- [x] 140. Integració del protocol de sortida oficial de Google Workspace (`service: 'gmail'`) per a enviaments a bústies reals.
- [x] 141. Depuració i neteja automàtica d'espais en blancs a les contrasenyes d'aplicació de 16 lletres de Google.
- [x] 142. Creació de l'arxiu de configuració d'entorn `.env` emmagatzemant `SMTP_USER`, `SMTP_PASS`, `SMTP_HOST` i `SMTP_PORT`.
- [x] 143. Càrrega primerenca de variables mitjançant `import 'dotenv/config'` a la primera línia del servidor per evitar pèrdues de sessió.
- [x] 144. Registre històric de tots els correus enviats a l'endpoint `GET /api/emails/history` per a traçabilitat completa.

---

### BUCKET 13: BASE DE DADES RELACIONAL MARIADB / MYSQL (Checkpoints 145 - 156)
- [x] 145. Disseny de l'arquitectura de la base de dades relacional `kernelcore_db` amb joc de caràcters `utf8mb4_unicode_ci`.
- [x] 146. Creació de l'script complet de generació d'esquema SQL a `database/kernelcore_db.sql`.
- [x] 147. Taula `usuaris_tecnics`: gestió d'usuaris amb rols RBAC, contrasenyes xifrades i especialitats tècniques.
- [x] 148. Taula `inventari_maquinari`: catàleg complet de les 100 referències de maquinari amb SKU, marca, estoc, mínim i preus.
- [x] 149. Taula `clients`: registre de clients corporatius amb raó social, CIF, adreça, telèfon, email i entorn operatiu.
- [x] 150. Taula `proveidors`: registre de distribuïdors majoristes oficials amb condicions de pagament i marques subministrades.
- [x] 151. Taules transaccionals: `sollicituds_pressupost`, `pressupostos`, `projectes_instalacio` i `tiquets_sat`.
- [x] 152. Taula de registre de missatges web de contacte `contactes_web` amb consentiment RGPD.
- [x] 153. Configuració del pool de connexions amb reconexió automàtica a `server/db.js` mitjançant `mysql2/promise`.
- [x] 154. Execució i càrrega de l'esquema SQL contra el motor MariaDB de XAMPP al port 3306.
- [x] 155. Desenvolupament de la passarel·la de contingència a memòria (`server/dataStore.js`) per si MariaDB no està engegada.
- [x] 156. Endpoint `GET /database/kernelcore_db.sql` per descarregar l'script de la base de dades directament des de la web.

---

### BUCKET 14: SERVIDOR BACKEND RESTFUL EN EXPRESS (Checkpoints 157 - 168)
- [x] 157. Desenvolupament del servidor backend centralitzat `server/index.js` escoltant al port 4000.
- [x] 158. Habilitació de polítiques de seguretat CORS per permetre sol·licituds creuades des del client web.
- [x] 159. Endpoint d'estat del sistema `GET /api/health` informant d'uptime, seu oficial i estat de la connexió a la BBDD.
- [x] 160. Endpoints d'autenticació `POST /api/auth/login` i perfil d'usuari amb comprovació de credencials.
- [x] 161. Endpoints de contacte `POST /api/contacte` i consulta de missatges registrats `GET /api/contacte`.
- [x] 162. Endpoints CRUD de sol·licituds: `GET /api/sollicituds`, `POST /api/sollicituds` i actualització d'estat.
- [x] 163. Endpoints de pressupostos: `GET /api/pressupostos`, creació `POST /api/pressupostos` i enviament de correu `POST /api/pressupostos/send-email`.
- [x] 164. Endpoints d'inventari: consulta de catàleg `GET /api/inventari` i operació d'injecció de capital `POST /api/inventari/inversio-capital`.
- [x] 165. Endpoints de clients corporatius: `GET /api/clients`, `POST /api/clients` i eliminació `DELETE /api/clients/:id`.
- [x] 166. Endpoints de proveïdors majoristes: consulta `GET /api/proveidors` i registre de nous proveïdors.
- [x] 167. Endpoints de projectes i tasques d'enginyeria: `GET /api/projectes`, `POST /api/projectes` i afegir fites `POST /api/projectes/:id/tasks`.
- [x] 168. Endpoints de diagnòstic de xarxa: execució de ping ICMP `POST /api/diagnostics/ping`.

---

### BUCKET 15: INTRANET DASHBOARD - AUTENTICACIÓ I CONTROL DE ROLS (Checkpoints 169 - 180)
- [x] 169. Desenvolupament de la interfície d'administració interna `src/components/Dashboard.jsx`.
- [x] 170. Implementació del model de control d'accés per rols (**RBAC**) diferenciant permisos d'administració i d'enginyeria.
- [x] 171. Perfil 1: Administrador KernelCore (`admin-kernelcore@kernelcore.com`) amb visió financera i de direcció.
- [x] 172. Perfil 2: Hans Lao Moncusí (`hans@kernelcore.cat`), Cap de Sistemes, Servidors Windows/Linux, AD DS i Seguretat.
- [x] 173. Perfil 3: Joel Pérez Armenteros (`joel@kernelcore.cat`), Cap d'Infraestructura de Xarxes, Cat6A, Racks i SAI.
- [x] 174. Disseny del modal d'inici de sessió `LoginModal.jsx` amb selector ràpid de perfils oficials de DFactory.
- [x] 175. Conmutador de rol en viu a la capçalera del Dashboard per alternar d'usuari sense tancar la sessió.
- [x] 176. Adaptació de la barra lateral i dels indicadors segons les competències del perfil actiu.
- [x] 177. Protecció de rutes i accions crítiques (exclusivitat d'injecció de capital per a Direcció General i Admin).
- [x] 178. Filtres ràpids personalitzats per àmbit tècnic ("El meu àmbit tècnic: Hans" o "Joel") a projectes i tiquets.
- [x] 179. Pestanya de perfil tècnic personal amb edició de telèfon directe, biografia professional i signatura de correu.
- [x] 180. Generació i emmagatzematge de credencials segures a l'arxiu `CREDENCIALS_KERNELCORE.txt` protegit per git.

---

### BUCKET 16: INTRANET DASHBOARD - OPERACIONS, LOGÍSTICA I SAT (Checkpoints 181 - 192)
- [x] 181. Secció de **Magatzem & Estoc**: visualització de les 100 referències de maquinari amb cerques en temps real.
- [x] 182. Filtres d'estoc per categoria (Racks 19", Cablejat, Xarxa & VLAN, Wi-Fi 6, NGFW, SAI, Servidors, TPV, Eines).
- [x] 183. Filtres per gamma de producte (Bàsic / General, Mitjà Empresarial i Professional / CPD).
- [x] 184. Indicadors visuals de nivell d'estoc amb alertes automàtiques d'estoc baix quan les unitats cauen sota el mínim.
- [x] 185. Modal d'injecció de capital d'inversor amb 4 paquets calculats: Bàsic (+72.075 €), Mitjà (+122.900 €), CPD (+136.560 €) i Megapack 100 SKUs (+193.365 €).
- [x] 186. Secció de **Sol·licituds IT**: safata d'entrada de peticions web amb botó d'obertura al configurador de pressupostos.
- [x] 187. Secció de **Pressupostos IT**: taula de propostes econòmiques amb botons per veure PDF, descarregar PDF i enviar per correu.
- [x] 188. Modal d'enviament de pressupost per correu amb personalització de missatge per al client i remitent tècnic seleccionable.
- [x] 189. Secció de **Clients & PIMEs**: fitxes completes d'empreses de Barcelona amb cerca per NIF/CIF i sector industrial.
- [x] 190. Secció de **Proveïdors Oficials**: majoristes homologats amb condicions de pagament i filtre directe a l'estoc subministrat.
- [x] 191. Secció de **Projectes Actius**: seguiment de desplegaments amb barra de progrés, fites tècniques i assignació de responsable.
- [x] 192. Secció de **Tiquets SAT & Suport**: gestió d'incidències tècniques amb codi de gravetat, diagnòstics i resolució sota acord SLA.

---

### BUCKET 17: TELEMETRIA, AUDITORIA I ASSEGURAMENT DE QUALITAT (Checkpoints 193 - 200)
- [x] 193. Secció de **Servidors & Telemetria**: monitoratge en temps real dels 4 nodes clau de DFactory Barcelona (`SRV-DC01`, `NAS-BCN`, `SW-CORE-01`, `UPS-APC-3000`).
- [x] 194. Monitoratge de mètriques de CPU, memòria RAM utilitzada, temperatura operativa i estat d'enllaç de xarxa.
- [x] 195. Desenvolupament de la consola interactiva de diagnòstics de xarxa ICMP Ping amb execució de paquets i percentatge de pèrdues.
- [x] 196. Programació del motor d'auditoria automàtica de sistemes amb execució periòdica cada 60 segons en segon pla (`runSystemAudit`).
- [x] 197. Comprovació automàtica dels 5 pilars crítics: Base de dades SQL, integritat de les 100 referències d'estoc, telemetria de nodes, seguretat RBAC i disponibilitat d'endpoints API.
- [x] 198. Botó d'auditoria immediata a la capçalera del panell que genera un informe amb puntuació d'integritat (Score 100% OPTIMAL).
- [x] 199. Verificació d'assegurament de qualitat del codi: 0 errors i 0 advertències a `oxlint` a tots els fitxers del projecte.
- [x] 200. Prova de cicle complet d'enginyeria: generació de sol·licitud, càlcul SAI, emissió de Factura Proforma PDF i lliurament per Gmail SMTP amb certificat digital.

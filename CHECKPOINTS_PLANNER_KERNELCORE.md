# CHECKPOINTS I TASQUES DE PROJECTE PER A MICROSOFT PLANNER (DES DE PUNT ZERO FINS A L'ACTUALITAT)
## Projecte de Síntesi: KernelCore (CFGM SMX 2026/27 · DFactory Barcelona)
## Responsables de Projecte: Hans Lao Moncusí & Joel Pérez Armenteros
## Total Checkpoints: 250 micro-tasques tècniques granulars estructurades per fases

---

### BUCKET 1: CONCEPCIÓ DE NEGOCI, PLANIFICACIÓ I DEFINICIÓ ESTRATÈGICA (001 - 012)
- [x] 001. Definició de la idea de negoci: empresa d'enginyeria de sistemes, xarxes i ciberseguretat per a PIMEs.
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

### BUCKET 2: IDENTITAT CORPORATIVA, BRANDING I ASSETS VECTORIALS (013 - 024)
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

### BUCKET 3: REPOSITORI GIT, TOOLCHAIN I CONFIGURACIÓ DE DESENVOLUPAMENT (025 - 036)
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

### BUCKET 4: DISSENY FRONTEND PÚBLIC - NAVBAR I NAVEGACIÓ RESPONSIVE (037 - 048)
- [x] 037. Maquetació de la barra de navegació superior `Navbar.jsx` amb ancoratges de desplaçament suau (*smooth scroll*).
- [x] 038. Implementació de l'efecte de fons translúcid *glassmorphism* amb desenfocament de fons (*backdrop-blur*).
- [x] 039. Detecció de posició de scroll per canviar dinàmicament l'opacitat i vora del menú en navegar.
- [x] 040. Resolució del conflicte de punts de ruptura responsive (unificació a `lg` per evitar menús ocults en tauletes).
- [x] 041. Implementació del menú desplegable mòbil accessible amb transició suau d'obertura i tancament.
- [x] 042. Afegiment del botó destacat d'accés ràpid al Panell Tècnic DFactory des de la barra de navegació.
- [x] 043. Indicador visual d'enllaç actiu segons la secció visible de la pàgina.
- [x] 044. Tancament automàtic del menú mòbil en fer clic a qualsevol enllaç de navegació.
- [x] 045. Gestió de l'accessibilitat mitjançant atributs ARIA (`aria-expanded`, `aria-label`).
- [x] 046. Adaptació de marges i padding per a dispositius amb pestanyes o pantalles panoràmiques.
- [x] 047. Integració de botó directe per canviar d'idioma o tornar a l'inici en un clic.
- [x] 048. Validació de rendiment a 60 FPS sense bloquejos del fil principal en fer desplaçament.

---

### BUCKET 5: DISSENY FRONTEND PÚBLIC - HERO SECTION I CANVAS INTERACTIU (049 - 060)
- [x] 049. Disseny de la secció d'impacte `Hero.jsx` amb titular tipogràfic i gradient de text d'alta tecnologia.
- [x] 050. Implementació del canvas interactiu de fons amb xarxa de nodes i partícules connectades en temps real.
- [x] 051. Respecte de l'accessibilitat d'animació segons la directiva `prefers-reduced-motion`.
- [x] 052. Afegiment dels xips de certificació oficial: DFactory Barcelona, Certificació Fluke DSX-8000 i ISO/IEC 11801.
- [x] 053. Inclusió de botons d'acció immediata (CTA): "Demanar Pressupost Sense Compromís" i "Explorar Serveis".
- [x] 054. Caixa d'estadístiques clau en temps real (temps de resposta SLA < 4h, 100% cablejat certificat, 0% subcontractació).
- [x] 055. Resolució dinàmica del canvas en cas de redimensionament de la finestra del navegador (*resize event*).
- [x] 056. Ajust de densitat de partícules segons la resolució de la pantalla per evitar consum excessiu de GPU.
- [x] 057. Efecte de brillantor radiant radial darrere del text principal per generar profunditat visual.
- [x] 058. Subtítol descriptiu amb menció expressa a DFactory Barcelona Zona Franca.
- [x] 059. Enllaç d'ancoratge inferior per baixar directament a la secció de Serveis.
- [x] 060. Depuració d'elements no utilitzats i imports orfes per optimitzar el paquet final de Vite.

---

### BUCKET 6: DISSENY FRONTEND PÚBLIC - SERVEIS D'ENGINYERIA IT (061 - 072)
- [x] 061. Definició del conjunt de dades tècniques a `src/data/servicesData.js`.
- [x] 062. Estructuració del servei de Cablejat Estructurat Cat6A apantallat i armaris rack de 19 polzades.
- [x] 063. Estructuració del servei d'Electrònica de Xarxa Commutació Gestionable L2/L3 Gigabit PoE+.
- [x] 064. Estructuració del servei de Seguretat Perimetral mitjançant tallafocs NGFW i túnels VPN IPsec.
- [x] 065. Estructuració del servei de Sistemes d'Alimentació Ininterrompuda (SAI On-Line de Doble Conversió).
- [x] 066. Estructuració del servei de Servidors Físics i Virtualització (Windows Server 2025, Linux i Proxmox VE).
- [x] 067. Estructuració del servei de Manteniment Preventiu, Monitoratge Continu i Suport Informàtic SLA.
- [x] 068. Maquetació de la graella de serveis a `Services.jsx` amb targetes d'alta tecnologia i il·luminació cyan.
- [x] 069. Desglossament de característiques clau a cada targeta de servei mitjançant punts de verificació.
- [x] 070. Afegiment d'icones identificatives d'enginyeria per a cada àrea d'especialització.
- [x] 071. Disseny de botons d'acció "Demanar proposta d'aquest servei" a cada targeta.
- [x] 072. Efectes de vora ressaltada en passar el cursor (*hover effect*) amb gradients cian i blau marí.

---

### BUCKET 7: ACCORDIÓ MÒBIL INTERACTIU AMB SCROLL DINÀMIC (073 - 084)
- [x] 073. Programació del sistema d'observació d'encreuament mitjançant l'API nativa `IntersectionObserver`.
- [x] 074. Definició del marge de detecció de lectura (*rootMargin: '-10% 0px -15% 0px'*).
- [x] 075. Llindar d'encreuament calibrat a 0.15 per a una detecció natural de la intenció de lectura.
- [x] 076. Implementació del desplegament automàtic progressiu de serveis a mida que es fa scroll descendent en mòbil.
- [x] 077. Animació suau d'alçada màxima (*max-h-[800px]*) i transició d'opacitat en obrir.
- [x] 078. Implementació del tancament automàtic del servei quan l'usuari el supera en el scroll.
- [x] 079. Implementació de la reobertura dinàmica en fer scroll ascendent cap a dalt.
- [x] 080. Manteniment del control manual per toc que permet obrir i tancar sense interferir amb l'scroll.
- [x] 081. Indicador visual d'obertura/tancament mitjançant icona de fletxa amb rotació suau de 180 graus.
- [x] 082. Atributs ARIA `aria-expanded` dinàmics per a lectors de pantalla i accessibilitat.
- [x] 083. Desactivació automàtica del comportament d'acordió mòbil quan la pantalla supera els 768px.
- [x] 084. Proves de rendiment d'scroll continu en dispositius iOS Safari i Android Chrome.

---

### BUCKET 8: METODOLOGIA D'ENGINYERIA EN 4 FASES (085 - 096)
- [x] 085. Disseny de la secció de procés d'enginyeria `Methodology.jsx` amb les 4 fases operatives.
- [x] 086. Fase 1: Auditoria prèvia i aixecament d'infraestructura in-situ a la seu del client.
- [x] 087. Fase 2: Disseny d'enginyeria, esquemes de xarxa i plànols de cablejat.
- [x] 088. Fase 3: Desplegament físic, tirat de línies Cat6A LSZH i conectorització de patx panels.
- [x] 089. Fase 4: Certificació Fluke Networks DSX-8000, lliurament de dossier PDF i garantia.
- [x] 090. Optimització de la transició hover a les 4 targetes mitjançant `cubic-bezier(0.16, 1, 0.3, 1)`.
- [x] 091. Resplendor ambiental dinàmic en passar el cursor per sobre de cada targeta d'enginyeria.
- [x] 092. Numeració de passos en gran amb gradient de colors cian per guiar el flux de lectura.
- [x] 093. Inclusió d'icones tècniques d'activitat per a cadascuna de les etapes d'implantació.
- [x] 094. Línia de connexió temporal visual entre targetes que simbolitza el flux del projecte.
- [x] 095. Moció suau d'elevació vertical de 4px al hover (*translate-y*) per a resposta tàctil rica.
- [x] 096. Neteja d'imports innecessaris per mantenir zero advertències al linter.

---

### BUCKET 9: SECCIÓ D'EQUIP DIRECTIU I CONTACTE CONTROLAT (097 - 108)
- [x] 097. Disseny de la secció d'equip directiu `Team.jsx` presentant a Hans Lao Moncusí i Joel Pérez Armenteros.
- [x] 098. Descripció dels rols de direcció: Direcció Tècnica (Sistemes & Seguretat) i Direcció General (Xarxes).
- [x] 099. Resum d'habilitats tècniques clau per a cada soci fundador (Windows Server, AD DS, Cat6A, Fluke, Cisco).
- [x] 100. Enllaços professionals a perfils i canals de comunicació directa de l'equip.
- [x] 101. Desenvolupament del formulari web controlat de contacte `Contact.jsx`.
- [x] 102. Validació accessible de camps requerits: nom, empresa, correu, telèfon, tipus de servei i missatge.
- [x] 103. Integració de casella de consentiment exprés de protecció de dades (RGPD / LOPDGDD).
- [x] 104. Connexió del formulari de contacte a l'endpoint `POST /api/contacte` del servidor Express.
- [x] 105. Missatges d'èxit i neteja automàtica del formulari després de l'enviament satisfactori.
- [x] 106. Gestió de mode fora de línia amb avís visual si el servidor no respon immediatament.
- [x] 107. Caixa informativa amb adreça de la seu a DFactory, horari d'atenció i telèfon d'urgències.
- [x] 108. Integració del mapa o indicacions d'arribada al recinte de la Zona Franca de Barcelona.

---

### BUCKET 10: SUITE LEGAL, POLÍTICA DE GALETES I RGPD (109 - 120)
- [x] 109. Redacció de l'Avís Legal complet adaptat a la Llei 34/2002 de Serveis de la Societat de la Informació (LSSI-CE).
- [x] 110. Identificació del titular registral: KERNELCORE S.L., NIF B-67981234, DFactory Barcelona.
- [x] 111. Redacció de la Política de Privacitat segons el Reglament General de Protecció de Dades (UE 2016/679).
- [x] 112. Definició de les finalitats del tractament: gestió de pressupostos, execució de contractes i suport SAT.
- [x] 113. Establiment dels drets d'accés, rectificació, supressió, limitació, portabilitat i oposició (ARCO-POL).
- [x] 114. Redacció dels Termes i Condicions del Servei establint la garantia legal de maquinari de 2 anys.
- [x] 115. Incorporació de la clàusula del dret de desistiment de 14 dies naturals (TRLGDCU Reial Decret Legislatiu 1/2007).
- [x] 116. Creació del component de modal legal estructurat en pestanyes accessibles `LegalModal.jsx`.
- [x] 117. Desenvolupament del bàner flotant de galetes `CookieBanner.jsx` amb animació suau d'entrada.
- [x] 118. Configuració de selectors granulars per a galetes tècniques obligatòries, analítiques i de preferències.
- [x] 119. Persistència de la decisió de consentiment a `localStorage` evitant molestar l'usuari en visites recurrents.
- [x] 120. Enllaços directes des del peu de pàgina i des dels formularis per reobrir la configuració legal en qualsevol moment.

---

### BUCKET 11: CALCULADORA DE CÀRREGA I AUTONOMIA ELÈCTRICA SAI (121 - 132)
- [x] 121. Disseny de la Calculadora Interactiva de Càrrega Elèctrica i Autonomia per a Sistemes SAI.
- [x] 122. Sliders interactius per definir quantitat de PCs/TPVs de treball (150W cadascun).
- [x] 123. Controls per indicar nombre de servidors físics en funcionament continu (300W cadascun).
- [x] 124. Controls per indicar nombre de commutadors de xarxa i equips de comunicació (75W cadascun).
- [x] 125. Càlcul automàtic de potència activa total consumida expressada en Watts (W).
- [x] 126. Aplicació del coeficient de seguretat del +20% i factor de potència 0.7 per obtenir la capacitat en Volt-Amperes (VA).
- [x] 127. Algorisme de recomanació del model homologat de SAI (APC Smart-UPS / Salicru Twin Pro2 de 1500VA, 3000VA o 5000VA).
- [x] 128. Càlcul estimat del temps d'autonomia en bateria en minuts sota la càrrega calculada.
- [x] 129. Explicació pedagògica de la topologia On-Line de Doble Conversió VFI sense temps de transferència (0 ms).
- [x] 130. Indicadors de protecció contra pics de tensió, microtalls i harmònics elèctrics de la xarxa.
- [x] 131. Inserció automàtica del resum del dimensionament SAI a les observacions tècniques de la sol·licitud.
- [x] 132. Connexió de les dades del dimensionament amb el motor de generació de Factura Proforma PDF.

---

### BUCKET 12: HUB DE PRESSUPOSTOS I SIMULADOR ECONÒMIC (133 - 144)
- [x] 133. Creació del mòdul configurador de pressupostos avançat `QuotationHub.jsx`.
- [x] 134. Habilitació de càrrega de dades preexistents des de qualsevol sol·licitud rebuda de client.
- [x] 135. Resolució de controls numèrics per evitar valors NaN en punts de xarxa mitjançant parseig segur.
- [x] 136. Selectors per a tipus d'armari rack (mural de 12U o rack de terra de 24U/42U insonoritzat).
- [x] 137. Selectors de commutació: switches no gestionables, switches administrables L2 o switches capa 3 PoE+ de 370W.
- [x] 138. Selectors de protecció elèctrica SAI: SAI bàsic de línia interactiva o SAI On-Line de Doble Conversió VFI.
- [x] 139. Selectors de còpies de seguretat i emmagatzematge: unitats NAS Synology locals o sistema 3-2-1 amb rèplica xifrada al núvol.
- [x] 140. Selectors de manteniment preventiu i suport tècnic SLA amb tarifes mensuals desglossades (`+65 €/mes`, `+140 €/mes`).
- [x] 141. Motor de càlcul dinàmic de subtotal de maquinari, programari/llicències i mà d'obra de certificació Fluke.
- [x] 142. Càlcul de la Base Imposable i aplicació de l'IVA general del 21% obtenint el Total Pressupostat.
- [x] 143. Botó d'exportació de la proposta tècnica a fitxer de text pla estructurat (`.txt`).
- [x] 144. Botó de còpia ràpida de la proposta al porta-retalls per a ús immediat en comunicacions.

---

### BUCKET 13: MOTOR DE GENERACIÓ DE PDF BINARI (PDFKIT) (145 - 156)
- [x] 145. Creació del servei backend de generació de documents PDF en memòria `server/pdfGenerator.js`.
- [x] 146. Configuració del format estàndard A4 (595.28 x 841.89 punts) amb marges de seguretat estrictes de 32 punts.
- [x] 147. Programació de la funció vectorial `drawKernelCoreLogo` per dibuixar el logotip oficial directament en primitives PDF.
- [x] 148. Dibuix de l'hexàgon perimetral, la lletra K en gradient de blau elèctric i els 8 nodes de xarxa amb resolució infinita.
- [x] 149. Maquetació de la capçalera corporativa de color blau nit (`#0b1329`) amb vora cyan d'accent tecnològic.
- [x] 150. Targeta superior dreta amb tipologia documental: **FACTURA PROFORMA / PRESSUPOST**, número i data de validesa.
- [x] 151. Doble bloc fiscal en paral·lel: dades fiscals de l'emissor KERNELCORE S.L. i dades fiscals de l'empresa client.
- [x] 152. Barra de control amb mètode de pagament (Transferència Bancària SEPA) i seu d'enginyeria DFactory Barcelona.
- [x] 153. Taula de partides amb columnes proporcionades (`REF. / SKU`, `DESCRIPCIÓ TÈCNICA`, `UDS.`, `PREU UNIT.`, `TOTAL NET`).
- [x] 154. Inserció dels codis SKU professionals (`RACK-19-42U`, `SW-POE-L2L3`, `CAB-CAT6A-LS`, `LIC-SEC-NGFW`, `ENG-LABOR-CERT`).
- [x] 155. Requadre de dades bancàries amb el compte IBAN oficial (`ES82 2100 0418 4502 0005 6789`) i codi BIC/SWIFT.
- [x] 156. Requadre de resum econòmic amb Base Imposable, quota d'IVA (21%) i Total Factura Proforma destacat.

---

### BUCKET 14: SIGNATURES DIGITALITZADES I ANNEX TÈCNIC DEL PDF (157 - 168)
- [x] 157. Disseny del bloc tripartit de signatures oficials a la part inferior de la Pàgina 1 de la Proforma.
- [x] 158. Programació del traçat digital de signatura a tinta blava `drawDigitalSignature` per a Hans Lao Moncusí.
- [x] 159. Programació del traçat digital de signatura a tinta blava `drawDigitalSignature` per a Joel Pérez Armenteros.
- [x] 160. Casella de conformitat i comanda ferma per al segell, data i signatura d'aprovació del client.
- [x] 161. Recalibració de totes les alçades de la Pàgina 1 per garantir que cap element quedi desbordat ni tallat pel peu de pàgina.
- [x] 162. Creació de la Pàgina 2 de la Proforma: **Annex Tècnic d'Enginyeria, Continuïtat SAI i Certificació**.
- [x] 163. Inclusió de la memòria tècnica d'intervenció i punts clau del projecte d'infraestructura.
- [x] 164. Inclusió del quadre de dimensionament elèctric SAI amb les 3 targetes mètriques (Watts, VA +20% i autonomia).
- [x] 165. Desglossament dels estàndards de qualitat: ISO/IEC 11801, ANSI/TIA-568-C.2, Fluke DSX-8000 i PoE++ IEEE 802.3bt.
- [x] 166. Clàusules generals del contracte de subministrament, garantia de 2 anys i dret de desistiment de 14 dies (TRLGDCU).
- [x] 167. Generació del Codi Segur de Verificació (CSV) únic i enllaç de comprovació electrònica d'integritat a la seu electrònica.
- [x] 168. Endpoint de servei directe `GET /api/pressupostos/:id/pdf` per visualització en línia o descàrrega immediata.

---

### BUCKET 15: MOTOR DE CORREU CORPORATIU SMTP I NODEMAILER (169 - 180)
- [x] 169. Desenvolupament del mòdul de transport de correu `server/mailer.js` basat en la llibreria `nodemailer`.
- [x] 170. Disseny de la plantilla de correu en format HTML responsive d'estil corporatiu blau nit i blanc, sense emojis.
- [x] 171. Inclusió de capçalera corporativa de DFactory Barcelona i salutació personalitzada amb el nom del client.
- [x] 172. Taula resum de la proposta al cos de l'email amb número de document, data, desglossament econòmic i firma tècnica.
- [x] 173. Adjunció automàtica del fitxer binari generat `Pressupost_KernelCore_PF-2026-XXX.pdf` com a adjunt MIME.
- [x] 174. Configuració del relé de proves integrat **Ethereal SMTP** per a entorns de desenvolupament i defensa del projecte.
- [x] 175. Generació d'enllaços de previsualització de missatges a la safata web d'Ethereal per comprovar l'entrega real.
- [x] 176. Integració del protocol de sortida oficial de Google Workspace (`service: 'gmail'`) per a enviaments a bústies reals.
- [x] 177. Depuració i neteja automàtica d'espais en blancs a les contrasenyes d'aplicació de 16 lletres de Google.
- [x] 178. Creació de l'arxiu de configuració d'entorn `.env` emmagatzemant `SMTP_USER`, `SMTP_PASS`, `SMTP_HOST` i `SMTP_PORT`.
- [x] 179. Càrrega primerenca de variables mitjançant `import 'dotenv/config'` a la primera línia del servidor per evitar pèrdues de sessió.
- [x] 180. Registre històric de tots els correus enviats a l'endpoint `GET /api/emails/history` per a traçabilitat completa.

---

### BUCKET 16: BASE DE DADES RELACIONAL MARIADB / MYSQL (181 - 192)
- [x] 181. Disseny de l'arquitectura de la base de dades relacional `kernelcore_db` amb joc de caràcters `utf8mb4_unicode_ci`.
- [x] 182. Creació de l'script complet de generació d'esquema SQL a `database/kernelcore_db.sql`.
- [x] 183. Taula `usuaris_tecnics`: gestió d'usuaris amb rols RBAC, contrasenyes xifrades i especialitats tècniques.
- [x] 184. Taula `inventari_maquinari`: catàleg complet de les 100 referències de maquinari amb SKU, marca, estoc, mínim i preus.
- [x] 185. Taula `clients`: registre de clients corporatius amb raó social, CIF, adreça, telèfon, email i entorn operatiu.
- [x] 186. Taula `proveidors`: registre de distribuïdors majoristes oficials amb condicions de pagament i marques subministrades.
- [x] 187. Taules transaccionals: `sollicituds_pressupost`, `pressupostos`, `projectes_instalacio` i `tiquets_sat`.
- [x] 188. Taula de registre de missatges web de contacte `contactes_web` amb consentiment RGPD.
- [x] 189. Configuració del pool de connexions amb reconexió automàtica a `server/db.js` mitjançant `mysql2/promise`.
- [x] 190. Execució i càrrega de l'esquema SQL contra el motor MariaDB de XAMPP al port 3306.
- [x] 191. Desenvolupament de la passarel·la de contingència a memòria (`server/dataStore.js`) per si MariaDB no està engegada.
- [x] 192. Endpoint `GET /database/kernelcore_db.sql` per descarregar l'script de la base de dades directament des de la web.

---

### BUCKET 17: SERVIDOR BACKEND RESTFUL EN EXPRESS (193 - 204)
- [x] 193. Desenvolupament del servidor backend centralitzat `server/index.js` escoltant al port 4000.
- [x] 194. Habilitació de polítiques de seguretat CORS per permetre sol·licituds creuades des del client web.
- [x] 195. Endpoint d'estat del sistema `GET /api/health` informant d'uptime, seu oficial i estat de la connexió a la BBDD.
- [x] 196. Endpoints d'autenticació `POST /api/auth/login` i perfil d'usuari amb comprovació de credencials.
- [x] 197. Endpoints de contacte `POST /api/contacte` i consulta de missatges registrats `GET /api/contacte`.
- [x] 198. Endpoints CRUD de sol·licituds: `GET /api/sollicituds`, `POST /api/sollicituds` i actualització d'estat.
- [x] 199. Endpoints de pressupostos: `GET /api/pressupostos`, creació `POST /api/pressupostos` i enviament de correu `POST /api/pressupostos/send-email`.
- [x] 200. Endpoints d'inventari: consulta de catàleg `GET /api/inventari` i operació d'injecció de capital `POST /api/inventari/inversio-capital`.
- [x] 201. Endpoints de clients corporatius: `GET /api/clients`, `POST /api/clients` i eliminació `DELETE /api/clients/:id`.
- [x] 202. Endpoints de proveïdors majoristes: consulta `GET /api/proveidors` i registre de nous proveïdors.
- [x] 203. Endpoints de projectes i tasques d'enginyeria: `GET /api/projectes`, `POST /api/projectes` i afegir fites `POST /api/projectes/:id/tasks`.
- [x] 204. Endpoints de diagnòstic de xarxa: execució de ping ICMP `POST /api/diagnostics/ping`.

---

### BUCKET 18: INTRANET DASHBOARD - CONTROL D'ACCÉS PER ROLS RBAC (205 - 216)
- [x] 205. Desenvolupament de la interfície d'administració interna `src/components/Dashboard.jsx`.
- [x] 206. Implementació del model de control d'accés per rols (**RBAC**) diferenciant permisos d'administració i d'enginyeria.
- [x] 207. Perfil 1: Administrador KernelCore (`admin-kernelcore@kernelcore.com`) amb visió financera i de direcció.
- [x] 208. Perfil 2: Hans Lao Moncusí (`hans@kernelcore.cat`), Cap de Sistemes, Servidors Windows/Linux, AD DS i Seguretat.
- [x] 209. Perfil 3: Joel Pérez Armenteros (`joel@kernelcore.cat`), Cap d'Infraestructura de Xarxes, Cat6A, Racks i SAI.
- [x] 210. Disseny del modal d'inici de sessió `LoginModal.jsx` amb selector ràpid de perfils oficials de DFactory.
- [x] 211. Conmutador de rol en viu a la capçalera del Dashboard per alternar d'usuari sense tancar la sessió.
- [x] 212. Adaptació de la barra lateral i dels indicadors segons les competències del perfil actiu.
- [x] 213. Protecció de rutes i accions crítiques (exclusivitat d'injecció de capital per a Direcció General i Admin).
- [x] 214. Filtres ràpids personalitzats per àmbit tècnic ("El meu àmbit tècnic: Hans" o "Joel") a projectes i tiquets.
- [x] 215. Pestanya de perfil tècnic personal amb edició de telèfon directe, biografia professional i signatura de correu.
- [x] 216. Generació i emmagatzematge de credencials segures a l'arxiu `CREDENCIALS_KERNELCORE.txt` protegit per git.

---

### BUCKET 19: INTRANET DASHBOARD - INVENTARI I INJECCIÓ DE CAPITAL (217 - 228)
- [x] 217. Secció de **Magatzem & Estoc**: visualització de les 100 referències de maquinari amb cerques en temps real.
- [x] 218. Filtres d'estoc per categoria (Racks 19", Cablejat, Xarxa & VLAN, Wi-Fi 6, NGFW, SAI, Servidors, TPV, Eines).
- [x] 219. Filtres per gamma de producte (Bàsic / General, Mitjà Empresarial i Professional / CPD).
- [x] 220. Indicadors visuals de nivell d'estoc amb alertes automàtiques d'estoc baix quan les unitats cauen sota el mínim.
- [x] 221. Modal d'injecció de capital d'inversor amb 4 paquets calculats: Bàsic (+72.075 €), Mitjà (+122.900 €), CPD (+136.560 €) i Megapack 100 SKUs (+193.365 €).
- [x] 222. Càlcul del valor total immobilitzat al magatzem de DFactory en temps real.
- [x] 223. Cerca instantània de productes per codi SKU, fabricant o nom descriptiu de la referència.
- [x] 224. Taula paginada amb informació de preu de cost estimat i preu de venda al públic recomanat.
- [x] 225. Botó d'exportació d'inventari a fitxer de full de càlcul CSV.
- [x] 226. Acció ràpida per afegir noves unitats o editar els estocs mínims de seguretat.
- [x] 227. Indicadors de proveïdor oficial associat per a cada referència del magatzem.
- [x] 228. Sincronització immediata de les modificacions d'estoc amb la base de dades MariaDB.

---

### BUCKET 20: INTRANET DASHBOARD - SOL·LICITUDS, CLIENTS I PROVEÏDORS (229 - 240)
- [x] 229. Secció de **Sol·licituds IT**: safata d'entrada de peticions web amb botó d'obertura al configurador de pressupostos.
- [x] 230. Secció de **Pressupostos IT**: taula de propostes econòmiques amb botons per veure PDF, descarregar PDF i enviar per correu.
- [x] 231. Modal d'enviament de pressupost per correu amb personalització de missatge per al client i remitent tècnic seleccionable.
- [x] 232. Secció de **Clients & PIMEs**: fitxes completes d'empreses de Barcelona amb cerca per NIF/CIF i sector industrial.
- [x] 233. Registre de 6 clients corporatius realistes de l'àrea de Barcelona (Zona Franca, Diagonal, Born, 22@, Eixample, Gràcia).
- [x] 234. Modal de registre de nous clients corporatius amb validació de NIF/CIF i entorn operatiu.
- [x] 235. Secció de **Proveïdors Oficials**: majoristes homologats amb condicions de pagament i filtre directe a l'estoc subministrat.
- [x] 236. Registre dels 5 distribuïdors oficials: Ingram Micro, Esprinet, Schneider Electric, TD SYNNEX i Posiflex Iberia.
- [x] 237. Càlcul en temps real del capital d'estoc acumulat de les marques subministrades per cada proveïdor.
- [x] 238. Botó per filtrar l'estoc del magatzem per la marca principal del proveïdor en 1 clic.
- [x] 239. Secció de **Projectes Actius**: seguiment de desplegaments amb barra de progrés, fites tècniques i assignació de responsable.
- [x] 240. Secció de **Tiquets SAT & Suport**: gestió d'incidències tècniques amb codi de gravetat, diagnòstics i resolució sota acord SLA.

---

### BUCKET 21: TELEMETRIA, AUDITORIA I ASSEGURAMENT DE QUALITAT (241 - 250)
- [x] 241. Secció de **Servidors & Telemetria**: monitoratge en temps real dels 4 nodes clau de DFactory Barcelona (`SRV-DC01`, `NAS-BCN`, `SW-CORE-01`, `UPS-APC-3000`).
- [x] 242. Monitoratge de mètriques de CPU, memòria RAM utilitzada, temperatura operativa i estat d'enllaç de xarxa.
- [x] 243. Desenvolupament de la consola interactiva de diagnòstics de xarxa ICMP Ping amb execució de paquets i percentatge de pèrdues.
- [x] 244. Programació del motor d'auditoria automàtica de sistemes amb execució periòdica cada 60 segons en segon pla (`runSystemAudit`).
- [x] 245. Comprovació automàtica dels 5 pilars crítics: Base de dades SQL, integritat de les 100 referències d'estoc, telemetria de nodes, seguretat RBAC i disponibilitat d'endpoints API.
- [x] 246. Botó d'auditoria immediata a la capçalera del panell que genera un informe amb puntuació d'integritat (Score 100% OPTIMAL).
- [x] 247. Verificació d'assegurament de qualitat del codi: 0 errors i 0 advertències a `oxlint` a tots els fitxers del projecte.
- [x] 248. Prova de cicle complet d'enginyeria: generació de sol·licitud, càlcul SAI, emissió de Factura Proforma PDF i lliurament per Gmail SMTP amb certificat digital.
- [x] 249. Verificació de seguretat: protecció de contrasenyes, arxiu `.env` fora de repositori i sanitització de consultes.
- [x] 250. Preparació de l'entorn per a la presentació final i defensa davant el tribunal de síntesi del cicle formatiu SMX.

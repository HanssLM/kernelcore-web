# TASQUES DE PROJECTE PER A MICROSOFT PLANNER · KERNELCORE
## Projecte de Síntesi CFGM SMX · DFactory Barcelona
## Creació i Desenvolupament Web: Hans Lao Moncusí

Aquestes tasques estan redactades de manera senzilla, clara i real, incloent tant les fases de **pensar, decidir i investigar** com les de **crear, programar, provar i corregir**.

---

### CUBELL 1: PENSAR LA IDEA, EL NOM I LA MARCA (PENSAR & DECIDIR)
- [x] **01.** Pensar quina empresa volem crear i a què ens dedicarem (instal·lacions de xarxes, servidors i manteniment per a empreses).
- [x] **02.** Pensar i decidir el nom definitiu de l'empresa: descartar "KryptonCore" i fixar el nom **KernelCore**.
- [x] **03.** Decidir on tindrem la seu oficial (triar DFactory Barcelona a la Zona Franca com a seu tecnològica).
- [x] **04.** Pensar quins colors corporatius queden més professionals (triar el blau marí fosc i el cyan elèctric).
- [x] **05.** Pensar com ha de ser el logotip: dibuixar la idea d'un hexàgon amb la lletra K i punts que semblin una xarxa.
- [x] **06.** Passar el dibuix del logotip a codi vectorial SVG per a la web (`Logo.jsx`).
- [x] **07.** Fer la icona petita que surt a la pestanya del navegador (`favicon.svg`).
- [x] **08.** Treure qualsevol emoji o icona infantil de tota la web perquè sembli una empresa seriosa.
- [x] **09.** Pensar com posar les signatures a la web i digitalitzar-les en color blau de bolígraf.

---

### CUBELL 2: PENSAR L'ESTRUCTURA DE LA WEB I PREPARAR L'ENTORN
- [x] **10.** Pensar quines seccions necessita tenir la pàgina web perquè un client ho entengui ràpid (Inici, Serveis, Com treballem, Equip, Formulari).
- [x] **11.** Crear la carpeta del projecte i engegar el repositori de codi a Git per no perdre els canvis.
- [x] **12.** Instal·lar i preparar React amb Vite per programar la web de forma ràpida.
- [x] **13.** Configurar Tailwind CSS per donar estils de manera senzilla i ordenada.
- [x] **14.** Buscar i posar un paquet d'icones tècniques que quedin netes (`lucide-react`).
- [x] **15.** Configurar un fitxer `.gitignore` perquè no es pugin contrasenyes ni arxius temporals a Git.

---

### CUBELL 3: PROGRAMAR LA PÀGINA WEB PRINCIPAL (FRONTEND)
- [x] **16.** Pensar com fer el menú de dalt (Navbar) perquè es quedi fix i tingui efecte transparent en baixar la pàgina.
- [x] **17.** Programar el menú per a mòbil amb botó d'hamburguesa que s'obri i es tanqui bé.
- [x] **18.** Arreglar un error on el menú desapareixia en tauletes o pantalles mitjanes.
- [x] **19.** Dissenyar la portada gran (Hero) amb un títol que cridi l'atenció i botons directes per demanar pressupost.
- [x] **20.** Programar una animació de fons amb boletes i línies que es connecten soles com si fos internet.
- [x] **21.** Pensar quins serveis oferirem i escriure'n la descripció (cablejat, armaris rack, servidors, tallafocs, SAI).
- [x] **22.** Crear les targetes visuals de cada servei amb els seus preus i punts forts.
- [x] **23.** Programar l'acordió per a mòbil: que es vagi obrint sol el servei que estàs mirant quan fas scroll.
- [x] **24.** Fer la secció de "Com treballem" explicant els 4 passos: auditar, dissenyar plànol, tirar cables i certificar amb Fluke.
- [x] **25.** Fer la secció de l'equip mostrant els perfils tècnics i la seu a DFactory.
- [x] **26.** Fer el formulari de contacte amb caselles de nom, empresa, telèfon, correu i text del missatge.
- [x] **27.** Pensar els textos legals de protecció de dades (RGPD) i fer el bàner que pregunta si acceptes les galetes.

---

### CUBELL 4: PENSAR I CREAR LA CALCULADORA DE SAI I EL PRESSUPOSTADOR
- [x] **28.** Pensar com calcular el consum elèctric d'una oficina: quants Watts consumeix cada ordinador, cada servidor i cada switch.
- [x] **29.** Programar una calculadora interactiva on el client mogui una barra i vegi quants Watts necessita la seva oficina.
- [x] **30.** Pensar com calcular els Volt-Amperes (VA) del SAI afegint un +20% de marge de seguretat perquè no salti la llum.
- [x] **31.** Fer que la calculadora recomani el model de SAI adequat (de 1500VA, 3000VA o 5000VA) i digui quants minuts de bateria tindrà.
- [x] **32.** Pensar com ha de ser el configurador de pressupostos (triar armari rack mural o de terra, tipus de switch i còpia al núvol).
- [x] **33.** Programar la suma automàtica de materials, llicències de programari i mà d'obra.
- [x] **34.** Calcular la base imposable i afegir automàticament el 21% d'IVA per donar el preu final.
- [x] **35.** Posar un botó per copiar el pressupost en text pla o descarregar-lo per si el vols guardar ràpid.

---

### CUBELL 5: DISSENYAR EL PDF DE PRESSUPOST I L'ENVIAMENT PER CORREU
- [x] **36.** Pensar com ha de ser el full de pressupost oficial perquè sembli una Factura Proforma d'empresa de veritat.
- [x] **37.** Programar el generador de PDF al servidor amb la llibreria `pdfkit` per no dependre de captures de pantalla.
- [x] **38.** Dibuixar el logo de KernelCore en vectorial directe al PDF perquè es vegi nítid i no borrós.
- [x] **39.** Posar les dades de l'empresa (NIF, DFactory) a l'esquerra i les dades del client a la dreta.
- [x] **40.** Fer la taula amb les línies de material (SKU, quantitat, preu i total).
- [x] **41.** Posar el número de compte bancari (IBAN de CaixaBank) per poder fer el pagament per transferència.
- [x] **42.** Arreglar el disseny perquè cap requadre quedi tallat a baix de pàgina i tot càpiga en 2 fulls exactes.
- [x] **43.** Fer la segona pàgina del PDF com a annex tècnic amb el càlcul del SAI i les condicions de garantia.
- [x] **44.** Configurar el correu de sortida amb Nodemailer per poder enviar el correu des d'un compte real de Gmail.
- [x] **45.** Crear una contrasenya d'aplicació a Gmail i guardar-la protegida al fitxer `.env`.
- [x] **46.** Dissenyar el correu en HTML sense emojis que arriba al client amb el document PDF adjunt.
- [x] **47.** Provar que l'enviament de correu funcioni de veritat i que el fitxer PDF s'obri correctament.

---

### CUBELL 6: PENSAR LA BASE DE DADES I EL PANELL INTERN (DASHBOARD)
- [x] **48.** Pensar quines dades hem de guardar a la base de dades (materials del magatzem, clients, sol·licituds, pressupostos i tiquets).
- [x] **49.** Escriure el fitxer SQL (`kernelcore_db.sql`) per crear la base de dades a MariaDB/MySQL.
- [x] **50.** Inventar i posar a la base de dades un catàleg complet de 100 materials de xarxa reals amb les seves marques i preus.
- [x] **51.** Connectar el servidor Express amb MariaDB de XAMPP i fer que si MariaDB no està engegada la web no es trenqui (mode fallback).
- [x] **52.** Pensar com organitzar el panell intern (Dashboard): pestanyes de Magatzem, Sol·licituds, Pressupostos, Clients i Servidors.
- [x] **53.** Fer el formulari d'inici de sessió amb botons d'accés ràpid per provar els diferents usuaris davant el tribunal en 1 clic.
- [x] **54.** Posar un botó per poder enviar qualsevol pressupost per correu amb el PDF adjunt des del propi panell.
- [x] **55.** Posar una consola petita que faci pings reals per comprovar si un servidor o router està encès.
- [x] **56.** Programar una revisió automàtica que cada minut comprovi que la base de dades i l'estoc estiguin correctes.

---

### CUBELL 7: PROVAR TOT, CORREGIR DETALLS I PREPARAR AMB DOCKER
- [x] **57.** Provar tota la web des de diferents pantalles (mòbil, tauleta i ordinador) i ajustar que cap text quedi desquadrat.
- [x] **58.** Passar el revisor de codi (`oxlint`) per assegurar que no queda cap error ni cap arxiu sense ús.
- [x] **59.** Pensar com empaquetar-ho tot junt amb Docker perquè funcioni a qualsevol ordinador sense haver d'instal·lar XAMPP a mà.
- [x] **60.** Crear els fitxers `Dockerfile`, `nginx.conf` i `docker-compose.yml` i deixar-ho a punt per a la presentació final.

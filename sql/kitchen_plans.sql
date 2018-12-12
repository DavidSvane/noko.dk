-- phpMyAdmin SQL Dump
-- version 4.6.1
-- http://www.phpmyadmin.net
--
-- Host: mysql5.gigahost.dk
-- Generation Time: May 12, 2018 at 12:44 AM
-- Server version: 5.7.16
-- PHP Version: 5.6.27-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `noko_web`
--

-- --------------------------------------------------------

--
-- Table structure for table `kitchen_plans`
--

CREATE TABLE `kitchen_plans` (
  `id` int(10) UNSIGNED NOT NULL,
  `week` datetime NOT NULL,
  `d1` text,
  `d2` text,
  `d3` text,
  `d4` text,
  `d5` text,
  `d6` text,
  `d7` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `kitchen_plans`
--

INSERT INTO `kitchen_plans` (`id`, `week`, `d1`, `d2`, `d3`, `d4`, `d5`, `d6`, `d7`) VALUES
(1, '2017-06-19 09:00:00', '', '', '', '', 'Stegte nudler m. kylling, grønt og urter...og ristede løg.', 'Pulled beef salad m. blue cheesedressing. Kage: squashkage.', 'gazpacho m. rucola, grana, pinje og manitobabrød. Dessert: sveskeis.'),
(2, '2017-06-26 09:00:00', 'Fasolada m. manitobabrød og rucola (veg.). ', 'Okra i karry m. basmatiris (veg.). ', 'Spoleben m. brændt kål.', 'Grillet short ribs & blomkål m. rucolagremolata', 'Tomatsauce m. squash og pasta (veg.).', 'Lam i dild og rejer. Kage: Chokoladekage.', 'Flæskestegssandwiches. Dessert: Citronfromage.'),
(3, '2017-07-03 09:00:00', 'Risotto m. ventreche, mandler, salvie & bønner m. yoghurt & chili', 'Polenta m. bearnaise & sennepsalat m. hvide & grønne asparges (veg)', 'Nuddelsalat m. andehjerter', 'Hot dogs på grillen', 'Aftenlukket.', 'Lukket.', 'Lukket.'),
(4, '2017-07-10 09:00:00', 'Ferielukket', 'Ferielukket', 'Ferielukket', 'Ferielukket', 'Ferielukket', 'Ferielukket', 'Ferielukket'),
(5, '2017-08-07 09:00:00', 'Bostonsteg m. hønsesovs, ristet gulerødder m. malt & feldsalat m. vinaigrette ', 'kalvespidsbryst m. bagt selleri, hjertesalat, friske figner & gedeost', 'Nudler m. sursød sauce, Peber, ristet cashewnødder & thai basilikum (veg)', 'Spareribs m. majs & coleslaw', 'Chicken fajita wrap m. frisk salsa, spidskål & cheddar', 'Pasta m. bakskuld & rucola m. ristet pinjekerner & olivenolie (fisk). Banankage', 'Grøntsagslasagne (veg) Dessert: lemonpie m. jordbær'),
(6, '2017-08-14 09:00:00', 'Siciliansk tomatsovs m. salsiccia, panchetta, salvie & ansjos.', 'Bagt laks m. squashsalat m. grana & citron (fisk)+.', 'Tyrkisk köfte m. syltet kål, fladbrød (veg).', 'Svampetoast m lardo & rucola.', 'Lammeskank i chili og rødvin m. pastinaksalat.', 'Indisk karry m. blomkål, kartofler og kikærter (veg.). Kage: Mazarin ', 'Kylling danoise. Dessert: Fløderand m. hindbær.'),
(7, '2017-08-21 09:00:00', 'Pasta m. semi dried tomat, hvidløg, citron, spinat & basilikum (veg.).', 'Panangkarry m. kylling & ris.', 'Fisk m. tomat/melonsalat og ansjoscreme (fisk).', 'Porchetta & ferskensalat m. savoykål, gedeost, sesam & basilikum.', 'Nye gulerødder m. ricotta, ristet sesam & thai basilikum. Hovedsalat m. avocado, lime & koriander (veg).', 'Stegte nudler m. okse og grønt.\r\nKage: Gulerodskage.', 'Tarteletter m. høns i asparges.\r\nDessert: Koldskål m. kammerjunkere.'),
(8, '2017-08-28 09:00:00', 'Ristet gnocchi m. gulerod og estragon (veg.).', 'Cremet polenta m. bacon chunks og salat.', 'Kyllingelår m. broccoli og kål i appelsin.', 'Laksesandwich (fisk).', 'Daal m. spidskål og mynte i honning (veg.).', 'American burgers with fries.\r\nKage: chokoladekage.', 'Boller i karry m. savoy og æbler.\r\nDessert: vaniljeparfait m. chokoladesovs.'),
(9, '2017-09-04 09:00:00', 'Høbagt selleri m. havgusost, urter & bønner (veg)', 'Grillet flat iron steak & kartoffelsalat', 'Dampet kulmule & spidskål m. hyldeblomst, dild, manlder, vesterhavsost, spinat & brocoli', 'Cecinasalat (tørret okseklump), manitobabrød & dip', 'Svampebygotto m. persille & rucola m. sennep', 'Lammekølle m. pommes anna & feldsalat m. krydderolie. Kage: Chokoladekage', 'Koteletter i fad m. ris & romaine. Dessert: Ymerfromage m. knas'),
(10, '2017-09-11 09:00:00', 'Broccoligratin m. egeblade, purløgsdressing & friteret boghvede', 'Glaseret svinekæber m. knuste kartofler, syltet rødbeder & bønner i yoghurt', 'Pasta m. kantareller, mandler & persille. Rucola & balsamico (veg)', 'Stegt havtaskehale m. karamelliseret jordskokker & spidskål m. hyldeblomst & løvstikke (fisk)', 'stegt Lammeculotte & ristet blomkål m. hasselnød & citron. Feldsalat m. mormordressing', 'Papaysalat m. stegt okse, Kinakål, koriander & ris. Kage: Drømmekage ', 'Pølsemix m. rå løg karryketchup & mizunasalat m. sennepsvinaigrette. Dessert: Abemad m. råcreme '),
(11, '2017-09-18 09:00:00', 'Helstegt kylling m. bulgursalat og hummus.', 'Pasta verde (veg.)', 'Skipperlabskovs m. hjertesalat og syrnet fløde.', 'Bao m. braiseret svin.', 'Spicy mexicansk tomatsuppe med kidneybønner og salsa (veg.).', 'Forel m. lantidsbagte løg og beurre blanc (fisk).', 'Shortsribs i BBQ m. coleslaw og bagt kartoffel.'),
(12, '2017-09-25 09:00:00', 'Pasta m. okse og chili', 'Asiatisk hokkaidosuppe (veg.)', 'Rørt tatar m. manitobabrød & hjertesalat', 'Pizza m. marscapone, mozzarella, kartoffel, urter & parmesan (veg)', 'Dampet kuller, sauteret majs & spidskål m. sennepvinaigrette (fisk)', '75 års jubilæum (ingen morgenmad + aftensmad denne dag)', 'Jægergryde m løvstikke, ris & feldsalat '),
(13, '2017-10-02 09:00:00', 'Frikadeller m. stuvet hvidkål/kartofler & Iceberg m. thousand island', 'Blomkålssuppe m. trøffel, parmesan, gremolata & rucola (veg)', 'Tærte m. bakskuld, spinat & creme fraiche (fisk)', 'Nyretapper m. knuste kartofler & hjertesalat m. malt & mormordressing', 'Pariserbøf & feldsalat m. peberrodvinaigrette', 'Linsefrikadeller m. hummus, spidkål, agurk,  yoghurt, fladbrød (veg)', 'Duck Malaikari m. kinakål og mynte'),
(14, '2017-10-09 09:00:00', 'Jordskokkesuppe m. syltede jordskokker, hytteost & manitobabrød (veg)', 'Spaghetti Bolognese m. kyllingehjerter & kråser. Rucola & balsamico', 'Ovnstegt safrankylling & spidskål m. dadler & mandler', 'Stegt rødspætte, lun kartoffelsalat, mizuna & hvid sovs (fisk)', 'Svinenakke i honning og sennep m. pommes hasselbach, paprikamayo og salat', 'Grøntsager i gul karry m. ris og raita. (veg) Kage: Blondie', 'Mexigryde m. ris & iceberg m. creme fraiche. Dessert: Chokolademousse'),
(15, '2017-10-16 09:00:00', 'Stegte gulerødder m. teriyaki og æg (veg)', 'Congee m. kylling (asiatisk risgrød)', 'Pasta m. salciccia, æg og stegt grønkål.', 'Stjerneskud (fisk)', 'Nokos vegetariske minestrone m. manitobabrød(veg.) ', 'Stegt flæsk m. persillesovs & kartofler. Chokoladekage', 'Gammeldaws oksesteg m. knuste kartofler, sovs og agurkesalat. Dessert: Citronfromage'),
(16, '2017-10-23 09:00:00', 'Bygotto m. selleri & persillerod. Spidskål m. hyldeblomst, vesterhavsost & dild (veg.).', 'Kartoffelsuppe m. bacon, hytteost, porre, rucola & basilikum.', 'Tandoriwrap m. syltet rødkål, iceberg mynte & feta (veg.).', 'Boeuf bourguignon m. knuste kartofler, feldsalat & sennepsvinaigrette.', 'Pasta i sauce på friske tomater m. røget flæsk og svine skank.', 'Fiskefrikadeller m. remolade, ristede perillerødder & grønkål m. Sennep (fisk).\r\nKage: Drømmekage.', 'Søndag: Marokkansk kylling Ala. Tagine m. brune ris, rosiner & salat.\r\nDessert: Æbletrifli.\r\n'),
(17, '2017-10-30 09:00:00', 'Stegt svinekotelet m. perlebyg, bønner, bagt squash og kyllinge/løgsauce.', 'Millionbøf m. kartoffelmos, syltet rødbeder & iceberg m. creme fraiche dressing.', 'Bagt laks & spidskål/broccolisalat m. pære, ravost & mandler.', 'Bagte rødbeder m. gedeost, limabønner, hasselnødder, basilikum & manitobabrød m. romesco (veg).', 'Gullasch m. ris & feldsalat m. mormordressing.', 'Galla!!!', ' Tomatsuppe m. nudler (veg).\r\nDessert: ananasringe m. flødeskum.\r\n'),
(18, '2017-11-06 09:00:00', 'Bagt aubergine m. bulgur, agurk, mynte og feta. Manitobabrød. (veg.).', 'Baguette confit de canard - rap is crap!', 'Stegte nudler m. Tigerrejer & grønt (fisk).', 'Ribollita m. grana, persille.', 'Falaffel m. chilidressing, tabouleh, sprød salat og citron (veg.).', 'Kogt hamburgerryg m. grønlangkål og pastinakker. Kage: gulerodskage.', 'Moussaka & mizunasalat m. tzatziki '),
(19, '2017-11-13 09:00:00', 'Belugalinser, røget bacon, tomat & broccoli. Spidskål & sennep', 'Fiskelasagne & hjertesalat m. syrlig yoghurt (fisk)', 'Broccolisuppe m. kokosmælk, chili & rødkål m. sesam & ingefær (veg)', 'Spaghetti meatballs & rucola m. pesto ', 'Grøntsagstartelet m. østershatte & mizunasalat m. æblevinaigrette (veg.).', 'Fælles julefrokost', 'Culottesteg m. whiskysovs, ristede kartofler, hjertesalat & thousand island'),
(20, '2017-11-20 09:00:00', 'Mother Russia – Borsjtj m. dild, feta, kerner & syltet græskar (veg.)', 'Chicken vindaloo m. ris & spidskål m. karry & hørfrø', 'Porc au vin', 'Bibimbap m. dampet torsk (fisk)', 'Braiserede kikærter m. couscous & rødkål (veg)', 'Mongolsk gryde m. okse, ægnudler & hjertesalat. Appelsinkrydderkage', 'Porchetta m. cremet polenta & rucola m. pesto. Dessert: Øllebrød m. flødeskum'),
(21, '2017-11-27 09:00:00', 'Pakistansk karry m. blomkål (veg)', 'Bankekød m. svampe og selleri/kartoffelmos', 'Risotto alla milanese m. fennikelsalat', 'Papilotte m. torsketunger, kæber, porre & karamelliseret jordskokker (fisk)', 'Asiatisk gulerodssuppe & manitobabrød (veg)', 'Stegt kyllingebryst m. linser og bagt porre', 'Hakkebøf m. kogte kartofler, bløde løg, skysauce og agurkesalat'),
(22, '2017-12-04 09:00:00', 'Fritatta m. chorizo, peberfrugt, mizuna & basilikum', 'Brandade m. røget torsk, hjertesalat & mormordressing (fisk)', 'Svampebouillon m. stegte svampe, peber & glasnudler(veg)', 'Arabiske oksedeller m chilihummus, fladbrød & rødkålsalat', 'Farfalle m. nøddesauce & rucolasalat (veg)', 'Gangenes Julefrokost – Flæskestegtilmelding senest tirsdag d. 5 december ', 'Forloren hare m. kogte kartofler, brun sovs, ribsgelé & iceberg m. thousand island. Dessert: Citronfromage'),
(23, '2017-12-11 09:00:00', 'Svinenakke i rødvin & farin, lun rødkål & waldorfsalat ', 'Ristede gnocchi m. syltede jordskokker, ricotta, basilikum & tomatsalat (veg)', 'Julemedister, kryddersovs, ristede kartofler & feldsalat  ', 'Stegt andebryst m. andesovs, kastanjer, saltbagt selleri & hjertesalat', 'Risengrød m. kanel, smørklat & nisseøl (veg)', 'Stegte sild m. lun kartoffelsalat, sennepssovs & spidskål m. vinaigrette (fisk) Honningkage', 'Flæskestegssandwich & rucolasalat m. sennep. Dessert: Bagte æbler m. crumble & creme fraiche'),
(24, '2017-12-18 09:00:00', 'Asiatisk gryde m. gulerod, kylling & ris', 'Stegt rødspætte m. kogte kartofler, kapers, brunet smør, dild & hjertesalat (fisk)', 'Spaghetti  m. pesto, rucola, basilikum, ristede pinjekerner, parmesan & manitobabrød m. pisket kærnemælkssmør (veg)', 'Braiseret kalvespidsbryst & perlebygsalat m. syltede æbler, mandler & urter', 'Kun morgenmad denne dag', 'Julelukket', 'Julelukket'),
(25, '2017-12-25 09:00:00', 'Julelukket', 'Julelukket', 'Julelukket', 'Grøntsagsfrikasé m. andehjerter, ristede rødder og grønkål m. sennep', 'Porc au vin m. knuste kartofler, hjertesalat og syrnet fløde', 'Bagt Minestrone m. pecorino, grana, basilikum & rucola m. rosmarinolie(veg)', 'Nytårsaften'),
(26, '2018-01-01 09:00:00', 'Godt nytår!!! Lukket.', 'Braiserede kikærter m. endive og harissa (veg). ', 'Spaghetti Bolognese m. rucola og balsamico.', 'Ølbraiserede spoleben m. grønkål og brændt squash.', 'Ungarsk Kylling i paprika m. ris & mizuna m. mormordressing.', 'Nudler i sursødsauce (veg.) m. kinakål i lime og honning (veg). Kage: Chokoladekage.', 'Bostonsteg m. hønsesovs, ristede gulerødder og kartofler m. malt & feldsalat m. vinaigrette.  Dessert: Skovbærgrød m. fløde.'),
(27, '2018-01-08 09:00:00', 'Fransk løgsuppe m. rucola og sherryvinaigrette (veg.). Manitobabrød.', 'Italiensk oksegryde m. oliven, kartofler og gulerod.', 'Kylling i gul karry med iceberg og spinat i myntedressing.', 'Bagt Laks, blomkål i dildpesto & feldsalat (fisk).', 'jordskokgratin m. kål, fåreyoghurt og hasselnødder (veg.).', 'Roastbeef m. persillerødder og sennepssovs. Romaine og syrnet fløde. Kage: Chokoladekage', 'Brændende kærlighed m. sennepssalat og tranebær. Dessert: Nougatparfait'),
(28, '2018-01-04 09:00:00', '', '', '', '', '', '', ''),
(29, '2018-01-15 09:00:00', 'Pasta m. semi-dried tomater, bacon, trøffel og basilikum.', 'Shakshouka m. bulgur og krølsalat. (veg.)', 'Lammeculotte m. vintersalat.', 'Fish’n’Chips m. svamperemoulade (fisk).', 'Friske vietnamesiske forårsruller (veg.).', 'Koteletter i fad m. iceberg og 1000 islands. Kage: Gulerodskage. ', 'Aspargessuppe m. hønsekød. Dessert: Ymerfromage.'),
(30, '2018-01-22 09:00:00', 'Pasta carbonara & rucola m. krydderolie.', 'Kylling sauté marengo, manitobabrød & mizunasalat m. vinaigrette. ', 'Kogt hamburgerryg m. kartofler, gulerødder og persillesovs. Romaine m. mormordressing.', 'Baccalá m. torsk, mozzarella & hjertesalat m. pesto (fisk). ', 'Running dinner', 'Cremet rodfrugtsuppe m. ost og basilikum (veg.). Kage: Drømmekage.', 'Biksemad m. ketchup & feldsalat.  Dessert: Chokolademousse.'),
(31, '2018-01-29 09:00:00', 'Kyllingelår i grøn karry m. aubergine og grøn peber.', 'Tacos med spicy okse.', 'Porretærte m. feldsalat og sennep (veg.).', 'Helstegt asiatisk gås m. rødkålssalat.', 'Falafel, hummus, ristet søde kartofler, rucola og mynteyoghurt (veg.).', 'Pasta m. chili & rejer (fisk). Kage: Brownie.', 'Cow sheppards pie & spidskål m. purløg Dessert: Bagte æbler m. crumble.'),
(32, '2018-02-05 09:00:00', 'Grøntsagslasagne & mizunasalat (veg)', 'Spaghetti puttanesca m. rucola & balsamico (fisk)', 'Chili con carne m. ris & feldsalat', 'Chicken Tikka Masala & spidskål m. yoghurt', 'Stegt flæsk, persillesovs og kartofler. Romainesalat m. mormordressing', 'Stegte ris med grønt og soja (veg)', 'Tarteletter m. høns i asparges & iceberg m. thousand island dressing'),
(33, '2018-02-12 09:00:00', 'Belugalinser m. røget bacon, tomat og broccoli. Spidskål m. chili & creme fraiche.', 'Karrysuppe m. ris, kylling, porre, rød peber og iceberg', 'Pita m. tandoriløg, syltet kål, mynte  & feta (veg.)', 'Fiskefrikadeller m. dilds tvede kartofler & hjertesalat m. dildvinaigrette (fisk)', 'Nudelsalat m. grønt (veg.)', 'Bygotto m chorizo & rødkål. Banankage', 'Svensk pølseret & feldsalat. Dessert: Citronfromage'),
(34, '2018-02-19 09:00:00', 'Jordskokkesuppe m. syltet jorskokker, hytteost, kerner & urter (veg)', 'Lammekæber m. beder og gedeost', 'Kylling pépitoria m. ris & salat napoletana', 'Bahn Mi m. svinenakke', 'Salade Nicoise (fisk)', 'köfte m. tzatziki , hjertesalat, syltet kål, mynte & fladbrød (veg)', 'Ristaffel m. kylling'),
(35, '2018-02-26 09:00:00', 'Butter Chicken m. ris & indisk salat', 'Stegt spidskål m. urter, mandler, sauce Nage & Bønnesalat (veg)', 'Stegt kanin m. sivinesauce & broccolisalat m. hasselvinaigrette', 'Krondyrkølle, enebærsauce, stegte forårsløg & gule ærter ', 'Champignonsuppe m. hvidvin, persille, manitobabrød & hvidkål m. sennep (Veg)', 'Taco m. cerviche & spicy mangosalat & manitobabrød (fisk)', 'Spoleben i BBQ, coleslaw & bagt kartoffel m. smør '),
(36, '2018-03-05 09:00:00', 'Tortellini m. svampesauce (veg.).', 'Wok m. nudler og okse. Kinakål i lime.', 'Tunfrikadeller m. peanutbuttersauce & fennikelsalat m.peanuts & lime (fisk).', 'Eisbein mit sauerkraut und Erdapfelsalat.', 'Græskarsuppe med ingefær og æbler (veg.).', 'Kinesisk kylling m. ris & grønt. Spidskål m. yoghurt.\r\nKage: Squashkage.', 'Frikadeller m. kogte kartofler, brun sovs og rødkålssalat.\r\nDessert: Skovbærgrød m. fløde/sødmælk.'),
(37, '2018-03-12 09:00:00', 'Harira – Marokkansk kikærtesuppe & marineret kål (veg).', 'Helstegt kylling m. bulgursalat og hummus.', 'Jamaican curry lamb m. blommechutney, ris & spidskål.', 'Moules frites m. bitter salat (fisk).', 'Spaghetti m. cremet savojkål, saltbagte mandler, urter & rucolasalat m. balsamico (veg.).', 'Karbonader, hvid sovs med ærter & gulerod & kartofler. Hjertesalat & mormordressing.\r\nKage: Appelsinkage.', 'Hjerter i flødesovs m. kartoffelmos, persille & mizunasalat m. thousand island.\r\nDessert: Solbærparfait.'),
(38, '2018-03-19 09:00:00', 'Iransk quinoasalat m. ost, Baba Ganoush og fladbrød (veg)', 'Jomfruhummersuppe m. springløg, bønner, ost  & butternutsquash + Hvidkål m. persillevinaigrette (fisk)', 'Braiseret kalvespidsbryst m. sellerimos & råkost', 'Carpaccio af kalv m. rucola, parmasan, trøffel, perlebygsalat & manitobabrød', 'Stegt fennikel i hvidvin & æblemost m. urter & kikærter m. fennikelpesto (veg)', 'Pasta m. stegte andehjerter, trøffel & feldsalat. Drømmekage', 'Flæskestegssandwich & hjertesalat m. sennep. Dessert: Vanilje panda '),
(39, '2018-03-26 09:00:00', 'Kål au vin & spidskålsalat m. vesterhavsost & mandler', 'Brandade m. røget torsk & feldsalat m. citronyoghurt (fisk)', 'Paprikagryde m. svin, ris & iceberg m. mormordressing ', 'Ramen med røde pølser', 'Stegt lammeculotte & ristet blomkål m. citron, hasselnødder & karse ', 'Muslingebygotto & salat Napoletana m. sennepsvinaigrette. Chokoladekage', 'Daal m. manitoba & rødkål m. gedefeta (veg)\r\nDessert: Bagte æbler m. crumble & marscaponecreme'),
(40, '2018-04-02 09:00:00', 'Boller i Selleri m. ris, grøn salat og syrnet fløde', 'Salade Chevre Chaud (veg)', 'Lakselasagne & romaine m. dilddressing (fisk)', 'Stegte kålpølser m. estragoncreme, råkost & manitobabrød', 'Kartoffelsuppe m. porrer, urter & hytteost (Veg)', 'Vårfest', 'cheeseburger m. coleslaw. Dessert: koldskål   '),
(41, '2018-04-09 09:00:00', 'Stegt medister m. den sidste vinterkål, peberrod, æble & karse.', 'Linsefrikadeller m. hummus, spidkål, agurk,  yoghurt, fladbrød (veg.)', 'Siciliansk pasta m. salsiccia, bacon, salvie & ansjos. Fennikel m. basilikum & olivenolie.', 'Dampet torsk m. ramløgspesto, aspargeskartofler og spinat (fisk).', 'Skibberlabskovs m. hjertesalat og mormordressing.', 'Spinattærte m. feta,salat, ristet pinjekerner & pesto  (veg.).\r\nKage: Banankage', 'Panangkarry m. svinekød og ris.\r\nDessert: Hvid chokolademousse'),
(42, '2018-04-16 09:00:00', 'Grøntsags-frikasé m. ristede kartofler & mizunasalat (veg)', 'Bagt mørksej, røget bacon, gule beder, bønner & æg (Fisk)', 'Krydret kyllinglår & cous cous m. røget chili, mynte, agurk & feta', 'Reubens sandwich m. feldsalat ', 'Lammefrikadeller m. ristet aubergine, tzatziki & mizunasalat m. oregano', 'Kartoffelæggekage m. purløg, spicy ketchup, rugbrød & hjertesalat (veg)', 'Kalvecuvette m. whiskysauce & bønnesalat m. vesterhavsost & aspargesvinaigrette '),
(43, '2018-04-23 09:00:00', 'Ristet Gnocchi m. figner, trøffelromesco, basilikum, parmesan & rucola (veg)', 'Asiatisk kålsalat m. stegt andebryst & cashewnødder', 'Fasolada m. manitobabrød og mizunasalat (veg)', 'Flat iron steak & kartoffelsalat', 'Salat m. røget makrel & æg (fisk)', 'Bøf lindstrøm, saltbagte beder m. feta & iceberg m. mormordressing ', 'Forloren hare, kartofler m. brun sovs, agurkesalat, tyttebær & Romaine'),
(44, '2018-04-30 09:00:00', 'Mexicansk mole poblano m. tacos, rucola & creme fraiche', 'Italiensk Brødsalat, mizuna, maintoba & tomatpesto (veg)', 'Tarteletter m. laks, spinat, ærter, knoldselleri & spirer. Marineret savoykål (fisk)', 'Pasta m. løvstikke, agurk, basilikum & rucola m. hyldeblomstdressing (veg)', 'Cæcarsalat m. kylling & bacon', 'Græsk farsbrød m. tzatziki, krydrede kartofler & salat Napoletana', 'Hotdawgs & coleslaw'),
(45, '2018-05-07 09:00:00', 'Aspargesbygotto m. rucola & balsamico (veg)', 'Ægnudler m. svin & grønt.', 'Bulgursalat m. bagt knoldselleri & kylling', 'Papilotte m. torskekæber, oliven, soltørret tomat, hvidvin & porrer & Perlespeltsalat (fisk)', 'Stegt broccoli m. vesterhavsost, sauce nage, urter, manitobabrød & Feldsalat m. vinaigrette (veg)', 'Hakkedreng m. bløde løg, kartofler, agurkesalat & brun sovs. Icebergsalat m. yoghurtdressing. Kage: Sandkage', 'Boller i karry m. savoy og æbler. Dessert: Parfait '),
(46, '2018-05-14 09:00:00', 'Cremet polenta m. bacon, østershatte og salat', 'Indisk karry m. blomkål, kartofler og kikærter (veg)', 'Dampet kulmule & spidskål m. hyldeblomst, dild, manlder, vesterhavsost, spinat & brocoli (fisk).', 'Grillet burgers (hvis vejret holder)', 'Stegte nudler m. okse og grønt', 'Casio e pepe & rucola m. basilikumspesto (veg). Kage: Drømmekage', 'Husarsteg m. pomme Hasselback og pebersauce. Dessert: Hindbærfromage m. knas');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kitchen_plans`
--
ALTER TABLE `kitchen_plans`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `week` (`week`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kitchen_plans`
--
ALTER TABLE `kitchen_plans`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.6.1
-- http://www.phpmyadmin.net
--
-- Host: mysql5.gigahost.dk
-- Generation Time: May 12, 2018 at 12:46 AM
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
-- Table structure for table `party`
--

CREATE TABLE `party` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` tinytext,
  `date` datetime NOT NULL,
  `who` tinytext
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `party`
--

INSERT INTO `party` (`id`, `name`, `date`, `who`) VALUES
(1, 'Semesterstartsfest', '2009-02-07 00:00:00', '1. Nord'),
(2, 'Plenum', '2009-02-19 00:00:00', 'Styrelsen'),
(3, 'Kollegiecrawl', '2009-03-07 00:00:00', '5. Syd'),
(4, 'Indflytterfest', '2009-03-28 00:00:00', '2. Nord'),
(5, 'Vårfest', '2009-04-18 00:00:00', '3. Syd & St. Syd'),
(6, 'St. Bededagsaften', '2009-05-07 00:00:00', 'Styrelsen'),
(7, 'Sommerbar', '2009-06-27 00:00:00', '5. Nord & Barudvalget'),
(8, 'Semesterstartsfest', '2009-09-05 00:00:00', '2. Syd'),
(9, 'Kollegiets fødselsdag', '2009-09-29 00:00:00', 'Styrelsen'),
(10, 'Indflytterfest', '2009-10-03 00:00:00', '3. Nord'),
(11, 'NOKO - Open', '2009-10-04 00:00:00', 'Sportsdirektørerne'),
(12, 'Gallafest', '2009-11-14 00:00:00', 'St. Nord & 4. Nord'),
(13, 'Fælles julefrokost', '2009-11-28 00:00:00', '1. Syd & 4. Syd'),
(14, 'Julestue', '2009-11-29 00:00:00', 'Styrelsen'),
(15, 'Gangenes julefrokost', '2009-12-12 00:00:00', ''),
(16, 'Plenum', '2009-09-16 00:00:00', 'Styrelsen'),
(17, 'Privat fest', '2009-10-30 00:00:00', 'Signe/38 og Pernille/54'),
(18, 'STILLEPERIODE STARTER', '2009-12-01 00:00:00', ''),
(19, 'STILLEPERIODE SLUTTER', '0000-00-00 00:00:00', ''),
(20, 'Fødselsdag ', '2009-10-14 00:00:00', 'Christian/92'),
(21, 'Fødselsdag', '2009-10-24 00:00:00', 'Christian/92'),
(57, 'Semesterstartsfest', '2011-09-03 00:00:00', '3. Syd'),
(55, 'Store Bededagsaften', '2011-05-19 00:00:00', 'Styrelsen'),
(52, 'Kollegiecrawl', '2011-03-05 00:00:00', '5. Syd'),
(50, 'Privat', '2010-01-29 00:00:00', 'Mette/1'),
(28, 'Semesterstartsfest', '2010-09-04 00:00:00', '1. Syd'),
(29, 'Kollegiets fødselsdag', '2010-09-29 00:00:00', 'Styrelsen'),
(30, 'Indflytterfest', '2010-10-02 00:00:00', '4. Nord'),
(31, 'Gallafest', '2010-11-13 00:00:00', '3. Syd & 4. Syd'),
(32, 'Fælles julefrokost', '2010-11-27 00:00:00', '1. Nord & Stuen Syd'),
(33, 'Julestue', '2010-11-28 00:00:00', 'Styrelsen'),
(34, 'Gangenes julefrokost', '2010-12-11 00:00:00', ''),
(35, 'NOKO - Open', '2010-10-04 00:00:00', 'Sportsdirektørerne'),
(56, 'Sommerbar', '2011-06-24 00:00:00', '5. Nord'),
(54, 'Vårfest', '2011-04-16 00:00:00', '2. Nord & St. Syd'),
(40, 'Dag med Spas', '2010-09-04 00:00:00', 'Sportsdirektørerne'),
(53, 'Indflytterfest', '2011-03-26 00:00:00', '4. Nord'),
(43, 'Kandidatfest', '2010-08-25 00:00:00', 'Christina/111'),
(44, 'Kandidatbrunch', '2010-11-20 00:00:00', 'Christina/111'),
(45, '2 x 25 års fødselsdag', '2010-10-16 00:00:00', 'Thomas/64'),
(46, 'Fest', '2010-11-05 00:00:00', 'Julie/85'),
(47, 'Kandidatfest', '2010-11-20 00:00:00', 'Maria/71'),
(51, 'Semesterstartsfest', '2011-02-05 00:00:00', '2. Syd'),
(58, 'Kollegiets Fødselsdag', '2011-09-29 00:00:00', 'Styrelsen'),
(59, 'Indflytterfest', '2011-10-01 00:00:00', '4. Syd'),
(60, 'NOKO Open', '2011-00-00 00:00:00', 'Sportsdirektørerne'),
(61, 'Gallafest', '2011-11-12 00:00:00', '1. Syd & 1. Nord '),
(62, 'Fælles Julefrokost', '2011-11-26 00:00:00', '3. Nord & St. Nord'),
(63, 'Julestue', '2011-11-27 00:00:00', 'Styrelsen'),
(64, 'Gangenes Julefrokost', '2011-12-10 00:00:00', ''),
(65, 'Plenum', '2011-02-24 00:00:00', 'Styrelsen'),
(67, 'Plenum', '2011-00-00 00:00:00', 'Styrelsen'),
(68, 'Privat fest', '2011-08-27 00:00:00', 'Mette/1'),
(71, 'Privat fest', '2011-12-31 00:00:00', 'Camilla/21'),
(70, 'Privat fest', '2011-10-22 00:00:00', 'Daniel/112'),
(72, 'Semesterstartsfest', '2012-02-04 00:00:00', '3. Syd'),
(73, 'Plenum', '2012-02-23 00:00:00', 'Styrelsen'),
(74, 'Kollegiecrawl', '2012-03-03 00:00:00', '5. Nord'),
(75, 'Rengøringsdag', '2012-03-10 00:00:00', 'Alle'),
(76, 'Indflytterfest', '2012-03-31 00:00:00', '3. Nord'),
(77, 'Vårfest', '2012-04-21 00:00:00', 'Stuen Nord og 2. Syd'),
(78, 'Store Bededagsaften', '2012-05-03 00:00:00', 'Styrelsen'),
(79, 'Sommerbar', '2012-06-29 00:00:00', '5. Syd'),
(80, 'Semesterstartsfest', '2012-09-01 00:00:00', '1. Syd'),
(81, 'Plenum', '2012-00-00 00:00:00', 'Styrelsen'),
(82, 'Plenum', '2012-00-00 00:00:00', 'Styrelsen'),
(84, 'Kollegiets fødselsdag', '2012-09-29 00:00:00', 'Styrelsen'),
(85, 'Indflytterfest', '2012-10-06 00:00:00', '1. Nord'),
(86, 'Gallafest', '2012-11-10 00:00:00', '2. Nord og 4. Nord'),
(87, 'Fælles julefrokost', '2012-11-24 00:00:00', 'Stuen Syd og 4. Syd'),
(88, 'Julestue', '2012-11-25 00:00:00', 'Styrelsen'),
(89, 'Gangenes julefrokost', '2012-12-08 00:00:00', 'Alle'),
(91, 'Rengøringsdag', '2012-09-30 00:00:00', 'Alle'),
(92, 'Privat', '2012-07-28 00:00:00', 'Henrik/67'),
(93, 'Privat', '2012-10-14 00:00:00', 'Ronni'),
(94, 'Plenum', '2012-09-20 00:00:00', 'Styrelsen'),
(95, 'Privat fest', '2012-10-26 00:00:00', 'Ina/72'),
(96, 'Plenum', '2013-02-21 00:00:00', 'Styrelsen'),
(97, 'Semesterstartsfest', '2013-02-02 00:00:00', 'Nyindflyttere aug-jan'),
(98, 'Gamle alumners fest', '2013-02-16 00:00:00', '3. Syd'),
(99, 'Kollegiecrawl', '2013-03-02 00:00:00', '5. Syd'),
(100, 'Rengøringsdag', '2013-03-17 00:00:00', 'Alle'),
(101, 'Indflytterfest', '2013-03-23 00:00:00', '2. Nord'),
(102, 'Vårfest', '2013-04-13 00:00:00', '4. Syd & 1. Nord'),
(103, 'Store Bededagsaften', '2013-04-25 00:00:00', 'Styrelsen'),
(104, 'Sommerbar', '2013-06-28 00:00:00', '5. Nord'),
(105, 'Semesterstartsfest', '2013-08-31 00:00:00', 'Nyindflyttere feb-jul'),
(106, 'Plenum', '2013-09-12 00:00:00', 'Styrelsen'),
(107, 'Vennefest', '2013-09-21 00:00:00', 'St. Syd & St. Nord'),
(108, 'Kollegiets fødselsdag', '2013-09-29 00:00:00', 'Styrelsen'),
(109, 'Indflytterfest', '2013-10-12 00:00:00', '1. Syd'),
(110, 'Rengøringsdag', '2013-10-20 00:00:00', 'Alle'),
(111, 'Gallafest', '2013-11-09 00:00:00', '3. Nord & 2. Syd'),
(112, 'Fælles julefrokost', '2013-11-23 00:00:00', '4. Nord'),
(113, 'Gangenes julefrokost', '2013-12-14 00:00:00', 'Alle'),
(114, 'Julestue', '2013-11-24 00:00:00', 'Styrelsen'),
(115, 'Privat fest', '2013-03-16 00:00:00', 'Ida Hasselbalch /111'),
(116, 'Filmoptagelser fra kl. 19.00', '2013-00-08 00:00:00', ''),
(117, 'Filmoptagelser fra kl. 19.00', '2013-00-08 00:00:00', 'Kontoret'),
(118, 'Filmoptagelser fra kl. 19.00', '2013-00-09 00:00:00', 'Kontoret'),
(119, 'Generalforsamling 19-22', '2013-03-19 00:00:00', 'A/B Lindstrand'),
(120, 'Generalforsamling 18.45-22', '2013-04-29 00:00:00', 'A/B Lincoln'),
(121, 'Privat fest', '2013-04-19 00:00:00', 'Signe Elin Gram /94'),
(122, 'Privat fest: Going-away-party', '2013-08-10 00:00:00', 'Christina Henriette la Cour /49'),
(123, 'Gården og gril udlånt ca kl16-22', '2013-08-30 00:00:00', 'Gothia Finans'),
(125, 'Privat fest', '2013-09-14 00:00:00', 'Pernille/28 og Nicole/44'),
(126, 'Privat fest', '2013-11-30 00:00:00', 'Jacob/95'),
(127, 'Privat fest', '2013-11-16 00:00:00', 'Christina/63'),
(128, 'Semesterstartsfest', '2014-00-01 00:00:00', 'Nyindflyttere sep.-jan.'),
(129, 'Semesterstartsfest', '2014-02-01 00:00:00', 'Nyindflyttere sep.-jan.'),
(130, 'Gamle alumners fest', '2014-02-15 00:00:00', '3. nord'),
(131, 'Plenum', '2014-02-20 00:00:00', 'Styrelsen'),
(132, 'Gangcrawl', '2014-03-01 00:00:00', '5. nord'),
(133, 'Rengøringsdag', '2014-03-16 00:00:00', 'Alle'),
(135, 'Indflytterfest', '2014-03-22 00:00:00', '4. syd'),
(136, 'Vårfest', '2014-04-12 00:00:00', '1. syd & st. syd'),
(137, 'Store Bededagsaften', '2014-05-16 00:00:00', 'Styrelsen'),
(138, 'Sommerbar', '2014-06-27 00:00:00', '5. syd'),
(139, 'Semesterstartsfest', '2014-09-06 00:00:00', 'Nyindflyttere feb.-jul.'),
(140, 'Plenum', '2014-09-11 00:00:00', 'Styrelsen'),
(141, 'Vennefest', '2014-09-20 00:00:00', '4. nord & 1. nord'),
(142, 'Kollegiets fødselsdag', '2014-09-29 00:00:00', 'Styrelsen'),
(143, 'Indflytterfest', '2014-10-11 00:00:00', '2. syd'),
(144, 'Rengøringsdag', '2014-10-19 00:00:00', 'Alle'),
(145, 'Galla', '2014-11-08 00:00:00', 'St. nord & 3. syd'),
(146, 'Fælles julefrokost', '2014-11-22 00:00:00', '2. nord'),
(147, 'Julestue', '2014-11-23 00:00:00', 'Styrelsen'),
(148, 'Gangenes julefrokost og REVY', '2014-12-13 00:00:00', 'Alle'),
(149, 'Privat', '2014-03-14 00:00:00', 'Frederikke/41'),
(150, 'Privat', '2014-04-05 00:00:00', 'Nazanin'),
(151, 'Privat', '2014-04-11 00:00:00', 'Joanna/88'),
(152, 'Privat', '2014-05-09 00:00:00', 'Isabel/85'),
(153, 'Kandidatfest', '2014-08-30 00:00:00', 'Mette Dahl/1'),
(154, 'Bibliotek', '2014-09-13 00:00:00', 'Rasmus/38'),
(155, 'Biblioteket', '2014-09-26 00:00:00', 'Kira/115'),
(156, 'Biblioteket', '2014-10-12 00:00:00', 'Christian/29'),
(157, 'TDC', '2014-10-31 00:00:00', 'St. Syd'),
(158, 'TDC', '2014-09-27 00:00:00', '2. og 3. syd'),
(159, 'TDC', '2014-09-26 00:00:00', 'St. nord'),
(160, 'Fredagsbar', '2014-11-28 00:00:00', 'Styrelsen'),
(161, 'TDC', '2014-10-25 00:00:00', '4.syd'),
(162, 'TDC', '2014-10-24 00:00:00', '3. nord'),
(163, 'Privat', '2014-11-14 00:00:00', 'Morten/98'),
(164, 'Privat/bibliotek', '2015-00-10 00:00:00', 'Mathias/104'),
(165, 'Kandidatfest', '2015-00-21 00:00:00', 'Ewa/106'),
(166, '30 års fødselsdag', '2015-04-25 00:00:00', 'Michelle Jakobsen'),
(167, 'Semesterstartsfest', '2015-01-31 00:00:00', 'Indflyttere'),
(168, 'Plenum', '2015-02-05 00:00:00', 'Styrelsen'),
(169, 'Gangcrawl', '2015-02-28 00:00:00', '5. syd'),
(170, 'Rengøringsdag', '2015-03-08 00:00:00', 'Alle'),
(171, 'Indflytterfest', '2015-03-21 00:00:00', '4. nord'),
(172, 'Vårfest', '2015-04-11 00:00:00', '2. nord og 3. nord'),
(173, 'Store Bededagsaften', '2015-04-30 00:00:00', 'Styrelsen & St. syd'),
(174, 'Sommerbar', '2015-06-26 00:00:00', '5. nord'),
(175, 'Semesterstartsfest', '2015-08-29 00:00:00', 'Nyindflytter feb. - sep.'),
(176, 'Plenum', '2015-09-10 00:00:00', 'Styrelsen'),
(177, 'Vennefest', '2015-09-19 00:00:00', '1. syd & 2. syd'),
(178, 'Kollegiets fødselsdag', '2015-09-27 00:00:00', 'Styrelsen'),
(179, 'Indflytterfest', '2015-10-03 00:00:00', '3. syd'),
(180, 'Rengøringsdag', '2015-11-01 00:00:00', 'Alle'),
(181, 'Galla', '2015-11-07 00:00:00', '4. syd & 1. nord'),
(182, 'Fælles Julefrokost', '2015-11-21 00:00:00', 'St. nord'),
(183, 'Julestue', '2015-11-29 00:00:00', 'Styelsen'),
(184, 'Gangenes Julefrokost', '2015-12-12 00:00:00', 'Alle'),
(185, 'Privatfest', '2015-02-21 00:00:00', 'Ewa 106'),
(186, 'Biblioteket', '2015-01-24 00:00:00', 'Ida 111'),
(187, 'Privat', '2015-01-22 00:00:00', ''),
(188, 'Privat', '2015-03-14 00:00:00', 'Kyhlman'),
(189, 'Privat/bibliotek', '2015-02-15 00:00:00', 'Klara/27'),
(190, 'Privat', '2015-03-06 00:00:00', 'Isabel/85'),
(191, 'TDC', '2015-03-13 00:00:00', '1. syd'),
(192, 'TDC', '2015-02-20 00:00:00', '1. nord'),
(193, 'TDC', '2015-03-28 00:00:00', 'St. syd'),
(194, 'Bibliotek', '2015-03-15 00:00:00', 'Helene/133'),
(195, 'Bibliotek', '2015-02-22 00:00:00', 'Heidi/42'),
(196, 'Bibliotek og billardstue', '2015-04-18 00:00:00', 'Mike/62'),
(198, 'Kandidatfest', '2015-08-21 00:00:00', 'Victor/21'),
(199, 'Kandidatfest', '2015-10-24 00:00:00', 'Sarah/110'),
(200, 'Privatfest', '2015-09-26 00:00:00', 'Mike/62'),
(201, 'Privat', '2015-10-17 00:00:00', 'Jesper/42'),
(202, 'Semesterstartsfest', '2016-02-06 00:00:00', 'Nyindflyttere (august til januar)'),
(203, 'Semesterstartsfest', '2016-08-27 00:00:00', 'Nyindflyttere (februar til juli)'),
(204, 'Plenum', '2016-02-18 00:00:00', 'Styrelsen'),
(205, 'Gangcrawl', '2016-02-27 00:00:00', '5. Nord'),
(206, 'Rengøringsdag', '2016-03-06 00:00:00', 'Alle'),
(207, 'Indflytterfest', '2016-03-12 00:00:00', 'St. Syd + 1. Nord'),
(208, 'Vårfest', '2016-04-09 00:00:00', '3. Syd + 4. Nord'),
(209, 'Store Bededagsaften', '2016-04-21 00:00:00', 'Styrelsen'),
(210, 'Sommerbar', '2016-06-24 00:00:00', '5. Syd'),
(211, 'Plenum', '2016-09-08 00:00:00', 'Styrelsen'),
(212, 'Vennefest', '2016-09-17 00:00:00', '4. Syd + 3. Nord'),
(213, 'Kollegiets fødselsdag', '2016-10-02 00:00:00', 'Styrelsen'),
(214, 'Indflytterfest', '2016-10-08 00:00:00', 'St. Nord'),
(215, 'Rengøringsdag', '2016-10-23 00:00:00', 'Alle'),
(216, 'Galla', '2016-11-05 00:00:00', '1. Syd + 2. Nord'),
(217, 'Julestue', '2016-11-27 00:00:00', 'Styrelsen'),
(218, 'Gangenes julefrokost', '2016-12-10 00:00:00', 'Alle'),
(219, 'Nytårsaften', '2016-12-31 00:00:00', 'Frivillige'),
(220, 'Halloween arrangement', '2016-10-30 00:00:00', 'Styrelsen'),
(221, 'Fælles julefrokost', '2016-11-19 00:00:00', '2. syd'),
(222, 'Michelle kandidatreception', '2017-01-14 00:00:00', 'Efor'),
(223, 'Plenum', '2017-02-09 00:00:00', 'Styrelsen'),
(224, 'Semesterstartsfest', '2017-02-18 00:00:00', 'Nyindflyttere aug.-jan.'),
(225, 'Rengøringsdag', '2017-04-02 00:00:00', 'Alle'),
(226, 'Gangcrawl', '2017-03-04 00:00:00', '5. syd'),
(227, 'Indflytterfest', '2017-03-18 00:00:00', '2. nord'),
(228, 'Vårfest', '2017-05-06 00:00:00', '3. nord + 4. syd'),
(229, 'Store bededagsaften', '2017-05-11 00:00:00', 'Styrelsen + st. syd'),
(230, 'Sommerbar', '2017-06-23 00:00:00', '5. nord'),
(231, 'Semesterstartsfest', '2017-09-02 00:00:00', 'Nyindflyttere feb.-juli'),
(232, 'Plenum', '2017-09-07 00:00:00', 'Styrelsen'),
(233, 'Vennefest', '2017-09-16 00:00:00', '1. nord + 3. syd'),
(234, 'Kollegiets fødselsdag', '2017-09-30 00:00:00', 'Fødselsdagsudvalget+ styrelsen'),
(235, 'Indflytterfest', '2017-10-14 00:00:00', '1. syd'),
(236, 'Rengøringsdag', '2017-10-22 00:00:00', 'Alle'),
(237, 'Galla', '2017-11-04 00:00:00', '2. syd + st. nord'),
(238, 'Fælles Julefrokost', '2017-11-18 00:00:00', '4. nord'),
(239, 'Julestue', '2017-11-26 00:00:00', 'Styrelsen'),
(240, 'Gangenes Julefrokost', '2017-12-09 00:00:00', 'Alle'),
(241, 'Nytårsaften', '2017-12-31 00:00:00', 'Frivillige'),
(242, 'Fastelavn', '2017-02-26 00:00:00', 'Styrelsen'),
(246, 'Semesterstartsfest', '2018-02-03 00:00:00', 'Nyindflyttere (aug-jan)'),
(245, 'Running Dinner', '2018-01-26 00:00:00', 'Styrelsen'),
(247, 'Plenum', '2018-02-08 00:00:00', 'Styrelsen'),
(248, 'Fastelavn', '2018-02-11 00:00:00', 'Styrelsen'),
(249, 'Gangcrawl', '2018-02-24 00:00:00', '5. Nord'),
(250, 'Rengøringsdag', '2018-03-04 00:00:00', 'Alle'),
(251, 'Indflytterfest', '2018-03-17 00:00:00', '4. Syd og Stuen Syd'),
(252, 'Vårfest', '2018-04-07 00:00:00', '1. Syd og 1. Nord'),
(253, 'Store Bededagsaften', '2018-04-26 00:00:00', 'Styrelsen'),
(254, 'Sommerbar', '2018-06-29 00:00:00', '5. Syd'),
(255, 'Semesterstartsfest', '2018-09-01 00:00:00', 'Nyindflyttere (feb-juli)'),
(256, 'Plenum', '2018-09-06 00:00:00', 'Styrelsen'),
(257, 'Vennefest', '2018-09-15 00:00:00', 'Stuen Nord og 2. Nord'),
(258, 'Kollegiets fødselsdag', '2018-09-30 00:00:00', 'Styrelsen'),
(259, 'Indflytterfest', '2018-10-06 00:00:00', '2. Syd'),
(260, 'Rengøringsdag', '2018-10-21 00:00:00', 'Alle'),
(261, 'Galla', '2018-11-03 00:00:00', '4. Nord og 3. Syd'),
(262, 'Fælles Julefrokost', '2018-11-17 00:00:00', '3. Nord'),
(263, 'Julestue', '2018-11-25 00:00:00', 'Styrelsen'),
(264, 'Gangenes julefrokost', '2018-12-08 00:00:00', 'Alle'),
(265, 'Nytårsaften', '2018-12-31 00:00:00', 'Frivillige'),
(266, 'Musikquiz i Biblioteket', '2018-05-04 00:00:00', 'Eventudvalget'),
(267, 'Cycledelic Rave Party', '2018-05-18 00:00:00', 'Eventudvalget');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `party`
--
ALTER TABLE `party`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `party`
--
ALTER TABLE `party`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=268;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

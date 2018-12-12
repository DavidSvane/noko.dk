-- phpMyAdmin SQL Dump
-- version 4.6.1
-- http://www.phpmyadmin.net
--
-- Host: mysql5.gigahost.dk
-- Generation Time: May 12, 2018 at 12:41 AM
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
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` tinytext,
  `text` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `name`, `text`) VALUES
(1, 'kontor', '<p><b>Generel information:</b> Opdateret - 9. maj 2018</p>\n<p>Martin (vicevært) <a href="mailto:v@noko.dk">v@noko.dk</a><br />\nMobil <a href="28351612">28 35 16 12</a><br />\nMail <a href="kontoret@noko.dk">kontoret@noko.dk</a></p>\n<p>Kontoret holder lukket fredag den 11. maj 2018</p>\n<p>Kontoret</p>\n<br /><br /><br /><br /><br />'),
(2, 'styrelse', '<p><b>Styrelsen</b> består i denne periode af:</p>\n<p>Skipper: <a href="https://www.facebook.com/emma.graulund" target="_blank">Emma /1</a><br />\nStyrmand: <a href="https://www.facebook.com/oscar.enroth" target="_blank">Oscar /69</a><br />\nBådsmand: <a href="https://www.facebook.com/christinelouisek" target="_blank">Christine (aka. Krebs) /111</a><br />\nKabysmester: <a href="https://www.facebook.com/caroline.koetter" target="_blank">Caroline /52</a><br />\nTelegrafist: <a href="https://www.facebook.com/SofieOrts" target="_blank">Sofie /2</a><br />\nCeremonimester: <a href="https://www.facebook.com/lukas.runeandersen" target="_blank">Lukas /14</a><br />\nSvabergast: <a href="https://www.facebook.com/K.Hauerbach" target="_blank">Karoline /81</a></p>\n<p>E-mail-adresse: <a href="mailto:styrelsen@noko.dk">styrelsen@noko.dk</a></p>\n<p>I bedes skrive i emnefeltet, hvilken "mester" I retter henvendelse til.</p>\n'),
(3, 'bestyrelse', '<p><b>Ny bestyrelse:</b></p>\n<p><a href="https://www.facebook.com/patriciajnguetsop" target="_blank">Patricia /32</a> og <a href="https://www.facebook.com/BrorKirkegaard" target="_blank">Bror /58</a></p>\n<p>E-mail-adresse: <a href="mailto:bestyrelsen@noko.dk">bestyrelsen@noko.dk</a></p>\n'),
(4, 'webmaster', '<p><b>Den webansvarlige post</b> er lagt under netværksudvalget. Kontakt os hvis der er problemer med internet eller intranetsiden!</p>\n'),
(5, 'netværksudvalg', '<p><b>Netværksudvalget</b> består af <a href="https://www.facebook.com/rasmuslindell.gotfredsen" target="_blank">Rasmus /92</a>, <a href="https://www.facebook.com/davidsvane" target="_blank">David /95</a> og <a href="https://www.facebook.com/stefan.f.tofte" target="_self">Stefan /67</a></p>\n<p>Kontakt dem hvis der er problemer med netværket.</p>\n<p>Facebook: <a href="https://www.facebook.com/groups/226877854147487/">Netværksudvalgets Facebookgruppe</a></p>\n'),
(6, 'alle', '<p><b>Velkommen<b> til NOKO\'s intranet.</p>\n<p>Du kan logge på med dit fulde navn som brugernavn og dit valgte kodeord.</p>\n<p>Nye alumner kan bruge funktionen "Bestil ny adgangskode", og derved få tilsendt et kodeord på den mail adresse, der blev angivet til indskrivning på kollegiet.</p>\n'),
(7, 'filmudvalg', '<p><b>Køkkenet</b> kan træffes på <a href="35274656">35 27 46 56</a></p>\n');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

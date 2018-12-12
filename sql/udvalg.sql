-- phpMyAdmin SQL Dump
-- version 4.6.1
-- http://www.phpmyadmin.net
--
-- Host: mysql5.gigahost.dk
-- Generation Time: May 12, 2018 at 12:48 AM
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
-- Table structure for table `udvalg`
--

CREATE TABLE `udvalg` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `fb-group` text NOT NULL,
  `leader` tinytext NOT NULL,
  `members` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `udvalg`
--

INSERT INTO `udvalg` (`id`, `name`, `fb-group`, `leader`, `members`) VALUES
(1, 'Fondsudvalget', '151368068785482', '4246', 'null'),
(2, 'Netværksadmins', '226877854147487', '4070', 'null'),
(3, 'NOKO IF', 'nokoif', '4231', 'null'),
(4, 'Hockey-udvalg', '542963182387609', '4203', 'null'),
(5, 'Trænings-udvalg', '', '4195', 'null'),
(6, 'Herrefodbold', '212684242084120', '4255', 'null'),
(7, 'Damefodbold', '212684242084120', '4155', 'null'),
(8, 'Brætspilslauget', '1411743199059870', '4279', 'null'),
(9, 'Løbeklubben', '226914070996205', '4310', 'null'),
(10, 'NOKO IF Eventudvalg', '', '4250', 'null'),
(11, 'Faust - NOKO Kulturudvalg', 'NOKOFaust', '4209', 'null'),
(12, 'Arkitektoniske Kulturarvsudvalg', '', '4285', 'null'),
(13, 'NOKO-GAHK', '343748992636352', '4309', 'null'),
(14, 'Musikudvalget', '258477867947976', '4290', 'null'),
(15, 'Eventudvalget', '183797481954784', '4307', 'null'),
(16, 'Grøntudvalget', '', '4189', 'null'),
(17, 'Kommunikationsudvalget', '114511412035046', '2025', 'null'),
(18, 'Biblioteksudvalget', '199750220160582', '4146', 'null'),
(19, 'Medieudvalget', '', '4223', 'null'),
(20, 'Blomsterudvalget', '', '4235', 'null'),
(21, 'Bryggerlauget', '373296789429987', '4212', 'null'),
(22, 'Druens Disciple', '1593091060984442', '4223', 'null'),
(23, 'Vinforeningen', '', '4234', 'null'),
(24, 'Revyudvalget', '158100288103478', '4272', 'null'),
(25, 'Vandrelauget', '719201554935677', '4212', 'null'),
(26, 'Pejsekejserne', '550038448529601', '4217', 'null'),
(27, 'Madudvalget', '', '4155', 'null');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `udvalg`
--
ALTER TABLE `udvalg`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `udvalg`
--
ALTER TABLE `udvalg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

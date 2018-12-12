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
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `min_players` smallint(4) NOT NULL DEFAULT '9999',
  `max_players` smallint(4) NOT NULL DEFAULT '9999',
  `min_time` smallint(4) NOT NULL DEFAULT '9999',
  `max_time` smallint(4) NOT NULL DEFAULT '9999',
  `quantity` tinyint(4) NOT NULL DEFAULT '1',
  `teams` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `name`, `min_players`, `max_players`, `min_time`, `max_time`, `quantity`, `teams`) VALUES
(421, 'Kinaskak', 2, 6, 9999, 9999, 1, 0),
(422, 'Valgkamp - spillet uden ekstra tur', 9999, 9999, 9999, 9999, 1, 0),
(423, 'Mad - spillet for dårlige tabere', 9999, 9999, 9999, 9999, 1, 0),
(424, 'På rejse i alverdens viden', 2, 6, 9999, 9999, 1, 0),
(425, 'Axis & Allies', 2, 5, 180, 240, 2, 0),
(426, 'Sex and the City - Trivia Game', 2, 9999, 9999, 9999, 1, 0),
(427, 'Drinking Ludo', 2, 4, 9999, 9999, 1, 0),
(428, 'Backgammon (glas)', 2, 2, 9999, 9999, 1, 0),
(429, 'Master of Movies', 2, 6, 45, 9999, 1, 0),
(430, 'Stratego', 2, 2, 9999, 9999, 3, 0),
(431, 'TAKE IT XXL EASY', 1, 8, 45, 9999, 1, 0),
(432, 'QUIBBLER - Et fupspil med fakta', 3, 9999, 9999, 9999, 1, 0),
(433, '2 in 1 Board Games (Ludo og Skak)', 2, 2, 9999, 9999, 1, 0),
(434, 'Kalaha', 2, 2, 9999, 9999, 1, 0),
(435, 'SpilleMagasin - flere end 10 spilmuligheder', 9999, 9999, 9999, 9999, 1, 0),
(436, 'GALATHEA', 2, 6, 30, 45, 1, 0),
(437, 'KLOVNSPILLET', 2, 4, 9999, 9999, 1, 1),
(438, 'PLANKEN UD KNUD!', 2, 20, 9999, 9999, 1, 1),
(439, 'Trivial Pursuit DVD', 2, 24, 9999, 9999, 1, 0),
(440, 'Texas Hold\'em', 2, 6, 9999, 9999, 1, 0),
(441, 'Exploding kittens', 2, 5, 15, 9999, 1, 0),
(442, 'Sequence', 2, 12, 30, 9999, 1, 0),
(443, 'ROBO RALLY', 2, 8, 30, 9999, 1, 0),
(444, 'UNO', 2, 10, 10, 9999, 1, 0),
(445, 'PUKEMASTER', 2, 6, 9999, 9999, 1, 1),
(446, 'BLACKSTORIES', 2, 15, 15, 9999, 1, 0),
(447, 'Cranium', 4, 9999, 9999, 9999, 1, 1),
(448, 'Citadels', 2, 8, 20, 60, 1, 0),
(449, 'Frem med Elleveren', 9999, 9999, 9999, 9999, 1, 0),
(450, 'DiXit', 3, 12, 30, 9999, 1, 0),
(451, 'Hanabi', 2, 5, 30, 9999, 1, 0),
(452, 'MusiQwiz', 2, 8, 60, 9999, 1, 0),
(453, 'PANDEMIC', 2, 4, 45, 9999, 1, 0),
(454, 'Det Røde HINT', 4, 9999, 45, 9999, 1, 1),
(455, 'HINT', 4, 9999, 45, 9999, 1, 1),
(456, 'Compact curling', 2, 2, 9999, 9999, 1, 0),
(457, 'Kludderleg', 2, 4, 10, 9999, 2, 0),
(458, 'PARTNERS', 4, 4, 30, 45, 1, 0),
(459, 'King of New York', 2, 6, 40, 9999, 1, 0),
(460, 'Det Dårlige Selskab (med den grønne og blå udvidelse)', 3, 16, 30, 9999, 1, 0),
(461, 'Settlers fra Catan Europa', 3, 4, 60, 120, 1, 0),
(462, 'Seven Wonders', 2, 7, 30, 9999, 1, 0),
(463, 'Smallworld', 2, 5, 40, 80, 1, 0),
(464, 'QUIZ BATTLE', 2, 4, 9999, 9999, 1, 1),
(465, 'DANMARKSMESTER', 2, 4, 9999, 9999, 1, 1),
(466, 'Hey that\'s my fish', 2, 4, 20, 9999, 1, 0),
(467, 'MATADOR', 2, 6, 120, 240, 1, 0),
(468, 'RISK', 2, 6, 120, 240, 1, 0),
(469, 'Finans', 2, 6, 90, 180, 1, 0),
(470, 'Bezzerwizzer', 2, 4, 30, 60, 1, 1),
(471, 'Hvem vil være millionær junior (8 - 12 år)', 2, 5, 9999, 9999, 1, 1),
(472, 'Jeopardy', 3, 4, 20, 9999, 1, 1),
(473, 'Puerto Rico', 3, 5, 90, 150, 1, 0),
(474, 'Ludo, Mølle kvarn, Dam', 2, 4, 9999, 9999, 1, 0),
(475, 'Thurn and Taxis', 2, 4, 60, 9999, 1, 0),
(476, 'Carcassonne - New World', 2, 5, 45, 9999, 1, 0),
(477, 'KOLEJKA BOARDGAME', 2, 5, 60, 9999, 1, 0),
(478, 'LOGIK - for viderekomne', 3, 7, 9999, 9999, 1, 0),
(479, 'Trivial Pursuit - Genus-udgave (2005)', 2, 36, 9999, 9999, 1, 1),
(480, 'Rummy', 2, 4, 9999, 9999, 1, 0),
(481, 'MONTY PYTHON FLUX', 2, 6, 10, 40, 1, 0),
(482, 'COLORFOX', 2, 4, 10, 20, 1, 0),
(483, 'Dungeon Roll', 1, 4, 15, 30, 1, 0),
(484, 'Ticket to Ride - Europe', 2, 5, 30, 60, 1, 0),
(485, 'STICK UP', 2, 5, 10, 15, 1, 0),
(486, 'Scotland Yard', 2, 4, 9999, 9999, 1, 0),
(487, 'Catan - Card Game', 2, 2, 90, 9999, 1, 0),
(488, 'WESTERN POKER', 3, 5, 9999, 9999, 1, 0),
(489, 'Robber Knight', 2, 4, 30, 9999, 1, 0),
(490, 'Mascarade', 2, 13, 30, 9999, 1, 0),
(491, 'Alhambra', 2, 6, 45, 60, 1, 0),
(492, 'Game of Thrones - The Board Game', 3, 6, 120, 240, 1, 0),
(493, 'The Settlers', 3, 4, 75, 9999, 1, 0),
(494, 'AVALON', 5, 10, 30, 9999, 1, 0),
(495, 'Tegn og Gæt - exclusive', 4, 12, 9999, 9999, 1, 1),
(496, 'Trivial Pursuit - Milinium-udgave', 2, 36, 9999, 9999, 1, 1),
(497, 'Trivial Pursuit - 90\'erne', 2, 36, 9999, 9999, 1, 1),
(498, 'EGO - Pictures', 2, 6, 9999, 9999, 1, 0),
(499, 'Trivial Pursuit - Genus-udgave (1995)', 2, 36, 9999, 9999, 1, 1),
(500, 'Dilemma - Mads og Monopolet', 2, 6, 9999, 9999, 1, 0),
(501, 'EGO - Hvem er du?', 2, 6, 9999, 9999, 1, 0),
(502, 'Plingo', 4, 8, 9999, 9999, 1, 0),
(503, 'SPYFALL', 3, 8, 15, 9999, 1, 0),
(504, 'Sherif of Notthingham', 3, 9999, 9999, 9999, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=505;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

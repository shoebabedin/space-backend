-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2023 at 03:05 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_insapce`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `blog_Img` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `content`, `blog_Img`) VALUES
(12, 'Architecture 01', 'Duis non erat elementum, finibus lectus bibendum, tristique nunc. Fusce et nunc ac ex scelerisque ultrices. Vestibulum sed velit eu mauris tempus sodales. Cras eu mi nec magna mattis dapibus eget ac erat. Vestibulum finibus, turpis ac suscipit feugiat, quam sapien elementum risus, ac rhoncus sem augue id dui. Aliquam maximus laoreet sollicitudin. In commodo tellus tellus, at iaculis lectus varius at. Fusce lacinia ante et nisi pretium pellentesque. Donec accumsan at lectus sit amet blandit. Cras vitae congue dui, id efficitur sem. Integer gravida, massa id varius ornare, velit sapien hendrerit felis, vitae sollicitudin tellus tellus id odio. Sed vel nibh laoreet, viverra ipsum a, pretium nibh. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec erat metus. Vivamus in nisl tempor, blandit justo in, accumsan enim.', '[\"files-1688474084047.jpg\",\"files-1688474084049.jpg\"]');

-- --------------------------------------------------------

--
-- Table structure for table `careers`
--

CREATE TABLE `careers` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `vacancy` varchar(255) NOT NULL,
  `context` varchar(255) NOT NULL,
  `responsibilities` varchar(255) NOT NULL,
  `education` varchar(255) NOT NULL,
  `requirement` varchar(255) NOT NULL,
  `salary` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `careers`
--

INSERT INTO `careers` (`id`, `title`, `vacancy`, `context`, `responsibilities`, `education`, `requirement`, `salary`) VALUES
(1, 'Frontend Developer', '2', 'The packaging industry is growing very fast with its own specialized paper products, such as corrugated master cartons, inner boxes, stickers, paper tubes, etc. To maintain sustainable growth, we are looking for some young, dynamic, and energetic person.', 'Responsible for maintaining general ledger & registers related to finance and accounts. Maintaining company\'s financial transactions, posting in ledger. Work on stock inventory. Maintaining Customer & supplier payment and adjustment. Bank reconciliation s', 'Masters in Accounting from any reputed University.', 'Age 25 to 35 years Good communication, both verbal and written. Ability to work under pressure. Must have computer knowledge. Self-motivated and dynamic. Well conversant with MS Office& Accounting Software. Smooth in TALLY software operation.', 'Negotiable'),
(3, 'new', '2', 'sdfvsvsv', 'sdvsdv', 'sdvsdv', 'sdvsdv', 'sdvsdv');

-- --------------------------------------------------------

--
-- Table structure for table `home`
--

CREATE TABLE `home` (
  `id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `google_map` longtext NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home`
--

INSERT INTO `home` (`id`, `company_name`, `address`, `phone`, `email`, `google_map`, `image`) VALUES
(2, 'INSPACE Atelier | IN Construction Sphere', 'House# 14/B, Rashid Nibash, Lift 3, Road 68, Gulshan 02, Dhaka 1212', '8801713063282', 'inspaceatelier@gmail.com', 'https://goo.gl/maps/xm4BXZmWD6XDgLPV7', '[\"files-1688546293312.png\"]');

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`id`, `name`, `designation`, `image`) VALUES
(4, 'Dipa Roy', 'Dipa Roy', 'file-1688550622443.jpg'),
(5, 'Firoz Khan', 'Firoz Khan', 'file-1688550634414.jpg'),
(6, 'Mahmudur R Masum', 'Mahmudur R Masum', 'file-1688550648407.jpg'),
(7, 'MD Shihab H. Himel', 'MD Shihab H. Himel', 'file-1688550657472.jpg'),
(8, 'Nahidul Islam', 'Nahidul Islam', 'file-1688550667191.jpg'),
(9, 'Prof Haroon Ur Rashid', 'Prof Haroon Ur Rashid', 'file-1688550676497.jpg'),
(10, 'Reazul Islam', 'Reazul Islam', 'file-1688550690647.jpg'),
(11, 'Sabbir Ahamed', 'Sabbir Ahamed', 'file-1688550700615.jpg'),
(12, 'Sazzad Hossain', 'Sazzad Hossain', 'file-1688550709831.jpg'),
(13, 'Sheikh Mehedi Hassan', 'Sheikh Mehedi Hassan', 'file-1688550733382.jpg'),
(14, 'Solaiman Hossain', 'Solaiman Hossain', 'file-1688550751267.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `u_name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `u_name`, `image`) VALUES
(27, 'd1@gmail.com', '$2b$10$yz1OH1EIzpSs8HE3VOLmfezKjLn46Finiub8RiSwAo9uLwbqF0R2y', 'd1', 'file-1688466836157.jpg'),
(28, 'shoeb@gmail.com', '$2b$10$t.IFtHd/Zwbc1XcF6hMkCes41VM8JaG.x5FlldbA4AeX0eHeEI0Qa', 'shoeb', 'file-1688465760031.jpg'),
(29, 'shoebabedin12@gmail.com', '$2b$10$Ly169wKI2I01mnJTbyGN.OLPTPDlyJ9lyg1XcviZdKqPvjv5m8XCm', 'shoeb1', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `careers`
--
ALTER TABLE `careers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home`
--
ALTER TABLE `home`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `careers`
--
ALTER TABLE `careers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `home`
--
ALTER TABLE `home`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

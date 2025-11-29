-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: host.docker.internal:3309
-- Generation Time: Nov 29, 2025 at 04:34 PM
-- Server version: 9.5.0
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `holidays`
--

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`user_id`, `vacation_id`, `created_at`, `updated_at`) VALUES
('1063aea9-6c21-494f-b753-ad7ecb127d5a', 'd3bc02b8-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:19:24', '2025-11-29 16:19:24'),
('1063aea9-6c21-494f-b753-ad7ecb127d5a', 'd3bc040d-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:19:21', '2025-11-29 16:19:21'),
('1063aea9-6c21-494f-b753-ad7ecb127d5a', 'd3bc048e-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:19:23', '2025-11-29 16:19:23'),
('1063aea9-6c21-494f-b753-ad7ecb127d5a', 'd3bc04a6-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:19:23', '2025-11-29 16:19:23'),
('1063aea9-6c21-494f-b753-ad7ecb127d5a', 'd3bc04ff-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:19:29', '2025-11-29 16:19:29'),
('1063aea9-6c21-494f-b753-ad7ecb127d5a', 'd3bc052a-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:19:29', '2025-11-29 16:19:29'),
('20ac1e88-3669-4d71-a1c7-24d7bf10802f', 'd3bc040d-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:21:09', '2025-11-29 16:21:09'),
('20ac1e88-3669-4d71-a1c7-24d7bf10802f', 'd3bc04a6-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:15:26', '2025-11-29 16:15:26'),
('5c93af16-73f3-4936-adee-fa96dc55b784', 'd3bc04e6-bf28-11f0-b771-8ae0895f41e6', '2025-11-26 18:42:53', '2025-11-26 18:42:53'),
('60fa74d0-5f2a-421f-b3b3-b79e12258a03', 'd3bc02b8-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:20:55', '2025-11-29 16:20:55'),
('60fa74d0-5f2a-421f-b3b3-b79e12258a03', 'd3bc048e-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:20:57', '2025-11-29 16:20:57'),
('60fa74d0-5f2a-421f-b3b3-b79e12258a03', 'd3bc04ff-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:21:00', '2025-11-29 16:21:00'),
('60fa74d0-5f2a-421f-b3b3-b79e12258a03', 'd3bc052a-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:20:59', '2025-11-29 16:20:59'),
('a098c646-5b87-47a3-b1ed-ee3fec2f1fe6', 'd3bc02b8-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:20:41', '2025-11-29 16:20:41'),
('a098c646-5b87-47a3-b1ed-ee3fec2f1fe6', 'd3bc046c-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:20:31', '2025-11-29 16:20:31'),
('a098c646-5b87-47a3-b1ed-ee3fec2f1fe6', 'd3bc04a6-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:20:33', '2025-11-29 16:20:33'),
('a098c646-5b87-47a3-b1ed-ee3fec2f1fe6', 'd3bc04bc-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:20:35', '2025-11-29 16:20:35'),
('a098c646-5b87-47a3-b1ed-ee3fec2f1fe6', 'd3bc04e6-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:20:38', '2025-11-29 16:20:38'),
('a098c646-5b87-47a3-b1ed-ee3fec2f1fe6', 'd3bc04ff-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:20:37', '2025-11-29 16:20:37');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
('d3b77258-bf28-11f0-b771-8ae0895f41e6', 'user', '2025-11-11 18:04:12', '2025-11-11 18:04:12'),
('d3b77620-bf28-11f0-b771-8ae0895f41e6', 'admin', '2025-11-11 18:04:12', '2025-11-11 18:04:12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role_id`, `created_at`, `updated_at`) VALUES
('1063aea9-6c21-494f-b753-ad7ecb127d5a', 'test', 'testr', 'q@q.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'd3b77258-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:19:19', '2025-11-29 16:19:19'),
('20ac1e88-3669-4d71-a1c7-24d7bf10802f', 'Shahar ', 'Sol', 'test@test.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'd3b77258-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 13:40:49', '2025-11-29 13:40:49'),
('5c93af16-73f3-4936-adee-fa96dc55b784', 'admin', 'admiton', 'admin@admin.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'd3b77620-bf28-11f0-b771-8ae0895f41e6', '2025-11-22 19:43:52', '2025-11-22 19:43:52'),
('60fa74d0-5f2a-421f-b3b3-b79e12258a03', 'sd', 'sd', 'c@c.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'd3b77258-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:20:53', '2025-11-29 16:20:53'),
('a098c646-5b87-47a3-b1ed-ee3fec2f1fe6', 'ff', 'ff', 't@t.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'd3b77258-bf28-11f0-b771-8ae0895f41e6', '2025-11-29 16:20:28', '2025-11-29 16:20:28');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `destination` varchar(40) NOT NULL,
  `description` text NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `price` float NOT NULL,
  `file` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `start_date`, `end_date`, `price`, `file`, `created_at`, `updated_at`) VALUES
('a64d2f59-cd40-11f0-9127-5a3b0ed2a07f', 'Detroit, Michigan', 'Explore the Motor City! Visit historic sites, museums, and experience the revitalized downtown.', '2025-12-15 00:00:00', '2025-12-22 00:00:00', 1800, 'detroit.jpeg', '2025-11-29 16:30:00', '2025-11-29 16:30:00'),
('a64d386a-cd40-11f0-9127-5a3b0ed2a07f', 'Rafi\'s House', 'The ultimate staycation experience. Includes unlimited snacks and WiFi access.', '2025-12-10 00:00:00', '2025-12-12 00:00:00', 50, 'rafi-house.webp', '2025-11-29 16:30:00', '2025-11-29 16:30:00'),
('a64d38b3-cd40-11f0-9127-5a3b0ed2a07f', 'French Polynesia', 'Paradise awaits! Crystal clear waters, overwater bungalows, and stunning coral reefs.', '2026-01-05 00:00:00', '2026-01-15 00:00:00', 8500, 'french-poly.webp', '2025-11-29 16:30:00', '2025-11-29 16:30:00'),
('a64d3942-cd40-11f0-9127-5a3b0ed2a07f', 'Lod, Israel', 'Discover the ancient city with its rich history, markets, and cultural heritage.', '2025-12-08 00:00:00', '2025-12-11 00:00:00', 450, 'kadurim.jpg', '2025-11-29 16:30:00', '2025-11-29 16:30:00'),
('d3bc02b8-bf28-11f0-b771-8ae0895f41e6', 'Pyongyang, North Korea', 'Experience the secretive capital.', '2025-12-01 00:00:00', '2025-12-07 00:00:00', 3000, 'pyaongyang.jpeg', '2025-11-11 18:04:12', '2025-11-26 18:42:48'),
('d3bc040d-bf28-11f0-b771-8ae0895f41e6', 'Chernobyl, Ukraine', 'Tour the abandoned city.', '2025-11-05 00:00:00', '2025-11-10 00:00:00', 2000, 'chernobyl.webp', '2025-11-11 18:04:12', '2025-11-11 18:04:12'),
('d3bc046c-bf28-11f0-b771-8ae0895f41e6', 'Western Sahara, Morocco', 'Bring sunscreen!', '2025-10-10 00:00:00', '2025-10-15 00:00:00', 2500, 'sahara.jpeg', '2025-11-11 18:04:12', '2025-11-11 18:04:12'),
('d3bc048e-bf28-11f0-b771-8ae0895f41e6', 'Snake island, Brazil', 'Home to deadly snakes.', '2025-09-01 00:00:00', '2025-09-07 00:00:00', 4000, 'snake-island.jpeg', '2025-11-11 18:04:12', '2025-11-29 13:34:02'),
('d3bc04a6-bf28-11f0-b771-8ae0895f41e6', 'Death Valley, USA', 'Extreme desert temperatures.', '2025-07-01 00:00:00', '2025-07-05 00:00:00', 1500, 'death-valley.jpg', '2025-11-11 18:04:12', '2025-11-11 18:04:12'),
('d3bc04bc-bf28-11f0-b771-8ae0895f41e6', 'uMgungundlovu, South Africa', 'Yes, that place exists!', '2025-06-10 00:00:00', '2025-06-15 00:00:00', 2200, 'uMgungundlovu.jpg', '2025-11-11 18:04:12', '2025-11-11 18:04:12'),
('d3bc04e6-bf28-11f0-b771-8ae0895f41e6', 'Vostok Station, Antratica', 'Extremely cold scientific base.', '2025-04-01 00:00:00', '2025-04-10 00:00:00', 6000, 'Vostok_Station_2024.png', '2025-11-11 18:04:12', '2025-11-26 12:25:37'),
('d3bc04ff-bf28-11f0-b771-8ae0895f41e6', 'Space, Space', 'Literally go to space. No refunds.', '2025-03-10 00:00:00', '2025-03-15 00:00:00', 2800, 'space.jpg', '2025-11-11 18:04:12', '2025-11-11 18:04:12'),
('d3bc052a-bf28-11f0-b771-8ae0895f41e6', 'Kiryat Gat, Israel', 'The infamous city.', '2025-01-15 00:00:00', '2025-01-20 00:00:00', 2000, 'kirayt-gat.jpg', '2025-11-11 18:04:12', '2025-11-11 18:04:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`user_id`,`vacation_id`),
  ADD UNIQUE KEY `likes_vacationId_userId_unique` (`user_id`,`vacation_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

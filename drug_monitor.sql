-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2025 at 06:26 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `drug_monitor`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$10$QQFesEqwebTydzP2nfNyTevvdRJvbb60q23t3COo/Mvu46Jx6zvt2', '2025-05-22 08:54:32', '2025-05-22 08:54:32');

-- --------------------------------------------------------

--
-- Table structure for table `anonymous_reports`
--

CREATE TABLE `anonymous_reports` (
  `report_id` int(11) NOT NULL,
  `report_uuid` varchar(36) NOT NULL,
  `report_type` varchar(50) NOT NULL,
  `district` varchar(100) NOT NULL,
  `location` text DEFAULT NULL,
  `description` text NOT NULL,
  `incident_date` date DEFAULT NULL,
  `incident_time` time DEFAULT NULL,
  `involved_persons_description` text DEFAULT NULL,
  `additional_info` text DEFAULT NULL,
  `contact_info_encrypted` varbinary(255) DEFAULT NULL,
  `report_status` varchar(50) DEFAULT 'New',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `anonymous_reports`
--

INSERT INTO `anonymous_reports` (`report_id`, `report_uuid`, `report_type`, `district`, `location`, `description`, `incident_date`, `incident_time`, `involved_persons_description`, `additional_info`, `contact_info_encrypted`, `report_status`, `created_at`, `updated_at`) VALUES
(2, '8b9be8d8-d4af-468b-a02f-23bc0eb3bd81', 'drugSale', 'kollam', 'puthuvype', 'adawd', '2025-06-17', '02:15:00', 'adadsd', 'sadadsasda', NULL, 'Resolved', '2025-06-16 20:45:02', '2025-06-19 20:52:33');

-- --------------------------------------------------------

--
-- Table structure for table `counselors`
--

CREATE TABLE `counselors` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `qualifications` text DEFAULT NULL,
  `experience_years` int(11) DEFAULT NULL,
  `certifications` text DEFAULT NULL,
  `resume_url` varchar(255) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `counselors`
--

INSERT INTO `counselors` (`id`, `user_id`, `qualifications`, `experience_years`, `certifications`, `resume_url`, `status`, `created_at`) VALUES
(1, 2, 'dfgdf', 2, 'sdfsf', 'uploads\\resumes\\b7240694e13bae71ae563902ce6aa381', 'pending', '2025-06-19 21:57:03'),
(2, 6, 'ba', 3, 'ffhf', 'uploads\\resumes\\1bc211cbc035b71610e89af001c257c1', 'pending', '2025-06-22 13:45:03');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('victim','counselor','ngo') DEFAULT 'victim',
  `status` enum('active','inactive','blocked') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `status`, `created_at`) VALUES
(1, 'ayyappan', 'anuroopca300@gmail.com', '$2b$10$QP1ik/M6SNCGEUPmDLBznO9OpIqOji8czXzmpVDNpxCX.fVtcaOti', 'victim', 'active', '2025-05-19 10:22:41'),
(2, 'varun', 'varun@gmail.com', '$2b$10$eZdOgci6iZw0VNa/CI7M/e0/4vlnybUTU9zYe4k6OUbVvdo8yk9cm', 'counselor', 'active', '2025-05-20 13:14:24'),
(3, 'chance', 'chance@gmail.com', '$2b$10$F2E3wMOvwzoU6kdC/1KrH.Nw1cEj.KjtaSvdzrCycEjzNeqUuqUqe', 'ngo', 'active', '2025-05-20 20:16:15'),
(5, 'tharun', 'tharun@gmail.com', '$2b$10$ANSHq0Gh7LgcKwneehvK7OgXjzvF6VjFOcI4kbJYAFEEpdZw/YOfm', 'counselor', 'active', '2025-06-18 10:50:09'),
(6, 'flemin', 'flemin@gmail.com', '$2b$10$0lWKzlhQmeI1AZCpcFz9te8s3.9VxH.h9KWBPtVlWmmJuRd/7MduG', 'counselor', 'active', '2025-06-22 13:43:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `anonymous_reports`
--
ALTER TABLE `anonymous_reports`
  ADD PRIMARY KEY (`report_id`),
  ADD UNIQUE KEY `report_uuid` (`report_uuid`);

--
-- Indexes for table `counselors`
--
ALTER TABLE `counselors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_counselors_user` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `anonymous_reports`
--
ALTER TABLE `anonymous_reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `counselors`
--
ALTER TABLE `counselors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `counselors`
--
ALTER TABLE `counselors`
  ADD CONSTRAINT `counselors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_counselors_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 07, 2023 at 10:32 AM
-- Server version: 10.11.4-MariaDB-1
-- PHP Version: 8.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `safedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES
(1, 'safe', '1234', 'safety@gmail.com'),
(2, 'admin', '1234', 'admin@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `administer`
--

CREATE TABLE `administer` (
  `id` varchar(32) NOT NULL,
  `username` varchar(32) DEFAULT NULL,
  `email` varchar(345) DEFAULT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `administer`
--

INSERT INTO `administer` (`id`, `username`, `email`, `password`) VALUES
('fa82be46e9cb42a6988e59ba7acd75a1', 'admin', 'admin@gmail.com', '$2b$12$58SOQO09imq0eqJWf95Kde7OzwYnPyb1Tcv4gyfrNEACx..syAPNy');

-- --------------------------------------------------------

--
-- Table structure for table `alembic_version`
--

CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback_table`
--

CREATE TABLE `feedback_table` (
  `id` int(11) NOT NULL,
  `feedback` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `liked` tinyint(1) DEFAULT NULL,
  `disliked` tinyint(1) DEFAULT NULL,
  `incorrect` tinyint(1) DEFAULT NULL,
  `dontUnderstand` tinyint(1) DEFAULT NULL,
  `unclear` tinyint(1) DEFAULT NULL,
  `feedback_que` varchar(255) DEFAULT NULL,
  `feedback_ans` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback_table`
--

INSERT INTO `feedback_table` (`id`, `feedback`, `date`, `liked`, `disliked`, `incorrect`, `dontUnderstand`, `unclear`, `feedback_que`, `feedback_ans`) VALUES
(1, 'Its not very well', '2023-05-14 22:13:38', 0, 1, 1, 1, 0, NULL, NULL),
(2, 'hdse', '2023-05-14 22:17:07', 0, 1, 1, 1, 0, NULL, NULL),
(3, 'null', '2023-05-14 22:21:14', 0, 1, 0, 0, 0, NULL, NULL),
(4, 'null', '2023-05-14 22:21:19', 1, 0, 0, 0, 0, NULL, NULL),
(7, 'this is useless', '2023-05-19 20:27:21', 0, 1, 0, 0, 0, NULL, NULL),
(8, 'what is wrong with you', '2023-05-20 15:44:16', 0, 1, 0, 0, 1, NULL, NULL),
(9, 'null', '2023-05-22 07:31:49', 1, 0, 1, 0, 0, NULL, NULL),
(10, 'null', '2023-05-23 07:28:25', 0, 1, 1, 0, 0, NULL, NULL),
(11, 'null', '2023-06-25 18:30:51', 1, 0, 1, 0, 0, NULL, NULL),
(12, 'null', '2023-06-25 18:43:50', 0, 1, 0, 1, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `unanswered_que`
--

CREATE TABLE `unanswered_que` (
  `id` int(11) NOT NULL,
  `unanswered_que` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `unanswered_que`
--

INSERT INTO `unanswered_que` (`id`, `unanswered_que`, `date`, `status`) VALUES
(1, 'can you tell me about jimma institute of technology', '2023-05-17 21:29:51', 'answered'),
(2, 'can you mention some department at jimma university ', '2023-05-17 21:30:31', 'unanswered'),
(3, 'ttp', '2023-05-17 22:50:36', 'answered'),
(4, 'dttp', '2023-05-17 22:51:06', 'unanswered'),
(5, 'dttp', '2023-05-17 22:51:06', 'unanswered'),
(6, 'pharmaceutical industry', '2023-05-17 22:57:13', 'unanswered'),
(7, 'pharmaceutical industry?', '2023-05-17 22:57:29', 'unanswered'),
(8, 'cptp', '2023-05-17 22:57:41', 'unanswered'),
(9, 'health', '2023-05-17 22:59:00', 'unanswered'),
(10, 'cde', '2023-05-17 22:59:40', 'unanswered'),
(11, 'cde', '2023-05-17 22:59:40', 'unanswered'),
(12, 'hey', '2023-05-18 17:26:32', 'unanswered'),
(13, 'hi', '2023-05-18 21:16:47', 'unanswered'),
(14, 'location', '2023-05-18 21:17:11', 'unanswered'),
(15, 'news', '2023-05-18 21:17:26', 'answered'),
(16, 'can u tell president of jimma university', '2023-05-19 21:54:02', 'unanswered'),
(17, 'can tell president of jimma university', '2023-05-19 21:54:20', 'unanswered'),
(18, 'can tell president of jimma university', '2023-05-19 21:54:20', 'unanswered'),
(19, 'how you can predict events', '2023-05-20 18:40:53', 'unanswered'),
(20, 'how you can predict events', '2023-05-20 18:40:53', 'unanswered'),
(21, 'jit', '2023-05-22 08:30:14', 'unanswered'),
(22, 'ju', '2023-05-22 10:49:33', 'unanswered'),
(23, 'lknadsf', '2023-05-23 13:59:40', 'unanswered'),
(24, 'lknadsf', '2023-05-23 13:59:40', 'unanswered'),
(25, 'updates', '2023-05-23 15:09:15', 'unanswered'),
(26, 'events', '2023-05-23 15:09:23', 'unanswered'),
(27, '', '2023-05-23 16:21:03', 'unanswered'),
(28, 'gjgkjhkhkkhjkhjkjh', '2023-05-23 16:23:40', 'unanswered'),
(29, 'what is cntp', '2023-06-25 21:36:22', 'unanswered'),
(30, 'what cptp ', '2023-06-25 21:54:48', 'unanswered'),
(31, 'akkam', '2023-06-25 22:52:52', 'unanswered'),
(32, 'mummeen', '2023-06-25 22:53:57', 'unanswered'),
(33, 'why are u generating wrong response', '2023-06-25 22:54:18', 'unanswered'),
(34, 'what else do u need', '2023-06-25 22:54:37', 'unanswered'),
(35, 'what the hell is that are u talking about', '2023-06-25 22:55:00', 'unanswered'),
(36, 'hell', '2023-06-25 22:55:06', 'unanswered'),
(37, 'how are u', '2023-08-07 10:37:10', 'unanswered'),
(38, 'how are u', '2023-08-07 10:37:10', 'unanswered'),
(39, 'Can you tell me about current population number', '2023-08-07 11:13:21', 'unanswered'),
(40, 'jhasdlfsa', '2023-08-07 11:13:35', 'unanswered'),
(41, 'can you tell about NLP', '2023-08-07 11:14:41', 'unanswered'),
(42, 'can you tell about NLP', '2023-08-07 11:14:41', 'unanswered');

-- --------------------------------------------------------

--
-- Table structure for table `updates`
--

CREATE TABLE `updates` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `solved` varchar(10) NOT NULL,
  `dates` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `updates`
--

INSERT INTO `updates` (`id`, `type`, `name`, `description`, `solved`, `dates`) VALUES
(5, 'Broken Class', 'Broken News', 'no', 'false', '2023-05-23 16:22:33'),
(13, 'Training', 'intentsv47.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 16:03:57'),
(14, 'Training', 'intentsv48.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 16:10:00'),
(15, 'Training', 'intentsv49.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 16:10:45'),
(16, 'Training', 'intentsv50.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 22:21:51'),
(17, 'Training', 'intentsv51.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 22:26:27'),
(18, 'Training', 'intentsv52.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 22:40:54'),
(19, 'Training', 'intentsv53.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 22:41:12'),
(20, 'Training', 'intentsv54.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-19 11:33:16'),
(21, 'Training', 'intentsv55.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-19 21:50:56'),
(22, 'Training', 'intentsv58.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'false', '2023-05-19 21:51:15'),
(36, 'Broken Class', 'Broken Events', 'no', 'false', '2023-05-23 15:12:38'),
(49, 'Server Down', 'Server Events', 'JU Server is not working, User is unable to access updated Events Please Check !!', 'false', '2023-08-07 11:14:41'),
(50, 'Server Down', 'Server News', 'JU Server is not working, User is unable to access updated news Please Check !!', 'false', '2023-08-07 11:14:41');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(1000) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(500) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `token`, `reset_token`, `reset_token_expiry`) VALUES
('457716a5-1385-4830-972f-b0b49c24767c', 'name12', 'safuwanfeiysa@gmail.com', '$2a$10$05Dw1JFGPjUHguBmgYmxZ.aZcqg.QlCZvLamZkvJ7rjGQMSmJj/yu', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDU3NzE2YTUtMTM4NS00ODMwLTk3MmYtYjBiNDljMjQ3NjdjIiwiZW1haWwiOiJzYWZ1d2FuZmVpeXNhQGdtYWlsLmNvbSIsImlhdCI6MTY5MTM5NjQzNSwiZXhwIjo5MDA3MjAwOTQ2MTM3NDI2fQ.wAiVZmR3ltQtgwUPj0-H5EoRF7Yf3B4RklQW-8e9hhs', '9a8c36baf18414200425a0412fa73a9f88952092', '2023-08-07 08:20:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `administer`
--
ALTER TABLE `administer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `alembic_version`
--
ALTER TABLE `alembic_version`
  ADD PRIMARY KEY (`version_num`);

--
-- Indexes for table `feedback_table`
--
ALTER TABLE `feedback_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unanswered_que`
--
ALTER TABLE `unanswered_que`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `updates`
--
ALTER TABLE `updates`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `feedback_table`
--
ALTER TABLE `feedback_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `unanswered_que`
--
ALTER TABLE `unanswered_que`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `updates`
--
ALTER TABLE `updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

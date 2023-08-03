-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 19, 2023 at 09:27 PM
-- Server version: 10.6.11-MariaDB-1
-- PHP Version: 8.1.12

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
  `unclear` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback_table`
--

INSERT INTO `feedback_table` (`id`, `feedback`, `date`, `liked`, `disliked`, `incorrect`, `dontUnderstand`, `unclear`) VALUES
(1, 'Its not very well', '2023-05-14 22:13:38', 0, 1, 1, 1, 0),
(2, 'hdse', '2023-05-14 22:17:07', 0, 1, 1, 1, 0),
(3, 'null', '2023-05-14 22:21:14', 0, 1, 0, 0, 0),
(4, 'null', '2023-05-14 22:21:19', 1, 0, 0, 0, 0);

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
(15, 'news', '2023-05-18 21:17:26', 'unanswered');

-- --------------------------------------------------------

--
-- Table structure for table `updates`
--

CREATE TABLE `updates` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `solved` varchar(10) NOT NULL,
  `dates` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `updates`
--

INSERT INTO `updates` (`id`, `type`, `name`, `description`, `solved`, `dates`) VALUES
(1, 'Training', 'intentsv37.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'false', '2023-05-17 22:43:37'),
(2, 'Training', 'intentsv38.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'false', '2023-05-18 09:18:27'),
(3, 'Training', 'intentsv39.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'false', '2023-05-18 09:18:48'),
(4, 'Server Down', 'Server', 'Server Unavailable: JU server is down. Users unable to access updated information.', 'false', '2023-05-18 09:18:48'),
(5, 'Broken Class', 'Broken', 'Users unable to access updated information, due to Class, Tag are Changed or removed from JU Official website Please Check', 'false', '2023-05-18 09:18:48'),
(6, 'Training', 'intentsv40.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'false', '2023-05-18 09:59:35'),
(7, 'Training', 'intentsv41.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'false', '2023-05-18 14:49:06'),
(8, 'Training', 'intentsv42.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'false', '2023-05-18 15:56:59'),
(9, 'Training', 'intentsv43.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 16:00:02'),
(10, 'Training', 'intentsv44.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 16:00:19'),
(11, 'Training', 'intentsv45.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 16:00:35'),
(12, 'Training', 'intentsv46.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 16:02:27'),
(13, 'Training', 'intentsv47.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 16:03:57'),
(14, 'Training', 'intentsv48.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 16:10:00'),
(15, 'Training', 'intentsv49.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 16:10:45'),
(16, 'Training', 'intentsv50.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 22:21:51'),
(17, 'Training', 'intentsv51.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 22:26:27'),
(18, 'Training', 'intentsv52.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 22:40:54'),
(19, 'Training', 'intentsv53.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'true', '2023-05-18 22:41:12'),
(20, 'Training', 'intentsv54.json', 'There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.', 'false', '2023-05-19 11:33:16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `token`) VALUES
('1c472c12-6ad0-4f3e-a8d4-4fc8d71b3729', 'admin', 'admin123@gmail.com', '$2a$10$yr1yFVKggZkZY0REqnOZG.MGbGySt2gz/Y1d6Q4dDCUuLzGkNVKKO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWM0NzJjMTItNmFkMC00ZjNlLWE4ZDQtNGZjOGQ3MWIzNzI5IiwiZW1haWwiOiJhZG1pbjEyM0BnbWFpbC5jb20iLCJpYXQiOjE2ODQzNDgyNzcsImV4cCI6OTAwNzIwMDkzOTA4OTI2OH0.H4wN1oASzInn5g-srFxv2I4ceQsWHJgXdqbu8Bf3Y6Q'),
('2ff21637-8737-40ac-9bec-a73e9c575e75', 'name12', 'name12@gmail.com', '$2a$10$VQ/JyNbUzZMQzC68GKQqieWuEtCiy9ARKbZPkFKLu9wuwVQhyFfXq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMmZmMjE2MzctODczNy00MGFjLTliZWMtYTczZTljNTc1ZTc1IiwiZW1haWwiOiJuYW1lMTJAZ21haWwuY29tIiwiaWF0IjoxNjgzODA5NTUyLCJleHAiOjkwMDcyMDA5Mzg1NTA1NDR9.cZ8bXm0M13czg8jfK0kyogd8O72HEL-O4McwavQvVLU'),
('e359e294-06c5-44b0-b9be-077b2a4c74ef', 'name3', 'name3@gmail.com', '$2a$10$QEE5F3daqkkqzrkma8ygrO0psurs4g.Ciu6P9uv448.Z2LXYVQJcm', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTM1OWUyOTQtMDZjNS00NGIwLWI5YmUtMDc3YjJhNGM3NGVmIiwiZW1haWwiOiJuYW1lM0BnbWFpbC5jb20iLCJpYXQiOjE2ODIyNjA5NzQsImV4cCI6MTY4MjI3ODk3NH0.vn0_y0eP8vf7FQ-zivEBPSqNQ0UtTBXuPE93aBJKNZQ'),
('8e451ee0-0b61-4c80-a4c8-a5de2e596b17', 'yter', 'yterj@gmail.com', '$2a$10$S9XgeTz9rd3LEIvlv3lizOcka35p7i/nmpqZCzXWDRAGopyx8NqBC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOGU0NTFlZTAtMGI2MS00YzgwLWE0YzgtYTVkZTJlNTk2YjE3IiwiZW1haWwiOiJ5dGVyakBnbWFpbC5jb20iLCJpYXQiOjE2ODIyNjE2NzcsImV4cCI6MTY4MjI3OTY3N30.VpiXRVV6h4vKvrDyV7i1q2fk4bQMiJaY5YAYjYAMjaw'),
('8e3085f9-2d48-4b4b-ad7d-35f510f4bc23', 'name4', 'name4@gmail.com', '$2a$10$vFttxq4iQQjROZ/8D7Czuecqvydn1n8lRiWc3wetNysgkPmsq2dlS', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOGUzMDg1ZjktMmQ0OC00YjRiLWFkN2QtMzVmNTEwZjRiYzIzIiwiZW1haWwiOiJuYW1lNEBnbWFpbC5jb20iLCJpYXQiOjE2ODIyNzc2MTEsImV4cCI6MTY4MjI5NTYxMX0.RlpuJpqizz-__Ibc_yD0AFhj6xegkvIXDojiY0ebdZM'),
('f9db5235-124d-4cb8-88a2-c5deb30519f9', 'name5', 'name5@gmail.com', '$2a$10$aAMMOffnW8ZVNjoY9ggm7.ui3iBldMp3RZJqcx3HWdj9HziCwQhEa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjlkYjUyMzUtMTI0ZC00Y2I4LTg4YTItYzVkZWIzMDUxOWY5IiwiZW1haWwiOiJuYW1lNUBnbWFpbC5jb20iLCJpYXQiOjE2ODIyODI3MTIsImV4cCI6MTY4MjMwMDcxMn0.s4MNpzj2fpM0GF_ZKfG4kWRoSqLRV615tAOtc7cSsNk'),
('560ed358-af1b-45b6-afaf-4ada82c37143', 'name6', 'name6@gmail.com', '$2a$10$qPuBlae.2aSb6OdvExGQr.Z2BROJPQ4cuq1r2NoL/Nxmw.HSkvmpS', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTYwZWQzNTgtYWYxYi00NWI2LWFmYWYtNGFkYTgyYzM3MTQzIiwiZW1haWwiOiJuYW1lNkBnbWFpbC5jb20iLCJpYXQiOjE2ODIyODI4NjksImV4cCI6MTY4MjMwMDg2OX0.r9nRJYZP28k60nJ3PDlsK8mCps1AFF0WtmMDE_UF_KQ'),
('4de11e50-52b7-4c59-b9e2-d7991356382c', 'name7', 'name7@gmail.com', '$2a$10$ed/e1oQgK9hpCpYP0knZ..aAuvJaNRPWLnD.yGBq2ebee.yt390tW', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNGRlMTFlNTAtNTJiNy00YzU5LWI5ZTItZDc5OTEzNTYzODJjIiwiZW1haWwiOiJuYW1lN0BnbWFpbC5jb20iLCJpYXQiOjE2ODIyODMwMjgsImV4cCI6MTY4MjMwMTAyOH0.IQaXAQK3qsO51XdvVbBvrJSGvzCA0MM4lzNoFjiJMZ8'),
('a961650d-0d8f-408f-bc8c-b7af6733d52b', 'name8', 'name8@gmail.com', '$2a$10$zabXIMARvB2ptrp37Jv8muaWHidiQz2zax24hbsmX1I4CFbQ4MtKm', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYTk2MTY1MGQtMGQ4Zi00MDhmLWJjOGMtYjdhZjY3MzNkNTJiIiwiZW1haWwiOiJuYW1lOEBnbWFpbC5jb20iLCJpYXQiOjE2ODIyODMwODksImV4cCI6MTY4MjMwMTA4OX0.jbLTGzcann3cWNMT8osOABhtd_nwmbO69V8AvU8pj6c'),
('e2e27a1e-d6f3-4ca0-abcb-84df0fa752cf', 'name9', 'name9@gmail.com', '$2a$10$s9nZ0kGpYUaAdF619e41ceTbVqVf8dXrMtI85F.KuNNN6RJoyDl4C', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTJlMjdhMWUtZDZmMy00Y2EwLWFiY2ItODRkZjBmYTc1MmNmIiwiZW1haWwiOiJuYW1lOUBnbWFpbC5jb20iLCJpYXQiOjE2ODIyODMzNDQsImV4cCI6MTY4MjMwMTM0NH0.lhY5b7TTPK-_zxzSJabCE0MsdjzrwPH52yLaEYV8LEM'),
('4f7b2b04-31ad-4a14-a05c-975428362964', 'name10', 'name10@gmail.com', '$2a$10$yh1uaHHPtJ2QKVdTCjTr1Oqh91e59Zyw.HKastOKNbraqqPBB6wSi', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNGY3YjJiMDQtMzFhZC00YTE0LWEwNWMtOTc1NDI4MzYyOTY0IiwiZW1haWwiOiJuYW1lMTBAZ21haWwuY29tIiwiaWF0IjoxNjgyMjgzNTg1LCJleHAiOjE2ODIzMDE1ODV9.4rvEUnEUaHiHXg88QsTydFyCzXe9GsC9Bi4-z1HJAKg'),
('7707e2f4-7a96-4bfe-9c87-5636ca30ac69', 'name11', 'name11@gmail.com', '$2a$10$Z.KixSABXg/9LdlVk9CfkeO7tQ5Igf2xyzvFBN.ysYDijadX/lCZ6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzcwN2UyZjQtN2E5Ni00YmZlLTljODctNTYzNmNhMzBhYzY5IiwiZW1haWwiOiJuYW1lMTFAZ21haWwuY29tIiwiaWF0IjoxNjgyMjgzNjA1LCJleHAiOjE2ODIzMDE2MDV9.5gg6f4U2uI27SuAYgM9E4V4VIpvbWgZCRIc3wkWjVj4'),
('c726940c-5a5e-4bd8-959d-d8ec017d1f81', 'name13', 'name13@gmail.com', '$2a$10$cTJ04H7SYHGj.nCgYDSAse2Q6FgqSdYUHwuSUfm24i2QBHVHHz6lW', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzcyNjk0MGMtNWE1ZS00YmQ4LTk1OWQtZDhlYzAxN2QxZjgxIiwiZW1haWwiOiJuYW1lMTNAZ21haWwuY29tIiwiaWF0IjoxNjgyMjgzNjc4LCJleHAiOjE2ODIzMDE2Nzh9.gPk0AL27z2D2frdI4sWRvlXeHr3RtBqd6lAwGK9Jcmw'),
('c971bc8c-9855-44bf-a6f8-40b27a634dc3', 'name14', 'name14@gmail.com', '$2a$10$dvIWJs6Y/vFtuyNofJS.KuCau6VI.Jz9XcfcH.86VyYPsUHfghsou', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzk3MWJjOGMtOTg1NS00NGJmLWE2ZjgtNDBiMjdhNjM0ZGMzIiwiZW1haWwiOiJuYW1lMTRAZ21haWwuY29tIiwiaWF0IjoxNjgyMjgzOTI3LCJleHAiOjkwMDcyMDA5MzcwMjQ5MTh9.i9jBRTYzhShpKSsh1BbRi6uZDun5xUwd48C7DQ9NEZ0'),
('64f4d6a9-188d-411a-a9ef-8dd2fb5bb9e4', 'name15', 'name15@gmail.com', '$2a$10$cw/yx66KGMIzxTC5NMc.c.IwGMQBz1.cPmgeZtms5PKP3qqQd4Dc2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRmNGQ2YTktMTg4ZC00MTFhLWE5ZWYtOGRkMmZiNWJiOWU0IiwiZW1haWwiOiJuYW1lMTVAZ21haWwuY29tIiwiaWF0IjoxNjgyMjg0NTUzLCJleHAiOjE2ODIzMDI1NTN9.moP5iVObmLNP8m6mBTPhK9Bs4kSxEKRjMjdfTAxQ1JE'),
('d466126f-5eea-4411-9da9-570d0b248312', 'name16', 'name16@gmail.com', '$2a$10$ciJY309FC2lr2UmSUOQeDOfS3Xuc712rmkx1wZ6hBC5xNTB2PcGfa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZDQ2NjEyNmYtNWVlYS00NDExLTlkYTktNTcwZDBiMjQ4MzEyIiwiZW1haWwiOiJuYW1lMTZAZ21haWwuY29tIiwiaWF0IjoxNjgyMjg0NjM1LCJleHAiOjE2ODIzMDI2MzV9.JxFwqTUPIPv507VVg9PrpOODy8CinBCrtXqqiGVLdIs'),
('200399a4-0e40-454e-880b-fe721c81b16a', 'name17', 'name17@gmail.com', '$2a$10$dM5UKcnh4gcm6WKGrXFyceEaDAw5hC5xyqa6TeRb/uzSZd7XLhdsG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjAwMzk5YTQtMGU0MC00NTRlLTg4MGItZmU3MjFjODFiMTZhIiwiZW1haWwiOiJuYW1lMTdAZ21haWwuY29tIiwiaWF0IjoxNjgyMjg0NzU0LCJleHAiOjE2ODIzMDI3NTR9.THdQx8QnKIBjK1MT-7I6k-XYl5N9s39uT900iSkez-A'),
('dbfa8915-e309-4be1-9768-e8b803344d7c', 'name18', 'name18@gmail.com', '$2a$10$Bie50hVW8y1lgdBd8K0IYOhaK7pbgsWQf0EcoyKYQOF9ZYTDUhph6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGJmYTg5MTUtZTMwOS00YmUxLTk3NjgtZThiODAzMzQ0ZDdjIiwiZW1haWwiOiJuYW1lMThAZ21haWwuY29tIiwiaWF0IjoxNjgyMjg0ODEzLCJleHAiOjE2ODIzMDI4MTN9.CPWJUdsgh8UEWb8Po4ZdBZaBdXA4cPjIl7oPrTuVWQw'),
('cdf1373b-4647-4252-934e-b2d12d775b1e', 'name19', 'name19@gmail.com', '$2a$10$TFoCvq6ZOFKaW/vaaNM84e.rUmXKyLKaVO4P22RS.bqGad4yKLzzm', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2RmMTM3M2ItNDY0Ny00MjUyLTkzNGUtYjJkMTJkNzc1YjFlIiwiZW1haWwiOiJuYW1lMTlAZ21haWwuY29tIiwiaWF0IjoxNjgyMjg0OTE2LCJleHAiOjE2ODIzMDI5MTZ9.kBCw61Xwz0hO5-4026NfH4TrUB6R8TkqqaHEGu7Ctv8'),
('695ff6fa-d5b8-4557-b931-fa765b06a946', 'name20', 'name20@gmail.com', '$2a$10$YDlxk3X5PestIqvRgawZEeZK9jZtM1tMAKgSzsGad2vjH/2SkDAJq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjk1ZmY2ZmEtZDViOC00NTU3LWI5MzEtZmE3NjViMDZhOTQ2IiwiZW1haWwiOiJuYW1lMjBAZ21haWwuY29tIiwiaWF0IjoxNjgyMjg3MTIxLCJleHAiOjE2ODIzMDUxMjF9.HT1jOgm3Cd1VAj5NN_Q73VM2z3OirN-hhCG_o4dKMeY'),
('37237b2b-97a1-48c5-971e-231b28664f62', 'name22', 'name22@gmail.com', '$2a$10$wPxWr8xqR0D5Cc8J8WvG6OnFvbIJH1A79IyCdMGKHUzjZMF4VNHTG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzcyMzdiMmItOTdhMS00OGM1LTk3MWUtMjMxYjI4NjY0ZjYyIiwiZW1haWwiOiJuYW1lMjJAZ21haWwuY29tIiwiaWF0IjoxNjgyMjg5Mjg4LCJleHAiOjE2ODIzMDcyODh9.tf7G0e4Fp2_g_DjMGm_rb3P9JzmgKOOurw1tAPyJUDk');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `unanswered_que`
--
ALTER TABLE `unanswered_que`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `updates`
--
ALTER TABLE `updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

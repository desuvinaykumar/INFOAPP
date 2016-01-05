-- phpMyAdmin SQL Dump
-- version 4.0.10.10
-- http://www.phpmyadmin.net
--
-- Host: 127.10.239.2:3306
-- Generation Time: Jan 05, 2016 at 11:58 AM
-- Server version: 5.5.45
-- PHP Version: 5.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `jantakhabar`
--

-- --------------------------------------------------------

--
-- Table structure for table `ta_category`
--

CREATE TABLE IF NOT EXISTS `ta_category` (
  `ta_category_id` int(3) NOT NULL,
  `ta_category_desc` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ta_category`
--

INSERT INTO `ta_category` (`ta_category_id`, `ta_category_desc`) VALUES
(1, 'Travel'),
(2, 'Recharge'),
(3, 'Shopping'),
(4, 'Traffic'),
(999, 'Other'),
(5, 'Cooking'),
(6, 'Restaurants'),
(7, 'Temples');

-- --------------------------------------------------------

--
-- Table structure for table `ta_favorites`
--

CREATE TABLE IF NOT EXISTS `ta_favorites` (
  `ta_fav_info_title` varchar(200) DEFAULT NULL,
  `ta_fav_info_date` timestamp NULL DEFAULT NULL,
  `ta_fav_user_emailid` varchar(100) DEFAULT NULL,
  `ta_fav_created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ta_favorites`
--

INSERT INTO `ta_favorites` (`ta_fav_info_title`, `ta_fav_info_date`, `ta_fav_user_emailid`, `ta_fav_created_date`) VALUES
('test', '2015-12-22 14:04:10', 'desuvinaykumar@gmail.com', '2016-01-02 13:16:10'),
('pull to refresh available now', '2015-12-16 23:03:03', 'desuvinaykumar@gmail.com', '2016-01-04 09:14:51');

-- --------------------------------------------------------

--
-- Table structure for table `ta_info`
--

CREATE TABLE IF NOT EXISTS `ta_info` (
  `ta_info_title` varchar(200) NOT NULL,
  `ta_info_category` int(3) NOT NULL,
  `ta_info_info` varchar(5000) NOT NULL,
  `ta_info_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ta_info_likes` int(9) NOT NULL DEFAULT '0',
  `ta_info_dislikes` int(9) NOT NULL DEFAULT '0',
  `ta_info_createddate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ta_info_emailid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ta_info_title`,`ta_info_createddate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ta_info`
--

INSERT INTO `ta_info` (`ta_info_title`, `ta_info_category`, `ta_info_info`, `ta_info_date`, `ta_info_likes`, `ta_info_dislikes`, `ta_info_createddate`, `ta_info_emailid`) VALUES
('Brasilian', 6, 'vhhgkn', '2015-12-16 23:28:22', 4, 2, '2015-12-16 17:36:13', NULL),
('df', 3, 'dsf', '2015-12-14 09:18:07', 0, 0, '2015-12-14 09:18:07', NULL),
('Good UI', 999, 'Good UI', '2015-12-10 18:10:21', 2, 0, '0000-00-00 00:00:00', NULL),
('Good work', 999, 'Bravo... More things to be done before launch...\nWhat about those part ? Please tell.\n\nCan you please move Submit button to Right.', '2015-12-14 13:49:21', 3, 3, '2015-12-14 12:50:52', NULL),
('Great', 5, 'lovely', '2015-12-11 10:38:01', 0, 2, '0000-00-00 00:00:00', NULL),
('I see some template while loading first time', 999, 'Hi...', '2015-12-11 10:30:32', 1, 5, '0000-00-00 00:00:00', NULL),
('is it ok', 999, '?', '2015-12-11 10:47:53', 0, 0, '2015-12-11 10:47:53', NULL),
('Make it happend dabba', 3, 'Do the rifht qat', '2015-12-11 07:23:36', 1, 1, '0000-00-00 00:00:00', NULL),
('Narayana netralaya', 999, 'Hospital will be closed on 20 th dec', '2015-12-12 00:07:01', 0, 0, '2015-12-12 00:07:01', NULL),
('Neend', 5, 'Neend aa rahi hai....', '2015-12-09 18:06:33', 0, 0, '0000-00-00 00:00:00', NULL),
('new ui', 999, 'enjoy the new UI', '2015-12-16 17:14:03', 1, 0, '2015-12-16 17:07:14', NULL),
('Off', 1, '1000 off on domestic flight yatra', '2015-12-11 07:21:53', 0, 0, '0000-00-00 00:00:00', NULL),
('paytm', 2, '120 off on 1000', '2016-01-04 10:28:09', 7, 2, '0000-00-00 00:00:00', NULL),
('Paytm flat 140 cashback on bus ticket', 1, 'Flat 140 Rs cashback on bus ticket booking above 800 Rs.  Use FLAT140 to utilize the cashback.', '2015-12-10 16:53:16', 4, 2, '0000-00-00 00:00:00', NULL),
('pull to refresh available now', 999, 'check', '2015-12-22 10:05:33', 2, 0, '2015-12-16 23:03:03', NULL),
('road done', 4, 'Whitfield road done', '2015-12-11 10:37:32', 5, 8, '0000-00-00 00:00:00', NULL),
('t', 999, 'g', '2015-12-12 09:27:59', 0, 0, '2015-12-12 09:27:59', NULL),
('tesr', 1, 'fxxcvbbhfcv', '2015-12-09 19:07:41', 2, 0, '0000-00-00 00:00:00', NULL),
('test', 1, 'travel info', '2015-12-16 13:34:35', 8, 8, '0000-00-00 00:00:00', NULL),
('test', 1, 'dsf', '2015-12-22 14:04:10', 0, 0, '2015-12-22 14:04:10', 'desuvinaykumar@gmail.com'),
('Try it', 3, 'No information', '2015-12-11 08:02:28', 4, 3, '0000-00-00 00:00:00', NULL),
('Well done', 5, 'This is a good effort.', '2015-12-11 10:38:01', 2, 2, '0000-00-00 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ta_menu`
--

CREATE TABLE IF NOT EXISTS `ta_menu` (
  `ta_menu_id` decimal(9,0) DEFAULT NULL,
  `ta_menu_desc` varchar(20) DEFAULT NULL,
  `ta_menu_seq` decimal(9,1) DEFAULT NULL,
  `ta_menu_code` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ta_menu`
--

INSERT INTO `ta_menu` (`ta_menu_id`, `ta_menu_desc`, `ta_menu_seq`, `ta_menu_code`) VALUES
('1', 'Category', '1.0', 'categories'),
('2', 'About', '2.0', 'about'),
('3', 'Contact US', '3.0', 'contactus'),
('4', 'Search Information', '1.1', 'searchinfo'),
('5', 'Account', '0.0', 'userinfo'),
('6', 'Favorites', '1.3', 'favorite');

-- --------------------------------------------------------

--
-- Table structure for table `ta_user`
--

CREATE TABLE IF NOT EXISTS `ta_user` (
  `ta_user_emailid` varchar(100) NOT NULL,
  `ta_user_name` varchar(50) DEFAULT NULL,
  `ta_user_picture` varchar(500) DEFAULT NULL,
  `ta_user_gender` varchar(10) DEFAULT NULL,
  `ta_user_createddate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ta_user_lastlogin` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ta_user_emailid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ta_user`
--

INSERT INTO `ta_user` (`ta_user_emailid`, `ta_user_name`, `ta_user_picture`, `ta_user_gender`, `ta_user_createddate`, `ta_user_lastlogin`) VALUES
('abhishekkr.singh85@gmail.com', 'abhishek kumar singh', 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg', 'male', '2015-12-18 20:26:32', '2015-12-18 20:53:07'),
('desuvinaykumar@gmail.com', 'vinay kumar', 'https://lh3.googleusercontent.com/-5vqxYxbnPyY/AAAAAAAAAAI/AAAAAAAAB8I/SjZt41fmuoY/photo.jpg', 'male', '2015-12-18 20:06:44', '2016-01-04 14:37:05'),
('manikshakya6@gmail.com', 'Manik Shakya', 'https://lh3.googleusercontent.com/-caoIdmxkb-U/AAAAAAAAAAI/AAAAAAAADEQ/pojE1SIEXnc/photo.jpg', 'male', '2016-01-04 17:24:59', '2016-01-04 21:00:54'),
('sknaval2015@gmail.com', 'Naval kishor sah', 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg', NULL, '2015-12-22 07:45:28', '2015-12-22 07:45:28'),
('sreenivasuludesu@gmail.com', 'Sreenivasulu D', 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg', 'male', '2016-01-03 05:21:12', '2016-01-03 05:21:12');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

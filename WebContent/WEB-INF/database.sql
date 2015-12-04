/*
SQLyog Community Edition- MySQL GUI v6.56
MySQL - 5.0.89-community-nt : Database - jqueryapp
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`jqueryapp` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `jqueryapp`;

/*Table structure for table `ta_info` */

DROP TABLE IF EXISTS `ta_info`;

CREATE TABLE `ta_info` (
  `ta_info_title` varchar(200) NOT NULL,
  `ta_info_category` varchar(200) NOT NULL,
  `ta_info_info` varchar(5000) NOT NULL,
  `ta_info_date` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `ta_info` */

insert  into `ta_info`(`ta_info_title`,`ta_info_category`,`ta_info_info`,`ta_info_date`) values ('test title','test category','test information','2015-11-27 01:15:48'),('test title','test category','test information','2015-12-04 19:04:48'),('test title','test category','test information','2015-12-04 19:54:00'),('test title','test category','test information','2015-12-04 20:02:50');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

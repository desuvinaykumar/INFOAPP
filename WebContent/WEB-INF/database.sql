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

alter table `ta_info` change `ta_info_category` `ta_info_category` numeric(3) NOT NULL;
alter table `ta_info` add column `ta_info_likes` numeric(9) DEFAULT '0' NULL after `ta_info_date`, add column `ta_info_dislikes` numeric(9) DEFAULT '0' NULL after `ta_info_likes`;

DROP TABLE IF EXISTS `ta_category`;

create table `ta_category`( `ta_category_id` numeric(3) , `ta_category_desc` varchar(25) );

insert into `ta_category`(`ta_category_id`,`ta_category_desc`) values ( '1','Travel');
insert into `ta_category`(`ta_category_id`,`ta_category_desc`) values ( '2','Recharge Offer');
insert into `ta_category`(`ta_category_id`,`ta_category_desc`) values ( '3','Shopping');
update `ta_category` set `ta_category_id`='2',`ta_category_desc`='Recharge' where `ta_category_id`='2' and `ta_category_desc`='Recharge Offer';
insert into `ta_category`(`ta_category_id`,`ta_category_desc`) values ( '4','Traffic');
insert into `ta_category`(`ta_category_id`,`ta_category_desc`) values ( '5','Other');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

CREATE DATABASE  IF NOT EXISTS `ps_jcwd_vl05_ah` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ps_jcwd_vl05_ah`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ps_jcwd_vl05_ah
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `credit` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Quail Mercer','consectetuer.adipiscing@google.com','+62-678-6857-4411','$96.67','Jambi'),(2,'Kiayada Clark','justo@google.com','+62-713-1862-5186','$24.70','Palembang'),(3,'Cole Cohen','semper.cursus@google.com','+62-454-3644-6768','$42.76','Tual'),(4,'Candice Gilmore','ante@google.com','+62-149-6114-1357','$18.81','Jayapura'),(5,'Ciara Abbott','aliquet.magna@google.com','+62-966-1787-4700','$83.31','Kupang'),(6,'Tanek Marsh','ipsum.suspendisse@google.com','+62-734-1391-7456','$72.32','Tidore'),(7,'Riley Nixon','dictum.magna@google.com','+62-456-2735-0552','$53.08','Palembang'),(8,'Cecilia Joyner','cras.eu.tellus@google.com','+62-023-3600-1776','$83.84','Denpasar'),(9,'Sawyer Malone','erat.neque@google.com','+62-475-5063-0552','$91.07','Pekanbaru'),(10,'Montana Mooney','mauris.quis.turpis@google.com','+62-160-3376-6415','$80.72','Blitar'),(11,'Henry O\'Neill','magna.phasellus@google.com','+62-582-9223-1857','$18.82','Palangka Raya'),(12,'Damian Price','diam@google.com','+62-641-1480-4710','$41.40','Banda Aceh'),(13,'Aiko Gentry','magna.suspendisse.tristique@google.com','+62-924-6704-1871','$71.40','Bengkulu'),(14,'Erasmus Howard','congue.a.aliquet@google.com','+62-434-6596-2786','$71.69','Serang'),(15,'Chastity Flowers','eros@google.com','+62-211-7687-8294','$39.65','Gorontalo');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-07 21:23:14

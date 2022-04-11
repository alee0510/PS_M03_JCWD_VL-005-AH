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
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Jakarta'),(2,'BSD'),(3,'Bandung'),(4,'Bekasi'),(5,'Surabaya'),(6,'Semarang'),(7,'Lombok'),(8,'Makasar');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Quail Mercer','consectetuer.adipiscing@google.com','+62-678-6857-4411','$96.67','Jambi'),(2,'Kiayada Clark','justo@google.com','+62-713-1862-5186','$24.70','Palembang'),(3,'Cole Cohen','semper.cursus@google.com','+62-454-3644-6768','$42.76','Tual'),(4,'Candice Gilmore','ante@google.com','+62-149-6114-1357','$18.81','Jayapura'),(5,'Ciara Abbott','aliquet.magna@google.com','+62-966-1787-4700','$83.31','Kupang'),(6,'Tanek Marsh','ipsum.suspendisse@google.com','+62-734-1391-7456','$72.32','Tidore'),(7,'Riley Nixon','dictum.magna@google.com','+62-456-2735-0552','$53.08','Palembang'),(8,'Cecilia Joyner','cras.eu.tellus@google.com','+62-023-3600-1776','$83.84','Denpasar'),(9,'Sawyer Malone','erat.neque@google.com','+62-475-5063-0552','$91.07','Pekanbaru'),(10,'Montana Mooney','mauris.quis.turpis@google.com','+62-160-3376-6415','$80.72','Blitar'),(11,'Henry O\'Neill','magna.phasellus@google.com','+62-582-9223-1857','$18.82','Palangka Raya'),(12,'Damian Price','diam@google.com','+62-641-1480-4710','$41.40','Banda Aceh'),(13,'Aiko Gentry','magna.suspendisse.tristique@google.com','+62-924-6704-1871','$71.40','Bengkulu'),(14,'Erasmus Howard','congue.a.aliquet@google.com','+62-434-6596-2786','$71.69','Serang'),(15,'Chastity Flowers','eros@google.com','+62-211-7687-8294','$39.65','Gorontalo'),(16,'Flowers','flowrs@google.com','+62-211-7687-0000','$39.65','Serpong'),(17,'Still','still@google.com','+62-211-7687-0000','$39.65','JKT');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program`
--

DROP TABLE IF EXISTS `program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `program` (
  `id` int NOT NULL AUTO_INCREMENT,
  `program` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
INSERT INTO `program` VALUES (1,'Fullstack Web Development'),(2,'UIUX Designer'),(3,'Data Science'),(4,'Digital Marketing');
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentId` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `programId` int NOT NULL,
  `cityId` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'BA772149-C7EB-E966-A12A-A85738E6A641','Martina Mendoza','parturient.montes@aol.net',1,2),(2,'BE775BE3-204A-B797-6482-FABDFEFBDA3E','Kessie Thompson','imperdiet@protonmail.org',2,3),(3,'5D9EF3D2-FE65-34BA-A9B4-959362B7B767','Hyacinth Perkins','pharetra.quisque@hotmail.ca',2,1),(4,'568A4E4B-1AE9-BEBE-37A7-E039564201E6','Kim Tate','nunc@outlook.net',2,4),(5,'3233A8E1-EA26-C6AA-7515-7B7CC3DD96D6','Nigel Ferguson','phasellus.nulla.integer@icloud.edu',4,2),(6,'50C3034C-8C1B-EB96-3A27-9B7B471873DE','Kim Vang','cum.sociis.natoque@outlook.org',2,7),(7,'05C05D12-4BD2-0647-471C-79213DD9B1F2','Brielle Wiggins','rutrum.justo@aol.org',1,7),(8,'AB88B5E8-760D-3E29-6FDC-315640887835','Debra Jensen','arcu.imperdiet@aol.couk',4,7),(9,'56C94DD9-AD67-2CAE-3149-32F6A5B31689','Ila Keith','tellus.phasellus.elit@hotmail.org',2,7),(10,'06EDED67-A5E3-C19E-C1E5-E53A99DA6CA3','Xanthus Wall','posuere@aol.org',2,6),(11,'684C303A-B07A-585E-E11A-53436A7CA9B8','McKenzie Kerr','bibendum.ullamcorper.duis@google.couk',2,2),(12,'B7223C3C-8824-807C-AC65-6BBD3E9B1315','Desiree Bradford','augue@outlook.org',4,6),(13,'AB816A51-09A9-F717-EB97-5F73DE124771','Kuame Ramos','purus.maecenas@google.org',3,7),(14,'BC5DCC07-4C79-3772-81F4-3063AB47CEDD','Matthew Spence','dui@outlook.edu',3,7),(15,'78727ACD-C14C-4291-81AB-C4DECED86EE3','Cameran Chandler','semper@google.edu',2,6),(16,'5A04564B-2AA8-D3B1-AC32-443A76BD8533','Channing Ratliff','sed.id.risus@google.net',2,8),(17,'DA214BD1-7EDE-C38C-13AB-4280B478E80B','Vladimir Hurst','ligula@outlook.com',3,5),(18,'C2F14332-5F35-DC18-A758-D9226A10DC82','Rachel Alexander','lectus.cum.sociis@yahoo.org',2,4),(19,'9F8BD94A-5B94-6EDA-898A-9D86B35D7D37','Jaden Burks','sit.amet@google.ca',2,7),(20,'5173D518-1EA9-27DB-9C67-4D5BCB52135A','Kristen Hammond','ipsum.suspendisse@google.couk',4,4),(21,'BF3EBA57-D514-2DBB-8678-8886C7642299','Lawrence Nolan','euismod.enim.etiam@outlook.net',4,5),(22,'BCCCF93C-1A3C-8ADF-E323-E38832E2D565','Ezra Gates','ut.dolor@hotmail.com',2,6),(23,'E56C6C05-32E5-CEB6-241E-8B0FAED9EC45','Ifeoma Padilla','ante@outlook.ca',1,5),(24,'DC88E1EC-16A9-E9DC-0C20-2419A1257EB7','Adena Butler','orci@outlook.com',2,1),(25,'A510BB8D-C7E1-E22A-32C6-8F4D5131F9FE','Pandora Clayton','odio.vel.est@outlook.org',3,4),(26,'64647B74-D439-F382-3BAE-318685627EF0','Silas Henson','vel@hotmail.net',1,1),(27,'486B3CB7-A1D7-7C7B-3523-A97856452EB4','Kareem Fitzgerald','et.netus@aol.couk',2,3),(28,'BB048CBE-5897-E8FF-77D0-9AAEC1196306','Karly Knowles','consectetuer.adipiscing@protonmail.couk',2,2),(29,'9476D394-8F9D-AB5B-B398-B3568B1A4CC2','Guinevere Phillips','et@protonmail.edu',3,4),(30,'3A521AFE-7729-4B51-8173-08287CB55ECC','Garrison Mercer','commodo.tincidunt@hotmail.couk',1,1),(31,'2A918D42-6AD1-DAF4-7EBA-DCB9C8B43374','Cadman Saunders','sapien.gravida@protonmail.ca',3,4),(32,'A6C38D31-15C6-4212-D817-57721542AE9F','Barclay Coleman','ullamcorper.duis@protonmail.couk',3,5),(33,'32CE8269-E54D-5815-A252-9BDA34BB6CC5','Clementine Rivera','eget.varius.ultrices@outlook.net',1,4),(34,'37CC9490-B621-B5AC-9833-74C976DD35D2','Carissa Nixon','ligula.eu@icloud.ca',2,2),(35,'723B886E-231F-3839-EB41-2C4DB57F49A3','Evelyn Huber','nisi@aol.ca',3,3),(36,'28A5C2AB-3241-47E3-A614-54426F258DEE','Carl Burton','nulla@yahoo.org',2,7),(37,'7B92E034-E898-1BC3-9C8D-5C4E54D59D58','Aline Stuart','fames.ac@yahoo.net',2,7),(38,'788DF64A-9EA0-A6DF-99FC-7B38A3A823FA','Fleur Mcconnell','nulla@hotmail.com',1,6),(39,'1E8CBB13-5A6A-BD3D-8B52-EAE6BDB1159F','Emery Michael','magna.cras.convallis@google.edu',4,2),(40,'A520ED4B-5575-EE72-DD2B-76944FD672AA','Quyn Fulton','urna.convallis.erat@icloud.ca',2,2),(41,'8E107EA9-082E-CF7F-2BE0-1E7384AD4207','Martina Holder','ullamcorper.velit@outlook.edu',3,8),(42,'CBC18725-42AF-9499-E2BA-A1E281BDEC67','Kuame Butler','scelerisque.lorem.ipsum@icloud.com',2,7),(43,'89A9C175-893A-02EE-486E-B189B2C366AC','Kiayada Austin','ac@outlook.net',1,1),(44,'2CFA64BD-45E8-4A55-76BE-33FA4068D236','Allegra Ross','habitant@google.org',2,7),(45,'1258C131-4493-82D7-51B7-2592D2372C3D','Logan Fletcher','fermentum@aol.net',1,7),(46,'F29E6C67-C926-4361-5781-9FE4ABF192DA','Stone Puckett','lorem.ac.risus@yahoo.edu',1,2),(47,'A8A7E6A6-FEF9-7266-0537-BC2924C84D17','Chanda Pierce','habitant.morbi@outlook.net',3,3),(48,'0149AE25-DCA0-1BAC-3D8D-6FCE59B53424','Hiroko Hendricks','natoque.penatibus@google.org',4,2),(49,'FF63B42F-6954-2A22-DA92-243672110A34','Ignatius Zimmerman','lacinia@protonmail.org',3,7),(50,'6B38A5CD-AA85-18A1-B1FA-E5B04BC36CF4','Candace Copeland','luctus.curabitur.egestas@yahoo.com',3,8);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-11 20:31:07

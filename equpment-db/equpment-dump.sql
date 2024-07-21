-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: equpment
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add permission',1,'add_permission'),(2,'Can change permission',1,'change_permission'),(3,'Can delete permission',1,'delete_permission'),(4,'Can view permission',1,'view_permission'),(5,'Can add group',2,'add_group'),(6,'Can change group',2,'change_group'),(7,'Can delete group',2,'delete_group'),(8,'Can view group',2,'view_group'),(9,'Can add content type',3,'add_contenttype'),(10,'Can change content type',3,'change_contenttype'),(11,'Can delete content type',3,'delete_contenttype'),(12,'Can view content type',3,'view_contenttype'),(13,'Can add area',4,'add_area'),(14,'Can change area',4,'change_area'),(15,'Can delete area',4,'delete_area'),(16,'Can view area',4,'view_area'),(17,'Can add equpment category',5,'add_equpmentcategory'),(18,'Can change equpment category',5,'change_equpmentcategory'),(19,'Can delete equpment category',5,'delete_equpmentcategory'),(20,'Can view equpment category',5,'view_equpmentcategory'),(21,'Can add supplier',6,'add_supplier'),(22,'Can change supplier',6,'change_supplier'),(23,'Can delete supplier',6,'delete_supplier'),(24,'Can view supplier',6,'view_supplier'),(25,'Can add branch',7,'add_branch'),(26,'Can change branch',7,'change_branch'),(27,'Can delete branch',7,'delete_branch'),(28,'Can view branch',7,'view_branch'),(29,'Can add equpment',8,'add_equpment'),(30,'Can change equpment',8,'change_equpment'),(31,'Can delete equpment',8,'delete_equpment'),(32,'Can view equpment',8,'view_equpment'),(33,'Can add order',9,'add_order'),(34,'Can change order',9,'change_order'),(35,'Can delete order',9,'delete_order'),(36,'Can view order',9,'view_order'),(37,'Can add order_ details',10,'add_order_details'),(38,'Can change order_ details',10,'change_order_details'),(39,'Can delete order_ details',10,'delete_order_details'),(40,'Can view order_ details',10,'view_order_details'),(41,'Can add user',11,'add_user'),(42,'Can change user',11,'change_user'),(43,'Can delete user',11,'delete_user'),(44,'Can view user',11,'view_user'),(45,'Can add Token',12,'add_token'),(46,'Can change Token',12,'change_token'),(47,'Can delete Token',12,'delete_token'),(48,'Can view Token',12,'view_token'),(49,'Can add Token',13,'add_tokenproxy'),(50,'Can change Token',13,'change_tokenproxy'),(51,'Can delete Token',13,'delete_tokenproxy'),(52,'Can view Token',13,'view_tokenproxy'),(53,'Can add order details',10,'add_orderdetails'),(54,'Can change order details',10,'change_orderdetails'),(55,'Can delete order details',10,'delete_orderdetails'),(56,'Can view order details',10,'view_orderdetails');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_equpment_app_user_id` FOREIGN KEY (`user_id`) REFERENCES `equpment_app_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
INSERT INTO `authtoken_token` VALUES ('4e69ab6876edbb04eb5ecb51860096394256bd25','2024-06-19 20:18:22.072536',2);
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (2,'auth','group'),(1,'auth','permission'),(12,'authtoken','token'),(13,'authtoken','tokenproxy'),(3,'contenttypes','contenttype'),(4,'equpment_app','area'),(7,'equpment_app','branch'),(8,'equpment_app','equpment'),(5,'equpment_app','equpmentcategory'),(9,'equpment_app','order'),(10,'equpment_app','orderdetails'),(6,'equpment_app','supplier'),(11,'equpment_app','user');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'equpment_app','0001_initial','2024-06-07 17:36:06.017560'),(2,'contenttypes','0001_initial','2024-06-10 08:04:22.655278'),(3,'contenttypes','0002_remove_content_type_name','2024-06-10 08:04:22.880636'),(4,'auth','0001_initial','2024-06-10 08:04:23.714092'),(5,'auth','0002_alter_permission_name_max_length','2024-06-10 08:04:23.913931'),(6,'auth','0003_alter_user_email_max_length','2024-06-10 08:04:23.930590'),(7,'auth','0004_alter_user_username_opts','2024-06-10 08:04:23.947692'),(8,'auth','0005_alter_user_last_login_null','2024-06-10 08:04:23.964348'),(9,'auth','0006_require_contenttypes_0002','2024-06-10 08:04:23.980945'),(10,'auth','0007_alter_validators_add_error_messages','2024-06-10 08:04:23.989179'),(11,'auth','0008_alter_user_username_max_length','2024-06-10 08:04:24.006021'),(12,'auth','0009_alter_user_last_name_max_length','2024-06-10 08:04:24.030657'),(13,'auth','0010_alter_group_name_max_length','2024-06-10 08:04:24.074337'),(14,'auth','0011_update_proxy_permissions','2024-06-10 08:04:24.090361'),(15,'auth','0012_alter_user_first_name_max_length','2024-06-10 08:04:24.108032'),(16,'equpment_app','0002_rename_deault_branch_user_default_branch_and_more','2024-06-10 08:04:25.751912'),(17,'equpment_app','0003_alter_branch_next_order','2024-06-10 10:02:35.378677'),(18,'authtoken','0001_initial','2024-06-12 10:56:46.489606'),(19,'authtoken','0002_auto_20160226_1747','2024-06-12 10:56:46.549890'),(20,'authtoken','0003_tokenproxy','2024-06-12 10:56:46.560892'),(21,'authtoken','0004_alter_tokenproxy_options','2024-06-12 10:56:46.576179'),(22,'equpment_app','0004_rename_order_details_orderdetails','2024-06-12 16:03:20.301525'),(23,'equpment_app','0005_rename_area_id_branch_area_and_more','2024-06-12 16:07:51.428125'),(24,'equpment_app','0006_user_is_staff','2024-06-13 11:38:18.524524'),(25,'equpment_app','0007_equpment_active','2024-07-02 14:10:06.376240'),(26,'equpment_app','0008_alter_equpment_active_and_more','2024-07-02 18:17:47.733489'),(27,'equpment_app','0009_branch_address','2024-07-02 19:16:11.107177'),(28,'equpment_app','0010_remove_order_sent_to_supplier_and_more','2024-07-10 13:58:38.373422'),(29,'equpment_app','0011_branch_active_supplier_active','2024-07-10 15:46:46.911937');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equpment_app_area`
--

DROP TABLE IF EXISTS `equpment_app_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equpment_app_area` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equpment_app_area`
--

LOCK TABLES `equpment_app_area` WRITE;
/*!40000 ALTER TABLE `equpment_app_area` DISABLE KEYS */;
INSERT INTO `equpment_app_area` VALUES (1,'ירושלים'),(2,'מרכז'),(3,'דרום'),(4,'צפון'),(5,'הנהלה');
/*!40000 ALTER TABLE `equpment_app_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equpment_app_branch`
--

DROP TABLE IF EXISTS `equpment_app_branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equpment_app_branch` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `next_order` date DEFAULT NULL,
  `area_id` bigint NOT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `equpment_app_branch_area_id_e9e11966_fk_equpment_app_area_id` (`area_id`),
  CONSTRAINT `equpment_app_branch_area_id_e9e11966_fk_equpment_app_area_id` FOREIGN KEY (`area_id`) REFERENCES `equpment_app_area` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equpment_app_branch`
--

LOCK TABLES `equpment_app_branch` WRITE;
/*!40000 ALTER TABLE `equpment_app_branch` DISABLE KEYS */;
INSERT INTO `equpment_app_branch` VALUES (1,'הנהלה',NULL,5,'הרצל 45, מיקוד 654321',1),(2,'באר שבע',NULL,3,'בן גוריון 12, מיקוד 123456',1),(3,'שדרות',NULL,3,'אבן גבירול 99, מיקוד 789012',1),(4,'נתניה','2024-07-24',4,'דיזנגוף 77, מיקוד 345678',1),(5,'קרית ביאליק','2024-08-02',4,'אחד העם 34, מיקוד 987654',1),(6,'בני ברק','2024-07-24',2,'אלנבי 8, מיקוד 456789',1),(7,'רוממה','2024-07-23',1,'שדרות רוטשילד 50, מיקוד 112233',1),(8,'בית שמש','2024-07-31',1,'ז\'בוטינסקי 27, מיקוד 223344',1),(9,'טיילת',NULL,1,'שאול המלך 16, מיקוד 334455',1),(10,'פסגת זאב','2024-07-25',1,'המלך ג\'ורג\' 72, מיקוד 556677',1),(11,'אילת',NULL,3,'דרך החוף 123 מיקוד 825634',1),(12,'אשקלון','2024-07-23',3,'יהודה אשכנזי 18 מיקוד 86453',1),(13,'בת ים',NULL,2,'שדרות ירושלים 18 854625',1),(14,'ראש עין',NULL,2,'יהודה המכבי 9 854855',1),(15,'פתח תקווה','2024-07-26',2,'יפו 66 654896',1),(16,'אשדוד',NULL,3,'חנה סנש 1 854211',1),(17,'טבריה','2024-07-23',4,'טיילת 51 542187',1),(18,'פסגת זאב',NULL,1,'זאב מילר 63 852146',0);
/*!40000 ALTER TABLE `equpment_app_branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equpment_app_equpment`
--

DROP TABLE IF EXISTS `equpment_app_equpment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equpment_app_equpment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `unit_measure` varchar(50) NOT NULL,
  `price` decimal(50,2) NOT NULL,
  `requres_approval` tinyint(1) NOT NULL,
  `category_id` bigint NOT NULL,
  `supplier_id` bigint NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `equpment_app_equpmen_category_id_bd789de8_fk_equpment_` (`category_id`),
  KEY `equpment_app_equpmen_supplier_id_2ce03f3e_fk_equpment_` (`supplier_id`),
  CONSTRAINT `equpment_app_equpmen_category_id_bd789de8_fk_equpment_` FOREIGN KEY (`category_id`) REFERENCES `equpment_app_equpmentcategory` (`id`),
  CONSTRAINT `equpment_app_equpmen_supplier_id_2ce03f3e_fk_equpment_` FOREIGN KEY (`supplier_id`) REFERENCES `equpment_app_supplier` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=223 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equpment_app_equpment`
--

LOCK TABLES `equpment_app_equpment` WRITE;
/*!40000 ALTER TABLE `equpment_app_equpment` DISABLE KEYS */;
INSERT INTO `equpment_app_equpment` VALUES (1,'ריפוד 7','ארגז 100 יח',120.00,0,1,1,1),(3,'ריפוד 10','ארגז 100 יח',120.00,0,1,1,1),(4,'ריפוד 12','ארגז 100 יח',120.00,0,1,1,1),(5,'ריפוד 15','ארגז 100 יח',120.00,0,1,1,1),(6,'ריפוד 20','ארגז 100 יח',120.00,0,1,1,1),(7,'אלסטית 7','ארגז 100 יח',120.00,0,1,1,1),(8,'אלסטית 10','ארגז 100 יח',120.00,0,1,1,1),(9,'אלסטית 12','ארגז 100 יח',120.00,1,1,1,1),(10,'גבס 7','ארגז 100 יח',120.00,0,1,1,1),(11,'גבס 10','ארגז 100 יח',120.00,0,1,1,1),(12,'גבס 12','ארגז 100 יח',120.00,0,1,1,1),(13,'גבס 15','ארגז 100 יח',120.00,0,1,1,1),(14,'גבס 20','ארגז 100 יח',120.00,0,1,1,1),(15,'סטוקינט','יח',50.00,1,1,1,1),(16,'סטוקינט','קופסא',120.00,0,1,1,0),(18,'משולש','ארגז 100 יח',50.00,0,1,1,1),(20,'גאזות 100 יח קטן 5 סמ','ארגז 100 יח',100.00,0,2,1,1),(21,'גאזות 100 יח גדול 7.5 סמ','ארגז 100 יח',100.00,0,2,1,1),(22,'אגד חבישה קטן 5 סמ','ארגז 100 יח',150.00,0,2,1,1),(23,'אגד חבישה בנוני 7.5 סמ','ארגז 100 יח',150.00,0,2,1,1),(24,'אגד חבישה גדול 10 סמ','ארגז 100 יח',150.00,0,2,1,1),(25,'גאזה וזלין','ארגז 100 יח',20.00,1,2,1,1),(26,'גאזה סטרילית','ארגז 100 יח',45.00,0,2,1,1),(27,'גאזה סטרילית','ארגז 100 יח',45.00,0,2,1,1),(28,'מספריים מלעכ','יח',5.00,0,2,2,1),(29,'פד גאזה כחול עבה','אריזה של 10 יח',50.00,0,2,1,1),(30,'פלאסטר רגיל','אריזה של 100 יח',10.00,0,2,1,1),(31,'חוסם עורקים','יח',15.00,0,2,1,1),(32,'תחבושת אישית (ת.א.)','יח',10.00,0,2,1,1),(33,'Micropore','אריזה של 10 יח',80.00,0,3,1,1),(34,'Transpore','אריזה של 10 יח',80.00,0,3,1,1),(35,'חוסם ורידים','אריזה של 10 יח',8.00,0,3,1,1),(36,'תרבית שתן כללית/לאומית','אריזה 20 יח',50.00,0,8,2,1),(37,'תרבית שתן מכבי','אריזה 20 יח',60.00,1,8,2,1),(38,'תרבית שתן מאוחדת','אריזה 20 יח',60.00,0,8,2,1),(39,'צלחת תרבית גרון','אריזה 20 יח',30.00,0,8,2,1),(40,'אנטיביוטיקה לתרבית גרון','אריזה 5 יח',10.00,0,8,2,1),(41,'Cleanser','אריזה 6 יח',100.00,0,5,2,1),(42,'Rinse','יח',80.00,1,5,2,1),(43,'Lyse','אריזה 2 יח',80.00,1,5,2,1),(44,'Dulient','יח',150.00,1,5,2,1),(45,'מבחינה קפילרית לספירת דם בילדים','אריזה 50 מבחנות',50.00,0,3,4,1),(46,'מבחנה שחורה ESR','אריזה 50 מבחנות',50.00,0,3,4,1),(47,'מבחנה ירוקה טרופונין','אריזה 50 מבחנות',50.00,0,3,4,1),(48,'מבחנה צהובה כימיה','אריזה 50 מבחנות',50.00,0,3,4,1),(49,'מבחנה ורודה CBC','אריזה 50 מבחנות',50.00,0,3,4,1),(50,'דוקרנים','אריזה 100 יח',95.00,0,3,6,1),(51,'סט עירוי','קרטון 100 יח',200.00,0,3,3,1),(52,'פקק עירוי','אריזה 100 יח',120.00,0,3,4,1),(53,'פרפר עם וקוטנר כחול 23G','אריזה 50 יח',120.00,0,3,6,1),(54,'פרפר עם וקוטנר ירוק 21G','אריזה 50 יח',120.00,0,3,6,1),(55,'וונפלון צהוב 24G','אריזה 50 יח',165.00,0,3,4,1),(56,'וונפלון כחול 22G','אריזה 50 יח',165.00,0,3,4,1),(57,'וונפלון ורוד 20G','אריזה 50 יח',165.00,0,3,4,1),(58,'וונפלון ירוק 18G','אריזה 50 יח',165.00,0,3,4,1),(59,'Reference Fluid','אריזה 6 יח',83.00,1,6,2,1),(60,'ALP','אריזה 10 יח',98.00,0,6,2,1),(61,'AMYLAZE','אריזה 10 יח',98.00,0,6,2,1),(62,'BUN','אריזה 10 יח',98.00,0,6,2,1),(63,'CA','אריזה 10 יח',98.00,0,6,2,1),(64,'CPK','אריזה 10 יח',98.00,0,6,2,1),(65,'CREATENINE','אריזה 10 יח',98.00,0,6,2,1),(66,'GGT','אריזה 10 יח',98.00,0,6,2,1),(67,'GLUCOSE','אריזה 10 יח',98.00,0,6,2,1),(68,'GOT/AST','אריזה 10 יח',98.00,0,6,2,1),(69,'GPT/ALT','אריזה 10 יח',98.00,0,6,2,1),(70,'LDH','אריזה 10 יח',98.00,0,6,2,1),(71,'Na/K/Cl','אריזה 10 יח',98.00,0,6,2,1),(72,'T-BIL','אריזה 10 יח',98.00,0,6,2,1),(73,'UA','אריזה 10 יח',98.00,0,6,2,1),(74,'טיפים למכשיר ביוכימיה','אריזה 1000 יח',40.00,0,6,2,1),(75,'TUBE לסרום מכשיר ביוכימיה','אריזה 500 יח',40.00,0,6,2,1),(76,'סליידים TROPONIN','אריזה 10 יח',250.00,1,7,2,1),(77,'סליידים DDIMER','אריזה 10 יח',250.00,1,7,2,1),(78,'כיסוי מדחום','קרטון 10 אריזות',150.00,0,17,3,1),(79,'שרוול מדל\"ד מבוגר כחול','יח',150.00,1,17,5,1),(80,'שרוול מדל\"ד מבוגר אדום','יח',150.00,1,17,5,1),(81,'שרוול מדל\"ד ילד ירוק','יח',150.00,1,17,5,1),(82,'מגבונים דלי','יח',60.00,0,17,3,1),(83,'מסכות חמצן מבוגר','ארגז 100 יח',300.00,0,21,6,1),(84,'מסכות חמצן ילד','ארגז 100 יח',300.00,0,21,6,1),(85,'מסכות אינהלציה מבוגר','ארגז 100 יח',300.00,0,21,6,1),(86,'מסכות אינהלציה ילד','ארגז 100 יח',300.00,0,21,6,1),(87,'NASAL CANULA','ארגז 100 יח',300.00,0,21,6,1),(88,'EYE COLORING STRIPS','אריזה',185.00,0,13,1,1),(89,'ספקולום ואגינלי','יח',30.00,0,13,1,1),(90,'EAR CUETTE','10 יח',30.00,0,13,1,1),(91,'NASAL TAMPON','10 יח',30.00,0,13,1,1),(92,'כפפות לאטקס XL','ארגז 10 אריזות',180.00,0,32,3,1),(93,'כפפות לאטקס L','ארגז 10 אריזות',180.00,0,32,3,1),(94,'כפפות לאטקס M','ארגז 10 אריזות',180.00,0,32,3,1),(95,'כפפות לאטקס S','ארגז 10 אריזות',180.00,0,32,3,1),(96,'כפפות ניטריל XL','ארגז 10 אריזות',180.00,0,32,3,1),(97,'כפפות ניטריל L','ארגז 10 אריזות',180.00,0,32,3,1),(98,'כפפות ניטריל M','ארגז 10 אריזות',180.00,0,32,3,1),(99,'כפפות סטריליות 8','קרטון 50 יח',220.00,0,32,4,1),(100,'כפפות סטריליות 7.5','קרטון 50 יח',220.00,0,32,4,1),(101,'כפפות סטריליות 7','קרטון 50 יח',220.00,0,32,4,1),(102,'כפפות סטריליות 6.5','קרטון 50 יח',220.00,0,32,4,1),(103,'כפפות סטריליות 6','קרטון 50 יח',220.00,0,32,4,1),(104,'כליה פלסטיק','יח',10.00,0,14,6,1),(105,'חותך טבעות','יח',300.00,1,14,6,1),(106,'אליגטור','יח',300.00,1,14,6,1),(107,'עמוד עירוי','יח',300.00,1,14,6,1),(108,'עמדת שקיעת דם','יח',100.00,1,14,6,1),(109,'מנורה לצילום משטחי גרון','יח',100.00,1,14,6,1),(110,'מזרק 50 מ\"ל לזונדה','קרטון 50 יח',50.00,0,4,4,1),(111,'מזרק 20 מ\"ל','קרטון 50 יח',50.00,0,4,4,1),(112,'מזרק 10 מ\"ל','קרטון 50 יח',50.00,0,4,4,1),(113,'מזרק 5 מ\"ל','קרטון 50 יח',50.00,0,4,4,1),(114,'מזרק 2.5 מ\"ל','קרטון 50 יח',50.00,0,4,4,1),(115,'מזרק 1 מ\"ל','קרטון 50 יח',50.00,0,4,4,1),(116,'מחט ורודה 20 G','קרטון 50 יח',50.00,0,4,4,1),(117,'מחט ירוקה 18 G','קרטון 50 יח',50.00,0,4,4,1),(118,'מחט כחולה  22 G','קרטון 50 יח',50.00,0,4,4,1),(119,'מחט כתומה 24 G','קרטון 50 יח',50.00,0,4,4,1),(120,'בדיקות הריון','אריזה',30.00,0,10,6,1),(121,'סטיקים קאליברציה לשתן','יח',30.00,0,10,6,1),(122,'סטיקים לשתן','יח',30.00,0,10,6,1),(123,'פולי קטטר 24','אריזה 10 יח',80.00,0,9,5,1),(124,'פולי קטטר 22','אריזה 10 יח',80.00,0,9,5,1),(125,'פולי קטטר 20','אריזה 10 יח',80.00,0,9,5,1),(126,'פולי קטטר 18','אריזה 10 יח',80.00,0,9,5,1),(127,'פולי קטטר 16','אריזה 10 יח',80.00,0,9,5,1),(128,'פולי קטטר 14','אריזה 10 יח',80.00,0,9,5,1),(129,'פולי קטטר 12','אריזה 10 יח',80.00,0,9,5,1),(130,'שקיות שתן קטטר','אריזה 10 יח',50.00,0,9,5,1),(131,'ערכת קטטר שתן','יח',20.00,0,9,3,1),(132,'קטטר לתינוקות','אריזה 100 יח',90.00,0,9,3,1),(133,'שקיות שתן לתינוקות','אריזה 100 יח',90.00,0,9,3,1),(134,'כוסות שתן','קרטון 100 יח',190.00,0,9,6,1),(135,'גליל שקיות לאוטוקלאב','יח',130.00,0,12,2,1),(136,'סרט דבק לאוטוקלאב','יח',130.00,0,12,2,1),(137,'מים מזוקקים לאוטוקלאב','יח',130.00,0,12,2,1),(138,'סטיקים לגלוקוצ\'ק','אריזה 10 יח',20.00,0,11,4,1),(139,'סטיקים ל-INR','2 יח',250.00,1,11,4,1),(140,'סרט נייר מכשיר שתן/ביוכימיה/טרופונין','אריזה 10 יח',30.00,0,11,6,1),(141,'גליל מדבקות','יח',30.00,0,11,6,1),(142,'סוללות גלוקוצ\'ק','אריזה 2 יח',50.00,0,11,6,1),(143,'סוללות AA','אריזה 10 יח',50.00,0,11,6,1),(144,'סוללות AAA','אריזה 10 יח',50.00,0,11,6,1),(145,'מדבקות מוניטור','שקית',180.00,0,18,3,1),(146,'סרט מוניטור','יח',30.00,0,18,5,1),(147,'ג\'ל דפברילציה','יח',130.00,0,18,4,1),(148,'קליפסים לגפיים למכשיר אק\"ג','אריזה 4 יח',190.00,1,18,5,1),(149,'פומפות למכשיר אקג','אריזה 12 יח',190.00,1,18,5,1),(150,'מדל\"ד ידני עם סטטסקופ','יח',20.00,1,18,3,1),(151,'מדבקות דפברילציה','יח',190.00,0,18,5,1),(152,'ערכת לידה','יח',220.00,1,18,6,1),(153,'חוט תפירה 0-2','אריזה 10 יח',30.00,0,16,4,1),(154,'חוט תפירה 0-3','אריזה 10 יח',30.00,0,16,4,1),(155,'חוט תפירה 0-4','אריזה 10 יח',30.00,0,16,4,1),(156,'חוט תפירה 0-5','אריזה 10 יח',30.00,0,16,4,1),(157,'חוט תפירה 0-6','אריזה 10 יח',30.00,0,16,4,1),(158,'מספריים לסט תפירה','יח',30.00,1,16,4,1),(159,'מחזיק מחט לסט תפירה','יח',30.00,1,16,4,1),(160,'פינצטה לסט תפירה','יח',30.00,1,16,4,1),(161,'חולץ סיכות','אריזה 10 יח',150.00,0,16,1,1),(162,'אקדח סיכות','אריזה 10 יח',150.00,0,16,1,1),(163,'משטח סטרילי כחול עם חור','אריזה 10 יח',40.00,0,16,1,1),(164,'משטח סטרילי כחול בלי חור','אריזה 10 יח',40.00,0,16,1,1),(165,'סט תפירה חד\"פ','יח',40.00,1,16,6,1),(166,'סקאלפל להב ישר','אריזה 50 יח',40.00,0,16,4,1),(167,'סקאלפל להב מעוכל','אריזה 50 יח',40.00,0,16,4,1),(168,'סטרי סטריפ','אריזה 50 יח',40.00,0,16,4,1),(169,'סכין גילוח','אריזה 50 יח',80.00,0,16,6,1),(170,'שפאדלים','אריזה 100 יח',20.00,0,34,6,1),(171,'מטושים','אריזה 100 יח',20.00,0,34,6,1),(172,'כיסוי אוטוסקופ ילד','אריזה 100 יח',20.00,0,34,3,1),(173,'כיסוי אוטוסקופ מבוגר','אריזה 100 יח',20.00,0,34,3,1),(174,'פח מחטים + מכסה','יח',20.00,0,34,6,1),(175,'ג\'ל','יח',20.00,0,34,6,1),(176,'טובוס 2.5','יח',30.00,0,19,4,1),(177,'טובוס 3','יח',30.00,0,19,4,1),(178,'טובוס 3.5','יח',30.00,0,19,4,1),(179,'טובוס 4','יח',30.00,0,19,4,1),(180,'טובוס 4.5','יח',30.00,0,19,4,1),(181,'טובוס 5','יח',30.00,0,19,4,1),(182,'טובוס 5.5','יח',30.00,0,19,4,1),(183,'טובוס 6','יח',30.00,0,19,4,1),(184,'טובוס 6.5','יח',30.00,0,19,4,1),(185,'טובוס 7','יח',30.00,0,19,4,1),(186,'טובוס 7.5','יח',30.00,0,19,4,1),(187,'טובוס 8','יח',30.00,0,19,4,1),(188,'טובוס 8.5','יח',30.00,0,19,4,1),(189,'טובוס 9','יח',30.00,0,19,4,1),(190,'ביג/NIO מבוגר','יח',300.00,1,19,4,1),(191,'ביג/NIO ילד','יח',300.00,1,19,4,1),(192,'להב לרינגוסקופ מילר (מעוכל) 1','יח',400.00,1,19,5,1),(193,'להב לרינגוסקופ מילר (מעוכל) 2','יח',400.00,1,19,5,1),(194,'להב לרינגוסקופ מילר (מעוכל) 3','יח',400.00,1,19,5,1),(195,'להב לרינגוסקופ מילר (מעוכל) 4','יח',400.00,1,19,5,1),(196,'להב לרינגוסקופ מקינטוש (ישר) 0','יח',400.00,1,19,5,1),(197,'להב לרינגוסקופ מקינטוש (ישר) 1','יח',400.00,1,19,5,1),(198,'להב לרינגוסקופ מקינטוש (ישר) 2','יח',400.00,1,19,5,1),(199,'להב לרינגוסקופ מקינטוש (ישר) 3','יח',400.00,1,19,5,1),(200,'להב לרינגוסקופ מקינטוש (ישר) 4','יח',400.00,1,19,5,1),(201,'סוללה ללרינגוסקופ','יח',40.00,0,19,6,1),(202,'נורה ללרינגוסקופ','יח',40.00,0,19,6,1),(203,'LMA 1','יח',50.00,0,19,6,1),(204,'LMA 2','יח',50.00,0,19,6,1),(205,'LMA 3','יח',50.00,0,19,6,1),(206,'LMA 4','יח',50.00,0,19,6,1),(207,'LMA 5','יח',50.00,0,19,6,1),(208,'שרוך לטובוס','יח',10.00,0,19,6,1),(209,'פלומבה לציוד החייאה','10 יח',10.00,0,19,6,1),(210,'קטטר לסאקשן','10 יח',40.00,0,19,6,1),(211,'נתיב אוויר 0','יח',40.00,0,19,4,1),(212,'נתיב אוויר 1','יח',40.00,0,19,4,1),(213,'נתיב אוויר 2','יח',40.00,0,19,4,1),(214,'נתיב אוויר 3','יח',40.00,0,19,4,1),(215,'נתיב אוויר 4','יח',40.00,0,19,4,1),(216,'מסנן ויראלי לאמבו','יח',40.00,0,19,4,1),(217,'אמבו ילד','יח',160.00,1,19,4,1),(218,'אמבו מבוגר','יח',160.00,1,19,4,1),(219,'מסכת אמבו יילוד','יח',130.00,1,19,4,1),(220,'מסכת אמבו תינוק','יח',130.00,1,19,4,1),(221,'מסכת אמבו ילד','יח',130.00,1,19,4,1),(222,'מסכת אמבו מבוגר','יח',130.00,1,19,4,1);
/*!40000 ALTER TABLE `equpment_app_equpment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equpment_app_equpmentcategory`
--

DROP TABLE IF EXISTS `equpment_app_equpmentcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equpment_app_equpmentcategory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equpment_app_equpmentcategory`
--

LOCK TABLES `equpment_app_equpmentcategory` WRITE;
/*!40000 ALTER TABLE `equpment_app_equpmentcategory` DISABLE KEYS */;
INSERT INTO `equpment_app_equpmentcategory` VALUES (1,'אורטופדיה'),(2,'חבישות וגאזות'),(18,'חדר הלם'),(34,'חדרי בדיקה'),(17,'טריאז'),(32,'כפפות'),(3,'לקיחת דמים ועירוי'),(9,'לקיחת שתן'),(4,'מחטים ומזרקים'),(6,'מיכשור ביוכומיה'),(7,'מכשיר טרופונין'),(5,'מכשיר ספירה'),(21,'מסכות חמצן ואנהלציה'),(11,'מעבדה אחר'),(10,'מעבדה שתן'),(12,'סטרליזציה'),(14,'ציוד אחר לא מתכלה'),(13,'ציוד בשימוש הרופאים'),(16,'ציוד תפירה'),(19,'תיק החייאה'),(8,'תרביות');
/*!40000 ALTER TABLE `equpment_app_equpmentcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equpment_app_order`
--

DROP TABLE IF EXISTS `equpment_app_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equpment_app_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `datetime` datetime(6) NOT NULL,
  `branch_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `equpment_app_order_user_id_7f1a5c9f_fk_equpment_app_user_id` (`user_id`),
  KEY `equpment_app_order_branch_id_a8604029_fk_equpment_app_branch_id` (`branch_id`),
  CONSTRAINT `equpment_app_order_branch_id_a8604029_fk_equpment_app_branch_id` FOREIGN KEY (`branch_id`) REFERENCES `equpment_app_branch` (`id`),
  CONSTRAINT `equpment_app_order_user_id_7f1a5c9f_fk_equpment_app_user_id` FOREIGN KEY (`user_id`) REFERENCES `equpment_app_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equpment_app_order`
--

LOCK TABLES `equpment_app_order` WRITE;
/*!40000 ALTER TABLE `equpment_app_order` DISABLE KEYS */;
INSERT INTO `equpment_app_order` VALUES (23,'2024-07-16 12:13:27.057386',2,3),(24,'2024-07-17 11:25:45.670641',2,3),(25,'2024-07-17 11:25:55.077578',2,3),(26,'2024-07-17 11:26:09.959819',2,3),(27,'2024-07-17 11:26:40.938247',2,3),(28,'2024-07-17 11:26:56.303056',15,3),(29,'2024-07-17 11:27:08.504264',15,3),(30,'2024-07-17 11:27:19.946683',15,3),(31,'2024-07-17 11:27:33.533989',15,3),(32,'2024-07-17 11:27:54.524036',17,3),(33,'2024-07-17 11:28:02.860319',17,3),(34,'2024-07-17 11:28:07.521256',17,3),(35,'2024-07-17 11:28:15.118579',17,3),(36,'2024-07-17 11:28:31.946274',3,3),(37,'2024-07-17 11:28:36.533885',3,3),(38,'2024-07-17 11:28:44.779752',3,3),(39,'2024-07-17 11:28:51.577037',3,3);
/*!40000 ALTER TABLE `equpment_app_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equpment_app_orderdetails`
--

DROP TABLE IF EXISTS `equpment_app_orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equpment_app_orderdetails` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `approved_to_ship` tinyint(1) NOT NULL,
  `recived` tinyint(1) NOT NULL,
  `item_id` bigint NOT NULL,
  `order_id` bigint NOT NULL,
  `sent_to_supplier` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `equpment_app_order_d_item_id_7d6288d5_fk_equpment_` (`item_id`),
  KEY `equpment_app_orderde_order_id_dbc49297_fk_equpment_` (`order_id`),
  CONSTRAINT `equpment_app_order_d_item_id_7d6288d5_fk_equpment_` FOREIGN KEY (`item_id`) REFERENCES `equpment_app_equpment` (`id`),
  CONSTRAINT `equpment_app_orderde_order_id_dbc49297_fk_equpment_` FOREIGN KEY (`order_id`) REFERENCES `equpment_app_order` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=210 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equpment_app_orderdetails`
--

LOCK TABLES `equpment_app_orderdetails` WRITE;
/*!40000 ALTER TABLE `equpment_app_orderdetails` DISABLE KEYS */;
INSERT INTO `equpment_app_orderdetails` VALUES (103,10,1,1,76,23,1),(104,2,1,1,77,23,1),(105,1,1,1,125,23,1),(106,1,1,1,126,23,1),(107,1,1,1,127,23,1),(108,5,1,1,134,23,1),(109,1,1,1,148,23,1),(110,5,1,1,34,23,1),(111,6,1,1,53,23,1),(112,3,1,1,56,23,1),(113,3,1,1,57,23,1),(114,1,1,0,146,24,0),(115,1,1,0,147,24,0),(116,1,0,0,148,24,0),(117,1,0,0,150,24,0),(118,1,0,0,105,24,0),(119,1,0,0,106,24,0),(120,1,0,0,139,24,0),(121,1,1,0,140,24,0),(122,1,1,0,124,24,0),(123,1,1,0,125,24,0),(124,3,1,0,134,24,0),(125,1,1,0,5,25,1),(126,1,1,0,6,25,1),(127,1,1,0,11,25,1),(128,1,1,0,12,25,1),(129,1,1,0,13,25,1),(130,1,1,0,22,26,1),(131,1,1,0,23,26,1),(132,1,1,0,24,26,1),(133,1,1,0,28,26,1),(134,1,1,0,36,26,1),(135,1,1,0,39,26,1),(136,1,1,0,40,26,1),(137,1,1,0,135,27,1),(138,1,1,0,136,27,1),(139,1,1,0,137,27,1),(140,1,1,0,76,27,1),(141,1,1,0,77,27,1),(142,1,1,0,78,27,0),(143,1,1,0,79,27,0),(144,1,1,0,83,28,1),(145,1,1,0,84,28,1),(146,1,1,0,85,28,1),(147,1,1,0,86,28,1),(148,1,1,0,76,29,0),(149,1,1,0,77,29,0),(150,1,1,0,91,29,0),(151,1,1,0,90,29,0),(152,1,1,0,196,29,0),(153,1,1,0,197,29,0),(154,1,1,0,78,30,1),(155,1,0,0,79,30,0),(156,1,0,0,80,30,0),(157,1,0,0,81,30,0),(158,1,1,0,82,30,1),(159,1,1,0,110,30,0),(160,1,1,0,111,30,0),(161,1,1,0,112,30,0),(162,1,1,0,95,31,1),(163,1,1,0,96,31,1),(164,2,1,0,97,31,1),(165,1,1,0,98,31,1),(166,1,0,0,148,31,0),(167,1,0,0,149,31,0),(168,1,1,0,21,31,0),(169,1,1,0,22,31,0),(170,1,1,0,41,32,0),(171,1,0,0,42,32,0),(172,1,0,0,43,32,0),(173,1,0,0,44,32,0),(174,1,1,0,112,32,1),(175,1,1,0,113,32,1),(176,1,1,0,114,32,1),(177,1,1,0,115,32,1),(178,1,1,0,78,33,1),(179,1,0,0,79,33,0),(180,1,0,0,80,33,0),(181,1,0,0,25,33,0),(182,1,1,0,26,33,0),(183,1,1,0,28,33,0),(184,1,1,0,94,34,1),(185,1,1,0,95,34,1),(186,1,1,0,96,34,1),(187,1,1,1,158,35,1),(188,1,1,1,157,35,1),(189,1,1,1,156,35,1),(190,1,1,1,179,35,1),(191,1,1,1,180,35,1),(192,1,1,0,111,36,1),(193,2,1,0,112,36,1),(194,1,1,0,113,36,1),(195,1,1,0,114,36,1),(196,1,1,0,115,36,1),(197,1,1,0,117,36,1),(198,1,0,0,106,37,0),(199,1,0,0,107,37,0),(200,1,0,0,108,37,0),(201,1,1,1,149,38,1),(202,1,1,1,148,38,1),(203,1,1,1,146,38,1),(204,1,1,1,145,38,1),(205,1,1,0,22,39,0),(206,1,1,0,23,39,0),(207,1,1,0,24,39,0),(208,1,1,0,178,39,1),(209,1,1,0,179,39,1);
/*!40000 ALTER TABLE `equpment_app_orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equpment_app_supplier`
--

DROP TABLE IF EXISTS `equpment_app_supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equpment_app_supplier` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `contact` varchar(500) NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equpment_app_supplier`
--

LOCK TABLES `equpment_app_supplier` WRITE;
/*!40000 ALTER TABLE `equpment_app_supplier` DISABLE KEYS */;
INSERT INTO `equpment_app_supplier` VALUES (1,'Meditecnica','Moshe Cohen 0531234569',1),(2,'Lab Materials','Hedva Aharon 0531234560',1),(3,'Whelech Alyn','Boris Yossef 0531234568',1),(4,'Braun','Tal Shahar 0502222222',1),(5,'Phillips','Hava Gaula 0512365236',1),(6,'LifeLine','Tommy Din 054256398',1);
/*!40000 ALTER TABLE `equpment_app_supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equpment_app_user`
--

DROP TABLE IF EXISTS `equpment_app_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equpment_app_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(254) NOT NULL,
  `default_branch_id` bigint NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_staff` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `equpment_app_user_default_branch_id_084532ef_fk_equpment_` (`default_branch_id`),
  CONSTRAINT `equpment_app_user_default_branch_id_084532ef_fk_equpment_` FOREIGN KEY (`default_branch_id`) REFERENCES `equpment_app_branch` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equpment_app_user`
--

LOCK TABLES `equpment_app_user` WRITE;
/*!40000 ALTER TABLE `equpment_app_user` DISABLE KEYS */;
INSERT INTO `equpment_app_user` VALUES (1,'Admin','FirstAdmin','pbkdf2_sha256$720000$b0gLRcRmPwKvuoHj5RiZfZ$nA+rj5b2XCzUfpX7gh3dk9uC/r1GDEzz+CRgVYdO3XI=','admin@example.com',1,1,1,NULL,1),(2,'Dan John','dan_john1992','pbkdf2_sha256$720000$AlG1E9mg6auQqDxfujVUyZ$UfGkhrJ358CEhmqQc2SuizvMm0dH5GoS8ZXnDockdSY=','danjohn1992@example.com',5,1,0,NULL,0),(3,'בטי לין','betty12345','pbkdf2_sha256$720000$dRyU8yREnJPn6hiSJKtIUp$ealRbMvVqpOezYctte9Y/sIugEiWtqaO11+vNvinw9g=','betty123@example.com',2,1,0,NULL,0),(4,'אלקס לוין','alex123','pbkdf2_sha256$720000$JlNYNYiwSaEXG5rXSu5jvB$ITBLGT1PgX1/Y9AA6JSqGgETcQnZneIJQMRILqmWzwU=','alex123@gmail.com',5,1,0,NULL,0),(5,'אלונה סמיט','alona123','pbkdf2_sha256$720000$vAbRpnEIvapEnIQeS4HdBn$DwxzA+mnTdJ8+sONbA9y6Jip33dZGuLyjWZcSkYv9y8=','alona123@example.com',9,1,0,NULL,0),(6,'מיכאל דניס','michaeld','pbkdf2_sha256$720000$1QJtmOaNZiaZvJJVCI5RX1$xONYhJO2mnJVKaoeXZACEBocl6b83Ik+y8KzUPlCvxA=','michaeld@gmail.com',12,1,0,NULL,0);
/*!40000 ALTER TABLE `equpment_app_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equpment_app_user_groups`
--

DROP TABLE IF EXISTS `equpment_app_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equpment_app_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `equpment_app_user_groups_user_id_group_id_68501169_uniq` (`user_id`,`group_id`),
  KEY `equpment_app_user_groups_group_id_d070ae66_fk_auth_group_id` (`group_id`),
  CONSTRAINT `equpment_app_user_gr_user_id_7e99339e_fk_equpment_` FOREIGN KEY (`user_id`) REFERENCES `equpment_app_user` (`id`),
  CONSTRAINT `equpment_app_user_groups_group_id_d070ae66_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equpment_app_user_groups`
--

LOCK TABLES `equpment_app_user_groups` WRITE;
/*!40000 ALTER TABLE `equpment_app_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `equpment_app_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equpment_app_user_user_permissions`
--

DROP TABLE IF EXISTS `equpment_app_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equpment_app_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `equpment_app_user_user_p_user_id_permission_id_79d06bbb_uniq` (`user_id`,`permission_id`),
  KEY `equpment_app_user_us_permission_id_5d92149b_fk_auth_perm` (`permission_id`),
  CONSTRAINT `equpment_app_user_us_permission_id_5d92149b_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `equpment_app_user_us_user_id_c2c27b0c_fk_equpment_` FOREIGN KEY (`user_id`) REFERENCES `equpment_app_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equpment_app_user_user_permissions`
--

LOCK TABLES `equpment_app_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `equpment_app_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `equpment_app_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-21 16:33:48

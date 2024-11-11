-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: recipe_db
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (5,'Desserts'),(4,'Drinks'),(1,'Meals'),(3,'Salad'),(2,'Vegetarian');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `featured`
--

DROP TABLE IF EXISTS `featured`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `featured` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `featured_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `featured`
--

LOCK TABLES `featured` WRITE;
/*!40000 ALTER TABLE `featured` DISABLE KEYS */;
INSERT INTO `featured` VALUES (5,15),(1,17),(2,18),(3,19),(4,21);
/*!40000 ALTER TABLE `featured` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe`
--

DROP TABLE IF EXISTS `recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `owner` int NOT NULL,
  `ownername` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `ingredients` text NOT NULL,
  `instructions` text NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `rating` float DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `owner` (`owner`),
  CONSTRAINT `recipe_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `user` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe`
--

LOCK TABLES `recipe` WRITE;
/*!40000 ALTER TABLE `recipe` DISABLE KEYS */;
INSERT INTO `recipe` VALUES (13,12,'user','Chicken Curry','500g chicken, cut into pieces\r\n2 tablespoons vegetable oil\r\n1 large onion, finely chopped\r\n2 cloves garlic, minced\r\n1 tablespoon ginger, minced\r\n2 tomatoes, chopped\r\n1/2 cup yogurt\r\n2 tablespoons curry powder\r\n1 teaspoon turmeric\r\n1 teaspoon cumin\r\n1 teaspoon coriander\r\n1 teaspoon garam masala\r\n1 cup water\r\nSalt to taste\r\nFresh cilantro for garnish','1. Heat oil in a large pan over medium heat. Add onions and cook until golden brown.\r\n2. Add garlic and ginger, and cook for another minute.\r\n3. Add tomatoes and cook until they break down.\r\n4. Stir in the curry powder, turmeric, cumin, coriander, and garam masala.\r\n5. Add chicken pieces and cook until they are browned on all sides.\r\n6. Stir in yogurt and cook for a few minutes.\r\n7. Pour in water and bring to a boil. Reduce heat and simmer for 20-25 minutes until chicken is cooked through.\r\n8. Season with salt to taste.\r\n9. Garnish with fresh cilantro before serving.','Meals','images/recipes/13.webp',0),(14,12,'user','Palak Paneer','200g paneer, cubed\r\n300g spinach leaves, washed and chopped\r\n2 tablespoons vegetable oil\r\n1 large onion, finely chopped\r\n2 cloves garlic, minced\r\n1 tablespoon ginger, minced\r\n2 tomatoes, chopped\r\n1 teaspoon cumin seeds\r\n1 teaspoon coriander powder\r\n1/2 teaspoon turmeric powder\r\n1 teaspoon garam masala\r\n1/2 cup cream\r\nSalt to taste','1. Blanch spinach leaves in boiling water for 2 minutes. Drain and blend into a smooth paste.\r\n2. Heat oil in a pan, add cumin seeds, and let them splutter.\r\n3. Add onions and cook until golden brown.\r\n4. Add garlic and ginger, and cook for another minute.\r\n5. Add tomatoes and cook until they are soft.\r\n6. Stir in coriander powder, turmeric powder, and garam masala.\r\n7. Add spinach paste and cook for 5 minutes.\r\n8. Stir in cream and cook for another 2 minutes.\r\n9. Add paneer cubes and cook for 5 minutes.\r\n10. Season with salt to taste.','Vegetarian','images/recipes/14.webp',0),(15,12,'user','Aloo Gobi','1 large cauliflower, cut into florets\r\n3 large potatoes, peeled and cubed\r\n2 tablespoons vegetable oil\r\n1 large onion, finely chopped\r\n2 cloves garlic, minced\r\n1 tablespoon ginger, minced\r\n2 tomatoes, chopped\r\n1 teaspoon cumin seeds\r\n1 teaspoon turmeric powder\r\n1 teaspoon coriander powder\r\n1 teaspoon cumin powder\r\n1 teaspoon garam masala\r\nSalt to taste','1. Heat oil in a pan over medium heat. Add cumin seeds and let them splutter.\r\n2. Add onions and cook until golden brown.\r\n3. Add garlic and ginger, and cook for another minute.\r\n4. Add tomatoes and cook until they are soft.\r\n5. Stir in turmeric powder, coriander powder, cumin powder, and garam masala.\r\n6. Add potatoes and cauliflower, and mix well.\r\n7. Cover and cook on low heat for 15-20 minutes, stirring occasionally, until vegetables are tender.\r\n8. Season with salt to taste.\r\n9. Garnish with fresh cilantro before serving.','Vegetarian','images/recipes/15.webp',0),(16,12,'user','Chickpea Curry','1 cup dried chickpeas, soaked overnight and drained\r\n2 tablespoons vegetable oil\r\n1 large onion, finely chopped\r\n2 cloves garlic, minced\r\n1 tablespoon ginger, minced\r\n2 tomatoes, chopped\r\n1 teaspoon cumin seeds\r\n1 teaspoon turmeric powder\r\n1 teaspoon coriander powder\r\n1 teaspoon cumin powder\r\n1 teaspoon garam masala\r\n1/2 teaspoon baking soda\r\n3 cups water\r\nSalt to taste','1. In a pressure cooker, heat oil and add cumin seeds.\r\n2. Add onions and cook until golden brown.\r\n3. Add garlic and ginger, and cook for another minute.\r\n4. Add tomatoes and cook until they are soft.\r\n5. Stir in turmeric powder, coriander powder, cumin powder, and garam masala.\r\n6. Add chickpeas, baking soda, and water. Mix well.\r\n7. Close the pressure cooker and cook for 20-25 minutes, until chickpeas are tender.\r\n8. Season with salt to taste.\r\n9. Garnish with fresh cilantro before serving.','Meals','images/recipes/16.webp',0),(17,12,'user','Paneer Tikka','250g paneer, cut into cubes\r\n1/2 cup plain yogurt\r\n1 tablespoon lemon juice\r\n1 tablespoon ginger-garlic paste\r\n1 teaspoon turmeric powder\r\n1 teaspoon cumin powder\r\n1 teaspoon paprika\r\n1 teaspoon garam masala\r\n1 tablespoon vegetable oil\r\nSalt to taste\r\nSkewers','1. In a bowl, mix yogurt, lemon juice, ginger-garlic paste, turmeric, cumin powder, paprika, garam masala, and oil.\r\n2. Add paneer cubes and marinate for at least 2 hours.\r\n3. Preheat the oven to 200°C (400°F).\r\n4. Thread the marinated paneer onto skewers.\r\n5. Place skewers on a baking sheet and bake for 15-20 minutes, turning occasionally, until paneer is slightly charred.\r\n6. Serve hot with mint chutney.','Vegetarian','images/recipes/17.webp',0),(18,12,'user','Raita','1 cup plain yogurt\r\n1 cucumber, grated\r\n1 tomato, finely chopped\r\n1 small onion, finely chopped\r\n2 tablespoons chopped fresh cilantro\r\n1/2 teaspoon cumin powder\r\n1/2 teaspoon chaat masala\r\nSalt to taste','1. In a bowl, whisk yogurt until smooth.\r\n2. Add grated cucumber, chopped tomato, onion, and cilantro.\r\n3. Stir in cumin powder, chaat masala, and salt.\r\n4. Mix well and refrigerate until ready to serve.','Salad','images/recipes/18.webp',0),(19,12,'user','Butter Chicken','500g chicken, cut into pieces\r\n2 tablespoons butter\r\n1 large onion, finely chopped\r\n2 cloves garlic, minced\r\n1 tablespoon ginger, minced\r\n2 tomatoes, chopped\r\n1/2 cup cream\r\n1/2 cup yogurt\r\n2 tablespoons tomato paste\r\n1 tablespoon curry powder\r\n1 teaspoon turmeric powder\r\n1 teaspoon garam masala\r\nSalt to taste\r\nFresh cilantro for garnish','1. Heat butter in a pan, add onions and cook until golden brown.\r\n2. Add garlic and ginger, and cook for another minute.\r\n3. Add tomatoes and cook until soft.\r\n4. Stir in curry powder, turmeric, and garam masala.\r\n5. Add chicken pieces and cook until they are browned on all sides.\r\n6. Stir in yogurt, cream, and tomato paste.\r\n7. Cook for 20 minutes, until chicken is cooked through.\r\n8. Season with salt to taste.\r\n9. Garnish with fresh cilantro before serving.','Meals','images/recipes/19.webp',2),(20,12,'user','Masoor Dal','1 cup red lentils\r\n2 tablespoons vegetable oil\r\n1 large onion, finely chopped\r\n2 cloves garlic, minced\r\n1 tablespoon ginger, minced\r\n2 tomatoes, chopped\r\n1 teaspoon cumin seeds\r\n1 teaspoon turmeric powder\r\n1 teaspoon coriander powder\r\n1 teaspoon cumin powder\r\n1 teaspoon garam masala\r\n4 cups water\r\nSalt to taste','1. Rinse lentils and set aside.\r\n2. Heat oil in a pot, add cumin seeds and let them splutter.\r\n3. Add onions and cook until golden brown.\r\n4. Add garlic and ginger, and cook for another minute.\r\n5. Add tomatoes and cook until they are soft.\r\n6. Stir in turmeric powder, coriander powder, cumin powder, and garam masala.\r\n7. Add lentils and water. Bring to a boil.\r\n8. Reduce heat and simmer for 20-25 minutes, until lentils are tender.\r\n9. Season with salt to taste.','Meals','images/recipes/20.webp',0),(21,12,'user','Mango Lassi','1 cup plain yogurt\r\n1 cup ripe mango, peeled and chopped\r\n1/2 cup milk\r\n2 tablespoons sugar\r\nA pinch of cardamom powder\r\nIce cubes','1. In a blender, combine yogurt, mango, milk, sugar, and cardamom powder.\r\n2. Blend until smooth.\r\n3. Add ice cubes and blend again.\r\n4. Serve chilled.','Drinks','images/recipes/21.webp',0),(22,12,'user','Gulab Jamun','1 cup milk powder\r\n1/4 cup all-purpose flour\r\n1/4 cup ghee\r\n1/4 cup milk\r\n1/4 teaspoon baking powder\r\nOil for frying\r\n1 cup sugar\r\n1 cup water\r\n1/2 teaspoon rose water','1. In a bowl, mix milk powder, flour, baking powder, and ghee. Gradually add milk to form a smooth dough.\r\n2. Shape the dough into small balls.\r\n3. Heat oil in a pan and fry the balls until golden brown.\r\n4. For the syrup: Combine sugar and water in a pan and bring to a boil. Simmer for 5 minutes and add rose water.\r\n5. Soak fried balls in warm syrup for at least 1 hour before serving.','Desserts','images/recipes/22.webp',0),(23,12,'user','Chai','2 cups water\r\n1 cup milk\r\n2 tablespoons black tea leaves\r\n2 tablespoons sugar\r\n1/2 inch ginger, sliced\r\n2-3 green cardamom pods, crushed','1. In a pot, bring water to a boil with ginger and cardamom.\r\n2. Add tea leaves and sugar, and boil for 2 minutes.\r\n3. Add milk and bring to a boil again.\r\n4. Strain into cups and serve hot.','Drinks','images/recipes/23.webp',0),(24,12,'user','Dosa','1 cup rice\r\n1/2 cup urad dal (split black gram)\r\n1/4 teaspoon fenugreek seeds\r\n1/2 teaspoon salt\r\nWater as needed','1. Soak rice, urad dal, and fenugreek seeds in water for 6-8 hours.\r\n2. Drain and blend into a smooth batter, adding water as needed.\r\n3. Ferment the batter in a warm place for 8-12 hours.\r\n4. Heat a non-stick skillet and pour a ladleful of batter, spreading it in a thin circle.\r\n5. Cook until edges turn golden, then flip and cook the other side.\r\n6. Serve hot with chutney and sambar.','Meals','images/recipes/24.webp',0);
/*!40000 ALTER TABLE `recipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `rating` int NOT NULL,
  `comment` text,
  PRIMARY KEY (`_id`),
  KEY `recipe_id` (`recipe_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`_id`) ON DELETE CASCADE,
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (9,19,12,'user',4,'nice dish'),(10,19,12,'user',0,'😁');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `place` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'admin','admin@gmail.com','Cloud',911,'8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',1),(12,'user','user@gmail.com','nowhere',20,'04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb',0),(13,'tester','tester@gmail.com','whereyouwantme',30,'aaa23f070015852b016339c615f761c628c5d149aa99c7d1eeab8a38cbd9e7a2',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-12  1:34:06

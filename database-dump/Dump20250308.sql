CREATE DATABASE  IF NOT EXISTS "SpritX_Nexus_01";
USE `SpritX_Nexus_01`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users` WRITE;

INSERT INTO `users` VALUES (8,'birunthaban','$2b$10$oGgE9ZpmF3WwNKB2gS2.p.IatiVYl3zmBdpxbv6e.eCCZv0xWdUPS','2025-03-08 07:14:38'),(9,'biruntha','$2b$10$zCQ9DEmliZ3T54QOrBen.uz.Sx2XjXHQBX0OTPnyTAIgBxCPk4NBK','2025-03-08 07:28:29'),(11,'johnwick','$2b$10$OiG3BcS1lCVRylewdpRxCe9bgYnNR5Rgtyq.bf/aE1yKHGc0czdsG','2025-03-08 07:40:06'),(13,'johndoe7','$2b$10$7gGUQPe9XnfUbAfcQPmCVeGEGAZkGCxbbJxrY4QVcoHBp1DFQXzSy','2025-03-08 09:26:00'),(14,'parishith','$2b$10$Wif176tlBvCSi2KsMMDtQ.UpHLh4ZisqBUlO1Kuhr2m5DsAXtuXju','2025-03-08 09:51:20');

UNLOCK TABLES;

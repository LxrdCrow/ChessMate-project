-- Creazione tabella utenti (che sono anche i giocatori)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `rating` INT(11) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabella partite
CREATE TABLE IF NOT EXISTS `chessgames` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `opponent_name` VARCHAR(255) NOT NULL,
  `color_played` ENUM('white', 'black') NOT NULL,
  `opening` VARCHAR(255),
  `result` ENUM('win', 'loss', 'draw') NOT NULL,
  `comments` TEXT,
  `tags` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabella annotazioni delle partite
CREATE TABLE IF NOT EXISTS `annotations` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `game_id` INT(11) NOT NULL,
  `annotation_data` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`game_id`) REFERENCES `chessgames`(`id`) ON DELETE CASCADE,
  INDEX (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabella mosse delle partite
CREATE TABLE IF NOT EXISTS `chessmoves` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `game_id` INT(11) NOT NULL,
  `move_data` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`game_id`) REFERENCES `chessgames`(`id`) ON DELETE CASCADE,
  INDEX (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabella rating storici degli utenti
CREATE TABLE IF NOT EXISTS `chessratings` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `rating` INT(11) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabella tornei
CREATE TABLE IF NOT EXISTS `chesstournaments` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabella risultati dei tornei
CREATE TABLE IF NOT EXISTS `chessresults` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `tournament_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `score` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`tournament_id`) REFERENCES `chesstournaments`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX (`tournament_id`),
  INDEX (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




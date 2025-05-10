CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chess_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  platform ENUM('lichess', 'chess.com') NOT NULL,
  username VARCHAR(255) NOT NULL,
  fide_rating INT DEFAULT NULL,
  rapid_rating INT DEFAULT NULL,
  blitz_rating INT DEFAULT NULL,
  bullet_rating INT DEFAULT NULL,
  favorite_opening VARCHAR(255),
  preferred_color ENUM('white', 'black') DEFAULT NULL,
  total_games INT DEFAULT 0,
  win_rate DECIMAL(5,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_platform (user_id, platform)
);


CREATE TABLE IF NOT EXISTS games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  opponent_name VARCHAR(255),
  color ENUM('white', 'black') NOT NULL,
  opening VARCHAR(255),
  result ENUM('win', 'loss', 'draw') NOT NULL,
  played_at DATE,
  comments TEXT,
  tags TEXT, -- es: 'blunder,brilliant,opening trap'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS moves (
  id INT AUTO_INCREMENT PRIMARY KEY,
  game_id INT NOT NULL,
  move_number INT NOT NULL,
  notation VARCHAR(10) NOT NULL, -- es: e4, Nf3, Qxd5
  annotation ENUM('brilliant', 'good', 'inaccuracy', 'mistake', 'blunder', 'none') DEFAULT 'none',
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  category ENUM('opening', 'middlegame', 'endgame', 'other') NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reflections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  game_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);





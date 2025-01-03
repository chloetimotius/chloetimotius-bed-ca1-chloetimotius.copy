// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE SQL STATEMENTS
// ##############################################################
const SQLSTATEMENT = `
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS UserCompletion;
DROP TABLE IF EXISTS FitnessChallenge;
DROP TABLE IF EXISTS Ability;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Faction;

SET FOREIGN_KEY_CHECKS = 1;

-- Creating Faction table with character_name
CREATE TABLE Faction (
  faction_id INT PRIMARY KEY AUTO_INCREMENT,
  faction_name TEXT NOT NULL,
  character_name TEXT NOT NULL 
);

-- Creating User table
CREATE TABLE User (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username TEXT NOT NULL,
  skillpoints INT DEFAULT 0,
  faction_id INT,
  FOREIGN KEY (faction_id) REFERENCES Faction(faction_id)
);

-- Creating FitnessChallenge table
CREATE TABLE FitnessChallenge (
  challenge_id INT PRIMARY KEY AUTO_INCREMENT,
  creator_id INT NOT NULL,
  challenge TEXT NOT NULL,
  skillpoints INT NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES User(user_id)
);

-- Creating UserCompletion table
CREATE TABLE UserCompletion (
  complete_id INT PRIMARY KEY AUTO_INCREMENT,
  challenge_id INT NOT NULL,
  user_id INT NOT NULL,
  completed BOOL NOT NULL,
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  FOREIGN KEY (challenge_id) REFERENCES FitnessChallenge(challenge_id),
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Creating Ability table
CREATE TABLE Ability (
  ability_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  character_name TEXT NOT NULL,
  ability_name TEXT NOT NULL,
  level INT DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Inserting initial data into Faction table
INSERT INTO Faction (faction_name, character_name) VALUES
('Armed Detective Agency', 'Atsushi Nakajima'),
('Port Mafia', 'Osamu Dazai'),
('Guild', 'Edgar Allan Poe'),
('The Rats in the House of the Dead', 'Fyodor Dostoevsky'),
('Decay of Angels', 'Nikolai Gogol');

-- Inserting initial data into User table
INSERT INTO User (username, faction_id, skillpoints) VALUES
('socuser321', 1, 50),  -- Associated with Armed Detective Agency, 50 skillpoints
('fitnessKing', 2, 75),  -- Associated with Port Mafia, 75 skillpoints
('quickRunner', 3, 100), -- Associated with Guild, 100 skillpoints
('ratRunner', 4, 500),  -- Associated with The Rats in the House of the Dead, 200 skillpoints
('puritySprinter', 5, 200); -- Associated with Decay of Angels, 50 skillpoints

-- Inserting challenges into FitnessChallenge table
INSERT INTO FitnessChallenge (creator_id, challenge, skillpoints) VALUES
(1, 'Complete 2.4km within 15 minutes', 50),
(1, 'Cycle around the island for at least 50km', 100),
(2, 'Complete a full marathon (42.2km)', 200),
(2, 'Hold a plank for 5 minutes', 50),
(2, 'Perform 100 push-ups in one session', 75);

-- Inserting completion records into UserCompletion table
INSERT INTO UserCompletion (challenge_id, user_id, completed, notes) VALUES
(1, 1, TRUE, 'Completed in 12 minutes'),
(2, 1, FALSE, 'Attempted 30km, did not finish'),
(3, 2, TRUE, 'Full marathon completed in 4 hours');

-- Inserting abilities into Ability table
INSERT INTO Ability (user_id, character_name, ability_name, level) VALUES
(1, 'Atsushi Nakajima', 'Beast Beneath the Moonlight', 1),  -- Atsushi
(2, 'Osamu Dazai', 'No Longer Human', 1),                   -- Dazai
(1, 'Doppo Kunikida', 'Perfect Plan', 1);                   -- Kunikida
`;

// ##############################################################
// RUN SQL STATEMENTS
// ##############################################################
pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created and data inserted successfully");
  }
  process.exit();
});

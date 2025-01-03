// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE SELECT ALL OPERATIONS FOR ABILITIES
// ##############################################################
/*
  This function retrieves all abilities from the database.
  It fetches every entry from the `Ability` table.
*/
module.exports.selectAll = (callback) => {
        const SQLSTATMENT = `
          SELECT * FROM Ability;
          `;
    
        pool.query(SQLSTATMENT, callback);
    };

// ###############################################################################
// DEFINE SELECT ALL OPERATIONS FOR LEADERBOARD RANKING OF FACTIONS BY SKILLPOINTS
// ###############################################################################
/*
  This function retrieves the leaderboard ranking of factions based on the total skill points accumulated by their members.
  It calculates the total skill points for each faction by summing up the skill points of all users in the faction.
  The results are ordered by `total_skillpoints` in descending order.
*/
module.exports.selectAllLeaderboardRanking = (callback) =>
    {
        const SQLSTATMENT = `
            SELECT F.faction_name, SUM(U.skillpoints) AS total_skillpoints
            FROM Faction F
            JOIN User U ON F.faction_id = U.faction_id
            GROUP BY F.faction_id
            ORDER BY total_skillpoints DESC;
           `;
    
        pool.query(SQLSTATMENT, callback);
    };

// ##############################################################
// DEFINE FUNCTION TO CHECK IF CHARACTER NAME IS ALREADY TAKEN
// ##############################################################
/*
  This function checks if a character name is already taken by another user.
  It ensures that the character name is unique for each user by checking against existing entries in the `Ability` table.
*/
module.exports.checkCharacterNameTaken = (character_name, user_id, callback) => {
    const SQLSTATEMENT = `
      SELECT * FROM Ability WHERE character_name = ? AND user_id != ?;
    `;
    
    pool.query(SQLSTATEMENT, [character_name, user_id], callback);
};

// ##############################################################
// DEFINE INSERT OPERATION FOR ABILITY
// ##############################################################
/*
  This function inserts a new ability into the `Ability` table.
  The function expects `user_id`, `character_name`, `ability_name`, and `level` to be passed as data.
*/
module.exports.insertAbility = (data, callback) => {
    const SQLSTATEMENT = `
      INSERT INTO Ability (user_id, character_name, ability_name, level) 
      VALUES (?, ?, ?, ?);
    `;
    
    pool.query(SQLSTATEMENT, [data.user_id, data.character_name, data.ability_name, data.level], callback);
};

// ##############################################################
// DEFINE UPDATE OPERATIONS FOR ABILITY
// ##############################################################
/*
  This function updates the details of a specific ability based on the `user_id` and `ability_name`.
  It updates the `ability_name` and `level` for the user identified by `user_id`.
*/
module.exports.updateById = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE Ability
        SET ability_name = ?, level = ?
        WHERE user_id = ?;
    `;
    const VALUES = [data.ability_name, data.level, data.user_id, data.ability_name];
  
    pool.query(SQLSTATEMENT, VALUES, callback);
};
  
// ##############################################################
// DEFINE DELETE OPERATIONS FOR ABIILITY
// ##############################################################
/*
  This function deletes a specific ability from the `Ability` table based on the provided `user_id`.
  It removes the user's ability data.
*/
  module.exports.deleteById = (data, callback) =>
      {
          const SQLSTATMENT = `
            DELETE FROM Ability 
            WHERE user_id = ?;
            `;
          const VALUES = [data.user_id];
      
          pool.query(SQLSTATMENT, VALUES, callback);
      }


// ##############################################################
// DEFINE SELECT OPERATION BY USER ID FOR ABILITY
// ##############################################################
/*
  This function retrieves all abilities associated with a specific `user_id`.
  It filters the results from the `Ability` table by `user_id`.
*/
module.exports.selectByUserId = (user_id, callback) => {
    const SQLSTATEMENT = `
        SELECT * 
        FROM Ability 
        WHERE user_id = ?
    `;
    const VALUES = [user_id]
    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE FUNCTION TO GET TOTAL SKILLPOINTS BY FACTION ID
// ##############################################################
/*
  This function retrieves the total skill points for a faction based on its `faction_id`.
  It sums up the `skillpoints` of all users in the specified faction.
*/
module.exports.getTotalSkillpoints = (faction_id, callback) => {
    const SQLSTATEMENT = `
     SELECT 
     SUM(User.skillpoints) AS total_skillpoints,
     Faction.faction_name AS faction_name
   FROM 
     User
   JOIN 
     Faction ON User.faction_id = Faction.faction_id
   WHERE 
     User.faction_id = ?
    `;
    pool.query(SQLSTATEMENT, [faction_id], callback);  // Execute the query
  };

// ##############################################################
// DEFINE FUNCTION TO CHECK IF CHARACTER IS ALREADY IN THE FACTION
// ##############################################################
/*
  This function checks whether a specific character is already a part of a faction.
  It checks the `Faction` table to see if the character is associated with the given `faction_name`.
*/
module.exports.checkCharacterInFaction = (faction_name, character_name, callback) => {
    const SQLSTATEMENT = `
      SELECT * 
      FROM Faction
      WHERE faction_name = ? AND character_name = ?;
    `;

    pool.query(SQLSTATEMENT, [faction_name, character_name], callback);
};

// ##############################################################
// DEFINE FUNCTION TO GET Faction ID BY Faction Name
// ##############################################################
/*
  This function retrieves the `faction_id` for a given `faction_name`.
  It helps in identifying a faction's unique ID.
*/
module.exports.getFactionIdByName = (faction_name, callback) => {
    const SQLSTATEMENT = `
      SELECT faction_id 
      FROM Faction
      WHERE faction_name = ?;
    `;

    pool.query(SQLSTATEMENT, [faction_name], callback);
};

// ##############################################################
// DEFINE FUNCTION TO ADD CHARACTER TO FACTION
// ##############################################################
/*
  This function adds a character to a faction by inserting the `character_name` and `faction_name` into the `Faction` table.
  It associates the character with the given faction.
*/
module.exports.addCharacterToFaction = (faction_name, character_name, callback) => {
    const SQLSTATEMENT = `
      INSERT INTO Faction (character_name, faction_name)
      VALUES (?, ?);
    `;

    pool.query(SQLSTATEMENT, [character_name, faction_name], callback);
};

// ##############################################################
// DEFINE SELECT OPERATION BY FACTION NAME FOR CHARACTERS
// ##############################################################
/*
  This function retrieves the names of all characters associated with a particular `faction_name`.
  It filters the `Faction` table based on the `faction_name`.
*/
module.exports.selectByFactionName = (faction_name, callback) => {
    const SQLSTATEMENT = `
        SELECT character_name, faction_name
        FROM Faction
        WHERE faction_name = ?;
    `;
    const VALUES = [faction_name];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

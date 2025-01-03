// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE INSERT OPERATION FOR CHALLENGE
// ##############################################################

/*
  Inserts a new challenge record into the FitnessChallenge table.
  - `creator_id`: ID of the challenge creator.
  - `challenge`: description of the challenge.
  - `skillpoints`: Points awarded for completing the challenge.
*/
module.exports.createChallenge = (data, callback) => {
    const SQLSTATEMENT = `
      INSERT INTO FitnessChallenge (creator_id, challenge, skillpoints) 
      VALUES (?, ?, ?);
    `;

    pool.query(SQLSTATEMENT, [data.creator_id, data.challenge, data.skillpoints], callback);
};

// ##############################################################
// DEFINE SELECT ALL OPERATIONS FOR CHALLENGE
// ##############################################################

/*
  Retrieves all challenges from the FitnessChallenge table.
  Returns the challenge details including challenge ID, name, creator, and skill points.
*/
module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
      SELECT challenge_id, challenge, creator_id, skillpoints 
      FROM FitnessChallenge;
    `;
    pool.query(SQLSTATEMENT, callback);
};

// ##############################################################
// DEFINE UPDATE OPERATIONS FOR CHALLENGE
// ##############################################################

/*
  Updates a challenge record by its ID.
  - `creator_id`: ID of the challenge creator.
  - `challenge`: New name/description of the challenge.
  - `skillpoints`: New points awarded for completing the challenge.
  - `challenge_id`: The ID of the challenge to be updated.
*/
module.exports.updateById = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE FitnessChallenge
        SET creator_id = ?, challenge = ?, skillpoints = ?
        WHERE challenge_id = ?;
    `;
    const VALUES = [data.creator_id, data.challenge, data.skillpoints, data.challenge_id];
  
    pool.query(SQLSTATEMENT, VALUES, callback);
  };
  
// ##############################################################
// DEFINE FUNCTION TO CHECK IF ID MATCHES
// ##############################################################

/*
  Retrieves the challenge record by creator_id.
  Returns the challenge details if a match is found.
*/
module.exports.getChallengeById = (creator_id, callback) => {
    const SQLSTATEMENT = `
      SELECT * FROM FitnessChallenge WHERE creator_id = ?;
    `;
    
    pool.query(SQLSTATEMENT, [creator_id], callback);
};


// ##############################################################
// DEFINE DELETE OPERATIONS FOR CHALLENGE
// ##############################################################

/*
  Deletes a challenge record by its challenge_id.
  - `challenge_id`: The ID of the challenge to be deleted.
*/
module.exports.deleteById = (data, callback) =>
    {
        const SQLSTATMENT = `
          DELETE FROM FitnessChallenge 
          WHERE challenge_id = ?;
          `;
        const VALUES = [data.challenge_id];
    
        pool.query(SQLSTATMENT, VALUES, callback);
    }

// ##############################################################
// DEFINE INSERT OPERATION FOR RECORD
// ##############################################################

/*
  Inserts a new user completion record for a challenge.
  - `user_id`: ID of the user completing the challenge.
  - `challenge_id`: ID of the challenge.
  - `completed`: Boolean value indicating if the challenge was completed.
  - `creation_date`: Date the challenge was completed.
  - `notes`: Optional notes about the completion.
*/
module.exports.createRecord = (data, callback) => {
    const SQLSTATEMENT = `
      INSERT INTO UserCompletion (user_id, challenge_id, completed, creation_date, notes) 
      VALUES (?, ?, ?, ?, ?);
    `;

    pool.query(SQLSTATEMENT, [data.user_id, data.challenge_id, data.completed, data.creation_date, data.notes], callback);
};

// ##############################################################
// CHECK WHETHER THE USER EXISTS
// ##############################################################

/*
  Checks if a user exists by their user_id.
  Returns the user details if found.
*/
module.exports.getUserById = (user_id, callback) => {
    const query = 'SELECT * FROM User WHERE user_id = ?';
    pool.query(query, [user_id], (error, results) => {
        if (error) {
            console.error("Error querying user:", error);
            return callback(error, null);
        }
        callback(null, results);
    });
};

// ##############################################################
// GET SKILL POINTS FOR A CHALLENGE
// ##############################################################

/*
  Retrieves the skill points for a specific challenge.
  - `challenge_id`: The ID of the challenge.
*/
module.exports.getSkillPointsForChallenge = (challenge_id, callback) => {
    const query = 'SELECT skillpoints FROM FitnessChallenge WHERE challenge_id = ?';
    pool.query(query, [challenge_id], callback);
};

// ##############################################################
// UPDATE USER SKILL POINTS
// ##############################################################

/*
  Updates a user's skill points.
  - `user_id`: ID of the user whose skill points need to be updated.
  - `skillPoints`: Points to be added to the user's skill points.
*/
module.exports.updateUserSkillPoints = (user_id, skillPoints, callback) => {
    const query = 'UPDATE User SET skillpoints = skillpoints + ? WHERE user_id = ?';
    pool.query(query, [skillPoints, user_id], callback);
};

// ##############################################################
// DEFINE SELECT OPERATION BY ID FOR CHALLENGE
// ##############################################################

/*
  Retrieves user completion records for a specific challenge by its challenge_id.
  - `challenge_id`: The ID of the challenge.
  Returns user completion data including user_id, completion status, creation date, and notes.
*/
module.exports.selectByChallengeId = (challenge_id, callback) => {
    const SQLSTATEMENT = `
        SELECT user_id, completed, creation_date, notes
        FROM UserCompletion
        WHERE challenge_id = ?
    `;
    const VALUES = [challenge_id]
    pool.query(SQLSTATEMENT, VALUES, callback);
};
// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE FUNCTION TO CHECK IF USERNAME EXISTS
// ##############################################################
/*
  Check if a username already exists in the User table.
 */
module.exports.checkUsernameExists = (username, callback) => {
    const SQLSTATEMENT = `
      SELECT * FROM User WHERE username = ?;
    `;
    
    pool.query(SQLSTATEMENT, [username], callback);
};

// ##############################################################
// DEFINE INSERT OPERATION FOR USER
// ##############################################################
/*
  Add a new user to the User table.
 */
module.exports.createUser = (data, callback) => {
    const SQLSTATEMENT = `
      INSERT INTO User (username, skillpoints) 
      VALUES (?, ?);
    `;

    pool.query(SQLSTATEMENT, [data.username, data.skillpoints], callback);
};

// ##############################################################
// DEFINE SELECT ALL OPERATIONS FOR USER
// ##############################################################
/*
  Fetch all users from the User table.
 */
module.exports.selectAll = (callback) =>
    {
        const SQLSTATMENT = `
          SELECT * FROM User;
          `;
    
        pool.query(SQLSTATMENT, callback);
    }

// ##############################################################
// DEFINE UPDATE OPERATIONS FOR USER
// ##############################################################
/*
  Update a user's details by their user_id.
 */
module.exports.updateById = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE User
        SET username = ?, skillpoints = ?
        WHERE user_id = ?;
    `;
    const VALUES = [data.username, data.skillpoints, data.user_id];
  
    pool.query(SQLSTATEMENT, VALUES, callback);
  };
  
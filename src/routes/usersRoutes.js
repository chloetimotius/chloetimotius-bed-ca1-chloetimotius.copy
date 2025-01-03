// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const controller = require('../controllers/usersController');

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get('/', controller.readAllUser); // GET request to retrieve all users
router.post('/', controller.createNewUser); // POST request to create a new user
router.put('/:user_id', controller.updateUserById); // PUT request to update a user by ID

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
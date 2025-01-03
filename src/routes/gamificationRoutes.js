// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const controller = require('../controllers/gamificationController');

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get('/user-abilities', controller.readAllCharactersAbilities); // GET request to retrieve all characters abilities
router.get('/faction-leaderboard', controller.readAllLeaderboardRanking); // GET request to retrieve all faction ranking by skillpoints
router.get('/:user_id', controller.readAbilityByUserId); // GET request to retrieve an ability by ID
router.post('/assign-ability', controller.createNewAbility); // POST request to create an ability for a user
router.put('/:user_id', controller.updateAbilityById); // PUT request to update an ability by ID
router.delete('/:user_id', controller.deleteAbilityById); // DELETE request to delete an ability by ID

router.post('/faction-abilities', controller.unlockFactionAbility); // POST request to unlock faction ability
router.post('/character', controller.addCharacterToFaction); // POST request to unlock faction ability
router.get('/character/:faction_name', controller.readCharacterByFactionName); // GET request to retrieve an ability by ID

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
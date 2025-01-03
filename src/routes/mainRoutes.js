// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const challengesRoutes = require('./challengesRoutes');
const usersRoutes = require('./usersRoutes');
const gamificationRoutes = require('./gamificationRoutes');

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.use("/challenges", challengesRoutes);
router.use("/users", usersRoutes);
router.use("/gamification", gamificationRoutes);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
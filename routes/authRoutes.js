const express = require('express');
const authenticationRoutes = express.Router();
const { authenticateUser} = require("../controllers/authController")

// Route for user login
authenticationRoutes.post('/login', authenticateUser)

module.exports = authenticationRoutes;
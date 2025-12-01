// ----------------------------------------
// Routes for authentication:
// - POST /auth/register
// - POST /auth/login
// ----------------------------------------

const express = require("express");
const router = express.Router();

// Import controller functions
const {
    register,
    login,
} = require("../controllers/auth.controller");

// Register new user
router.post("/register", register);

// Login existing user
router.post("/login", login);

module.exports = router;

// ----------------------------------------
// Routes for user-related operations:
// - GET /users/me
// - GET /users
// All routes here require JWT auth (authJwt)
// ----------------------------------------

const express = require("express");
const router = express.Router();

const {
    getMe,
    listUsers,
} = require("../controllers/users.controller");

const authJwt = require("../middleware/authJwt");

// /users/me  → current user's profile
router.get("/me", authJwt, getMe);

// /users     → list all users (for demo)
// In real apps, this might require admin role.
router.get("/", authJwt, listUsers);

module.exports = router;

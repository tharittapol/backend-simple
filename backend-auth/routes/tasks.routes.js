// ----------------------------------------
// Routes for tasks:
// - GET /tasks   → list my tasks
// - POST /tasks  → create my task
// All require JWT auth
// ----------------------------------------

const express = require("express");
const router = express.Router();

const {
    listMyTasks,
    createMyTask,
} = require("../controllers/tasks.controller");

const authJwt = require("../middleware/authJwt");

// List tasks for current user
router.get("/", authJwt, listMyTasks);

// Create task for current user
router.post("/", authJwt, createMyTask);

module.exports = router;

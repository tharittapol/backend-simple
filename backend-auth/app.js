/// ----------------------------------------
// Express app configuration
// - Load .env
// - Create Express app
// - Register middleware (JSON parser, logger)
// - Mount routes (auth, users, tasks)
// - 404 handler
// - Central error handler
// ----------------------------------------

// Load environment variables from .env (must be first)
require("dotenv").config();

const express = require("express");

// Custom middleware
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// Routers (grouped route files)
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
const tasksRoutes = require("./routes/tasks.routes");

// Create an Express app instance
const app = express();

const APP_NAME = process.env.APP_NAME || "AuthAPI";

// Built-in middleware to parse JSON body
// After this, req.body will contain parsed JSON
app.use(express.json());

// Our custom logging middleware (logs every request)
app.use(logger);

// Root route just to show available endpoints
app.get("/", (req, res) => {
    res.json({
        message: `Welcome to ${APP_NAME}!`,
        routes: [
            "POST /auth/register",
            "POST /auth/login",
            "GET  /users/me          (requires JWT)",
            "GET  /users              (requires JWT)",
            "GET  /tasks              (requires JWT)",
            "POST /tasks              (requires JWT)"
        ]
    });
});

// Mount routers
// All routes inside authRoutes will be under /auth
// e.g. POST /auth/register, POST /auth/login
app.use("/auth", authRoutes);

// All routes inside usersRoutes will be under /users
// e.g. GET /users/me
app.use("/users", usersRoutes);

// All routes inside tasksRoutes will be under /tasks
app.use("/tasks", tasksRoutes);

// If no route above matched, this is a 404
// We create an Error object and pass it to the error handler
app.use((req, res, next) => {
    const err = new Error("Not found");
    err.statusCode = 404;
    next(err); // forward to central error handler
});

// Central error handler (must be last)
app.use(errorHandler);

// Export app so server.js can start it
module.exports = app;

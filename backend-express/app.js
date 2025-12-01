// --------------------------------------
// Express app configuration
// - load env
// - create app
// - use middleware
// - register routes
// - 404 handler
// - central error handler
// --------------------------------------

require("dotenv").config();
const express = require("express");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const authApiKey = require("./middleware/authApiKey");
const usersRouter = require("./routes/users");

const app = express();

// Config
const APP_NAME = process.env.APP_NAME || "ExpressApp";

// Built-in middleware: parse JSON body
app.use(express.json());

// Custom logging middleware (for ALL routes)
app.use(logger);

// Root route
app.get("/", (req, res) => {
    res.json({
        message: `Welcome to ${APP_NAME}!`,
        routes: [
            "/users",
            "/users/:id",
            "/users/boom/error"
        ]
    });
});

// // Mount users routes under /users
// // So /users, /users/:id, etc. are handled in routes/users.js
// app.use("/users", usersRouter);

// protect ALL /users routes
app.use("/users", authApiKey, usersRouter);

// 404 handler for all other routes (if no route matched above)
app.use((req, res, next) => {
    const err = new Error("Not found");
    err.statusCode = 404;
    next(err); // Pass to central error handler
});

// Central error handler (MUST be last)
app.use(errorHandler);

module.exports = app;

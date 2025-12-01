// --------------------------------------
// User routes using Express.Router()
// --------------------------------------


const express = require("express");
// to keep routes in their own file, then mount them in app.js
const router = express.Router();

// In-memory users
let users = [
    { id: 1, name: "Big",   email: "big@example.com",   role: "admin" },
    { id: 2, name: "Alice", email: "alice@example.com", role: "user"  },
    { id: 3, name: "Bob",   email: "bob@example.com",   role: "user"  },
];

// GET /users
router.get("/", (req, res) => {
    res.json({
        count: users.length,
        users
    });
});

// GET /users/:id
router.get("/:id", (req, res, next) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        // Create an error and pass to next(err) → goes to error handler
        const err = new Error("User not found");
        err.statusCode = 404;
        return next(err);
    }

    res.json(user);
});

// POST /users (simple example)
router.post("/", (req, res, next) => {
    const { name, email, role } = req.body;

    if (!name || !email) {
        const err = new Error("name and email are required");
        err.statusCode = 400;
        return next(err);
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
        role: role || "user"
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// Example route that throws a generic error
router.get("/boom/error", (req, res, next) => {
    // This error will be handled by our central error handler
    const err = new Error("Something exploded in /users/boom/error");
    err.statusCode = 500;
    next(err);
});

module.exports = router;

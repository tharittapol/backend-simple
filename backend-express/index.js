// ---------------------------------------------
// Express fundamentals
// - Basic routes: GET /, GET /users
// - Route params: GET /users/:id
// - req.query, req.params, req.body
// - JSON responses with res.json()
// - In-memory users/products API
// ---------------------------------------------

// 1) Load env variables from .env
require("dotenv").config();

// 2) Import Express
const express = require("express");

// 3) Create an Express app instance
const app = express();

// 4) Read configuration
const APP_NAME = process.env.APP_NAME || "ExpressApp";
const PORT = process.env.PORT || 3000;

// 5) Built-in middleware to parse JSON request body
//    This lets us use req.body for JSON payloads.
app.use(express.json());


// =============================================
// In-memory data (for practice only)
// =============================================

let users = [
    { id: 1, name: "Big",   email: "big@example.com",   role: "admin" },
    { id: 2, name: "Alice", email: "alice@example.com", role: "user"  },
    { id: 3, name: "Bob",   email: "bob@example.com",   role: "user"  },
];

let products = [
    { id: 1, name: "Robot Kit", price: 1500 },
    { id: 2, name: "Sensor Pack", price: 500 },
    { id: 3, name: "Controller Board", price: 800 },
];


// =============================================
// Basic routes
// =============================================

// GET /
// Simple welcome route
app.get("/", (req, res) => {
    res.json({
        message: `Welcome to ${APP_NAME} backend!`,
        docs: [
            "/users",
            "/users/:id",
            "/users/search?role=admin",
            "/products"
        ]
    });
});


// =============================================
// Users routes
// =============================================

// GET /users
// Return all users, optionally filtered by ?role=
app.get("/users", (req, res) => {
    // req.query = query string parameters (after ? in URL)
    const role = req.query.role; // e.g. /users?role=admin

    let result = users;

    if (role) {
        result = users.filter(user => user.role === role);
    }

    res.json({
        count: result.length,
        users: result
    });
});

// GET /users/:id
// Route params → /users/1, /users/2, etc.
app.get("/users/:id", (req, res) => {
    // req.params = route parameters
    // :id in the route becomes req.params.id
    const id = Number(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    res.json(user);
});

// POST /users
// Example to show req.body usage
app.post("/users", (req, res) => {
    // req.body contains JSON payload (because we used app.use(express.json()))
    const { name, email, role } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: "name and email are required"
        });
    }

    const newUser = {
        id: users.length + 1, // simple ID generator
        name,
        email,
        role: role || "user"
    };

    users.push(newUser);

    // 201 = Created
    res.status(201).json(newUser);
});


// =============================================
// Products routes
// =============================================

// GET /products
// Return all products
app.get("/products", (req, res) => {
    res.json({
        count: products.length,
        products
    });
});

// GET /products/:id
app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
});


// =============================================
// Start server
// =============================================
app.listen(PORT, () => {
    console.log(`\n=== ${APP_NAME} running ===`);
    console.log(`Listening on http://localhost:${PORT}`);
    console.log("Try these routes:");
    console.log(`GET  http://localhost:${PORT}/`);
    console.log(`GET  http://localhost:${PORT}/users`);
    console.log(`GET  http://localhost:${PORT}/users/1`);
    console.log(`GET  http://localhost:${PORT}/users/?role=user`);
    console.log(`GET  http://localhost:${PORT}/products\n`);
});

// ----------------------------------------
// Auth controller
// - POST /auth/register
// - POST /auth/login
// Uses bcryptjs for hashing passwords
// Uses jsonwebtoken for generating JWT
// ----------------------------------------

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import user "model" functions
const {
    findUserByEmail,
    createUser,
} = require("../models/users.model");

// POST /auth/register
// Body: { email, password, name? }
async function register(req, res, next) {
    try {
        const { email, password, name } = req.body;

        // Basic validation: email & password are required
        if (!email || !password) {
            const err = new Error("email and password are required");
            err.statusCode = 400;
            return next(err);
        }

        // Check if user with this email already exists
        const existing = findUserByEmail(email);
        if (existing) {
            const err = new Error("Email already registered");
            err.statusCode = 409; // 409 Conflict
            return next(err);
        }

        // Hash the password before storing it
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Create the user in our "database"
        const user = createUser({ email, passwordHash, name });

        // Return created user info *without* the password hash
        res.status(201).json({
            id: user.id,
            email: user.email,
            name: user.name,
        });
    } catch (e) {
        // Forward any unexpected error to central error handler
        return next(e);
    }
}

// POST /auth/login
// Body: { email, password }
async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            const err = new Error("email and password are required");
            err.statusCode = 400;
            return next(err);
        }

        // Find user by email
        const user = findUserByEmail(email);
        if (!user) {
            const err = new Error("Invalid email or password");
            err.statusCode = 401;
            return next(err);
        }

        // Compare plain password with stored hash
        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) {
            const err = new Error("Invalid email or password");
            err.statusCode = 401;
            return next(err);
        }

        // Password is correct → generate JWT
        const payload = { id: user.id, email: user.email };

        const secret = process.env.JWT_SECRET;
        const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

        // Create token with payload, secret, and expiration time
        const token = jwt.sign(payload, secret, { expiresIn });

        // Return token and user info (no passwordHash)
        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (e) {
        return next(e);
    }
}

module.exports = {
    register,
    login,
};

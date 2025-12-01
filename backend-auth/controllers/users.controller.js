// ----------------------------------------
// Users controller
// - GET /users/me      (current logged-in user)
// - GET /users         (list all users - for demo)
// ----------------------------------------

const {
    findUserById,
    getAllUsers,
} = require("../models/users.model");

// GET /users/me
// Requires authJwt middleware before it
function getMe(req, res, next) {
    try {
        // authJwt attaches the decoded payload to req.user
        const userId = req.user.id;

        const user = findUserById(userId);
        if (!user) {
            const err = new Error("User not found");
            err.statusCode = 404;
            return next(err);
        }

        // Return profile (no passwordHash)
        res.json({
            id: user.id,
            email: user.email,
            name: user.name,
        });
    } catch (e) {
        return next(e);
    }
}

// GET /users
// For now: list all users (requires authJwt)
function listUsers(req, res, next) {
    try {
        const users = getAllUsers();

        res.json({
            count: users.length,
            users,
        });
    } catch (e) {
        return next(e);
    }
}

module.exports = {
    getMe,
    listUsers,
};

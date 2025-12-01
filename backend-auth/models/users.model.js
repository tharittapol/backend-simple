// ----------------------------------------
// Very simple in-memory "database" for users
// In real apps, this would be a real DB (Postgres, MongoDB, etc.)
// ----------------------------------------

// This array will store user objects in memory
let users = [];

// Simple counter to generate incremental user IDs
let nextUserId = 1;

// Find a user by email (used in login/register)
function findUserByEmail(email) {
    return users.find((u) => u.email === email);
}

// Find a user by ID (used for /me, etc.)
function findUserById(id) {
    return users.find((u) => u.id === id);
}

// Create a new user with given data
function createUser({ email, passwordHash, name }) {
    const user = {
        id: nextUserId++,   // assign current ID, then increment
        email,
        passwordHash,       // hashed password string
        name: name || null, // optional name
    };

    users.push(user);
    return user;
}

// Get all users (for admin/listing)
// NOTE: In real apps, usually do NOT return passwordHash
function getAllUsers() {
    return users;
}

// Export functions so controllers can use them
module.exports = {
    findUserByEmail,
    findUserById,
    createUser,
    getAllUsers,
};

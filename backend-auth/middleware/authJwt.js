// ----------------------------------------
// JWT authentication middleware
// - Expects header: Authorization: Bearer <token>
// - Verifies token using JWT_SECRET
// - If valid → attaches payload to req.user and calls next()
// - If invalid/missing → passes 401 error to error handler
// ----------------------------------------

const jwt = require("jsonwebtoken");

function authJwt(req, res, next) {
    // Read Authorization header (e.g. "Bearer eyJ...")
    const authHeader = req.header("Authorization");

    // Check if header is present and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        const err = new Error("Missing or invalid Authorization header");
        err.statusCode = 401;
        return next(err);
    }

    // Extract the token string after "Bearer "
    const token = authHeader.replace("Bearer ", "").trim();

    try {
        const secret = process.env.JWT_SECRET;

        // Verify token and decode payload
        // If invalid or expired, jwt.verify will throw an error
        const payload = jwt.verify(token, secret);

        // Attach payload to request for later handlers
        // e.g. payload might be { id, email, iat, exp }
        req.user = payload;

        // Continue to next middleware/route
        next();
    } catch (e) {
        const err = new Error("Invalid or expired token");
        err.statusCode = 401;
        return next(err);
    }
}

module.exports = authJwt;

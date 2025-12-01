// --------------------------------------
// Simple API key auth via X-API-KEY header
// If header is missing or wrong -> 401 error
// --------------------------------------

function authApiKey(req, res, next) {
    const clientKey = req.header("X-API-KEY");
    const serverKey = process.env.AUTH_API_KEY;

    if (!clientKey || clientKey !== serverKey) {
        const err = new Error("Invalid or missing API key");
        err.statusCode = 401;
        return next(err);
    }

    // OK, continue to next middleware/route
    next();
}

module.exports = authApiKey;

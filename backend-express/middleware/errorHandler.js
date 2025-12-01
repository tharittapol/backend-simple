// --------------------------------------
// Central error handling middleware
// Always returns JSON: { message, statusCode }
// --------------------------------------

// err-handling middleware has 4 args: (err, req, res, next)
function errorHandler(err, req, res, next) {
    // If statusCode is set on error, use it; otherwise default 500
    const statusCode = err.statusCode || 500;

    // customize message or use err.message
    const message = err.message || "Internal Server Error";

    // Log error (for server logs)
    console.error("Error handler:", {
        message: err.message,
        stack: err.stack // the error message, the file name + line number, the chain of function calls that led to the error
    });

    // Send JSON response
    res.status(statusCode).json({
        message,
        statusCode
    });
}

module.exports = errorHandler;

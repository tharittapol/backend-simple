function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Error handler:", {
        message: err.message,
        stack: err.stack
    });

    res.status(statusCode).json({
        message,
        statusCode
    });
}

module.exports = errorHandler;

// --------------------------------------
// Custom logging middleware
// Logs: [timestamp] METHOD URL STATUS - Xms
// --------------------------------------

function logger(req, res, next) {
    const start = Date.now(); // remember when the request started

    // 'finish' event fires when the response has been sent
    res.on("finish", () => {
        const duration = Date.now() - start;
        const timestamp = new Date().toISOString();
        const logLine = `[${timestamp}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

        console.log(logLine);
    });

    // Pass control to the next middleware/route
    next();
}

//module.exports is the thing that gets returned when another file does require(...)
module.exports = logger; // export logger function
// in another file import
//const logger = require("./middleware/logger");

// ----------------------------------------
// Node core HTTP server
// - Read .env with dotenv
// - Create a simple HTTP server
// - Simple console.log server events
// - Log request method & URL
// - Respond with JSON
// ----------------------------------------

// 1) Load environment variables from .env
require("dotenv").config();

// 2) Get configuration from env (with defaults)
const APP_NAME = process.env.APP_NAME || "MyBackendApp";
const PORT = process.env.PORT || 3000;

// 3) Import Node's built-in http module
const http = require("http");

// 4) Create an HTTP server
//    The callback runs EVERY time a request comes in.
const server = http.createServer((req, res) => {
    // req = incoming request object
    // res = response object we will send back

    // Log method and url to see what's happening
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // Simple routing by checking req.url and req.method
    if (req.method === "GET" && req.url === "/") {
        // Set response headers
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json; charset=utf-8");

        // Create a JS object to send back
        const data = {
            message: `Welcome to ${APP_NAME}!`,
            time: new Date().toISOString(),
        };

        // Send JSON string
        res.end(JSON.stringify(data));
    }

    else if (req.method === "GET" && req.url === "/health") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify({ status: "ok" }));
    }

    // Any other route → 404
    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify({ error: "Not found" }));
    }
});

// 5) Start the server and listen on the configured port
server.listen(PORT, () => {
    console.log(`\n=== ${APP_NAME} running ===`);
    console.log(`Listening on http://localhost:${PORT}`);
    console.log("Press Ctrl + C to stop\n");
});

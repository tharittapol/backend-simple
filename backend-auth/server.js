// ----------------------------------------
// This file only starts the HTTP server.
// The Express app itself is defined in app.js
// ----------------------------------------

const app = require("./app"); // import the configured Express app

// Read config from environment or use defaults
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "AuthAPI";

// Start listening on the given port
app.listen(PORT, () => {
    console.log(`\n=== ${APP_NAME} running ===`);
    console.log(`Listening on http://localhost:${PORT}`);
    console.log("Press Ctrl + C to stop\n");
});

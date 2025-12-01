// --------------------------------------
// Starts the HTTP server
// --------------------------------------

const app = require("./app");

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "ExpressApp";

app.listen(PORT, () => {
    console.log(`\n=== ${APP_NAME} running ===`);
    console.log(`Listening on http://localhost:${PORT}`);
    console.log("Press Ctrl + C to stop\n");
});

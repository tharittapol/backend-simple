// ----------------------------------------
// Node.js basics
// - Simple console.log app
// - Read .env file with dotenv
// ----------------------------------------

// 1) Load environment variables from .env file
// This must be done before using process.env.*
require("dotenv").config();

// 2) Access env variables via process.env
// If a variable is missing, we can provide a default value using ||.
const appName = process.env.APP_NAME || "DefaultApp";
const port = process.env.PORT || 3000;
const userName = process.env.USER_NAME || "Anonymous";

// 3) Simple logs to confirm everything works
console.log("=== Hello backend ===");
console.log(`App Name : ${appName}`);
console.log(`Port     : ${port}`);
console.log(`User Name: ${userName}`);

// 4) Show that Node is running and can do normal JS as well
function greet(name) {
    return `Hello, ${name}! Welcome to ${appName} backend.`;
}

console.log(greet(userName));

// 5) Just to show we’re in Node:
console.log("Current working directory:", process.cwd());
console.log("Node environment:", process.env.NODE_ENV || "not set");

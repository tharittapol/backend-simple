# 🔐 backend-simple – Node.js / Express / TypeScript Playground

A personal playground for learning modern backend fundamentals step-by-step:

- Node.js core HTTP server
- Express basics (routes, middleware, error handling)
- Auth with bcrypt + JWT
- Clean architecture with **server → app → routes → controllers → models**
- Migration from **JavaScript** to **TypeScript**

> Keep the project to see the development + use it as a template when working on the actual project

---

## 🧱 Monorepo structure

This repo contains multiple small projects:

```text
backend-simple/
├─ backend/             # Node.js basics (no Express)
├─ backend-express/     # Express fundamentals + middleware
├─ backend-auth/        # Auth with bcrypt + JWT (JavaScript)
├─ backend-auth-ts/     # Auth with bcrypt + JWT (TypeScript)
└─ .gitignore
```

---

## `backend/` – Node core HTTP + dotenv

- Uses the Node **core** `http` module
- Reads `.env` with `dotenv`
- Logs incoming requests (method + URL)
- Responds with a simple JSON payload

**Run:**
```bash
cd backend
npm install
npm run dev     # or: npm start
```
---

## `backend-express/` – Express fundamentals + middleware
Focus:
- `express()` app basics
- `express.json()` for parsing JSON body
- Custom **logger middleware** (method + URL + response time)
- Central **error handler** → always returns `{ message, statusCode }`
- API key middleware using **X-API-KEY**
- Routes split into files:
    - `routes/users.js`
- Classic layered structure:
```text
server.js     # starts the HTTP server (app.listen)
app.js        # config: middleware + mount routes + error handler
routes/       # URL -> controller mapping
controllers/  # request/response logic (in this project simplified)
models/       # data layer (in-memory for now)
middleware/   # logger, errorHandler, authApiKey
```

**Run:**
```bash
cd backend-express
npm install
npm run dev
```
You can test with the included Postman collection:
- `Test_Collection.postman_collection.json`

---

## `backend-auth/` – Auth with bcrypt + JWT (JavaScript)
First version of a **realistic auth API** using plain JavaScript.  
Features:
- `POST /auth/register` – register new user
    - Validates input
    - Hashes password with **bcryptjs**
    - Stores user in in-memory array
- `POST /auth/login` – login user
    - Verifies password
    - Returns **JWT** signed with `JWT_SECRET`
- `GET /users/me` – get current user profile (protected)
- `GET /tasks` – list tasks for current user (protected)
- `POST /tasks` – create a new task for current user (protected)
- Clean structure:
```text
backend-auth/
├─ app.js              # Express app setup
├─ server.js           # app.listen(...)
├─ routes/             # auth.routes.js, users.routes.js, tasks.routes.js
├─ controllers/        # auth.controller.js, users.controller.js, tasks.controller.js
├─ models/             # users.model.js, tasks.model.js (in-memory DB)
└─ middleware/         # logger.js, errorHandler.js, authJwt.js
```

**Run:**
```bash
cd backend-auth
npm install
npm run dev
```
**Env variables `(.env)`:**
```bash
APP_NAME=AuthAPI
PORT=3000
JWT_SECRET=changeme_super_secret_jwt_key
JWT_EXPIRES_IN=1h
```
There’s also a Postman collection here:
- `Test-Backend-Auth.postman_collection.json`

---

## `backend-auth-ts/` – Auth with bcrypt + JWT (TypeScript)
Same idea as `backend-auth/`, but written in **TypeScript** with stricter types.  
Highlights:
- Strongly-typed **User / Task** models
- `AuthRequest` type extends Express `Request` with `user` property
- Typed JWT payload (`JwtPayload`)
- Type-safe controllers & middleware
- Structure:
```text
backend-auth-ts/
├─ src/
│  ├─ app.ts           # Express app
│  ├─ server.ts        # entrypoint
│  ├─ types/
│  │   └─ auth.ts      # JwtPayload, AuthRequest
│  ├─ models/          # users.model.ts, tasks.model.ts
│  ├─ controllers/     # auth, users, tasks
│  ├─ routes/          # auth, users, tasks
│  └─ middleware/      # logger, errorHandler, authJwt
├─ dist/               # compiled JS output
├─ tsconfig.json
└─ package.json
```

**Run in dev (ts-node-dev):**
```bash
cd backend-auth-ts
npm install
npm run dev

```
**Build & run (production style):**
```bash
npm run build
npm start     # runs dist/server.js
```

---

## 🧪 Tech stack
- **Runtime:** Node.js
- **Framework:** Express
- **Language:** JavaScript → TypeScript
- **Auth:** bcryptjs, jsonwebtoken (JWT)
- **Config:** dotenv
- **Dev tools:** nodemon, ts-node-dev

---

## 🚦 Learning milestones
- ✅ Node.js basics
    - Core HTTP server
    - `.env` config and simple JSON responses
- ✅ Express fundamentals
    - Routing, middleware, error handling
    - Custom logger, API key auth
- ✅ Intro to authentication
    - Password hashing with bcrypt
    - JWT login & protected routes
    - Clean project structure with routes / controllers / models / middleware
    - TypeScript migration (backend-auth-ts)

---

## 🧑‍💻 How to clone and explore
```bash
git clone https://github.com/tharittapol/backend-simple.git
cd backend-simple

# Example: run the TypeScript auth API
cd backend-auth-ts
npm install
npm run dev
```

---

## ✨ Notes to future me

- This repo is a **learning timeline**, not just code.
- Each folder = one step in the journey from:

> “console.log('Hello backend')” → to “real auth API with JWT + TypeScript”

---

Feel free to copy any structure or code from here into future projects 💙  
Next stop: databases & real persistence 🚀
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";

import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/users.routes";
import tasksRoutes from "./routes/tasks.routes";

const app = express();
const APP_NAME = process.env.APP_NAME || "AuthAPI";

app.use(express.json());
app.use(logger);

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: `Welcome to ${APP_NAME}!`,
        routes: [
            "POST /auth/register",
            "POST /auth/login",
            "GET  /users/me",
            "GET  /users",
            "GET  /tasks",
            "POST /tasks",
        ],
    });
});

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/tasks", tasksRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new Error("Not found") as any;
    err.statusCode = 404;
    next(err);
});

app.use(errorHandler);

export default app;

// ------------------------------------------------------
// Tasks controller
// - GET /tasks   → list tasks of current user
// - POST /tasks  → create task for current user
// ------------------------------------------------------

import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth";
import {
    createTask,
    getTasksByUserId,
} from "../models/tasks.model";

// GET /tasks
export async function listMyTasks(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        if (!req.user) {
            const err = new Error("Unauthorized") as any;
            err.statusCode = 401;
            return next(err);
        }

        const userId = req.user.id;
        const tasks = await getTasksByUserId(userId);

        res.json({
            count: tasks.length,
            tasks,
        });
    } catch (e) {
        return next(e);
    }
}

// POST /tasks
export async function createMyTask(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        if (!req.user) {
            const err = new Error("Unauthorized") as any;
            err.statusCode = 401;
            return next(err);
        }

        const { title } = req.body as { title?: string };

        if (!title) {
            const err = new Error("title is required") as any;
            err.statusCode = 400;
            return next(err);
        }

        const userId = req.user.id;
        const task = await createTask({ userId, title });

        res.status(201).json(task);
    } catch (e) {
        return next(e);
    }
}

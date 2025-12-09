// ----------------------------------------
// Users controller
// ----------------------------------------

import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth";
import {
    findUserById,
    getAllUsers,
} from "../models/users.model";

// GET /users/me
export async function getMe(
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
        const user = await findUserById(userId);

        if (!user) {
            const err = new Error("User not found") as any;
            err.statusCode = 404;
            return next(err);
        }

        res.json({
            id: user.id,
            email: user.email,
            name: user.name,
        });
    } catch (e) {
        return next(e);
    }
}

// GET /users
export async function listUsers(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const users = await getAllUsers();
        // For demo we return full users
        res.json({
            count: users.length,
            users,
        });
    } catch (e) {
        return next(e);
    }
}

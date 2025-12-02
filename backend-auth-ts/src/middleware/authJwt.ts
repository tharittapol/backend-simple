// ----------------------------------------
// JWT authentication middleware
// Expects: Authorization: Bearer <token>
// If valid: attaches payload to req.user
// ----------------------------------------

import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, JwtPayload } from "../types/auth";

export function authJwt(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        const err = new Error("Missing or invalid Authorization header") as any;
        err.statusCode = 401;
        return next(err);
    }

    const token = authHeader.replace("Bearer ", "").trim();

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            const err = new Error("JWT_SECRET is not set") as any;
            err.statusCode = 500;
            return next(err);
        }

        const payload = jwt.verify(token, secret) as JwtPayload;

        req.user = payload;
        next();
    } catch (e) {
        const err = new Error("Invalid or expired token") as any;
        err.statusCode = 401;
        return next(err);
    }
}

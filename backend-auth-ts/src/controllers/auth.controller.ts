// ------------------------------------------------------
// Auth controller: register + login
// - Uses Prisma-based user model
// - Hashes password with bcrypt
// - Issues JWT on successful login
// ------------------------------------------------------

import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import {
    findUserByEmail,
    createUser,
} from "../models/users.model";
import { JwtPayload } from "../types/auth";


// POST /auth/register
export async function register(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        // Extract body with explicit typing
        const { email, password, name } = req.body as {
            email?: string;
            password?: string;
            name?: string;
        };

        // Basic validation
        if (!email || !password) {
            const err = new Error("email and password are required") as any;
            err.statusCode = 400;
            return next(err);
        }

        // Check if email already exists in DB
        const existing = await findUserByEmail(email);
        if (existing) {
        const err = new Error('Email already registered') as any;
        err.statusCode = 409;
        return next(err);
        }

        // Hash password with bcrypt
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Create user in PostgreSQL via Prisma
        const user = await createUser({ email, passwordHash, name });

        res.status(201).json({
            id: user.id,
            email: user.email,
            name: user.name,
        });
    } catch (e) {
        return next(e);
    }
}

// POST /auth/login
export async function login(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { email, password } = req.body as {
            email?: string;
            password?: string;
        };

        if (!email || !password) {
            const err = new Error("email and password are required") as any;
            err.statusCode = 400;
            return next(err);
        }

        // Look up user in DB
        const user = await findUserByEmail(email);
        if (!user) {
        const err = new Error('Invalid email or password') as any;
        err.statusCode = 401;
        return next(err);
        }

        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) {
            const err = new Error("Invalid email or password") as any;
            err.statusCode = 401;
            return next(err);
        }

        // Build the payload that will be embedded into the JWT
        const payload: JwtPayload = { id: user.id, email: user.email };

        const secretEnv = process.env.JWT_SECRET;
        const expiresInEnv = process.env.JWT_EXPIRES_IN || "1h";

        // Extra runtime safety: check env first
        if (!secretEnv) {
            const err = new Error("JWT_SECRET is not set") as any;
            err.statusCode = 500;
            return next(err);
        }

        // Tell TypeScript the exact types:
        const secret: Secret = secretEnv;
        const signOptions: SignOptions = {
            expiresIn: expiresInEnv as any, // `as any` to bypass overly strict type definition
        };

        // Now TS knows: (payload, secret: Secret, options: SignOptions)
        const token = jwt.sign(payload, secret, signOptions);

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (e) {
        return next(e);
    }
}

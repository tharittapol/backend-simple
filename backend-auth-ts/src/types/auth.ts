// ----------------------------------------
// Shared types for auth & JWT
// ----------------------------------------

import { Request } from "express";

// Shape of the JWT payload we put inside the token
export interface JwtPayload {
    id: number;
    email: string;
    iat?: number; // issued at (from JWT)
    exp?: number; // expiration (from JWT)
}

// Custom Request type that has "user" attached (from authJwt middleware)
export interface AuthRequest extends Request {
    user?: JwtPayload;
}

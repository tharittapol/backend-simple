// ----------------------------------------
// Central error handling middleware
// Always returns JSON: { message, statusCode }
// ----------------------------------------

import { Request, Response, NextFunction } from "express";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const statusCode: number = err.statusCode || 500;
    const message: string = err.message || "Internal Server Error";

    console.error("Error handler:", {
        message: err.message,
        stack: err.stack,
    });

    res.status(statusCode).json({
        message,
        statusCode,
    });
}

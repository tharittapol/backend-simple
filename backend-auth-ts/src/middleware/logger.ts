// ----------------------------------------
// Logs each request with duration
// ----------------------------------------

import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        const timestamp = new Date().toISOString();
        const logLine = `[${timestamp}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;
        console.log(logLine);
    });

    next();
}

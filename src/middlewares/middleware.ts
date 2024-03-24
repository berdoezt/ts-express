import express from 'express'

export function loggingMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    next()
    console.log(`${new Date().toISOString()} ${req.method} ${req.url} ${res.statusCode}`)
}
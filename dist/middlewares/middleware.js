"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
function loggingMiddleware(req, res, next) {
    next();
    console.log(`${new Date().toISOString()} ${req.method} ${req.url} ${res.statusCode}`);
}
exports.loggingMiddleware = loggingMiddleware;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = exports.loggingMiddleware = void 0;
const util_1 = require("../utils/util");
function loggingMiddleware(req, res, next) {
    next();
    res.on('finish', () => {
        console.log(`${new Date().toISOString()} ${req.method} ${req.url} ${res.statusCode}`);
    });
}
exports.loggingMiddleware = loggingMiddleware;
function authenticationMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                res.status(401).json({
                    error: "unauthorized"
                });
                return;
            }
            const token = authorizationHeader.split("Bearer ")[1];
            const payload = yield (0, util_1.verifyJwtToken)(token);
            if (!payload) {
                res.status(401).json({
                    error: "unauthorized"
                });
                return;
            }
            req.app.locals.userId = payload.sub;
            next();
        }
        catch (e) {
            console.log(e);
            res.status(401).json({
                error: "unauthorized"
            });
            return;
        }
    });
}
exports.authenticationMiddleware = authenticationMiddleware;

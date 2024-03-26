"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtToken = exports.generateJWTToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateJWTToken(userId) {
    return new Promise((resolve, reject) => {
        const currentDate = new Date();
        const fiveMinutesLater = currentDate.setMinutes(currentDate.getMinutes() + 5);
        const expiresIn = Math.floor(fiveMinutesLater / 1000);
        const payload = {
            sub: userId,
            exp: expiresIn
        };
        jsonwebtoken_1.default.sign(payload, "ini_secret_saya", (err, token) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(token);
        });
    });
}
exports.generateJWTToken = generateJWTToken;
function verifyJwtToken(token) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, "ini_secret_saya", (err, payload) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(payload);
        });
    });
}
exports.verifyJwtToken = verifyJwtToken;

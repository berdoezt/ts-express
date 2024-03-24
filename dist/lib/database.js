"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlConnectionPromise = void 0;
const mysql_1 = __importDefault(require("mysql"));
const mysqlConnectionPromise = () => {
    return new Promise((resolve, reject) => {
        let connection = mysql_1.default.createConnection({
            user: "root",
            password: "password",
            host: "localhost",
            port: 3306,
            database: "revou",
            insecureAuth: true
        });
        connection.connect((err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(connection);
        });
    });
};
exports.mysqlConnectionPromise = mysqlConnectionPromise;

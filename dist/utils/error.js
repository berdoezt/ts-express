"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataNotFoundError = void 0;
class DataNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.code = "DATA_NOT_FOUND";
    }
    getCode() {
        return this.code;
    }
}
exports.DataNotFoundError = DataNotFoundError;

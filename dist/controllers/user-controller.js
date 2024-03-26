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
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createdUserResponse = yield this.userService.register(req.body);
                console.log(createdUserResponse);
                res.status(200).json({
                    data: createdUserResponse
                });
            }
            catch (e) {
                let errorMessage = "unknown error";
                if (e instanceof Error) {
                    errorMessage = e.message;
                }
                res.status(500).json({
                    error: errorMessage
                });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const loginUserResponse = yield this.userService.login(req.body);
                res.status(200).json({
                    data: loginUserResponse
                });
            }
            catch (e) {
                let errorMessage = "unknown error";
                if (e instanceof Error) {
                    errorMessage = e.message;
                }
                res.status(500).json({
                    error: errorMessage
                });
            }
        });
        this.userService = userService;
    }
}
exports.UserController = UserController;

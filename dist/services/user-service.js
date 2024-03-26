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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const util_1 = require("../utils/util");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    register(createUserRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(createUserRequest.password, 10);
            const createdUserId = yield this.userRepository.create({
                id: 0,
                email: createUserRequest.email,
                password: hashedPassword,
                name: createUserRequest.name
            });
            return {
                id: createdUserId
            };
        });
    }
    login(loginUserRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getByEmail(loginUserRequest.email);
            const isPasswordMatched = yield bcrypt_1.default.compare(loginUserRequest.password, user.password);
            if (!isPasswordMatched) {
                throw new Error("incorrect password");
            }
            const token = yield (0, util_1.generateJWTToken)(user.id);
            return { token };
        });
    }
}
exports.UserService = UserService;

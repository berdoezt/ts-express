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
exports.OrderController = void 0;
const error_1 = require("../utils/error");
class OrderController {
    constructor(orderService) {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.app.locals.userId;
                let createOrderRequest = req.body;
                const createdOrderResponse = yield this.orderService.create(createOrderRequest, userId);
                res.status(200).json({
                    data: createdOrderResponse
                });
            }
            catch (e) {
                if (e instanceof error_1.DataNotFoundError) {
                    res.status(404).json({
                        error: `${e.code}: ${e.message}`
                    });
                    return;
                }
                let errorMessage = "unknown error";
                if (e instanceof Error) {
                    errorMessage = e.message;
                }
                res.status(500).json({
                    error: errorMessage
                });
            }
        });
        this.getByUserId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.app.locals.userId;
                const getOrdersResponse = yield this.orderService.getByUserId(userId);
                res.status(200).json({
                    data: getOrdersResponse
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
        this.orderService = orderService;
    }
}
exports.OrderController = OrderController;

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
exports.OrderService = void 0;
class OrderService {
    constructor(orderRepository, productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }
    create(createOrderRequest, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.getById(createOrderRequest.productId);
            const createdOrderId = yield this.orderRepository.create({
                id: 0,
                price: createOrderRequest.price,
                userId: userId,
                productId: product.id
            });
            return {
                id: createdOrderId
            };
        });
    }
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.orderRepository.getByUserId(userId);
            let getOrdersResponse = [];
            orders.forEach((order) => {
                getOrdersResponse.push({
                    id: order.id,
                    price: order.price,
                    productId: order.productId,
                    userId: order.userId
                });
            });
            return getOrdersResponse;
        });
    }
}
exports.OrderService = OrderService;

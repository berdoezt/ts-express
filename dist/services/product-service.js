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
exports.ProductService = void 0;
const product_model_1 = require("../models/product-model");
class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productRepository.getAll();
            let getProductsResponse = [];
            products.forEach((product) => {
                getProductsResponse.push((0, product_model_1.toGetProductResponseFrom)(product));
            });
            return getProductsResponse;
        });
    }
}
exports.ProductService = ProductService;

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
exports.ProductController = void 0;
const error_1 = require("../utils/error");
class ProductController {
    constructor(productService) {
        this.getProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getAllProductsResponse = yield this.productService.getAll();
                res.status(200).json({
                    data: getAllProductsResponse
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).json({
                    error: e
                });
            }
        });
        this.getProductById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(req.params.product_id);
                const getAllProductsResponse = yield this.productService.getById(productId);
                res.status(200).json({
                    data: getAllProductsResponse
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
        this.createProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createProductResponse = yield this.productService.create(req.body);
                res.status(200).json({
                    data: createProductResponse
                });
            }
            catch (e) {
                res.status(500).json({
                    error: e
                });
            }
        });
        this.productService = productService;
    }
}
exports.ProductController = ProductController;

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
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./controllers/product-controller");
const database_1 = require("./lib/database");
const product_repository_1 = require("./repositories/product-repository");
const product_service_1 = require("./services/product-service");
const middleware_1 = require("./middlewares/middleware");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield (0, database_1.mysqlConnectionPromise)();
            const productRepository = new product_repository_1.ProductRepository(db);
            const productService = new product_service_1.ProductService(productRepository);
            const productController = new product_controller_1.ProductController(productService);
            const app = (0, express_1.default)();
            app.use(express_1.default.json());
            app.use(middleware_1.loggingMiddleware);
            app.get("/products", productController.getProduct);
            app.use((req, res) => {
                res.status(404).json({
                    error: "not found"
                });
            });
            app.listen(8082);
        }
        catch (e) {
            console.error('failed to start server :', e);
            process.exit(1);
        }
    });
}
startServer();

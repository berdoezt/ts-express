import express from 'express';
import { ProductController } from './controllers/product-controller';
import { mysqlConnectionPromise } from './lib/database';
import { ProductRepository } from './repositories/product-repository';
import { ProductService } from './services/product-service';
import { authenticationMiddleware, loggingMiddleware } from './middlewares/middleware';
import { UserRepository } from './repositories/user-repository';
import { UserService } from './services/user-service';
import { UserController } from './controllers/user-controller';
import { OrderRepository } from './repositories/order-repository';
import { OrderService } from './services/order-service';
import { OrderController } from './controllers/order-controller';

async function startServer() {

    try {
        const db = await mysqlConnectionPromise()

        const productRepository = new ProductRepository(db)
        const productService = new ProductService(productRepository)
        const productController = new ProductController(productService)

        const userRepository = new UserRepository(db)
        const userService = new UserService(userRepository)
        const userController = new UserController(userService)

        const orderRepository = new OrderRepository(db)
        const orderService = new OrderService(orderRepository, productRepository)
        const orderController = new OrderController(orderService)

        const app = express()
        app.use(express.json())
        app.use(loggingMiddleware)

        const userRouter = express.Router()
        userRouter.post("/users/register", userController.register)
        userRouter.post("/users/login", userController.login)

        const productRouter = express.Router()
        productRouter.use(authenticationMiddleware)
        productRouter.get("/products", productController.getProduct)
        productRouter.get("/products/:product_id", productController.getProductById)
        productRouter.put("/products/:product_id", productController.getProductById)
        productRouter.delete("/products/:product_id", productController.getProductById)
        productRouter.post("/products", productController.createProduct)

        const orderRouter = express.Router()
        orderRouter.use(authenticationMiddleware)
        orderRouter.post("/orders", orderController.create)
        orderRouter.get("/orders", orderController.getByUserId)

        app.use(userRouter)
        app.use(productRouter)
        app.use(orderRouter)
        app.use((req: express.Request, res: express.Response) => {
            res.status(404).json({
                error: "not found"
            })
        })
        app.listen(8082)
    } catch (e) {
        console.error('failed to start server :', e)
        process.exit(1)
    }
}

startServer()
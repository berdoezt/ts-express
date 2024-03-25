import express from 'express';
import { ProductController } from './controllers/product-controller';
import { mysqlConnectionPromise } from './lib/database';
import { ProductRepository } from './repositories/product-repository';
import { ProductService } from './services/product-service';
import { loggingMiddleware } from './middlewares/middleware';

async function startServer() {

    try {
        const db = await mysqlConnectionPromise()

        const productRepository = new ProductRepository(db)
        const productService = new ProductService(productRepository)
        const productController = new ProductController(productService)

        const app = express()
        app.use(express.json())
        app.use(loggingMiddleware)

        app.get("/products", productController.getProduct)
        app.get("/products/:product_id", productController.getProductById)
        app.put("/products/:product_id", productController.getProductById)
        app.delete("/products/:product_id", productController.getProductById)
        app.post("/products", productController.createProduct)
        
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
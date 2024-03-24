import express from 'express';
import { ProductService } from '../services/product-service';

export class ProductController{
    private productService: ProductService

    constructor(productService: ProductService){
        this.productService = productService
    }

    getProduct = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        
        try{
            const getAllProductsResponse = await this.productService.getAll()
            res.status(200).json({
                data: getAllProductsResponse
            })            
        }catch(e){
            console.log(e)
            res.status(500).json({
                error: e
            })
        }
        
    }
}
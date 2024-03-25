import express from 'express';
import { ProductService } from '../services/product-service';
import { CreateProductRequest } from '../models/product-model';
import { DataNotFoundError } from '../utils/error';

export class ProductController {
    private productService: ProductService

    constructor(productService: ProductService) {
        this.productService = productService
    }

    getProduct = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        try {
            const getAllProductsResponse = await this.productService.getAll()
            res.status(200).json({
                data: getAllProductsResponse
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                error: e
            })
        }
    }

    getProductById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        try {
            const productId = parseInt(req.params.product_id)
            const getAllProductsResponse = await this.productService.getById(productId)
            res.status(200).json({
                data: getAllProductsResponse
            })
        } catch (e) {
            if (e instanceof DataNotFoundError) {
                res.status(404).json({
                    error: `${e.code}: ${e.message}`
                })
                return
            }

            let errorMessage = "unknown error"
            if (e instanceof Error) {
                errorMessage = e.message
            }

            res.status(500).json({
                error: errorMessage
            })
        }
    }

    createProduct = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const createProductResponse = await this.productService.create(req.body as CreateProductRequest)
            res.status(200).json({
                data: createProductResponse
            })
        } catch (e) {
            res.status(500).json({
                error: e
            })
        }
    }
}
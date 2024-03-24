import { GetProductsResponse, toGetProductResponseFrom } from "../models/product-model";
import { ProductRepository } from "../repositories/product-repository";

export class ProductService {
    private productRepository: ProductRepository

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }

    async getAll(): Promise<GetProductsResponse[]> {
        const products = await this.productRepository.getAll()

        let getProductsResponse: GetProductsResponse[] = []
        products.forEach((product) => {
            getProductsResponse.push(toGetProductResponseFrom(product))
        })

        return getProductsResponse
    }
}
import { CreateProductRequest, CreateProductResponse, GetProductsResponse, toGetProductResponseFrom, toProductModelFrom } from "../models/product-model";
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

    async getById(id: number): Promise<GetProductsResponse> {
        const product = await this.productRepository.getById(id)
        return toGetProductResponseFrom(product)
    }

    async create(createProductRequest: CreateProductRequest): Promise<CreateProductResponse> {
        let productModel = toProductModelFrom(createProductRequest)
        let createdProductId = await this.productRepository.create(productModel)
        return {
            id: createdProductId
        }
    }
}
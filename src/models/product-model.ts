export interface ProductModel {
    id: number
    name: string
    price: number
}

export interface GetProductsResponse {
    id: number
    name: string
    price: number
}

export interface CreateProductRequest {
    name: string
    price: number
}

export interface CreateProductResponse {
    id: number
}

export function toProductModelFrom(createProductRequest: CreateProductRequest): ProductModel {
    return {
        id: 0,
        name: createProductRequest.name,
        price: createProductRequest.price
    }
}

export function toGetProductResponseFrom(productModel: ProductModel): GetProductsResponse {
    return {
        id: productModel.id,
        name: productModel.name,
        price: productModel.price
    }
}
export interface ProductModel {
    id: number
    name: string
    price: number
}

export interface GetProductsResponse{
    id: number
    name: string
    price: number
}

export function toGetProductResponseFrom(productModel: ProductModel): GetProductsResponse{
    return {
        id: productModel.id,
        name: productModel.name,
        price: productModel.price
    }
}
import { CreateOrderRequest, CreateOrderResponse, GetOrderResponse } from "../models/order-model";
import { OrderRepository } from "../repositories/order-repository";
import { ProductRepository } from "../repositories/product-repository";

export class OrderService {
    private orderRepository: OrderRepository
    private productRepository: ProductRepository

    constructor(orderRepository: OrderRepository, productRepository: ProductRepository) {
        this.orderRepository = orderRepository
        this.productRepository = productRepository
    }

    async create(createOrderRequest: CreateOrderRequest, userId: number): Promise<CreateOrderResponse> {
        const product = await this.productRepository.getById(createOrderRequest.productId)
        const createdOrderId = await this.orderRepository.create({
            id: 0,
            price: createOrderRequest.price,
            userId: userId,
            productId: product.id
        })

        return {
            id: createdOrderId
        }
    }

    async getByUserId(userId: number): Promise<GetOrderResponse[]> {
        const orders = await this.orderRepository.getByUserId(userId)

        let getOrdersResponse: GetOrderResponse[] = []
        orders.forEach((order) => {
            getOrdersResponse.push({
                id: order.id,
                price: order.price,
                productId: order.productId,
                userId: order.userId
            })
        })

        return getOrdersResponse
    }
}
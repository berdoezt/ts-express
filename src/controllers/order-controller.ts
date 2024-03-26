import express from 'express'
import { OrderService } from "../services/order-service";
import { CreateOrderRequest } from '../models/order-model';
import { DataNotFoundError } from '../utils/error';

export class OrderController {
    private orderService: OrderService

    constructor(orderService: OrderService) {
        this.orderService = orderService
    }

    create = async (req: express.Request, res: express.Response) => {
        try {
            const userId = req.app.locals.userId as number

            let createOrderRequest = req.body as CreateOrderRequest
            const createdOrderResponse = await this.orderService.create(createOrderRequest, userId)
            res.status(200).json({
                data: createdOrderResponse
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

    getByUserId = async (req: express.Request, res: express.Response) => {
        try {
            const userId = req.app.locals.userId as number
            const getOrdersResponse = await this.orderService.getByUserId(userId)
            res.status(200).json({
                data: getOrdersResponse
            })
        } catch (e) {
            let errorMessage = "unknown error"
            if (e instanceof Error) {
                errorMessage = e.message
            }

            res.status(500).json({
                error: errorMessage
            })
        }
    }
}
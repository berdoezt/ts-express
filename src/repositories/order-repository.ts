import mysql from 'mysql'
import { OrderModel } from '../models/order-model'
import { ProductModel } from '../models/product-model'

export class OrderRepository{
    private db: mysql.Connection

    constructor(db: mysql.Connection){
        this.db = db
    }

    create(orderModel: OrderModel){
        return new Promise<number>((resolve, reject) => {
            let q = `INSERT INTO orders(user_id, product_id, price) 
                values(${orderModel.userId}, ${orderModel.productId}, ${orderModel.price})`

            this.db.query(q, (err, rows) => {
                if (err){
                    reject(err)
                    return
                }

                resolve(rows.insertId)
            })
        })
    }

    getByUserId(userId: number){
        return new Promise<OrderModel[]>((resolve, reject) => {
            const q = `SELECT * FROM orders where user_id = ${userId}`
            this.db.query(q, (err, rows) => {
                if (err){
                    reject(err)
                    return
                }
                let orders: OrderModel[] = []

                for(let i = 0; i < rows.length; i++){
                    orders.push({
                        id: rows[i].id,
                        userId: rows[i].user_id,
                        productId: rows[i].product_id,
                        price: rows[i].price
                    })
                }

                resolve(orders)
            })
        })

    }

}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
class OrderRepository {
    constructor(db) {
        this.db = db;
    }
    create(orderModel) {
        return new Promise((resolve, reject) => {
            let q = `INSERT INTO orders(user_id, product_id, price) 
                values(${orderModel.userId}, ${orderModel.productId}, ${orderModel.price})`;
            this.db.query(q, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.insertId);
            });
        });
    }
    getByUserId(userId) {
        return new Promise((resolve, reject) => {
            const q = `SELECT * FROM orders where user_id = ${userId}`;
            this.db.query(q, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                let orders = [];
                for (let i = 0; i < rows.length; i++) {
                    orders.push({
                        id: rows[i].id,
                        userId: rows[i].user_id,
                        productId: rows[i].product_id,
                        price: rows[i].price
                    });
                }
                resolve(orders);
            });
        });
    }
}
exports.OrderRepository = OrderRepository;

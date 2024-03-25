"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const error_1 = require("../utils/error");
class ProductRepository {
    constructor(db) {
        this.db = db;
    }
    getAll() {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM products", (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                let products = [];
                for (let index = 0; index < rows.length; index++) {
                    products.push({
                        id: rows[index].id,
                        name: rows[index].name,
                        price: rows[index].price
                    });
                }
                resolve(products);
            });
        });
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM products where id=${id}`, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (rows.length == 0) {
                    reject(new error_1.DataNotFoundError("product"));
                    return;
                }
                resolve({
                    id: rows[0].id,
                    name: rows[0].name,
                    price: rows[0].price,
                });
            });
        });
    }
    create(productModel) {
        return new Promise((resolve, reject) => {
            let q = `INSERT INTO products(name, price) values('${productModel.name}', ${productModel.price})`;
            this.db.query(q, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.insertId);
            });
        });
    }
}
exports.ProductRepository = ProductRepository;

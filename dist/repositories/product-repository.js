"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
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
}
exports.ProductRepository = ProductRepository;

import mysql from 'mysql';
import { ProductModel } from '../models/product-model';

export class ProductRepository {
    private db: mysql.Connection

    constructor(db: mysql.Connection) {
        this.db = db
    }

    getAll() {
        return new Promise<ProductModel[]>((resolve, reject) => {
            this.db.query("SELECT * FROM products", (err, rows) => {
                if (err) {
                    reject(err)
                    return
                }

                let products: ProductModel[] = []

                for (let index = 0; index < rows.length; index++) {
                    products.push({
                        id: rows[index].id,
                        name: rows[index].name,
                        price: rows[index].price
                    })
                }

                resolve(products)
            });
        })
    }


}
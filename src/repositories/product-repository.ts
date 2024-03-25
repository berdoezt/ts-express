import mysql from 'mysql';
import { ProductModel } from '../models/product-model';
import { DataNotFoundError } from '../utils/error';

export class ProductRepository {
    private db: mysql.Connection

    constructor(db: mysql.Connection) {
        this.db = db
    }

    getAll(): Promise<ProductModel[]> {
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

    getById(id: number): Promise<ProductModel> {
        return new Promise<ProductModel>((resolve, reject) => {
            this.db.query(`SELECT * FROM products where id=${id}`, (err, rows) => {
                if (err) {
                    reject(err)
                    return
                }

                if (rows.length == 0) {
                    reject(new DataNotFoundError("product"))
                    return
                }

                resolve({
                    id: rows[0].id,
                    name: rows[0].name,
                    price: rows[0].price,
                })
            });
        })
    }

    create(productModel: ProductModel): Promise<number> {
        return new Promise<number>((resolve, reject) => {

            let q = `INSERT INTO products(name, price) values('${productModel.name}', ${productModel.price})`

            this.db.query(q, (err, rows) => {
                if (err) {
                    reject(err)
                    return
                }

                resolve(rows.insertId)
            })
        })
    }


}
import mysql from 'mysql';
import { UserModel } from '../models/user-model';

export class UserRepository {
    private db: mysql.Connection

    constructor(db: mysql.Connection) {
        this.db = db
    }

    create(user: UserModel): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            let q = `INSERT INTO users(email, password, name) values ('${user.email}', '${user.password}', '${user.name}')`

            this.db.query(q, (err, rows) => {
                if (err) {
                    reject(err)
                    return
                }

                resolve(rows.insertId)
            })
        })
    }

    getByEmail(email: string): Promise<UserModel>{
        return new Promise<UserModel>((resolve, reject) => {
            let q = `SELECT * FROM users where email = '${email}'`

            this.db.query(q, (err, rows) => {
                if (err) {
                    reject(err)
                    return
                }

                if(rows.length == 0){
                    reject(new Error("data not found"))
                    return
                }

                resolve({
                    id: rows[0].id,
                    email: rows[0].email,
                    password: rows[0].password,
                    name: rows[0].name
                })
            })
        })
    }
}
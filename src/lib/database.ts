import mysql from 'mysql';

export const mysqlConnectionPromise = (): Promise<mysql.Connection> => {
    return new Promise<mysql.Connection>((resolve, reject) => {
        let connection = mysql.createConnection({
            user: "root",
            password: "password",
            host: "localhost",
            port: 3306,
            database: "revou",
            insecureAuth: true
        })

        connection.connect((err) => {
            if (err) {
                reject(err)
                return
            }

            resolve(connection)
        })
    })
}
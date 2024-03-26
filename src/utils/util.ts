import jwt from 'jsonwebtoken'

export function generateJWTToken(userId: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const currentDate = new Date()
        const fiveMinutesLater = currentDate.setMinutes(currentDate.getMinutes() + 5)
        const expiresIn = Math.floor(fiveMinutesLater / 1000)

        const payload = {
            sub: userId,
            exp: expiresIn
        }
        jwt.sign(payload, "ini_secret_saya", (err, token) => {
            if (err) {
                reject(err)
                return
            }

            resolve(token as string)
        })
    })
}

export function verifyJwtToken(token: string) {
    return new Promise<any>((resolve, reject) => {
        jwt.verify(token, "ini_secret_saya", (err, payload) => {
            if(err){
                reject(err)
                return
            }

            resolve(payload)
        })
    })
}
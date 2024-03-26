import express from 'express'
import { verifyJwtToken } from '../utils/util'

export function loggingMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    next()
    res.on('finish', () => {
        console.log(`${new Date().toISOString()} ${req.method} ${req.url} ${res.statusCode}`)
    })

}

export async function authenticationMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    try{
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            res.status(401).json({
                error: "unauthorized"
            })
            return
        }
    
        const token = authorizationHeader.split("Bearer ")[1]
        
        const payload = await verifyJwtToken(token)
        if(!payload){
            res.status(401).json({
                error: "unauthorized"
            })
            return
        }
        req.app.locals.userId = payload.sub
    
        next()
    }catch(e){
        console.log(e)
        res.status(401).json({
            error: "unauthorized"
        })
        return
    }
}

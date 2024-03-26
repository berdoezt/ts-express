import express from 'express';
import { UserService } from "../services/user-service";
import { CreateUserRequest, LoginUserRequest } from '../models/user-model';

export class UserController {
    private userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
    }

    register = async (req: express.Request, res: express.Response) => {
        try {
            const createdUserResponse = await this.userService.register(req.body as CreateUserRequest)
            res.status(200).json({
                data: createdUserResponse
            })
        } catch (e) {
            let errorMessage = "unknown error"
            if (e instanceof Error) {
                errorMessage = e.message
            }

            res.status(500).json({
                error: errorMessage
            })
        }
    }

    login = async (req: express.Request, res: express.Response) => {
        try {
            const loginUserResponse = await this.userService.login(req.body as LoginUserRequest)
            res.status(200).json({
                data: loginUserResponse
            })
        } catch(e) {
            let errorMessage = "unknown error"
            if (e instanceof Error) {
                errorMessage = e.message
            }

            res.status(500).json({
                error: errorMessage
            })
        }
    }
}
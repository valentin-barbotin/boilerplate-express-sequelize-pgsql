import { Router } from 'express'
import { UserService } from "../services"
import { checkUserToken } from '../middlewares/user'
import Logger from '../logger'

export class UserController {
    readonly path: string

    constructor(
        private readonly userService: UserService = UserService.instance
    ) {
        this.path = '/users'
    }

    router(): Router {
        const router = Router()

        router.get('/', checkUserToken(), this.getUsers.bind(this))
        router.get('/:id', checkUserToken(), this.getUser.bind(this))

        return router
    }

    public async getUsers() {
        Logger.info('Getting users')
        return this.userService.getUsers()
    }

    public async getUser(id: number) {
        Logger.info(`Getting user with id ${id}`)
        return this.userService.getUser(id)
    }
}
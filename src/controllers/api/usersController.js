import { randomUUID } from 'crypto'
import { cartsService } from '../../services/carts.service.js'
import { usersService } from '../../services/users.service.js'

export async function getController(req, res, next) {
    const users = usersService.getUsers()
    return users
}

export async function getUserController(req, res, next) {
    const email = req.body.email
    const user = usersService.getUser(email)
    return user
}

export async function postController(req, res, next) {
    try {
        const cartId = randomUUID()
        req.body.cart = cartId
        const userData = await usersService.postUser(req.body)
        req.user = userData
        const userCart = await cartsService.postCart(cartId)
        next()
    } catch (error) {
        next(error)
    }
}
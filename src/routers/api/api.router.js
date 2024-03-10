import { Router, json, urlencoded } from "express";
import { productsRouter } from "./products.router.js"
import { cartsRouter } from "./carts.router.js"
import { chatRouter } from "./chat.router.js";
import { usersRouter } from "./users.router.js";
import { sessionsRouter } from "./sessions.router.js";

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use(urlencoded({ extended: true }))

apiRouter.use('/', productsRouter)

apiRouter.use('/', cartsRouter)

apiRouter.use('/', chatRouter)

apiRouter.use('/sessions', sessionsRouter)

apiRouter.use('/users', usersRouter)

apiRouter.use((error, req, res, next) => {
    switch (error.type) {
        case 'INVALID_PARAMETERS':
            res.status(400)
            break
        case 'FAILED_AUTHENTICATION':
            res.status(401)
            break
        case 'FAILED_AUTHORIZATION':
            res.status(403)
            break
        case 'INTERNAL_ERROR':
            res.status(500)
            break
        default:
            console.log(JSON.stringify(error, null, 2))
            res.status(500)
    }
    res.json({ status: 'error', message: error.message })
})
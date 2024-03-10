import { Router } from "express"
import { deleteUserTokenCookie, userTokenCookie } from "../../middlewares/tokens.js"
import { postController } from "../../controllers/api/sessionsControllers.js"

export const sessionsRouter = Router()

const options = { httpOnly: true, maxAge: 1000 * 60 * 60 * 24, signed: true }

sessionsRouter.post('/', postController,
    userTokenCookie,
    (req, res) => {
        res.sendStatus(201)
    })

sessionsRouter.delete('/current',
    deleteUserTokenCookie,
    (req, res) => {
        res.sendStatus(204)
    })
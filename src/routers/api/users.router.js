import { Router } from "express"
import { getController, postController } from "../../controllers/api/usersController.js"
import { userTokenCookie } from "../../middlewares/tokens.js"
import passport from "passport"
import { onlyRoles } from "../../middlewares/authorization.js"
//import { userManager } from "../../models/mongooseModels/User.js"


export const usersRouter = Router()

usersRouter.post('/', postController, userTokenCookie, (req, res) => {
    res.status(201).json({ status: 'success', payload: req.user })
})

usersRouter.get('/current',
    passport.authenticate('jwt', { failWithError: true, session: false }),
    async (req, res, next) => {
        res.status(201).json({ status: 'success', payload: req.user })
    })

usersRouter.get('/',
    passport.authenticate('jwt', { failWithError: true, session: false }),
    onlyRoles(['admin']),
    getController) 
import { Router } from "express"
import { cartWebController, chatWebController, homeWebController, loginWebController, profileWebController, registerWebController } from "../../controllers/web/web.controller.js"

export const webRouter = Router()

webRouter.get('/', homeWebController)

webRouter.get('/chat', chatWebController)

webRouter.get('/cart/:cid', cartWebController)

webRouter.get('/register', registerWebController)

webRouter.get('/login', loginWebController)

webRouter.get('/profile', profileWebController)
 

// webRouter.get('/githublogin', passport.authenticate('githubLogin'))
// webRouter.get('/githubcallback', passport.authenticate('githubLogin', {
//     successRedirect: '/home',
//     failureRedirect: '/login'
// }))
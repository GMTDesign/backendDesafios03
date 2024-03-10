import { sessionsService } from "../../services/sessions.service.js"

export async function postController(req, res, next) {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await sessionsService.readUser(email, password)
        req.user = user
        next()
    } catch (error) {
        next(error)
    }

}

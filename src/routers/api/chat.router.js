import { Router } from "express"
import { getController, postController } from "../../controllers/api/messageControllers.js"

export const chatRouter = Router()

chatRouter.get('/chat', getController)

chatRouter.post('/chat', postController)
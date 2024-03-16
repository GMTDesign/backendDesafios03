import { Router } from "express"
import { deleteController, deleteProductController, getByIdController, postController, postProductController, postPurchaseController, putController, putProductController } from "../../controllers/api/cartsControllers.js"
import { usersOnly } from "../../middlewares/authorization.js"

export const cartsRouter = Router()

cartsRouter.get('/carts/:cid', getByIdController)

cartsRouter.post('/carts', postController)

cartsRouter.post('/carts/:cid/product/:pid', usersOnly, postProductController)

cartsRouter.put('/carts/:cid', putController)

cartsRouter.put('/carts/:cid/product/:pid', putProductController)

cartsRouter.delete('/carts/:cid', deleteController)

cartsRouter.delete('/carts/:cid/product/:pid', usersOnly, deleteProductController)

cartsRouter.post('/carts/:cid/purchase', postPurchaseController)

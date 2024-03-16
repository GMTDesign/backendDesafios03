import { cartsService } from "../../services/carts.service.js"
import { ticketsService } from "../../services/tickets.service.js"


export async function getByIdController(req, res) {
    const cid = req.params.cid
    const searched = await cartsService.getCart(cid)
    if (!searched) {
        return res.status(404).json({ message: 'carrito inexistente' })
    }
    res.json(searched)
}

export async function postController(req, res) {
    try {
        const newCart = await cartsService.postCart()
        res.json(newCart)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export async function postProductController(req, res) {
    const cid = req.params.cid
    const pid = req.params.pid
    try {
        const addedProduct = await cartsService.postProduct(cid, pid)
        res.json(addedProduct)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export async function putController (req, res) {
    const cid = req.params.cid
    try {
        const updatedCart = await cartsService.putCart(cid)
        res.json(updatedCart)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export async function putProductController (req, res) {
    const cid = req.params.cid
    const pid = req.params.pid
    const { newQuantity } = req.body
    try {
        const updatedProduct = await cartsService.putProduct(cid, pid, newQuantity)
        res.json(updatedProduct)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export async function deleteController (req, res) {
    const cid = req.params.cid
    const deletedCart = await cartsService.deleteCart(cid)
    if (!deletedCart) {
       return res.status(404).json({ message: 'carrito inexistente'})
    }
    res.json(deletedCart)
}

export async function deleteProductController (req, res) {
    const cid = req.params.cid
    const pid = req.params.pid
    const deletedProduct = await cartsService.deleteProduct(cid, pid)
    if (!deletedProduct) {
       return res.status(404).json({ message: 'producto inexistente'})
    }
    res.json(deletedProduct)
}

export async function postPurchaseController (req, res) {
    const cid = req.params.cid
    // acá desencripto el token y obtengo el email del comprador para pasarlo como parámetro al post
    //a modo de elemplo lo hardcodeo
    const email = 'gmt1971@hotmail.com'
    const newTicket = await ticketsService.postTicket(cid, email)
    res.json(newTicket)
}
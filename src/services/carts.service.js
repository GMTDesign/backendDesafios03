import { cartsDaoMongoose } from "../dao/mongoose/carts.dao.mongoose.js"
import { Cart } from "../models/validationModels/Cart.js"

class CartsService {
    async getCart(cid) {
        const cart = await cartsDaoMongoose.readOne(cid)
        return cart
    }

    async postCart(cartId) {
        const newCart = new Cart(cartId)
        const cart = await cartsDaoMongoose.createCart(cartId)
        return newCart
    }

    async postProduct(cid, pid) {
        const addedProduct = await cartsDaoMongoose.createProduct(cid, pid)
        return addedProduct
    }

    async putCart(cid) {
        const updatedCart = await cartsDaoMongoose.updateCart(cid)
        return updatedCart
    }

    async putProduct(cid, pid, newQuantity) {
        const addedProduct = await cartsDaoMongoose.updateProduct(cid, pid, newQuantity)
        return addedProduct
    }

    async deleteCart(cid) {
        const deletedCart = await cartsDaoMongoose.deleteCart(cid)
        return deletedCart
    }

    async deleteProduct(cid, pid) {
        const deletedProduct = await cartsDaoMongoose.deleteProduct(cid, pid)
        return deletedProduct
    }
}

export const cartsService = new CartsService()
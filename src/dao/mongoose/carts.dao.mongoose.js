import mongoose from "mongoose"
import { cartManager } from "../../models/mongooseModels/Cart.js"
import { MONGO_URL } from "../../config/config.js"
import { toPOJO } from "../../utils/toPojo.js"


await mongoose.connect(MONGO_URL)
console.log('Carritos: persistencia en MongoDB')

class CartsDaoMongoose {

    async readOne(cid) {
        const searched = await cartManager.find({ _id: cid }, { 'products._id': 0 }).lean()
        return toPOJO(searched)
    }

    async createCart(cartId) {
        const newCart = await cartManager.create({ _id: cartId, products: [] })
        return toPOJO(newCart)
    }

    async createProduct(cid, pid) {
        const addedProduct = await cartManager.findById(cid)
        addedProduct.addProduct(pid)
        return toPOJO(addedProduct)
    }

    async updateCart(cid) {
        const updatedCart = await cartManager.findByIdAndUpdate(cid)
        return toPOJO(updatedCart)
    }

    async updateProduct(cid, pid, newQuantity) {
        const updatedProduct = await cartManager.findByIdAndUpdate(cid, { $set: { products: { product: pid, quantity: newQuantity } } }, { new: true })
        return toPOJO(updatedProduct)
    }

    async deleteCart(cid) {
        const deletedCart = await cartManager.findByIdAndUpdate(cid, { $set: { products: [] } }, { new: true })
        return toPOJO(deletedCart)
    }

    async deleteProduct(cid, pid) {
        const deletedProduct = await cartManager.findById(cid)
        deletedProduct.deleteProduct(pid)
        return toPOJO(deletedProduct)
    }
}

export const cartsDaoMongoose = new CartsDaoMongoose()
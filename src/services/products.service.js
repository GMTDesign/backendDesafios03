import { productsDaoMongoose } from "../dao/mongoose/products.dao.mongoose.js"
import { Product } from "../models/validationModels/Product.js"


class ProductsService {
    async getProducts(parameters, paginateOptions) {
        const products = await productsDaoMongoose.readMany(parameters, paginateOptions)
        return products
    }

    async getProduct(pid) {
        const product = await productsDaoMongoose.readOne(pid)
        return product
    }

    async postProduct({title, description, code, price, status, stock, category, thumbnails}) {
        const newProduct = new Product({title, description, code, price, status, stock, category, thumbnails})
        const product = await productsDaoMongoose.create(newProduct.toPojo())
        return product
    }

    async putProduct(pid, data,images) {
        const updated = await productsDaoMongoose.updateOne(pid, data, images)
        return updated
    }

    async deleteProduct(pid) {
        const deleted = await productsDaoMongoose.deleteOne(pid)
        return deleted
    }
}

export const productsService = new ProductsService()
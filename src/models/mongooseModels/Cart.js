import { Schema, model } from "mongoose";
import { randomUUID } from 'crypto'

const Cart = new Schema({
    _id: { type: String, default: randomUUID },
    products: {
        type: [{
            product: {type: String, ref: 'products'},
            quantity: { type: Number, default: 1 }
        }],
        default: []
    }
}, {
    strict: 'throw',
    versionKey: false,
    methods: {
        addProduct: async function (prodId) {
            const index = this.products.findIndex(prod => prod.product === prodId)
            if (index === -1) {
                this.products.push({product: prodId})
            } else {
                this.products[index].quantity++
            }
           await this.save()
        },
        deleteProduct: async function (prodId) {
            const index = this.products.findIndex(prod => prod.product === prodId)
            if (index !== -1) {
                this.products.splice(index, 1)
            }
           await this.save()
        }
    }
})

Cart.pre('find', function (next) {
    this.populate('products.product')
    next()
})

export const cartManager = model('carts', Cart)
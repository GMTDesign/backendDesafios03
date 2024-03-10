import { Schema, model } from "mongoose"
import { randomUUID } from 'crypto'
import mongoosePaginate from 'mongoose-paginate-v2'

export const Product = new Schema({
    _id: { type: String, default: randomUUID },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, default: 0},
    category: { type: String, required: true},
    thumbnails: { type: [String], default: [] }
}, {
    strict: 'throw',
    versionKey: false,
    methods: {
        addThumbnail: async function (thumbnails) {
            if (thumbnails) {
                if (!this.thumbnails.includes(thumbnails))
                   this.thumbnails.push(thumbnails)
            }
            await this.save()
        }
    }
})

Product.plugin(mongoosePaginate)

export const productManager = model('products', Product)
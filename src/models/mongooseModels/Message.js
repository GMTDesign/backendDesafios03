import { Schema, model } from "mongoose";

const Message = new Schema({
    user: { type: String, require: true},
    message: { type: String, require: true}
}, {
    strict: 'throw',
    versionKey: false
})

export const messageManager = model('messages', Message)
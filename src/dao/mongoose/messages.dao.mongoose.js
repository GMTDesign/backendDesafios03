import mongoose from "mongoose"
import { messageManager } from "../../models/mongooseModels/Message.js"
import { MONGO_URL } from "../../config/config.js"
import { toPOJO } from "../../utils/toPojo.js"

await mongoose.connect(MONGO_URL)
console.log('Chat: persistencia en MongoDB')

class MessagesDaoMongoose {
    async readMany () {
        const messages = await messageManager.find().lean()
        return toPOJO(messages)
    }
    
    async create({user, message}) {
        const newMessage = await messageManager.create({user, message})
        return toPOJO(newMessage)
    }
}

export const messagesDaoMongoose = new MessagesDaoMongoose()
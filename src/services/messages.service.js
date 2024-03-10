import { messagesDaoMongoose } from "../dao/mongoose/messages.dao.mongoose.js"

class MessagesService {
    async getMessages() {
        const messages = await messagesDaoMongoose.readMany()
        return messages
    }

    async postMessage({user, message}) {
        const newMessage = await messagesDaoMongoose.create({user, message})
        return newMessage
    }
}

export const messagesService = new MessagesService()
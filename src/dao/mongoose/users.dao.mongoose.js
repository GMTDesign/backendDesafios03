import mongoose from "mongoose"
import { userManager } from "../../models/mongooseModels/User.js"
import { MONGO_URL } from "../../config/config.js"
import { toPOJO } from "../../utils/toPojo.js"

await mongoose.connect(MONGO_URL)
console.log('Usuarios: persistencia en MongoDB')

class UsersDaoMongoose {
   
    async create(data) {
        const user = await userManager.userRegistry(data)
        const authorizedUserData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age,
            cart: user.cart,
            role: user.role
        }
        return toPOJO(authorizedUserData)
    }

    async readOne (email, password) {
        const user = await userManager.userAuthentication(email, password)
        const authorizedUserData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age,
            cart: user.cart,
            role: user.role
        }
        return toPOJO(authorizedUserData)
    }

    async readMany() {
        const users = await userManager.find().lean()
        return toPOJO(users)
    }
}

export const usersDaoMongoose = new UsersDaoMongoose()
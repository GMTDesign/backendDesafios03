import { usersDaoMongoose } from "../dao/mongoose/users.dao.mongoose.js"
import { User } from "../models/validationModels/User.js"

class UsersService {
    async getUsers() {
        const users = await usersDaoMongoose.readMany()
        return users
    }

    async getUser(email) {
        const user = usersDaoMongoose.readOne(email)
        return user
    }

    async postUser({ firstName, lastName, email, age, password, cart, role }) {
        const newUser = new User({ firstName, lastName, email, age, password, cart, role })
        const user = await usersDaoMongoose.create(newUser.toPojo())
        return user
    }
}

export const usersService = new UsersService()
import { usersDaoMongoose } from "../dao/mongoose/users.dao.mongoose.js"

class SessionsService {
    async readUser(email, password) {
        const user = await usersDaoMongoose.readOne(email, password)
        return user

    }
}
export const sessionsService = new SessionsService()
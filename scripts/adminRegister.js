import mongoose from "mongoose"
import { MONGO_URL } from "../src/config/config.js"
import { userManager } from "../src/models/mongooseModels/User.js"


await mongoose.connect(MONGO_URL)

const deleted = await userManager.deleteMany({ firstName: 'admin'})

const user = await userManager.userRegistry({
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@admin.com',
    password: 'adminPassword'
})

const updatedUser = await userManager.findOneAndUpdate(
    { firstName: 'admin'},
    { $set: { role: 'admin'}},
    { new: true }
)

console.log(updatedUser)

await mongoose.disconnect()
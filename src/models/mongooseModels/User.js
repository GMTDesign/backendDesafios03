import mongoose, { model } from "mongoose"
import { randomUUID } from 'crypto'
import { equalHashed, hashear } from "../../utils/cryptography.js"

const User = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    firstName: { type: String, require: true},
    lastName: { type: String, default: '(no especificado)'},
    email: { type: String, unique: true, required: true},
    age: { type: Number, default: 0},
    password: { type: String, default: ('no especificada')},
    cart: {type: String, defaul: ('no especificado')},
    role: { type: String, enum: ['admin', 'user'], default: 'user'}
}, {
    strict: 'throw',
    versionKey: false,
    statics: {
        userRegistry: async function(userData) {
            try {
                if (userData.password) {
                    userData.password = hashear(userData.password)
                }
                delete userData.role
                const user = await this.create(userData)
                return user
            } catch (error) {
                const errorType = new Error(error.message)
                errorType['type'] = 'INVALID_PARAMETERS'
                throw errorType
            }
        },
        userAuthentication: async function(email, password) {
            const user = await this.findOne({email})
            if (!user) {
                const errorType = new Error('usuario inexistente, debe registrarse!')
                errorType['type'] = 'FAILED_AUTHENTICATION'
                throw errorType
            }
            if (!equalHashed(password, user.password)) {
                const errorType = new Error('error en la autenticación')
                errorType['type'] = 'FAILED_AUTHENTICATION'
                throw errorType
            }
            return user
        }
    }
})

export const userManager = mongoose.model('users', User)
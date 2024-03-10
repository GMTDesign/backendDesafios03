import { hashSync, compareSync, genSaltSync } from "bcrypt"
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../config/config.js"

export function hashear(password) {
    if (!password) throw new Error('Process: "Hashing password", error: nonexistent parameter' + password)
    return hashSync(password, genSaltSync(10))
}

export function equalHashed(received, saved) {
    if (!received) throw new Error('Process: "Verifying password", error: nonexistent parameter' + received)
    return compareSync(received, saved)
}

export function encodeData(data) {
    return new Promise((resolve, reject) => {
        if (!data){ 
            return reject(new Error('Process: "Encode", error: nonexistent data'))
        }
        jwt.sign(data, SECRET_KEY, { expiresIn: '24h' }, (error, encoded) => {
            if (error) {
                const errorType = new Error(error.message)
                errorType['type'] = 'INTERNAL_ERROR'
                reject(errorType)
            } else {
                resolve(encoded)
            }
        })
    })
}

export function decodeData(token) {
    return new Promise((resolve, reject) => {
        if (!token){ 
            return reject(new Error('Process: "Decode", error: nonexistent data'))
        }
        jwt.verify(token, SECRET_KEY, (error, data) => {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
    })
    })
}
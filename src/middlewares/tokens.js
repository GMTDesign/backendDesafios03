import { encodeData } from "../utils/cryptography.js"

const options = { httpOnly: true, maxAge: 1000 * 60 * 60 * 24, signed: true }

export async function userTokenCookie(req, res, next) {
    try {
        const token = await encodeData(req.user)
        res.cookie('authorization', token, options)
        next()
    } catch (error) {
        next(error)
    }

}

export function deleteUserTokenCookie(req, res, next) {
    res.clearCookie('authorization', options)
    next()
}
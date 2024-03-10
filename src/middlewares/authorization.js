import { decodeData } from "../utils/cryptography.js"

export function onlyRoles(roles) {
    return async function (req, res, next) {
        if (roles.includes(req.user.role)) {
            return next()
        }
        const errorType = new Error('you need special permission')
        errorType['type'] = 'FAILED_AUTHORIZATION'
        next(errorType)
    }
}

export async function usersOnly(req, res, next) {

    const userData = await decodeData(req.signedCookies.authorization)
    if (!userData.role) throw new Error('login')
    if (userData.role !== 'user') {
        next({ status: 'Error', message: 'Only user can do this operation' })

    }
    next()
}

export async function adminOnly(req, res, next) {

    const userData = await decodeData(req.signedCookies.authorization)
    if (!userData.role) throw new Error('login')
    if (userData.role !== 'admin') {
        next({ status: 'Error', message: 'Only admin can do this operation' })

    }
    next()
}
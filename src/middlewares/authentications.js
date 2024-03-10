import passport from "passport"
import { Strategy as JwtStrategy } from "passport-jwt"
import { Strategy as GitHubStrategy } from "passport-github2"
import { userManager } from "../../src/models/mongooseModels/User.js"
import { GITHUB_CB_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, SECRET_KEY } from "../config/config.js"

//login con JWT

passport.use('jwt', new JwtStrategy({
    jwtFromRequest: function (req) {
        var token = null
        if (req && req['signedCookies'] && req['signedCookies']['authorization']) {
            token = req['signedCookies']['authorization']
        }
        return token
    },
    secretOrKey: SECRET_KEY
},
    (user, done) => {
        done(null, user)
    }
))


//login con GitHub
// passport.use('githubLogin', new GitHubStrategy({
//     clientID: GITHUB_CLIENT_ID,
//     clientSecret: GITHUB_CLIENT_SECRET,
//     callbackURL: GITHUB_CB_URL
// }, async (_, __, gitHubUser, done) => {
//     let user = await userManager.findOne({ email: gitHubUser.username })
//     if (!user) {
//         user = await userManager.create({
//             firstName: gitHubUser.displayName,
//             email: gitHubUser.username
//         })
//     }
//     done(null, user.toObject())
// }))


// passport.serializeUser((user, next) => { next(null, user) })
// passport.deserializeUser((user, next) => { next(null, user) })

export const authentication = passport.initialize()
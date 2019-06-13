const passport = require('passport')
const User = require('../model/schemas/user.schema')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt


passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "baconpancakes"
    }, async function (jwtPayload, done) {
        try {
            console.log(jwtPayload)
            const user = await User.findOne({ _id: jwtPayload.id })
            if (!user) {
                return done(new Error(), false)
            }
            return done(null, user)
        } catch (err) {
            return done(new Error(), false)
        }
    })
)

module.exports = null
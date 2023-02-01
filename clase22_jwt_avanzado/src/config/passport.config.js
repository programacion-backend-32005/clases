import passport from 'passport'
import UserModel from '../models/user.model.js'
import jwt from 'passport-jwt'

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = req => {
    const token = (req && req.cookies) ? req.cookies['coderCookieToken'] : null
    
    console.log("Cookie Extractor: ", token);
    return token
}

const initializePassport = () => {

    // Contro de mensajes y roles

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'CpderMyLeyu1289_asdjhk(From&Martin' // Secret con que se genero el JWT en generate token PRIVATE_KEY
    }, async(jwt_payload, done) => {
        console.log('PASSPORT', jwt_payload);

        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))

}

export default initializePassport
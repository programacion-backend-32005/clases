import passport from "passport";
import local from "passport-local"
import jwt from 'passport-jwt'
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword, generateToken } from '../utils.js'
import credentials from '../config/credentials.js'

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            const user = await UserModel.findOne({email: username})
            if(user) {
                console.log('User already exits');
                return (done, false)
            }

            const result = await UserModel.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                age: req.body.age,
                role: 'user',
                social: 'local',
                password: createHash(password)
            })

            return done(null, result)
        } catch (error) {
            return done("[LOCAL] Error en registro " + error)
        }
    }))
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await UserModel.findOne({email: username}).lean().exec()
            if(!user) {
                console.log('User dont exits');
                return done(null, user)
            }

            console.log("asd");

            if(!isValidPassword(user, password)) return done(null, false)
            console.log("TO GENERATE...");
            const token = generateToken(user)
            console.log("TOKEN GENERATED ");
            user.token = token
            console.log(user);

            return done(null, user)
        } catch (error) {
            
        }
    }))

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([req => (req && req.cookies) ? req.cookies[credentials.COOKIE_NAME_JWT] : null]),
        secretOrKey: credentials.JWT_PRIVATE_KEY
    }, async (jwt_payload, done) => {
        console.log("PASSPORT ", jwt_payload);

        done(null, jwt_payload)
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })
}

export default initializePassport
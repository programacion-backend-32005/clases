import passport from "passport";
import local from "passport-local"
import jwt from 'passport-jwt'

import { UserService } from "../repository/index.js";

import { createHash, isValidPassword, generateToken, extractCookie } from '../utils.js'
import config from "../config/config.js";

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            const user = await UserService.getOneByEmail(username)
            if(user) {
                console.log('User already exits');
                return (done, false)
            }

            const result = await UserService.create({
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
            const user = await UserService.getOneByEmail(username)
            if(!user) {
                console.log('User dont exits');
                return done(null, user)
            }

            if(!isValidPassword(user, password)) return done(null, false)
            
            const token = generateToken(user)
            user.token = token

            return done(null, user)
        } catch (error) {
            
        }
    }))

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([extractCookie]),
        secretOrKey: config.jwtPrivateKey
    }, async (jwt_payload, done) => {
        done(null, jwt_payload)
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await UserService.getOneByID(id)
        done(null, user)
    })
}

export default initializePassport
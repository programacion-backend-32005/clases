import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import {JWT_PRIVATE_KEY, COOKIE_NAME_JWT } from './config/credentials.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

export const generateToken = user => {
    const token = jwt.sign({user}, JWT_PRIVATE_KEY, {expiresIn: '24h'})
    return token
}

export const authToken = (req, res, next) => {
    const authToken = req.cookies.coderCookieToken

    if(!authToken) return res.status(401).render('errors/base', {error: 'No aAuth'})
    jwt.verify(token, JWT_PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(403).render('errors/base', {error: 'No authorized'})
        req.user = credentials.user
        next()
    })
}

// Tecnica para pasar cualquier strategia de registro (local o github) se validarian con JWT
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function(err, user, info) {
            if(err) return next(err)
            if(!user) return res.status(401).render('errors/base', {error: info.messages ? info.messages : info.toString()})

            req.user = user
            next()
        })(req, res, next)
    }
}

export const extractCookie = req => {
    return (req && req.cookies) ? req.cookies[COOKIE_NAME_JWT] : null
}

export default __dirname
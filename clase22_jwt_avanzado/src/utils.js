import {fileURLToPath } from 'url'
import {dirname} from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'

const PRIVATE_KEY = "CpderMyLeyu1289_asdjhk(From&Martin"

/**
 * 
 * hashSync: toma el poassword y salt para "hashear"
 * genSaltSync: Genera un salt (Un string aleatorio)
 * El password no se puede volver a obtener por ningun metodo. IRREVERSIBLE
 * 
 */
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassoword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}


/**
 * Generamos el token
 */
export const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'})

    return token
}
export const authToken = (req, res, next) => {
    const authToken = req.cookies.coderCookieToken
    
    if(!authToken) {
        return res.status(401).send({
            error: "Not Auth"
        })
    }

    const token = authToken.split(' ')[1] // Bearer ${TOKEN}
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(403).send({error: 'Not authorized'})

        req.user = credentials.user
        next()
    })
}

export const passportCall = (strategy) => { // jwt
    return async (req, res, next) => {
        passport.authenticate(strategy, function(err, user, info) {
            console.log('Passport Call', err, user, info);

            if(err) return next(err)
            if(!user) {
                return res.status(401).send({
                    error: info.messages ? info.messages : info.toString() 
                })
            }

            req.user = user
            next()
        })(req, res, next)
    }
}

export const authorization = (role) => {
    return async(req, res, next) => {
        console.log('utils authorization', role, req.user.user, req.user.user.rol !== role );
        if(!req.user) return res.status(401).send({error: 'Unauthorized'})
        if(req.user.user.rol != role) return res.status(403).send({error: "No permissions"})

        next()
    }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

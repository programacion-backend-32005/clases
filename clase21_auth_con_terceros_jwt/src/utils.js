import {fileURLToPath } from 'url'
import {dirname} from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
    const authHeader = req.headers.auth
    if(!authHeader) {
        return res.status(401).send({
            error: "Not Auth"
        })
    }

    const token = authHeader.split(' ')[1] // Bearer ${TOKEN}
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(403).send({error: 'Not authorized'})

        req.user = credentials.user
        next()
    })
}


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

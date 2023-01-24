import {fileURLToPath } from 'url'
import {dirname} from 'path'
import bcrypt from 'bcrypt'

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


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

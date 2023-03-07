import dotenv from 'dotenv'

dotenv.config()
export default {
    persistence: process.env.PERSISTENCE,
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
    jwtCookieName: process.env.COOKIE_NAME_JWT,
    cookieSecret: process.env.COOKIE_SECRET,
    mongoURI: process.env.MONGO_URI,
    mongoDbName: process.env.MONGO_DB_NAME
}
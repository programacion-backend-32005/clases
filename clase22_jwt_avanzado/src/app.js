import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import __dirname from './utils.js'


import jwtRouter from './routes/jwt.router.js'
import cookieParser from 'cookie-parser'


const app = express()
const dbName = "myCompany"
const uri = "mongodb+srv://r2d2:TImCZj6dj0XAaHFN@cluster0.gl63h07.mongodb.net/?retryWrites=true&w=majority"

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser('coderCookieToken'))

app.use(express.static(__dirname + '/public'))

initializePassport()
app.use(passport.initialize())

function auth(req, res, next) {
    console.log(req.session);
    if(req.session?.user) return next()

    return res.status(401).send('Auth Error')
}

app.get('/', (req, res) => res.send('OK'))
app.use('/jwt', jwtRouter)


mongoose.set('strictQuery')
mongoose.connect(uri, { dbName }, error => {
    if(error) {
        console.error('No db connected');
        return
    }

    console.log('DB connected!');
    app.listen(8080, () => {
        console.log('Server Listening...');
    })

})
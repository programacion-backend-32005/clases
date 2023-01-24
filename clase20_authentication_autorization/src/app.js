import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import sessionRouter from './routes/session.router.js'
import passport from 'passport'
import initializePassport from './config/passport.config.js'


const app = express()
const dbName = "myCompany"
const uri = "mongodb+srv://r2d2:TImCZj6dj0XAaHFN@cluster0.gl63h07.mongodb.net/?retryWrites=true&w=majority"

app.use(session({
    store: MongoStore.create({
        mongoUrl: uri,
        dbName,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 15
    }),
    secret: '123456',
    resave: true,
    saveUninitialized: true
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

function auth(req, res, next) {
    if(req.session?.user) return next()

    return res.status(401).send('Auth Error')
}

app.get('/', (req, res) => res.send('OK'))
app.get('/private', auth, (req, res) => res.json(req.session.user))
app.use('/session', sessionRouter)


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
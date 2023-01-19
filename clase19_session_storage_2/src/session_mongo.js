import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

const app = express()

const uri = "mongodb+srv://r2d2:TImCZj6dj0XAaHFN@cluster0.gl63h07.mongodb.net/?retryWrites=true&w=majority"

app.use(session({
    store: MongoStore.create({
        mongoUrl: uri,
        dbName: "sessions",
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

function auth(req, res, next) {
    if(req.session?.user) return next()

    return res.status(401).send('Auth Error')
}

app.get('/', (req, res) => res.send('OK'))
app.get('/login', (req, res) => {
    const { username } = req.query

    req.session.user = username
    
    res.send('Login Success')
})
app.get('/logout', (req, res) => req.session.destroy(err => res.send(err)) )
app.get('/private', auth, (req, res) => res.send('Private Page'))

app.listen(8080)
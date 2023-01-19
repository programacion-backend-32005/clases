import express from 'express'
import session from 'express-session'
import FileStore from 'session-file-store'

const app = express()
const fileStorage = FileStore(session)


// mongodb+srv://el_profe:QndJxyOrQJyfjWnZ@cluster0.timeekf.mongodb.net/?retryWrites=true&w=majority
app.use(session({
    store: new fileStorage({
        path: './sessions',
        ttl: 100, // Tiempo de vida de la session en Segundos
        retries: 2
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
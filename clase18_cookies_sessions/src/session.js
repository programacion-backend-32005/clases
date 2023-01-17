import express from 'express'
import session from 'express-session'

const app = express()

app.use(session({
    secret: 'secretsecret',
    resave: true,
    saveUninitialized: true
}))


// Valida el usuario en session
function auth(req, res, next) {
    if(req.session?.user === 'igna' && req.session?.admin) {
        return next()
    }

    return res.status(401).send('Error de authentication')
}


app.get('/', (req, res) => res.send('ok'))
app.get('/session', (req, res) => {

    if (req.session.counter) {
        req.session.counter++
        return res.send(`Se ha visita el stio ${req.session.counter} veces.`)
    }

    req.session.counter = 1
    res.send('Welcome')
})

// Iniciar Sesion
app.get('/login', (req, res) => {
    const { username, password } = req.query
    if(username !== 'igna' || password !== '123456') {
        return res.send('login failed')
    }

    req.session.user = username
    req.session.admin = true

    res.send('Login Success!!')
})

// Endpoint privados, solo acceso para admins
app.get('/private', auth, (req, res) => {
    res.send('Welcome Adminstrador !! to the Jungle !!')
})

// Cerrar Session 
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) res.send('Logout ok')
        else res.send({status: 'Logout error', body: err})
    })
})


app.listen(8080)
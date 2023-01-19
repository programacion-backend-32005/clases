import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import pokeRouter from './routes/pokeapi.router.js'
import pokeViews from './routes/pokeviews.router.js'
import sessionRouter from './routes/sessions.router.js'

const app = express()

const MONGO_URI  = 'mongodb+srv://r2d2:TImCZj6dj0XAaHFN@cluster0.gl63h07.mongodb.net/?retryWrites=true&w=majority'

// Configurar Session
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 30
    }),
    secret: 'redisthebesttrainer',
    resave: true,
    saveUninitialized: true
}))

function auth(req, res, next) {
    if(req.session?.user) return next()

    return res.status(401).render('errors/base', {error: 'No authenticado'})
}

// Para traer la informacion de post como JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Configuramos el motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Configuramos la carpeta publica
app.use(express.static( __dirname + '/public'))

// Configuramos las rutas 
app.use('/pokemon', auth, pokeViews)
app.use('/sessions', sessionRouter)
app.use('/api/pokemon', pokeRouter)

app.get('/', (req, res) => { res.send('Work great!') })

// Conexion a DB Mongo Atlas

mongoose.set('strictQuery', false) 
mongoose.connect(MONGO_URI, error => {
    if(error) {
        console.error('No se pudo conectar a la DB');
        return
    }

    console.log('DB connected!');
    app.listen(8080, () => console.log('Server listenming...'))
})


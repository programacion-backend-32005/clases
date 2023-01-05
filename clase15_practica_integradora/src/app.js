import express from 'express'
import __dirname from './utils.js'
import pokeRouter from './routes/pokeapi.router.js'
import pokeViews from './routes/pokeviews.router.js'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'

const app = express()

// Para traer la informacion de post como JSON
app.use(express.json())

// Configuramos el motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Configuramos la carpeta publica
app.use(express.static( __dirname + '/public'))

// Configuramos las rutas 
// Ruta de vistas
app.use('/pokemon', pokeViews)
// Ruta de API
app.use('/api/pokemon', pokeRouter)

app.get('/', (req, res) => { res.send('Work great!') })

// Conexion a DB Mongo Atlas
const MONGO_URI  = 'mongodb+srv://el_profe:QndJxyOrQJyfjWnZ@cluster0.timeekf.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', false) 
mongoose.connect(MONGO_URI, error => {
    if(error) {
        console.error('No se pudo conectar a la DB');
        return
    }

    console.log('DB connected!');
    app.listen(8080, () => console.log('Server listenming...'))
})


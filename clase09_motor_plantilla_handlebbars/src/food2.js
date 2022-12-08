import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import viewsRouter from './routers/views.router.js'

const app = express()

app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())   // Inicializamos el motor de plantillas
app.set('views', __dirname + '/views')          // Seteamos la carpeta de vistas
app.set('view engine', 'handlebars')            // Le decimso que renderize con el motor 

app.use('/', viewsRouter)

const server = app.listen(8080, () => {
    console.log('Listening on 8080')
})


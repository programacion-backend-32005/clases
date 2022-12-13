import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'

import viewsRouter from './routes/views.router.js'

const app = express()

const httpServer = app.listen(8080, () => console.log('Listeing...'))
const socketServer = new Server(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))
app.use('/', viewsRouter)
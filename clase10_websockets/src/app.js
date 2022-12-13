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

socketServer.on('connection', socket => {
    console.log('New client connected!!');

    socket.on('message', data => {
        console.log('FROM CLIENT: ', data);
    })

    socket.emit('para_uno', 'Este le llega a un solo socket')

    socket.broadcast.emit('para_el_resto', 'Este le llega al resto !!')

    socketServer.emit('everyone', 'Llego a todos')

})
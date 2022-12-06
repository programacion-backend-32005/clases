import express from 'express'
import usersRouter from './routers/users.router.js'
import petsRouter from './routers/pets.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/static', express.static('public'))

app.use('/api/users', usersRouter)
app.use('/api/pets', petsRouter)
app.use('/', (req, res) => res.send('HOME'))

app.listen(8080)


import express from 'express'
import config from './config/config.js'
import ticketRouter from './routes/tickets.router.js'
import userRouter from './routes/users.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/users', userRouter)
app.use('/api/tickets', ticketRouter)

app.listen(8080, () => console.log("Listening ..."))
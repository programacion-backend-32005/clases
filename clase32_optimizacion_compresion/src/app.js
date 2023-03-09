import express from 'express'
import usersRouter from './routes/user.js'
import errorHandler from './middlewares/errors/error_middleware.js'

const app = express()
app.use(express.json())

app.use('/api/users', usersRouter)
app.use(errorHandler)

app.listen(8080)

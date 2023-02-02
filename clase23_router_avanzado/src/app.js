import express from 'express'
import UsersRouter from './router/user.router.js'

const app = express()
app.listen(8080)

const usersRouter = new UsersRouter()
app.use('/users', usersRouter.getRouter() )

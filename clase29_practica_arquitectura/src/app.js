import express from 'express'
import usersRouter from './routes/users.router.js'
import businessRouter from './routes/business.router.js'
import ordersRouter from './routes/orders.router.js'

const app = express()

app.use('/api/users', usersRouter)
app.use('/api/business', businessRouter)
app.use('/api/orders', ordersRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Running on ${PORT}...`))

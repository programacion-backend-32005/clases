import express from 'express'
import mongoose from 'mongoose'
import usersRouter from './routes/users.router.js'
import businessRouter from './routes/business.router.js'
import ordersRouter from './routes/orders.router.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/users', usersRouter)
app.use('/api/business', businessRouter)
app.use('/api/orders', ordersRouter)

const PORT = process.env.PORT || 8080

mongoose.connect('mongodb://127.0.0.1:27017', {
    dbName: 'deliveryDB'
})
app.listen(PORT, () => console.log(`Running on ${PORT}...`))

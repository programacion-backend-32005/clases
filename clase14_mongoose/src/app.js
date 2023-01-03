import express from 'express'
import router from './routers/users.router.js'
import mongoose, { mongo } from 'mongoose'

const app = express()
app.use(express.json())
app.listen(8080, () => console.log('Listening...'))

mongoose.connect('mongodb+srv://el_profe:QndJxyOrQJyfjWnZ@cluster0.timeekf.mongodb.net/?retryWrites=true&w=majority', error => {
    if(error) {
        console.error('Cannot connect to database ', error);
        process.exit()
    }
})


app.use('/api/users', router)
app.get('/', (req, res) => {
    res.send('ok')
})





// DBaaS
/**
 * username: el_profe
 * password: QndJxyOrQJyfjWnZ
 */
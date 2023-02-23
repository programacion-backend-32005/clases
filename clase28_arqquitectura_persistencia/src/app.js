import express from 'express'
import contactsRouter from './routes/contacts.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.listen(8080)

app.get('/', (req, res) => res.send('ok'))
app.use('/contacts', contactsRouter)
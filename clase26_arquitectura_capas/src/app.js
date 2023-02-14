import express from 'express'
import router from './routers/toys.router.js'

const app = express()
app.use(express.json())

app.use('/api/toy', router)

app.listen(8080, () => console.log("Server Listening ..."))
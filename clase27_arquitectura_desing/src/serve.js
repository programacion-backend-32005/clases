import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/test', (req, res) => {
    res.json({status: 'OK'})
})


app.listen(8080)


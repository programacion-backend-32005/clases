import express from 'express'
import cookieParser from 'cookie-parser'
import __dirname from './utils.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.json(req.cookies.user)
})

app.post('/', (req, res) => {
    console.log(req.body);
    res.cookie('user', req.body)

    res.send('Cookie setted')
})

app.listen(8080)

import express from 'express'
import compression from 'express-compression'

const app = express()

app.listen(8080)

app.use(compression({
    brotli: {enabled: true, zlib: {}}
}))
app.get('/stringlargo', (req, res) => {
    let string = "Saludos a German, soy un string ridiculamente largo !!"

    for (let i = 0; i < 10e5; i++) {
        string += "Saludos a German, soy un string ridiculamente largo !!"
    }

    res.send(string)
})
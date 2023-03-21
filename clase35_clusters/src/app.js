import express from 'express'

const app = express()
app.get('/', (req, res) => {
    res.send({ status: "scucess", message: `From DOCKER` })
})

app.get('/simple', (req, res) => {
    let suma = 0
    for (let i = 0; i < 10000; i++) suma += i

    res.send({ status: 'success', message: `Process [${process.pid}]. Result: ${suma}` })
})

app.get('/complex', (req, res) => {
    let suma = 0
    for (let i = 0; i < 5e8; i++) suma += i

    console.log(`Process [${process.pid}]. Result: ${suma}`);
    res.send({ status: 'success', message: `Process [${process.pid}]. Result: ${suma}` })
})

app.listen(8080, () => console.log(`Listening on 8080...`))

import express from 'express'
import { fork } from 'child_process'

const app = express()


app.get('/', (req, res) => res.send('HOME'))

app.get('/suma', (req, res) => {
    const child = fork('./src/operacionCompleja.js');
    console.log('PID 2', child.pid)
    child.send('Inicia el calculo!!');
    
    child.on('message', result => {
        res.send(`El resultado es ${result}`)
    })
})

console.log('PID', process.pid)
app.listen(8080)
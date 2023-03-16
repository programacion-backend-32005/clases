import express from 'express'
import { addLogger } from './utils/logger.js'

const app = express()

app.use(addLogger)

app.get('/simple', (req, res) => {
    let sum = 0
    for (let i = 0; i < 1000000; i++) {
        sum += i
    }

    res.send({ sum })
})

app.get('/complex', (req, res) => {
    let sum = 0
    for (let i = 0; i < 5e8; i++) {
        sum += i
    }

    res.send({ sum })
})


app.get('/', (req, res) => {
    req.logger.fatal('FATAL ERROR')
    req.logger.error('error on DB')
    req.logger.warning('Dont worry, it\'s just warning')
    req.logger.info('Se llamo a la pagian principal')
    req.logger.debug('1 + 1 === 2 ???')

    res.send({message: 'Logger testing!!'})
})

app.listen(8080)
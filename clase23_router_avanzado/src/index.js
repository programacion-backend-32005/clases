import express from 'express'

const app = express()

app.param('word', (req, res, next, word) => {
    console.log(word)
    if(!word) req.word = null
    else req.params.word = word.toLowerCase()

    next()
})


app.get('/:word', (req, res) => {
    const word = req.params.word
    
    res.send(word)
})

app.get('/:word', (req, res) => {
    const word = req.params.word
    
    res.send(word)
})

app.put('/:word', (req, res) => {
    const word = req.params.word
    
    res.send(word)
})


app.get('*', (req, res) => {
    res.status(404).send('No puede manejar la palabra indicada')
})

app.listen(8080)
import express from 'express'

const app = express()

// Middleeware de manejo de errores
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Somethink broke!!')
})


// Middleware de Application
app.use(function(req, res, next) {
    console.log(req.query);
    if (req.query.name == 'maxi') {
        return res.send('Error maxi no puede ver la info')
    }

    console.log('Time:', new Date().toLocaleTimeString())
    next()
})

// Middleware de endpoint
function mid1(req, res, next) {
    req.dato1 = 'My data, not yours. MINE!!'
    next()
}

app.use('/info', mid1, (req, res) => {
    console.log(req.dato1);
    res.send('More info')
})

app.use('/', (req, res) => {
    console.log(req.dato1);
    res.send('ok')
})

app.listen(8080)
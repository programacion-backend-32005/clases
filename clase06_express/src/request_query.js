const express = require('express')

const app = express()
app.use(express.urlencoded({extended: true}))

app.get('/ejemploquery', (req, res) => {

    console.log(req.query);

    const age = req.query.age

    res.send(req.query)
})

app.get('/saludar/:nombre/:apellido', (req, res) => {
    // :nombre lo vamos a encontrar en req.params

    console.log(req.params);
    const saludo = `Saludos a ${req.params.nombre} ${req.params.apellido}`

    res.send(saludo)
})




app.listen(8080, () => {
    console.log('Servidor arriba y escuchando el puerto 8080!!');
})
const express = require('express')

const app = express()

const users = [
    {id: "1", nombre: "German", apellido: "Rodas", gender: "M"},
    {id: "2", nombre: "Ezequiel", apellido: "Klausing", gender: "M"},
    {id: "3", nombre: "R2", apellido: "Verbel", gender: "M"},
    {id: "4", nombre: "Alan", apellido: "Sinicco", gender: "M"},
    {id: "5", nombre: "Paula ", apellido: "Belvedere", gender: "F"},
    {id: "6", nombre: "Evelyn", apellido: "Andrada", gender: "F"},
    {id: "7", nombre: "Florencia", apellido: "Diaz", gender: "F"},
]

app.get('/', (req, res) => {
    const gender = req.query.gender

    if(gender && (gender.toUpperCase() == 'M' || gender.toUpperCase() == 'F')) {
        const userFiltered = users.filter(u => u.gender === gender.toUpperCase())
        res.send(userFiltered)
    } else {
        res.send({users})
    }
})


app.listen(8080, () => {
    console.log('Servidor arriba y escuchando el puerto 8080!!');
})
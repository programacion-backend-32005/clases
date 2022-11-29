const express = require('express')

const app = express()

const users = [
    {id: "1", nombre: "German", apellido: "Rodas"},
    {id: "2", nombre: "Ezequiel", apellido: "Klausing"},
    {id: "3", nombre: "R2", apellido: "Verbel"},
]

app.get('/', (req, res) => {
    res.send({users})
})

app.get('/:id', (req, res) => {
    const id = req.params.id
    const user = users.find(u => u.id === id)
    if(!user) return res.send({error: "User not found"})
    
    res.send({user}) // {user: user}
})




app.listen(8080, () => {
    console.log('Servidor arriba y escuchando el puerto 8080!!');
})
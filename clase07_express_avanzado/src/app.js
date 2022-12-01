import express from 'express'

const app = express()
const server = app.listen(8080, () => console.log("Server running..."))

let users = []

app.use(express.json()) // Para obtener json del body
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => res.send('OK'))

app.get('/api/user', (req, res) => res.send(users))

app.post('/api/user', (req, res) => {
    const user = req.body

    if(!user.firstname) {
        return res.status(400).send({status: "error", error: "Valores incompletos"})
    }

    users.push(user)

    res.send({status: "success", message: "User Created"})
})

app.put('/api/user', (req, res) => {
    const user = req.body

    if(!user.firstname) { // Valimos que venga el primer nombre
        return res.status(400).send({status: "error", error: "Valores incompletos"})
    }

    // Buscamos el usuario y obtenemos el index
    const idx = users.findIndex(u => u.firstname == user.firstname)

    if (idx < 0) { // Valimos que encontro el usuario
        return res.status(404).send({status: "error", error: "User not found"})
    }

    users[idx] = user // Actualizamos el usuario

    res.send({status: "success", message: "User Updated"}) // Devolvemos la respuesta

})

app.delete('/api/user/:name', (req, res) => {
    const name = req.params.name

    const actualTotal = users.length // Tamaño antes de filtrar
    users = users.filter(u => u.firstname != name) // FIltramos
    
    if(users.length == actualTotal) { // Validamos si encontro un usuario con el nombre
        return res.status(404).send({status: "error", error: "User not found"})
    }

    res.send({status: "success", message: "User Deleted"})

})
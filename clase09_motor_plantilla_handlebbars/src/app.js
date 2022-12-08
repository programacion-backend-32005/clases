import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'

const app = express()

app.engine('handlebars', handlebars.engine())   // Inicializamos el motor de plantillas
app.set('views', __dirname + '/views')          // Seteamos la carpeta de vistas
app.set('view engine', 'handlebars')            // Le decimso que renderize con el motor 


app.get('/', (req, res) => {
    const testUser = {
        name: "Pablo",
        lastname: "Maglione"
    }

    res.render('index', testUser)
})

app.get('/user', (req, res) => {
    const users = [{
        name: "Pablo",
        lastname: "Maglione",
        age: 24,
        email: "pablo.maglione@r2.com",
        phone: 1234567
    },
    {
        name: "Marcos",
        lastname: "Ca;etes",
        age: 23,
        email: "marcos.canete@r2.com",
        phone: 987654
    },{
        name: "Paula",
        lastname: "Baldevere",
        age: 21,
        email: "paula.beldevere@r2.com",
        phone: 13690
    },
    {
        name: "Pool",
        lastname: "Ortega",
        age: 30,
        email: "pool.ortega@r2.com",
        phone: 97531
    }]

    const idxRandom =  Math.floor(Math.random() * 4)
    const user = users[idxRandom]
    user.idx = idxRandom

    res.render('user', user)
})


const server = app.listen(8080, () => {
    console.log('Listening on 8080')
})

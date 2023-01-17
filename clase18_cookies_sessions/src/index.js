import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser("Belvedere"))

app.get('/', (req, res) => res.send('OK'))

// Crear Cookie
app.get('/setCookie', (req, res) => {
    // Crear cookie con Tiempo de vida
    //res.cookie('CookieMartinBuiz', 'Thanos siempre tuvo razon', {maxAge: 10000}).send('Cookie seteada')
    
    // Crear cookie sin Tiempo de vida
    res.cookie('CookieMartinBuiz', 'Thanos siempre tuvo razon').send('Cookie seteada')
})

app.get('/setSignedCookie', (req, res) => {
    res.cookie('SignedCookie', 'Esto vtiene clave yu esta firmada', {signed: true}).send('Signed Cookie setted!')
})

// Obtener Informacion de una cookie
app.get('/getCookie', (req, res) => {
    const info = req.cookies
    console.log(req.cookies);
    console.log(req.signedCookies);
    console.log(req.cookies['CookieMartinBuiz']);

    res.send("Informacion: " + JSON.stringify(req.cookies))
})

app.get('/deleteCookie', (req, res) => {
    res.clearCookie('CookieMartinBuiz').send('Se borro la cookie de Martin')
})


app.listen(8080)
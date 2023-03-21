import cluster from 'cluster'
import { cpus } from 'os'
import express from 'express'

const lenCPUs = cpus().length

// Instalar DOCKER

if(cluster.isPrimary) {

    console.log('Proceso Master, generando workers');
    for (let i = 0; i < lenCPUs; i++) {
        cluster.fork()
    }


} else  {
    console.log(`Process: (${process.pid})`);

    const app = express()
    app.get('/', (req, res) => {
        res.send({status: "scucess", message: `Request atendido por un worker ${process.pid}`})
    })

    app.get('/simple', (req, res) => {
        let suma = 0
        for (let i = 0; i < 10000; i++) suma += i

        res.send({status: 'success', message: `Process [${process.pid}]. Result: ${suma}`})
    })

    app.get('/complex', (req, res) => {
        let suma = 0
        for (let i = 0; i<5e8; i++) suma += i

        console.log(`Process [${process.pid}]. Result: ${suma}`);
        res.send({status: 'success', message: `Process [${process.pid}]. Result: ${suma}`})
    })

    app.listen(8080, () => console.log(`Listening on 8080 [$process.pid]`))

}   
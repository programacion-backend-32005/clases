import express from 'express'
import router from './routes/products.route.js'
import mongoose from 'mongoose'
import { addLogger } from './utils/logger.js'
import __dirname from './utils/utils.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

const specs = swaggerJSDoc({
    definition: {
        openapi: '3.0.1',
        info: {
            title: "Documentacion de Productos",
            description: "Documentacion Detallada"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
})

const app = express()
app.use(express.json())
app.use(addLogger)

app.use('/swagger', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use('/api/products', router)
app.use('/', (req, res) => res.json({ status: 'ok' }))

mongoose.set('strictQuery')
mongoose.connect(
    'mongodb://127.0.0.1:27017',
    { dbName: 'db_32205_clase44' }
)
    .then(() => app.listen(8080, () => console.log('listening...')))
    .catch(e => console.error('NO DB connected', e))

    
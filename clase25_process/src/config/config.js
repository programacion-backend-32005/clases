import dotenv from 'dotenv'
import { Command } from "commander"

const program = new Command()
program.option('--mode <mode>', 'Modo de trbabajo', 'PRODUCTION')
program.parse() // Atrapa los valores de options

const environment = program.opts().mode

dotenv.config({
    path: environment=="PRODUCTION" ? "./.env.production" : './.env.local'
})

export default {
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPass: process.env.ADMIN_PASSWORD
}
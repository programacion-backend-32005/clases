import express from "express";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import mongoose from "mongoose";
import productRouter from "./routes/products.router.js"
import productViewsRouter from "./routes/products.views.router.js"
import cartRouter from "./routes/cart.router.js"
import chatRouter from "./routes/chat.router.js"
import sessionRouter from "./routes/sessions.router.js"
import messagesModel from "./models/messages.model.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

import __dirname from "./utils.js"
import { passportCall } from "./utils.js"

const MONGO_URI = "mongodb://127.0.0.1:27017"
const MONGO_DB_NAME = "r2_project"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 10000
    }),
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


mongoose.connect(MONGO_URI, {
    dbName: MONGO_DB_NAME
}, (error) => {
    if(error){
        console.log("DB No conected...")
        return
    }
    const httpServer = app.listen(8080, () => console.log("Listening..."))
    const socketServer = new Server(httpServer)
    httpServer.on("error", (e) => console.log("ERROR: " + e))

    app.use((req, res, next) => {
        req.io = socketServer
        next()
    })

    app.use("/products", passportCall('jwt'), productViewsRouter)
    app.use("/session", sessionRouter)

    app.use("/api/products", productRouter)
    app.use("/api/carts", cartRouter)
    app.use("/api/chat", chatRouter)


    socketServer.on("connection", socket => {
        console.log("New client connected")
        socket.on("message", async data => {
        await messagesModel.create(data)
        let messages = await messagesModel.find().lean().exec()
        socketServer.emit("logs", messages)
        })
    })

    app.use("/", (req, res) => res.send("HOME"))
})
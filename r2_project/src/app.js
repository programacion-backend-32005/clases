import express from "express";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import mongoose from "mongoose";
import productRouter from "./routes/products.router.js"
import productViewsRouter from "./routes/products.views.router.js"
import cartRouter from "./routes/cart.router.js"
import chatRouter from "./routes/chat.router.js"
import sessionRouter from "./routes/sessions.router.js"
import { MessageService } from "./repository/index.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import cookieParser from "cookie-parser";
import initializePassport from "./config/passport.config.js";
import config from "./config/config.js";

import __dirname from "./utils.js"
import { passportCall } from "./utils.js"


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser(config.cookieSecret))
app.use(express.static(__dirname + "/public"))
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoURI,
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


mongoose.connect(config.mongoURI, {
    dbName: config.mongoDbName
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

    app.use("/", (req, res) => {
        const user = req.session?.user || null
        res.render("index", { user })
    })

    socketServer.on("connection", socket => {
        console.log("New client connected")
        socket.on("message", async data => {
        await MessageService.create(data)
        let messages = await MessageService.get()
        socketServer.emit("logs", messages)
        })
    })


})
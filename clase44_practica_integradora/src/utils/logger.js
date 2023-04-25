import winston from "winston"

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: "debug"
        }),
        new winston.transports.File({
            level: "error",
            filename: './logs/errors.log'
        })
    ]
})

const addLogger = (req, res, next) => {
    logger.info(`[${req.method}] en ${req.url} - ${new Date().toLocaleTimeString()}`)

    next()
}

export {
    logger,
    addLogger
}
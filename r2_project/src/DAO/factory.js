import config from '../config/config.js'
import mongoose, { mongo } from 'mongoose'

export const DAO = { Cart, Message, Product, User }

switch(config.persistence) {
    default: //case 'MONGO':
        console.log('connecting mongo...');

        mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: config.mongoDbName,

        }, () => console.log('Mongo connected'))

        

        DAO.Product = await import('./mongo/products.mongo.js')
        DAO.Message = await import('./mongo/messages.mongo.js')
        DAO.User = await import('./mongo/user.mongo.js')
        DAO.Cart = await import('./mongo/cart.mongo.js')

        break
}
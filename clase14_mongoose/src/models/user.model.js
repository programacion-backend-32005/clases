import mongoose from 'mongoose'

// Nombre de la coleccion
const userCollection = 'users'

// Esquema del documento
const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    age: Number,
    email: {
        type: String,
        unique: true
    }
})


// Creacion del modelo. Collecion + Schema
export const userModel = mongoose.model(userCollection, userSchema)
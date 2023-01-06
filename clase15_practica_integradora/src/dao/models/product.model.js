import mongoose from 'mongoose'

const pokeCollection = 'pokemons'

const pokeSchema = new mongoose.Schema({
    name: String,
    id: Number,
    type: String,
    photo: String
})

const pokeModel = mongoose.model(pokeCollection, pokeSchema)

export default pokeModel
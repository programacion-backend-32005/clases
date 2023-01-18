import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const pokeCollection = 'pokemons'

const pokeSchema = new mongoose.Schema({
    name: String,
    id: Number,
    type: String,
    photo: String
})

pokeSchema.plugin(mongoosePaginate)
const pokeModel = mongoose.model(pokeCollection, pokeSchema)

export default pokeModel
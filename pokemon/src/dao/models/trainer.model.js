import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const trainerCollection = 'trainers'

const trainerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String
})

trainerSchema.plugin(mongoosePaginate)
const trainerModel = mongoose.model(trainerCollection, trainerSchema)

export default trainerModel
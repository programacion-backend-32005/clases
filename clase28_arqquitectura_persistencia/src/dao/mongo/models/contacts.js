import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number
})

export default mongoose.model('contacts', contactSchema)
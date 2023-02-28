import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    products: []
})

const BusinessModel = mongoose.model('Business', schema)

export default BusinessModel
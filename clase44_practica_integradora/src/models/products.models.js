import mongoose from "mongoose";

const ProductModel = mongoose.model('Products', new mongoose.Schema({
    name: String,
    price: Number,
    categories: [{type: String }]
}))

export default ProductModel
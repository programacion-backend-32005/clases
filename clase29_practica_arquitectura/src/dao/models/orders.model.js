import mongoose from "mongoose";

const schema = new mongoose.Schema({
    number: Number,
    business: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Business'
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users'
    },
    products: [],
    totalPrice: Number
})

const OrdersModel = mongoose.model('Orders', schema)
export default OrdersModel
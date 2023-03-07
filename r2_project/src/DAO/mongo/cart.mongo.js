import CartModel from "./models/cart.model.js";

export default class Cart {

    constructor() {}

    get = async() => {
        return await CartModel.find()
    }

    add = async(data) => {
        await CartModel.create(data )
        return true
    }

}
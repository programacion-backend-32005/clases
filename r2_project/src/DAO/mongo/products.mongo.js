import ProductModel from "./models/products.model.js";

export default class Product {

    constructor() {}

    get = async() => {
        return await ProductModel.find()
    }

    create = async(data) => {
        await ProductModel.create(data )
        return true
    }

}
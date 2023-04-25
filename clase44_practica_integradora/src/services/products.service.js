import ProductModel from "../models/products.models.js";
import { logger } from '../utils/logger.js'

export default class ProductService {

    get = async () => {
        return await ProductModel.find()
    }

    getByID = async (id) => {
        return await ProductModel.findById(id)
    }

    create = async (object) => {
        try {
            return await ProductModel.create(object)
        } catch (error) {
            logger.error(error)
            return {}
        }
    }

    update = async (id, object) => {
        return await ProductModel.updateOne({ _id: id }, { $set: object })
    }

    delete = async (id) => {
        return await ProductModel.deleteOne({ _id: id })
    }
}
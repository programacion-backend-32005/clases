import { OrdersModel } from '../models/orders.model.js'

export default class Order {
    getOrders = async() => {
        return await OrdersModel.find()
    }

    getOrderByID = async(id) => {
        return await OrdersModel.findOne({_id: id})
    }

    createOrder = async(order) => {
        return await OrdersModel.create(order)
    }

    updateOrder = async(id, order) => {
        const result = await OrdersModel.updateOne({_id: id}, {$set: order})

        return result
    }
}
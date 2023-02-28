import User from '../dao/classes/users.dao.js'
import Business from '../dao/classes/business.dao.js'
import Order from '../dao/classes/orders.dao.js'

const usersService = new User()
const businessService = new Business()
const ordersService = new Order()

export const getOrders = async(req, res) => {
    const result = await ordersService.getOrders()

    res.send({status: 'success', result })
}

export const getOrderByID = async(req, res) => {
    const { oid } = req.params

    const order = await ordersService.getOrderByID(oid)

    res.send({status: 'success', result: order})
}

export const createOrder = async(req, res) => {
    // Informacion del BODY. Los ids de usario y negocio, y lista de productos, por ID
    const { user: uid, business: bid, products } = req.body

    const user = await usersService.getUserByID(uid)
    const business = await businessService.getBusinessByID(bid)

    // actualOrders es un a lista de los productos del negocio {id, price, name}
    const actualOrders = business.products.filter( product => products.includes(product.id))
    // La suma de todos los productos
    const sum = actualOrders.reduce((acc, prev) => {acc += prev.price; return acc }, 0)

    // EL numero de orden es un numerio aleatorio
    const orderNumber = Date.now() + Math.floor(Math.random()*10000 + 1)
    const order = {
        number: orderNumber,
        business: bid,
        user: uid,
        status: 'PENDING',
        products: actualOrders.map(p => p.id),
        totalPrice: sum
    }
    const orderResult = await ordersService.createOrder(order)

    user.orders.push(orderResult._id)
    await usersService.updateUser(uid, user)

    res.send({status: 'success', result: 'createOrder'})
}

export const resolveOrder = async(req, res) => {
    const { resolve } = req.query
    const { oid } = req.params

    const order = await ordersService.getOrderByID(oid)
    order.status = resolve

    await ordersService.updateOrder(order._id, order)

    res.send({status: 'success', result: 'Order Resolved'})
}
export const getOrders = async(req, res) => {
    res.send({status: 'success', result: 'getOrders'})
}

export const getOrderByID = async(req, res) => {
    res.send({status: 'success', result: 'getOrderByID'})
}

export const createOrder = async(req, res) => {
    res.send({status: 'success', result: 'createOrder'})
}

export const resolveOrder = async(req, res) => {
    res.send({status: 'success', result: 'resolveOrder'})
}
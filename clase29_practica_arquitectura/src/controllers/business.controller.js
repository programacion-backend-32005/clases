import Business from '../dao/classes/business.dao.js'

const businessService = new Business()

export const getBusiness = async(req, res) => {
    const result = await businessService.getBusiness()
    if(!result) return res.status(500).send({status: "error", error: 'Something wrong'})

    res.send({status: 'success', result })
}

export const getBusinessByID = async(req, res) => {
    const { bid } = req.params

    const result = await businessService.getBusinessByID(bid)
    if(!result) return res.status(500).send({status: "error", error: 'Something wrong'})

    res.send({status: 'success', result })
}

export const createBusiness = async(req, res) => {
    const business = req.body

    const result = await businessService.saveBusiness(business)

    if(!result) return res.status(500).send({status: "error", error: 'Something wrong'})

    res.send({status: 'success', result })
}

export const addProduct = async(req, res) => {
    const product = req.body
    const { bid } = req.params

    const business = await businessService.getBusinessByID(bid)
    business.products.push(product)

    await businessService.updateBusiness(business._id, business)

    res.send({status: 'success', result: 'Business updated'})
}
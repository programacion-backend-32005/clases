import BusinessModel from '../models/business.model.js'

export default class Business {
    getBusiness = async() => {
        return await BusinessModel.find()
    }

    getBusinessByID = async(id) => await BusinessModel.findOne({_id: id})

    saveBusiness = async(business) => {
        return await BusinessModel.create(business)
    }

    updateBusiness = async(id, business) => {
        const result = await BusinessModel.updateOne({_id: id}, { $set: business })

        return result
    }
}
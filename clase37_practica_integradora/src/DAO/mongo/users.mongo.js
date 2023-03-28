import UserModel from './models/users.model.js'

export default class User {

    constructor() {}

    get = async() => {
        return await UserModel.find()
    }

    create = async(data) => {
        return await UserModel.create(data)
    }

    getByID = async(id) => {
        return await UserModel.findById(id)
    }

    update = async(id, data) => {
        return await UserModel.updateOne({_id: id}, data)
    }
}
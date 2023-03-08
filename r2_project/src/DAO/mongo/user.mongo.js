import UserModel from "./models/user.model.js"

export default class User {

    constructor() {}

    get = async() => {
        return await UserModel.find()
    }

    create = async(data) => {
        await UserModel.create(data )
        return true
    }

    getOneByID = async(id) => {
        return await UserModel.findById(id)
    }

    getOneByEmail = async(email) => {
        return await UserModel.findOne({ email }).lean().exec()
    }

}
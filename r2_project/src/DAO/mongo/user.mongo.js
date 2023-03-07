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

}
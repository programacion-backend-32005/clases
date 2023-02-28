import UsersModel from '../models/users.model.js'

export default class User {

    getUsers = async () => {
        const users = await UsersModel.find()

        return users
    }

    getUserByID = async(id) => {
        const user = UsersModel.findOne({_id: id})

        return user
    }

    saveUser = async(user) => {
        const result = await UsersModel.create(user)

        return result
    }

    updateUser = async(id, user) => {
        const result = await UsersModel.updateOne({_id: id}, {$set: user})

        return result
    }

}
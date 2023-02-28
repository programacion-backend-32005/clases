import User from '../dao/classes/users.dao.js'

const usersService = new User()

export const getUsers = async(req, res) => {
    const result = await usersService.getUsers()
    res.send({status: 'success', result })
}

export const getUserByID = async(req, res) => {
    const {uid} = req.params
    const user = await usersService.getUserByID(uid)

    res.send({status: 'success', result: user })
}

export const saveUsers = async(req, res) => {
    const user = req.body
    const result = await usersService.saveUser(user)

    res.send({status: 'success', result })
}
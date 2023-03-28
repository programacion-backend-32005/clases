import { UserService } from "../repository/index.js";

export const get = async(req, res) => {
    const users = await UserService.get()
    res.json({ users })
}

export const create = async(req, res) => {
    const user = req.body
    const userNew = await UserService.create(user)

    res.json(userNew)
}

export const addTicket = async(req, res) => {
    const { user: userID, ticket: ticketID } = req.query

    const result = await UserService.addTicket(userID, ticketID)
    res.json({result})
}

export const reminderTickets = async(req, res) => {
    const { userID } = req.params
    const result = await UserService.reminderTicket(userID)

    res.json({result})
}
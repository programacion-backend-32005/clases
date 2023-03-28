import { TicketService } from "../repository/index.js";

export const get = async(req, res) => {
    const tickets = await TicketService.get()
    res.json({ tickets })
}

export const create = async(req, res) => {
    const ticket = req.body
    const ticketNew = await TicketService.create(ticket)

    res.json(ticketNew)
}


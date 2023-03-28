import TicketModel from './models/tickets.model.js'

export default class Ticket {

    constructor() {}

    get = async() => {
        return await TicketModel.find()
    }

    create = async(data) => {
        return await TicketModel.create(data)
    }

    getByID = async(id) => {
        return await TicketModel.findById(id)
    }

}
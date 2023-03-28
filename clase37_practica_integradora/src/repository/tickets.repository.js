import TicketDTO from '../DAO/DTO/tickets.dto.js'

export default class TicketRepository {

    constructor(dao) {
        this.dao = dao
    }

    get = async() => {
        return await this.dao.get()
    }

    create = async(data) => {
        const dataToInsert = new TicketDTO(data)
        return await this.dao.create(dataToInsert)
    }

    getByID = async(id) => {
        return await this.dao.getByID(id)
    }

}
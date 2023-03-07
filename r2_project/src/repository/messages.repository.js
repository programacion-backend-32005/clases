import MessageDTO from '../DAO/DTO/messages.dto.js'

export default class MessagesRepository {

    constructor(dao) {
        this.dao = dao
    }

    get = async() => {
        return await this.dao.get()
    }

    create = async(data) => {
        const dataToInsert = new MessageDTO(data)
        const result = await this.dao.add(dataToInsert)

        return result
    }

}
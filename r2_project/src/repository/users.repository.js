import UserDTO from '../DAO/DTO/user.dto.js'

export default class UserRepository {

    constructor(dao) {
        this.dao = dao
    }

    get = async() => {
        return await this.dao.get()
    }

    create = async(data) => {
        const dataToInsert = new UserDTO(data)
        const result = await this.dao.add(dataToInsert)

        return result
    }

}
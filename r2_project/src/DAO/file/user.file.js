import FileManager from "./file_manager.js"

export default class User {

    constructor() {
        this.fileManager = new FileManager("users.json")
    }

    get = async() => {
        return await this.fileManager.get()
    }

    add = async(data) => {
        return await this.fileManager.add(data)
    }

    getOneByID = async(id) => {
        return await this.fileManager.getOneByParam("id", id)
    }

    getOneByEmail = async(email) => {
        return await this.fileManager.getOneByParam("email", email)
    }

}
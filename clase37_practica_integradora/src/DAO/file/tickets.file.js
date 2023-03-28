import FileManager from "./file_manager.js";

export default class Ticket {

    constructor() {
        this.fileManager = new FileManager("./db/tickets.json")
    }

    get = async() => {
        return await this.fileManager.get()
    }

    create = async(data) => {
        return await this.fileManager.add(data)
    }

    getByID = async(id) => {
        return await this.fileManager.getOneByParam("id", id)
    }

}
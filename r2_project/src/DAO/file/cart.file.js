import FileManager from "./file_manager.js"

export default class Cart {

    constructor() {
        this.fileManager = new FileManager("carts.json")
    }

    get = async() => {
        return await this.fileManager.get()
    }

    create = async(data) => {
        return await this.fileManager.add(data)
    }

}
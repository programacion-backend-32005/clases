import FileManager from "./file_manager.js"

export default class Product {

    constructor() {
        this.fileManager = new FileManager("products.json")
    }

    get = async () => {
        return await this.fileManager.get()
    }

    getPaginate = async (search, options) => {
        const docs = await this.fileManager.get()

        return {
            totalDocs: docs.length,
            docs,
            limit: docs.length,
            page: 1,
            nextPage: null,
            prevPage: null,
            totalPages: 1,
            pagingCounter: 1,
            meta: 'paginator',
        }
    }

    create = async (data) => {
        await ProductModel.create(data)
        return true
    }

}
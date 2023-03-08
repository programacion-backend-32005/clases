import ProductDTO from '../DAO/DTO/products.dto.js'

export default class ProductRepository {

    constructor(dao) {
        this.dao = dao
    }

    get = async() => {
        return await this.dao.get()
    }

    getPaginate = async(search, options) => {
        return await this.dao.getPaginate(search, options)
    }

    add = async(data) => {
        const productToInsert = new ProductDTO(data)
        const result = await this.dao.add(productToInsert)

        return result
    }

}
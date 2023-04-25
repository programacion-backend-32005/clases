import ProductService from "../services/products.service.js";

export default class ProductController {

    constructor() {
        this.service = new ProductService()
    }

    get = async (req, res) => {
        res.json(await this.service.get())
    }

    getByID = async(req, res) => {
        const id = req.params
        res.json(await this.service.getByID(id))
    }

    create = async(req, res) => {
        const object = req.body
        res.json(await this.service.create(object))
    }

    update = async(req, res) => {
        const id = req.params
        const object = req.body

        res.json(await this.service.update(id, object))
        
    }

    delete = async(req, res) => {
        const id = req.params
        res.json(await this.service.delete(id))
    }

}
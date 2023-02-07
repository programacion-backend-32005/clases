import {Router} from "express"
import productModel from "../dao/models/products.model.js"

const router = Router()

router.get("/", async (req, res) => {
    const products = await productModel.find().lean().exec()
    const limit = req.query.limit || 5
    
    res.json(products.slice(0, parseInt(limit)))
    
})


router.get("/view", async (req, res) => {
    const products = await productModel.find().lean().exec()
    res.render('realTimeProducts', {
        data: products
    })
})

router.get("/:id", async (req, res) => {
    const id = req.params.id
    const product = await productModel.findOne({_id: id})
    res.json({
        product
    })
})

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid
    const productDeleted = await productModel.deleteOne({_id: id})

    req.io.emit('updatedProducts', await productModel.find().lean().exec());
    res.json({
        status: "Success",
        massage: "Product Deleted!",
        productDeleted
    })
})

router.post("/", async (req, res) => {
    try {
        const product = req.body
        if (!product.title) {
            return res.status(400).json({
                message: "Error Falta el nombre del producto"
            })
        }
        const productAdded = await productModel.create(product)
        req.io.emit('updatedProducts', await productModel.find().lean().exec());
        res.json({
            status: "Success",
            productAdded
        })
    } catch (error) {
        console.log(error)
        res.json({
            error
        })
    }
})

router.put("/:pid", async (req, res) => {
    const id = req.params.pid
    const productToUpdate = req.body

    const product = await productModel.updateOne({
        _id: id
    }, productToUpdate)
    req.io.emit('updatedProducts', await productModel.find().lean().exec());
    res.json({
        status: "Success",
        product
    })
})


export default router
import { Router } from "express"
import { ProductService } from "../repository/index.js"

const router = Router()

router.get("/", async (req, res) => {
    const products = await ProductService.get()
    const limit = req.query.limit || 5

    res.json(products.slice(0, parseInt(limit)))
})


router.post("/", async (req, res) => {
    try {
        const product = req.body
        if (!product.title) {
            return res.status(400).json({
                message: "Error Falta el nombre del producto"
            })
        }
        const productAdded = await ProductService.add(product)
        req.io.emit('updatedProducts', await ProductService.get());
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


export default router
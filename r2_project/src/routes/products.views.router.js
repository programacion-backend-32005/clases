import { Router } from "express";
import ProductModel from "../models/products.model.js"

const router = Router()

router.get('/', async(req, res) => {

    const limit = req.query?.limit || 10
    const page = req.query?.page || 1

    const options = {
        limit,
        page,
        lean: true
    }

    const data = await ProductModel.paginate({}, options)
    const user = req.session.user

    res.render('products', {data, user})
})


export default router
import { Router } from "express";
import ToyController from "../controllers/toys.controller.js";

// Se encarga de la informacion HTTP (req, res)

const router = Router()
const toyController = new ToyController()

router.get("/", (req, res) => {
    const data = toyController.getAll()
    
    res.json(data)
})

router.post("/", (req, res) => {
    const { body } = req

    const result = toyController.create(body)

    res.json({
        status: "success",
        result
    })
})

export default router
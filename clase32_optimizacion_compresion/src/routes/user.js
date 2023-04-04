import { Router } from "express";
import CustomError from "../services/errors/custom_error.js";
import EErrors from "../services/errors/enums.js";
import { generateUserErrorInfo } from "../services/errors/info.js";


const users = []

const router = Router()

router.get('/', (req, res) => {
    res.send({status: "success", payload: users})
})

router.post('/', async (req, res) => {

    const {first_name, last_name, email, age} = req.body
    try{
        if(!first_name || !last_name || !email) {
            await CustomError.createError({
                name: "User creation error",
                cause: generateUserErrorInfo({first_name, last_name, email, age}),
                message: "Error trying to create user",
                code: EErrors.INVALID_TYPES_ERROR
            })
        }


        const user = {first_name, last_name, email, age}

        users.push(user)

        res.send({status: "success", payload: user})
    } catch(e) {
        console.log('BBBBB', e)
    }
})

export default router
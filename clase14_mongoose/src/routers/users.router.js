import express from 'express'
import mongoose from 'mongoose'
import { userModel } from '../models/user.model.js'

const router = express.Router()

router.get('/', async (req, res) => {
    
    try {
        const users = await userModel.find()
        res.send({
            result: "success",
            payload: users
        })
    } catch (error) {
        console.error("Cannot get users from mongo ", error);
    }

})

router.post('/', async(req, res) => {
    const result = await userModel.create(req.body)

    res.send({
        status: 'success',
        payload: result
    })
})

router.put('/:uuid', async (req, res) => {
    const { uuid } = req.params

    const userToReplace = req.body

    const result = await userModel.updateOne({_id: uuid}, userToReplace)

    res.send({status: 'success', payload: result})
})


router.delete('/:uuid', async (req, res) => {
    const { uuid } = req.params

    const result = await userModel.deleteOne({_id: uuid})

    res.send({status: 'success', payload: result})
})


export default router
import { Router } from "express";
import { ContactsService } from "../repositories/index.js";

const router = Router()


router.get('/', async(req, res) => {
    const result = await ContactsService.getContacts()
    res.send({ status: 'success', payload: result })
})

router.post('/', async(req, res) => {
    const bodyData = req.body

    await ContactsService.createContact(bodyData)

    res.send({ status: 'success' })
})

export default router
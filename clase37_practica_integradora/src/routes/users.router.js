import { Router } from 'express'
import { get, create, addTicket, reminderTickets } from '../controller/users.controller.js'

const router = Router()

router.get('/', get)
router.get('/reminder/:userID', reminderTickets)
router.post('/', create)
router.put('/add', addTicket)

export default router
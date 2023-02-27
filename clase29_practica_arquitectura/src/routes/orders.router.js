import { Router } from 'express'
import { getOrders, getOrderByID, createOrder, resolveOrder } from '../controllers/orders.controller.js'

const router = Router()

router.get('/', getOrders)
router.get('/:oid', getOrderByID)
router.post('/', createOrder)
router.put('/:oid', resolveOrder)

export default router
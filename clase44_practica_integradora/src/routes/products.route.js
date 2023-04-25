import { Router } from 'express'
import ProductController from '../controllers/products.controller.js'

const router = Router()
const controller = new ProductController()

router.get('/', controller.get.bind(controller))
router.get('/:id', controller.getByID.bind(controller))
router.post('/', controller.create.bind(controller))
router.put('/:id', controller.update.bind(controller))
router.delete('/:id', controller.delete.bind(controller))

export default router
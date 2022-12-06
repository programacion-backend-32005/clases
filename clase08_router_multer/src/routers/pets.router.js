import { Router } from 'express'

const router = Router()
const pets = []

router.use(function(req, res, next) {
    console.log('El endpoint de animales');
    next()
})

router.get('/', (req, res) => {
    res.json({ pets })
})

router.post('/', (req, res) => {
    const pet = req.body
    console.log(req);
    pets.push(pet)

    res.json({ pet })
})

export default router
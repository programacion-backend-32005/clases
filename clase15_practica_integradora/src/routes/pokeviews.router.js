import { Router } from 'express'
import pokeModel from '../models/pokemon.model.js'

const router = Router()

router.get('/', async (req, res) => {
    const pokemons = await pokeModel.find().lean().exec()
    
    res.render('index', {
        pokemons
    })
})

router.get('/:name', (req, res) => {
    res.render('one', {})
})

export default router
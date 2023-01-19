import { Router } from 'express'
import mongoose from 'mongoose'
import pokeModel from '../dao/models/pokemon.model.js'

const router = Router()

// Lista todos los pokemons
router.get('/', async (req, res) => {

    const limit = req.query?.limit || 10
    const page = req.query?.page || 1
    // sort en field y elegir (asc o desc)
    
    const filter = req.query?.query || req.body?.query || ""

    const search = {}
    if(filter) {
        search["$or"] = [
            {name: {$regex: filter }},// Expresiones Regulares
            {type: {$regex: filter }}
        ]
    }
    const options = {page, limit, lean: true}

    const result = await pokeModel.paginate(search, options)
    
    console.log(result);

    res.render('pokedex/index', {
        result,
        query: filter
    })
})

// Para borrar un pokemon
router.get('/delete/:id', async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const deleted = await pokeModel.deleteOne({ _id: id })

    console.log(deleted);

    res.redirect('/pokemon')
})

// Vista para crear pokemons
router.get('/create', async (req, res) => {
    res.render('pokedex/create', {})
})

// Vista para crear pokemons
router.post('/create', async (req, res) => {
    const pokemonNew = req.body
    console.log(pokemonNew);

    const pokemonGenerated = new pokeModel(pokemonNew);
    await pokemonGenerated.save();

    console.log(pokemonGenerated);

    res.redirect('pokedex/pokemon/' + pokemonGenerated.name)
})



// Muestra un solo pokemon por el nombre
router.get('/:name', async (req, res) => {
    const name = req.params.name

    const pokemon = await pokeModel.findOne({name: name}).lean().exec()

    res.render('one', { pokemon })
})

export default router
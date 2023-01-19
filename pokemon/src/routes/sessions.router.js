import { Router } from 'express'
import session from 'express-session'
import trainerModel from '../dao/models/trainer.model.js'

const router = Router()

// Vista para registrar entrenadores
router.get('/register', async (req, res) => {
    res.render('sessions/register', {})
})

// Api para crear entrenadores
router.post('/create', async (req, res) => {
    const trainerNew = req.body
    console.log(trainerNew);

    const trainer = new trainerModel(trainerNew);
    await trainer.save();

    res.redirect('/sessions/login')
})

// Vista de login
router.get('/login', async (req, res) => {
    res.render('sessions/login', {})
})

// Api de Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const trainer = await trainerModel.findOne({email, password}).lean().exec()
    if(!trainer) {
        return res.status(401).render('errors/base', { error: 'Error en username y/o password'})
    }


    req.session.user = trainer
    //req.session.user.rol = (username == 'admin') ? 'admin' : 'user'

    res.redirect('/pokemon')
})

// Api de Logout
router.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err)
            res.status(500).render('errors/base', { error: err })
        } else res.redirect('/sessions/login')
    })

    
})

export default router
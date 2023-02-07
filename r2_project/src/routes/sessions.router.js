import { Router } from "express";
import passport from "passport";
import credentials from '../config/credentials.js'

const router = Router()

// REGISTER
router.get('/register', (req, res) => {
    res.render('sessions/register')
})
router.post('/register', passport.authenticate('register', { failureRedirect: '/session/error' }), (req, res) => {
    res.redirect('/session/login')
})

// LOGIN
router.get('/login', (req, res) => {
    res.render('sessions/login')
})
router.post('/login', passport.authenticate('login', { failureRedirect: '/session/error' }), (req, res) => {
    // const user = await UserModel.findOne({ email: username })
    // if (!user) {
    //     console.log('User dont exits');
    //     return done(null, user)
    // }
    if (!req.user) {
        return res.status(400).render('errors/base', { error: 'Invalid credentials' })
    }

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role,
        social: req.user.social
    }

    console.log(req.user)

    res.cookie(credentials.COOKIE_NAME_JWT, req.user.token).redirect('/products')
})

//LOGOUT
router.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).render('errors/base', { error: err })

        res.redirect('/session/login')
    })
})

router.get('/error', async (req, res) => {
    return res.status(500).render('errors/base', { error: "Error session" })
})


export default router
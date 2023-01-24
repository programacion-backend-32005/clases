import { Router } from 'express'
import passport from 'passport'
import UserModel from '../models/user.model.js'
import { createHash, isValidPassoword } from '../utils.js'

const router = Router()

router.get('/login', passport.authenticate('login', '/session/faillogin')   ,  async (req, res) => {
    
    if(!req.user) return res.status(400).send('Invalid credentials')
    req.session.user = req.user
    
    res.send('Login Success')
})
router.get('/faillogin', (req, res) => {
    res.json({error: 'Failed login'})
})

router.get('/register', passport.authenticate('register', {failureRedirect: '/session/failregister'}), async (req, res) => {
    res.send('Register Success!!')
})
router.get('/failregister', async(req, res) => {
    console.error('Failed Stragtregy');
    res.send({error: 'Failed'})
})

router.get('/logout', (req, res) => req.session.destroy(err => {
    if(err) res.send(err)
    else res.send('logout ok')
}) )

export default router
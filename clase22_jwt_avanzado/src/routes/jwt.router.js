import { Router } from 'express'
import { generateToken, authToken, passportCall, authorization } from '../utils.js'
import passport from 'passport'

const router = Router()

const users = [{email: 'r2@gmail.com', password: 'secret', rol: 'user'}]
router.post('/register', (req, res) => {
    const user = req.body

    if( users.find(u => u.email === user.email) ) {
        return res.status(400).send({status: 'error', error: 'User already exits'})
    }

    users.push(user)
    const access_token = generateToken(user)

    res.send({status: 'success' })
})

router.post('/login', (req, res) => {
    const {email, password} = req.body

    const user = users.find(u => u.email == email && u.password == password)
    if(!user) return res.status(400).send({status: 'error', error: 'invalid credentiasl'})

    const access_token = generateToken(user)
    res.cookie('coderCookieToken', access_token).send({status: 'success'})
})

router.get('/current', passportCall('jwt'), authorization('user'), (req, res) => {
    console.log('ROUTER');
    res.send({status: 'success', payload: req.user})
})

router.get('/admin', passportCall('jwt'), authorization('admin'), (req, res) => {
    console.log('ROUTER');
    res.send({status: 'success', payload: req.user})
})


export default router
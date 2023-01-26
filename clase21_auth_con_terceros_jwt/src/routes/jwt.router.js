import { Router } from 'express'
import { generateToken, authToken } from '../utils.js'

const router = Router()

const users = []
router.post('/register', (req, res) => {
    const user = req.body

    if( users.find(u => u.email === user.email) ) {
        return res.status(400).send({status: 'error', error: 'User already exits'})
    }

    users.push(user)
    const access_token = generateToken(user)

    res.send({status: 'success', access_token })
})

router.post('/login', (req, res) => {
    const {email, password} = req.body

    const user = users.find(u => u.email == email && u.password == password)
    if(!user) return res.status(400).send({status: 'error', error: 'invalid credentiasl'})

    const access_token = generateToken(user)
    res.send({status: 'success', access_token })
})

router.get('/current', authToken, (req, res) => {
    res.send({status: 'suiccess', payload: req.user})
})


export default router
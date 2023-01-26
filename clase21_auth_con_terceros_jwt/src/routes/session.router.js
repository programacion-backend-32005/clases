import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/logins', (req, res) => {
    res.render('logins')
})


router.get('/login-local', (req, res) => {
    res.render('login')
})
router.post('/login-local', passport.authenticate('login', '/session/faillogin')   ,  async (req, res) => {
    
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


router.get(
    '/login-github',
    passport.authenticate('github', {scope: ['user:email']}),
    async (req, res) => {}
)

router.get(
    '/githubcallback',
    passport.authenticate('github', {failureRedirect: '/logins'}),
    async(req, res) => {
        console.log("Callback: ", req.user);
        req.session.user = req.user
        console.log(req.session);
        res.redirect('/')
    }
)

router.get(
    '/login-google',
    passport.authenticate('google', {scope: ['email', 'profile']}),
    async (req, res) => {}
)

router.get(
    '/googlecallback',
    passport.authenticate('google', {failureRedirect: '/sessions/logins'}),
    async(req, res) => {
        console.log("Callback Google: ", req.user);
        req.session.user = req.user
        console.log(req.session);
        res.redirect('/')
    }
)



export default router
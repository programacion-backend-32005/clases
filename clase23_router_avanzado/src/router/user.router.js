import MyRouter from './router.js'
import jwt from 'jsonwebtoken'

export default class UsersRouter extends MyRouter {

    init() {
        this.post('/login', ["PUBLIC"], (req, res) => {
            const user = {
                email: req.query.email,
                role: "user"
            }

            const token = jwt.sign(user, "secret")
            res.sendSuccess( { token } )
        })

        this.get('/', ["PUBLIC"], (req, res) => {
            res.sendSuccess('HOla a todos')
        })

        this.get('/:word', ["USER"], (req, res) => {
            if(req.params.word == 'error') {
                return res.sendServerError("Word incorrect")
            }
            
            return res.sendSuccess({
                word: req.params.word,
                user: req.user
            })
        })
    }

}
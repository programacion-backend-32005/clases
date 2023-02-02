import MyRouter from './router.js'

export default class UsersRouter extends MyRouter {

    init() {
        this.get('/', (req, res) => {
            res.sendSuccess('HOla a todos')
        })

        this.get('/:word', (req, res) => {
            if(req.params.word == 'error') {
                return res.sendServerError("Word incorrect")
            }
            
            return res.sendSuccess(req.params.word)
        })
    }

}
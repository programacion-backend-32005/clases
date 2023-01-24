import passport from 'passport'
import local from 'passport-local'
import UserModel from '../models/user.model.js'
import { createHash, isValidPassoword } from '../utils.js'

const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true, usernameField: 'email'
        },
        async (req, username, password, done) => {
            const {first_name, last_name, email } = req.query
            try {
                const user = await UserModel.findOne({email: username})
                if(user) {
                    console.log('User already exits');
                    return done(null, false)
                }

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password)
                }
                const result = await UserModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done("Error to register " + error)
            }
        }
    ))

    passport.use('login', new LocalStrategy(
        { usernameField: 'email'},
        async(username, password, done) => {
            try {
                const user = await UserModel.findOne({email: username}).lean().exec()
                if(!user) {
                    console.error('User donst exist');
                    return done(null, false)
                }

                if(!isValidPassoword(user, password)) return done(null, false)

                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))
    
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })

}

export default initializePassport
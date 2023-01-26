import passport from 'passport'
import local from 'passport-local'
import UserModel from '../models/user.model.js'
import GitHubStrategy from 'passport-github2'
import GoogleStrategy from 'passport-google-oauth2'
import { createHash, isValidPassoword } from '../utils.js'

const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use('google', new GoogleStrategy(
        {
            clientID: "560369328245-gm7jqp1uhjbhm7bkiavha6q8q8r977f6.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:8080/session/googlecallback",
            passReqToCallback: true
        },
        async(request, accessToken, refreshToken, profile, done) => {
            console.log(profile);

            try {
                const user = await UserModel.findOne({email: profile._json.email})
                if(user) {
                    console.log('User already exits');
                    return done(null, user)
                }

                const newUser = {
                    first_name: profile._json.given_name,
                    last_name: profile._json.family_name,
                    email: profile._json.email,
                    password: ''
                }
                const result = await UserModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('error to login with github' + error)
            }
        }
    ))

    passport.use('github', new GitHubStrategy(
        {
            clientID: "Iv1.4d17c5c73c9b1ce1",
            clientSecret: "ef74929f461c767895fd21426fd5b4c6e14adbb7",
            callbackURL: "http://localhost:8080/session/githubcallback"
        },
        async(accessToken, refreshToken, profile, done) => {
            console.log(profile);

            try {
                const user = await UserModel.findOne({email: profile._json.email})
                if(user) {
                    console.log('User already exits');
                    return done(null, user)
                }

                const newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    email: profile._json.email,
                    password: ''
                }
                const result = await UserModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('error to login with github' + error)
            }
        }
    ))

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
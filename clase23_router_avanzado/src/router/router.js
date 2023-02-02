import { Router } from "express";
import jwt from 'jsonwebtoken'

export default class MyRouter {

    constructor() {
        this.router = Router()
        this.init()
    }

    getRouter() {
        return this.router
    }

    init(){}

    get(path, policies, ...callbacks){
        this.router.get(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks) )
    }

    post(path, policies, ...callbacks){
        this.router.post(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks) )
    }

    put(path, policies, ...callbacks){
        this.router.put(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks) )
    }

    delete(path, policies, ...callbacks){
        this.router.delete(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks) )
    }

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async(...params) => {
            try {
                // params (req, res, next)
                // apply apunta directamente a la funcion callback
                // this es para que se utilize en el contexto de la clase Router
                await callback.apply(this, params)
            } catch (error) {
                console.error(error);
                // params[1] es el parametro res
                params[1].status(500).send(error)
            }
        })
    }

    generateCustomResponses = (req, res, next) => {
        res.sendSuccess = payload => res.send({status: "success", payload})
        res.sendServerError = error => res.status(500).send({status: "error", error })
        res.sendUserError = error => res.status(400).send({status: "error", error})
        res.sendNoAuthenticatedError = error => res.status(401).send({status: "error", error})
        res.sendNoAuthorizatedError = error => res.status(403).send({status: "error", error})
        
        next()
    }

    handlePolicies = policies => (req, res, next) => {
        if(policies.includes('PUBLIC')) return next()

        if(policies.length > 0) {
            const authHeaders = req.headers.authorization
            if(!authHeaders) return res.sendNoAuthenticatedError('Unauthenticated')

            const tokenArray = authHeaders.split(" ")
            const token = (tokenArray.length > 1) ? tokenArray[1] : tokenArray[0]

            const user = jwt.verify(token, 'secret')

            if(!policies.includes(user.role.toUpperCase()) ) {
                return res.sendNoAuthorizatedError("Unauthorizated")
            }

            req.user = user
            return next()
        }

        next()
    }

}
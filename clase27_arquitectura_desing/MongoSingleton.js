import mongoose from "mongoose";


export default class MongoSingleton {

    static #instance

    constructor() {
        mongoose.connect('mongodb://127.0.0.1:27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    static getInstance() {
        if(this.#instance) {
            console.log('Already connected!');
            return this.#instance
        }

        this.#instance = new MongoSingleton()
        console.log('Connected');

        return this.#instance
    }

}
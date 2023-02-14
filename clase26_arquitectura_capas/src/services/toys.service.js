import ToyModel from "../models/toy.model.js"

// Sabe a que persistencia vamos a conectarnos

class ToyService {

    constructor() {
        this.toyModel = new ToyModel()
    }

    getAll = () => {
        return this.toyModel.getAll()
    }

    create = data => {
        return this.toyModel.create(data)
    }   

}

export default ToyService
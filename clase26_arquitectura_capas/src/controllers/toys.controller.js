import ToyService from "../services/toys.service.js"

// Solo es un intermediario

class ToyController {

    constructor() {
        this.toyService = new ToyService()
    }

    getAll = () => {
        return this.toyService.getAll()
    }

    create = data => {
        return this.toyService.create(data)
    }   

}

export default ToyController
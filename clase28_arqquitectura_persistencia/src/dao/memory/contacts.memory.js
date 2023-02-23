export default class Contacts {
    constructor() {
        this.data = []
    }

    getNextID = () => {
        const count = this.data.length 
        const nextID = (count > 0) ? this.data[count-1].id + 1 : 1

        return nextID
    }

    get = () => {
        return this.data
    }

    add = data => {
        data.id = this.getNextID()

        this.data.push(data)

        return true
    }
}
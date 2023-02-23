import fs from 'fs'

export default class Contacts {
    constructor() {
        this.filename = './contacts.json'
    }

    getNextID = data => {
        const count = data.length 
        const nextID = (count > 0) ? data[count-1].id + 1 : 1

        return nextID
    }

    get = () => {
        if(fs.existsSync(this.filename)) {
            const data = fs.readFileSync(this.filename, 'utf-8')
            const contacts = JSON.parse(data)

            return contacts
        }

        return []
    }

    add = data => {
        const contacts = this.get()

        data.id = this.getNextID(contacts)
        console.log(contacts, data);
        contacts.push(data)

        fs.writeFileSync(this.filename, JSON.stringify(contacts))

        return true
    }
}
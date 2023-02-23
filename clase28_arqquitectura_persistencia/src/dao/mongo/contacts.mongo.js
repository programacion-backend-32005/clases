import ContactModel from "./models/contacts.js";

export default class Contacts {

    constructor() { }

    get = async() => {
        const contacts = await ContactModel.find()

        return contacts
    }

    add = async(data) => {
        await ContactModel.create(data)

        return true
    }

}
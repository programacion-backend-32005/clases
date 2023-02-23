import ContactDTO from "../dao/DTO/contact.dto.js";

export default class ContactRepository {

    constructor(dao) {
        this.dao = dao
    }

    getContacts = async () => {
        const result = await this.dao.get()

        return result
    }

    createContact = async contact => {
        const contactToInsert = new ContactDTO(contact)
        const result = await this.dao.add(contactToInsert)

        return result
    }

}
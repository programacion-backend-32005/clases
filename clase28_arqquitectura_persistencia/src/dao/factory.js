import config from "../config/config.js";
import mongoose from "mongoose";

export let Contacts

switch (config.persistence) {
    case 'MONGO':
        console.log('Mongo Connect');

        const connection = mongoose.connect('mongodb://127.0.0.1:27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const { default: ContactsMongo } = await import('./mongo/contacts.mongo.js')

        Contacts = ContactsMongo
        break

    case 'FILE':
        console.log('Persistence with files');
        const { default: ContactsFile } = await import('./file/contacts.file.js')
        Contacts = ContactsFile

        break

    default:
        console.log('Memory Persistence');
        const { default: ContactsMemory } = await import('./memory/contacts.memory.js')
        Contacts = ContactsMemory

        break
}   
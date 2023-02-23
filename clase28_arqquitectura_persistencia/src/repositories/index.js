import { Contacts } from '../dao/factory.js'
import ContactRepository from './contacts.repository.js'

export const ContactsService = new ContactRepository(new Contacts())
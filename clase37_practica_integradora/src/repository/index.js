import { User, Ticket } from '../DAO/factory.js'

import UserRepository from './users.repository.js'
import TicketRepository from './tickets.repository.js'

export const UserService = new UserRepository(new User())
export const TicketService = new TicketRepository(new Ticket())
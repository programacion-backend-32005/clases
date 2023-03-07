import { DAO } from '../DAO/factory.js'

import ProductRepository from '../repository/products.repository.js'
import CartRepository from '../repository/cart.repository.js'
import UserRepository from '../repository/users.repository.js'
import MessageRepository from '../repository/messages.repository.js'

export const ProductService = new ProductRepository(new DAO.Product())
export const CartService = new CartRepository(new DAO.Cart())
export const UserService = new UserRepository(new DAO.User())
export const MessageService = new MessageRepository(new DAO.Message())
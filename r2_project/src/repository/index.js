import  { Product, Cart, User, Message } from '../DAO/factory.js'

import ProductRepository from '../repository/products.repository.js'
import CartRepository from '../repository/cart.repository.js'
import UserRepository from '../repository/users.repository.js'
import MessageRepository from '../repository/messages.repository.js'

export const ProductService = new ProductRepository(new Product())
export const CartService = new CartRepository(new Cart())
export const UserService = new UserRepository(new User())
export const MessageService = new MessageRepository(new Message())
import mongoose from "mongoose";
import User from '../src/dao/Users.dao.js'
import assert from 'assert'

mongoose.connect('mongodb://127.0.0.1:27017')

describe('Testing Users Dao', () => {

    before(function() {
        mongoose.connection.collections.users.drop()
        this.timeout()
    })

    beforeEach(function() {
        mongoose.connection.collections.users.drop()
        this.timeout()
    })

    it('El dao debe poder obtener los usuarios', async () => {
        const usersDao = new User()
        const result = await usersDao.get()
        
        assert.strictEqual(Array.isArray(result), true)
    })

    it('El dao debe poder crear usuarios', async () => {
        let mockUser = {
            first_name: 'German',
            last_name: 'Rodas',
            email: 'german@gmail.com',
            password: 'secret'
        }
        
        const usersDao = new User()
        const result = await usersDao.save(mockUser)
        
        assert.ok(result._id)
    })

    it('El dao debe poder crear usuarios con una lista de mascotas en vacio por defecto', async () => {
        let mockUser = {
            first_name: 'German',
            last_name: 'Rodas',
            email: 'german@gmail.com',
            password: 'secret'
        }
        
        const usersDao = new User()
        const result = await usersDao.save(mockUser)
        
        assert.deepStrictEqual(result.pets, [])
    })

    it('El dao debe poder buscar por email', async () => {
        let mockUser = {
            first_name: 'German',
            last_name: 'Rodas',
            email: 'german@gmail.com',
            password: 'secret'
        }
        
        const usersDao = new User()
        const result = await usersDao.save(mockUser)

        const user = await usersDao.getBy({email: result.email})
        
        assert.strictEqual(typeof user, 'object')
    })

})

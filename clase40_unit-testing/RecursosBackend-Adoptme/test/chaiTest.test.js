import mongoose from "mongoose";
import User from '../src/dao/Users.dao.js'
import chai from "chai";

mongoose.connect('mongodb://127.0.0.1:27017')

const expect = chai.expect

describe('Set the test for Chai', () => {
    before(function() {
        mongoose.connection.collections.users.drop()
        this.timeout(2000)
    })

    beforeEach(function() {
        mongoose.connection.collections.users.drop()
        this.timeout(2000)
    })


    it('DAO must get the array of users', async function() {
        const userDao = new User()
        const result = await userDao.get()

        expect(result).to.be.deep.equal([])
    })


})
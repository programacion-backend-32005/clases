import mongoose from "mongoose";
import ProductService from "../../src/services/products.service.js";
import chai from "chai";
import { faker } from "@faker-js/faker"

mongoose.connect('mongodb://127.0.0.1:27017', { dbName: 'db_32205_clase44_test' })
const service = new ProductService()
const expect = chai.expect

describe('Test CRUD of Product Service', () => {
    before(async function () {

        await mongoose.connection.db.dropCollection('products', () => {
            console.log('collection dropped');
        });

        this.timeout(200)
    })


    it('Must return all users', async () => {
        const result = await service.get()

        expect(result).to.be.deep.equal([])
    })

    it('Must be create an user', async () => {

        const numR = parseInt(faker.random.numeric(1, {bannedDigits: ['0']}))
        const categories = []
        for(let i = 0; i < numR; i++) categories.push(faker.commerce.productName())

        const result = await service.create({
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            categories
        })

        expect(result).to.have.property('_id')

    })

})
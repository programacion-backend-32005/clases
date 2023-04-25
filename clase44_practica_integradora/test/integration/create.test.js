import chai from "chai";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";

const expect = chai.expect
const requester = supertest('http://127.0.0.1:8080')

describe('Products', () => {
    describe('Crear Products', () => {
        

        it('The endpoint POST /api/products must to create a product', async () => {
            const numR = parseInt(faker.random.numeric(1, { bannedDigits: ['0'] }))
            const categories = []
            for (let i = 0; i < numR; i++) categories.push(faker.commerce.productName())

            const product = {
                name: faker.commerce.productName(),
                price: faker.commerce.price(),
                categories
            }

            const response = await requester.post('/api/products').send(product)
            const { status, ok, _body } = response

            expect(_body).to.have.property('_id')
        })

    })
})
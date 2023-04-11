import chai from 'chai'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'

const expect = chai.expect
const requester = supertest('http://127.0.0.1:8080')


describe('Testing Adopt Me', () => {
    describe('Test de Mascotas', () => {
        it('El endpoint POST /api/pets debe registrar una mascota', async () => {
            const petMock = {
                name: 'Firulais',
                specie: 'dog',
                birthDate: '10-10-2020'
            }

            const response = await requester.post('/api/pets').send(petMock)
            const { status, ok, _body } = response

            expect(_body.payload).to.have.property('_id')

        })
    })
})

describe('Registro, Login and Current', () => {
    let cookie;

    const mockUser = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'secret'
    }

    it('Debe registrar un usario', async () => {
        const { _body } = await requester.post('/api/sessions/register').send(mockUser)

        expect(_body.payload).to.be.ok
    })

    it('Debe loguear un user y DEVOLVER UNA COOKIE', async () => {
        const result = await requester.post('/api/sessions/login').send({
            email: mockUser.email, password: mockUser.password
        })

        //COOKIE_NAME=COOKIE_VALUE
        const cookieResult = result.headers['set-cookie'][0]
        expect(cookieResult).to.be.ok 
        cookie = {
            name: cookieResult.split('=')[0],
            value: cookieResult.split('=')[1]
        }

        expect(cookie.name).to.be.ok.and.eql('coderCookie')
        expect(cookie.value).to.be.ok

    })

    it('enviar cookie para ver el contenido del usuario', async () => {
        const {_body} = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`])
        
        expect(_body.payload.email).to.be.eql(mockUser.email)
    })
})

describe('Test upload File', () => {
    it('Debe poder subir una imagen', async () => {
        const mockPet = {
            name: "pepe",
            specie: "bird",
            birthDate: '10-11-2020'
        }

        const result = await requester.post('/api/pets/withimage')
            .field('name', mockPet.name)
            .field('specie', mockPet.specie)
            .field('birthDate', mockPet.birthDate)
            .field('image', './test/bird.jpeg') 

        expect(result.status).to.be.eql(200)
        expect(result._body.payload).to.have.property('_id')
        expect(result._body.payload.image).to.be.ok
        
    })
})
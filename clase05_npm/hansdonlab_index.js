const UserManager = require('./hansdonlab')

const run = async() => {
    const manager = new UserManager()
    await manager.createUser({
        nombre: 'Paula',
        lastname: 'Belvedere',
        username: 'paula',
        password: 'secret'
    })

    await manager.createUser({
        nombre: 'Igna',
        lastname: 'Tutor',
        username: 'igna',
        password: '123456'
    })

    console.log(await manager.getUsers());

    await manager.validateUser('igna', '123456')
}


run()



// Volvemos 21:37 args


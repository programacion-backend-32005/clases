const fs = require('fs')
const crypto = require('crypto')

const filename = './users.json'
class UserManager {

    getUsers = async() => {
        if(fs.existsSync(filename)) {
            const data = await fs.promises.readFile(filename, 'utf-8')
            const users = JSON.parse(data)

            return users
        }

        return []
    }

    createUser = async(user) => {
        const users = await this.getUsers()
        
        user.salt = crypto.randomBytes(128).toString('base64')
        user.password = crypto.createHmac('sha256', user.salt).update(user.password).digest('hex')

        users.push(user)
        await fs.promises.writeFile(filename, JSON.stringify(users))

        return users
    }

    validateUser = async(username, password) => {
        const users = await this.getUsers()
        const user = users.find(u => u.username == username)
        if(!user) {
            console.log('User not found');
            return
        }

        const newHash = crypto.createHmac('sha256', user.salt).update(password).digest('hex')

        if(newHash === user.password) console.log('User logged');
        else console.log('pass invalid');

    }

}

module.exports = UserManager
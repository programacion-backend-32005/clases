import mongoose from 'mongoose'
import userModel from './models/user.model.js'

const env = async() => {
    await mongoose.connect('mongodb://127.0.0.1:27017')
    console.log('DB connected!');

    const users = await userModel.paginate({gender: 'Female'}, {
        limit: 5, page: 1
    })

    console.log(users)

    process.exit()
}

env()
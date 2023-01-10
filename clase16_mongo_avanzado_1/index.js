import userModel from './models/users.js'
import mongoose from 'mongoose'

const env = async() => {
     await mongoose.connect('mongodb+srv://el_profe:QndJxyOrQJyfjWnZ@cluster0.timeekf.mongodb.net/?retryWrites=true&w=majority', {
        dbName: 'myFirstDatabase'
     })
     console.log('DB connected!');

     const response = await userModel.find({first_name: 'Celia'}).explain('executionStats')
     console.log(response);

     process.exit()
}

env()
import mongoose from 'mongoose'

const userCollection = 'users'

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    first_name: String,
    last_name: String
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel
import mongoose from 'mongoose'

export default mongoose.model('users', mongoose.Schema({
    first_name: {
        type: String,
        index: true
    },
    last_name: String,
    email: String,
    gender: String
}))

// First exec: 3 
// Secon exec with filter: 2
// Thirtth exec with index: 0
import mongoose from "mongoose";

const messagesCollection = "messages"

const messagesSchema = new mongoose.Schema({
    user: String,
    message: String
})

mongoose.set("strictQuery", false)
const MessagesModel = mongoose.model(messagesCollection, messagesSchema)

export default MessagesModel
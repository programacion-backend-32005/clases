import MessagesModel from "./models/messages.model.js";

export default class Message {

    constructor() {}

    get = async() => {
        return await MessagesModel.find()
    }

    create = async(data) => {
        await MessagesModel.create(data )
        return true
    }

}
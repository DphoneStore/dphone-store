const mongoose = require("mongoose");
const ChatShema = require('../model/ChatShema');
const Chat = mongoose.model("Chat", ChatShema);

const Types = mongoose.Types

const ChatRepository = {
    GetChatListAdmin(){
        return Chat.find({})
            .select('members')
            .populate('members')
            .sort({updatedAt: 'desc'})
            .lean()
    },
    CreateChat(chat) {
        return Chat.create(chat)
    },
    AddNewMessage(sender, receiver, message) {
        console.log('sender', sender)
        console.log('receiver', receiver)
        return Chat.updateOne(
            {members: {$all: [new Types.ObjectId(sender), new Types.ObjectId(receiver)]}},
            {$push: {messages: message}}
        )
    },
    GetMessages(receiver) {
        return Chat.findOne(
            {members: {$in:new Types.ObjectId(receiver)}},
        ).populate({
            path: 'messages',
            populate: {
                path: 'sender',
                select: 'avatar'
            }
        }).lean()
    }
}

module.exports = ChatRepository
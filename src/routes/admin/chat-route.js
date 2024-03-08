const express = require('express')
const route = express.Router()
const ChatController = require('../../app/controller/chat/ChatController')


route.get('/', ChatController.ChatAdminPage)
route.get('/load-chat/user/:receiver_id', ChatController.LoadingChat)


module.exports = route
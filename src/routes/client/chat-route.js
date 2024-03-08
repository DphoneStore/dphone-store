const express = require('express')

const route = express.Router()


route.get('/user-load-chat', ChatController.LoadingUserChat)


module.exports = route
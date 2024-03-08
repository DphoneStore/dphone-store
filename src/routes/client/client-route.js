const express = require('express')
const HomeController = require("../../app/controller/client/ClientController");
const ChatController = require("../../app/controller/chat/ChatController");
const Auth = require("../../app/middleware/Auth");
const {ADMIN, CUSTOMER} = require("../../app/constant/Role");
const route = express.Router()


route.get('/', HomeController.HomePage)
route.get('/brand', HomeController.BrandPage)
route.use(
    '/chat',
    (req, res, next) => Auth.Authorize(req, res, next,[ADMIN, CUSTOMER]),
    ChatController.LoadingChat
)

module.exports = route
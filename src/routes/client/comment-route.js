const express = require('express')
const CommentController = require("../../app/controller/client/CommentController");
const route = express.Router()
const Auth = require('../../app/middleware/Auth')
const {ADMIN, CUSTOMER} = require("../../app/constant/Role");

route.post('/', CommentController.Create)


module.exports = route
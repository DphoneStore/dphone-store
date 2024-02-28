const express = require('express')
const SecurityController = require("../../app/controller/security/SecurityController");
const TrafficWeb = require("../../app/middleware/TrafficWeb");
const route = express.Router()

route.get('/login', TrafficWeb, SecurityController.LoginPage)
route.post('/login', SecurityController.Login)

route.get('/register', TrafficWeb, SecurityController.RegisterPage)
route.post('/register', SecurityController.Register)

route.get('/unauthorized', SecurityController.Unauthorized)


module.exports = route
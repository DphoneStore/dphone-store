const express = require('express')
const SecurityController = require("../../app/controller/security/SecurityController");
const TrafficWeb = require("../../app/middleware/TrafficWeb");
const route = express.Router()

route.get('/login', TrafficWeb, SecurityController.LoginPage)
route.post('/login', SecurityController.Login)

route.get('/register', TrafficWeb, SecurityController.RegisterPage)
route.post('/register', SecurityController.Register)

route.get('/unauthorized', SecurityController.Unauthorized)

route.post('/request-forgot-password', SecurityController.CreateForgotPass)
route.get('/reset-pass/:token', SecurityController.ResetPassPage)
route.put('/update-pass', SecurityController.UpdatePasswordPage)


module.exports = route
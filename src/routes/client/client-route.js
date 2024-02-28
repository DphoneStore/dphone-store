const express = require('express')
const HomeController = require("../../app/controller/client/ClientController");
const route = express.Router()


route.get('/', HomeController.HomePage)
route.get('/brand', HomeController.BrandPage)


module.exports = route
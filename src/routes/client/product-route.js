const express = require('express')
const ProductController = require("../../app/controller/client/ProductController");
const route = express.Router()


route.get('/', ProductController.ProductPage)
route.get('/:brand', ProductController.ProductPage)
route.get('/detail/:slug', ProductController.ProductDetail)

module.exports = route
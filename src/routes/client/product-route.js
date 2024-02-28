const express = require('express')
const ProductController = require("../../app/controller/client/ProductController");
const TrafficWeb = require("../../app/middleware/TrafficWeb");
const route = express.Router()


route.get('/', TrafficWeb, ProductController.ProductPage)
route.get('/filter-brand', ProductController.ProductFilterBrand)
route.get('/search-product', ProductController.ProductFilterNameAndBrand)
route.get('/detail/:id', ProductController.ProductDetail)


module.exports = route
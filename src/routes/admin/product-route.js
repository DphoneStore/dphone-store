const express = require('express')
const route = express.Router()
const ProductController = require('../../app/controller/admin/ProductController')
const upload = require('../../app/middleware/FileStorage')
const { PRODUCT_STORAGE_PATH} = require("../../app/constant/StoragePath");

route.get('/', ProductController.ProductManagement)
route.get('/new', ProductController.NewProductPage)
route.post('/new', upload(PRODUCT_STORAGE_PATH).array('images'), ProductController.CreateProduct)
route.get('/edit/:id', ProductController.EditProductPage)
route.post('/update', upload(PRODUCT_STORAGE_PATH).array('images'), ProductController.UpdateProduct)
route.delete('/delete', ProductController.DeleteProduct)
route.get('/search/:name', ProductController.SearchProduct)
module.exports = route
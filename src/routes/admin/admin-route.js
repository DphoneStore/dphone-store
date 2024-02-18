const express = require('express')
const route = express.Router()

const DashBoardController = require('../../app/controller/admin/DashBoardController')
const BrandRouter = require('../../routes/admin/brand-route')
const ProductRouter = require('../../routes/admin/product-route')

route.get('/dashboard',  DashBoardController.DashBoard)
route.use('/brand', BrandRouter)
route.use('/product', ProductRouter)
module.exports = route
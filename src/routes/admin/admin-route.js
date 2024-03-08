const express = require('express')
const route = express.Router()

const DashboardRouter = require('../../routes/admin/dashboard-route')
const BrandRouter = require('../../routes/admin/brand-route')
const ProductRouter = require('../../routes/admin/product-route')
const OrderRouter = require('../../routes/admin/order-route')
const ChatRouter = require('../../routes/admin/chat-route')

route.use('/dashboard',  DashboardRouter)
route.use('/brand', BrandRouter)
route.use('/product', ProductRouter)
route.use('/order', OrderRouter)
route.use('/chat', ChatRouter)
module.exports = route
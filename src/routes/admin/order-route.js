const express = require('express')
const route = express.Router()
const OrderController = require('../../app/controller/admin/OrderController')

route.get('/:order_type',  OrderController.OrderPage)
route.get('/order-detail/:order_id', OrderController.OrderDetailPage)
route.post('/delivery', OrderController.Delivery)
route.post('/cancel-order', OrderController.CancelOrder)
route.post('/done-order', OrderController.DoneOrder)
module.exports = route
const express = require('express')
const CartController = require("../../app/controller/client/CartController");
const TrafficWeb = require("../../app/middleware/TrafficWeb");
const route = express.Router()


route.get('/', TrafficWeb, CartController.CartPage)
route.post('/add-to-cart', CartController.AddToCart)
route.post('/delete-out-of-cart', CartController.DeleteOutOfCart)
route.post('/update-quantity', CartController.UpdateQuantity)
route.post('/checkout', CartController.CheckOut)
route.post('/paid-cart', CartController.CartPage)

module.exports = route
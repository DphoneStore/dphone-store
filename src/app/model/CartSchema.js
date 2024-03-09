const mongoose = require('mongoose')
const {SHOPPING} = require("../constant/CartStatus");
const Schema = mongoose.Schema

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    detail: [{
        type: Schema.Types.ObjectId,
        ref: 'DetailCart'
    }],
    address: {type:String, default: ''},
    phone: {type:String, default: ''},
    total_price: {type:Number, default: 0},
    status: {type: String, default: SHOPPING},
    order_date: {type: Date, required: false},
    paid_date: {type: Date, required: false},
}, {timestamps: true})

module.exports = CartSchema
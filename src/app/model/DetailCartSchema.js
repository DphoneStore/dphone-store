const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DetailCartSchema = new Schema({
    product: {
        type: Object,
        ref: 'Product'
    },
    quantity: {type:Number, default: 1},
    price: {type: Number, default: 0}
}, {timestamps: true})

module.exports = DetailCartSchema
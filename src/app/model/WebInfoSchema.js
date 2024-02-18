const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    phone: {type: String, required: true},
    email: {type: String, required: true},
    location: {type: String, required: true},
    facebook: {type: String, required: true},
    twitter: {type: String, required: true},
    instagram: {type: String, required: true},
    slider: {type: Array, required: true }
}, {timestamps: true})

module.exports = BrandSchema
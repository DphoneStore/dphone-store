const mongoose = require('mongoose')
const Schema = mongoose.Schema
slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const ProductSchema = new Schema({
    name: {type: String, required: true},
    slug:{type: String, slug:'name'}
}, {timestamps: true})

module.exports = ProductSchema
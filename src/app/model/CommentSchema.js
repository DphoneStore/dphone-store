const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    content: {type: String, required: true},
    star: {type: Number, required: true},
    deleted: {type: Boolean, default: false}
}, {timestamps: true})

module.exports = CommentSchema
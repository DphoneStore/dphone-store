const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    full_name: {type: String, required: true},
    gender: {type: String, required: true},
    phone: {type: String, required: true},
    birth_date: {type: String, required: true},
    avatar:  {type: String, default: 'user.svg'},
    address: {type: String, required: true},
    role: {type: String, default: 'customer'}
}, {timestamps: true})

module.exports = UserSchema
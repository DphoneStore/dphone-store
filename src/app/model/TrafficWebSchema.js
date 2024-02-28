const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TrafficWebSchema = new Schema({
    hour_access: {type: Number, require: true},
    date_access: {type: String, require: true}
}, {timestamps: true})

module.exports = TrafficWebSchema
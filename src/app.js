const path = require('path')

//add library dev
const morgan = require('morgan')

//add library
const express = require('express')
const cookieParser = require('cookie-parser')
const route = require('./routes/index-route')
const app = express()

//[GET] image from public
app.use(express.static(path.join(__dirname, 'public')))

//middleware to get post method value
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

//HTTP logger for dev
app.use(morgan('combined'))

//Template engine
// let ejs = require('ejs')
// ejs.delimiter = '%';
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'app/view'))
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts)

const database = require('./config/connect-db')
database.connect()
//Rout init

route(app)

module.exports = app
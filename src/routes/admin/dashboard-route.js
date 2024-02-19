const express = require('express')
const route = express.Router()
const DashboardController = require('../../app/controller/admin/DashBoardController')
const upload = require('../../app/middleware/FileStorage')
const {WEBSITE_STORAGE_PATH} = require("../../app/constant/StoragePath");

route.get('/', DashboardController.DashBoard)
route.post('/update-web-info', DashboardController.UpdateWebInfo)
route.post('/update-about', upload(WEBSITE_STORAGE_PATH).single('image'), DashboardController.UpdateAbout)
route.post('/update-slider', upload(WEBSITE_STORAGE_PATH).array('images'), DashboardController.UpdateSlider)

module.exports = route
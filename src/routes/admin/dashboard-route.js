const express = require('express')
const route = express.Router()
const DashboardController = require('../../app/controller/admin/DashBoardController')
const upload = require('../../app/middleware/FileStorage')
const {WEBSITE_STORAGE_PATH} = require("../../app/constant/StoragePath");
const Auth = require("../../app/middleware/Auth");
const {ADMIN} = require("../../app/constant/Role");


route.post('/update-web-info', DashboardController.UpdateWebInfo)
route.post('/update-about', upload(WEBSITE_STORAGE_PATH).single('image'), DashboardController.UpdateAbout)
route.post('/update-slider', upload(WEBSITE_STORAGE_PATH).array('images'), DashboardController.UpdateSlider)
route.delete('/delete-slider', DashboardController.DeleteImage)
route.get('/chart', DashboardController.Chart)
route.get('/', DashboardController.DashBoard)
module.exports = route
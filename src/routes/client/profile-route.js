const express = require('express')
const ProfileController = require("../../app/controller/client/ProfileController");
const route = express.Router()
const upload = require('../../app/middleware/FileStorage')
const {AVATAR_STORAGE_PATH} = require("../../app/constant/StoragePath");
const TrafficWeb = require("../../app/middleware/TrafficWeb");

route.get('/', TrafficWeb, ProfileController.ProfilePage)
route.post('/update/detail', ProfileController.UpdateDetail)
route.post('/update/pass', ProfileController.UpdatePass)
route.post('/update/avatar', upload(AVATAR_STORAGE_PATH).single('avatar'), ProfileController.UpdateAvatar)

module.exports = route
const express = require('express')
const route = express.Router()
const BrandController = require('../../app/controller/admin/BrandController')
const upload = require('../../app/middleware/FileStorage')
const {BRAND_STORAGE_PATH} = require("../../app/constant/StoragePath");

route.get('/', BrandController.BrandManagement)
route.get('/new', BrandController.NewBrandPage)
route.post(
    '/new',
    upload(BRAND_STORAGE_PATH).single('brand_logo'),
    BrandController.NewBrand
)
route.get('/edit/:id', BrandController.EditBrandPage)
route.post('/update', upload(BRAND_STORAGE_PATH).single('brand_logo'), BrandController.UpdateBrand)
route.delete('/delete', BrandController.DeleteBrand)
module.exports = route
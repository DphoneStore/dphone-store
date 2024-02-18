const BrandRepository = require('../../repository/BrandRepository')
const status = require('../../constant/StatusCode')
const FileUtil = require('../../../util/file-util')
const {BRAND_STORAGE_PATH} = require("../../constant/StoragePath");

const BrandController = {
    BrandManagement: async (req, res) => {
        const page_info = {
            title: 'Brand'
        }
        const brand_list = await BrandRepository.BrandList()
        const data = {
            brand_list
        }
        res.render(
            'admin/brand/brand',
            {
                layout: 'layout/admin-layout',
                page_info,
                data
            }
        )
    },
    NewBrandPage: (req, res) => {
        const page_info = {
            title: 'Brand'
        }
        const data = {}
        res.render(
            'admin/brand/new-brand',
            {
                layout: 'layout/admin-layout',
                page_info,
                data
            }
        )
    },
    NewBrand: async (req, res) => {
        if (req.body.name === undefined || req.body.name.length === 0) {
            return res.status(200).json({
                    code: status.BAD_REQUEST,
                    message: 'Brand name is required'
                }
            )
        }
        const brand = {
            name: req.body.name,
            logo: {
                name: req.file.filename,
                size: req.file.size
            }
        }
        const result = await BrandRepository.Create(brand)
        if (result) {
            return res.status(200).json({
                    code: status.CREATED,
                    message: ' Success create new brand '
                }
            )
        } else {
            return res.status(200).json({
                    code: status.SERVER_ERROR,
                    message: 'Something went wrong!'
                }
            )
        }
    },
    EditBrandPage: async (req, res) => {
        const brand = await BrandRepository.FindById(req.params.id)
        if (!brand) {
            const page_info = {
                title: 'Brand'
            }
            return res.render(
                'admin/not-found',
                {
                    layout: 'layout/admin-layout',
                    page_info,
                }
            )
        }
        const page_info = {
            title: 'Brand'
        }
        const data = {
            brand
        }
        res.render(
            'admin/brand/edit-brand',
            {
                layout: 'layout/admin-layout',
                page_info,
                data
            }
        )
    },
    UpdateBrand: async (req, res) => {
        const brand_id = req.body.brand_id
        const brand_name = req.body.name
        const current_brand = await BrandRepository.FindById(brand_id)
        if(!current_brand){
            return res.status(200).json({
                    code: status.NOT_FOUND,
                    message: 'Not found brand'
                }
            )
        }

        const brand = {
            name: brand_name
        }
        if(req.file){
            FileUtil.DeleteFile(BRAND_STORAGE_PATH, current_brand.logo.name)
            brand.logo = {
                name: req.file.filename,
                size: req.file.size
            }
        }
        const result = await BrandRepository.FindByIdAndUpdate(brand_id, brand)
        if (result) {
            return res.status(200).json({
                    code: status.UPDATED,
                    message: 'Success update brand'
                }
            )
        } else {
            return res.status(200).json({
                    code: status.SERVER_ERROR,
                    message: 'Something went wrong!'
                }
            )
        }
    },
    DeleteBrand: async (req, res)=>{
        const brand_id = req.body.brand_id
        const brand = await BrandRepository.FindByIdAndDelete(brand_id)
        if(brand){
            return res.status(200).json({
                    code: status.DELETED,
                    message: 'Success delete brand'
                }
            )
        } else {
            return res.status(200).json({
                    code: status.NOT_FOUND,
                    message: 'Not found brand'
                }
            )
        }
    }
}

module.exports = BrandController
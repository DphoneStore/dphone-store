const WebInfoRepository = require('../../repository/WebInfoRepository')
const UserRepository = require('../../repository/UserRepository')
const OrderRepository = require('../../repository/OrderRepository')
const TrafficWebRepository = require('../../repository/TrafficWebRepository')
const {UPDATED, BAD_REQUEST, DELETED, SERVER_ERROR} = require("../../constant/StatusCode");
const FileUtil = require('../../../util/file-util')
const {WEBSITE_STORAGE_PATH} = require("../../constant/StoragePath");

const DashBoardController = {
    DashBoard: async (req, res) => {
        const web_info = await WebInfoRepository.GetInfo()
        const count_customer = await UserRepository.CountCustomer()
        const order_today = await OrderRepository.OrderToday()
        const revenue_today = await OrderRepository.RevenueToday()
        const order_month = await OrderRepository.OrderMonth()
        const revenue_month = await OrderRepository.RevenueMonth()

        const page_info = {
            title: 'Dashboard',
        }
        const data = {
            web_info,
            count_customer,
            order_today,
            revenue_today,
            order_month,
            revenue_month
        }
        res.render(
            'admin/dashboard/dashboard',
            {
                layout: 'layout/admin-layout',
                page_info,
                data
            }
        )
    },
    UpdateWebInfo: async (req, res) => {
        const website = {
            phone: req.body.phone,
            email: req.body.email,
            location: req.body.location,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            instagram: req.body.instagram
        }
        try {
            await WebInfoRepository.UpdateWebInfo({website})
            res.status(200).json({code: UPDATED, message: 'Success update website information'})
        } catch (error) {
            res.status(200).json({code: BAD_REQUEST, message: 'Fail update website information'})
        }
    },
    UpdateAbout: async (req, res) => {

        const about = {
            introduction: req.body.introduction,
            thumbnail: req.body.current_thumbnail
        }
        if (req.file) {
            about.thumbnail = req.file.filename
        }
        try {
            await WebInfoRepository.UpdateWebInfo({about})

            if (req.file) {
                FileUtil.DeleteFile(WEBSITE_STORAGE_PATH, req.body.current_thumbnail)
            }

            res.status(200).json({code: UPDATED, message: 'Success update website information'})
        } catch (error) {
            res.status(200).json({code: BAD_REQUEST, message: 'Fail update website information'})
        }
    },
    UpdateSlider: async (req, res) => {
        const images = []
        req.files.map((file) => {
            images.push({name: file.filename, size: file.size})
        })

        try {
            await WebInfoRepository.PushImagesSlider(images)
            res.status(200).json({code: UPDATED, images, message: 'Update slider successfully'})
        } catch (error) {
            res.status(200).json({code: SERVER_ERROR, message: 'Something went wrong'})
        }
    },
    DeleteImage: async (req, res) => {
        if (req.body.name) {
            await WebInfoRepository.PullImageSlider(req.body.name)
            FileUtil.DeleteFile(WEBSITE_STORAGE_PATH, req.body.name)
            return res.status(200).json({code: DELETED, message: 'Remove image successfully'})
        } else {
            return res.status(200).json({code: BAD_REQUEST, message: 'Remove image failed'})
        }
    },
    Chart: async (req, res) => {
        const best_sale_products = await OrderRepository.BestSaleProductInMonth()
        const traffic_web_report = await TrafficWebRepository.TrafficReport()
        return res.status(200).json({code: 200, best_sale_products, traffic_web_report})
    }
}

module.exports = DashBoardController
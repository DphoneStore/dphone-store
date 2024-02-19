const web_seed = require('../../../data/web.json')
const DashboardRepository = require('../../repository/DashboardRepository')

const DashBoardController = {
    DashBoard: async (req, res) => {
        const page_info = {
            title: 'Dashboard'
        }
        const web_info = await DashboardRepository.GetInfo()
        const data = {
            web_info
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
        const result = await DashboardRepository.UpdateWebInfo({website})
        res.send(result)
    },
    UpdateAbout: async (req, res) => {

    },
    UpdateSlider: async (req, res) => {

    }
}

module.exports = DashBoardController
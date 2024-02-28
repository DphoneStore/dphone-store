const WebInfoRepository = require('../../repository/WebInfoRepository')
const BrandRepository = require('../../repository/BrandRepository')

const ClientController = {
    HomePage: async (req, res) => {
        const has_login = !!req.cookies.user_token
        const {website} = await WebInfoRepository.GetWebsiteInfo()
        const {about, slider} = await WebInfoRepository.GetHomeInfo()
        const brand_list = await BrandRepository.BrandList()

        const page_info = {
            title: 'Home',
            has_login,
            website
        }

        const data = {
            about,
            slider,
            brand_list
        }
        res.render(
            'client/home',
            {
                layout: 'layout/client-layout',
                page_info,
                data
            }
        )
    },
    BrandPage: async (req, res) => {
        const has_login = !!req.cookies.user_token
        const {website} = await WebInfoRepository.GetWebsiteInfo()
        const brand_list = await BrandRepository.BrandList()
        const page_info = {
            title: 'Brand',
            has_login,
            website
        }

        const data = {
            brand_list
        }
        res.render(
            'client/brand',
            {
                layout: 'layout/client-layout',
                page_info,
                data
            }
        )
    }
}

module.exports = ClientController
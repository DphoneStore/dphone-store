const ProductRepository = require('../../repository/ProductRepository')
const CommentRepository = require('../../repository/CommentRepository')
const WebInfoRepository = require("../../repository/WebInfoRepository");
const BrandRepository = require('../../repository/BrandRepository')
const {OK} = require("../../constant/StatusCode");
const ProductController = {
    ProductPage: async (req, res) => {
        const product_list = await ProductRepository.ProductList('_id name price rating discount is_discount images')
        const brand_list = await BrandRepository.BrandList()
        const has_login = !!req.cookies.user_token
        const {website} = await WebInfoRepository.GetWebsiteInfo()

        const page_info = {
            title: 'Product',
            has_login,
            website
        }

        const data = {
            product_list,
            brand_list
        }
        res.render(
            'client/product',
            {
                layout: 'layout/client-layout',
                page_info,
                data
            }
        )
    },
    ProductFilterBrand: async (req, res) => {
        console.log(req.query)

        const brand_selected = JSON.parse(req.query.brand_selected)
        const column = '_id name price rating discount is_discount images'
        const product_list = await ProductRepository.ProductListFollowBrand(column, brand_selected)
        return res.status(200).json({code: OK, product_list})
    },
    ProductFilterNameAndBrand: async (req, res) => {
        const product_name = req.query.product_name
        let brand_selected = req.query.brand_selected
        if (brand_selected !== 'null') {
            brand_selected = JSON.parse(brand_selected)
        }
        const column = '_id name price rating discount is_discount images'
        const product_list = await ProductRepository.ProductListFollowNameAndBrand(column, brand_selected, product_name)
        return res.status(200).json({code: OK, product_list})
    },
    ProductDetail: async (req, res) => {
        const product_id = req.params.id
        let product
        try {
            product = await ProductRepository.FindById(product_id)
        } catch (error) {
            return res.render('layout/not-found', {layout: false})
        }

        const has_login = !!req.cookies.user_token
        const {website} = await WebInfoRepository.GetWebsiteInfo()
        const page_info = {
            title: 'Product',
            has_login,
            website
        }
        if (!product) {
            return res.render('layout/not-found', {layout: false})
        }

        const comment_list = await CommentRepository.FindAllCommentOfProduct(product_id)
        console.log(comment_list)
        const data = {
            product,
            comment_list
        }
        res.render(
            'client/product-detail',
            {
                layout: 'layout/client-layout',
                page_info,
                data
            }
        )
    }
}

module.exports = ProductController
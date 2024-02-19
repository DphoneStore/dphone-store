const ProductRepository = require('../../repository/ProductRepository')

const ProductController = {
    ProductPage: async (req, res) => {
        const product_list=
            await ProductRepository.ProductList('_id slug name price rating discount is_discount images')
        const page_info = {
            title: 'Product',
            is_login: false
        }

        const data = {
            product_list
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
    ProductDetail: (req, res) => {
        const page_info = {
            title: 'Product detail',
            is_login: false
        }

        const data = {

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
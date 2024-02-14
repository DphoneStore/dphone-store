const ProductController = {
    ProductPage: (req, res) => {
        const page_info = {
            title: 'Product',
            is_login: false
        }

        const data = {

        }
        res.render(
            'client/product',
            {
                layout: 'layout/customer-layout',
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
                layout: 'layout/customer-layout',
                page_info,
                data
            }
        )
    }
}

module.exports = ProductController
const ClientController = {
    HomePage: (req, res) => {
        const page_info = {
            title: 'Home',
            is_login: false
        }

        const data = {

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
    BrandPage: (req, res) => {
        const page_info = {
            title: 'Brand',
            is_login: false
        }

        const data = {

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
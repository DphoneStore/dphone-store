const DashBoardController = {
    DashBoard: (req, res) => {
        const page_info = {
            title: 'Dashboard'
        }

        const data = {

        }
        res.render(
            'admin/dashboard',
            {
                layout: 'layout/admin-layout',
                page_info,
                data
            }
        )
    }
}

module.exports = DashBoardController
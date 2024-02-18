const clientRouter = require('./client/client-route')
const adminRouter = require('./admin/admin-route')
const productRouter = require('./client/product-route')
const SecurityController = require('../app/controller/common/SecurityController')
module.exports = (app) => {
    app.get('/login', SecurityController.LoginPage)
    app.post('/login', SecurityController.Login)
    app.use('/product', productRouter)
    app.use('/admin', adminRouter)

    app.use('/', clientRouter)
    app.use('*', (req, res)=>{
        res.status(404).json({state:'NOT FOUND'})
    })
}
const clientRouter = require('./client/client-route')
const adminRouter = require('./admin/admin-route')
const productRouter = require('./client/product-route')
const SecurityRouter = require('../routes/security/security-route')
const CommentRouter = require('../routes/client/comment-route')
const CartRouter = require('../routes/client/cart-route')
const ProfileRouter = require('../routes/client/profile-route')
const Auth = require("../app/middleware/Auth");
const ChatController = require("../app/controller/chat/ChatController");
const {ADMIN, CUSTOMER} = require("../app/constant/Role");
module.exports = (app) => {
    app.use('/admin', (req, res, next) => Auth.Authorize(req, res, next,[ADMIN]), adminRouter)

    app.use('/security', SecurityRouter)
    app.use('/product', productRouter)
    app.use('/comment', (req, res, next) => Auth.Authorize(req, res, next,[ADMIN, CUSTOMER]), CommentRouter)
    app.use('/profile', (req, res, next) => Auth.Authorize(req, res, next,[ADMIN, CUSTOMER]), ProfileRouter)
    app.use('/cart', (req, res, next) => Auth.Authorize(req, res, next,[ADMIN, CUSTOMER]), CartRouter)
    app.get('/chat/user-load-chat', (req, res, next) => Auth.Authorize(req, res, next,[ADMIN, CUSTOMER]), ChatController.LoadingUserChat)
    app.use('/', clientRouter)
    app.use('*', (req, res)=>{
        res.render('layout/not-found', {layout: false})
    })
}
const WebInfoRepository = require("../../repository/WebInfoRepository");
const CartRepository = require("../../repository/CartRepository");
const DetailCartRepository = require("../../repository/DetailCartRepository");
const UserRepository = require("../../repository/UserRepository");
const ProductRepository = require("../../repository/ProductRepository");
const {UPDATED, BAD_REQUEST, SERVER_ERROR, UNAUTHORIZED, NOT_FOUND} = require("../../constant/StatusCode");

const CartController = {
    async CartPage(req, res) {
        const has_login = !!req.cookies.user_token
        const {website} = await WebInfoRepository.GetWebsiteInfo()

        const cart = await CartRepository.FindByUser(req.user.id)
        const user = await UserRepository.FindByEmail(req.user.email)

        const page_info = {
            title: 'Cart',
            has_login,
            website
        }
        const data = {
            detail: cart ? cart.detail : [],
            user
        }

        res.render(
            'client/cart',
            {
                layout: 'layout/client-layout',
                page_info,
                data
            }
        )
    },
    async AddToCart(req, res) {
        const {product_id} = req.body
        const product = await ProductRepository.FindById(product_id)
        if(!product){
            return res.status(200).json({code:NOT_FOUND, message: 'Not found product'})
        }
        const user_id = req.user.id
        const cart = await CartRepository.FindByUser(user_id)
        if (!cart) {
            return res.status(200).json({code: SERVER_ERROR, message: 'Not found available cart'})
        }

        const products = cart.detail.filter((detail) => detail.product._id == product_id)
        if (products.length === 0) {
            let price
            if (product.is_discount) {
                price = product.price - (product.price * (product.discount / 100))
            } else {
                price = product.price
            }
            const detail = {
                product: product_id,
                price
            }
            const new_detail = await DetailCartRepository.Create(detail)
            await CartRepository.AddProduct(cart._id, new_detail._id)
        }
        res.status(200).json({code: UPDATED, message: 'add product to cart successfully'})
    },
    async DeleteOutOfCart(req, res) {
        let {delete_cart_detail_id} = req.body
        const user_id = req.user.id
        const cart = await CartRepository.FindByUser(user_id)
        if (!cart) {
            return res.status(200).json({code: BAD_REQUEST, message: 'bad request'})
        }
        const cart_detail = cart.detail.filter(detail => detail._id == delete_cart_detail_id)
        if (cart_detail.length > 0) {
            await CartRepository.DeleteCartDetail(cart._id, cart_detail[0]._id)
            await DetailCartRepository.Delete(cart_detail[0]._id)
            return res.status(200).json({code: UPDATED, message: 'add product to cart successfully'})
        }
        return res.status(200).json({code: BAD_REQUEST, message: 'bad request'})
    },
    async UpdateQuantity(req, res) {
        const {product_quantity, cart_detail_id} = req.body
        const detail_cart = await DetailCartRepository.FindById(cart_detail_id)
        let price
        if (detail_cart.product.is_discount) {
            const discount_price = detail_cart.product.price - (detail_cart.product.price * (detail_cart.product.discount / 100))
            price = discount_price * product_quantity
        } else {
            price = detail_cart.product.price * product_quantity
        }
        await DetailCartRepository.Update(cart_detail_id, price, product_quantity)
        return res.status(200).json({code: UPDATED, message: 'update quantity successfully'})
    },
    async CheckOut(req, res) {
        const user_id = req.user.id
        const user = await UserRepository.FindByEmail(req.user.email)
        if (user) {
            let order_date = new Date()
            order_date = [
                order_date.getDate(),
                order_date.getMonth() + 1,
                order_date.getFullYear()
            ].join('-')
            await CartRepository.CheckOut(user_id, user.phone, user.address,order_date)
            const cart = {
                user: user_id,
                detail: []
            }
            await CartRepository.Create(cart)
            return res.status(200).json({code: UPDATED, message: 'check out success'})
        }

        return res.status(200).json({code: UNAUTHORIZED, message: 'UNAUTHORIZED'})
    }
}

module.exports = CartController
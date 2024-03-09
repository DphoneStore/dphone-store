const OrderRepository = require('../../repository/OrderRepository')
const {ORDER, DELIVERY} = require("../../constant/CartStatus");
const {UPDATED} = require("../../constant/StatusCode");

const OrderController = {
    async OrderPage(req, res){
        const order_type = req.params.order_type
        const order_list = await OrderRepository.OrderList(order_type)
        const page_info = {
            title: 'Order'
        }
        const data = {
            order_list,
            order_type
        }
        res.render(
            'admin/order/order',
            {
                layout: 'layout/admin-layout',
                page_info,
                data
            }
        )
    },
    async OrderDetailPage(req, res){
        const order_id = req.params.order_id
        const order_detail = await OrderRepository.OrderDetail(order_id)
        console.log('order_detail', order_detail)
        const page_info = {
            title: 'Order'
        }
        const data = {
            order_detail
        }
        res.render(
            'admin/order/order-detail',
            {
                layout: 'layout/admin-layout',
                page_info,
                data
            }
        )
    },
    async Delivery(req, res){
        const order_id = req.body.order_id
        await OrderRepository.ActiveDelivery(order_id)
        return res.status(200).json({code:UPDATED, message: 'has moved to delivery status'})
    },
    async CancelOrder(req, res){
        const order_id = req.body.order_id
        await OrderRepository.CancelOrder(order_id)
        return res.status(200).json({code:UPDATED, message: 'has moved to cancel status'})
    },
    async DoneOrder(req, res){
        const order_id = req.body.order_id
        await OrderRepository.DoneOrder(order_id)
        return res.status(200).json({code:UPDATED, message: 'has moved to paid status'})
    }
}

module.exports = OrderController
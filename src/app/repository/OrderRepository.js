const mongoose = require("mongoose");
const CartSchema = require("../model/CartSchema");
const {DELIVERY, CANCEL, PAID} = require("../constant/CartStatus");
const Cart = mongoose.model("Cart", CartSchema);
const DetailCartRepository = require('../repository/DetailCartRepository')

const OrderRepository = {
    OrderList(status) {
        return Cart.find({status})
            .populate('user')
            .populate('detail')
            .sort({order_date: 'desc'})
            .lean()
    },
    OrderDetail(order_id, status) {
        return Cart.findById(order_id)
            .where({status})
            .select('detail user')
            .populate('user')
            .populate({
                path: 'detail',
                populate: {
                    path: 'product',
                    populate: 'brand'
                }
            })
            .lean()
    },
    ActiveDelivery(order_id) {
        return Cart.updateOne(
            {_id: order_id},
            {status: DELIVERY}
        )
    },
    CancelOrder(order_id) {
        return Cart.updateOne(
            {_id: order_id},
            {status: CANCEL}
        )
    },
    DoneOrder(order_id) {
        return Cart.updateOne(
            {_id: order_id},
            {status: PAID}
        )
    },
    OrderToday() {
        let today = new Date()
        today = [
            today.getDate(),
            today.getMonth() + 1,
            today.getFullYear()
        ].join('-')
        return Cart.countDocuments({order_date: today})
    },
    async RevenueToday() {
        let date = new Date()
        let today = [
            date.getDate(),
            date.getMonth() + 1,
            date.getFullYear()
        ].join('-')
        const paid_orders = await Cart.find({
            order_date: today,
            status: PAID
        }).populate('detail').lean()
        let today_revenue = 0
        paid_orders.map(order => {
            order.detail.map(detail => {
                today_revenue += detail.price
            })
        })
        return today_revenue
    },
    OrderMonth() {
        let date = new Date()
        let start_month = [
            '01',
            date.getMonth() + 1,
            date.getFullYear()
        ].join('-')
        let end_month = [
            '30',
            date.getMonth() + 1,
            date.getFullYear()
        ].join('-')
        return Cart.countDocuments({
            order_date:
                {
                    $gte: start_month,
                    $lte: end_month
                },
            status: PAID
        })
    },
    async RevenueMonth() {
        let date = new Date()
        let start_month = [
            '01',
            date.getMonth() + 1,
            date.getFullYear()
        ].join('-')
        let end_month = [
            '30',
            date.getMonth() + 1,
            date.getFullYear()
        ].join('-')
        const paid_orders = await Cart.find({
            order_date:
                {
                    $gte: start_month,
                    $lte: end_month
                },
            status: PAID
        }).populate('detail').lean()
        let month_revenue = 0
        paid_orders.map(order => {
            order.detail.map(detail => {
                month_revenue += detail.price
            })
        })
        return month_revenue
    },
    async BestSaleProductInMonth(){
        let date = new Date()
        let start_month = [
            '01',
            date.getMonth() + 1,
            date.getFullYear()
        ].join('-')
        let end_month = [
            '30',
            date.getMonth() + 1,
            date.getFullYear()
        ].join('-')
        const paid_orders = await Cart.find({
            order_date:
                {
                    $gte: start_month,
                    $lte: end_month
                },
            status: PAID
        }).populate({
            path: 'detail',
            populate: 'product'
        }).lean()

        let details = []
        paid_orders.map(order => {
            order.detail.map(detail => {
                details.push(detail)
            })
        })

        //sum quantity
        let products = details.reduce((acc, curr) => {
            const existing_item = acc.find(item => {
                return item.id.equals(curr.product._id)
            });
            if (existing_item) {
                existing_item.quantity += curr.quantity;
            } else {
                acc.push({ quantity: curr.quantity, name: curr.product.name, id:curr.product._id });
            }
            return acc;
        }, []);

        products = products.slice(0,5)
        return products
    }
}

module.exports = OrderRepository
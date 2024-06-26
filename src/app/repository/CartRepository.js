const mongoose = require("mongoose");
const Types = mongoose.Types

const CartSchema = require("../model/CartSchema");
const {SHOPPING, ORDER, PAID, DELIVERY, CANCEL} = require("../constant/CartStatus");
const Cart = mongoose.model("Cart", CartSchema);

const CartRepository = {
    GetPurchasedCart(user_id){
        return Cart.find({user: user_id, status: {$in:[PAID, DELIVERY, ORDER, CANCEL]}})
            .populate(
                {
                    path: 'detail',
                    populate: 'product'
                }
            )
            .sort({order_date: 'desc'})
            .lean()

    },
    Create(cart) {
        return Cart.create(cart)
    },
    AddProduct(id, cart_detail_id) {
        return Cart.updateOne(
            {_id: id, status: SHOPPING},
            {$push: {detail: cart_detail_id}})
    },
    DeleteCartDetail(id, cart_detail_id) {
        return Cart.updateOne(
            {_id: id, status: SHOPPING},
            {
                $pull:
                    {
                        detail: cart_detail_id
                    }
            }
        )
    },
    FindById(id) {
        return Cart.findById(id).lean();
    },
    FindByUser(user) {
        return Cart.findOne({user: new mongoose.Types.ObjectId(user)})
            .where({status: SHOPPING})
            .populate({
                path: 'detail',
                populate: {path: 'product'}
            })
    },
    CheckOut(user_id, phone, address, order_date){
        return Cart.updateOne(
            {user:user_id, status: SHOPPING},
            {phone, address, order_date, status: ORDER}
        ).lean();
    }
}

module.exports = CartRepository
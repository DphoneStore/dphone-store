const mongoose = require("mongoose");
const DetailCartSchema = require("../model/DetailCartSchema");
const DetailCart = mongoose.model("DetailCart", DetailCartSchema);

const DetailCartRepository = {
    Create(detail_cart){
        return DetailCart.create(detail_cart)
    },
    Update(id, price, quantity){
        return DetailCart.updateOne({_id:id}, {price, quantity})
    },
    Delete(id){
        return DetailCart.deleteOne(id)
    },
    FindById(id){
        return DetailCart.findById(id)
            .populate('product').lean()
    }
}

module.exports = DetailCartRepository
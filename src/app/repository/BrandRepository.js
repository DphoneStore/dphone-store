const mongoose = require("mongoose");
const ObjectId = require('mongoose').ObjectId;

const BrandSchema = require("../model/BrandSchema");
const Brand = mongoose.model("Brand", BrandSchema);

const BrandRepository = {
    FindById(id) {
        return Brand.findById(id).where({deleted: false}).lean();
    },
    BrandList(){
        return Brand.find({deleted:false}).lean();
    },
    Create(brand) {
        return Brand.create(brand)
    },
    FindByIdAndUpdate(id, brand){
        return Brand.findByIdAndUpdate(id, brand).lean();
    },
    FindByIdAndDelete(id){
        return Brand.findByIdAndUpdate(id, {deleted: true})
    }
}

module.exports = BrandRepository
const mongoose = require("mongoose");

const ProductSchema = require("../model/ProductSchema");
const Product = mongoose.model("Product", ProductSchema);

const ProductRepository = {
    FindById(id) {
        return Product.findById(id).where({deleted: false}).lean();
    },
    FindBySlug(slug) {
        return Product.findOne({slug, deleted: false}).lean();
    },
    ProductList(){
        return Product.find({deleted:false})
            .select('_id name slug price discount is_discount stock images rating release_date')
            .populate('brand')
            .sort({release_date: 'desc'})
            .lean();
    },
    Create(product) {
        return Product.create(product);
    },
    Update(product){
        return Product.updateOne(product);
    },
    FindAndDelete(id){
        return Product.findByIdAndUpdate(id, {deleted: true});
    }
}

module.exports = ProductRepository
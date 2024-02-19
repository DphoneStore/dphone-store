const mongoose = require("mongoose");

const ProductSchema = require("../model/ProductSchema");
const Product = mongoose.model("Product", ProductSchema);

const ProductRepository = {
    FindByName(product_name){
        return Product.find({name:{$regex: product_name, $options: 'i'}, deleted: false}).lean();
    },
    FindById(id) {
        return Product.findById(id).where({deleted: false}).lean();
    },
    FindBySlug(slug) {
        return Product.findOne({slug, deleted: false}).lean();
    },
    ProductList(column){
        return Product.find({deleted:false})
            .select(column)
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
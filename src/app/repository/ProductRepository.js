const mongoose = require("mongoose");
const {Types} = mongoose
const ProductSchema = require("../model/ProductSchema");
const Product = mongoose.model("Product", ProductSchema);

const ProductRepository = {
    UpdateStar(id, star) {
        return Product.findByIdAndUpdate(id, {rating:star});
    },
    FindByName(product_name){
        return Product.find({name:{$regex: product_name, $options: 'i'}, deleted: false}).lean();
    },
    FindById(id) {
        return Product.findById(id).where({deleted: false}).populate('brand').lean();
    },
    ProductList(column){
        return Product.find({deleted:false})
            .select(column)
            .populate('brand')
            .sort({release_date: 'desc'})
            .lean();
    },
    ProductListFollowBrand(column, brand){
        const brand_object_ids = brand.map(id => new Types.ObjectId(id));
        if(brand_object_ids.length === 0){
            return Product.find({deleted:false})
                .select(column)
                .populate('brand')
                .sort({release_date: 'desc'})
                .lean();
        }
        return Product.find({brand: {$in: brand_object_ids}, deleted:false})
            .select(column)
            .populate('brand')
            .sort({release_date: 'desc'})
            .lean();
    },
    ProductListFollowNameAndBrand(column, brand_selected, product_name){
        if(brand_selected !== 'null'){
            const brand_object_ids = brand_selected.map(id => new Types.ObjectId(id));
            return Product.find({brand: {$in: brand_object_ids}, name: {$regex: product_name, $options: 'i'}, deleted:false})
                .select(column)
                .populate('brand')
                .sort({release_date: 'desc'})
                .lean();
        }
        return Product.find({name: {$regex: product_name, $options: 'i'}, deleted:false})
            .select(column)
            .populate('brand')
            .sort({release_date: 'desc'})
            .lean();
    },
    Create(product) {
        return Product.create(product);
    },
    Update(id, product){
        return Product.findByIdAndUpdate(id, product);
    },
    FindAndDelete(id){
        return Product.findByIdAndUpdate(id, {deleted: true});
    }
}

module.exports = ProductRepository
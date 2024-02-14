const mongoose = require("mongoose");

const productSchema = require("../model/product/product-schema");
const Product = mongoose.model("Product", productSchema);

const ProductRepository = {
    findBySlug(slug) {
        return Product.findOne({slug}).lean();
    },
    create(product) {
        return Product.create(product);
    }
}
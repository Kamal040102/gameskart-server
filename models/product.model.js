const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_brand: { type: String, required: true },
    product_name: { type: String, required: true },
    product_price: { type: Number, default: 0, min: 0 },
    product_description: { type: String, min: 25, max: 500, required: true },
    product_image: [{ type: String }],
    product_rating: { type: Number, default: 0 },
    product_stock: { type: Number, default: 0 },
    product_suits: { type: String, required: true }
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
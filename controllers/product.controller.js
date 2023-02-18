const expressAsyncHandler = require("express-async-handler");
const { failureResponseMessage, successResponseData, successResponseMessage } = require("../configs/response/response");
const Product = require("../models/product.model")

const getAllProduct = expressAsyncHandler(async (req, res) => {
    try {
        const products = await Product.find();
        successResponseData(res, 200, products);
    }
    catch (err) {
        failureResponseMessage(res, 500, err.message);
    }
})

const getProductById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);

        if (product) {
            successResponseData(res, 200, product)
        }
        else {
            failureResponseMessage(res, 404, `Product not available with id ${id} in Inventory.`, 0);
        }
    }
    catch (err) {
        failureResponseMessage(res, 500, err.message);
    }
})

const deleteProductById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);

        if (product) {
            successResponseMessage(res, 200, `Product with Id ${id} has been deleted from Inventory.`)
        }
        else {
            failureResponseMessage(res, 404, `Product not available with id ${id} in Inventory.`, 0);
        }
    }
    catch (err) {
        failureResponseMessage(res, 500, err.message);
    }
})

const updateProductById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { brand, name, description, price, images, stock, suits } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, {
            product_brand: brand, product_name: name, product_description: description, product_price: price, product_image: images, product_stock: stock, product_suits: suits
        });

        if (product) {
            successResponseMessage(res, 200, `Product with Id ${id} has been updated in Inventory.`)
        }
        else {
            failureResponseMessage(res, 404, `Product not available with id ${id} in Inventory`, 0);
        }
    }
    catch (err) {
        failureResponseMessage(res, 500, err.message);
    }
})

const createProduct = expressAsyncHandler(async (req, res) => {
    const { brand, name, description, price, images, stock, suits } = req.body;

    try {
        if (!brand || !name || !description || !suits) {
            failureResponseMessage(res, 400, "Missing required Parameters.", 0);
        } else {
            const newProduct = new Product({ product_brand: brand, product_name: name, product_description: description, product_price: price, product_image: images, product_stock: stock, product_suits: suits })

            await newProduct.save();

            successResponseMessage(res, 201, "Product has been added into the Inventory.")
        }
    }
    catch (err) {
        failureResponseMessage(res, 500, err.message);
    }

})

module.exports = {
    getAllProduct,
    getProductById,
    deleteProductById,
    updateProductById,
    createProduct
}
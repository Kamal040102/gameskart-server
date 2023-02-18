const { getAllProduct, getProductById, deleteProductById, updateProductById, createProduct } = require("../controllers/product.controller");
const { checkAuth, checkAdminAuth } = require("../middlewares/auth.middleware");

const productRouter = require("express").Router();

productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductById);
productRouter.delete("/:id", checkAdminAuth, deleteProductById);
productRouter.put("/:id", checkAdminAuth, updateProductById)
productRouter.post("/", checkAdminAuth, createProduct)

module.exports = productRouter;
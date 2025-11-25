const productRouter = require("express").Router();
const { VerifyUser } = require("../middleware/auth.middleware");
const {
  CreateProduct,
  ChangeProductStatus,
} = require("../controllers/product.controller");
productRouter.use(VerifyUser);

productRouter.post("/create-product", CreateProduct);
productRouter.get("/change-product-status", ChangeProductStatus);

module.exports = productRouter;

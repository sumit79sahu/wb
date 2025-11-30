const productRouter = require("express").Router();
const { VerifyUser } = require("../middleware/auth.middleware");
const {
  CreateProduct,
  ChangeProductStatus,
  CreateVariation,
  GetProducts,
} = require("../controllers/product.controller");
productRouter.use(VerifyUser);

productRouter.post("/create-product", CreateProduct);
productRouter.get("/change-product-status/:id", ChangeProductStatus);
productRouter.get("/create-variation", CreateVariation);
productRouter.get("/get-products", GetProducts);

module.exports = productRouter;

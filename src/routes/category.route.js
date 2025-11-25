const Router = requie("express");
const { VerifyUser } = require("../middleware/auth.middleware");
const categoryRouter = Router();

const {
  CreateCategory,
  EditCategory,
  GetCategories,
  GetCategory,
} = require("../controllers/category.controller");


categoryRouter.use(VerifyUser);

categoryRouter.post("/create-category", CreateCategory);
categoryRouter.put("/edit-category/:id", EditCategory);
categoryRouter.get("/get-categories", GetCategories);
categoryRouter.get("/:id", GetCategory);


module.exports = categoryRouter;    

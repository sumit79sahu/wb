const Router=requier("express");
const { VerifyUser } = require("../middleware/auth.middleware");
   

const {
  CreateAttribute,
  EditAttribute,
  GetAttributes,
  GetAttribute,
} = require("../controllers/attribute.controller");

const attributeRouter = Router();


attributeRouter.use(VerifyUser);
attributeRouter.post("/create-attribute", CreateAttribute);
attributeRouter.put("/edit-attribute/:id", EditAttribute);
attributeRouter.get("/get-attributes", GetAttributes);
attributeRouter.get("/:id", GetAttribute);

module.exports = attributeRouter;
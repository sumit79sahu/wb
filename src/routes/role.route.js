const { Router } = require("express");
const {
  CreateRole,
  GetRoles,
  GetRole,
  EditRole,
} = require("../controllers/role.controllers");
const { VerifyUser } = require("../middleware/auth.middleware");

const roleRouter = Router();

roleRouter.use(VerifyUser);

roleRouter.post("/create-role", CreateRole);
roleRouter.get("/get-roles", GetRoles);
roleRouter.get("/get-role/:id", GetRole);
roleRouter.put("edit-role/:id", EditRole);

module.exports = roleRouter;

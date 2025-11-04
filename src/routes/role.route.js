const { Router } = require("express");
const { CreateRole, GetRoles } = require("../controllers/role.controllers");
const { VerifyUser } = require("../middleware/auth.middleware");

const roleRouter = Router();

roleRouter.use(VerifyUser);

roleRouter.post("/create-role", CreateRole);
roleRouter.get("/get-roles", GetRoles);

module.exports = roleRouter;

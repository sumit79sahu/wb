const { Router } = require("express");
const { VerifyUser } = require("../middleware/auth.middleware");
const { CreatePermission } = require("../controllers/permission.controllers");

const permissionRouter = Router();

permissionRouter.use(VerifyUser);
permissionRouter.post("/create-permission", CreatePermission);

module.exports = permissionRouter;

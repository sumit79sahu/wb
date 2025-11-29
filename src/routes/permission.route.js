const { Router } = require("express");
const {
  CreatePermission,
  GetPermissions,
} = require("../controllers/permission.controllers");
const { VerifyUser } = require("../middleware/auth.middleware");

const permissionRouter = Router();

permissionRouter.use(VerifyUser);

permissionRouter.post("/create-permission", CreatePermission);
permissionRouter.get("/get-permissions", GetPermissions);
module.exports = permissionRouter;

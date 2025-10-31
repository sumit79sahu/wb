const { Router } = require("express");
const { CreatePermission } = require("../controllers/permission.controllers");

const permissionRouter = Router();

permissionRouter.post("/create-permission", CreatePermission);

module.exports = permissionRouter;

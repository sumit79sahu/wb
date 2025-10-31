const { Router } = require("express");
const { CreateRole } = require("../controllers/role.controllers");

const roleRouter = Router();

roleRouter.post("/create-role", CreateRole);

module.exports = roleRouter;

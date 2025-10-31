const { Router } = require("express");
const {
  GetUsers,
  CreateUser,
  GetUser,
  EditUser,
  Login,
  Logout,
  SendResetPasswordURL,
  ResetPassword,
} = require("../controllers/user.controllers");

const userRouter = Router();

userRouter.post("/create-user", CreateUser);
userRouter.get("/get-users", GetUsers);
userRouter.get("/get-user/:id", GetUser);
userRouter.put("/edit-user/:id", EditUser);

userRouter.post("/login", Login);
userRouter.get("/logout", Logout);

userRouter.post("/send-reset-password-link", SendResetPasswordURL);
userRouter.post("/reset-password", ResetPassword);
module.exports = userRouter;

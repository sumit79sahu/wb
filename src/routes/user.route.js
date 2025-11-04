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
  Me,
} = require("../controllers/user.controllers");
const { VerifyUser } = require("../middleware/auth.middleware");
const userRouter = Router();

userRouter.post("/login", Login);
userRouter.get("/logout", Logout);
userRouter.post("/send-reset-password-link", SendResetPasswordURL);
userRouter.post("/reset-password", ResetPassword);

userRouter.use(VerifyUser);

userRouter.post("/create-user", CreateUser);
userRouter.get("/get-users", GetUsers);
userRouter.get("/get-user/:id", GetUser);
userRouter.put("/edit-user/:id", EditUser);

userRouter.get("/me", Me);

module.exports = userRouter;

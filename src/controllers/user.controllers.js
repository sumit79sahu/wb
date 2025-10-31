const User = require("../models/user.model");
const UserHasRole = require("../models/user_has_role.model");
const validator = require("validator");
const crypto = require("crypto");

const CreateUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email: userEmail,
      password,
      role_id,
    } = req.body;
    const email = userEmail.toLowerCase();
    if (!first_name)
      return res
        .status(200)
        .json({ success: false, message: "first name is required" });
    if (!last_name)
      return res
        .status(200)
        .json({ success: false, message: "last name is required" });
    if (!email)
      return res
        .status(200)
        .json({ success: false, message: "email is required" });
    const isExists = await User.findOne({ email });
    if (isExists)
      return res.status(200).json({
        success: false,
        message: "user with this email is already exists",
      });
    if (!validator.isEmail(email))
      return res.status(200).json({ success: false, message: "invalid email" });
    if (!role_id)
      return res
        .status(200)
        .json({ success: false, message: "role is required" });

    const user = new User({ first_name, last_name, email, password });
    const userhasrole = new UserHasRole({ user_id: user._id, role_id });
    await user.save();
    await userhasrole.save();

    return res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
const GetUsers = async (_, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, message: "", data: users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
const GetUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    return res.status(200).json({ success: true, message: "", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
const EditUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name } = req.body;
    if (!first_name || !last_name)
      return res.status(400).json({ success: false, message: "Invalid Data" });

    const response = await User.findOneAndUpdate(
      { _id: id },
      { first_name, last_name },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email)
      return res
        .status(200)
        .json({ success: false, message: "email is required" });
    if (!password)
      return res
        .status(200)
        .json({ success: false, message: "email is required" });
    const isExists = await User.findOne({ email });
    if (!isExists)
      return res.status(200).json({
        success: false,
        message: "user with this email does not exists",
      });

    const correct = await isExists.isPasswordCorrect(password);
    if (!correct)
      return res.status(200).json({
        success: false,
        message: "invalid password",
      });
    const loggedUser = await User.findOne({ email }).select(
      "-password -reset_password_token"
    );
    return res
      .status(200)
      .cookie("token", isExists.generateAuthToken(), {
        expires: new Date(Date.now() + 900000),
        httpOnly: true, // cannot be access on client side
        secure: false, // false worked on http  true:worked only on https
      })
      .json({
        success: true,
        message: "login successfully",
        data: loggedUser,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
const Logout = async (_, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true, // cannot be access on client side
        secure: false, // false worked on http  true:worked only on https
      })
      .json({
        success: true,
        message: "logout successfully",
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
const SendResetPasswordURL = async (req, res) => {
  try {
    const { redirectURL, email } = req.body;
    if (!email)
      return res
        .status(200)
        .json({ success: false, message: "email is required" });
    const isExists = await User.findOne({ email });
    if (!isExists)
      return res.status(200).json({
        success: false,
        message: "user with this email does not exists",
      });
    if (!redirectURL)
      return res.status(400).json({
        success: false,
        message: "invalid redirect url",
      });
    return res.status(200).json({
      success: true,
      message: "email send successfully",
      data: await isExists.generateResetPasswordLink(redirectURL),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
const ResetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const { new_password, confirm_password } = req.body;
    if (!new_password)
      return res.status(200).json({
        success: false,
        message: "new password is required",
      });
    if (!confirm_password)
      return res.status(200).json({
        success: false,
        message: "confirm password is required",
      });
    if (new_password !== confirm_password)
      return res.status(200).json({
        success: false,
        message: "password does not match",
      });

    if (!validator.isStrongPassword(new_password))
      return res
        .status(200)
        .json({ success: false, message: "entered password is too week" });

    const hashToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({ reset_password_token: hashToken });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "invalid reset password token" });
    const isPasswordSame = await user.isPasswordCorrect(new_password);
    if (isPasswordSame)
      return res.status(200).json({
        success: false,
        message: "this password is same as previous one",
      });
    await User.findOneAndUpdate(
      { _id: user._id },
      { password: new_password, reset_password_token: "" }
    );
    return res.status(200).json({
      success: true,
      message: "password reset successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  CreateUser,
  GetUsers,
  GetUser,
  EditUser,
  Login,
  Logout,
  SendResetPasswordURL,
  ResetPassword,
};

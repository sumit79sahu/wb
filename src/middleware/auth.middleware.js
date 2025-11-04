const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const VerifyUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).json({ message: "Unauthorized request" });
    }
    const { _id } = await jwt.verify(token, "privateKey");
    const user = await User.findOne({ _id }).select("-password");
    if (user) {
      req.user = user;
      next();
    } else res.status(401).json({ message: "Unauthorized request" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { VerifyUser };

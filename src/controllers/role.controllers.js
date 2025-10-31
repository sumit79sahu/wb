const Role = require("../models/role.model");
const CreateRole = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res
        .status(200)
        .json({ message: "role name is defined", success: false });
    const role = new Role({ name });
    role.save();
    return res
      .status(200)
      .json({ message: "role created successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

module.exports = { CreateRole };

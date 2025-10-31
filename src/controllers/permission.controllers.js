const Permission = require("../models/permission.model");
const CreatePermission = async (req, res) => {
  try {
    const { name, group } = req.body;
    if (!name)
      return res
        .status(200)
        .json({ message: "permission name is required", success: false });
    if (!group)
      return res
        .status(200)
        .json({ message: "module name is required", success: false });
    const permission = new Permission({ name });
    permission.save();
    return res
      .status(200)
      .json({ message: "permission created successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

module.exports = { CreatePermission };

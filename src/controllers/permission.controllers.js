const Permission = require("../models/permission.model");
const CreatePermission = async (req, res) => {
  try {
    const { name, group } = req.body;
    if (!name)
      return res
        .status(400)
        .json({ message: "permission name is required", success: false });
    if (!group)
      return res
        .status(400)
        .json({ message: "module name is required", success: false });
    const permission = new Permission({
      name: name.toLowerCase(),
      group: group.toLowerCase(),
    });
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

const GetPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find({});
    return res.status(200).json({
      message: "permission created successfully",
      success: true,
      data: permissions.reduce((acc, perm) => {
        if (!acc[perm.group]) {
          acc[perm.group] = [];
        }
        acc[perm.group].push({ _id: perm._id, name: perm.name });
        return acc;
      }, {}),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

module.exports = { CreatePermission, GetPermissions };

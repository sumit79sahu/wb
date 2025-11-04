const Role = require("../models/role.model");
const RoleHasPermission = require("../models/role_has_permission.model");

const CreateRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    if (!name)
      return res
        .status(200)
        .json({ message: "role name is defined", success: false });
    const role = new Role({ name: name.toLowerCase() });
    if (permissions.length > 0) {
      await RoleHasPermission.insertMany(
        permissions.map((id) => ({ role_id: role._id, permission_id: id }))
      );
    } else {
      return res.status(200).json({
        message: "atleast one permission is required",
        success: false,
      });
    }
    await role.save();
    return res
      .status(200)
      .json({ message: "role created successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const GetRoles = async (req, res) => {
  try {
    const roles = await Role.aggregate([
      {
        $lookup: {
          from: "rolehaspermissions",
          localField: "_id",
          foreignField: "role_id",
          as: "rolePermissions",
        },
      },
      {
        $lookup: {
          from: "permissions",
          localField: "rolePermissions.permission_id",
          foreignField: "_id",
          as: "permissions",
        },
      },
    ]);
    return res
      ?.status(200)
      .json({ message: "roles fetched successfully", data: roles });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { CreateRole, GetRoles };

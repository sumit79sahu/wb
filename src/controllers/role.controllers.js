const { default: mongoose } = require("mongoose");
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
    const roles = await Role.find({});
    return res
      ?.status(200)
      .json({ message: "roles fetched successfully", data: roles });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
const GetRole = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "invalid id", success: false });
    const role = await Role.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
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
      {
        $project: {
          name: 1,
          _id: 1,
          permissions: "$permissions._id",
        },
      },
    ]);

    return res
      ?.status(200)
      .json({ message: "roles fetched successfully", data: role });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
const EditRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;
    if (!id)
      return res
        ?.status(200)
        .json({ message: "roles fetched successfully", data: roles });
    if (!name || !permissions || !permissions.length)
      return res.status(400).json({ success: false, message: "Invalid Data" });

    if (name)
      await Role.findOneAndUpdate(
        { _id: id },
        { $set: { name } },
        { new: true, runValidators: true }
      );
    if (permissions.length > 0) {
      await RoleHasPermission.deleteMany({ role_id: id });
      await RoleHasPermission.insertMany(
        permissions.map((permissionId) => ({
          role_id: role._id,
          permission_id: permissionId,
        }))
      );
    }
    return res.status(200).json({
      message: "Role updated successfully",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { CreateRole, GetRoles, GetRole, EditRole };

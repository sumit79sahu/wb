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
      .json({ message: "Server error", error: err.message });
  }
};

// const AssginRoleToUser = async (req, res) => {
//   try {
//     const { user_id, role_id } = req.body;

//     if (!user_id)
//       return res
//         .status(400)
//         .json({ message: "user_id is defined", success: false });
//     if (!role_id)
//       return res
//         .status(400)
//         .json({ message: "role_id is defined", success: false });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Server error", error: err.message });
//   }
// };

module.exports = { CreateRole };

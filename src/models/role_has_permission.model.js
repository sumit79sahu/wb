const { Schema, model } = require("mongoose");
const rolehaspermissionSchema = new Schema(
  {
    permission_id: {
      ref: "Permission",
      required: true,
    },
    role_id: {
      ref: "Role",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new model("RoleHasPermission", rolehaspermissionSchema);

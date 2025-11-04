const { Schema, model } = require("mongoose");
const rolehaspermissionSchema = new Schema(
  {
    permission_id: {
      type: Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
    },
    role_id: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new model("RoleHasPermission", rolehaspermissionSchema);

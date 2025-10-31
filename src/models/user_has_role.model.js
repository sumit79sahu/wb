const { Schema, model } = require("mongoose");

const userHasRoleSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role_id: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("UserHasRole", userHasRoleSchema);

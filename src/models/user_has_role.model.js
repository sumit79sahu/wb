const { Schema, model } = require("mongoose");

const userHasRoleSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
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

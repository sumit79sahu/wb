const { Schema, model } = require("mongoose");
const userhasroleSchema = new Schema(
  {
    user_id: {
      ref: "User",
      required: true,
    },
    role_id: {
      ref: "Role",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new model("UserHasRole", userhasroleSchema);

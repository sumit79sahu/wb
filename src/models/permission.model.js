const { Schema, model } = require("mongoose");
const permissionSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    group: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = new model("Permission", permissionSchema);

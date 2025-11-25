const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  description: {
    type: String,
  },
});

module.exports = new model("Product", ProductSchema);

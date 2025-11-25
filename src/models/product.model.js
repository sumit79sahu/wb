const { Schema } = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categories:[ {
    type: Schema.Types.ObjectId,
    ref: "Category",
  }],
  status: {
    type: Boolean,
    required: true,
    default:true
  },
  descriptions: {
    type: String,
  },
  variations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Variation",
    },
  ],
});

module.exports = model("Product", ProductSchema);

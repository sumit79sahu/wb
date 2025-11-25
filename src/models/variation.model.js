const { Schema, model } = require("mongoose");

const VariationSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, required: true, ref: "product" },
  name: {
    type: String,
    required: true,
  },
  attributes: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "attribute",
    },
  ],
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = model("Variation", VariationSchema);

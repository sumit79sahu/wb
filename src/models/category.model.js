const { Schema,model } = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

module.exports=model("Category",CategorySchema)
const { Schema,model } = require("mongoose");

const CategorySchema = new Schema({
  parent_id:{
    type:Schema.Types.ObjectId,
    ref:"Category"
  },
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
    default: true,
  },
});

module.exports=model("Category",CategorySchema)
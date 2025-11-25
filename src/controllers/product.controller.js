const Product = require("../models/product.model");
const Variation = require("../models/variation.model");
const CreateProduct = async (req, res) => {
  try {
    const { name, categories, description } = req.body;
    if (!name) {
      return res.status(200).json({
        status: false,
        message: "product name is required",
      });
    }
    const product = new Product({ name, categories, description });
    await product.save();
    return res.status(200).json({
      status: true,
      message: "product created successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const ChangeProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        status: false,
        message: "inavlid api call",
      });

    const product = await Product.findById(id);
    const variation = await Variation.exists({ product_id: id });
    console.log(product);
    console.log(variation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

module.exports = { CreateProduct, ChangeProductStatus };

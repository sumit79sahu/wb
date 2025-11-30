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
    return res.status(500).json({ message: "Server error", success: false });
  }
};
const CreateVariation = async (req, res) => {
  try {
    const { product_id, name, attributes, price } = req.body;
    if (!product_id)
      return res.status(400).json({
        message: "this varaition is not associate to any product",
        success: false,
      });
    if (!name)
      return res.status(200).json({
        message: "variation name is required",
        success: false,
      });
    if (!attributes && attributes.length === 0)
      return res.status(200).json({
        message:
          "at least one attribute is required to create product variation",
        success: false,
      });
    if (!price)
      return res.status(200).json({
        message: "variation price is required",
        success: false,
      });

    if (isNaN(price)) {
      return res.status(200).json({
        success: false,
        message: "Price must be a valid number",
      });
    }

    const numericPrice = Number(price);

    if (numericPrice <= 0) {
      return res.status(200).json({
        success: false,
        message: "Price must be greater than 0",
      });
    }

    const variation = new Variation({
      product_id,
      attributes,
      price,
      name,
    });
    await variation.save();
    return res
      .status(200)
      .json({ message: "variation created successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
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
    if (!variation && !product.status)
      return res.status(200).json({
        message: "to active this product at least on variation is required",
      });

    const newProduct = await Product.updateOne(
      variation._id,
      {
        status: !product.status,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      message: "product status changed successfully",
      success: true,
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

const GetProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort=req.query.sort || "createdAt";
    const order=parseInt(req.query.order) || -1
    const skip = (page - 1) * limit;
    const total = await Product.estimatedDocumentCount();
    const products = await Product.find({}).sort({[sort]:order}).skip(skip).limit(limit);
    return res.status(200).json({
      message: "product fetch successfully",
      data: { page, pageSize:products.length, total, products },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", success: false });
  }
};

module.exports = {
  CreateProduct,
  ChangeProductStatus,
  CreateVariation,
  GetProducts,
};

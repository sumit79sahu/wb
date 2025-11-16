const Category = require("../models/category.model");

const CreateCategory = async (req, res) => {
  try {
    const { name, description, parent_id, status } = req.body;

    if (!name)
      return res
        .status(200)
        .json({ message: "category name is required", success: false });
    const category = new Category({
      name,
      description,
      parent_id,
      status,
    });
    category.save();
    return res
      .status(200)
      .json({ message: "category created successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const GetCategories = async (_, res) => {
  try {
    const categories = await Category.find();
    return res
      .status(200)
      .json({ success: true, message: "", data: categories });
  } catch (error) {
    return res

      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const GetCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category)
      return res
        .status(200)
        .json({ success: false, message: "category not found" });
    return res.status(200).json({ success: true, message: "", data: category });
  } catch (error) {
    return res

      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const EditCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, parent_id, status } = req.body;
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (parent_id !== undefined) updateData.parent_id = parent_id;
    if (status !== undefined) updateData.status = status;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "At least one field must be provided to update the category",
        success: false,
      });
    }
    const isExists = await Category.findById(id);
    if (!isExists)
      return res
        .status(400)
        .json({ message: "category not found", success: false });
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        description,
        parent_id,
        status,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "category updated successfully",
      success: true,
      data: category,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

module.exports = { CreateCategory, EditCategory, GetCategories, GetCategory };

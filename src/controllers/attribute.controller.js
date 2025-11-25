const Attribute = require("../models/attribute.model");

const CreateAttribute = async (req, res) => {
  try {
    const { name, values } = req.body;
    if (!name) {
      return res
        .status(200)
        .json({ message: "attribute name is required", success: false });
    }

    if (values || !Array.isArray(values) || values.length === 0) {
      return res
        .status(200)
        .json({ message: "Invalid attribute values", success: false });
    }
    const attribute = new Attribute({ name, values });
    await attribute.save();
    return res.status(200).json({
      message: "Attribute created successfully",
      success: true,
      data: attribute,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const EditAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, values } = req.body;

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (values !== undefined && values.length !== 0) updateData.values = values;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "At least one field must be provided to update the category",
        success: false,
      });
    }
    const isExists = await Attribute.findById(id);
    if (!isExists) {
      return res
        .status(200)
        .json({ message: "attribute not found", success: false });
    }

    const newAttribute = await Attribute.findOneAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
      message: "Attribute updated successfully",
      success: true,
      data: newAttribute,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
const GetAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    const attribute = await Attribute.findById(id);
    if (!attribute) {
      return res
        .status(200)
        .json({ success: false, message: "attribute not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "", data: attribute });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const GetAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.find({});
    return res
      .status(200)
      .json({ success: true, message: "", data: attributes });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  CreateAttribute,
  EditAttribute,
  GetAttributes,
  GetAttribute,
};

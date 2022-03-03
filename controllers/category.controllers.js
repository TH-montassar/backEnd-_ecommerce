const Category = require("../models/category.models");

const createCategory = async (req, res) => {
  const newCategory = new Category({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedCategory = await newCategory.save();
    return res.status(201).json(savedCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const updateCategory = async (req, res) => {
  const id = req.params.categoryId;
  try {
    const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getCategory = async (req, res) => {
  const categorySlug= req.params.categorySlug;
  try {
    const category = await Category.findOne({slug:categorySlug});
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getCategories = async (req, res) => {
  try {
    const getCategory = await Category.find();
    return res.status(200).json(getCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const deleteCategory = async (req, res) => {
  const id = req.params.categoryId;
  try {
    const deleteCategory = await Category.findByIdAndDelete(id);
    return res.status(200).json(deleteCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.createCategory = createCategory;
module.exports.updateCategory = updateCategory;
module.exports.getCategory = getCategory;
module.exports.getCategories = getCategories;
module.exports.deleteCategory = deleteCategory;

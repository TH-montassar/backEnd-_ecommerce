const Product = require("../models/product.models");

const createProduct = async (req, res) => {
  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    // category: req.body.category,
    //  image: req.body.image,
    //  reference: req.body.reference,
  });
  try {
    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const updateProduct = async (req, res) => {
  const id = req.params.productId;

  try {
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getProduct = async (req, res) => {
  const id = req.params.productId;
  try {
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const deleteProduct = async (req, res) => {
  const id = req.params.productId;
  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    return res.status(200).json(deleteProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;

module.exports.getProduct = getProduct;
module.exports.getProducts = getProducts;
module.exports.deleteProduct = deleteProduct;

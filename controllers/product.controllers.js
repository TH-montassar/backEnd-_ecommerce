const Category = require("../models/category.models");
const Product = require("../models/product.models");

const createProduct = async (req, res) => {
 // console.log("this is from create product",req.verifiedUser._id)
  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    user:req.verifiedUser._id,
    image: req.body.image,
  //  promotionPrice:req.body.promotionPrice,
    reference: req.body.reference,
   // isPromotion: req.body.isPromotion
  });
  //console.log( newProduct.category)
  try {
    const savedProduct = await newProduct.save();
    console.log(savedProduct)
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
  const productSlug = req.params.productSlug;
  try {
    const product = await Product.findOne({slug:productSlug}).populate({path:"category",select:"title"});
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getProducts = async (req, res) => {
 // console.log(req.verifiedUser)
  let filter = {};
  if (req.query.category) {
    filter.category = await Category.findOne({
      title: req.query.category,
    }).select("_id");
  }
 //console.log("this is from filter",filter);

  try {
    const products = await Product.find(filter).populate("user").populate("category");
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json(err);
  }
  // let filter={}
  // if(req.query.category)
  // {
  //      filter={category:req.query.category}
  // }
  //   try {
  //     const getProduct = await Product.find(filter).populate("category");
  //     return res.status(200).json(getProduct);
  //   } catch (err) {
  //     return res.status(500).json(err);
  //   }
};
//filterProduct


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


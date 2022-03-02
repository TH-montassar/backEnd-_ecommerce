const Order = require("../models/order.models");
const Cart = require("../models/cart.models");

const createOrder = async (req, res) => {
  const cart = await Cart.findById(req.verifiedUser.cart);
  const newOrder = new Order({
    items: cart.items,
    totalPrice: cart.totalPrice,
    totalPriceWithTax: cart.totalPriceWithTax,
    taxPercentage: cart.taxPercentage,

    address: req.verifiedUser.address,
    client: req.verifiedUser._id
  });

  try {
    const savedOrder = await newOrder.save();
    return res.status(201).json(savedOrder);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getOrder = async (req, res) => {
  const id = req.params.orderId;
  try {
    const getOrder = await Order.findById(id);
    return res.status(200).json(getOrder);
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getOrders = async (req, res) => {
  try {
    const getOrders = await Order.find();
    return res.status(200).json(getOrders);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//const deleteOrder = async (req, res) => {};
//const updateOrder = async (req, res) => {};
module.exports.createOrder = createOrder;
module.exports.getOrder = getOrder;
module.exports.getOrders = getOrders;

//module.exports.deleteOrder = deleteOrder;
//module.exports.updateOrder = updateOrder;

const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    title: { type: String },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String },
    price: { type: Number },
    promotionPrice: { type: Number },
    isPromotion: { type: Boolean, default: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    reference: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);

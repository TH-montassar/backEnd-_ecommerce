const mongoose = require("mongoose");
const slug = require("slug");
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
//*pre ///9bal maysajel fl baz
//*post //ba3d maysajel fel baz
ProductSchema.pre("validate", function (next) {
  if (!this.slug) {
    this.slugify();
  }
  next();
});

ProductSchema.methods.slugify = function () {
  this.slug = slug(this.title) +"-"+ ((Math.random() * Math.pow(36,6)) | 0).toString(36);
   
};



module.exports = mongoose.model("Product", ProductSchema);
//function  fi west lmodel  // arrw function leee tdu3 scoup

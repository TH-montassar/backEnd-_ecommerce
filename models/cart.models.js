const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    //item dinormalize
    items: [
      {
        Product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        price: { type: Number, min: 0 },
        quantity: { type: Number, min: 0 },
        total: { type: Number, min: 0 },
      },
    ],
    totalPrice: { type: Number, min: 0 },

    totalPriceWithTax: { type: Number, min: 0, default: 0 },
    taxPercentage: { type: Number, min: 0, default: 19, default: 0 },
  },
  { timestamps: true }
);

CartSchema.pre("validate", function (next) {
  this.calculateTotal();
  next();
});
CartSchema.methods.calculateTotal = function () {
  console.log(this.item);
  this.totalPrice = 0;
  this.items.forEach((item) => {
    this.totalPrice += item.total;
  });

  this.totalPriceWithTax =
    this.totalPriceWithTax + (this.totalPrice * this.taxPercentage) / 100;
};

module.exports = mongoose.model("Cart", CartSchema);

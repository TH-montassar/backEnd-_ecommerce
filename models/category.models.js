const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema(
  {
    title: { type: String, unique: true, index: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);

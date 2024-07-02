const mongoose = require("mongoose");

const overviewSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mainPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  company: { type: String, required: true },
  mainImage: { type: String, required: true },
  images: [{ type: String }],
  overview: [overviewSchema],
  description: { type: String },
});

module.exports = mongoose.model("Product", productSchema);

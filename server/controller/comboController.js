const Combo = require("../models/Combo");
const Product = require("../models/Product");

// Get all combos
exports.getCombos = async (req, res) => {
  try {
    const combos = await Combo.find().populate("products");
    res.json(combos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get combo by ID
exports.getComboById = async (req, res) => {
  try {
    const combo = await Combo.findById(req.params.id).populate("products");
    if (!combo) return res.status(404).json({ message: "Combo not found" });
    res.json(combo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new combo
exports.createCombo = async (req, res) => {
  const { name, comboPrice, products: productIds } = req.body;
  try {
    const products = await Product.find({ _id: { $in: productIds } });
    const newCombo = new Combo({
      name,
      comboPrice,
      products: products.map((p) => p._id),
    });
    const savedCombo = await newCombo.save();
    res.status(201).json(savedCombo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a combo
exports.updateCombo = async (req, res) => {
  const { name, comboPrice, productIds } = req.body;
  try {
    const products = await Product.find({ _id: { $in: productIds } });
    const updatedCombo = await Combo.findByIdAndUpdate(
      req.params.id,
      { name, comboPrice, products: products.map((p) => p._id) },
      { new: true }
    );
    if (!updatedCombo)
      return res.status(404).json({ message: "Combo deal not found" });
    res.json(updatedCombo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a combo
exports.deleteCombo = async (req, res) => {
  try {
    const deletedCombo = await Combo.findByIdAndDelete(req.params.id);
    if (!deletedCombo)
      return res.status(404).json({ message: "Combo not found" });
    res.json({ message: "Combo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

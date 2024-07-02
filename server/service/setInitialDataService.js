const fs = require("fs");
const path = require("path");
const Product = require("../models/Product");
const Combo = require("../models/Combo");

exports.setInitialData = async () => {
  const jsonData = fs.readFileSync("./DummyData/products.json", "utf8");
  const products = JSON.parse(jsonData);
  console.log(products);

  await Product.insertMany(products);

  await Combo.deleteMany({});

  const updatedProducts = await Product.find().limit(4);

  const firstComboProducts = updatedProducts
    .slice(0, 2)
    .map((product) => product._id);
  const secondComboProducts = updatedProducts
    .slice(2, 4)
    .map((product) => product._id);

  const firstCombo = new Combo({
    name: "first combo",
    comboPrice: 60,
    products: firstComboProducts,
  });

  await firstCombo.save();

  const secondCombo = new Combo({
    name: "second combo",
    comboPrice: 30,
    products: secondComboProducts,
  });

  await secondCombo.save();
  console.log("Initial data added to MongoDB");
};

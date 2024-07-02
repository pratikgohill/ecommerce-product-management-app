const mongoose = require("mongoose");

const comboSchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  ],
  comboPrice: { type: Number, required: true },
});

comboSchema.pre("save", async function (next) {
  try {
    const existingCombo = await this.constructor.findOne({
      products: this.products,
    });
    if (existingCombo) {
      throw new Error("Same combo offer already exists");
    }
    next();
  } catch (err) {
    next(err);
  }
});
module.exports = mongoose.model("Combo", comboSchema);

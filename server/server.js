const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const productRoute = require("./routes/productRoute");
const comboRoute = require("./routes/comboRoute");
const Product = require("./models/Product");
const { setInitialData } = require("./service/setInitialDataService");

// Routes
app.use("/api/products", productRoute);
app.use("/api/combos", comboRoute);

const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    app.listen(PORT, () => console.log("Server is listening on Port", PORT));

    const count = await Product.countDocuments();
    console.log("count", count);
    if (count === 0) {
      await setInitialData();
    }
  })
  .catch((err) => {
    console.log(err);
  });

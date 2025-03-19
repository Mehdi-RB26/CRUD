const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({

//  _id: { type: Number, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  power: { type: String, required: true },
  engine: { type: String, required: true },
  price: { type: String, required: true },
});

module.exports = mongoose.model("Car", CarSchema);

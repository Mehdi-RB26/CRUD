/*const express = require("express");
const router = express.Router();
const Car = require("../models/car");

// ...existing code...

router.post("/cars", async (req, res) => {
  try {
    const { brand, model, year, power, engine, price } = req.body;
    const newCar = new Car({ brand, model, year, power, engine, price });
    await newCar.save();
    res.status(201).send(newCar);
  } catch (error) {
    res.status(400).send(error);
  }
});

// ...existing code...

module.exports = router;*/
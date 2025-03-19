const express = require("express");
const router = express.Router();
const Car = require("../models/car");

// Create a Car
router.post("/", async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read All Cars
router.get("/", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

// Update a Car
router.put("/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a Car
router.delete("/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

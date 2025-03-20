import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCar = ({ onAddCar, toggleForm, carToEdit, onEditSubmit }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [engine, setEngine] = useState('');
  const [price, setPrice] = useState('');
  const [power, setPower] = useState('');

  useEffect(() => {
    if (carToEdit) {
      setBrand(carToEdit.brand);
      setModel(carToEdit.model);
      setYear(carToEdit.year);
      setEngine(carToEdit.engine);
      setPrice(carToEdit.price);
      setPower(carToEdit.power);
    }
  }, [carToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const carData = {
      brand,
      model,
      year,
      engine,
      price,
      power,
    };

    if (carToEdit) {
      // If carToEdit exists, we are updating the car
      onEditSubmit({ ...carData, _id: carToEdit._id });
    } else {
      // Otherwise, we are adding a new car
      axios.post('http://localhost:5000/api/cars', carData)
        .then(() => {
          onAddCar(); // Fetch the updated car list
          toggleForm(); // Close the modal
        })
        .catch((error) => {
          console.error('Error adding car:', error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-car-form">
      <div className="input-group">
        <div className="input-item">
          <label>Brand</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            placeholder="Enter the brand"
          />
        </div>
        <div className="input-item">
          <label>Model</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            placeholder="Enter the model"
          />
        </div>
      </div>
      <div className="input-group">
        <div className="input-item">
          <label>Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            placeholder="Enter the year"  
          />
        </div>
        <div className="input-item">
          <label>Engine</label>
          <input
            type="text"
            value={engine}
            onChange={(e) => setEngine(e.target.value)}
            required
            placeholder="Enter the engine name"
          />
        </div>
      </div>
      <div className="input-group">
        <div className="input-item">
          <label>Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Enter the price"
          />
        </div>
        <div className="input-item">
          <label>Power</label>
          <input
            type="text"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            required
            placeholder="Type how much power"
          />
        </div>
      </div>
      <button type="submit">{carToEdit ? 'Update Car' : 'Add Car'}</button>
    </form>
  );
};

export default AddCar;

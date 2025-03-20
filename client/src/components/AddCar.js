import React, { useState } from 'react';
import axios from 'axios';

const AddCar = ({ onAddCar }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [engine, setEngine] = useState('');
  const [price, setPrice] = useState('');
  const [power, setPower] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/cars', { brand, model, year, engine, price, power })
      .then(response => {
        console.log('Car added:', response.data);
        setBrand('');
        setModel('');
        setYear('');
        setEngine('');
        setPrice('');
        setPower('');
        onAddCar(); // This will trigger the fetchCars function again and re-render the list of cars
      })
      .catch(error => console.error('Error adding car:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="add-car-form">
      <div className="form-group">
        <div className="input-group">
          <div className="input-item">
            <label>Brand:</label>
            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
          </div>
          <div className="input-item">
            <label>Model:</label>
            <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
          </div>
        </div>

        <div className="input-group">
          <div className="input-item">
            <label>Year:</label>
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
          </div>
          <div className="input-item">
            <label>Engine:</label>
            <input type="text" value={engine} onChange={(e) => setEngine(e.target.value)} />
          </div>
        </div>

        <div className="input-group">
          <div className="input-item">
            <label>Price:</label>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="input-item">
            <label>Power:</label>
            <input type="text" value={power} onChange={(e) => setPower(e.target.value)} />
          </div>
        </div>
      </div>

      <button type="submit">Add Car</button>
    </form>
  );
};

export default AddCar;

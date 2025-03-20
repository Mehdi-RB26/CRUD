import React, { useState } from 'react';
import axios from 'axios';

const UpdateCar = ({ car }) => {
  const [brand, setBrand] = useState(car.brand);
  const [model, setModel] = useState(car.model);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/cars/${car._id}`, { brand, model })
      .then(response => {
        console.log('Car updated:', response.data);
      })
      .catch(error => console.error('Error updating car:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Brand:</label>
        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
      </div>
      <div>
        <label>Model:</label>
        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
      </div>
      <button type="submit">Update Car</button>
    </form>
  );
};

export default UpdateCar;
import React from 'react';

const CarList = ({ cars }) => {
  return (
    <div className="car-list">
      {cars.map((car) => (
        <div className="car-card" key={car._id}>
          <h3>{car.brand} {car.model}</h3>
          <p>Year: {car.year}</p>
          <p>Engine: {car.engine}</p>
          <p>Price: ${car.price}</p>
          <p>Power: {car.power}</p>
        </div>
      ))}
    </div>
  );
};

export default CarList;

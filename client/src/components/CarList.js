import React from 'react';

const CarList = ({ cars, onDelete, onUpdate }) => {
  return (
    <div className="car-list">
      {cars.map((car) => (
        <div className="car-card" key={car._id}>
          <h3>{car.brand} {car.model}</h3>
          <p>Year: {car.year}</p>
          <p>Engine: {car.engine}</p>
          <p>Price: ${car.price}</p>
          <p>Power: {car.power}</p>

          {/* Buttons container */}
          <div className="car-card-buttons">
            <button className="delete-btn" onClick={() => onDelete(car._id)}>Delete</button>
            <button className="update-btn" onClick={() => onUpdate(car)}>Update</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarList;

import React from 'react';
import axios from 'axios';

const DeleteCar = ({ carId }) => {
  const handleDelete = () => {
    axios.delete(`/api/cars/${carId}`)
      .then(response => {
        console.log('Car deleted:', response.data);
      })
      .catch(error => console.error('Error deleting car:', error));
  };

  return (
    <button onClick={handleDelete}>Delete Car</button>
  );
};

export default DeleteCar;
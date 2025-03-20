import './App.css';
import React, { useState, useEffect } from 'react';
import CarList from './components/CarList';
import AddCar from './components/AddCar';
import axios from 'axios';

function App() {
  const [cars, setCars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCar, setEditingCar] = useState(null);  // State to handle car update modal

  const fetchCars = () => {
    axios.get('http://localhost:5000/api/cars')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
      });
  };

  useEffect(() => {
    fetchCars(); // Fetch cars on initial load
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleDelete = (carId) => {
    axios.delete(`http://localhost:5000/api/cars/${carId}`)
      .then(() => {
        fetchCars(); // Refresh car list after deletion
      })
      .catch((error) => {
        console.error('Error deleting car:', error);
      });
  };

  const handleUpdate = (car) => {
    setEditingCar(car); // Set the car to be edited
    setShowForm(true);   // Show the add/update form
  };

  const handleEditSubmit = (updatedCar) => {
    axios.put(`http://localhost:5000/api/cars/${updatedCar._id}`, updatedCar)
      .then(() => {
        fetchCars(); // Refresh the car list after update
        setShowForm(false); // Close the modal after updating
      })
      .catch((error) => {
        console.error('Error updating car:', error);
      });
  };

  const filteredCars = cars.filter(car => {
    const brand = car.brand?.toLowerCase() || '';
    const model = car.model?.toLowerCase() || '';
    return (
      brand.includes(searchQuery.toLowerCase()) || 
      model.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="App">
      <h1 className="title">Car Management</h1>
      
      {/* Search input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Car by Model or Brand"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Add Car Button */}
      <button className="add-car-btn" onClick={toggleForm}>
        {showForm ? "Cancel" : "Add Car"}
      </button>

      {/* Modal for Add/Update Car Form */}
      {showForm && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            {/* Pass editingCar if it's an update */}
            <AddCar 
              onAddCar={fetchCars} 
              toggleForm={toggleForm} 
              carToEdit={editingCar} 
              onEditSubmit={handleEditSubmit} 
            />
            <div className="modal-footer">
              <button className="close-modal-btn" onClick={toggleForm}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Car List */}
      <CarList cars={filteredCars} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
}

export default App;

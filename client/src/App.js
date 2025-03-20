import './App.css';
import React, { useState, useEffect } from 'react';
import CarList from './components/CarList';
import AddCar from './components/AddCar';
import axios from 'axios';

function App() {
  const [cars, setCars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

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

  // Filter cars based on the search query
  const filteredCars = cars.filter(car => {
    const brand = car.brand?.toLowerCase() || ''; // Safely access car.brand
    const model = car.model?.toLowerCase() || ''; // Safely access car.model
    return (
      brand.includes(searchQuery.toLowerCase()) || // Search for brand
      model.includes(searchQuery.toLowerCase()) // Search for model
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
          onChange={(e) => setSearchQuery(e.target.value)}  // Update the search query state
        />
      </div>
      
      {/* Add Car Button */}
      <button className="add-car-btn" onClick={toggleForm}>
        {showForm ? "Cancel" : "Add Car"}
      </button>

      {/* Modal for Add Car Form */}
      {showForm && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <AddCar onAddCar={fetchCars} />
            <div className="modal-footer">
              <button className="close-modal-btn" onClick={toggleForm}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Car List */}
      <CarList cars={filteredCars} /> {/* Display filtered cars */}
    </div>
  );
}

export default App;

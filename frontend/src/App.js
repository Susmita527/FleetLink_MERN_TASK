import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddVehicle from './components/AddVehicle';
import SearchAndBook from './components/SearchAndBook';
import ViewBooking from './components/ViewBooking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchAndBook />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/view-booking" element={<ViewBooking />} />
       
      </Routes>
    </Router>
  );
}

export default App;

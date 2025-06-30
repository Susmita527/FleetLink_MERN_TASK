import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

const SearchAndBook = () => {
  const [capacityRequired, setCapacityRequired] = useState('');
  const [fromPincode, setFromPincode] = useState('');
  const [toPincode, setToPincode] = useState('');
  const [startTime, setStartTime] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [message, setMessage] = useState('');
  const [estimatedDuration, setEstimatedDuration] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/api/vehicles/available', {
        params: { capacityRequired, fromPincode, toPincode, startTime }
      });

      if (response.data.availableVehicles.length === 0) {
        setVehicles([]);
        setEstimatedDuration(null);
        setMessage('No vehicles found for the selected capacity.');
      } else {
        setVehicles(response.data.availableVehicles);
        setEstimatedDuration(response.data.estimatedRideDurationHours);
        setMessage('');
      }
    } catch (error) {
      setMessage('Error fetching vehicles.');
      setVehicles([]);
      setEstimatedDuration(null);
    }
  };

  const handleBooking = async (vehicleId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/bookings', {
        vehicleId,
        fromPincode,
        toPincode,
        startTime,
        customerId: '12345' 
      });
      setMessage(`Booking successful for vehicle: ${response.data.vehicleId}`);
      alert(`Booking successful for vehicle: ${response.data.vehicleId}`);
    } catch (error) {
      setMessage('Error booking vehicle.');
    }
  };

  return (
    (
        <Box
          sx={{
            bgcolor: '#1e1e1e',
            minHeight: '100vh',
            py: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Paper
            elevation={12}
            sx={{
              p: 4,
              bgcolor: '#1e1e1e',
              width: '100%',
              maxWidth: 500,
              borderRadius: 4,
              boxShadow: '10px 10px 20px #141414, -10px -10px 20px #2c2c2c',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: 'center',
                color: '#fff',
                mb: 3,
                letterSpacing: 2,
                fontWeight: 'bold',
              }}
            >
              Search & Book
            </Typography>
    
            <Box component="form" onSubmit={handleSearch}>
              <TextField
                fullWidth
                label="Capacity Required (KG)"
                value={capacityRequired}
                onChange={(e) => setCapacityRequired(e.target.value)}
                margin="normal"
                InputProps={{ style: { backgroundColor: '#1a1a1a', color: '#fff', borderRadius: 10 } }}
                InputLabelProps={{ style: { color: '#aaa' } }}
              />
    
              <TextField
                fullWidth
                label="From Pincode"
                value={fromPincode}
                onChange={(e) => setFromPincode(e.target.value)}
                margin="normal"
                InputProps={{ style: { backgroundColor: '#1a1a1a', color: '#fff', borderRadius: 10 } }}
                InputLabelProps={{ style: { color: '#aaa' } }}
              />
    
              <TextField
                fullWidth
                label="To Pincode"
                value={toPincode}
                onChange={(e) => setToPincode(e.target.value)}
                margin="normal"
                InputProps={{ style: { backgroundColor: '#1a1a1a', color: '#fff', borderRadius: 10 } }}
                InputLabelProps={{ style: { color: '#aaa' } }}
              />
    
              <TextField
                fullWidth
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{ style: { backgroundColor: '#1a1a1a', color: '#fff', borderRadius: 10 } }}
              />
    
    <Button
  type="submit"
  fullWidth
  variant="contained"
  sx={{
    mt: 2,
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#388E3C',
    },
  }}
>
  Search Availability
</Button>
            </Box>
    
            {message && (
              <Typography sx={{ color: '#ddd', mt: 2, fontSize: '14px' }}>
                {message}
              </Typography>
            )}
             {estimatedDuration !== null && (
          <Typography sx={{ color: 'red', mt: 2 }}>
            Estimated Ride Duration: {estimatedDuration} hour{estimatedDuration > 1 ? 's' : ''}
          </Typography>
        )}
    
    {vehicles.length > 0 && vehicles.map((vehicle) => (
  <Paper
    key={vehicle._id}
    sx={{
      mt: 3,
      p: 2,
      backgroundColor: '#1a1a1a',
      color: '#fff',
      borderRadius: 3,
      boxShadow: 'inset 5px 5px 10px #121212, inset -5px -5px 10px #252525',
    }}
  >
    <Typography>
      🚚 <strong>{vehicle.name}</strong> — {vehicle.capacityKg} KG — {vehicle.tyres} Tyres
    </Typography>
    <Button
      variant="contained"
      onClick={() => handleBooking(vehicle._id)}
      sx={{
        mt: 1,
        backgroundColor: '#2196f3 !important',
        color: '#fff',
        boxShadow: '4px 4px 8px #141414, -4px -4px 8px #2a2a2a',
        '&:hover': {
          backgroundColor: '#444',
        },
      }}
    >
      Book Now
    </Button>
  </Paper>
))}
         
          </Paper>
        </Box>
      ));
    };

export default SearchAndBook; 
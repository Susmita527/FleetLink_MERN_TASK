import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Button,
} from '@mui/material';

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');

  const customerId = '12345'; 

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/bookings?customerId=${customerId}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage('Error fetching bookings');
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      setMessage('Booking cancelled successfully');
      alert('Booking cancelled successfully');
      fetchBookings(); 
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('Error cancelling booking');
      alert('Error cancelling booking');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, color: '#fff' }}>Your Bookings</Typography>
      {message && <Typography sx={{ color: 'lightgreen', mb: 2 ,}}>{message}</Typography>}
      {bookings.length === 0 ? (
        <Typography sx={{ color: '#ccc' ,textAlign: 'center' }}>No bookings found.</Typography>
      ) : (
        bookings.map((booking) => (
          <Paper key={booking._id} sx={{ p: 2, mb: 2, bgcolor: '#1e1e1e', color: '#fff' }}>
            <Typography><strong>Vehicle:</strong> {booking.vehicleId?.name || 'N/A'}</Typography>
            <Typography><strong>From:</strong> {booking.fromPincode}</Typography>
            <Typography><strong>To:</strong> {booking.toPincode}</Typography>
            <Typography><strong>Start:</strong> {new Date(booking.startTime).toLocaleString()}</Typography>
            <Button
              onClick={() => handleCancel(booking._id)}
              sx={{ mt: 1, backgroundColor: '#e53935', color: '#fff', '&:hover': { backgroundColor: '#c62828' } }}
              variant="contained"
            >
              Cancel Booking
            </Button>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default ViewBooking;

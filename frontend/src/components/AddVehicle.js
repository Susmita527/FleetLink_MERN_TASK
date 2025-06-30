import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

const AddVehicle = () => {
  const [name, setName] = useState('');
  const [capacityKg, setCapacityKg] = useState('');
  const [tyres, setTyres] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/vehicles', { name, capacityKg, tyres });
      alert(`Vehicle added: ${response.data.name}`);
      setMessage(`Vehicle added: ${response.data.name}`);
      // Reset form fields
      setName('');
      setCapacityKg('');
      setTyres('');
      setTimeout(() => setMessage(''), 0);
    } catch (error) {
      alert('Error adding vehicle.');
      setMessage('Error adding vehicle.');
      setTimeout(() => setMessage(''), 0);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 5,
        p: 4,
        borderRadius: 3,
        bgcolor: 'background.paper',
        boxShadow: '0 0 20pxrgb(64, 88, 88), 0 0 40pxrgb(27, 24, 27)',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom color="primary" className="css-add-vehicle">
        Add Vehicle 🚛
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Capacity (KG)" type="number" fullWidth margin="normal" value={capacityKg} onChange={(e) => setCapacityKg(e.target.value)} />
        <TextField label="Tyres" type="number" fullWidth margin="normal" value={tyres} onChange={(e) => setTyres(e.target.value)} />
        <Button type="submit" variant="contained" fullWidth  sx={{
    mt: 2,
    backgroundColor: '#2196f3 !important',  
    color: '#fff !important',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    '&:hover': {
      backgroundColor: '#1976d2 !important', 
    },
  }}
>
  Add Vehicle
</Button>
      </form>

      {message && <Typography sx={{ mt: 2 }} color="white">{message}</Typography>}
    </Box>
  );
};

export default AddVehicle; 
const express = require('express');
const vehicleRoutes = require('./vehicleRoutes');
const bookingRoutes = require('./bookingRoutes');

const router = express.Router();

router.use('/vehicles', vehicleRoutes);
router.use('/bookings', bookingRoutes);

module.exports = router; 
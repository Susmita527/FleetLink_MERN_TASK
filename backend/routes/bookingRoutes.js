const express = require('express');
const router = express.Router();
const {
    createBooking,
    deleteBooking,
    getBookingsByCustomer, 
  } = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/', getBookingsByCustomer);
router.delete('/:id', deleteBooking); 

module.exports = router;

// controllers/bookingController.js
const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;
    const startTimeDate = new Date(startTime);
    const estimatedRideDurationHours = Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;
    const bookingEndTime = new Date(startTimeDate.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);

    
    const existingBooking = await Booking.findOne({
      vehicleId,
      startTime: { $lt: bookingEndTime },
      endTime: { $gt: startTimeDate }
    });

    if (existingBooking) {
      return res.status(409).json({ message: 'Vehicle is already booked for the selected time.' });
    }

    const booking = new Booking({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: startTimeDate,
      endTime: bookingEndTime,
      customerId
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBookingsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.query;

    if (!customerId) {
      return res.status(400).json({ message: 'customerId is required' });
    }

    const bookings = await Booking.find({ customerId }).populate('vehicleId');

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Get Bookings Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

// Create a new vehicle
const createVehicle = async (req, res) => {
  try {
    const { name, capacityKg, tyres } = req.body;
    const vehicle = new Vehicle({ name, capacityKg, tyres });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get available vehicles
const getAvailableVehicles = async (req, res) => {
  try {
    const capacityRequired = Number(req.query.capacityRequired);
    const fromPincode = req.query.fromPincode;
    const toPincode = req.query.toPincode;
    const startTime = new Date(req.query.startTime);

    if (isNaN(capacityRequired)) {
      return res.status(400).json({ error: 'Invalid capacity' });
    }

    const estimatedRideDurationHours =
      Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;

    const endTime = new Date(
      startTime.getTime() + estimatedRideDurationHours * 60 * 60 * 1000
    );

    const vehicles = await Vehicle.find({ capacityKg: { $gte: capacityRequired } });

    const bookings = await Booking.find({
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });

    const bookedVehicleIds = bookings.map(b => b.vehicleId.toString());
    const availableVehicles = vehicles.filter(
      v => !bookedVehicleIds.includes(v._id.toString())
    );

    res.status(200).json({ availableVehicles, estimatedRideDurationHours });
  } catch (error) {
    console.error('Error in getAvailableVehicles:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createVehicle,
  getAvailableVehicles,
};

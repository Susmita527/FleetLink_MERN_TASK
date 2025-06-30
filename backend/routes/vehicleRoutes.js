const express = require('express');
const router = express.Router();
const {
  createVehicle,
  getAvailableVehicles,
} = require('../controllers/vehicleController');

router.post('/', createVehicle); // POST /api/vehicles
router.get('/available', getAvailableVehicles); // GET /api/vehicles/available

module.exports = router;

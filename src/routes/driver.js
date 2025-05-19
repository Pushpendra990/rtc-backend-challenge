const express = require('express');
const { verifyToken } = require('../middleware/auth');
const driverState = require('../data/driverState');
  // Client example using Socket.IO
const io = require("socket.io-client");
const router = express.Router();

router.post('/driver/update', verifyToken, (req, res) => {
  const { lat, long } = req.body;
  const driverId = req.driver.id;
  driverState.updateDriverLocation(driverId, lat, long);
  res.json({ success: true, message:"Info updated successfully" });
});

module.exports = router;
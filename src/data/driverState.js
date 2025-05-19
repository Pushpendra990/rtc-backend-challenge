const driverLocations = {};

function updateDriverLocation(driverId, lat, long, timestamp = Date.now()) {
    driverLocations[driverId] = { lat, long, timestamp };
}

function getDriverData(driverId) {
  return driverLocations[driverId] || null;
}

function mockClusterSync(driverId, lat, long, timestamp) {
  // Example: publish to Redis, all instances subscribe and update in-memory state
}

module.exports = {
  updateDriverLocation,
  getDriverData,
  mockClusterSync
};

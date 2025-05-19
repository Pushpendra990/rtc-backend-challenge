const { Server } = require("socket.io");

const setupSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: '*' }
  });

  
  const dashboardNamespace = io.of('/driver/dashboard');
  dashboardNamespace.on('connection', socket => {
    console.log("Connected to /driver/dashboard");

    let trackedDriver = 'driver1';

    socket.on('listenToDriver', ({ driverId }) => {
      trackedDriver = driverId;
    });

    const sendUpdate = () => {
      if (!trackedDriver) return;

      const data = driverState.getDriverData(trackedDriver);
      if (!data) return;

      const { timestamp, lat, long } = data;
      const now = Date.now();

      if (now - timestamp < OFFLINE_TIMEOUT) {
        const driverInfo = drivers.find(d => d.id === trackedDriver);
        socket.emit('driverUpdate', {
          username: trackedDriver,
          name: driverInfo.name,
          image: driverInfo.image,
          lat,
          long
        });
      } else {
        socket.emit('driverError', {
          errorCode: 'OFFLINE_DRIVER',
          errorMessage: 'Driver has been offline for a while now',
          lastUpdate: new Date(timestamp).toISOString()
        });
      }
    };

    const interval = setInterval(sendUpdate, CLIENT_UPDATE_INTERVAL);

    socket.on('disconnect', () => clearInterval(interval));
  });


  const streamNamespace = io.of('/driver/stream');
  streamNamespace.on('connection', socket => {
    const token = socket.handshake.auth?.token;
    const payload = validateToken(token);
    if (!payload) {
      socket.emit('error', { error: 'Invalid or expired token' });
      return socket.disconnect();
    }

    const driverId = payload.id;

    socket.on('locationUpdate', ({ lat, long }) => {
      const now = Date.now();
      driverState.updateDriverLocation(driverId, lat, long, now);
    });
});
};

module.exports = setupSocket;
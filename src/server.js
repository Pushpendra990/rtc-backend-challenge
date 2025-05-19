require('dotenv').config();
const http = require('http');
const path = require('path');
const express = require('express');

const app = require('./app');
const setupSocket = require('./sockets');


const server = http.createServer(app);
setupSocket(server);

app.use(express.static(path.join(__dirname)));
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
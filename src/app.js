const express = require('express');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const driverRoutes = require('./routes/driver');
//const setupSocket = require('./sockets');
const app = express();

app.use(bodyParser.json());

app.use('/', loginRoutes);
app.use('/', driverRoutes);

// app.use('/', setupSocket);

module.exports = app;
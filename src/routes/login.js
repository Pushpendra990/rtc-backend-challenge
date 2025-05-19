const express = require('express');
const jwt = require('jsonwebtoken');
const drivers = require('../config/drivers');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const driver = drivers.find(d => d.username === username && d.password === password);
  if (!driver) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: driver.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
  res.json({ token, driver: { id: driver.id, name: driver.name, image: driver.image } });
});

module.exports = router;
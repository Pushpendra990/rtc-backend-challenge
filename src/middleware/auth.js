const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing token' });

  jwt.verify(token, process.env.JWT_SECRET, (err, driver) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.driver = driver;
    next();
  });
};

module.exports = { verifyToken };
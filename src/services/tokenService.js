const jwt = require('jsonwebtoken');

function validateToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

module.exports = { validateToken };
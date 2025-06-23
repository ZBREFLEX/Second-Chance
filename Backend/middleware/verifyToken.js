const jwt = require('jsonwebtoken');

// Basic token verification
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
    if (err) {
      console.error("JWT verification failed:", err);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = user; // attach user info to request
    next();
  });
};

// Admin-only middleware that uses verifyToken internally
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next(); // user is admin
  });
};

module.exports = {
  verifyToken,
  verifyAdmin,
};

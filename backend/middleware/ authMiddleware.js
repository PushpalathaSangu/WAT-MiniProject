const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Access token missing' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_fallback_secret', (err, user) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).json({ 
        success: false,
        message: 'Invalid or expired token' 
      });
    }
    
    req.user = user;
    next();
  });
};

const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user?.role || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: 'Unauthorized access' 
      });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRole
};

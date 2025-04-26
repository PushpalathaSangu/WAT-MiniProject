// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization']; // Bearer <token>
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Access token missing or invalid' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       console.error("JWT verification error:", err);
//       return res.status(403).json({ message: 'Invalid or expired token' });
//     }

//     req.user = user; // You can now use req.user in your route
//     next();
//   });
// };

// module.exports = authenticateToken;



const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(403).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure your JWT_SECRET is correct
    req.user = decoded;
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

module.exports = { authenticateToken };

<<<<<<< HEAD
// middleware/verifyToken.js
// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Authorization denied" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("Token Error:", error);
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Check for Authorization header
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ 
      success: false,
      message: 'Authorization header missing' 
    });
  }

  // Extract token (handle both "Bearer token" and just "token")
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] 
    : authHeader;

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Token not found in header' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ 
      success: false,
      message: 'Invalid or expired token',
      error: err.message 
    });
  }
};

module.exports = verifyToken;
=======
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8

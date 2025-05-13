// backend/middleware/authorizeRole.js

const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user?.role; // Assumes req.user is set by authentication middleware
  
      if (!userRole || !allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Access denied: Unauthorized role" });
      }
          
      next();
    };
  };
  
<<<<<<< HEAD
  module.exports = {authorizeRole}
=======
  module.exports = authorizeRole;


// const authorizeRole = (...allowedRoles) => {
//   return (req, res, next) => {
//     try {
//       // 1. Check if user exists in request
//       if (!req.user) {
//         return res.status(401).json({ 
//           success: false,
//           message: "Authentication required" 
//         });
//       }

//       // 2. Check if user has a role
//       const userRole = req.user.role;
//       if (!userRole) {
//         return res.status(403).json({ 
//           success: false,
//           message: "User role not defined" 
//         });
//       }

//       // 3. Check if user's role is allowed
//       if (!allowedRoles.includes(userRole)) {
//         return res.status(403).json({ 
//           success: false,
//           message: `Access denied. Required roles: ${allowedRoles.join(', ')}` 
//         });
//       }

//       // 4. If all checks pass, proceed
//       next();
      
//     } catch (error) {
//       console.error("Role authorization error:", error);
//       return res.status(500).json({ 
//         success: false,
//         message: "Internal server error during authorization" 
//       });
//     }
//   };
// };

// module.exports = { authorizeRole };
  
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8

const jwt = require('jsonwebtoken');
const express = require('express');

const jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const secret = "ATwebjsg"; 
 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }
  
    const token = authHeader.split(' ')[1];
  
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
      req.user = decoded; 
  
      next();
    });
  };

const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        // Extract user role from decoded token
        const userRole = req.user.role;

        // Check if the user's role is allowed to access the resource
        if (allowedRoles.includes(userRole)) {
            next();
        } else {
            res.status(403).json({ success: false, message: 'No Access' });
        }
    };
};


module.exports = {jwtMiddleware, checkRole};

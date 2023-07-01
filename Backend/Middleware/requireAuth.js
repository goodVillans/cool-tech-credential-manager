require ('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const SECRET = process.env.SECRET; 

// Auth Middleware
const requireAuth = async (req, res, next) => {
    const auth = req.headers.authorization;
    // chek auth not null
    if (!auth) {
        return res.status(401).json({ message: 'Auth token required' });
    }
    // get token(bearer('')token)
    const token = auth.split(' ')[1]; 
    try {
        const decoded = jwt.verify(token, SECRET)
        const { _id } = decoded;
        // fine user by id and deliver id and role in payload
        req.user = await User.findById(_id).select('id role'); 
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Request is not authorized' });
    }
}

 // Role Middleware(for role checkin and endpoint access)
 const requireRole = roles => (req, res, next) => {
     if (roles && !roles.includes(req.user.role) && req.user.role !== 'admin') {
         return res.status(401).json({ message: 'Insufficient permissions' });
     }
     next();
 }
 
 module.exports = {
     requireAuth,
     requireNormalUserAuth: requireRole(['normal', 'manager', 'admin']), 
     requireManagerUserAuth: requireRole(['manager', 'admin']), 
     requireAdminUserAuth: requireRole(['admin']) 
 }
 




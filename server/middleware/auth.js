// middleware/auth.js

import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import User from '../models/User.js';

const auth = async (req, res, next) => {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, config.jwtSecret);

        // Add user from payload
        req.user = await User.findById(decoded.user.id).select('-password');
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

export default auth;

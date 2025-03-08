const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Middleware to parse cookies
router.use(cookieParser());

// Protected route that verifies JWT token
router.get('/', (req, res) => {
    const token = req.headers['x-access-token']; // Get token from the header

    // Check if the token is provided
    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'Token not provided'
        });
    }

    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Failed to authenticate token'
            });
        }

        // If token is valid, return success and the decoded data
        return res.json({
            success: true,
            message: 'Token authenticated',
            username: decoded.username
        });
    });
});

module.exports = router;

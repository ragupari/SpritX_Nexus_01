const express = require('express');
const router = express.Router();
const db = require('../dbconfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

router.use(express.json());

router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Query to find the user by username
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, result) => {
        if (err) {
            res.json({
                status: 'Server side error',
                success: false,
                err: err
            });
            return;
        }

        // Check if the user exists
        if (result.length > 0) {
            const user = result[0];

            // Compare the provided password with the hashed password in the database
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    res.json({
                        status: 'Server side error',
                        success: false
                    });
                    return;
                }

                if (isMatch) {
                    // If passwords match, generate a JWT token
                    const token = jwt.sign({username: user.username}, process.env.SECRET_KEY, {expiresIn: '1h'});
                    res.json({
                        status: 'Login Successful!',
                        success: true,
                        token: token
                    });
                } else {
                    // If passwords do not match
                    res.json({
                        status: 'Username or password is incorrect',
                        success: false
                    });
                }
            });
        } else {
            // If user does not exist
            res.json({
                status: 'Username or password is incorrect',
                success: false
            });
        }
    });
});

module.exports = router;

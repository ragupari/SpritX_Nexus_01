const express = require('express');
const router = express.Router();
const db = require('../dbconfig');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
router.use(express.json());

router.get('/check-username', (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.json({
            success: false,
            status: 'Username is required'
        });
    }

    const sqlCheck = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';
    db.query(sqlCheck, [username], (err, result) => {
        if (err) {
            return res.json({
                success: false,
                status: 'Server side error',
                err: err
            });
        }

        const isAvailable = result[0].count === 0;
        res.json({
            success: true,
            available: isAvailable,
            status: isAvailable ? 'Username is available' : 'Username is taken'
        });
    });
});

router.post('/', async (req, res) => {
    const { username, password} = req.body;

    try {
        // Check if the email or username already exists
        const sqlCheck = 'SELECT * FROM users WHERE username = ?';
        db.query(sqlCheck, [username], (err, result) => {
            if (err) {
                res.json({
                    status: 'Server side error',
                    success: false,
                    err: err
                });
                return;
            }
            if (result.length > 0) {
                res.json({
                    status: 'Username already exists',
                    success: false
                });
            } else {
                // Hash the password
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    if (err) {
                        res.json({
                            status: 'Error in hashing password',
                            success: false
                        });
                        return;
                    }

                    // Insert new user into the database
                    const sqlInsert = 'INSERT INTO users (username, password) VALUES (?, ?)';
                    db.query(sqlInsert, [username, hashedPassword], (err, result) => {
                        if (err) {
                            res.json({
                                status: 'Server side error',
                                success: false,
                                err: err
                            });
                            return;
                        }
                        const token = jwt.sign({username: username}, process.env.SECRET_KEY, {expiresIn: '1h'});
                        
                        res.json({
                            token: token,  
                            status: 'User registered successfully!',
                            success: true
                        });
                    });
                });
            }
        });
    } catch (err) {
        res.json({
            status: 'Server side error',
            success: false,
            err: err
        });
    }
});



module.exports = router;

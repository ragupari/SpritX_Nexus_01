const express = require('express');
const router = express.Router();
const db = require('../dbconfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.use(express.json());

// Function to check password strength
const isStrongPassword = (password) => {
    return (
        password.length >= 8 &&
        /[A-Z]/.test(password) && // At least one uppercase letter
        /[a-z]/.test(password) && // At least one lowercase letter
        /[^A-Za-z0-9]/.test(password) // At least one special character
    );
};

// Check if username is available
router.get('/check-username', (req, res) => {
    const { username } = req.query;

    if (!username || username.length < 8) {
        return res.json({ success: false, status: 'Username must be at least 8 characters long.' });
    }

    const sqlCheck = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';
    db.query(sqlCheck, [username], (err, result) => {
        if (err) {
            return res.json({ success: false, status: 'Server error.', err });
        }

        const isAvailable = result[0].count === 0;
        res.json({ success: true, available: isAvailable, status: isAvailable ? 'Username is available' : 'Username is taken' });
    });
});

// Register a new user
router.post('/', async (req, res) => {
    const { username, password} = req.body;

    // Basic validations
    if (!username || !password) {
        return res.json({ success: false, status: 'All fields are required.' });
    }
    if (username.length < 8) {
        return res.json({ success: false, status: 'Username must be at least 8 characters long.' });
    }
    if (!isStrongPassword(password)) {
        return res.json({ success: false, status: 'Password must include an uppercase, lowercase, and a special character.' });
    }

    // Check if username exists
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) {
            return res.json({ success: false, status: 'Server error.', err });
        }
        if (result.length > 0) {
            return res.json({ success: false, status: 'Username already exists.' });
        }

        // Hash password and insert into DB
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.json({ success: false, status: 'Error hashing password.' });
            }

            db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
                if (err) {
                    return res.json({ success: false, status: 'Server error.', err });
                }

                const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });

                res.json({
                    success: true,
                    status: 'User registered successfully!',
                    token
                });
            });
        });
    });
});

module.exports = router;

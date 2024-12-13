const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

const registerUser = async (req, res, next) => {
    const { firstName, lastName, email, password, address, gender, phoneNumber, role } = req.body;

    try {
        if (!phoneNumber) {
            return res.status(400).json({ message: 'Phone number is required' });
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log("This user already exists");
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ firstName, lastName, email, password: hashedPassword, address, gender, phoneNumberc,role });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("Invalid credentials");
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid credentials");
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.header('Authorization', `Bearer ${token}`);
        user.last_login = new Date();
        await user.save();

        return res.status(200).json({
            message: 'Logged in successfully',
            token: `Bearer ${token}`  
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser
};

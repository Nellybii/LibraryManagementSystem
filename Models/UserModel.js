const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true},
    address: { type: String, required: true},
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    last_login: { type: Date }
});

module.exports = mongoose.model('User', userSchema);
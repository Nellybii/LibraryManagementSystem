const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    publicationYear: { type: Number, required: true },
    pages: { type: Number, required: true },
    language: { type: String, required: true },
    numberOfCopies: { type: Number, required: true },
    availability: { type: Boolean, required: true, default: true },
    borrowedBy: { type: String, required: false },
    borrowDate: { type: Date, required: false }
});

module.exports = mongoose.model('Book', bookSchema);
const express = require('express');
const Router = express.Router();
const authenticate = require("../middwares/authmiddleware");

const bookController = require('../Controllers/BookController');

Router.post('/books', bookController.createBook);
Router.put('/books/:id/borrow', authenticate, bookController.borrowBook);
Router.put('/books/:id/return', authenticate, bookController.returnBook);
Router.get('/books', bookController.getAllBooks);

module.exports = Router;
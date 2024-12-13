const express = require('express');
const Router = express.Router();
const authenticate = require("../authmiddleware");

const bookController = require('../Controllers/BookController');

Router.post('/books', bookController.createBook);
Router.post('/books/:id/borrow', authenticate, bookController.borrowBook);
Router.get('/books/:id/return', authenticate, bookController.returnBook);

module.exports = Router;
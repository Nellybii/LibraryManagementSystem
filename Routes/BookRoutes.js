const express = require('express');
const router = express.Router();
const authenticate = require('../middwares/authmiddleware');
const bookController = require('../Controllers/BookController');

router.post('/books', authenticate.authenticate, authenticate.isAdmin, bookController.createBook);
router.put('/books/:id/borrow', authenticate.authenticate, bookController.borrowBook);
router.put('/books/:id/return', authenticate.authenticate, bookController.returnBook);
router.get('/books', bookController.getAllBooks);

module.exports = router;
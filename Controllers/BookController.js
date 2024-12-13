const Book = require('../Models/BookModel');

const createBook = async (req, res) => {
    const { title, publicationYear, pages, language, numberOfCopies } = req.body;

    try {
        const author = req.user.id; 

        const existingBook = await Book.findOne({ title });
        if (existingBook) {
            return res.status(400).json({ message: 'This book already exists in the library' });
        }

        const newBook = new Book({
            title,
            author,
            publicationYear,
            pages,
            language,
            numberOfCopies,
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        console.error('Error creating book:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const borrowBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.availability === false || book.numberOfCopies <= 0) {
            return res.status(400).json({ message: 'Book is not available for borrowing' });
        }

        if (book.borrowedBy === req.user.id) {
            return res.status(400).json({ message: 'You have already borrowed this book' });
        }

        const borrowedBy = req.user.id;
        book.numberOfCopies--;

        if (book.numberOfCopies > 0) {
            book.availability = true;
        } else {
            book.availability = false;
        }

        book.borrowedBy = borrowedBy;
        book.borrowDate = new Date();
        await book.save();

        res.status(200).json({ message: 'Book borrowed successfully', book });
    } catch (err) {
        console.error('Error borrowing book:', err.message);
        res.status(500).json({ message: 'Failed to borrow book', error: err.message });
    }
};

const returnBook = async (req, res) => {
    const { id } = req.params;
    
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (!book.borrowedBy) {
            return res.status(400).json({ message: 'This book was not borrowed' });
        }

        if (book.borrowedBy !== req.user.id) {
            return res.status(403).json({ message: 'You are not the borrower of this book' });
        }

        book.numberOfCopies++;
        book.availability = true;
        book.borrowedBy = null;
        book.borrowDate = null;
        await book.save();

        res.status(200).json({ message: 'Book returned successfully', book });
    } catch (err) {
        console.error('Error returning book:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({}).populate('author', 'firstName lastName');
        res.json(books);
    } catch (err) {
        console.error('Error retrieving books:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    createBook,
    borrowBook,
    returnBook,
    getAllBooks
};
